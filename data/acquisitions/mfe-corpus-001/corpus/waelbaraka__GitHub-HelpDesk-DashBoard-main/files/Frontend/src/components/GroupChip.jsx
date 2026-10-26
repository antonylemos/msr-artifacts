import React from 'react';

const getAvatarColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'];
  return colors[Math.abs(hash) % colors.length];
};

const GroupChip = ({ group, onRemove, isLocked = false }) => {
  const initial = group.name.charAt(0).toUpperCase();
  const avatarColor = getAvatarColor(group.name);

  return (
    <div className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-800">
      <span className={`flex-shrink-0 w-5 h-5 rounded-full ${avatarColor} flex items-center justify-center text-xs font-bold text-white mr-2`}>
        {initial}
      </span>
      <span>{group.name}</span>
      {!isLocked && (
        <button
          onClick={() => onRemove(group.id)}
          className="ml-2 -mr-1 flex-shrink-0 text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label={`Remove ${group.name}`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default GroupChip;