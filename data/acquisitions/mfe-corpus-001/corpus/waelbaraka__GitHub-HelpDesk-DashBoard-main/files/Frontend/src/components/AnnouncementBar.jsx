// src/components/AnnouncementBar.jsx
import React, { useState, useCallback } from 'react'; // Import useCallback
import { XMarkIcon } from '@heroicons/react/24/solid';

const AnnouncementBar = React.memo(() => { // Wrap the component with React.memo
  const [isVisible, setIsVisible] = useState(true);

  // Memoize the dismiss handler using useCallback
  // This ensures the function reference doesn't change on every re-render
  // unless its dependencies (none in this case) change.
  const handleDismiss = useCallback(() => {
    setIsVisible(false);
  }, []); // Empty dependency array because setIsVisible is stable and no other external state is used

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-announcement-bg text-announcement-text px-4 py-2 rounded-lg m-1 flex items-center justify-between text-sm relative">
      <div className="flex-grow text-center md:text-left">
        <span>Never miss a chat! Important updates and features are here.</span>
      </div>
      <div className="flex items-center flex-shrink-0 ml-4">
        <button className="bg-announcement-button-bg text-announcement-button-text hover:bg-announcement-button-hover-bg px-3 py-1 rounded-md font-medium text-xs transition-colors">
          Download Desktop app
        </button>
        <button
          onClick={handleDismiss} // Use the memoized handler
          className="ml-3 p-1 text-announcement-text hover:bg-white/20 rounded-full focus:outline-none"
          aria-label="Dismiss announcement"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

export default AnnouncementBar;