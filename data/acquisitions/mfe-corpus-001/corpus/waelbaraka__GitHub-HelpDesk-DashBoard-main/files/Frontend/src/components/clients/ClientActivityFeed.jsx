// src/components/clients/ClientActivityFeed.jsx
import React from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';

const ClientActivityFeed = React.memo(({ client }) => {
  if (!client) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 bg-gray-100 border-r border-gray-200">
        Select a client to view their activity.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-100 border-r border-gray-200">
      {/* Header */}
      <div className="p-3 flex items-center justify-between border-b border-gray-200 h-[var(--height-page-section-header)]">
        <div className="flex items-center space-x-2">
          {client.avatarColor ? ( // Using avatarColor as a class
            <div className={`w-9 h-9 ${client.avatarColor} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
              {client.avatarInitials}
            </div>
          ) : (
            // Fallback if no specific avatarColor
            <div className={`w-9 h-9 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
              {client.avatarInitials}
            </div>
          )}
          <span className="font-medium text-gray-800">{client.name}</span>
        </div>
        <button className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-full">
          <EllipsisHorizontalIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Activity Feed Area */}
      <div className="flex-grow p-3 space-y-2 overflow-y-auto scrollbar-thin">
        <div className="text-center text-xs text-gray-500 my-2">
          Activity Feed: {client.name}
        </div>
        <div className="bg-white p-3 rounded-md shadow-sm">
            <p className="text-sm font-medium text-gray-800">New appointment booked!</p>
            <p className="text-xs text-gray-600">Client booked 'Initial Consultation' for Dec 1, 10:00 AM.</p>
            <span className="text-xs text-gray-400">2 hours ago</span>
        </div>
        <div className="bg-white p-3 rounded-md shadow-sm">
            <p className="text-sm font-medium text-gray-800">Client sent a chat message.</p>
            <p className="text-xs text-gray-600">"Hi, I have a question about my recent booking."</p>
            <span className="text-xs text-gray-400">Yesterday</span>
        </div>
        {/* More dummy activities */}
      </div>

      {/* Input Area (Placeholder for quick notes/log activity) */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <textarea
          placeholder="Add a quick note or log activity..."
          rows="2"
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-300 outline-none resize-none mb-2"
        />
        <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium">
                Log Activity
            </button>
        </div>
      </div>
    </div>
  );
});

export default ClientActivityFeed;