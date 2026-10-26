// src/components/PrimarySidebar.jsx
import React, { useState, useEffect, useRef, useCallback ,useMemo  } from 'react';
import { useNavigate } from 'react-router-dom';
import * as HeroIconsOutline from '@heroicons/react/24/outline'; // Using outline for consistency
import * as HeroIconsSolid from '@heroicons/react/24/solid'; // For solid versions if needed
import { useAuthStore } from '../stores/authStore.js';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

// --- Icon Map (Fallback if item.icon is a string name) ---
const iconMap = {
  // Outline Icons (Preferred for sidebar for consistency with your screenshots)
  HomeIcon: HeroIconsOutline.HomeIcon,
  ArchiveBoxIcon: HeroIconsOutline.ArchiveBoxIcon,
  UserGroupIcon: HeroIconsOutline.UserGroupIcon,
  UsersIcon: HeroIconsOutline.UsersIcon,
  CalendarIcon: HeroIconsOutline.CalendarIcon,
  ClipboardDocumentListIcon: HeroIconsOutline.ClipboardDocumentListIcon,
  CubeTransparentIcon: HeroIconsOutline.CubeTransparentIcon,
  CheckBadgeIcon: HeroIconsOutline.CheckBadgeIcon,
  WrenchScrewdriverIcon: HeroIconsOutline.WrenchScrewdriverIcon,
  SparklesIcon: HeroIconsOutline.SparklesIcon,
  ChartBarIcon: HeroIconsOutline.ChartBarIcon,
  Cog6ToothIcon: HeroIconsOutline.Cog6ToothIcon,
  BellIcon: HeroIconsOutline.BellIcon,
  UserCircleIcon: HeroIconsOutline.UserCircleIcon, // User Profile Avatar
  InformationCircleIcon: HeroIconsOutline.InformationCircleIcon, // For popups
  XMarkIcon: HeroIconsOutline.XMarkIcon, // For popups
  SquaresPlusIcon: HeroIconsOutline.SquaresPlusIcon, // For "Apps"
  LinkIcon: HeroIconsOutline.LinkIcon,
  CodeBracketIcon: HeroIconsOutline.CodeBracketIcon,
  BoltIcon: HeroIconsOutline.BoltIcon, // For "Automate" or "Campaigns"

  // Solid Icons (If you explicitly need them for certain items)
  UserCircleSolidIcon: HeroIconsSolid.UserCircleIcon, // Example
ChatBubbleOvalLeftEllipsisIcon: HeroIconsOutline.ChatBubbleOvalLeftEllipsisIcon,

ChatBubbleLeftEllipsisIcon: HeroIconsOutline.ChatBubbleLeftEllipsisIcon,

  Default: HeroIconsOutline.CubeIcon // Fallback icon
};

// --- Helper Components (AppLogo, Platform Icons) ---
const AppLogo = React.memo(({ iconSize }) => (
  <div className="flex items-center justify-center h-[var(--height-page-section-header)] w-full flex-shrink-0">
    <svg viewBox="0 0 24 24" fill="currentColor" className="text-primary-sidebar-icon-active-fg" style={{ width: iconSize, height: iconSize }}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
  </div>
));
const AndroidIcon = (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M18.8 5.4C18.1 4.7 17 4 15.6 4H8.4C7 4 5.9 4.7 5.2 5.4L1.7 10C1.1 10.6 1.1 11.4 1.7 12V18C1.7 19.1 2.6 20 3.7 20H20.3C21.4 20 22.3 19.1 22.3 18V12C22.9 11.4 22.9 10.6 22.3 10L18.8 5.4ZM12 18H5.9C5.4 18 5 17.6 5 17.1V13.8C5 13.5 5.1 13.2 5.3 13L8.8 9.3C9.4 8.7 10.5 8 12 8S14.6 8.7 15.2 9.3L18.7 13C18.9 13.2 19 13.5 19 13.8V17.1C19 17.6 18.6 18 18.1 18H12ZM14.5 12.5C14.5 13.3 13.8 14 13 14S11.5 13.3 11.5 12.5 12.2 11 13 11 14.5 11.7 14.5 12.5ZM10.5 12.5C10.5 13.3 9.8 14 9 14S7.5 13.3 7.5 12.5 8.2 11 9 11 10.5 11.7 10.5 12.5Z"/></svg>;
const AppleIcon = (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M12.723 1.053c.8-.027 1.48.513 1.833 1.253.373.74.22 1.58-.333 2.213-.574.653-1.447.88-2.227.614-.774-.26-1.34-.847-1.706-1.58-.374-.74-.22-1.58.333-2.213.574-.653 1.447-.88 2.227-.614zm-3.234 3.754c.78.267 1.34.854 1.707 1.594.373.74.22 1.58-.333 2.213-.574.653-1.447.88-2.227.614-.774-.26-1.34-.847-1.706-1.58-.374-.74-.22-1.58.333-2.213.574-.653 1.447-.88 2.227-.614zM16.48 10.373c-.8.027-1.48-.513-1.833-1.253-.373-.74-.22-1.58.333-2.213.574.653 1.447.88 2.227-.614.774.26 1.34.847 1.706 1.58.374.74.22 1.58-.333 2.213-.574.653-1.447-.88-2.227.614zM8.257 10.373c-.8.027-1.48-.513-1.833-1.253-.373-.74-.22-1.58.333-2.213-.574.653 1.447.88 2.227-.614.774.26 1.34.847 1.706 1.58.374.74.22 1.58-.333 2.213-.574-.653-1.447-.88-2.227-.614zM12.723 5.48c.8-.027 1.48.513 1.833 1.253.373.74.22 1.58-.333 2.213-.574.653 1.447-.88 2.227-.614-.774-.26-1.34-.847-1.706-1.58-.374-.74-.22-1.58.333-2.213.574-.653 1.447-.88 2.227-.614zM12.723 15.013c.8-.027 1.48.513 1.833 1.253.373.74.22 1.58-.333 2.213-.574.653-1.447.88-2.227.614-.774-.26-1.34-.847-1.706-1.58-.374-.74-.22-1.58.333-2.213.574-.653 1.447-.88 2.227-.614zM8.257 15.013c-.8.027-1.48-.513-1.833-1.253-.373-.74-.22-1.58.333-2.213-.574.653 1.447.88 2.227-.614.774.26 1.34.847 1.706 1.58.374.74.22 1.58-.333 2.213-.574-.653-1.447-.88-2.227-.614zM12 21.053c-1.82 0-3.374-1.28-3.774-3.053-.027-.12.067-.24.2-.24h7.027c.133 0 .227.12.2.24C15.374 19.773 13.82 21.053 12 21.053z"/></svg>;
const DesktopComputerIcon = (props) => <svg {...props} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3h8l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM3 16V4h18v12H3z"/></svg>;


// --- Main Sidebar Component ---
// The `sections` prop is now expected to be the fully composed array from DashboardLayout
// where each item.icon is either a React Component or a string key for iconMap.// src/components/PrimarySidebar.jsx
// ... (Keep all imports: React, useNavigate, HeroIconsOutline, useAuthStore, etc.)
// ... (Keep iconMap, AppLogo, AndroidIcon, AppleIcon, DesktopComputerIcon)

const PrimarySidebar = React.memo(({ sections, activePrimaryIconId, onIconClick, iconSize = '1.5rem' }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  // Derive mainNavItems and bottomNavItems from the passed 'sections' prop
  const mainNavItems = useMemo(() => (sections || []).filter((s) => s && !s.isBottom), [sections]);
  // const bottomNavItems = useMemo(() => (sections || []).filter((s) => s && s.isBottom), [sections]);
 const bottomNavItems = useMemo(() => (sections || []).filter((s) => s && s.isBottom && !s.isAvatar), [sections]); // remove the avatr

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const avatarButtonRef = useRef(null);

  // ... (useEffect for handleClickOutside, handleUserAvatarClick, handleUserMenuItemClick remain the same) ...
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && menuRef.current && !menuRef.current.contains(event.target) && avatarButtonRef.current && !avatarButtonRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const handleUserAvatarClick = useCallback(() => {
    setIsUserMenuOpen(prev => !prev);
  }, []);

  const handleUserMenuItemClick = useCallback((actionType, path) => {
    setIsUserMenuOpen(false);
    if (actionType === 'navigate') {
      navigate(path);
    } else if (actionType === 'logout') {
      logout();
      navigate('/login');
    } else {
    }
  }, [navigate, logout]);

 const renderNavItem = (item) => {
  if (!item || !item.id) {
    console.warn("PrimarySidebar: Skipping render for invalid item:", item);
    return null;
  }

  const isActive = activePrimaryIconId === item.id;
const itemWrapperClasses = `
  w-full flex justify-center items-center p-3 rounded-xl 
  transition-all duration-200 ease-in-out
  ${isActive 
    ? 'bg-primary-sidebar-item-active-bg' 
    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}
`;

const iconKey = typeof item.icon === 'string' ? item.icon : 'Default';
const IconComponent = iconMap[iconKey] || iconMap.Default;

const IconToRender = (
  <IconComponent
    className={`w-6 h-6 transition-colors duration-200 ${
      isActive
        ? 'text-primary-sidebar-icon-active-fg'
        : 'text-primary-sidebar-icon-default hover:text-primary-sidebar-icon-active-fg'
    }`}
    style={{ minWidth: '1.5rem', minHeight: '1.5rem' }} // ensures SVG takes up space
  />
);

  // 👤 User avatar button
  if (item.isAvatar) {
    const avatarInitial = user?.firstName
      ? user.firstName.charAt(0).toUpperCase()
      : user?.fullName
      ? user.fullName.charAt(0).toUpperCase()
      : 'U';

    return (
      <button
        key={item.id}
        ref={avatarButtonRef}
        title={user?.fullName || item.label || 'User Profile'}
        onClick={handleUserAvatarClick}
        className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-base hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-sidebar-bg focus:ring-white"
      >
        {avatarInitial}
      </button>
    );
  }

  return (
    <button
      key={item.id}
      title={item.label}
      onClick={() => onIconClick(item)}
      className={itemWrapperClasses}
    >
      {IconToRender}
      {item.notification && (
        <span className="absolute top-1.5 right-1.5 bg-notification-red text-white text-xs rounded-full h-4 min-w-[1rem] px-1 flex items-center justify-center border-2 border-primary-sidebar-bg">
          {item.notification}
        </span>
      )}
    </button>
  );
};

   

  // --- Main Nav Structure ---
return (
  <nav className="w-[var(--spacing-primary-sidebar-w)] bg-primary-sidebar-bg border-r border-primary-sidebar-border flex flex-col h-screen relative z-50">
    <AppLogo iconSize="1.75rem" />
    <div className="border-t border-primary-sidebar-border mx-2 my-2"></div>

    {/* Scrollable nav area */}
    <div className="flex-1 overflow-y-auto px-2 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-transparent">
      {mainNavItems.map(renderNavItem)}
      
      <div className="mt-4 border-t border-primary-sidebar-border pt-3 space-y-1.5">
        {bottomNavItems.map(renderNavItem)}
      </div>
    </div>

    {/* Fixed avatar area */}
    <div className="px-2 py-3 border-t border-primary-sidebar-border relative">
      {renderNavItem({ ...user, id: 'user-avatar', isAvatar: true, label: 'My Profile' })}

      {isUserMenuOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-12 left-full ml-2 w-64 bg-white rounded-lg shadow-xl py-1.5 text-gray-800 text-sm overflow-hidden z-[60] border border-gray-200"
        >
          <div
            onClick={() => handleUserMenuItemClick('navigate', '/userProfile')}
            className="flex items-center px-3.5 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
          >
            <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 flex-shrink-0">
              {user?.firstName
                ? user.firstName.charAt(0).toUpperCase()
                : user?.fullName
                ? user.fullName.charAt(0).toUpperCase()
                : 'U'}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{user?.fullName || 'User Name'}</div>
              <div className="text-xs text-gray-500 truncate max-w-[150px]">{user?.email || 'user@example.com'}</div>
            </div>
          </div>

          <div className="py-1">
            <div className="px-3.5 py-2.5 flex items-center justify-between hover:bg-gray-50">
              <span className="text-gray-700">Accept chats</span>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" defaultChecked={true} />
                  <div className="block bg-gray-300 w-9 h-5 rounded-full transition-colors peer-checked:bg-green-500"></div>
                  <div className="dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-4"></div>
                </div>
              </label>
            </div>

            <div
              onClick={() => handleUserMenuItemClick('navigate', '/settings/notifications')}
              className="flex items-center px-3.5 py-2.5 hover:bg-gray-50 cursor-pointer text-gray-700"
            >
              <HeroIconsOutline.BellAlertIcon className="w-5 h-5 mr-2 text-gray-500" />
              Notification preferences
            </div>
          </div>

          <div className="border-t border-gray-100 px-3.5 py-3">
            <span className="block mb-2.5 text-xs text-gray-500 font-medium">Download apps</span>
            <div className="flex space-x-3 items-center">
              <button title="Android App" className="p-1 text-gray-500 hover:text-indigo-600 transition-colors"><AndroidIcon /></button>
              <button title="iOS App" className="p-1 text-gray-500 hover:text-indigo-600 transition-colors"><AppleIcon /></button>
              <button title="Desktop App" className="p-1 text-gray-500 hover:text-indigo-600 transition-colors"><DesktopComputerIcon /></button>
            </div>
          </div>

          <div className="border-t border-gray-100 py-1">
            <div onClick={() => handleUserMenuItemClick('action', 'help_center')} className="block px-3.5 py-2.5 hover:bg-gray-50 cursor-pointer text-gray-700">Help Center</div>
            <div onClick={() => handleUserMenuItemClick('action', 'report_issue')} className="block px-3.5 py-2.5 hover:bg-gray-50 cursor-pointer text-gray-700">Report an issue</div>
          </div>

          <div onClick={() => handleUserMenuItemClick('logout')} className="block px-3.5 py-2.5 hover:bg-red-50 cursor-pointer border-t border-gray-100 text-red-600 font-medium">
            Log out
          </div>
        </div>
      )}
    </div>
  </nav>
);

});

export default PrimarySidebar;