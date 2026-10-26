// src/sidebarConfig.jsx
import React from 'react';
import * as HeroIconsOutline from '@heroicons/react/24/outline';

// COMPLETE Icon map for DYNAMICALLY loaded modules where icon is a STRING NAME
// This should be the single source of truth for all icon mappings
export const dynamicIconMap = {
  // Basic navigation icons
  HomeIcon: HeroIconsOutline.HomeIcon,
  ChatBubbleLeftEllipsisIcon: HeroIconsOutline.ChatBubbleLeftEllipsisIcon,
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
  UserCircleIcon: HeroIconsOutline.UserCircleIcon,
  SquaresPlusIcon: HeroIconsOutline.SquaresPlusIcon,
  LinkIcon: HeroIconsOutline.LinkIcon,
  CodeBracketIcon: HeroIconsOutline.CodeBracketIcon,
  BoltIcon: HeroIconsOutline.BoltIcon,
  AcademicCapIcon: HeroIconsOutline.AcademicCapIcon,
  DocumentTextIcon: HeroIconsOutline.DocumentTextIcon,
  CubeIcon: HeroIconsOutline.CubeIcon,
  QuestionMarkCircleIcon: HeroIconsOutline.QuestionMarkCircleIcon,
  
  // Additional icons for settings and reports
  TagIcon: HeroIconsOutline.TagIcon,
  CalendarDaysIcon: HeroIconsOutline.CalendarDaysIcon,
  MapPinIcon: HeroIconsOutline.MapPinIcon,
  BuildingOffice2Icon: HeroIconsOutline.BuildingOffice2Icon,
  
  // Fallback
  Default: HeroIconsOutline.CubeIcon,
};

// Helper function to convert string icon names to React components
const createIconComponent = (iconName) => {
  const IconComponent = dynamicIconMap[iconName] || dynamicIconMap.Default;
  return React.createElement(IconComponent);
};

// Static core top items definition using string icon names for consistency
export const staticCoreTopItemsDef = [
  { id: 'home', label: 'Home', icon: 'HomeIcon', type: 'page', isBottom: false, path: '/home' },
  { id: 'conversations', label: 'Conversations', icon: 'ChatBubbleLeftEllipsisIcon', type: 'page', isBottom: false, path: '/conversations' },
  { id: 'csr_dashboard', label: 'CSR Dashboard', icon: 'ClipboardDocumentListIcon', type: 'page', isBottom: false, path: '/csr_dashboard' },
  { id: 'archives', label: 'Archives', icon: 'ArchiveBoxIcon', type: 'page', isBottom: false, path: '/archives' },
  { id: 'team', label: 'Team', icon: 'UserGroupIcon', type: 'page', isBottom: false, path: '/team' },
  { id: 'services', label: 'Services', icon: 'WrenchScrewdriverIcon', type: 'page', isBottom: false, path: '/services' },
  { id: 'clients', label: 'Clients', icon: 'UsersIcon', type: 'page', isBottom: false, path: '/clients' },
  { id: 'knowledgebase', label: 'KnowledgeBase', icon: 'CubeTransparentIcon', type: 'page', isBottom: false, path: '/knowledgebase' },
  { id: 'appointments', label: 'Appointments', icon: 'CalendarIcon', type: 'page', isBottom: false, path: '/appointments/all' },
  { id: 'helpdesk', label: 'HelpDesk', icon: 'CheckBadgeIcon', type: 'page', isBottom: false, path: '/helpdesk/all' },
  { id: 'automation', label: 'Automation', icon: 'SparklesIcon', type: 'page', isBottom: false, path: '/automation' },
];

// Static core bottom items definition using string icon names for consistency
export const staticCoreBottomItemsDef = [
  { id: 'apps', label: 'Apps Marketplace', icon: 'SquaresPlusIcon', type: 'page', isBottom: true, path: '/apps/explore' },
  { 
    id: 'reports', 
    label: 'Reports', 
    icon: 'ChartBarIcon', 
    type: 'expandable', 
    isBottom: true, 
    expandedNavTitle: 'Reporting Dashboards',
    path: '/reports/summary/last7days',
    expandedNav: [
      { id: 'reports/summary/last7days', label: 'Last 7 Days Summary', icon: 'ChartBarIcon', type: 'page', path: '/reports/summary/last7days' },
      { id: 'reports/chats/total_chats', label: 'Total Chats Report', icon: 'ChatBubbleLeftEllipsisIcon', type: 'page', path: '/reports/chats/total_chats' },
      { id: 'reports/appointments_detailed', label: 'Appointments Log', icon: 'CalendarDaysIcon', type: 'page', path: '/reports/appointments_detailed'},
    ]
  },
  { 
    id: 'automate', 
    label: 'Automate', 
    icon: 'BoltIcon',
    type: 'expandable', // This is the key to making it open a sub-menu
    isBottom: true, 
    expandedNavTitle: 'Automate',
    path: '/automate/overview',
    expandedNav: [
      { id: 'automate/overview', label: 'Overview', type: 'page', path: '/automate/overview' },
      { id: 'automate/chatbots', label: 'Chatbots', type: 'page', path: '/automate/chatbots' },
      { 
        id: 'automate/knowledge-hub', 
        label: 'Knowledge hub', 
        subItems: [ // This matches your component's expected property `subItems`
          { id: 'automate/knowledge-hub/all', label: 'All sources', path: '/automate/knowledge-hub/all', badge: 2 },
          { id: 'automate/knowledge-hub/websites', label: 'Websites', path: '/automate/knowledge-hub/websites', badge: 1 },
          { id: 'automate/knowledge-hub/pdfs', label: 'PDF files', path: '/automate/knowledge-hub/pdfs' },
        ]
      },
      { 
        id: 'automate/canned-responses', 
        label: 'Canned responses',
        subItems: [
          { id: 'automate/canned-responses/list', label: 'Responses list', path: '/automate/canned-responses/list' },
          { id: 'automate/canned-responses/suggestions', label: 'Suggested responses', path: '/automate/canned-responses/suggestions' },
        ]
      },
      { id: 'automate/routing-rules', label: 'Routing rules', type: 'page', path: '/automate/routing-rules' },
      { id: 'automate/workflows', label: 'Workflows', type: 'page', path: '/automate/workflows', tag: 'Beta' },
    ]
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: 'Cog6ToothIcon', 
    type: 'expandable', 
    isBottom: true, 
    expandedNavTitle: 'Application Settings',
    path: '/settings/tags',
    expandedNav: [
      { id: 'settings/tags', label: 'Tags Management', icon: 'TagIcon', type: 'page', path: '/settings/tags' },
      { id: 'settings/appointment_system', label: 'Appointments & Booking', icon: 'CalendarDaysIcon', type: 'page', path: '/settings/appointment_system' },
    ]
  },
  { id: 'notifications', label: 'Notifications', icon: 'BellIcon', type: 'page', isBottom: true, path: '/notifications' },
  { id: 'userProfile', label: 'User Profile', icon: 'UserCircleIcon', type: 'page', isBottom: true, isAvatar: true, path: '/userProfile' }
];

// Legacy primarySections array for backward compatibility (converted to use JSX components)
// This converts string icon names to JSX components for immediate use
export const primarySections = [
  // --- Static Top Sections ---
  {
    id: 'home',
    label: 'Home',
    icon: createIconComponent('HomeIcon'),
    type: 'page',
    isBottom: false,
    path: '/home'
  },
  {
    id: 'conversations',
    label: 'Conversations',
    icon: createIconComponent('ChatBubbleLeftEllipsisIcon'),
    type: 'page',
    isBottom: false,
    path: '/conversations'
  },
  {
    id: 'csr_dashboard',
    label: 'CSR Dashboard',
    icon: createIconComponent('ClipboardDocumentListIcon'),
    type: 'page',
    isBottom: false,
    path: '/csr_dashboard'
  },
  {
    id: 'archives',
    label: 'Archives',
    icon: createIconComponent('ArchiveBoxIcon'),
    type: 'page',
    isBottom: false,
    path: '/archives'
  },
  {
    id: 'team',
    label: 'Team',
    icon: createIconComponent('UserGroupIcon'),
    type: 'page',
    isBottom: false,
    path: '/team'
  },
   {
    id: 'services',
    label: 'Services',
    icon: createIconComponent('WrenchScrewdriverIcon'),
    type: 'page',
    isBottom: false,
    path: '/services'
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: createIconComponent('UsersIcon'),
    type: 'page',
    isBottom: false,
    path: '/clients'
  },
  {
    id: 'knowledgebase',
    label: 'KnowledgeBase',
    icon: createIconComponent('CubeTransparentIcon'),
    type: 'page',
    isBottom: false,
    path: '/knowledgebase'
  },
  {
    id: 'appointments',
    label: 'Appointments',
    icon: createIconComponent('CalendarIcon'),
    type: 'page',
    isBottom: false,
    path: '/appointments/all'
  },
  {
    id: 'helpdesk',
    label: 'HelpDesk',
    icon: createIconComponent('CheckBadgeIcon'),
    type: 'page',
    isBottom: false,
    path: '/helpdesk/all'
  },


  // --- "APPS" EXPANDABLE SECTION (Core Platform Feature) ---
  {
    id: 'apps',
    label: 'Apps',
    icon: createIconComponent('SquaresPlusIcon'),
    type: 'expandable',
    isBottom: false,
    expandedNavTitle: 'Apps & Integrations',
    path: '/apps/explore',
    expandedNav: [
      { id: 'apps/explore', label: 'Explore apps', icon: createIconComponent('SquaresPlusIcon'), type: 'page', path: '/apps/explore' },
      { id: 'apps/external_integrations', label: 'External integrations', icon: createIconComponent('LinkIcon'), type: 'page', path: '/apps/external_integrations' },
    ]
  },

  // --- Static Bottom Sections ---
  {
    id: 'reports',
    label: 'Reports',
    icon: createIconComponent('ChartBarIcon'),
    type: 'expandable',
    isBottom: true,
    expandedNavTitle: 'Reporting Dashboards',
    path: '/reports/summary/last7days',
    expandedNav: [
      { id: 'reports/summary/last7days', label: 'Last 7 Days Summary', icon: createIconComponent('ChartBarIcon'), type: 'page', path: '/reports/summary/last7days' },
      { id: 'reports/chats/total_chats', label: 'Total Chats Report', icon: createIconComponent('ChatBubbleLeftEllipsisIcon'), type: 'page', path: '/reports/chats/total_chats' },
      { id: 'reports/appointments_detailed', label: 'Appointments Log', icon: createIconComponent('CalendarDaysIcon'), type: 'page', path: '/reports/appointments_detailed'},
    ]
  },
   
  {
    id: 'settings',
    label: 'Settings',
    icon: createIconComponent('Cog6ToothIcon'),
    type: 'expandable',
    isBottom: true,
    expandedNavTitle: 'Application Settings',
    path: '/settings/tags',
    expandedNav: [
      { id: 'settings/tags', label: 'Tags Management', icon: createIconComponent('TagIcon'), type: 'page', path: '/settings/tags' },
      { id: 'settings/appointment_system', label: 'Appointments & Booking', icon: createIconComponent('CalendarDaysIcon'), type: 'page', path: '/settings/appointment_system' },
    ]
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: createIconComponent('BellIcon'),
    type: 'page',
    isBottom: true,
    path: '/notifications'
  },
  {
    id: 'userProfile',
    label: 'User Profile',
    icon: createIconComponent('UserCircleIcon'),
    type: 'page',
    isBottom: true,
    isAvatar: true,
    path: '/userProfile'
  }
];

// Legacy function for combining with installed modules (kept for backward compatibility)
export const combineWithInstalledModules = (modules = []) => {
  const appsSection = primarySections.find(section => section.id === 'apps');
  if (appsSection) {
    appsSection.expandedNav = modules.map(module => ({
      id: module.id,
      label: module.name,
      icon: module.uiComponents?.sidebar?.icon ? createIconComponent(module.uiComponents.sidebar.icon) : createIconComponent('QuestionMarkCircleIcon'),
      path: module.uiComponents?.sidebar?.path || `/apps/${module.id}`
    }));
  }
  return primarySections;
};

// Helper function to get PageInternalNav items for a given primary section
export const getPageNavForSection = (sectionId, allCoreSections = primarySections) => {
  const section = allCoreSections.find(s => s.id === sectionId && s.type === 'page');
  if (section?.pageNavItems) {
    return {
      nav: section.pageNavItems.map(item => ({
        ...item, 
        icon: item.icon && typeof item.icon === 'string' ? 
          createIconComponent(item.icon) : 
          item.icon
      })),
      footer: section.pageNavFooter,
      label: section.label,
      config: section
    };
  }
  return { nav: [], footer: null, label: section?.label || '', config: section || null };
};

// Helper function to get ExpandedNavigationPanel items
export const getExpandedNavForSection = (sectionId, allCoreSections = primarySections) => {
  const section = allCoreSections.find(s => s.id === sectionId && s.type === 'expandable');
  if (section?.expandedNav) {
    return section.expandedNav.map(item => ({
      ...item,
      icon: item.icon && typeof item.icon === 'string' ? 
        createIconComponent(item.icon) : 
        item.icon
    }));
  }
  return [];
};