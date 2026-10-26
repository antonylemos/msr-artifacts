// src/pages/HelpDeskPage.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  PlusIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon,
  EllipsisHorizontalIcon, ArrowLeftIcon // ArrowLeftIcon added for detail view back button
} from '@heroicons/react/24/solid';
import PageInternalNav from '../components/PageInternalNav';
// import TicketDetailView from '../components/TicketDetailView'; // Will be defined locally for memoization

// --- Dummy Data and StatusBadge Component ---
// Memoize StatusBadge as it's a presentational component
const StatusBadge = React.memo(({ status }) => {
  let bgColor, textColor;
  switch (status.toLowerCase()) {
    case 'open': bgColor = 'bg-green-100'; textColor = 'text-green-700'; break; // Light green
    case 'on hold': bgColor = 'bg-yellow-100'; textColor = 'text-yellow-700'; break; // Light yellow
    case 'pending': bgColor = 'bg-blue-100'; textColor = 'text-blue-700'; break; // Light blue
    case 'closed':
    case 'solved':
      bgColor = 'bg-slate-100'; textColor = 'text-slate-600'; break; // Light slate
    default: bgColor = 'bg-slate-100'; textColor = 'text-slate-700';
  }
  return <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>{status}</span>;
});

// Dummy data remains outside to avoid recreation on re-renders
const initialTickets = [
  { id: 1, ticketId: '040QO01', requester: { name: 'New Name', email: 'pytsud@gmila.com', avatarInitials: 'NN', avatarColor: 'bg-green-500' }, subject: 'Login issue with new SSO integration', agent: 'Waelomeradam9', status: 'On hold', lastMessage: 'about 4 hours ago' },
  { id: 2, ticketId: '040QO04', requester: { name: 'HelpDesk Onboarding', email: 'support@helpdesk.com', avatarInitials: 'H', avatarColor: 'bg-purple-500' }, subject: 'Step 1: 👋 Welcome to HelpDesk! See the next steps', agent: 'unassigned', status: 'Open', lastMessage: 'yesterday' },
  { id: 3, ticketId: '040QO05', requester: { name: 'Jane Doe', email: 'jane.doe@example.com', avatarInitials: 'JD', avatarColor: 'bg-blue-500' }, subject: 'Unable to reset password via email link', agent: 'Sarah Miller', status: 'Open', lastMessage: '2 days ago' },
  { id: 4, ticketId: '040QO06', requester: { name: 'Tech Solutions Inc.', email: 'contact@techsolutions.com', avatarInitials: 'TS', avatarColor: 'bg-red-500' }, subject: 'API integration timeout errors', agent: 'John Smith', status: 'Pending', lastMessage: '3 hours ago' },
];

// Re-using TicketDetailView here to apply memoization
import TicketDetailView from '../components/TicketDetailView';


const HelpDeskPage = React.memo(({
  pageLabel = "HelpDesk",
  navItems,
  activeSubItemId,
  onSubItemClick,
  navFooterButton,
  openNestedSubmenus,
  onToggleNestedSubmenu,
}) => {
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulate data fetching
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setTickets(initialTickets);
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Memoize handlers using useCallback
  const handleTicketClick = useCallback((ticketId) => setSelectedTicketId(ticketId), []);
  const handleBackToList = useCallback(() => setSelectedTicketId(null), []);
  const handlePrevTicket = useCallback(() => {
    const currentTicketIndex = tickets.findIndex(t => t.id === selectedTicketId);
    if (currentTicketIndex > 0) setSelectedTicketId(tickets[currentTicketIndex - 1].id);
  }, [selectedTicketId, tickets]);

  const handleNextTicket = useCallback(() => {
    const currentTicketIndex = tickets.findIndex(t => t.id === selectedTicketId);
    if (currentTicketIndex < tickets.length - 1) setSelectedTicketId(tickets[currentTicketIndex + 1].id);
  }, [selectedTicketId, tickets]);

  const handleSearchChange = useCallback((e) => setSearchTerm(e.target.value), []);

  // Memoize filtered tickets to avoid re-computation on every render
  const filteredTickets = useMemo(() => {
    const searchFiltered = tickets.filter(ticket => {
      const matchesSearch = ticket.requester.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.status.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Apply internal nav filter
    switch (activeSubItemId) {
      case 'helpdesk/all': return searchFiltered;
      case 'helpdesk/tohandle': return searchFiltered.filter(appt => ['open', 'pending'].includes(appt.status.toLowerCase()));
      case 'helpdesk/myopen': return searchFiltered.filter(appt => appt.agent === 'Waelomeradam9' && appt.status.toLowerCase() === 'open');
      case 'helpdesk/undelivered': return searchFiltered.filter(appt => appt.id === 1); // Dummy filter
      case 'helpdesk/mylast7days': return searchFiltered.filter(appt => appt.id === 3); // Dummy filter
      case 'helpdesk/open': return searchFiltered.filter(appt => appt.status.toLowerCase() === 'open');
      case 'helpdesk/pending': return searchFiltered.filter(appt => appt.status.toLowerCase() === 'pending');
      case 'helpdesk/onhold': return searchFiltered.filter(appt => appt.status.toLowerCase() === 'on hold');
      case 'helpdesk/solved':
      case 'helpdesk/closed': return searchFiltered.filter(appt => ['solved', 'closed'].includes(appt.status.toLowerCase()));
      default: return searchFiltered;
    }
  }, [tickets, searchTerm, activeSubItemId]);

  const currentTicketIndex = useMemo(() =>
    filteredTickets.findIndex(t => t.id === selectedTicketId),
    [filteredTickets, selectedTicketId]
  );


  if (selectedTicketId) {
    const selectedTicketData = tickets.find(t => t.id === selectedTicketId);
    return (
      <TicketDetailView
        ticket={selectedTicketData}
        onBackToList={handleBackToList}
        onPrevTicket={handlePrevTicket}
        onNextTicket={handleNextTicket}
        isPrevDisabled={currentTicketIndex <= 0}
        isNextDisabled={currentTicketIndex >= filteredTickets.length - 1}
      />
    );
  }

  const currentViewLabelForList = navItems?.find(item => item.id === activeSubItemId && !item.isHeading)?.label || 'All Tickets';
  const pageSectionHeaderHeightClass = 'h-[60px]';
  const sectionBorderClass = 'border-b border-slate-200';

  return (
    <div className="flex flex-1 overflow-hidden bg-slate-100"> {/* Page Background */}

      {/* Pane 1: Left Internal Navigation Column */}
      <div className="flex flex-col w-1/5 bg-white border-r border-slate-200">
        {/* Block 1: "HelpDesk" Title */}
        <div className={`flex items-center px-4 ${sectionBorderClass} ${pageSectionHeaderHeightClass}`}>
          <h1 className="text-xl font-semibold text-slate-800">{pageLabel}</h1>
        </div>

        {/* Block 2: "Tickets" Tab, New Button, and Search */}
        <div className={`p-3 space-y-3 ${sectionBorderClass}`}>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1 px-1">
              Tickets
            </span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium flex items-center transition-colors">
              <PlusIcon className="w-4 h-4 mr-1.5" />
              New ticket
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="search"
              placeholder="Search in all tickets..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-white text-slate-700 text-sm rounded-md py-2 pl-9 pr-3 border border-slate-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-slate-400"
            />
          </div>
        </div>

        <PageInternalNav
          navItems={navItems}
          activeSubItemId={activeSubItemId}
          onSubItemClick={onSubItemClick}
          openNestedSubmenus={openNestedSubmenus}
          onToggleNestedSubmenu={onToggleNestedSubmenu}
        />
        {navFooterButton && (
          <div className="p-3 border-t border-slate-200 mt-auto">
            <button
              onClick={navFooterButton.action}
              className="w-full text-sm text-center py-2.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 font-medium transition-colors"
            >
              {navFooterButton.text}
            </button>
          </div>
        )}
      </div>

      {/* Pane 2: Right Content Area */}
      <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden">
        {/* Block 1 (Pane 2): "..." icon, aligns with "HelpDesk" title */}
        <div className={`flex items-center justify-end px-6 ${sectionBorderClass} ${pageSectionHeaderHeightClass} bg-white`}>
          <button className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
            <EllipsisHorizontalIcon className="w-6 h-6"/>
          </button>
        </div>

        {/* Scrollable Content of Right Pane */}
        <div className="flex-grow p-6 overflow-y-auto">
          {/* Block 2 (Pane 2): View title and "Add filter" button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">
              {currentViewLabelForList}
            </h2>
            <button className="border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 px-3.5 py-1.5 rounded-md text-sm font-medium flex items-center transition-colors">
              <AdjustmentsHorizontalIcon className="w-5 h-5 mr-1.5 text-slate-500" />
              Add filter
            </button>
          </div>

          {/* Block 3 (Pane 2): Ticket count */}
          <div className="text-sm text-slate-500 mb-3">
            {loading ? 'Loading...' : `${filteredTickets.length} tickets`}
          </div>

          {/* Block 4 (Pane 2): Ticket Table (Flattened) */}
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="grid grid-cols-7 gap-4">
                    <div className="h-8 bg-slate-100 rounded col-span-1"></div>
                    <div className="h-8 bg-slate-100 rounded col-span-2"></div>
                    <div className="h-8 bg-slate-100 rounded col-span-2"></div>
                    <div className="h-8 bg-slate-100 rounded col-span-1"></div>
                    <div className="h-8 bg-slate-100 rounded col-span-1"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // FIX: Removed card appearance from table container
            <div className="overflow-hidden"> {/* Container for the table without card styles */}
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50"> {/* Table header keeps its background */}
                  <tr>
                    <th className="w-10 px-4 py-3 text-left"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Requester</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Agent</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Message <span className="inline-block ml-1">↓</span></th>
                    <th className="relative px-4 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200"> {/* FIX: tbody has bg-white for rows, keeps dividers */}
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => handleTicketClick(ticket.id)}>
                        <td className="px-4 py-3"><input type="checkbox" onClick={(e) => e.stopPropagation()} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 ${ticket.requester.avatarColor} rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 flex-shrink-0`}>{ticket.requester.avatarInitials}</div>
                            <div>
                              <div className="text-sm font-medium text-slate-700">{ticket.requester.name}</div>
                              <div className="text-xs text-slate-500">{ticket.requester.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700 truncate max-w-xs" title={ticket.subject}>{ticket.subject}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{ticket.agent}</td>
                        <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={ticket.status} /></td>
                        <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">{ticket.lastMessage}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={(e) => {e.stopPropagation(); console.log("Actions for", ticket.id)}} className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
                            <EllipsisHorizontalIcon className="w-5 h-5"/>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-4 py-6 text-center text-sm text-slate-500">
                        {searchTerm ? `No tickets found for "${searchTerm}" in this view.` : "No tickets in this view."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default HelpDeskPage;