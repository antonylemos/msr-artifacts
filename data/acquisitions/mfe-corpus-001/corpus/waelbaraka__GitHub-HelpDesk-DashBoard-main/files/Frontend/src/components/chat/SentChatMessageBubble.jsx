// src/components/chat/SentChatMessageBubble.jsx
import React from 'react';

const SentChatMessageBubble = React.memo(({ messageText, isLink = false }) => {
  return (
    // Base styles for the blue bubble
    // Added hover:bg-blue-700 for darker shade on hover
    // Added cursor-pointer (optional, but common for bubbles)
    <div className="bg-blue-600 text-white rounded-xl rounded-br-lg px-3.5 py-2.5 text-sm shadow-sm break-words transition-colors duration-100 hover:bg-blue-700 cursor-pointer">
      {isLink ? (
        <a href={messageText} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200">
          {messageText}
        </a>
      ) : (
        messageText
      )}
    </div>
  );
});

export default SentChatMessageBubble;