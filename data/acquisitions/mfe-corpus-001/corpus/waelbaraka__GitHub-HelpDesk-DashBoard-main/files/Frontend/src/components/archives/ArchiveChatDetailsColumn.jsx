// src/components/archives/ArchiveChatDetailsColumn.jsx
import React, { useState, useMemo } from 'react';
import {
    InformationCircleIcon,
    AdjustmentsHorizontalIcon,
    ClockIcon,
    MapPinIcon,
    ArrowTopRightOnSquareIcon,
    LinkIcon as UrlLinkIcon,
    HandThumbDownIcon,
    TicketIcon,
    XMarkIcon // For a potential close/clear button
} from '@heroicons/react/24/solid';

// Reusable component for a key-value pair line in the details
const DetailItem = ({ label, value, isLink = false, href = '#' }) => (
    <div className="flex justify-between items-start text-sm py-1.5"> {/* Increased py */}
        <span className="text-slate-500 whitespace-nowrap mr-3">{label}:</span> {/* Increased mr */}
        {isLink && value && value !== 'N/A' ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate ml-auto text-right break-all">
                {value}
            </a>
        ) : (
            <span className="text-slate-700 ml-auto text-right break-all">{value || 'N/A'}</span>
        )}
    </div>
);

// --- Archive Specific Content Sections (Flattened - no individual card borders/shadows) ---

const ArchiveGeneralInfoSection = ({ generalInfo }) => {
    if (!generalInfo) return <div className="p-4 text-sm text-slate-400">No general information.</div>;
    const name = generalInfo.name || 'Unknown Visitor';
    const email = generalInfo.email || '(no email)';
    const avatarInitial = generalInfo.avatarInitial || (name !== 'N/A' ? name.charAt(0).toUpperCase() : '?');
    const avatarBg = generalInfo.avatarBg || 'bg-slate-400';

    return (
        <div className="p-4">
            <div className="flex items-center mb-3">
                <div className={`w-10 h-10 ${avatarBg} rounded-full flex items-center justify-center text-white text-lg font-semibold mr-3 flex-shrink-0`}>
                    {avatarInitial}
                </div>
                <div>
                    <h4 className="text-base font-semibold text-slate-800">{name}</h4>
                    <p className="text-sm text-slate-500">{email}</p>
                </div>
            </div>
            <div className="space-y-1 text-sm mb-4">
                {generalInfo.localTime && ( <div className="flex items-center text-slate-600"> <ClockIcon className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" /> {generalInfo.localTime} </div>)}
                {generalInfo.location && ( <div className="flex items-center text-slate-600"> <MapPinIcon className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" /> {generalInfo.location} </div>)}
            </div>
            <div className="flex items-center space-x-2">
                <button className="flex-1 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-md font-medium transition-colors">
                    View all chats
                </button>
                <button className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-md transition-colors">
                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

const ArchiveChatInfoSection = ({ chatInfo }) => {
    if (!chatInfo) return <div className="p-4 text-sm text-slate-400">No chat information.</div>;
    return (
        <div className="p-4 space-y-1.5">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Chat Info</h3>
            <DetailItem label="Chat ID" value={chatInfo.id} />
            <DetailItem label="Chatting time" value={chatInfo.chattingTime} />
            <DetailItem label="Started on" value={chatInfo.startedOn} isLink href={chatInfo.startedOnLink} />
            <DetailItem label="Came from" value={chatInfo.cameFrom} isLink href={chatInfo.cameFromLink || '#'} />
            <div className="flex justify-between items-center text-sm py-1">
                <span className="text-slate-500">Groups:</span>
                <div className="flex items-center ml-2 flex-wrap justify-end">
                </div>
            </div>
        </div>
    );
};

const ArchivePreChatFormSection = ({ preChatFormData }) => {
    if (!preChatFormData || (Object.keys(preChatFormData).length === 0 && preChatFormData.constructor === Object)) return <div className="p-4 text-sm text-slate-500">No pre-chat form data.</div>;
    return (
        <div className="p-4 space-y-1.5">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Pre-chat Form</h3>
            <DetailItem label="Name" value={preChatFormData.name} />
            <DetailItem label="E-mail" value={preChatFormData.email || '(no answer)'} isLink={!!preChatFormData.email && preChatFormData.email !== '(no answer)'} href={preChatFormData.email ? `mailto:${preChatFormData.email}` : undefined} />
        </div>
    );
};
// Define ArchivePostChatFormSection, ArchiveTechnologySection, ArchiveWhatsAppBusinessSection, ArchiveHelpDeskTicketsSection similarly,
// making sure their root element has `p-4` and they have a title `<h3>` like ArchiveChatInfoSection if desired.

const ArchiveActionsContent = ({ chatDetails, onUnarchive, onDelete }) => { // Renamed item to chatDetails for clarity
    return (
        <div className="space-y-3 p-4 text-sm">
            <button onClick={() => onUnarchive(chatDetails)} className="w-full flex items-center justify-center p-2.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 border border-slate-300 transition-colors font-medium">
                Unarchive Chat
            </button>
            <button onClick={() => onDelete(chatDetails)} className="w-full flex items-center justify-center p-2.5 bg-red-50 hover:bg-red-100 rounded-md text-red-700 border border-red-200 transition-colors font-medium">
                Delete Permanently
            </button>
        </div>
    );
};


const ArchiveChatDetailsColumn = React.memo(({ chatDetails, onClose, className }) => {
    const [activeTab, setActiveTab] = useState('archive_details');

    const tabs = useMemo(() => [
        { id: 'archive_details', label: 'Details', icon: <InformationCircleIcon className="w-5 h-5 mr-1.5" /> },
        { id: 'archive_actions', label: 'Actions', icon: <AdjustmentsHorizontalIcon className="w-5 h-5 mr-1.5" /> },
    ], []);

    const handleUnarchive = (details) => console.log("Unarchive from column:", details?.chatInfo?.id);
    const handleDelete = (details) => console.log("Delete from column:", details?.chatInfo?.id);

    if (!chatDetails) {
        return (
            <div className={`${className} flex flex-col border-l border-slate-200 bg-white`}>
                <div className="p-4 flex items-center justify-between border-b border-slate-200 h-[60px] flex-shrink-0">
                    <h2 className="text-lg font-semibold text-slate-800">Details</h2>
                </div>
                <div className="flex-1 flex items-center justify-center p-6 text-slate-500">
                    Select an archived chat to view its details.
                </div>
            </div>
        );
    }

    return (
        <div className={`${className} flex flex-col border-l border-slate-200 bg-white`}>
            {/* Column Header with Tabs */}
            <div className="flex-shrink-0 border-b border-slate-200">
                <div className="p-4 flex items-center justify-between h-[60px]">
                    <h2 className="text-lg font-semibold text-slate-800">
                        {/* Display contact name or generic "Details" */}
                        {chatDetails.generalInfo?.name || 'Archived Chat Details'}
                    </h2>
                    {onClose && ( // Show close button if handler is provided
                        <button onClick={onClose} title="Hide Details" className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-full">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    )}
                </div>
                <div className="px-2 flex border-b border-slate-200">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-3 py-2.5 text-sm font-medium focus:outline-none transition-colors duration-150
                                ${activeTab === tab.id
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable Content Area for Tabs */}
            <div className="flex-grow overflow-y-auto scrollbar-thin">
                {activeTab === 'archive_details' && (
                    <div className="divide-y divide-slate-200"> {/* Divides the "flattened cards" */}
                        <ArchiveGeneralInfoSection generalInfo={chatDetails.generalInfo} />
                        <ArchiveChatInfoSection chatInfo={chatDetails.chatInfo} />
                        <ArchivePreChatFormSection preChatFormData={chatDetails.preChatFormData} />
                        {/* Add other sections here: PostChat, Technology, WhatsApp, Tickets */}
                        {/* Example:
                        <ArchivePostChatFormSection postChatFormData={chatDetails.postChatFormData} />
                        <ArchiveTechnologySection technologyData={chatDetails.technologyData} />
                        <ArchiveWhatsAppBusinessSection whatsAppData={chatDetails.whatsAppData} />
                        <ArchiveHelpDeskTicketsSection ticketsData={chatDetails.ticketsData} />
                        */}
                    </div>
                )}
                {activeTab === 'archive_actions' && (
                    <ArchiveActionsContent
                        chatDetails={chatDetails}
                        onUnarchive={handleUnarchive}
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </div>
    );
});

export default ArchiveChatDetailsColumn;