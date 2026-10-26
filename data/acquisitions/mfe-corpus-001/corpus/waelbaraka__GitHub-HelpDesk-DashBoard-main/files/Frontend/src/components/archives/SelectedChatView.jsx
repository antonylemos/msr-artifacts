// src/components/archives/SelectedChatView.jsx
import React, { useState, useCallback } from 'react';
import {
    LinkIcon, EllipsisHorizontalIcon, PhoneIcon, VideoCameraIcon, InformationCircleIcon as InfoIconSolid, PlusIcon,
    ChevronUpIcon, ChevronDownIcon, XMarkIcon // For removing tags
} from '@heroicons/react/24/solid'; // Using solid icons for simplicity

import ChatMessageBubble from '../chat/ChatMessageBubble'; // <<<< IMPORT REUSABLE BUBBLE


const SelectedChatView = React.memo(({ chat, onToggleDetails, isDetailsSidebarOpen, className }) => {
    const [showPreviousChat, setShowPreviousChat] = useState(true);

    if (!chat) {
        return <div className={`${className} flex-shrink-0 flex items-center justify-center p-6 text-gray-500 bg-white`}>No chat selected.</div>;
    }

    const handleTogglePreviousChat = useCallback(() => setShowPreviousChat(prev => !prev), []);
    const handleAddTag = useCallback(() => console.log('Add tag clicked'), []);
    const handleRemoveTag = useCallback((tagToRemove) => console.log('Remove tag:', tagToRemove), []);


    return (
        <div className={`${className} bg-white flex flex-col
                        ${isDetailsSidebarOpen ? '' : 'border-r border-gray-200'}`}> {/* Right border only if details sidebar is closed */}
            {/* Header */}
            <div className="p-3 flex items-center justify-between border-b border-gray-200 h-[60px] flex-shrink-0">
                <h2 className="text-lg font-medium text-gray-800 truncate">{chat.participants || chat.name}</h2>
                <div className="flex items-center space-x-1">
                    <button title="Link" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><LinkIcon className="w-5 h-5"/></button>
                    <button title="More options" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><EllipsisHorizontalIcon className="w-5 h-5"/></button>
                    <span className="h-5 border-l border-gray-300 mx-1.5"></span> {/* Separator */}
                    <button title="Call" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><PhoneIcon className="w-5 h-5"/></button>
                    <button title="Video call" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><VideoCameraIcon className="w-5 h-5"/></button>
                    <button
                        onClick={onToggleDetails}
                        title="Toggle Details"
                        className={`p-2 rounded-full
                                    ${isDetailsSidebarOpen
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                        <InfoIconSolid className="w-5 h-5"/>
                    </button>
                    <button title="Add" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><PlusIcon className="w-5 h-5"/></button>
                </div>
            </div>

            {/* Message Area */}
            <div className="flex-grow p-4 md:p-6 space-y-4 overflow-y-auto scrollbar-thin">
                {/* Previous Chat Banner */}
                <div className="text-center my-3">
                    <button onClick={handleTogglePreviousChat} className="text-xs text-blue-600 hover:underline flex items-center mx-auto font-medium">
                        {showPreviousChat ? <ChevronUpIcon className="w-3.5 h-3.5 mr-1"/> : <ChevronDownIcon className="w-3.5 h-3.5 mr-1"/>}
                        Previous chat with this customer
                    </button>
                    {showPreviousChat && <p className="text-xs text-gray-400 mt-0.5">Started - Yesterday 20:01</p>} {/* Use dynamic data */}
                </div>

                {/* Actual Messages */}
                {(chat.messages || []).map((msg) => (
                    <ChatMessageBubble
                        key={msg.id}
                        message={msg}
                        isYou={msg.isYou}
                        // Assuming msg.isPreChatForm and preChatForm data is inside msg if needed
                    />
                ))}

                {/* Archived Footer */}
                <div className="text-center py-6 mt-auto border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-3">This chat has been archived.</p>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Open chat
                    </button>
                </div>
            </div>

            {/* Add Tag Footer */}
            <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0 flex items-center justify-between">
                <button onClick={handleAddTag} className="text-sm text-blue-600 hover:underline flex items-center font-medium">
                    <PlusIcon className="w-4 h-4 mr-1.5" /> Add tag
                </button>
                <div className="flex flex-wrap gap-1">
                    {(chat.tags || []).map(tag => (
                        <span key={tag} className="inline-flex items-center bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">
                            {tag}
                            <button onClick={() => handleRemoveTag(tag)} className="ml-1 -mr-1 p-0.5 rounded-full hover:bg-gray-200">
                                <XMarkIcon className="w-3 h-3 text-gray-500" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default SelectedChatView;