import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

import api from '../api/api.js';
import { useAuthStore } from '../stores/authStore.js';
import ChatListColumn from '../components/chat/ChatListColumn';
import ChatMessageArea from '../components/chat/ChatMessageArea';
import ChatDetailsSidebar from '../components/chat/ChatDetailsSidebar';

const SOCKET_SERVER_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const ConversationsPage = () => {
  // --- STATE MANAGEMENT ---
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messagesByConversation, setMessagesByConversation] = useState({});
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [selectedClientDetails, setSelectedClientDetails] = useState(null);
  const [isDetailsSidebarCollapsed, setIsDetailsSidebarCollapsed] = useState(false);
  const socketRef = useRef(null);
  const { user, token } = useAuthStore();

  // --- DATA FETCHING ---
  const fetchConversationsList = useCallback(async () => {
    if (!user?.organizationId) return;
    setIsLoadingConversations(true);
    try {
      const response = await api.listConversations({
        status: 'open,new,pending_agent_reply,pending_client_reply',
      });
      if (response && Array.isArray(response.conversations)) {
        setConversations(response.conversations);
      }
    } catch (error) {
      toast.error("Could not load conversations.");
    } finally {
      setIsLoadingConversations(false);
    }
  }, [user?.organizationId]);

  useEffect(() => {
    fetchConversationsList();
  }, [fetchConversationsList]);

  // --- SOCKET.IO REAL-TIME INTEGRATION ---
  useEffect(() => {
    if (!token || !user?.organizationId) {
      if (socketRef.current) { socketRef.current.disconnect(); }
      return;
    }
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_SERVER_URL, { auth: { token } });
      socketRef.current.on('connect', () => socketRef.current.emit('join_organization_room', user.organizationId));
    }
    const socket = socketRef.current;

    const handleConversationActivity = (data) => {
      const { conversation, message } = data;
      if (!conversation) return;

      setConversations(prev => {
        const index = prev.findIndex(c => c.id === conversation.id);
        const newConvos = [...prev];
        // The `needsAttention` flag is added for new client messages
        const convoToUpdate = { ...conversation, needsAttention: !!(message && message.senderType === 'client') };

        if (index > -1) {
          newConvos[index] = { ...newConvos[index], ...convoToUpdate };
        } else {
          newConvos.push(convoToUpdate);
        }
        return newConvos.sort((a, b) => new Date(b.lastInteractionAtUtc) - new Date(a.lastInteractionAtUtc));
      });

      if (message) {
        setMessagesByConversation(prev => ({ ...prev, [message.conversationId]: [...(prev[message.conversationId] || []), message] }));
      }
    };

    socket.on('conversation_activity', handleConversationActivity);
    return () => { socket.off('conversation_activity', handleConversationActivity); };
  }, [token, user?.organizationId]);

  // --- DATA FETCHING FOR ACTIVE CHAT ---
  useEffect(() => {
    if (!activeConversationId) return;
    const fetchDetails = async () => {
      setIsLoadingMessages(true);
      try {
        const currentConvo = conversations.find(c => c.id === activeConversationId);
        if (!currentConvo) return;
        
        const [messages, clientDetails] = await Promise.all([
          api.listMessagesForConversation(activeConversationId),
          api.getClientById(currentConvo.clientId)
        ]);
        setMessagesByConversation(prev => ({ ...prev, [activeConversationId]: messages || [] }));
        setSelectedClientDetails(clientDetails);
      } catch (error) { toast.error("Could not load chat details."); }
      finally { setIsLoadingMessages(false); }
    };
    fetchDetails();
  }, [activeConversationId, conversations]);


  // --- UI EVENT HANDLERS ---
  const handleSelectChat = useCallback((chatId) => {
    setConversations(prev => prev.map(c => c.id === chatId ? { ...c, needsAttention: false } : c));
    setActiveConversationId(chatId);
  }, []);


const handleAcceptChat = useCallback(async (conversationId) => {
  if (!user?.id) return;

  try {
    await api.assignConversation(conversationId, { agentId: user.id });
    toast.success("Chat assigned to you!");

    // ✅ Update the conversation to reflect assignment
    setConversations(prev => prev.map(convo =>
      convo.id === conversationId ? { ...convo, assignedAgentId: user.id } : convo
    ));
  } catch (error) {
    toast.error(error.response?.data?.message || "Could not accept chat.");
  }
}, [user?.id]);



  const handleSendMessage = useCallback(async (messageText) => {
    if (!activeConversationId || !messageText.trim() || !user) return;
    const optimisticMessage = { id: `temp_${Date.now()}`, conversationId: activeConversationId, content: messageText, senderType: 'agent', createdAt: new Date().toISOString() };
    setMessagesByConversation(prev => ({ ...prev, [activeConversationId]: [...(prev[activeConversationId] || []), optimisticMessage] }));
    try {
      await api.addMessageToConversation(activeConversationId, { content: messageText });
    } catch (error) {
      toast.error("Message could not be sent.");
      setMessagesByConversation(prev => ({ ...prev, [activeConversationId]: prev[activeConversationId].map(msg => msg.id === optimisticMessage.id ? { ...msg, status: 'failed_to_send' } : msg)}));
    }
  }, [activeConversationId, user]);

  const toggleDetailsSidebarCollapse = useCallback(() => setIsDetailsSidebarCollapsed(prev => !prev), []);


  // --- DERIVED STATE FOR CHILD COMPONENTS (The snippet you provided) ---
  const activeChatMessages = useMemo(() => messagesByConversation[activeConversationId] || [], [messagesByConversation, activeConversationId]);
const activeChatUserSummary = useMemo(() => 
  conversations.find(c => c.id === activeConversationId),
[conversations, activeConversationId]);
  


  const contactForDetailsSidebar = useMemo(() => {
    if (!selectedClientDetails) return null;
    return {
        id: selectedClientDetails.id,
        name: selectedClientDetails.name || selectedClientDetails.profileNameWhatsapp,
        userName: selectedClientDetails.name || selectedClientDetails.profileNameWhatsapp,
        email: selectedClientDetails.email || 'not-provided@example.com',
        phone: selectedClientDetails.phoneNumber,
        avatarInitial: (selectedClientDetails.name || '?').charAt(0).toUpperCase(),
        avatarBg: 'bg-indigo-500',
    };
  }, [selectedClientDetails]);


  // --- RENDER LOGIC ---
  return (
    <div className="flex flex-1 overflow-hidden bg-page-background text-sm h-full">
      <ChatListColumn
        chats={conversations}
        activeChatId={activeConversationId}
        onSelectChat={handleSelectChat}
        isLoading={isLoadingConversations}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        {activeConversationId ? (
          <div className="flex flex-1 min-h-0">
            <ChatMessageArea
              key={`${activeConversationId}-${activeChatUserSummary?.assignedAgentId}`}
              chatUser={activeChatUserSummary}
              initialMessages={activeChatMessages}
              onSendMessage={handleSendMessage}
              onAcceptChat={handleAcceptChat}
              isLoading={isLoadingMessages}
            />
            {selectedClientDetails && (
              <ChatDetailsSidebar
                key={`${activeConversationId}-details`}
                contact={contactForDetailsSidebar}
                isCollapsed={isDetailsSidebarCollapsed}
                onToggleCollapse={toggleDetailsSidebarCollapse}
                onClose={() => setActiveConversationId(null)}
              />
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 bg-white">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
              <p className="mt-1 text-sm text-gray-500">Select a conversation from the list to view messages.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationsPage;