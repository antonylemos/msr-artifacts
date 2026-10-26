// src/components/common/GeneralInfoDisplay.jsx
import React from 'react';
// Import any icons you might want to use here, e.g., for location, time, etc.
// For now, keeping it simple with text.

const GeneralInfoDisplay = React.memo(({ item }) => {
    if (!item) return <div className=" p-4 text-gray-500">No data available.</div>;

    // Adapt to different possible structures of 'item' (agent or contact)
    const name = item.name || item.userName || 'N/A';
    const email = item.email || 'N/A';
    const role = item.role; // Specific to agent
    const jobTitle = item.jobTitle; // Specific to agent (or could be adapted)
    const location = item.location; // Common for contact
    const localTime = item.localTime; // Common for contact
    const chatLimit = item.chatLimit; // Specific to agent
    const loginStatus = item.status; // Agent status
    const lastSeen = item.lastSeen; // Agent last seen

    const avatarInitial = item.avatarInitial || (name !== 'N/A' ? name.charAt(0) : '?');
    const avatarBg = item.avatarColor || item.avatarBg || 'bg-gray-400';

    // Determine if this is more like an agent or a general contact
    const isAgentProfile = !!role || !!jobTitle || chatLimit !== undefined;

    return (
        <div className="space-y-3  p-4"> {/* Outer padding handled by SortableSectionItem */}
            {/* Avatar, Name, Email - Common part */}
            <div className="flex items-center">
                <div className={`w-12 h-12 ${avatarBg} rounded-full flex items-center justify-center text-white text-2xl font-semibold mr-4 flex-shrink-0`}>
                    {avatarInitial}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate" title={name}>{name}</h3>
                    <p className="text-sm text-gray-600 truncate" title={email}>{email}</p>
                    {isAgentProfile && jobTitle && <p className="text-xs text-gray-500 mt-0.5">{jobTitle}</p>}
                    {isAgentProfile && role && <span className={`mt-1 inline-block text-xs font-medium px-2 py-0.5 rounded-full ${role === 'Owner' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>{role}</span>}
                </div>
            </div>

            {/* Location and Time (more common for chat contact) */}
            {(location || localTime) && (
                <div className="text-sm text-gray-600 space-y-1 pt-1">
                    {location && <p><span className="font-medium">Location:</span> {location}</p>}
                    {localTime && <p><span className="font-medium">Local Time:</span> {localTime}</p>}
                </div>
            )}

            {/* Agent specific details */}
            {isAgentProfile && (
                <div className="text-sm text-gray-600 space-y-1 pt-1">
                    {chatLimit !== undefined && <p><span className="font-medium">Chat limit:</span> {chatLimit} concurrent chats</p>}
                    {loginStatus && <p><span className="font-medium">Login status:</span> {loginStatus}</p>}
                    {lastSeen && <p><span className="font-medium">Last seen:</span> {lastSeen}</p>}
                </div>
            )}

            {/* Map Placeholder - if you want this to be part of general info */}
            <div className="mt-3 h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                Map Placeholder
            </div>
        </div>
    );
});

export default GeneralInfoDisplay;