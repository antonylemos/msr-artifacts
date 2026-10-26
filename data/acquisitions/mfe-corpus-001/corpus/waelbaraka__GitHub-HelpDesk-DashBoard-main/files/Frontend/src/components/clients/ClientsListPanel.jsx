// src/components/clients/ClientsListPanel.jsx
import React, { useCallback } from 'react';
import {
  MagnifyingGlassIcon, PlusIcon, AdjustmentsHorizontalIcon,
  ChevronDownIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon
} from '@heroicons/react/24/solid';
import ClientTableRow from './ClientTableRow'; // Import the table row component

const ClientsListPanel = React.memo(({
  clients,
  loading,
  searchTerm,
  onSearchChange,
  selectedClient,
  onSelectClient,
  onAssignClient,
  activeTab,
  onTabChange,
  tabs,
  onToggleDetailsSidebar, // New prop for toggling sidebar
  isDetailsSidebarOpen // New prop to know current sidebar state
}) => {
  return (
    <div className={`flex-shrink-0 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out`}>
      {/* Header (Engage -> Clients) */}
      <div className="p-4 flex items-center justify-between border-b border-slate-200 h-[60px] flex-shrink-0">
        <h1 className="text-xl font-semibold text-gray-800">Engage <span className="text-gray-400 font-normal ml-2">/ Clients</span></h1>
        <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md">
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs for Filtering */}
      <div className="px-3 py-2 flex flex-wrap gap-x-3 gap-y-1 border-b border-slate-200 text-sm">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-2 transition-all duration-150 relative ${
              activeTab === tab.id
                ? 'text-blue-600 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600'
                : 'text-gray-700 hover:text-gray-800'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Search and Filters Bar */}
      <div className="p-3 border-b border-slate-200 flex-shrink-0">
        <div className="relative mb-2.5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="search"
            value={searchTerm}
            onChange={onSearchChange}
            placeholder="Search clients..."
            className="w-full bg-gray-50 text-gray-700 text-sm rounded-md py-2 pl-9 pr-3 border border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-slate-400"
          />
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{loading ? 'Loading...' : `${clients.length} clients shown`}</span>
          <div className="relative">
            <select className="bg-transparent hover:text-gray-700 border-none text-xs focus:ring-0 focus:outline-none appearance-none pr-5 cursor-pointer">
              <option>Last Active (Desc)</option>
              <option>Name (A-Z)</option>
              <option>Next Appt. (Asc)</option>
            </select>
            <ChevronDownIcon className="w-3.5 h-3.5 text-gray-500 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        {loading ? (
          <div className="animate-pulse p-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : clients.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-10 px-4 py-3 text-left"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Next Appointment</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Bookings</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider"><span className="sr-only">Menu</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map(client => (
                <ClientTableRow
                  key={client.id}
                  client={client}
                  isSelected={selectedClient?.id === client.id}
                  onSelect={onSelectClient}
                  onAssignClient={onAssignClient}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-6 text-sm text-center text-gray-500">
            {searchTerm ? `No results for "${searchTerm}"` : "No clients found in this view."}
          </p>
        )}
      </div>

      {/* Footer (Add New Client Button and Details Sidebar Toggle) */}
      <div className="p-3 border-t border-slate-200 flex-shrink-0 flex items-center justify-between">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors mr-2">
          <PlusIcon className="w-4 h-4 mr-1.5" />
          Add new client
        </button>
        {/* Toggle button for the details sidebar */}
        <button onClick={onToggleDetailsSidebar} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full flex-shrink-0">
            {isDetailsSidebarOpen ? (
                <ArrowsPointingInIcon className="w-5 h-5" />
            ) : (
                <ArrowsPointingOutIcon className="w-5 h-5" />
            )}
        </button>
      </div>
    </div>
  );
});

export default ClientsListPanel;