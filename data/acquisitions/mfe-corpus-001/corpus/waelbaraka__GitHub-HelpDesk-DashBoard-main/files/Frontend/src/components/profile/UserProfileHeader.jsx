import React from 'react';

// This would fetch and display the user's main info
const UserProfileHeader = ({ user }) => {
  return (
    <div className="flex items-center space-x-5 pb-6 border-b border-gray-200 mb-6">
      <img
        className="h-24 w-24 rounded-full"
        src={user.profilePictureUrl || 'https://via.placeholder.com/150'}
        alt="Profile"
      />
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>
        <p className="text-sm font-medium text-gray-500">{user.jobTitle}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfileHeader;