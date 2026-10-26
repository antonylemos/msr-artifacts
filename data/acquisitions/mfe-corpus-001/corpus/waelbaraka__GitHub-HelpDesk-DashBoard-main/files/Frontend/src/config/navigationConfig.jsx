import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  PresentationChartLineIcon,
  ArchiveBoxIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  BookOpenIcon,
  CalendarIcon,
  QuestionMarkCircleIcon,
  BoltIcon,
  PuzzlePieceIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon,
  UserCircleIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline';

export const createNavConfig = (user) => {
  const coreTopItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <HomeIcon className="w-6 h-6" />,
      type: 'page',
      path: '/',
      isBottom: false
    },
    {
      id: 'conversations',
      label: 'Conversations',
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
      type: 'page',
      path: '/conversations',
      isBottom: false
    },
    {
      id: 'csr_dashboard',
      label: 'CSR Dashboard',
      icon: <PresentationChartLineIcon className="w-6 h-6" />,
      type: 'page',
      path: '/csr-dashboard',
      isBottom: false
    },
    {
      id: 'archives',
      label: 'Archives',
      icon: <ArchiveBoxIcon className="w-6 h-6" />,
      type: 'page',
      path: '/archives',
      isBottom: false
    },
    {
      id: 'team',
      label: 'Team',
      icon: <UsersIcon className="w-6 h-6" />,
      type: 'page',
      path: '/team',
      isBottom: false
    },
    {
      id: 'services',
      label: 'Services',
      icon: <WrenchScrewdriverIcon className="w-6 h-6" />,
      type: 'page',
      path: '/services',
      isBottom: false
    },
    {
      id: 'clients',
      label: 'Clients',
      icon: <UserGroupIcon className="w-6 h-6" />,
      type: 'page',
      path: '/clients',
      isBottom: false
    },
    {
      id: 'knowledgebase',
      label: 'KnowledgeBase',
      icon: <BookOpenIcon className="w-6 h-6" />,
      type: 'page',
      path: '/knowledgebase',
      isBottom: false
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: <CalendarIcon className="w-6 h-6" />,
      type: 'page',
      path: '/appointments',
      isBottom: false
    },
    {
      id: 'helpdesk',
      label: 'HelpDesk',
      icon: <QuestionMarkCircleIcon className="w-6 h-6" />,
      type: 'page',
      path: '/helpdesk',
      isBottom: false
    },
    {
      id: 'automation',
      label: 'Automation',
      icon: <BoltIcon className="w-6 h-6" />,
      type: 'page',
      path: '/automation',
      isBottom: false
    }
  ];

  // Convert installed modules to nav items
  const installedModuleItems = (user?.installedModules || []).map(module => ({
    id: module.id,
    label: module.name,
    icon: module.uiComponents?.sidebar?.icon || <QuestionMarkCircleIcon className="w-5 h-5" />,
    type: 'page',
    path: module.uiComponents?.sidebar?.path || `/apps/${module.id}`,
    moduleId: module.id
  }));

  const coreBottomItems = [
    {
      id: 'apps',
      label: 'Apps Marketplace',
      icon: <PuzzlePieceIcon className="w-6 h-6" />,
      type: installedModuleItems.length > 0 ? 'expandable' : 'page',
      isBottom: true,
      path: '/apps/explore',
      expandedNavTitle: 'Installed Apps',
      expandedNav: installedModuleItems
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: <ChartBarIcon className="w-6 h-6" />,
      type: 'expandable',
      isBottom: true,
      path: '/reports',
      expandedNavTitle: "Reports",
      expandedNav: [
        { id: 'performance', label: 'Performance', icon: <PresentationChartLineIcon className="w-5 h-5" />, path: '/reports/performance' },
        { id: 'tasks', label: 'Tasks', icon: <ClipboardDocumentListIcon className="w-5 h-5" />, path: '/reports/tasks' },
        { id: 'team', label: 'Team', icon: <BuildingOfficeIcon className="w-5 h-5" />, path: '/reports/team' }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Cog6ToothIcon className="w-6 h-6" />,
      type: 'expandable',
      isBottom: true,
      path: '/settings/tags',
      expandedNavTitle: "Platform Settings",
      expandedNav: [
        { id: 'general', label: 'General', icon: <Cog6ToothIcon className="w-5 h-5" />, path: '/settings/general' },
        { id: 'security', label: 'Security', icon: <ShieldCheckIcon className="w-5 h-5" />, path: '/settings/security' },
        { id: 'integrations', label: 'Integrations', icon: <CubeTransparentIcon className="w-5 h-5" />, path: '/settings/integrations' }
      ]
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <BellIcon className="w-6 h-6" />,
      type: 'page',
      isBottom: true,
      path: '/notifications'
    },
    {
      id: 'userProfile',
      label: 'User Profile',
      icon: <UserCircleIcon className="w-6 h-6" />,
      type: 'page',
      isBottom: true,
      isAvatar: true,
      path: '/userProfile'
    }
  ];

  return [...coreTopItems, ...coreBottomItems];
};