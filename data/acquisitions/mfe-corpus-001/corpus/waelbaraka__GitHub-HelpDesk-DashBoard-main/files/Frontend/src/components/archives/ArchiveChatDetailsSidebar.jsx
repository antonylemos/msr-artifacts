// src/components/archives/ArchiveChatDetailsSidebar.jsx
import React, { useMemo, useCallback } from 'react';
import {
    InformationCircleIcon,
    AdjustmentsHorizontalIcon,
    ClockIcon,
    MapPinIcon,
    ArrowTopRightOnSquareIcon,
    LinkIcon as UrlLinkIcon,
    HandThumbDownIcon,
    TicketIcon,
    EllipsisHorizontalIcon, // Added for SortableSectionItem
    XMarkIcon // For the close button in the header
} from '@heroicons/react/24/solid';

import DetailSidebar from '../common/DetailSidebar';

// --- Archive Specific Content Components (These render the BODY of each card) ---
// These components should have their own internal padding, e.g., className="p-4"

const DetailItem = React.memo(({ label, value, isLink = false, href = '#' }) => ( /* ... as before ... */ <div className="flex justify-between items-start text-sm py-1.5"> <span className="text-slate-500 whitespace-nowrap mr-3">{label}:</span> {isLink && value && value !== 'N/A' ? ( <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate ml-auto text-right break-all"> {value} </a> ) : ( <span className="text-slate-700 ml-auto text-right break-all">{value || 'N/A'}</span> )} </div>));
const ArchiveGeneralInfoCardContent = React.memo(({ generalInfo }) => { /* ... as before, ensure root has p-4 ... */ if (!generalInfo) return <div className="px-4 pt-0 pb-4 text-xs text-slate-400">No general info.</div>; const name = generalInfo.name || 'Unknown Visitor'; const email = generalInfo.email || '(no email)'; const avatarInitial = generalInfo.avatarInitial || (name !== 'N/A' ? name.charAt(0).toUpperCase() : '?'); const avatarBg = generalInfo.avatarBg || 'bg-slate-400'; return ( <div className="p-4"> <div className="flex items-center mb-3"> <div className={`w-10 h-10 ${avatarBg} rounded-full flex items-center justify-center text-white text-lg font-semibold mr-3 flex-shrink-0`}> {avatarInitial} </div> <div> <h4 className="text-base font-semibold text-slate-800">{name}</h4> <p className="text-sm text-slate-500">{email}</p> </div> </div> <div className="space-y-1.5 text-sm mb-4"> {generalInfo.localTime && ( <div className="flex items-center text-slate-600"> <ClockIcon className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" /> {generalInfo.localTime} </div>)} {generalInfo.location && ( <div className="flex items-center text-slate-600"> <MapPinIcon className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" /> {generalInfo.location} </div>)} </div> <div className="flex items-center space-x-2"> <button className="flex-1 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-md font-medium transition-colors"> View all chats </button> <button className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-md transition-colors"> <ArrowTopRightOnSquareIcon className="w-5 h-5" /> </button> </div> </div> ); });
const ArchiveChatInfoCardContent = React.memo(({ chatInfo }) => { /* ... as before, ensure root has p-4 ... */ if (!chatInfo) return <div className="p-4 text-xs text-slate-400">No chat information.</div>; return ( <div className="p-4 space-y-1.5"> <DetailItem label="Chat ID" value={chatInfo.id} /> <DetailItem label="Chatting time" value={chatInfo.chattingTime} /> <DetailItem label="Started on" value={chatInfo.startedOn} isLink href={chatInfo.startedOnLink} /> <DetailItem label="Came from" value={chatInfo.cameFrom} isLink href={chatInfo.cameFromLink || '#'} /> <div className="flex justify-between items-center text-sm py-1"> <span className="text-slate-500">Groups:</span> <div className="flex items-center ml-2 flex-wrap justify-end"> {chatInfo.groups && chatInfo.groups.length > 0 ? ( chatInfo.groups.map(g => ( <span key={g.id} className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mr-1 mb-1 ${g.color || 'bg-slate-200'} ${g.color ? 'text-white' : 'text-slate-700'}`}> {g.initial && <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] mr-1.5 ${g.color ? 'ring-1 ring-white/50' : ''}`}>{g.initial}</span>} {g.name} </span> )) ) : (<span className="text-slate-700">N/A</span>) } </div> </div> {chatInfo.rating && ( <div className="pt-2.5 mt-1.5 border-t border-slate-200"> <div className="flex items-center text-sm text-red-600"> <HandThumbDownIcon className="w-4 h-4 mr-1.5 flex-shrink-0"/> Rated <span className="font-medium ml-1">{chatInfo.rating}</span> </div> {chatInfo.visitorComment && <p className="text-sm text-slate-600 mt-1">Visitor's comment: <span className="italic">"{chatInfo.visitorComment}"</span></p>} </div> )} </div> );});
const ArchivePreChatFormCardContent = React.memo(({ preChatFormData }) => { /* ... as before, ensure root has p-4 ... */  if (!preChatFormData || (Object.keys(preChatFormData).length === 0 && preChatFormData.constructor === Object)) { return <div className="p-4 text-sm text-slate-500">No pre-chat form data submitted.</div>; } return ( <div className="p-4 space-y-1.5"> <DetailItem label="Name" value={preChatFormData.name} /> <DetailItem label="E-mail" value={preChatFormData.email || '(no answer)'} isLink={!!preChatFormData.email && preChatFormData.email !== '(no answer)'} href={preChatFormData.email ? `mailto:${preChatFormData.email}` : undefined} /> </div> );});
const ArchivePostChatFormCardContent = React.memo(({ postChatFormData }) => { /* ... as before, ensure root has p-4 ... */  if (!postChatFormData || postChatFormData.length === 0) return <div className="p-4 text-sm text-slate-500">No post-chat form data.</div>; return ( <div className="p-4 space-y-2.5"> {postChatFormData.map((item, index) => ( <div key={index} className="text-sm"> <p className="text-slate-500 mb-0.5">{item.question}</p> <p className="text-slate-700 font-medium">{item.answer}</p> </div> ))} </div> );});
const ArchiveTechnologyCardContent = React.memo(({ technologyData }) => { /* ... as before, ensure root has p-4 ... */ if (!technologyData) return <div className="p-4 text-sm text-slate-500">No technology data.</div>; return ( <div className="p-4 space-y-1.5"> <DetailItem label="IP address" value={technologyData.ip} /> <DetailItem label="OS/Device" value={technologyData.osDevice} /> <DetailItem label="Browser" value={technologyData.browser} /> <div className="text-sm py-1"> <span className="text-slate-500">User agent:</span> <p className="text-slate-700 break-all text-xs leading-tight mt-0.5">{technologyData.userAgent || 'N/A'}</p> </div> </div> );});
const ArchiveWhatsAppBusinessCardContent = React.memo(({ whatsAppData }) => { /* ... as before, ensure root has p-4 ... */ return ( <div className="p-4 text-sm text-slate-500"> {whatsAppData?.number ? ( <DetailItem label="WhatsApp Number" value={whatsAppData.number} /> ) : ( "No WhatsApp Business information linked." )} </div> );});
const ArchiveHelpDeskTicketsCardContent = React.memo(({ ticketsData }) => { /* ... as before, ensure root has p-4 ... */  if (!ticketsData) return <div className="p-4 text-sm text-slate-500">No ticket information.</div>; return ( <div className="p-4 space-y-3"> <div> <h5 className="text-sm font-medium text-slate-700 mb-1.5">Recent tickets</h5> {ticketsData.recent && ticketsData.recent.length > 0 ? ( ticketsData.recent.map((ticket, index) => ( <a key={ticket.id || index} href={ticket.link || '#'} target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-600 hover:underline mb-0.5"> <TicketIcon className="w-4 h-4 inline-block mr-1.5 relative -top-px"/> [{ticket.status || 'Open'}] {ticket.subject} </a> )) ) : ( <p className="text-sm text-slate-500">No recent tickets.</p> )} </div> <div> <h5 className="text-sm font-medium text-slate-700 mb-1.5 mt-2">Archived tickets</h5> <a href={ticketsData.archiveLink || '#'} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline"> Search Archive </a> </div> </div> );});
const ArchiveActionsSectionContent = React.memo(({ item }) => { /* ... as before ... */ });

const EXPANDED_ARCHIVE_WIDTH_CLASS = 'w-[var(--spacing-details-sidebar-w)]';

const ArchiveChatDetailsSidebar = React.memo(({
  chatDetails, isCollapsed, onToggleCollapse, onClose
}) => {
  const headerTabsConfig = useMemo(() => [ /* ... as before ... */ ], []);

  const sectionsConfig = useMemo(() => {
    if (!chatDetails) return [];
    return [
      // For "Details" Tab - each is now a "flat card" (isCollapsible:false, defaultOpen:true means content always shows)
      // The SortableSectionItem will render the title, and the content component renders the card's body.
      { id: 'archiveGeneralInfo', title: 'General info', content: (props) => <ArchiveGeneralInfoCardContent generalInfo={props.item?.generalInfo} />, isDraggable: true, isCollapsible: false, defaultOpen: true, tab: 'archive_details', isFlat: false /* Explicitly card style */},
      { id: 'archiveChatInfo', title: 'Chat info', content: (props) => <ArchiveChatInfoCardContent chatInfo={props.item?.chatInfo} />, isDraggable: true, isCollapsible: false, defaultOpen: true, tab: 'archive_details', isFlat: false},
      { id: 'archivePreChatForm', title: 'Pre-chat form', content: (props) => <ArchivePreChatFormCardContent preChatFormData={props.item?.preChatFormData} />, isDraggable: true, isCollapsible: false, defaultOpen: true, tab: 'archive_details', isFlat: false},
      { id: 'archivePostChatForm', title: 'Post-chat form', content: (props) => <ArchivePostChatFormCardContent postChatFormData={props.item?.postChatFormData} />, isDraggable: true, isCollapsible: false, defaultOpen: true, tab: 'archive_details', isFlat: false},
      { id: 'archiveTechnology', title: 'Technology', content: (props) => <ArchiveTechnologyCardContent technologyData={props.item?.technologyData} />, isDraggable: true, isCollapsible: false, defaultOpen: true, tab: 'archive_details', isFlat: false},
      { id: 'archiveWhatsAppBusiness', title: 'WhatsApp Business', content: (props) => <ArchiveWhatsAppBusinessCardContent whatsAppData={props.item?.whatsAppData} />, isDraggable: true, isCollapsible: false, defaultOpen: true, tab: 'archive_details', isFlat: false},
      { id: 'archiveHelpDeskTickets', title: 'HelpDesk requester\'s tickets', content: (props) => <ArchiveHelpDeskTicketsCardContent ticketsData={props.item?.ticketsData} />, isDraggable: true, isCollapsible: false, defaultOpen: true, tab: 'archive_details', isFlat: false},

      // For "Actions" Tab - this can remain a simple content fill
      { id: 'archiveManagementActions', title: 'Manage Archive', content: (props) => <ArchiveActionsSectionContent item={props.item} />, isDraggable: false, isCollapsible: false, defaultOpen: true, tab: 'archive_actions', isFlat: true /* Actions tab might be flat */ }
    ];
  }, [chatDetails]);

  const renderArchiveCollapsedContent = useCallback(({ handleTabChange }) => { /* ... as before ... */ }, [headerTabsConfig, chatDetails]);

  // ... (handling for !chatDetails and return <DetailSidebar ...> as before)
   if (!chatDetails && !isCollapsed) {  return ( <div className={`${EXPANDED_ARCHIVE_WIDTH_CLASS} flex-shrink-0 border-l border-gray-200 bg-white flex flex-col`}> <div className="p-2 flex items-center justify-end border-b border-gray-200 h-[var(--height-page-section-header)] flex-shrink-0"> <button onClick={onClose} title="Close Details" className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full"> <XMarkIcon className="w-5 h-5" /> </button> </div> <div className="flex-1 flex items-center justify-center text-slate-500 p-4"> Select an archived chat to view details. </div> </div> ); }
   if (isCollapsed && !chatDetails) {  return ( <DetailSidebar selectedItem={null} onClose={onClose} isCollapsed={true} onToggleCollapse={onToggleCollapse} headerTabsConfig={headerTabsConfig} sectionsConfig={[]} expandedWidthClass={EXPANDED_ARCHIVE_WIDTH_CLASS} renderCollapsedContent={renderArchiveCollapsedContent} collapsedAvatarInitial="?" collapsedAvatarBgColor="bg-gray-400" /> ); }

  return (
    <DetailSidebar
      selectedItem={chatDetails}
      onClose={onClose}
      isCollapsed={isCollapsed}
      onToggleCollapse={onToggleCollapse}
      headerTabsConfig={headerTabsConfig}
      sectionsConfig={sectionsConfig}
      expandedWidthClass={EXPANDED_ARCHIVE_WIDTH_CLASS}
      renderCollapsedContent={renderArchiveCollapsedContent}
      collapsedAvatarInitial={chatDetails?.generalInfo?.avatarInitial || '?'}
      collapsedAvatarBgColor={chatDetails?.generalInfo?.avatarBg || 'bg-gray-400'}
    />
  );
});

export default ArchiveChatDetailsSidebar;