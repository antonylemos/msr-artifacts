// src/components/Sidebar.jsx
import React from 'react';
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  SparklesIcon,
  BoltIcon,
  TrashIcon,
  UsersIcon,
  ChartBarIcon,
  Squares2X2Icon, // For 'Insights'
  TicketIcon, // For 'HelpDesk tickets'
  StarIcon, // For 'Reviews'
  Cog6ToothIcon,
  BellIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentTextIcon, // For 'Export raw data'
  ShoppingCartIcon, // For 'Ecommerce'
  AdjustmentsHorizontalIcon // For 'My saved views' (or similar)
} from '@heroicons/react/24/outline'; // Using outline icons

const iconCommonClass = "w-6 h-6 text-sidebar-text group-hover:text-white";
const activeIconClass = "text-white";

const topIcons = [
  { id: 'home', icon: <HomeIcon className={iconCommonClass} />, tooltip: "Home" },
  { id: 'conversations', icon: <ChatBubbleLeftEllipsisIcon className={iconCommonClass} />, tooltip: "Conversations" },
  { id: 'automation', icon: <SparklesIcon className={iconCommonClass} />, tooltip: "Automation" },
  { id: 'campaigns', icon: <BoltIcon className={iconCommonClass} />, tooltip: "Campaigns" },
  { id: 'trash', icon: <TrashIcon className={iconCommonClass} />, tooltip: "Trash" },
];

const navItems = [
  {
    id: 'reports',
    label: 'Reports',
    icon: <ChartBarIcon className={`${iconCommonClass} mr-3`} />, // Icon for the "Reports" main item
    // The actual clickable items are children or direct links
    // This section starts with "My saved views" in the image, so let's model that
  },
  {
    id: 'mySavedViews',
    label: 'My saved views',
    isHeading: true, // For styling purposes
    // icon: <AdjustmentsHorizontalIcon className={`${iconCommonClass} mr-3`} />
  },
  {
    id: 'summary',
    label: 'Summary',
    subItems: [
      { id: 'reports/summary/last7days', label: 'Last 7 days' },
      { id: 'reports/summary/dashboard', label: 'Dashboard' },
    ],
  },
  { id: 'reports/chats', label: 'Chats', hasArrow: true },
  { id: 'reports/agents', label: 'Agents', hasArrow: true },
  { id: 'reports/customers', label: 'Customers', hasArrow: true },
  { id: 'reports/insights', label: 'Insights', icon: <Squares2X2Icon className={`${iconCommonClass} mr-3`} />, hasArrow: true },
  { id: 'reports/ecommerce', label: 'Ecommerce', icon: <ShoppingCartIcon className={`${iconCommonClass} mr-3`} />, hasArrow: true },
  { id: 'reports/export', label: 'Export raw data', icon: <DocumentTextIcon className={`${iconCommonClass} mr-3`} /> },
  { id: 'reports/helpdesk', label: 'HelpDesk tickets', icon: <TicketIcon className={`${iconCommonClass} mr-3`} /> },
  { id: 'reports/reviews', label: 'Reviews', icon: <StarIcon className={`${iconCommonClass} mr-3`} /> },
];

// Add a 'people' section for the 'UsersIcon' if it belongs to a separate main category
const peopleNavItems = [
    { id: 'people', label: 'People', icon: <UsersIcon className={`${iconCommonClass} mr-3`} />, hasArrow: true}
]


const bottomIcons = [
  { id: 'menu', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconCommonClass}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>, tooltip: "Menu"},
  { id: 'settings', icon: <Cog6ToothIcon className={iconCommonClass} />, notification: 1, tooltip: "Settings" },
  { id: 'notifications', icon: <BellIcon className={iconCommonClass} />, tooltip: "Notifications" },
];

function Sidebar({ activeItem, openSubmenus, onItemClick, onToggleSubmenu }) {

  const renderNavItem = (item, isSubItem = false) => {
    const isActive = activeItem === item.id || (item.subItems && item.subItems.some(sub => sub.id === activeItem));
    const isSubmenuParentActive = item.subItems && item.subItems.some(sub => sub.id === activeItem);
    const isSubmenuOpen = item.subItems && openSubmenus[item.id];

    if (item.isHeading) {
      return (
        <div key={item.id} className="px-4 pt-4 pb-2 text-xs font-semibold text-sidebar-text-muted uppercase tracking-wider">
          {item.label}
        </div>
      );
    }

    return (
      <div key={item.id}>
        <button
          onClick={() => item.subItems ? onToggleSubmenu(item.id) : onItemClick(item.id)}
          className={`
            w-full flex items-center text-left px-4 py-2.5 group
            text-sm font-medium rounded-md transition-colors duration-150
            ${isSubItem ? 'pl-12 text-sidebar-text-muted' : 'text-sidebar-text'}
            ${(isActive && !isSubItem && !isSubmenuParentActive) || (isSubItem && isActive) ? 'bg-sidebar-item-active text-white' : 'hover:bg-sidebar-item-hover hover:text-white'}
            ${(isSubmenuParentActive && !isSubItem) ? 'text-white' : ''} 
          `}
        >
          {item.icon && <span className={isActive || isSubmenuParentActive ? activeIconClass : ""}>{React.cloneElement(item.icon, { className: `${iconCommonClass} mr-3 ${isActive || isSubmenuParentActive ? activeIconClass : ""}` })}</span>}
          <span className="flex-1">{item.label}</span>
          {item.subItems && (
            isSubmenuOpen ? <ChevronDownIcon className="w-4 h-4 ml-auto" /> : <ChevronRightIcon className="w-4 h-4 ml-auto" />
          )}
          {item.hasArrow && !item.subItems && ( // For items like "Chats" that just show an arrow
             <ChevronRightIcon className="w-4 h-4 ml-auto text-sidebar-text-muted group-hover:text-white" />
          )}
        </button>
        {isSubmenuOpen && item.subItems && (
          <div className="mt-1 space-y-1">
            {item.subItems.map(subItem => renderNavItem(subItem, true))}
          </div>
        )}
      </div>
    );
  };

  // Helper to determine if an icon should be active
  const isIconActive = (itemId) => {
    // Simple check for direct match
    if (activeItem === itemId) return true;
    // Check if the activeItem is a child of a section represented by an icon
    // e.g., if activeItem is "reports/summary/last7days", then "reports" icon should be active.
    if (itemId === 'reports' && activeItem.startsWith('reports/')) return true;
    if (itemId === 'people' && activeItem.startsWith('people/')) return true; // If you have a 'people' section
    return false;
  };


  return (
    <div className="w-sidebar flex flex-col bg-sidebar-bg text-sidebar-text h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-sidebar-bg">
      {/* Top Icons Section */}
      <div className="p-3 space-y-2 border-b border-gray-700">
        {topIcons.map(item => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            title={item.tooltip}
            className={`
              w-full flex justify-center items-center p-3 rounded-md group
              transition-colors duration-150
              ${isIconActive(item.id) ? 'bg-sidebar-item-active' : 'hover:bg-sidebar-item-hover'}
            `}
          >
            {React.cloneElement(item.icon, { className: `${iconCommonClass} ${isIconActive(item.id) ? activeIconClass : ''}`})}
          </button>
        ))}
      </div>

      {/* Main Navigation Section */}
      <div className="flex-1 px-2 py-4 space-y-1">
        {/* Reports Section Trigger Icon (if needed, or integrate into navItems) */}
        {/* This simulates the "Reports" main header that is visually active when its children are active */}
        <button
            onClick={() => {
                // Decide what clicking "Reports" itself does. Maybe open first sub-item or just toggle.
                // For now, let's assume it doesn't do much if its children are already handled.
                // If you want 'reports' to be a clickable item that leads to a default reports page:
                // onItemClick('reports');
                // Or if it's just a visual container for the actual reports:
                const firstReportItem = navItems.find(item => !item.isHeading && item.id.startsWith('reports/')) || navItems.find(item => item.subItems && item.id.startsWith('reports/'));
                if (firstReportItem && firstReportItem.subItems) {
                    onToggleSubmenu(firstReportItem.id);
                } else if (firstReportItem) {
                    onItemClick(firstReportItem.id);
                }
            }}
            className={`
                w-full flex items-center text-left px-4 py-2.5 group text-sm font-medium rounded-md
                transition-colors duration-150
                ${activeItem.startsWith('reports/') ? 'bg-sidebar-item-active text-white' : 'hover:bg-sidebar-item-hover hover:text-white'}
            `}
        >
            <ChartBarIcon className={`${iconCommonClass} mr-3 ${activeItem.startsWith('reports/') ? activeIconClass : ''}`} />
            <span className="flex-1">Reports</span>
            {/* Optionally show an arrow if you treat "Reports" as expandable */}
        </button>
        
        {/* Users/People Icon as a main navigation item */}
        <button
            onClick={() => onItemClick('people')} // Or link to a default people page
            className={`
                w-full flex items-center text-left px-4 py-2.5 group text-sm font-medium rounded-md
                transition-colors duration-150
                ${isIconActive('people') ? 'bg-sidebar-item-active text-white' : 'hover:bg-sidebar-item-hover hover:text-white'}
            `}
        >
            <UsersIcon className={`${iconCommonClass} mr-3 ${isIconActive('people') ? activeIconClass : ''}`} />
            <span className="flex-1">People</span>
             <ChevronRightIcon className="w-4 h-4 ml-auto text-sidebar-text-muted group-hover:text-white" />
        </button>


        {/* Actual Navigation Links (like "My saved views", "Summary", etc.) */}
        {/* These are now conceptually under the "Reports" section which is handled by the button above */}
        {/* If activeItem starts with "reports/", we show these items */}
        {activeItem.startsWith('reports/') && (
            <div className="mt-1 pl-2"> {/* Indent items under "Reports" if "Reports" is selected */}
                 {navItems.filter(item => item.id !== 'reports').map(item => renderNavItem(item))}
            </div>
        )}
        {/* If activeItem starts with 'people/', show people related sub-items if any */}
        {/* {activeItem.startsWith('people/') && peopleNavItems.map(item => renderNavItem(item))} */}

      </div>


      {/* Bottom Icons Section */}
      <div className="p-3 mt-auto border-t border-gray-700 space-y-2">
        {bottomIcons.map(item => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)} // You might want different handlers
            title={item.tooltip}
            className="w-full flex justify-center items-center p-3 rounded-md relative group hover:bg-sidebar-item-hover"
          >
            {React.cloneElement(item.icon, { className: iconCommonClass })}
            {item.notification && (
              <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-xs rounded-full h-4 min-w-[1rem] px-1 flex items-center justify-center">
                {item.notification}
              </span>
            )}
          </button>
        ))}
        <div className="flex justify-center items-center pt-2">
            <button className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
                W
            </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;