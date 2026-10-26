// src/components/chat/ChatDetailsSidebar.jsx
import React, { useMemo, useCallback } from 'react';
// --- Icons ---
import {
    UserIcon,
    TicketIcon as CreateTicketTabIcon,
    BookOpenIcon,
    CalendarDaysIcon as AppointmentsTabIcon,
    ChatBubbleLeftEllipsisIcon as ChatBubbleIcon,
    CalendarDaysIcon, // Also for default collapsed icons
    TicketIcon // Also for default collapsed icons
} from '@heroicons/react/24/solid';

import DetailSidebar from '../common/DetailSidebar';
import CreateTicketForm from '../common/CreateTicketForm'; // Assumed to have its own padding
import GeneralInfoDisplay from '../common/GeneralInfoDisplay'; // Assumed to have its own padding
import KnowledgeBaseTabContent from '../common/KnowledgeBaseTabContent'; // Assumed to have its own padding
import AppointmentsTabContent from '../common/AppointmentsTabContent'; // Assumed to have its own padding

// --- Content Components for "Details" Tab (Flat Style) ---
// IMPORTANT: These components should now manage their own internal padding (e.g., a root div with className="p-4")
// as DetailSidebar will not wrap them in a padded card when isFlat=true.

const AdditionalInfoSection = React.memo(({ contact }) => (
    <div className="p-4 text-sm text-gray-700 space-y-1.5"> {/* Example: Added p-4 */}
        <p><span className="font-medium text-gray-600">Returning visitor:</span> {contact?.additionalInfo?.returningVisitor || 'N/A'}</p>
        <p><span className="font-medium text-gray-600">Last seen:</span> {contact?.additionalInfo?.lastSeen || 'N/A'}</p>
        <p>
            <span className="font-medium text-gray-600">Came from:</span>
            {contact?.additionalInfo?.cameFrom ? (
                <a href={contact.additionalInfo.cameFrom.startsWith('http') ? contact.additionalInfo.cameFrom : `//${contact.additionalInfo.cameFrom}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                    {contact.additionalInfo.cameFrom}
                </a>
            ) : ' N/A'}
        </p>
        <p><span className="font-medium text-gray-600">Chat duration:</span> {contact?.additionalInfo?.duration || 'N/A'}</p>
        <div className="flex items-center">
            <span className="font-medium text-gray-600 mr-1">Groups:</span>
            {contact?.additionalInfo?.groupAvatarInitial && contact?.additionalInfo?.groupAvatarBg && (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mr-1 ${contact.additionalInfo.groupAvatarBg} text-white`}>
                    <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] mr-1`}>
                        {contact.additionalInfo.groupAvatarInitial}
                    </span>
                    {contact?.additionalInfo?.group || 'General'}
                </span>
            )}
            {!contact?.additionalInfo?.groupAvatarInitial && (contact?.additionalInfo?.group || 'General')}
        </div>
    </div>
));

const VisitedPagesSection = React.memo(({ contact }) => {
    const pages = contact?.visitedPages || [];
    return (
        <div className="p-4 text-sm text-gray-700 space-y-2.5"> {/* Example: Added p-4 */}
            {pages.length > 0 ? pages.map(page => (
                <div key={page.id || page.title} className="truncate">
                    <a href={page.url} title={page.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block leading-tight">
                        {page.title}
                    </a>
                    {page.time && <p className="text-xs text-gray-500">{page.time}</p>}
                </div>
            )) : <p className="text-gray-500">No visited pages data.</p>}
        </div>
    );
});

const PreChatFormSection = React.memo(({ contact }) => (
    <div className="p-4 text-sm text-gray-700 space-y-1.5"> {/* Example: Added p-4 */}
        <p><span className="font-medium text-gray-600">Name:</span> {contact?.preChatFormData?.name || 'N/A'}</p>
        <p>
            <span className="font-medium text-gray-600">E-mail:</span>
            {contact?.preChatFormData?.email ? (
                 <a href={`mailto:${contact.preChatFormData.email}`} className="text-blue-600 hover:underline ml-1">
                    {contact.preChatFormData.email}
                </a>
            ) : ' N/A'}
        </p>
    </div>
));

const TechnologySection = React.memo(({ contact }) => (
    <div className="p-4 text-sm text-gray-700 space-y-1.5"> {/* Example: Added p-4 */}
        <p><span className="font-medium text-gray-600">Browser:</span> {contact?.technology?.browser || 'N/A'}</p>
        <p><span className="font-medium text-gray-600">Operating System:</span> {contact?.technology?.os || 'N/A'}</p>
        <p><span className="font-medium text-gray-600">IP Address:</span> {contact?.technology?.ip || 'N/A'}</p>
    </div>
));

const CopilotSection = React.memo(({ contact }) => (
    <div className="p-4 text-sm text-gray-700"> {/* Example: Added p-4 */}
        <p className="font-medium text-gray-600 mb-1">Copilot Suggestions:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Suggest sending product comparison link.</li>
            <li>Offer 10% discount code for first-time buyers.</li>
        </ul>
    </div>
));

const ChatInfoSection = React.memo(({ contact }) => (
     <div className="p-4 text-sm text-gray-700 space-y-1.5"> {/* Example: Added p-4 */}
        <p><span className="font-medium text-gray-600">Chat ID:</span> {contact?.chatInfo?.id || 'N/A'}</p>
        <p><span className="font-medium text-gray-600">Queued for:</span> {contact?.chatInfo?.queuedFor || 'N/A'}</p>
        <p><span className="font-medium text-gray-600">Chatting time:</span> {contact?.chatInfo?.chattingTime || 'N/A'}</p>
        {contact?.chatInfo?.startedOn && (
            <p>
                <span className="font-medium text-gray-600">Started on:</span>
                <a href={contact.chatInfo.startedOnLink || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1 truncate block max-w-full">
                    {contact.chatInfo.startedOn}
                </a>
            </p>
        )}
    </div>
));

const GoalsSection = React.memo(({ contact }) => (
    <div className="p-4 text-sm text-gray-700"> {/* Example: Added p-4 */}
        <p><span className="font-medium text-gray-600">Goals achieved:</span> {contact?.goalsAchieved || 0}</p>
        <a href="#" className="text-blue-600 hover:underline text-xs mt-1 block">View goal details</a>
    </div>
));

const WhatsAppInfoSection = React.memo(({ contact }) => (
    <div className="p-4 text-sm text-gray-700"> {/* Example: Added p-4 */}
        <p><span className="font-medium text-gray-600">WhatsApp Number:</span> {contact?.whatsapp || 'N/A'}</p>
    </div>
));

const RequesterTicketsSection = React.memo(({ contact }) => {
    const tickets = contact?.requesterTickets?.recent || [];
    return (
        <div className="p-4 text-sm text-gray-700"> {/* Example: Added p-4 */}
            <p className="font-medium text-gray-600 mb-1">Recent Tickets:</p>
            {tickets.length > 0 ? (
                <ul className="list-disc list-inside space-y-1.5">
                    {tickets.map((ticket, index) => (
                        <li key={ticket.id || index} className="text-gray-600">
                            {ticket.subject} - <span className="text-xs text-gray-500">{ticket.status}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No recent tickets for this requester.</p>
            )}
            <a href={contact?.requesterTickets?.archivedSearchLink || '#'} className="text-blue-600 hover:underline text-xs mt-2 block">Search archived tickets</a>
        </div>
    );
});


const EXPANDED_WIDTH_CLASS = 'w-[var(--spacing-chat-details-w)]';

const ChatDetailsSidebar = React.memo(({
  contact,
  isCollapsed,
  onToggleCollapse,
  onClose,
  onInsertTextIntoChatInput,
  onOpenAppointmentForm, // Keep these if Appointments tab might use them
  onViewAppointmentDetails // Keep these
}) => {

  const headerTabsConfig = useMemo(() => [
    { id: 'details', label: 'Details', icon: <UserIcon /> },
    { id: 'create_ticket', label: 'Create Ticket', icon: <CreateTicketTabIcon /> },
    { id: 'knowledge_base', label: 'Knowledge Base', icon: <BookOpenIcon /> },
    { id: 'appointments', label: 'Appointments', icon: <AppointmentsTabIcon /> }
  ], []);

  const handleTicketFormSubmit = useCallback((ticketFormData) => {
    console.log('New Ticket Data from Chat Details:', ticketFormData);
    console.log('Related Contact:', contact);
    alert('Ticket creation simulated! Check console for data.');
  }, [contact]);

  const handleInsertArticleLink = useCallback((linkText) => {
    if (onInsertTextIntoChatInput) {
        onInsertTextIntoChatInput(linkText);
    } else {
        console.warn("onInsertTextIntoChatInput prop not provided to ChatDetailsSidebar");
    }
  }, [onInsertTextIntoChatInput]);

  const handleBookNewAppointmentForContact = useCallback(() => { if (onOpenAppointmentForm) onOpenAppointmentForm(contact); }, [contact, onOpenAppointmentForm]);
  const handleEditAppointmentFromSidebar = useCallback((appt) => { if (onOpenAppointmentForm) onOpenAppointmentForm(contact, appt);}, [contact, onOpenAppointmentForm]);
  const handleViewAppointmentDetailsFromSidebar = useCallback((apptId) => { if (onViewAppointmentDetails) onViewAppointmentDetails(apptId);}, [onViewAppointmentDetails]);


  const sectionsConfig = useMemo(() => [
    // --- Sections for 'details' tab - ALL ARE FLAT ---
    { id: 'contactInfo', title: 'Contact Info', content: GeneralInfoDisplay, isDraggable: false, isCollapsible: true, defaultOpen: true, tab: 'details', isFlat: true },
    { id: 'additionalInfo', title: 'Additional info', content: AdditionalInfoSection, isDraggable: true, isCollapsible: true, defaultOpen: true, tab: 'details', isFlat: true },
    { id: 'visitedPages', title: 'Visited pages', content: VisitedPagesSection, isDraggable: true, isCollapsible: true, defaultOpen: false, tab: 'details', isFlat: true },
    { id: 'preChatForm', title: 'Pre-chat form', content: PreChatFormSection, isDraggable: true, isCollapsible: true, defaultOpen: false, tab: 'details', isFlat: true },
    { id: 'technology', title: 'Technology', content: TechnologySection, isDraggable: true, isCollapsible: true, defaultOpen: false, tab: 'details', isFlat: true },
    { id: 'copilot', title: 'Copilot', content: CopilotSection, isDraggable: true, isCollapsible: true, defaultOpen: false, tab: 'details', isFlat: true },
    { id: 'chatInfo', title: 'Chat info', content: ChatInfoSection, isDraggable: true, isCollapsible: true, defaultOpen: true, tab: 'details', isFlat: true },
    { id: 'goals', title: 'Goals', content: GoalsSection, isDraggable: true, isCollapsible: true, defaultOpen: true, tab: 'details', isFlat: true },
    { id: 'whatsApp', title: 'WhatsApp Business', content: WhatsAppInfoSection, isDraggable: true, isCollapsible: true, defaultOpen: false, tab: 'details', isFlat: true },
    { id: 'requesterTickets', title: 'HelpDesk requester\'s tickets', content: RequesterTicketsSection, isDraggable: true, isCollapsible: true, defaultOpen: false, tab: 'details', isFlat: true },

    // --- Section for 'create_ticket' tab - ALSO FLAT ---
    {
      id: 'createTicketFormSection',
      title: 'Create New Ticket',
      content: (props) => <CreateTicketForm client={props.contact} onSubmit={handleTicketFormSubmit} />,
      isDraggable: false,
      isCollapsible: false,
      defaultOpen: true,
      tab: 'create_ticket',
      isFlat: true
    },

    // --- Section for 'knowledge_base' tab - ALSO FLAT (content component handles full layout) ---
    {
      id: 'knowledgeBaseTabSection',
      title: 'Knowledge Base',
      content: (props) => <KnowledgeBaseTabContent contact={props.contact} onInsertTextIntoChat={handleInsertArticleLink} />,
      isDraggable: false,
      isCollapsible: false,
      defaultOpen: true,
      tab: 'knowledge_base',
      isFlat: true
    },

    // --- Section for 'appointments' tab - ALSO FLAT (content component handles full layout) ---
    {
      id: 'appointmentsTabSection',
      title: 'Client Appointments',
      content: (props) => <AppointmentsTabContent
                                contact={props.contact}
                                onBookNewAppointment={handleBookNewAppointmentForContact}
                                onEditAppointment={handleEditAppointmentFromSidebar}
                                onViewAppointmentDetails={handleViewAppointmentDetailsFromSidebar}
                           />,
      isDraggable: false,
      isCollapsible: false,
      defaultOpen: true,
      tab: 'appointments',
      isFlat: true
    }
  ], [contact, handleTicketFormSubmit, handleInsertArticleLink, handleBookNewAppointmentForContact, handleEditAppointmentFromSidebar, handleViewAppointmentDetailsFromSidebar]);

  const renderCustomCollapsedContent = useCallback(({ handleTabChange: onInternalTabChange }) => {
    return (
        <>
            {contact && ( <div className={`w-8 h-8 ${contact.avatarColor || contact.avatarBg || 'bg-gray-400'} rounded-full flex items-center justify-center text-white text-sm font-semibold my-2`}> {contact.avatarInitial || (contact.name || contact.userName || '?').charAt(0)} </div> )}
            {headerTabsConfig.map(tab => (
                <button key={tab.id} onClick={() => onInternalTabChange(tab.id)} title={tab.label}
                    className="p-2.5 rounded-md hover:bg-gray-200 w-full flex justify-center">
                    {React.cloneElement(tab.icon, { className: "w-5 h-5 text-gray-600" })}
                </button>
            ))}
        </>
    );
  }, [headerTabsConfig, contact]);

  return (
    <DetailSidebar
      selectedItem={contact}
      onClose={onClose}
      isCollapsed={isCollapsed}
      onToggleCollapse={onToggleCollapse}
      headerTabsConfig={headerTabsConfig}
      sectionsConfig={sectionsConfig}
      expandedWidthClass={EXPANDED_WIDTH_CLASS}
      renderCollapsedContent={renderCustomCollapsedContent}
      collapsedAvatarInitial={contact?.avatarInitial || (contact?.name || contact?.userName)?.charAt(0)}
      collapsedAvatarBgColor={contact?.avatarColor || contact?.avatarBg}
    />
  );
});

export default ChatDetailsSidebar;