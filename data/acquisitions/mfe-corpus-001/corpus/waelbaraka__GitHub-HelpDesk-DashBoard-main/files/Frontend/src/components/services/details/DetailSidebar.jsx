// src/components/common/DetailSidebar.jsx
import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const DetailSidebar = ({ title, selectedItem, onClose, children }) => {
    // If no item is selected, render nothing (or an empty state)
    if (!selectedItem) {
        return null;
    }

    return (
        // The overlay for a responsive mobile view, and the main sidebar container
        <div className="fixed inset-0 z-40">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>

            {/* Sidebar Panel */}
            <div className="relative z-50 bg-white w-96 max-w-[90vw] h-full flex flex-col shadow-xl ml-auto">
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-slate-200 flex-shrink-0">
                    <h2 className="text-lg font-semibold text-slate-800 truncate">{title}</h2>
                    <button onClick={onClose} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-full">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-grow overflow-y-auto scrollbar-thin">
                    {/* We pass the selectedItem to the children so they can access its data */}
                    {React.Children.map(children, child =>
                        React.cloneElement(child, { item: selectedItem })
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailSidebar;