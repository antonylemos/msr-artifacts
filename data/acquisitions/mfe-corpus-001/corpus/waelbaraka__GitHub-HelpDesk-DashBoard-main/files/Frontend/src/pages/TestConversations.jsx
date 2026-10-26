import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import toast from 'react-hot-toast';
import io from 'socket.io-client';
import axios from 'axios'; // Import axios directly for the test

import { useAuthStore } from '../stores/authStore.js';
import { IconBrandWhatsapp } from '@tabler/icons-react';

const SOCKET_SERVER_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// --- Sub-component for a single chat item ---
const TestChatListItem = ({ chat, onAccept, isMyChat }) => (
  <div className={`p-4 border rounded-lg flex items-center justify-between ${isMyChat ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white'}`}>
    <div>
      <div className="flex items-center font-bold text-gray-800">
        <IconBrandWhatsapp className="w-5 h-5 mr-2 text-green-600 flex-shrink-0" />
        <span className="truncate">{chat.clientName || 'Unknown Client'}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1 truncate italic">"{chat.lastMessagePreview || '...'}"</p>
      <p className="text-xs text-gray-400 mt-2">Last update: {new Date(chat.lastInteractionAtUtc).toLocaleString()}</p>
    </div>
    {!isMyChat && (
      <button
        onClick={() => onAccept(chat.id)}
        className="ml-4 px-4 py-1.5 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 transition"
      >
        Accept
      </button>
    )}
  </div>
);


// --- MAIN TEST PAGE COMPONENT (WITH DIRECT API CALLS) ---
const TestConversations = () => {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuthStore();
  const socketRef = useRef(null);
  
  // --- (1) DATA FETCHING WITH DIRECT AXIOS CALL ---
  const fetchConversations = useCallback(async () => {
    if (!user?.organizationId || !token) return;
    
    console.log("%c[LOG 0] Fetching initial conversations...", 'color: orange;');
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/conversations`, {
        params: { status: 'open,new,pending_agent_reply' },
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.data && Array.isArray(response.data.conversations)) {
        console.log(`[LOG 0.1] Success! Fetched ${response.data.conversations.length} items.`);
        setConversations(response.data.conversations);
      }
    } catch (error) {
      console.error("[Fetch Error] Could not load conversations:", error.response?.data || error);
      toast.error("Could not load conversations.");
    } finally {
      setIsLoading(false);
    }
  }, [user?.organizationId, token]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // --- (2) SOCKET.IO LISTENER (ROBUST VERSION) ---
  useEffect(() => {
    if (!token) return;
    
    const socket = io(SOCKET_SERVER_URL, { auth: { token } });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log(`%c[LOG 1] Socket Connected: ${socket.id}`, 'color: green; font-weight: bold;');
      socket.emit('join_organization_room', user.organizationId);
    });

    const handleConversationActivity = (data) => {
      const { conversation } = data;
      console.log(`%c[LOG 2] Socket "conversation_activity" received`, 'color: blue; font-weight: bold;', conversation);
      
      setConversations(prev => {
        const index = prev.findIndex(c => c.id === conversation.id);
        const newConvos = [...prev];
        if (index > -1) {
          newConvos[index] = { ...newConvos[index], ...conversation };
        } else {
          newConvos.push(conversation);
        }
        return newConvos.sort((a, b) => new Date(b.lastInteractionAtUtc) - new Date(a.lastInteractionAtUtc));
      });
    };
    
    socket.on('conversation_activity', handleConversationActivity);

    return () => {
      socket.off('conversation_activity', handleConversationActivity);
      socket.disconnect();
    };
  }, [token, user?.organizationId]);


  // --- (3) UI EVENT HANDLER WITH DIRECT AXIOS CALL ---
  const handleAcceptChat = useCallback(async (conversationId) => {
    if (!user?.id || !token) return;
    
    console.log(`%c[LOG 3] Accepting chat ${conversationId}...`, 'color: brown;');
    try {
      await axios.put(`${API_BASE_URL}/api/conversations/${conversationId}/assign`, 
        { agentId: user.id }, // Request body
        { headers: { 'Authorization': `Bearer ${token}` } } // Headers
      );
      toast.success("Chat accepted!");
      // The socket event from the backend will handle the UI update.
    } catch (error) {
      console.error("[Accept Error]", error.response?.data || error);
      toast.error(error.response?.data?.message || "Could not accept chat.");
    }
  }, [user?.id, token]);

  // --- DERIVED STATE ---
  const queuedChats = useMemo(() => conversations.filter(c => !c.assignedAgentId), [conversations]);
  const myChats = useMemo(() => conversations.filter(c => c.assignedAgentId === user?.id), [conversations, user?.id]);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Conversation Test Page (Direct API)</h1>
      
      {isLoading ? (
        <p>Loading conversations...</p>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Queued Chats ({queuedChats.length})</h2>
            <div className="space-y-3">
              {queuedChats.length > 0 ? (
                queuedChats.map(chat => <TestChatListItem key={chat.id} chat={chat} onAccept={handleAcceptChat} isMyChat={false} />)
              ) : ( <p className="text-gray-500 p-4 bg-white rounded-lg border">No chats in the queue.</p> )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">My Chats ({myChats.length})</h2>
            <div className="space-y-3">
              {myChats.length > 0 ? (
                myChats.map(chat => <TestChatListItem key={chat.id} chat={chat} isMyChat={true} />)
              ) : ( <p className="text-gray-500 p-4 bg-white rounded-lg border">You have no assigned chats.</p> )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestConversations;