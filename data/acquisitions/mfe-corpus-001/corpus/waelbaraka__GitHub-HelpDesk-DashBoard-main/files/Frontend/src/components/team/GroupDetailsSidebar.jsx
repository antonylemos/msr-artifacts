// src/components/team/GroupDetailsSidebar.jsx
import React, { useState } from 'react';
import {
    XMarkIcon, ChevronDownIcon, InformationCircleIcon, PencilIcon,
    UserGroupIcon, ChartBarIcon, LinkIcon, CogIcon, Bars2Icon // CogIcon for Routing rules
} from '@heroicons/react/24/outline';
import {
    DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay
} from '@dnd-kit/core';
import {
    arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- Reusable AvatarDisplay (Simplified or import your shared AvatarDisplay) ---
const GroupAvatarDisplay = ({ initial, name, id, description, bgColorClass = 'bg-gray-400', isDefault }) => (
    <div className="px-4 pt-4 pb-3">
        <div className="flex items-start">
            <div className={`w-12 h-12 ${bgColorClass} rounded-md flex items-center justify-center text-white text-xl font-semibold mr-3 flex-shrink-0`}>
                {initial}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center">
                    <h3 className="text-md font-semibold text-content-text-primary truncate">{name}</h3>
                    {isDefault && <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded-full font-medium">DEFAULT</span>}
                    <button className="ml-auto p-1 text-content-text-secondary hover:text-content-text-primary"><PencilIcon className="w-4 h-4"/></button>
                </div>
                {id && <p className="text-xs text-content-text-secondary">ID: {id}</p>}
            </div>
        </div>
        {description && <p className="mt-2 text-xs text-content-text-secondary">{description}</p>}
    </div>
);


// --- SortableSectionItem (Similar to the one in TeamMemberDetailsSidebar) ---
function SortableSectionItem({ id, title, titleIcon, children, defaultOpen = true }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.7 : 1, zIndex: isDragging ? 100 : undefined };
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div ref={setNodeRef} style={style} className="border-b border-table-border bg-details-sidebar-bg">
            <div className="w-full flex justify-between items-center py-3 px-4 text-left hover:bg-gray-100 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center flex-1 min-w-0">
                    <button type="button" {...attributes} {...listeners} className="p-1 mr-2 text-content-text-muted hover:text-content-text-primary cursor-grab active:cursor-grabbing focus:outline-none flex-shrink-0">
                        <Bars2Icon className="w-4 h-4" />
                    </button>
                    {titleIcon && React.cloneElement(titleIcon, { className: "w-5 h-5 mr-2 text-content-text-secondary flex-shrink-0"})}
                    <span className="text-sm font-medium text-content-text-primary truncate">{title}</span>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-content-text-secondary transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} flex-shrink-0`} />
            </div>
            {isOpen && <div className="px-4 pb-3 pt-1 text-sm">{children}</div>}
        </div>
    );
}

// --- Placeholder Content Components for Group Details ---
const MembersContent = ({ members }) => (
    <div className="space-y-2">
        {(members || []).map(member => (
            <div key={member.id} className="flex items-center">
                 <div className={`w-6 h-6 ${member.avatarBg || 'bg-gray-300'} rounded-full flex items-center justify-center text-white text-[10px] font-semibold mr-2`}>
                    {member.avatarInitials}
                </div>
                <span className="text-content-text-primary">{member.name}</span>
                {/* Add email or other info if needed */}
            </div>
        ))}
        {(!members || members.length === 0) && <p className="text-content-text-secondary">No members in this group.</p>}
    </div>
);
const PerformanceContent = ({ performance }) => (
    <div className="space-y-2 text-xs">
        <div className="flex justify-between"><span className="text-content-text-secondary">Total chats</span> <span className="text-content-text-primary font-medium">{performance?.totalChats || 0}</span></div>
        <div className="flex justify-between"><span className="text-content-text-secondary">Goals</span> <span className="text-content-text-primary font-medium">{performance?.goals || 0}</span></div>
        <div className="flex justify-between"><span className="text-content-text-secondary">Chat satisfaction</span> <span className="text-content-text-primary font-medium">{performance?.satisfaction || 'n/a'}</span></div>
        <button className="mt-2 w-full text-sm text-center py-1.5 border border-table-border hover:bg-gray-50 rounded-md text-content-text-primary font-medium">View reports</button>
    </div>
);
const ChatAssignmentContent = () => (
    <div><a href="#" className="text-link-text hover:underline">Manage chat assignment</a></div>
);
const RoutingRulesContent = () => (
    <div><a href="#" className="text-link-text hover:underline">Manage routing rules</a></div>
);
// --- End Placeholder Content Components ---


const GroupDetailsSidebar = ({ group, onClose }) => {
    if (!group) return null;

    const initialGroupSections = [
        { id: 'members', title: `Members (${group.members?.length || 0})`, defaultOpen: true, titleIcon: <UserGroupIcon/>, content: <MembersContent members={group.members} /> },
        { id: 'performance', title: 'Performance', defaultOpen: true, titleIcon: <ChartBarIcon/>, content: <PerformanceContent performance={group.performance} /> },
        { id: 'chatAssignment', title: 'Chat assignment', titleIcon: <InformationCircleIcon/>, content: <ChatAssignmentContent /> },
        { id: 'routingRules', title: 'Routing rules', titleIcon: <CogIcon/>, content: <RoutingRulesContent /> },
    ];

    const [sections, setSections] = useState(initialGroupSections);
    const [activeDragId, setActiveDragId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    function handleDragStart(event) { setActiveDragId(event.active.id); }
    function handleDragEnd(event) {
        setActiveDragId(null);
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setSections((currentSections) => {
                const oldIndex = currentSections.findIndex(item => item.id === active.id);
                const newIndex = currentSections.findIndex(item => item.id === over.id);
                return arrayMove(currentSections, oldIndex, newIndex);
            });
        }
    }

    return (
        <div className="w-[var(--spacing-details-sidebar-w)] flex-shrink-0 border-l border-table-border bg-details-sidebar-bg flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-table-border h-[var(--height-page-section-header)]">
                <h2 className="text-md font-semibold text-content-text-primary">Details</h2>
                <button onClick={onClose} className="p-1.5 text-content-text-secondary hover:bg-gray-100 rounded-full">
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto scrollbar-thin">
                {/* Non-Draggable Group Info Header */}
                <div className="border-b border-table-border bg-details-sidebar-bg">
                    <GroupAvatarDisplay
                        initial={group.avatarInitial}
                        name={group.name}
                        id={group.id}
                        description={group.description}
                        bgColorClass={group.avatarBg}
                        isDefault={group.isDefault}
                    />
                </div>

                {/* Draggable Sections */}
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
                        {sections.map(section => (
                            <SortableSectionItem
                                key={section.id}
                                id={section.id}
                                title={section.title}
                                titleIcon={section.titleIcon}
                                defaultOpen={section.defaultOpen}
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

export default GroupDetailsSidebar;