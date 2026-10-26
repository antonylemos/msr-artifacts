// src/components/archives/ArchiveListColumn.jsx
import React, { useState, useCallback, useMemo } from 'react';
import {
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
    ChevronDownIcon,
    InformationCircleIcon,
    EllipsisHorizontalIcon
} from '@heroicons/react/24/solid';

const ArchiveListItem = React.memo(({ chat, isSelected, onSelect, onShowDetails, onMoreActions }) => {
    // --- FIX: Change outer element from <button> to <div> ---
    // Add role="button" and tabIndex="0" for accessibility
    // Add keydown listener for Space/Enter if desired for full button behavior

    const baseClasses = `w-full text-left p-3 border-b border-gray-200 transition-colors duration-150 relative`;
    const selectedClasses = 'bg-page-nav-item-hover-bg'; // Or your specific selected background
    const hoverClasses = 'hover:bg-gray-50';

    const textDefaultClass = 'text-gray-800';
    const textMutedClass = 'text-gray-500';
    const textActiveClass = 'text-blue-700 font-semibold'; // If you want to apply to text when selected

    const checkboxClass = `mr-2.5 h-4 w-4 rounded border-gray-400 bg-white text-blue-600 focus:ring-blue-500 focus:ring-1`;
    const newDotClass = `w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0`;
    const tagBaseClass = `text-[11px] px-1.5 py-0.5 rounded-full`;
    const tagColorClass = `bg-gray-100 text-gray-700`;
    const notificationBadgeClass = `text-xs bg-red-500 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none text-[10px]`;

    const handleShowDetailsClick = (e) => {
        e.stopPropagation(); // Prevent onSelect from firing if this button is clicked
        onShowDetails(chat);
    };

    const handleMoreActionsClick = (e) => {
        e.stopPropagation(); // Prevent onSelect from firing
        if (onMoreActions) {
            onMoreActions(chat.id);
        } else {
            console.log('More actions for chat:', chat.id);
        }
    };

    const handleKeyDown = (e) => {
        // Trigger onSelect if Space or Enter is pressed on the div
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onSelect(chat);
        }
    };

    return (
        <div // --- CHANGED from <button> to <div> ---
            onClick={() => onSelect(chat)}
            onKeyDown={handleKeyDown} // For keyboard accessibility
            role="button" // ARIA role
            tabIndex={0}  // Make it focusable
            aria-pressed={isSelected} // Indicate if it's "pressed" or selected
            className={`${baseClasses} ${isSelected ? selectedClasses : hoverClasses} cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300`} // Added cursor-pointer and focus styles
        >
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center min-w-0">
                    <input
                        type="checkbox"
                        className={checkboxClass}
                        onClick={e => e.stopPropagation()} // Keep stopPropagation for checkbox
                        aria-label={`Select chat ${chat.name}`}
                    />
                    {chat.isNew && <span className={newDotClass} title="New"></span>}
                    <span className={`text-sm font-medium truncate ${isSelected ? textActiveClass : textDefaultClass}`}>
                        {chat.name}
                    </span>
                </div>
                {/* Grouped Action Icons on the right */}
                <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                    <button // This is now a valid nested button
                        onClick={handleShowDetailsClick}
                        title="View Details"
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    >
                        <InformationCircleIcon className="w-5 h-5" />
                    </button>
                    <button // This is now a valid nested button
                        onClick={handleMoreActionsClick}
                        title="More actions"
                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                    >
                        <EllipsisHorizontalIcon className="w-5 h-5" />
                    </button>
                    <span className={`${textMutedClass} text-xs whitespace-nowrap pl-1`}>{chat.timestamp}</span>
                </div>
            </div>

            <p className={`${textMutedClass} text-xs mb-1 ml-[2.125rem]`}>
                Agent: {chat.agent}
            </p>
            <p className={`${textMutedClass} text-xs truncate mb-1.5 ml-[2.125rem]`}>
                {chat.preview}
            </p>
            <div className="flex items-center justify-between ml-[2.125rem]">
                <div className="flex flex-wrap gap-1.5">
                    {(chat.tags || []).map(tag => (
                        <span key={tag} className={`${tagBaseClass} ${tagColorClass}`}>
                            {tag}
                        </span>
                    ))}
                </div>
                {chat.notificationCount > 0 && (
                    <span className={notificationBadgeClass}>
                        {chat.notificationCount}
                    </span>
                )}
            </div>
        </div> // --- CHANGED from </button> to </div> ---
    );
});

// ... (Rest of ArchiveListColumn.jsx remains the same)
const ArchiveListColumn = React.memo(({ chats, selectedChatId, onSelectChat, onShowChatDetails, onMoreActionsInList, className }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('Newest');
    const filteredChats = useMemo(() => { return chats.filter(chat => (chat.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || (chat.agent?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || (chat.preview?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || (chat.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))); }, [chats, searchTerm]);
    const sortedChats = useMemo(() => { return [...filteredChats].sort((a, b) => { if (sortOrder === 'Newest') return (b.timestampRaw || 0) - (a.timestampRaw || 0); if (sortOrder === 'Oldest') return (a.timestampRaw || 0) - (b.timestampRaw || 0); return 0; });}, [filteredChats, sortOrder]);
    const totalChats = chats.length;
    const newChatsCount = chats.filter(c => c.isNew).length;
    const columnBgClass = 'bg-white'; const borderColorClass = 'border-gray-200'; const headingTextClass = 'text-gray-800'; const mutedTextClass = 'text-gray-500'; const defaultTextClass = 'text-gray-700'; const iconButtonHoverBgClass = 'hover:bg-gray-100'; const searchInputBgClass = 'bg-gray-50'; const highlightBlueClass = 'blue-600';

    return (
        <div className={`${className} ${columnBgClass} border-r ${borderColorClass} flex flex-col`}>
            <div className={`p-4 flex items-center justify-between border-b ${borderColorClass} h-[60px] flex-shrink-0`}>
                 <h1 className={`text-xl font-semibold ${headingTextClass}`}>Archives</h1>
                <button className={`p-1.5 ${mutedTextClass} ${iconButtonHoverBgClass} rounded-md`}> <AdjustmentsHorizontalIcon className="w-5 h-5" /> </button>
            </div>
            <div className={`p-3 border-b ${borderColorClass} flex-shrink-0`}>
                <div className="relative mb-2.5">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> <MagnifyingGlassIcon className={`h-4 w-4 ${mutedTextClass}`} /> </div>
                    <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search in archives..." className={`w-full ${searchInputBgClass} ${defaultTextClass} text-sm rounded-md py-2 pl-9 pr-3 border ${borderColorClass} focus:ring-1 focus:ring-${highlightBlueClass} focus:border-${highlightBlueClass} outline-none placeholder-${mutedTextClass}`} />
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className={mutedTextClass}> {totalChats} chats {newChatsCount > 0 && `• ${newChatsCount} new`} </span>
                    <div className="relative">
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={`${mutedTextClass} bg-transparent hover:${defaultTextClass} border-none text-xs focus:ring-0 focus:outline-none appearance-none pr-5 cursor-pointer`}>
                            <option value="Newest" className={`bg-white ${defaultTextClass}`}>Newest</option> <option value="Oldest" className={`bg-white ${defaultTextClass}`}>Oldest</option>
                        </select>
                        <ChevronDownIcon className={`w-3.5 h-3.5 ${mutedTextClass} absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none`} />
                    </div>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto scrollbar-thin">
                {sortedChats.length > 0 ? (
                    sortedChats.map(chat => (
                        <ArchiveListItem key={chat.id} chat={chat} isSelected={chat.id === selectedChatId} onSelect={onSelectChat} onShowDetails={onShowChatDetails} onMoreActions={onMoreActionsInList} />
                    ))
                ) : ( <p className={`p-6 text-sm text-center ${mutedTextClass}`}> {searchTerm ? `No results for "${searchTerm}"` : "No archived chats."} </p> )}
            </div>
        </div>
    );
});
export default ArchiveListColumn;