// src/components/layouts/DashboardLayout.jsx

import React, { useState, useCallback, useMemo, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';

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
  CubeTransparentIcon,
  // Add missing icons
  ChatBubbleLeftEllipsisIcon,
  CheckBadgeIcon,
  SparklesIcon,
  SquaresPlusIcon,
  LinkIcon,
  CodeBracketIcon,
  AcademicCapIcon,
  CubeIcon,
  TagIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

const iconMapForDynamicModules = {
  'HomeIcon': HomeIcon,
  'ChatBubbleLeftRightIcon': ChatBubbleLeftRightIcon,
  'ArchiveBoxIcon': ArchiveBoxIcon,
  'UsersIcon': UsersIcon,
  'WrenchScrewdriverIcon': WrenchScrewdriverIcon,
  'UserGroupIcon': UserGroupIcon,
  'BookOpenIcon': BookOpenIcon,
  'CalendarIcon': CalendarIcon,
  'QuestionMarkCircleIcon': QuestionMarkCircleIcon,
  'BoltIcon': BoltIcon,
  'PuzzlePieceIcon': PuzzlePieceIcon,
  'ChartBarIcon': ChartBarIcon,
  'Cog6ToothIcon': Cog6ToothIcon,
  'BellIcon': BellIcon,
  'UserCircleIcon': UserCircleIcon
};

// Platform Core Components
import AnnouncementBar from '../AnnouncementBar.jsx';
import TopBar from '../TopBar';
import PrimarySidebar from '../PrimarySidebar';
import ExpandedNavigationPanel from '../ExpandedNavigationPanel';
import PageInternalNav from '../PageInternalNav.jsx';
import { useAuthStore } from '../../stores/authStore.js';
import * as HeroIconsOutline from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

import platformApi from '../../api/api.js'; // Host imports its own module

// Import specific icons that are part of the CORE platform's static sidebar definition
import {
  HomeIcon as CoreHomeIcon,
  UserCircleIcon as CoreUserCircleIcon,
  Cog6ToothIcon as CoreCog6ToothIcon,
  BellIcon as CoreBellIcon,
  SquaresPlusIcon as CoreAppsIcon,
  ChartBarIcon as CoreChartBarIcon,
} from '@heroicons/react/24/outline';

// COMPLETE Icon map for DYNAMICALLY loaded modules where icon is a STRING NAME
const dynamicIconMap = {
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
  
  // Additional icons for settings and reports
  TagIcon: HeroIconsOutline.TagIcon,
  CalendarDaysIcon: HeroIconsOutline.CalendarDaysIcon,
  MapPinIcon: HeroIconsOutline.MapPinIcon,
  BuildingOffice2Icon: HeroIconsOutline.BuildingOffice2Icon,
  
  // Fallback
  Default: HeroIconsOutline.CubeIcon,
};

// **This is now the single source of truth for the sidebar structure.**
// We will merge dynamic modules into this structure.
import { primarySections as staticCoreSections, getPageNavForSection, getExpandedNavForSection, staticCoreTopItemsDef, staticCoreBottomItemsDef } from '../../sidebarConfig.jsx';

// Page Imports...
const HomePage = lazy(() => import('../../pages/HomePage.jsx'));
const TeamPage = lazy(() => import('../../pages/TeamPage.jsx'));
const UserProfilePage = lazy(() => import('../../pages/UserProfilePage.jsx'));
const HelpDeskPage = lazy(() => import('../../pages/HelpDeskPage.jsx'));
const AppointmentsPage = lazy(() => import('../../pages/AppointmentsPage.jsx'));
const ClientsPage = lazy(() => import('../../pages/ClientsPage.jsx'));
const ConversationsPage = lazy(() => import('../../pages/ConversationsPage.jsx'));
const ArchivesPage = lazy(() => import('../../pages/ArchivesPage.jsx'));
const KnowledgeBasePage = lazy(() => import('../../pages/KnowledgeBasePage.jsx'));
const ArticlePage = lazy(() => import('../../pages/ArticlePage.jsx'));
const Last7DaysSummaryReportPage = lazy(() => import('../../pages/reports/Last7DaysSummaryReportPage.jsx'));
const TotalChatsReportPage = lazy(() => import('../../pages/reports/TotalChatsReportPage.jsx'));
const AppointmentsDetailedReportPage = lazy(() => import('../../pages/reports/AppointmentsDetailedReportPage.jsx'));
const TagsSettingsPage = lazy(() => import('../../pages/settings/TagsSettingsPage.jsx'));
const AppointmentSettingsPage = lazy(() => import('../../pages/services/AppointmentSettingsPage.jsx'));
const ServicesPage = lazy(() => import('../../pages/ServicesPage.jsx'));
const CSR_AppointmentsDashboard = lazy(() => import('../../pages/CSR_AppointmentsDashboard.jsx'));
const FlowBuilderPage = lazy(() => import('../../pages/flowbuilder/FlowBuilderPage.jsx'));
const GenericPage = lazy(() => import('../../pages/GenericPage.jsx'));
const ExploreAppsPage = lazy(() => import('../../pages/marketplace/ExploreAppsPage.jsx'));
const AppDetailsPage = lazy(() => import('../../pages/marketplace/AppDetailsPage.jsx'));
const RemoteWhatsAppSettingsPage = lazy(() => import('remote_app/WhatsAppChannelSettingsPage')); 
const AutomateOverviewPage = lazy(() => import('../../pages/automate/AutomateOverviewPage')); 


const LoadingFallback = () => (
  <div className="flex-1 flex items-center justify-center text-gray-500 bg-content-bg">
    Loading Page...
  </div>
);

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser: updateUserInStore, isAuthenticated } = useAuthStore();

  const installedModulesFromStore = user?.installedModules || [];
  const currentInstalledModules = user?.installedModules || [];
  const [isProfileLoading, setIsProfileLoading] = useState(false);

 
  const allNavSections = useMemo(() => {
    const currentInstalledModules = user?.installedModules || [];

   const mapItems = (items) => items.map(item => {
  return { ...item, icon: item.icon || 'CubeIcon' };
});

    const finalStaticCoreTopItems = mapItems(staticCoreTopItemsDef);
    const finalStaticCoreBottomItems = mapItems(staticCoreBottomItemsDef);

const dynamicModuleSidebarItems = currentInstalledModules
  .map(module => {
    let uiComponents = module.uiComponents;
    if (typeof uiComponents === 'string') {
      try { uiComponents = JSON.parse(uiComponents); }
      catch (e) { console.error(`Error parsing uiComponents for module ${module.id}:`, e); uiComponents = {}; }
    }
    if (!uiComponents?.sidebar) return null;

    const sidebarConfig = uiComponents.sidebar;

    return {
      id: module.id,
      label: sidebarConfig.label || module.name,
      icon: sidebarConfig.icon || 'CubeIcon',  // ✅ THIS LINE FIXED
      type: sidebarConfig.type || 'page',
      isBottom: sidebarConfig.isBottom || true,
      path: sidebarConfig.path,
      expandedNavTitle: sidebarConfig.expandedNavTitle,
      expandedNav: sidebarConfig.expandedNav,
    };
  })
  .filter(Boolean);

    
    // Merging logic (simplified for example, ensure correct order)
    let topCombined = [...finalStaticCoreTopItems];
    let bottomCombined = [...finalStaticCoreBottomItems];

    dynamicModuleSidebarItems.forEach(dynItem => {
      if (!topCombined.find(s => s.id === dynItem.id) && !bottomCombined.find(s => s.id === dynItem.id)) {
        if (dynItem.isBottom) {
          // Insert before the profile avatar if it exists
          const profileIndex = bottomCombined.findIndex(item => item.isAvatar);
          if (profileIndex !== -1) {
            bottomCombined.splice(profileIndex, 0, dynItem);
          } else {
            bottomCombined.push(dynItem);
          }
        } else {
          // Insert dynamic items before the 'Apps' marketplace link in top items, or at end if 'Apps' not found
          const appsMarketplaceIndex = topCombined.findIndex(item => item.id === 'apps');
          if (appsMarketplaceIndex !== -1) {
            topCombined.splice(appsMarketplaceIndex, 0, dynItem);
          } else {
            topCombined.push(dynItem);
          }
        }
      }
    });
    
    const finalSections = [...topCombined, ...bottomCombined];
    return finalSections;
  }, [user])

  const [expandedSectionId, setExpandedSectionId] = useState(null);
  const [openNestedSubmenus, setOpenNestedSubmenus] = useState({});
  
  const activePrimaryIconId = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return 'home';
    
    // Handle special cases for nested paths
    if (pathSegments[0] === 'apps') return 'apps';
    if (pathSegments[0] === 'reports') return 'reports';
    if (pathSegments[0] === 'reports1') return 'reports1';
    if (pathSegments[0] === 'settings') return 'settings';
        if (pathSegments[0] === 'automate') return 'automate';

    return pathSegments[0];
  }, [location.pathname]);
  
  const activeSubItemId = useMemo(() => {
    const segments = location.pathname.split('/').filter(Boolean);
    return segments.length > 1 ? segments.join('/') : `${segments[0]}/all`;
  }, [location.pathname]);

  const sectionsWithIcons = allNavSections.map(section => ({
    ...section,
    icon: typeof section.icon === 'string' ? 
      iconMapForDynamicModules[section.icon] || QuestionMarkCircleIcon : 
      section.icon
  }));

  const currentSectionConfig = useMemo(() => {
    return allNavSections.find(s => s.id === activePrimaryIconId);
  }, [activePrimaryIconId, allNavSections]);

  // --- Use getPageNavForSection & getExpandedNavForSection for CORE expandable sections ---
  const { nav: pageNavItems, footer: navFooterButton } = useMemo(() => {
    const coreSection = staticCoreSections.find(s => s.id === activePrimaryIconId && s.type === 'page' && s.pageNavItems);
    return coreSection ? { nav: coreSection.pageNavItems, footer: coreSection.pageNavFooter } : { nav: [], footer: null };
  }, [activePrimaryIconId]);

  const expandedNavItemsForPanel = useMemo(() => {
    const coreExpandableSection = staticCoreSections.find(s => s.id === expandedSectionId && s.type === 'expandable');
    if (coreExpandableSection) return coreExpandableSection.expandedNav || [];
    
    // For dynamic modules that are expandable
    const dynamicExpandableModule = allNavSections.find(s => s.id === expandedSectionId && s.type === 'expandable' && s.expandedNav);
    if (dynamicExpandableModule) {
      // Need to map string icons in module's expandedNav to components
      return (dynamicExpandableModule.expandedNav || []).map(navItem => ({
        ...navItem,
        icon: navItem.icon && typeof navItem.icon === 'string' 
              ? React.createElement(dynamicIconMap[navItem.icon] || dynamicIconMap.Default) 
              : navItem.icon
      }));
    }
    return [];
  }, [expandedSectionId, allNavSections]);

  const expandedNavTitleForPanel = useMemo(() => {
    return allNavSections.find(s => s.id === expandedSectionId)?.expandedNavTitle || allNavSections.find(s => s.id === expandedSectionId)?.label;
  }, [expandedSectionId, allNavSections]);

  const handlePrimaryIconClick = useCallback((section) => {
    
    if (!section) {
      return;
    }
    
    const targetPath = section.path || `/${section.id}`;
    
    if (section.type === 'expandable') {
      setExpandedSectionId(prev => (prev === section.id ? null : section.id));
      // Navigate to the default path if not already there
      if (location.pathname !== targetPath && !location.pathname.startsWith(`/${section.id}/`)) {
        navigate(targetPath);
      }
    } else {
      setExpandedSectionId(null);
      navigate(targetPath);
    }
  }, [navigate, location.pathname]);

  const handleSubItemClick = useCallback((itemIdOrPath) => {
    const path = itemIdOrPath.startsWith('/') ? itemIdOrPath : `/${itemIdOrPath}`;
    navigate(path);
    setExpandedSectionId(null); 
  }, [navigate]);

  const handleToggleNestedSubmenu = useCallback((itemId) => {
    setOpenNestedSubmenus(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  }, []);

  if (isProfileLoading && (!user || !user.installedModules)) {
    return <div className="flex h-screen w-screen items-center justify-center text-xl font-semibold text-gray-700">Loading User Session...</div>;
  }
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const showExpandedPanel = !!expandedSectionId;

  return (
        

    <div className="flex h-screen overflow-hidden bg-primary-sidebar-bg">
      <PrimarySidebar
        sections={allNavSections}
        activePrimaryIconId={activePrimaryIconId}
        onIconClick={handlePrimaryIconClick}
      />

      {showExpandedPanel && (
        <ExpandedNavigationPanel
          items={expandedNavItemsForPanel}
          activeSubItemId={activeSubItemId}
          openNestedSubmenus={openNestedSubmenus}
          onItemClick={handleSubItemClick}
          onToggleNestedSubmenu={handleToggleNestedSubmenu}
          sectionLabel={expandedNavTitleForPanel}
          onClose={() => setExpandedSectionId(null)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <AnnouncementBar />
        <TopBar />
        <div className="flex-1 flex overflow-hidden">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Static Core Platform Routes */}
              <Route path="/home" element={<HomePage sectionConfig={currentSectionConfig} />} />
              <Route path="/conversations" element={<ConversationsPage />} />
              <Route path="/csr_dashboard" element={<CSR_AppointmentsDashboard />} />
              <Route path="/archives" element={<ArchivesPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/knowledgebase" element={<KnowledgeBasePage sectionConfig={currentSectionConfig} onIconClick={handlePrimaryIconClick} />} />
              <Route path="/article" element={<ArticlePage onClose={() => navigate('/knowledgebase')} sectionConfig={currentSectionConfig}/>} />
              <Route path="/appointments/*" element={<AppointmentsPage pageLabel="Appointments" navItems={pageNavItems} activeSubItemId={activeSubItemId} onSubItemClick={handleSubItemClick} navFooterButton={navFooterButton} openNestedSubmenus={openNestedSubmenus} onToggleNestedSubmenu={handleToggleNestedSubmenu} />} />
              <Route path="/helpdesk/*" element={<HelpDeskPage pageLabel="HelpDesk" navItems={pageNavItems} activeSubItemId={activeSubItemId} onSubItemClick={handleSubItemClick} navFooterButton={navFooterButton} openNestedSubmenus={openNestedSubmenus} onToggleNestedSubmenu={handleToggleNestedSubmenu} />} />
              <Route path="/automation" element={<FlowBuilderPage sectionConfig={currentSectionConfig} />} />
              
              {/* Routes for static bottom items */}
              <Route path="/apps" element={<Navigate to="/apps/explore" replace />} />
              <Route path="/apps/explore" element={<ExploreAppsPage />} />
              <Route path="/apps/details/:appId" element={<AppDetailsPage />} /> 
              <Route path="/reports" element={<Navigate to="/reports/summary/last7days" replace />} />
              <Route path="/reports/summary/last7days" element={<Last7DaysSummaryReportPage />} />
              <Route path="/reports/chats/total_chats" element={<TotalChatsReportPage />} />
              <Route path="/reports/appointments_detailed" element={<AppointmentsDetailedReportPage />} />
              <Route path="/settings" element={<Navigate to="/settings/tags" replace />} />
              <Route path="/settings/tags" element={<TagsSettingsPage />} />
              <Route path="/settings/appointment_system" element={<AppointmentSettingsPage />} />
              <Route path="/notifications" element={<GenericPage sectionConfig={{ label: 'Notifications' }} />} />
              <Route path="/userProfile" element={<UserProfilePage pageLabel="My Profile" />} />
              <Route path="/integrations/whatsapp" element={   <RemoteWhatsAppSettingsPage  apiClient={platformApi}useAuthStoreHook={useAuthStore}user={user} /> }/>

              <Route path="/automate/overview" element={<AutomateOverviewPage />} />

              {/* Dynamically Injected Module Routes */}
              {(user?.installedModules || []).map(module => {
                let uiComponents = module.uiComponents;
                if (typeof uiComponents === 'string') {
                  try { uiComponents = JSON.parse(uiComponents); } catch (e) { uiComponents = {}; }
                }
                const uiPage = uiComponents?.page;

                if (uiPage?.path && uiPage.component) {
                  const isCoreRouted = [
                    "/home", "/team", "/userProfile", "/conversations", "/archives", 
                    "/clients", "/knowledgebase", "/article", "/automation", "/notifications",
                    "/apps/explore", "/apps/details/:appId" 
                  ].includes(uiPage.path) || uiPage.path.startsWith('/helpdesk') || uiPage.path.startsWith('/appointments') || uiPage.path.startsWith('/reports') || uiPage.path.startsWith('/settings');
                  
                  if (!isCoreRouted) {
                    return <Route key={module.id} path={uiPage.path} element={<GenericPage sectionConfig={{ label: module.name, id: module.id }} />} />;
                  }

                   if (uiPage?.path && uiPage.component && uiPage.path !== "/settings/integrations/whatsapp") {
                  // If you want to dynamically load other remotes based on uiComponents.remoteName:
                  // const GenericRemoteComponent = lazy(() => import(`${uiPage.remoteName}/${uiPage.component}`));
                  // return <Route key={module.id} path={uiPage.path} element={<GenericRemoteComponent />} />;
                  
                  // For now, just a generic placeholder for other non-core, non-WA-settings module pages
                  return <Route key={module.id} path={uiPage.path} element={<GenericPage sectionConfig={{ label: module.name, id: module.id }} />} />;
                }
                }
                return null;
              }).filter(Boolean)}
              
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="*" element={<GenericPage sectionConfig={{ label: 'Page Not Found' }} />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>

  );
};

export default DashboardLayout;