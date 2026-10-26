import React, { useState, useCallback, useMemo } from 'react';
import { AdjustmentsHorizontalIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { useAuthStore } from '../../stores/authStore';

const ChannelIcon = React.memo(({ sourceChannel }) => {
  if (!sourceChannel) return null;
  const iconClass = "absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full p-0.5 border border-gray-200";
  switch (sourceChannel.toLowerCase()) {
    case 'whatsapp':
      return <IconBrandWhatsapp className={iconClass} style={{ color: '#25D366' }} strokeWidth={1.5} />;
    default:
      return null;
  }
});

const ChatListItem = React.memo(({ chat, isActive, onSelectChat }) => {
  const clientName = chat.clientName || 'Unknown Client';
  const avatarInitial = clientName.charAt(0).toUpperCase();
  const timestamp = chat.lastInteractionAtUtc ? new Date(chat.lastInteractionAtUtc).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  const lastMessagePreview = chat.lastMessagePreview || '...';

  return (
    <button
      onClick={() => onSelectChat(chat.id)}
      className={`w-full text-left p-3 flex items-start space-x-3 hover:bg-page-nav-item-hover-bg rounded-lg transition-colors duration-150 ${isActive ? 'bg-chat-list-active-bg' : ''}`}
    >
      <div className="relative flex-shrink-0">
        <div className={`w-10 h-10 ${chat.avatarBg || 'bg-gray-400'} rounded-full flex items-center justify-center text-white font-semibold`}>
          {avatarInitial}
        </div>
        <ChannelIcon sourceChannel={chat.sourceChannel} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium truncate ${isActive ? 'text-page-nav-text-active' : 'text-content-text-primary'}`}>{clientName}</span>
          <span className="text-xs text-content-text-secondary">{timestamp}</span>
        </div>
        <div className="flex justify-between items-center mt-0.5">
          <p className="text-xs text-content-text-secondary truncate">{lastMessagePreview}</p>
          {chat.unreadCount > 0 && (
            <span className="ml-2 text-xs bg-red-500 text-white font-semibold rounded-full w-4 h-4 flex items-center justify-center leading-tight text-[10px]">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
});

const CollapsibleChatSection = React.memo(({ title, count, chats, activeChatId, onSelectChat, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const handleToggleOpen = useCallback(() => setIsOpen(prev => !prev), []);
  return (
    <div>
      <button onClick={handleToggleOpen} className="flex items-center justify-between w-full p-2 text-left hover:bg-page-nav-item-hover-bg rounded-md">
        <div className="flex items-center">
          <ChevronDownIcon className={`w-4 h-4 mr-2 text-content-text-secondary transform transition-transform ${isOpen ? '' : '-rotate-90'}`} />
          <span className="text-xs font-medium text-content-text-primary">{title} ({count})</span>
        </div>
      </button>
      {isOpen && (
        <div className="pl-4 pr-1 py-1 space-y-0.5">
          {chats && chats.length > 0 ? chats.map(chat => (
            <ChatListItem key={chat.id} chat={chat} isActive={chat.id === activeChatId} onSelectChat={onSelectChat} />
          )) : (
            <p className="text-xs text-content-text-secondary p-2">No chats in this section.</p>
          )}
        </div>
      )}
    </div>
  );
});

const ChatListColumn = React.memo(({ chats, activeChatId, onSelectChat }) => {
  const { user } = useAuthStore();
  const currentUserId = user?.id;

  const queuedChats = useMemo(() =>
    chats.filter(c =>
      c.needsAttention === true ||
      (!c.assignedAgentId && ['new', 'open', 'pending_agent_reply'].includes(c.status))
    ),
    [chats]
  );
  
  const myChats = useMemo(() =>
    chats.filter(c => c.assignedAgentId === currentUserId && !queuedChats.some(qc => qc.id === c.id)),
    [chats, currentUserId, queuedChats]
  );

  const allOpenChats = useMemo(() =>
    chats.filter(c => c.assignedAgentId && c.assignedAgentId !== currentUserId && !queuedChats.some(qc => qc.id === c.id)),
    [chats, currentUserId, queuedChats]
  );

  return (
    <div className="w-[var(--spacing-chat-list-w)] flex-shrink-0 bg-page-nav-bg border-r border-page-nav-border flex flex-col">
      <div className="p-4 ...">
        <h1 className="text-xl font-semibold text-page-nav-heading-text">Chats</h1>
        {/* ... */}
      </div>
      <div className="flex-grow overflow-y-auto p-2 space-y-1 scrollbar-thin">
        <CollapsibleChatSection title="Queued" count={queuedChats.length} chats={queuedChats} activeChatId={activeChatId} onSelectChat={onSelectChat} />
        <CollapsibleChatSection title="My chats" count={myChats.length} chats={myChats} activeChatId={activeChatId} onSelectChat={onSelectChat} />
        <CollapsibleChatSection title="All open" count={allOpenChats.length} chats={allOpenChats} activeChatId={activeChatId} onSelectChat={onSelectChat} defaultOpen={false} />
      </div>
    </div>
  );
});

export default ChatListColumn;