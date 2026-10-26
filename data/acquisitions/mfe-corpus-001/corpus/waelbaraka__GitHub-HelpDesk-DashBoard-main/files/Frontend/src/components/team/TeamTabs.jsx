// src/components/team/TeamTabs.jsx
import React from 'react';

const TeamTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-1 border-b border-gray-200 -mb-px"> {/* -mb-px to align with parent's bottom border */}
      {tabs.map((tabName) => (
        <button
          key={tabName}
          onClick={() => onTabChange(tabName)}
          className={`px-3 py-3 text-sm font-medium focus:outline-none whitespace-nowrap ${
            activeTab === tabName
              ? 'border-b-2 border-indigo-600 text-indigo-600 font-semibold'
              : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          aria-current={activeTab === tabName ? 'page' : undefined}
        >
          {tabName}
        </button>
      ))}
    </div>
  );
};

export default React.memo(TeamTabs);