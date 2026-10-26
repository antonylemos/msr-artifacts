import React, { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import api from '../../api/api.js';
import toast from 'react-hot-toast';
import SendBox from './SendBox'
// --- Sub-component for displaying a single message bubble ---
const MessageBubble = ({ message, isYou }) => {
  const bubbleAlignment = isYou ? 'justify-end' : 'justify-start';
  const bubbleColor = isYou ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800';
  const timeAlignment = isYou ? 'text-right' : 'text-left';

  return (
    <div className={`flex ${bubbleAlignment} mb-2 animate-fade-in-up`}>
      <div className={`max-w-md lg:max-w-xl px-3 py-2 rounded-xl shadow-sm ${bubbleColor}`}>
        <p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
        <div className={`text-xs mt-1 opacity-75 ${timeAlignment}`}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};


// --- Main component for the entire chat area ---
const ChatMessageArea = ({ chatUser, onSendMessage, onAcceptChat, isLoading,initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages || []);
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);

  // Effect to fetch initial message history if not provided
  useEffect(() => {
    // If the parent provided messages (from socket), use them.
    if (initialMessages && initialMessages.length > 0) {
      setMessages(initialMessages);
      return;
    }
    // Otherwise, if it's a new selection, fetch the history.
    if (chatUser?.id) {
      const fetchMessageHistory = async () => {
        try {
          const history = await api.listMessagesForConversation(chatUser.id);
          setMessages(history || []);
        } catch (error) {
          toast.error("Could not load message history.");
        }
      };
      fetchMessageHistory();
    }
  }, [chatUser?.id, initialMessages]); // Runs when the selected chat changes


  // Effect to auto-scroll
  useEffect(() => {
    setTimeout(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);


  const handleFormSubmit = (e) => {
    e.preventDefault();
    const messageText = inputRef.current.value;
    if (messageText.trim()) {
      onSendMessage(messageText);
      inputRef.current.value = '';
    }
  };

  // --- This render condition is now correct and simple ---
   const handleSendFromBox = (messageText, mode) => {
        console.log(`Sending in ${mode} mode:`, messageText);
        
        // The parent `onSendMessage` prop (from ConversationsPage) just expects the text content.
        // We only call it if the agent is sending a public 'message'.
        if (mode === 'message') {
            onSendMessage(messageText);
        } else {
            // Here you would call a different API to add an internal note to the conversation.
            toast.success(`Internal note added: "${messageText}" (not sent to user)`);
        }
    };

    const isChatInQueue = chatUser && !chatUser.assignedAgentId;



  return (
    <div className="flex-1 flex flex-col bg-white border-r border-gray-200 min-w-0">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 flex items-center justify-between h-[var(--height-page-section-header)]">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{chatUser?.clientName || 'Select a Chat'}</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <p className="text-gray-500">Loading History...</p>
          </div>
        ) : (
          messages.length > 0 ? (
            messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} isYou={msg.senderType === 'agent'} />
            ))
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <p>No messages in this conversation yet.</p>
            </div>
          )
        )}
        <div ref={messageEndRef} />
      </div>

      {/* --- Conditional Bottom Bar --- */}
      {isChatInQueue ? (
        // UI for unassigned chats in the queue
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{chatUser.clientName}</span> is waiting in queue.
          </p>
          <button
            // It correctly calls the function passed down from the parent
            onClick={() => onAcceptChat(chatUser.id)}
            className="mt-3 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition"
          >
            Pick from queue
          </button>
        </div>
      ) : (
        // Standard message input for assigned chats
        <div >
           <SendBox onSendMessage={handleSendFromBox} />

        </div>
      )}
    </div>
  );
};

export default ChatMessageArea;