// src/components/common/DetailSidebar.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    XMarkIcon, ChevronDownIcon, ChevronRightIcon ,
    ArrowsPointingInIcon, ArrowsPointingOutIcon, Bars2Icon, UserIcon as FallbackUserIcon,
    EllipsisHorizontalIcon
} from '@heroicons/react/24/solid';

import {
    DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay
} from '@dnd-kit/core';
import {
    arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const COLLAPSED_WIDTH_CLASS = 'w-[var(--spacing-details-sidebar-collapsed-w)]';

function SortableSectionItem({ id, section, data, isOpen, onToggle, isSidebarCollapsed }) {
    const {
        attributes, listeners, setNodeRef, transform, transition, isDragging
    } = useSortable({ id, disabled: section.isDraggable === false || isSidebarCollapsed });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : 1,
        zIndex: isDragging ? 100 : undefined,
    };

    // Determine if the section is truly collapsible (i.e., not explicitly set to false)
    const isCollapsible = section.isCollapsible !== false;

    if (isSidebarCollapsed) return null;

    return (
        // This div is the direct child of SortableContext if DetailSidebar applies card styles per item.
        // If DetailSidebar applies a "flat" style with dividers, this might be simpler.
        // For now, assume card-like or section-by-section styling is applied by the parent loop in DetailSidebar.
        <div>
            {/* Section Header Area - Clickable only if collapsible */}
            <div
                className={`w-full flex items-center px-4 text-left focus:outline-none h-[74px]
                            ${isCollapsible ? 'hover:bg-gray-50 cursor-pointer' : ''}
                          `}
                onClick={isCollapsible ? () => onToggle(id) : undefined}
            >
                {section.isDraggable !== false && ( // Draggable sections get a handle
                    <button
                        type="button" {...attributes} {...listeners}
                        className="p-2 -ml-2 mr-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing focus:outline-none flex-shrink-0"
                        aria-label={`Drag ${section.title} section`}
                    >
                        <Bars2Icon className="w-5 h-5" />
                    </button>
                )}
                {/* Spacer for non-draggable items to align text titles */}
                {section.isDraggable === false && <div className="w-[calc(1.25rem+0.5rem)] flex-shrink-0"></div>}

                <span className="text-base font-medium text-gray-700 truncate flex-1">
                    {section.title}
                </span>

                {isCollapsible && ( // Chevron only for collapsible sections
                    isOpen
                        ? <ChevronDownIcon className="w-6 h-6 text-gray-400 ml-2 flex-shrink-0" />
                        : <ChevronRightIcon className="w-6 h-6 text-gray-400 ml-2 flex-shrink-0" />
                )}
                {/* Optional: "More actions" ellipsis for sections if needed, not tied to collapsibility */}
                {section.showMoreActions && (
                     <button onClick={(e) => { e.stopPropagation(); console.log('More actions for section:', section.id);}}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded-full ml-2 flex-shrink-0">
                        <EllipsisHorizontalIcon className="w-5 h-5"/>
                    </button>
                )}
            </div>

            {/* Content Area - Shown if isOpen is true */}
            {isOpen && section.content && (
                <div className="px-4 pt-2 pb-5 text-sm text-gray-600">
                    {React.createElement(section.content, { item: data, client: data, contact: data, agent: data, group: data })}
                </div>
            )}
        </div>
    );
}

const DetailSidebar = React.memo(({
  selectedItem,
  onClose,
  isCollapsed,
  onToggleCollapse,
  headerTabsConfig,
  sectionsConfig,
  expandedWidthClass,
  collapsedAvatarInitial,
  collapsedAvatarBgColor,
  collapsedIcons,
  renderCollapsedContent,
}) => {
  const [activeTab, setActiveTab] = useState(headerTabsConfig[0]?.id || 'details');
  // sectionsData holds the potentially reordered sections after D&D
  const [sectionsData, setSectionsData] = useState(() => sectionsConfig);
  const [activeDragId, setActiveDragId] = useState(null);

  // State to manage open/closed state of each collapsible section
  const [openSectionStates, setOpenSectionStates] = useState({});

  // Initialize/Reset sectionsData and openSectionStates when sectionsConfig or selectedItem changes
  useEffect(() => {
    setSectionsData(sectionsConfig);
    const initialOpenStates = sectionsConfig.reduce((acc, section) => {
      // A section is open if isCollapsible is true AND defaultOpen is true,
      // OR if isCollapsible is explicitly false (meaning it's always "open"/content visible).
      if (section.isCollapsible !== false) { // true or undefined (defaults to collapsible)
        acc[section.id] = section.defaultOpen === true;
      } else { // isCollapsible === false, content should always be visible
        acc[section.id] = true;
      }
      return acc;
    }, {});
    setOpenSectionStates(initialOpenStates);

    if (selectedItem || headerTabsConfig.length > 0) {
        setActiveTab(headerTabsConfig[0]?.id || 'details');
    }
  }, [selectedItem, sectionsConfig, headerTabsConfig]);


  const handleToggleSectionOpen = useCallback((sectionId) => {
      setOpenSectionStates(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = useCallback((event) => { setActiveDragId(event.active.id); }, []);
  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    setActiveDragId(null);
    if (over && active.id !== over.id) {
      // Only allow reordering for sections within the current active tab that are draggable
      const currentTabSections = sectionsData.filter(s => s.tab === activeTab);
      const activeItemInTab = currentTabSections.find(s => s.id === active.id);
      const overItemInTab = currentTabSections.find(s => s.id === over.id);

      if (activeItemInTab?.isDraggable !== false && overItemInTab?.isDraggable !== false) {
        setSectionsData((prevSections) => {
            const oldOverallIndex = prevSections.findIndex(item => item.id === active.id);
            const newOverallIndex = prevSections.findIndex(item => item.id === over.id);
            if (oldOverallIndex === -1 || newOverallIndex === -1) return prevSections;
            // Ensure both items belong to the same tab before reordering full sectionsData
            if (prevSections[oldOverallIndex].tab === activeTab && prevSections[newOverallIndex].tab === activeTab) {
                return arrayMove(prevSections, oldOverallIndex, newOverallIndex);
            }
            return prevSections; // Should not happen if filtering correctly
        });
      }
    }
  }, [sectionsData, activeTab]); // Added activeTab

  const currentWidthClass = isCollapsed ? COLLAPSED_WIDTH_CLASS : expandedWidthClass;

  // Filter sections by the current activeTab for rendering
  const sectionsForCurrentTab = useMemo(() =>
    sectionsData.filter(section => section.tab === activeTab),
    [sectionsData, activeTab]
  );

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
    if (isCollapsed && onToggleCollapse) {
        onToggleCollapse();
    }
  }, [isCollapsed, onToggleCollapse]);

  // Determine if the current tab's sections should be displayed as flat (all sections are flat)
  // or carded (at least one section is not flat).
  // A section is considered "carded by default" unless explicitly section.isFlat === true.
  const isCurrentTabLayoutFlat = sectionsForCurrentTab.length > 0 && sectionsForCurrentTab.every(s => s.isFlat === true);

  return (
    <div className={`${currentWidthClass} flex-shrink-0 border-l border-gray-200 flex flex-col transition-all duration-300 ease-in-out 
                    ${isCurrentTabLayoutFlat ? 'bg-white' : 'bg-slate-50'}`}>
      <div className="p-2 flex items-center justify-between border-b border-gray-200 bg-white h-[var(--height-page-section-header)] flex-shrink-0">
        {!isCollapsed && ( <div className="flex items-center flex-shrink min-w-0"> {headerTabsConfig.map(tab => ( <button key={tab.id} onClick={() => handleTabChange(tab.id)} title={tab.label} className={`p-2 rounded-md relative ${activeTab === tab.id ? '' : 'hover:bg-gray-100'}`}> {React.cloneElement(tab.icon, { className: `w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'}` })} {activeTab === tab.id && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-blue-600 rounded-t-sm"></div>} </button> ))} </div> )}
        <div className="flex items-center space-x-1 ml-auto"> <button onClick={onToggleCollapse} title={isCollapsed ? "Expand details" : "Collapse details"} className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-full"> {isCollapsed ? <ArrowsPointingOutIcon className="w-5 h-5" /> : <ArrowsPointingInIcon className="w-5 h-5" />} </button> {(selectedItem || isCollapsed) && ( <button onClick={onClose} title="Close Details" className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full"> <XMarkIcon className="w-5 h-5" /> </button> )} </div>
      </div>

      {isCollapsed && ( <div className="flex flex-col items-center py-2 space-y-1.5 h-full"> {renderCollapsedContent ? ( renderCollapsedContent({ handleTabChange }) ) : selectedItem ? ( <> <div className={`w-8 h-8 ${collapsedAvatarBgColor || 'bg-gray-400'} rounded-full flex items-center justify-center text-white text-sm font-semibold mt-2`}> {collapsedAvatarInitial || '?'} </div> {collapsedIcons && collapsedIcons.map((IconInfo, index) => ( <button key={index} title={IconInfo.title} className="p-2 rounded-md hover:bg-gray-200"> {React.cloneElement(IconInfo.component, { className: "w-5 h-5 text-gray-500" })} </button> ))} </> ) : ( <div className="flex-1 flex items-center justify-center"> <FallbackUserIcon className="w-8 h-8 text-gray-400" /> </div> )} </div> )}

      {!isCollapsed && (
        <div className={`flex-grow overflow-y-auto scrollbar-thin 
                        ${isCurrentTabLayoutFlat ? 'bg-white divide-y divide-gray-200' : 'bg-slate-100 p-3 space-y-3'}`}>
            {!selectedItem ? (
                <div className={`p-4 text-sm text-center text-slate-500 ${!isCurrentTabLayoutFlat ? 'bg-white rounded-lg shadow-sm border border-gray-200' : ''}`}>
                    Select an item to view details.
                </div>
            ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <SortableContext items={sectionsForCurrentTab.map(s => s.id)} strategy={verticalListSortingStrategy}>
                    {sectionsForCurrentTab.map(section => {
                        // Wrapper for card style, Fragment for flat style
                        const Wrapper = section.isFlat === true ? React.Fragment : ({ children }) => <div className="bg-white rounded-lg shadow-sm border border-gray-200">{children}</div>;
                        return (
                            <Wrapper key={section.id}>
                                <SortableSectionItem
                                    id={section.id}
                                    section={section}
                                    data={selectedItem}
                                    isOpen={openSectionStates[section.id]} // Pass current open state
                                    onToggle={handleToggleSectionOpen} // Pass handler to toggle state
                                    isSidebarCollapsed={isCollapsed}
                                    // activeDragItem prop is not strictly needed by SortableSectionItem anymore
                                />
                            </Wrapper>
                        );
                    })}
                    </SortableContext>
                    <DragOverlay>
                        {activeDragId && sectionsForCurrentTab.find(s => s.id === activeDragId) ? (
                            <div className="p-3 px-4 border border-blue-300 bg-blue-50 shadow-xl rounded-lg text-base font-semibold text-blue-700 opacity-95 cursor-grabbing flex items-center"> {/* Adjusted height if not fixed */}
                                <Bars2Icon className="w-5 h-5 mr-2 text-blue-600" />
                                {sectionsForCurrentTab.find(s => s.id === activeDragId)?.title}
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            )}
        </div>
      )}
    </div>
  );
});

export default DetailSidebar;