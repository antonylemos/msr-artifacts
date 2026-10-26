// src/components/TicketDetailView.jsx
import React, { useState } from 'react';
import {
    ArrowLeftIcon, PencilIcon, BoltIcon, ChatBubbleBottomCenterTextIcon, TrashIcon, InformationCircleIcon,
    ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, LinkIcon, PhotoIcon, FaceSmileIcon, AtSymbolIcon, PaperClipIcon, HashtagIcon,
    PlusIcon, UserCircleIcon, LightBulbIcon, XMarkIcon, ClipboardDocumentIcon, EllipsisHorizontalIcon
} from '@heroicons/react/24/outline'; // Using outline for most icons for consistency

// --- Reusable Dropdown Component ---
const SelectDropdown = ({ label, options, value, onChange, id, srLabel, disabled = false }) => (
    <div className="w-full">
        {label && <label htmlFor={id} className="block text-xs font-medium text-slate-600 mb-1">{label}</label>} {/* Secondary Text */}
        <select 
            id={id} 
            value={value} 
            onChange={onChange} 
            disabled={disabled}
            className="w-full bg-white border border-slate-300 rounded-md shadow-sm pl-3 pr-8 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed" /* Input Styling */
        >
            {srLabel && <option value="" disabled>{srLabel}</option>}
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);

// --- Reusable Collapsible Panel for Details Sidebar ---
const CollapsiblePanel = ({ title, children, defaultOpen = true, titleIcon }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-slate-200"> {/* Border */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-3.5 px-4 text-left hover:bg-slate-100 transition-colors" /* Hover BG */
            >
                <div className="flex items-center">
                    {titleIcon && React.cloneElement(titleIcon, { className: "w-5 h-5 mr-2 text-slate-500"})} {/* Secondary Text for icon */}
                    <span className="text-sm font-medium text-slate-700">{title}</span> {/* Primary Text */}
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-slate-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} /> {/* Secondary Text */}
            </button>
            {isOpen && <div className="p-4 pt-2 pb-4 text-sm">{children}</div>}
        </div>
    );
};

// --- Avatar Component ---
const Avatar = ({ initials, bgColorClass = 'bg-slate-500', email, name, size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-7 h-7 text-xs',
        md: 'w-8 h-8 text-sm',
        lg: 'w-10 h-10 text-base'
    };
    return (
    <div className="flex items-center">
        <div className={`flex-shrink-0 ${sizeClasses[size]} ${bgColorClass} rounded-full flex items-center justify-center text-white font-semibold mr-3`}>
            {initials}
        </div>
        <div>
            {name && <div className={`font-medium text-slate-700 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>{name}</div>} {/* Primary Text */}
            {email && <div className={`text-slate-500 ${size === 'sm' ? 'text-xs' : 'text-xs'}`}>{email}</div>} {/* Secondary Text */}
        </div>
    </div>
)};


const TicketDetailView = ({ ticket, onBackToList, onPrevTicket, onNextTicket, isPrevDisabled, isNextDisabled }) => {
    if (!ticket) return <div className="p-6 text-slate-500">Loading ticket details or ticket not found...</div>;

    const [message, setMessage] = useState('');
    const [ticketStatusState, setTicketStatusState] = useState(ticket.status || 'Pending');
    const [priorityState, setPriorityState] = useState(ticket.priority || 'Medium');
    const [showSimilarTicketsBox, setShowSimilarTicketsBox] = useState(true);
    const [isPrivateReply, setIsPrivateReply] = useState(false);


    const handleSubmitMessage = () => { 
        console.log("Submitting message:", message, "Status:", ticketStatusState, "Private:", isPrivateReply);
        setMessage(''); 
    };

    // Define avatar colors, can be moved to a config file or context
    const avatarColors = {
        red: 'bg-red-500',
        purple: 'bg-purple-500',
        green: 'bg-green-500',
        blue: 'bg-blue-500',
        yellow: 'bg-yellow-500',
        indigo: 'bg-indigo-500',
    };


    return (
        <div className="flex flex-1 bg-slate-100 overflow-hidden"> {/* Page BG */}

            {/* Column 1: Main Ticket Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white sticky top-0 z-20"> {/* Card BG, Border */}
                    <div className="flex items-center min-w-0"> {/* min-w-0 for truncation */}
                        <button onClick={onBackToList} className="p-1.5 mr-3 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"><ArrowLeftIcon className="w-5 h-5" /></button>
                        <h1 className="text-base font-semibold text-slate-800 truncate mr-2" title={ticket.subject}>
                            <span className="text-slate-500 mr-1.5">#{ticket.ticketId}:</span>{ticket.subject}
                        </h1>
                        <button className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"><PencilIcon className="w-4 h-4" /></button>
                    </div>
                    <div className="flex items-center space-x-1 flex-shrink-0">
                        <button onClick={onPrevTicket} disabled={isPrevDisabled} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronLeftIcon className="w-5 h-5" /></button>
                        <button onClick={onNextTicket} disabled={isNextDisabled} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronRightIcon className="w-5 h-5" /></button>
                    </div>
                </div>
                {/* Toolbar below header */}
                <div className="flex items-center px-4 py-2 border-b border-slate-200 bg-white z-10 sticky top-[61px]"> {/* Adjust top value based on actual header height */}
                    <button title="Quick Actions" className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"><BoltIcon className="w-5 h-5" /></button>
                    <button title="Add Internal Note" className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded ml-1 transition-colors"><ChatBubbleBottomCenterTextIcon className="w-5 h-5" /></button>
                    <button title="Merge Ticket" className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded ml-1 transition-colors"><LinkIcon className="w-5 h-5" /></button>
                    <button title="Ticket Details" className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded ml-1 transition-colors"><InformationCircleIcon className="w-5 h-5" /></button>
                    <div className="flex-grow"></div> {/* Spacer */}
                    <button title="More Actions" className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded ml-1 transition-colors"><EllipsisHorizontalIcon className="w-5 h-5" /></button>
                    <button title="Delete Ticket" className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded ml-1 transition-colors"><TrashIcon className="w-5 h-5" /></button>
                </div>
                
                {/* Message/Activity Feed */}
                <div className="flex-grow p-6 space-y-6 bg-white border-b border-slate-200"> {/* Card BG for messages */}
                     <div className="flex">
                        <div className={`w-8 h-8 ${ticket.requester.avatarColor} rounded-full flex items-center justify-center text-white text-sm font-semibold mr-4 flex-shrink-0`}>{ticket.requester.avatarInitials}</div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-slate-800">{ticket.requester.name}</span>
                                <span className="text-xs text-slate-400">May 29, 2025, 2:30 PM</span>
                            </div>
                            <div className="prose prose-sm max-w-none text-slate-700 bg-slate-50 p-3 rounded-md"> {/* Prose for rich text, light BG for message bubble */}
                                <p className="mb-2">Subject: {ticket.subject}</p>
                                <ol className="list-decimal list-inside space-y-1 my-3">
                                    <li>Create an address.</li>
                                    <li>Go to your current inbox settings.</li>
                                    <li>Set up forwarding to this address.</li>
                                    <li>Done! ✅</li>
                                </ol>
                                <div className="my-4 p-2 border border-slate-200 rounded-md overflow-hidden bg-white">
                                    <img src="https://user-images.githubusercontent.com/12680289/222909609-0b702211-0401-4162-b8e3-587ba59b1f03.png" alt="Ticket related visual" className="max-w-sm mx-auto h-auto rounded"/>
                                </div>
                                <p className="mb-2">Google Workspace? Microsoft 365? Microsoft Outlook? Other?<br/>No matter your email provider, all the instructions are in our <a href="#" className="text-blue-600 hover:underline">help center</a>.</p>
                                <p>Any questions? Just write them down and click "Submit" 😉</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Reply/Message Input Area */}
                <div className="px-4 pt-4 pb-3 border-t border-slate-200 bg-slate-50 sticky bottom-0 z-10"> {/* Reply Area BG */}
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." rows="4" className="w-full p-3 border border-slate-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y text-slate-700 placeholder-slate-400"></textarea>
                    <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center space-x-1">
                            {/* Replace UserCircleIcon with actual formatting icons */}
                            <button title="Bold" className="p-1.5 text-slate-500 hover:bg-slate-200 rounded transition-colors"><UserCircleIcon className="w-5 h-5" /></button>
                            <button title="Italic" className="p-1.5 text-slate-500 hover:bg-slate-200 rounded transition-colors"><UserCircleIcon className="w-5 h-5" /></button>
                            <button title="Attach file" className="p-1.5 text-slate-500 hover:bg-slate-200 rounded transition-colors"><PaperClipIcon className="w-5 h-5"/></button>
                            <button title="Emoji" className="p-1.5 text-slate-500 hover:bg-slate-200 rounded transition-colors"><FaceSmileIcon className="w-5 h-5"/></button>
                            <button title="Mention" className="p-1.5 text-slate-500 hover:bg-slate-200 rounded transition-colors"><AtSymbolIcon className="w-5 h-5"/></button>
                        </div>
                        <div className="flex items-center space-x-3">
                            <label htmlFor="privateToggle" className="flex items-center cursor-pointer text-sm text-slate-600">
                                <div className="relative">
                                    <input type="checkbox" id="privateToggle" className="sr-only peer" checked={isPrivateReply} onChange={() => setIsPrivateReply(!isPrivateReply)} />
                                    <div className="block bg-slate-300 peer-checked:bg-yellow-500 w-10 h-5 rounded-full transition-colors"></div> {/* Yellow for private */}
                                    <div className="dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full"></div>
                                </div>
                                <span className="ml-2">Private reply</span>
                            </label>
                            <SelectDropdown 
                                id="ticketStatusReply" 
                                value={ticketStatusState} 
                                onChange={(e) => setTicketStatusState(e.target.value)} 
                                options={[
                                    { value: 'Open', label: 'Open' },
                                    { value: 'Pending', label: 'Pending' },
                                    { value: 'On hold', label: 'On hold' },
                                    { value: 'Solved', label: 'Solved' },
                                    { value: 'Closed', label: 'Closed' },
                                ]}
                                srLabel="Set status"
                            />
                            <button onClick={handleSubmitMessage} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors">Submit</button> {/* Primary Button */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Column 2: Details Sidebar (Scrollable) */}
            <div className="w-80 flex-shrink-0 border-l border-slate-200 bg-white overflow-y-auto scrollbar-thin"> {/* Sidebar BG & Border */}
                <div className="flex justify-between items-center p-4 py-3.5 border-b border-slate-200 sticky top-0 bg-white z-10">
                    <h2 className="text-base font-semibold text-slate-800">Details</h2> {/* Primary Text */}
                </div>

                <CollapsiblePanel title="Ticket info" defaultOpen={true}>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between"><span className="text-slate-500 w-24 inline-block">Ticket ID:</span> <span className="text-slate-700 font-medium flex items-center">{ticket.ticketId || 'N/A'} <ClipboardDocumentIcon title="Copy ID" className="w-3.5 h-3.5 inline-block ml-1.5 text-slate-400 hover:text-blue-600 cursor-pointer"/></span></div>
                        <div className="flex justify-between"><span className="text-slate-500 w-24 inline-block">Created:</span> <span className="text-slate-700">{ticket.createdDate || 'May 29, 2025'}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 w-24 inline-block">Last message:</span> <span className="text-slate-700">{ticket.lastMessageDate || 'May 29, 2025'}</span></div>
                        <SelectDropdown label="Status:" id="detailsStatus" value={ticketStatusState} onChange={e => setTicketStatusState(e.target.value)} options={[{value: "Open", label: "Open"}, {value: "Pending", label: "Pending"}, { value: 'On hold', label: 'On hold' }, {value: "Solved", label: "Solved"}, {value: "Closed", label: "Closed"}]} />
                        <div className="flex justify-between items-center"><span className="text-slate-500 w-24 inline-block">Rating:</span> <span className="text-slate-700">Not rated <InformationCircleIcon className="w-4 h-4 inline-block ml-1 text-slate-400"/></span></div>
                        <SelectDropdown label="Priority:" id="detailsPriority" value={priorityState} onChange={e => setPriorityState(e.target.value)} options={[{value: "Low", label: "Low"}, {value: "Medium", label: "Medium"}, {value: "High", label: "High"}]} />
                        <div className="flex justify-between"><span className="text-slate-500 w-24 inline-block">Source:</span> <span className="text-slate-700">{ticket.source || 'API'}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 w-24 inline-block">Language:</span> <span className="text-slate-700">{ticket.language || 'English'} <InformationCircleIcon className="w-4 h-4 inline-block ml-1 text-slate-400"/></span></div>
                    </div>
                </CollapsiblePanel>

                <CollapsiblePanel title="Tags">
                     <div className="flex items-center flex-wrap gap-2 mb-3">
                        <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
                            <LightBulbIcon className="w-3.5 h-3.5 mr-1.5 text-purple-600"/>
                            AI + support
                        </span>
                        {/* Add more tags here if available */}
                    </div>
                    <button className="text-sm text-blue-600 hover:underline flex items-center font-medium">
                        <PlusIcon className="w-4 h-4 mr-1"/> Add tag
                    </button>
                </CollapsiblePanel>

                <CollapsiblePanel title="Responsibility" defaultOpen={true}>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-medium text-slate-500">Team</label>
                                <button className="text-xs text-blue-600 hover:underline">Change</button>
                            </div>
                            <Avatar initials="SH" name="Support Heroes" email="team@example.com" bgColorClass={avatarColors.red} size="sm"/>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-medium text-slate-500">Agent</label>
                                <div>
                                    <button className="text-xs text-blue-600 hover:underline mr-2">Unassign</button>
                                    <button className="text-xs text-blue-600 hover:underline">Change</button>
                                </div>
                            </div>
                            <Avatar initials={ticket.agent !== 'unassigned' ? ticket.agent.substring(0,1).toUpperCase() : 'U'} name={ticket.agent} email={`${ticket.agent?.toLowerCase().replace(' ','')}@example.com`} bgColorClass={avatarColors.purple} size="sm"/>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-medium text-slate-500">Followers (0)</label>
                                <div>
                                    <button className="text-xs text-blue-600 hover:underline mr-2">Follow</button>
                                    <button className="text-xs text-blue-600 hover:underline">Edit</button>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500">No followers assigned to this ticket.</p>
                        </div>
                    </div>
                </CollapsiblePanel>

                <CollapsiblePanel title="Requester" defaultOpen={true}>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-medium text-slate-500">Details</label>
                            <button className="text-xs text-blue-600 hover:underline">Change</button>
                        </div>
                        <div className="flex items-center">
                             <Avatar initials={ticket.requester.avatarInitials} name={ticket.requester.name} email={ticket.requester.email} bgColorClass={ticket.requester.avatarColor || avatarColors.green} size="sm"/>
                            <button title="Copy email" className="ml-auto p-1.5 text-slate-400 hover:text-blue-600 rounded-full hover:bg-slate-100">
                                <ClipboardDocumentIcon className="w-4 h-4"/>
                            </button>
                        </div>
                        <button className="mt-3 text-sm text-blue-600 hover:underline flex items-center font-medium">
                            <PlusIcon className="w-4 h-4 mr-1"/> Add more people
                        </button>
                    </div>
                </CollapsiblePanel>
                
                {showSimilarTicketsBox && (
                    <CollapsiblePanel title="Similar tickets" titleIcon={<LightBulbIcon />} defaultOpen={true}>
                        <div className="bg-purple-50 border border-purple-200 p-3 rounded-md relative"> {/* AI Suggestion Colors */}
                            <button onClick={() => setShowSimilarTicketsBox(false)} className="absolute top-1.5 right-1.5 p-0.5 text-purple-500 hover:bg-purple-100 rounded-full">
                                <XMarkIcon className="w-4 h-4"/>
                            </button>
                            <p className="text-sm text-purple-700 mb-2">
                                Use Text Copilot to find tickets like the one you're working on and apply tried-and-true solutions to get things sorted quickly.
                            </p>
                            <button className="text-sm text-blue-600 font-medium hover:underline">
                                Show similar tickets
                            </button>
                        </div>
                    </CollapsiblePanel>
                )}
                 <CollapsiblePanel title="Custom fields">
                    <div className="text-center text-sm text-slate-500 py-4">
                        <p>No custom fields yet.</p>
                        <p className="mt-1">Add more useful details to your tickets.</p>
                        <button className="mt-3 text-blue-600 hover:underline font-medium">Create custom field</button>
                    </div>
                </CollapsiblePanel>


                <CollapsiblePanel title="Requester's tickets" defaultOpen={false}>
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="text-sm font-medium text-slate-700">Recent tickets</h4>
                                <button className="text-xs text-blue-600 hover:underline">Merge</button>
                            </div>
                            <p className="text-xs text-slate-500">No recent requester's tickets</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-slate-700 mb-1">Archived tickets</h4>
                            <p className="text-xs text-slate-500">
                                <a href="#" className="text-blue-600 hover:underline">Search Archive</a> to view this requester's archived tickets.
                            </p>
                        </div>
                    </div>
                </CollapsiblePanel>
            </div>
        </div>
    );
};

export default TicketDetailView;