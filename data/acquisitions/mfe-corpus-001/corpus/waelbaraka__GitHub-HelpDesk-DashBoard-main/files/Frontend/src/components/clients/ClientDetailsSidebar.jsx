// src/components/clients/ClientDetailsSidebar.jsx
import React, { useMemo } from 'react';
// Icon Imports - Ensure these are correct and available
import {
    UserIcon,
    PlusIcon,
    TicketIcon as CreateTicketTabIcon, // Use the imported TicketIcon as CreateTicketTabIcon
    CalendarDaysIcon,
    ChatBubbleLeftEllipsisIcon,
    EllipsisHorizontalIcon,
    InformationCircleIcon,
    TicketIcon // This can be used for section titles if needed, distinct from CreateTicketTabIcon
} from '@heroicons/react/24/solid';

// Content component imports (ensure these paths are correct and components exist)
import {
    ClientHeaderInfoContent, // This is likely replaced by GeneralInfoDisplay now
    QuickActionsContent,
    GeneralInfoContent as OriginalGeneralInfoContent, // Keep original if different from common one
    AdditionalInfoContent,
    AppointmentsHistoryContent,
    CommunicationHistoryContent,
    ClientNotesContent,
    ClientTagsContent,
    CreateTicketFormContent,
    AddTabContent
} from './ClientDetailsContent'; // Assuming ClientDetailsContent.jsx exists

import DetailSidebar from '../common/DetailSidebar';
import GeneralInfoDisplay from '../common/GeneralInfoDisplay'; // Using the common display

const EXPANDED_WIDTH_CLASS = 'w-[var(--spacing-clients-details-expanded-w)]';

const ClientDetailsSidebar = React.memo(({ client, onClose, isCollapsed, onToggleCollapse }) => {
  // Config for header tabs
  const headerTabsConfig = useMemo(() => [ // This is line 118 or around it
    { id: 'details', label: 'Details', icon: <UserIcon /> },
    { id: 'add', label: 'Add', icon: <PlusIcon /> },
    { id: 'create_ticket', label: 'Create Ticket', icon: <CreateTicketTabIcon /> } // Using the aliased icon
  ], []); // Make sure UserIcon, PlusIcon, CreateTicketTabIcon are valid components

  // Config for content sections
  const sectionsConfig = useMemo(() => [
    {
      id: 'clientHeaderInfo', // For DetailSidebar to know this is the main header section
      title: 'Client Details', // This will be the title in the bar when expanded
      content: GeneralInfoDisplay, // Use the common GeneralInfoDisplay for its expanded content
      isDraggable: false,
      isCollapsible: true,
      defaultOpen: true,
      tab: 'details'
    },
    { id: 'quickActions', title: 'Quick Actions', content: QuickActionsContent, isDraggable: true, isCollapsible: true, defaultOpen: true, tab: 'details' },
    // If OriginalGeneralInfoContent is different from common GeneralInfoDisplay for clients:
    // { id: 'generalInfo', title: 'General Info', content: OriginalGeneralInfoContent, isDraggable: true, isCollapsible: true, defaultOpen: true, titleIcon: <EllipsisHorizontalIcon/>, tab: 'details' },
    // If you want to use the common GeneralInfoDisplay for this section too (might be redundant with clientHeaderInfo):
    { id: 'generalClientInfo', title: 'General Info', content: GeneralInfoDisplay, item: client, isDraggable: true, isCollapsible: true, defaultOpen: true, titleIcon: <InformationCircleIcon/>, tab: 'details' }, // Note: DetailSidebar passes selectedItem as 'item' to content if 'item' is not directly in section config.
    { id: 'additionalInfo', title: 'Additional info', content: AdditionalInfoContent, isDraggable: true, isCollapsible: true, defaultOpen: true, titleIcon: <InformationCircleIcon/>, tab: 'details' },
    { id: 'appointmentsHistory', title: 'Appointments History', content: AppointmentsHistoryContent, isDraggable: true, isCollapsible: true, defaultOpen: true, titleIcon: <CalendarDaysIcon/>, tab: 'details' },
    { id: 'communicationHistory', title: 'Communication History', content: CommunicationHistoryContent, isDraggable: true, isCollapsible: true, defaultOpen: true, titleIcon: <ChatBubbleLeftEllipsisIcon/>, tab: 'details' },
    { id: 'clientNotes', title: 'Client Notes', content: ClientNotesContent, isDraggable: true, isCollapsible: true, defaultOpen: false, titleIcon: <TicketIcon/>, tab: 'details' }, // Using the non-aliased TicketIcon here
    { id: 'clientTags', title: 'Client Tags', content: ClientTagsContent, isDraggable: true, isCollapsible: true, defaultOpen: false, titleIcon: <EllipsisHorizontalIcon/>, tab: 'details' },
    // Content for 'add' tab
    { id: 'addTabContent', title: 'Add Client Actions', content: AddTabContent, isDraggable: false, isCollapsible: false, tab: 'add' },
    // Content for 'create_ticket' tab
    { id: 'createTicketForm', title: 'Create New Ticket', content: CreateTicketFormContent, isDraggable: false, isCollapsible: false, tab: 'create_ticket' }
  ], [client]); // Add client as dependency if GeneralInfoDisplay in sectionsConfig needs it directly

  const collapsedIcons = useMemo(() => [
    { component: CalendarDaysIcon, title: 'Book Appt.' },
    { component: ChatBubbleLeftEllipsisIcon, title: 'Start Chat' },
    { component: CreateTicketTabIcon, title: 'Create Ticket' } // Using aliased icon
  ], []);


  return (
    <DetailSidebar
      selectedItem={client}
      onClose={onClose}
      isCollapsed={isCollapsed}
      onToggleCollapse={onToggleCollapse}
      headerTabsConfig={headerTabsConfig}
      sectionsConfig={sectionsConfig}
      expandedWidthClass={EXPANDED_WIDTH_CLASS}
      collapsedAvatarInitial={client?.avatarInitial || (client?.name || '?').charAt(0)}
      collapsedAvatarBgColor={client?.avatarColor || 'bg-gray-400'}
      collapsedIcons={collapsedIcons}
    />
  );
});

export default ClientDetailsSidebar;