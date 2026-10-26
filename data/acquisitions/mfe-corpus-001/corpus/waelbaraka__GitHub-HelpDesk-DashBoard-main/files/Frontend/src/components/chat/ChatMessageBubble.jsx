// src/components/chat/ChatMessageBubble.jsx
import React from 'react';
import SentChatMessageBubble from './SentChatMessageBubble'; // <<<< IMPORT NEW COMPONENT

// Avatar component (reused from ArchivesPage, or centralize this if used more widely)
const MessageAvatar = React.memo(({ initial, bgColorClass = 'bg-gray-400', size = 'w-7 h-7' }) => (
    <div className={`${size} ${bgColorClass} rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-sm`}>
        {initial}
    </div>
));

// Reusable Message Bubble Component
const ChatMessageBubble = React.memo(({ message, isYou }) => {
    const alignClass = isYou ? 'justify-end' : 'justify-start';
    const messageContainerClass = isYou ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'; // For avatar placement

    // Style for received message
    const receivedMessageBoxClass = 'bg-gray-100 text-gray-800 rounded-xl rounded-bl-lg hover:bg-gray-200 cursor-pointer transition-colors duration-100';

    // Special handling for pre-chat form bubbles
    if (message.isPreChatForm) {
        return (
            <div className="flex justify-start mb-2">
                <div className="flex items-end space-x-2 max-w-[75%]">
                    {message.avatarInitial && (
                        <MessageAvatar initial={message.avatarInitial} bgColorClass={message.avatarBg} />
                    )}
                    <div className="bg-gray-100 text-gray-800 rounded-xl rounded-bl-lg px-3.5 py-2.5 text-sm shadow-sm">
                        <h4 className="text-sm font-semibold mb-1">Pre-chat form</h4>
                        <p className="text-xs">Name: <span className="font-medium">{message.preChatForm.name}</span></p>
                        <p className="text-xs">E-mail: <a href={`mailto:${message.preChatForm.email}`} className="text-blue-600 hover:underline">{message.preChatForm.email}</a></p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex ${alignClass} mb-2`}>
            <div className={`flex items-end max-w-[75%] ${messageContainerClass}`}>
                {/* Avatar */}
                {!isYou && message.avatarInitial && (
                    <MessageAvatar initial={message.avatarInitial} bgColorClass={message.avatarBg} />
                )}

                {/* Message Content: Conditional rendering based on isYou */}
                {isYou ? (
                    <SentChatMessageBubble messageText={message.text} isLink={message.link} /> // Use the new component for sent messages
                ) : (
                    // Render received message directly here
                    <div className={`px-3.5 py-2.5 ${receivedMessageBoxClass}`}>
                        {message.text}
                    </div>
                )}

                {/* Avatar for sent messages (if you) - placed after bubble in reverse row */}
                {isYou && message.avatarInitial && (
                    <MessageAvatar initial={message.avatarInitial} bgColorClass={message.avatarBg} />
                )}
            </div>
        </div>
    );
});

export default ChatMessageBubble;