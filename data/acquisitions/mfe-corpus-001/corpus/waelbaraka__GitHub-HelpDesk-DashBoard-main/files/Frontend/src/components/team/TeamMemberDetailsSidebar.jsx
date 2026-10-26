// src/components/team/TeamMemberDetailsSidebar.jsx
import React, { useState } from 'react';
import {
    XMarkIcon, ChevronDownIcon, InformationCircleIcon, UserCircleIcon,
    ClockIcon, ChartBarIcon, CalendarDaysIcon, Bars2Icon // Bars2Icon for drag handle
} from '@heroicons/react/24/outline'; // Or solid as needed

import {
    DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay
} from '@dnd-kit/core';
import {
    arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- Reusable Avatar (Simplified or import your shared AvatarDisplay) ---
const MemberAvatarDisplay = ({ initials, name, title, email, bgColorClass = 'bg-gray-400', size = 'w-16 h-16 text-xl' }) => (
    <div className="flex flex-col items-center text-center px-4 pt-4 pb-2">
        <div className={`${size} ${bgColorClass} rounded-full flex items-center justify-center text-white font-semibold mb-2`}>
            {initials}
        </div>
        <h3 className="text-md font-semibold text-content-text-primary">{name}</h3>
        {title && <p className="text-xs text-content-text-secondary">{title}</p>}
        {email && <p className="text-xs text-content-text-secondary mt-0.5">{email}</p>}
    </div>
);


// --- SortableSectionItem for TeamMemberDetailsSidebar ---
function SortableSectionItem({ id, title, titleIcon, children, defaultOpen = true, isDraggable = true }) {
    const {
        attributes, listeners, setNodeRef, transform, transition, isDragging
    } = useSortable({ id, disabled: !isDraggable }); // Disable sorting if not draggable

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : 1,
        zIndex: isDragging ? 100 : undefined,
    };

    const [isOpen, setIsOpen] = useState(defaultOpen);

    // If children is null/undefined, it's not collapsible (like the main Agent Info block)
    const isCollapsible = children != null;

    return (
        <div ref={setNodeRef} style={style} className="border-b border-table-border bg-details-sidebar-bg">
            <div className={`w-full flex justify-between items-center py-3 px-4 text-left focus:outline-none ${isCollapsible ? 'hover:bg-gray-100 cursor-pointer' : ''}`}
                 onClick={isCollapsible ? () => setIsOpen(!isOpen) : undefined}
            >
                <div className="flex items-center flex-1 min-w-0">
                    {isDraggable && (
                        <button type="button" {...attributes} {...listeners} className="p-1 mr-2 text-content-text-muted hover:text-content-text-primary cursor-grab active:cursor-grabbing focus:outline-none flex-shrink-0">
                            <Bars2Icon className="w-4 h-4" />
                        </button>
                    )}
                    {titleIcon && React.cloneElement(titleIcon, { className: "w-5 h-5 mr-2 text-content-text-secondary flex-shrink-0"})}
                    <span className="text-sm font-medium text-content-text-primary truncate">{title}</span>
                </div>
                {isCollapsible && (
                    <ChevronDownIcon className={`w-5 h-5 text-content-text-secondary transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} flex-shrink-0`} />
                )}
            </div>
            {isCollapsible && isOpen && <div className="px-4 pb-3 pt-1 text-sm">{children}</div>}
            {!isCollapsible && children && <div className="px-4 pb-3 pt-0 text-sm">{children}</div>} {/* For non-collapsible content like Agent Info */}
        </div>
    );
}


const TeamMemberDetailsSidebar = ({ agent, onClose }) => {
    if (!agent) return null;

    const displayAgent = { // Fallback for display if agent data is partial
        name: agent.name || "Unknown Agent",
        email: agent.email || "N/A",
        role: agent.role || "N/A",
        avatarInitials: agent.avatarInitials || agent.name?.substring(0,1).toUpperCase() || 'A',
        avatarBg: agent.avatarBg || 'bg-gray-500',
        title: agent.role === 'Owner' || agent.role === 'Admin' ? 'Product Expert' : 'Support Agent',
        chatLimit: agent.chatLimit || '6 concurrent chats',
        loginStatus: agent.status || 'N/A', // Assuming agent.status is login status here
        lastSeen: agent.lastSeen || 'Just now',
        groups: agent.groups || [{ id: 'g1', name: 'General', initial: 'G', color: 'bg-purple-500' }],
        performance: agent.performance || { totalChats: 0, goals: 0, satisfaction: 'n/a' }
    };

    // Define sections with unique IDs for dnd-kit
    // The `content` function returns the JSX for that section's body
    const initialSections = [
        {
            id: 'agentInfo', title: 'Agent Info (Not draggable)', isDraggable: false, // Main info block, not draggable or collapsible via header
            content: (
                <>
                    <MemberAvatarDisplay
                        initials={displayAgent.avatarInitials}
                        name={displayAgent.name}
                        title={displayAgent.title}
                        email={displayAgent.email}
                        bgColorClass={displayAgent.avatarBg}
                    />
                    {displayAgent.role === 'Owner' && <span className="mt-1 inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full ml-4">{displayAgent.role}</span>}
                    <div className="mt-3 space-y-1 text-xs text-content-text-secondary">
                        <p>Chat limit: <span className="text-content-text-primary font-medium">{displayAgent.chatLimit}</span></p>
                        <p>Login status: <span className="text-content-text-primary font-medium">{displayAgent.loginStatus}</span></p>
                        <p>Last seen: <span className="text-content-text-primary font-medium">{displayAgent.lastSeen}</span></p>
                    </div>
                </>
            )
        },
        { id: 'groups', title: `Groups (${displayAgent.groups.length})`, defaultOpen: true, titleIcon: <UserCircleIcon/>, content: (
            <div className="space-y-2">
                {displayAgent.groups.map(group => (
                    <div key={group.id || group.name} className="flex items-center">
                        <span className={`w-5 h-5 ${group.color || 'bg-gray-400'} rounded-full flex items-center justify-center text-white text-[10px] font-semibold mr-2`}>
                            {group.initial}
                        </span>
                        <span className="text-content-text-primary">{group.name}</span>
                    </div>
                ))}
            </div>
        )},
        { id: 'workingHours', title: 'Working hours', defaultOpen: true, titleIcon: <ClockIcon/>, content: (
            <div className="bg-yellow-50 p-3 rounded-md text-center space-y-2">
                <CalendarDaysIcon className="w-8 h-8 text-yellow-500 mx-auto"/>
                <p className="text-xs text-yellow-700">Set working hours to better manage staffing.</p>
                <div className="flex justify-center space-x-2">
                    <button className="text-xs bg-yellow-400 hover:bg-yellow-500 text-yellow-800 px-3 py-1 rounded-md font-medium">Get feature</button>
                    <button className="text-xs text-yellow-600 hover:underline">Learn more</button>
                </div>
            </div>
        )},
        { id: 'performance', title: 'Performance', defaultOpen: true, titleIcon: <ChartBarIcon/>, content: (
             <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-content-text-secondary">Total chats</span> <span className="text-content-text-primary font-medium">{displayAgent.performance.totalChats}</span></div>
                <div className="flex justify-between"><span className="text-content-text-secondary">Goals</span> <span className="text-content-text-primary font-medium">{displayAgent.performance.goals}</span></div>
                <div className="flex justify-between"><span className="text-content-text-secondary">Chat satisfaction</span> <span className="text-content-text-primary font-medium">{displayAgent.performance.satisfaction}</span></div>
                <button className="mt-2 w-full text-sm text-center py-1.5 border border-table-border hover:bg-gray-50 rounded-md text-content-text-primary font-medium">
                    View reports
                </button>
            </div>
        )},
    ];

    const [sections, setSections] = useState(initialSections);
    const [activeDragId, setActiveDragId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), // Start drag after 5px move
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    function handleDragStart(event) {
        setActiveDragId(event.active.id);
    }

    function handleDragEnd(event) {
        setActiveDragId(null);
        const { active, over } = event;
        if (over && active.id !== over.id) {
            // Only allow reordering for draggable items
            const activeItem = sections.find(s => s.id === active.id);
            const overItem = sections.find(s => s.id === over.id);

            if (activeItem?.isDraggable !== false && overItem?.isDraggable !== false) {
                setSections((currentSections) => {
                    const oldIndex = currentSections.findIndex(item => item.id === active.id);
                    const newIndex = currentSections.findIndex(item => item.id === over.id);
                    return arrayMove(currentSections, oldIndex, newIndex);
                });
            }
        }
    }

    return (
        <div className="w-[var(--spacing-details-sidebar-w)] flex-shrink-0 border-l border-table-border bg-details-sidebar-bg flex flex-col">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-table-border h-[var(--height-page-section-header)]">
                <h2 className="text-md font-semibold text-content-text-primary">Details</h2>
                <button onClick={onClose} className="p-1.5 text-content-text-secondary hover:bg-gray-100 rounded-full">
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Scrollable Content Area with DnD */}
            <div className="flex-grow overflow-y-auto scrollbar-thin">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    {/* The Agent Info (non-draggable, non-collapsible header part) */}
                    {sections.find(s => s.id === 'agentInfo') && (
                        <SortableSectionItem
                            id="agentInfo"
                            title="" // Title is not shown, content is directly rendered
                            isDraggable={false} // This section is not draggable
                        >
                            {initialSections.find(s => s.id === 'agentInfo').content}
                        </SortableSectionItem>
                    )}

                    {/* Draggable and Collapsible Sections */}
                    <SortableContext 
                        items={sections.filter(s => s.isDraggable !== false).map(s => s.id)} // Only draggable items
                        strategy={verticalListSortingStrategy}
                    >
                        {sections.filter(s => s.isDraggable !== false).map(section => ( // Render only draggable sections here
                            <SortableSectionItem
                                key={section.id}
                                id={section.id}
                                title={section.title}
                                titleIcon={section.titleIcon}
                                defaultOpen={section.defaultOpen}
                                isDraggable={section.isDraggable !== false}
                            >
                                {section.content}
                            </SortableSectionItem>
                        ))}
                    </SortableContext>
                    <DragOverlay>
                        {activeDragId ? (
                            <div className="p-3 px-4 border border-blue-300 bg-blue-50 shadow-lg rounded text-sm font-medium text-blue-700 opacity-90 cursor-grabbing">
                                <div className="flex items-center">
                                    <Bars2Icon className="w-4 h-4 mr-2" />
                                    {sections.find(s => s.id === activeDragId)?.title}
                                </div>
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
};

export default TeamMemberDetailsSidebar;