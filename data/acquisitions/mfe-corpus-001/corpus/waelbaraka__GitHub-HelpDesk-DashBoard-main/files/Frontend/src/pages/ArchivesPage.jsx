// src/pages/ArchivesPage.jsx
import React, { useState, useCallback, useMemo } from 'react';
import ArchiveListColumn from '../components/archives/ArchiveListColumn';
import ChatMessageArea from '../components/chat/ChatMessageArea';
import ArchiveChatDetailsColumn from '../components/archives/ArchiveChatDetailsColumn';

// --- Dummy Data ---
// Ensure this is at the top level of the file, or imported
const initialArchivedChats = [
    {
        id: 'archive1',
        name: 'new',
        agent: 'Pytsud',
        timestampRaw: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        timestamp: 'yesterday',
        notificationCount: 5,
        preview: 'P: Hello. How may I help you? P: hhhhhHello! 👍 Let me find that out for you. N: yes',
        tags: ['support'],
        isNew: true,
        avatarInitial: 'N',
        avatarBg: 'bg-blue-500',
        participants: 'new and Pytsud',
        chatStarted: 'Today 09:16 pm',
        messages: [
            { id: 'msg1', type: 'customer', name: 'new', text: 'www', time: '10:37 PM', avatarInitial: 'N', avatarBg: 'bg-blue-500', isYou: false },
            { id: 'msg2', type: 'customer', name: 'new', text: 'Pre-chat form', time: '10:37 PM', avatarInitial: 'N', avatarBg: 'bg-blue-500', isYou: false, isPreChatForm: true, preChatForm: { name: 'www', email: 'ww1@gmail.com' } },
            { id: 'msg3', type: 'agent', name: 'Pytsud', text: 'Hello. How may I help you?', time: '10:38 PM', avatarInitial: 'P', avatarBg: 'bg-amber-500', isYou: true },
            { id: 'msg4', type: 'agent', name: 'Pytsud', text: 'hhhhHi there! 👋 How can I help you today! Hello! 👋 Let me find that out for you.', time: '10:38 PM', avatarInitial: 'P', avatarBg: 'bg-amber-500', isYou: true },
            { id: 'msg5', type: 'customer', name: 'new', text: 'h', time: '10:39 PM', avatarInitial: 'N', avatarBg: 'bg-blue-500', isYou: false },
        ],
        details: { // This 'details' object is passed as `chatDetails` to ArchiveChatDetailsColumn
            generalInfo: {
                name: 'Wael Baraka', email: 'new@yh.com', localTime: '08:01 am local time',
                location: 'Dubai, Dubai, United Arab Emirates', avatarInitial: '2', avatarBg: 'bg-green-500' // As per image
            },
            chatInfo: {
                id: 'SX02GXSRRY', chattingTime: '19 min 11 s',
                startedOn: '...s://netflix-website-project-theta.vercel.app/', startedOnLink: 'https://netflix-website-project-theta.vercel.app/',
                cameFrom: '...s://vercel.com/', cameFromLink: 'https://vercel.com/',
                groups: [{ id: 'g1', name: 'General', initial: 'G', color: 'bg-slate-300' }], // Matched image
                rating: 'bad', visitorComment: 'bad'
            },
            preChatFormData: { name: 'Wael Baraka', email: '(no answer)' },
            postChatFormData: [
                { question: 'Is this the first time you have chatted with us about this cas e?', answer: 'No' },
                { question: 'Was the case resolved during the chat?', answer: 'No' }
            ],
            technologyData: {
                ip: '2.49.88.117', osDevice: 'Windows (10)', browser: 'Chrome (137.0.0.0)',
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
            },
            whatsAppData: { /* number: '+123456789' */ },
            ticketsData: {
                recent: [ { id: 't1', status: 'Open', subject: 'Ticket from chat SX2C0F10K9', link: '#' } ],
                archiveLink: '#'
            }
        }
    },
    // Add more initialArchivedChats items here if needed for testing
];

const currentAgent = {
    id: 'agent_user',
    name: 'You',
    avatarInitial: 'Me',
    avatarBg: 'bg-blue-500',
};


const ArchivesPage = React.memo(() => {
  const [archivedChats, setArchivedChats] = useState(() => initialArchivedChats); // Initialize state with the data
  const [selectedChatForMessages, setSelectedChatForMessages] = useState(() => initialArchivedChats[0] || null);
  const [selectedChatForDetails, setSelectedChatForDetails] = useState(() => initialArchivedChats[0] || null);

  const handleSelectChatForMessages = useCallback((chat) => {
    setSelectedChatForMessages(chat);
    setSelectedChatForDetails(chat); // Also update details when a chat is selected for messages
  }, []);

  const handleShowChatDetailsFromList = useCallback((chat) => {
    setSelectedChatForDetails(chat);
  }, []);

  const handleCloseDetailsColumn = useCallback(() => {
    setSelectedChatForDetails(null);
  }, []);

  const handleListItemMoreActions = useCallback((chatId) => {
    console.log("More actions clicked for archived chat ID:", chatId);
  }, []);

  const activeArchivedChatUser = useMemo(() => {
    if (!selectedChatForMessages) return null;
    return {
      userName: selectedChatForMessages.participants || selectedChatForMessages.name,
      avatarSrc: selectedChatForMessages.avatarSrc,
      avatarInitial: selectedChatForMessages.avatarInitial,
      avatarBg: selectedChatForMessages.avatarBg,
      timestamp: selectedChatForMessages.chatStarted
    };
  }, [selectedChatForMessages]);

  const activeArchivedMessages = useMemo(() => {
    if (!selectedChatForMessages) return [];
    return selectedChatForMessages.messages || [];
  }, [selectedChatForMessages]);

  const handleNoOpSendMessage = useCallback(() => { console.log("Cannot send in archives"); }, []);

  const listColumnWidth = "w-1/4";
  const messageAreaWidth = "w-1/2"; // Adjusted to make space for a persistent details column
  const detailsColumnWidth = "w-1/4";

  return (
    <div className="flex flex-1 h-full overflow-hidden bg-slate-100">
      <ArchiveListColumn
        chats={archivedChats}
        selectedChatId={selectedChatForMessages?.id}
        onSelectChat={handleSelectChatForMessages}
        onShowChatDetails={handleShowChatDetailsFromList}
        onMoreActionsInList={handleListItemMoreActions}
        className={`${listColumnWidth} flex-shrink-0 border-r border-slate-200`}
      />

      <ChatMessageArea
        key={selectedChatForMessages?.id || 'no-chat-archive-messages'}
        chatUser={activeArchivedChatUser}
        messages={activeArchivedMessages}
        onSendMessage={handleNoOpSendMessage}
        isDetailsSidebarCollapsed={!!selectedChatForDetails} // Pass true if details are shown, false otherwise
        className={`${messageAreaWidth} flex-shrink-0`}
      />

      <ArchiveChatDetailsColumn
        key={selectedChatForDetails?.id || 'no-details-selected'}
        chatDetails={selectedChatForDetails?.details}
        onClose={handleCloseDetailsColumn}
        className={`${detailsColumnWidth} flex-shrink-0 h-full`}
      />
    </div>
  );
});

export default ArchivesPage;