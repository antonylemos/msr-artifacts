// src/components/TopBar.jsx
import React from 'react';
import { MagnifyingGlassIcon, UserCircleIcon, PlusIcon } from '@heroicons/react/24/outline'; // or solid

const TopBar = React.memo(() => { // <<<< Add React.memo
  return (
    <div className="h-10 bg-top-bar-bg text-top-bar-text flex items-center justify-between border-primary-sidebar-icon-active-bg">
      {/* Left Side: Search */}
      <div className="flex items-center">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-primary-sidebar-icon-default" />
          </div>
          <input
            type="text"
            placeholder="Search or ask"
            className="bg-top-bar-search-bg text-sm rounded-md py-1.5 pl-10 pr-4 w-64 focus:ring-1 focus:ring-button-primary-blue-bg focus:border-button-primary-blue-bg outline-none"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-primary-sidebar-icon-default">
            Ctrl K
          </div>
        </div>
      </div>

      {/* Right Side: User, Invite */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1">
            <div className="w-5 h-5 bg-avatar-yellow-bg rounded-full flex items-center justify-center text-xs font-semibold text-avatar-yellow-text">W</div>
            <span className="text-sm font-medium">2</span>
        </div>
        <button className="flex items-center bg-button-primary-bg hover:bg-button-primary-hover-bg text-sm text-button-primary-text px-3 py-1 rounded-md">
          <PlusIcon className="w-4 h-4 mr-1.5" />
          Invite
        </button>
        {/* You can add more icons or notifications here */}
        <div className="relative">
          <UserCircleIcon className="h-7 w-7 text-primary-sidebar-icon-default" />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center border-2 border-top-bar-bg">
            1 {/* Notification count */}
          </span>
        </div>
      </div>
    </div>
  );
});


export default TopBar;