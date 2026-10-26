// src/pages/ClientsPage.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Import client-specific components
import ClientsListColumn from '../components/clients/ClientsListColumn';
import ClientDetailsSidebar from '../components/clients/ClientDetailsSidebar';

// Dummy data (can be removed once actual API integration begins)
const initialClients = [
  {
    id: 'c1', name: 'John Doe', email: 'john.doe@example.com', phone: '+1-555-1234',
    lastInteraction: '10 min ago (Chat)', nextAppointment: {date: '2023-12-01', time: '10:00 AM', status: 'Confirmed'},
    totalAppointments: 5, totalChats: 8, totalTickets: 2, lastContactType: 'Chat',
    country: 'United States', state: 'California',
    avatarInitials: 'JD', avatarColor: 'bg-blue-500',
    assignedAgent: 'Waelomeradam9',
    isAssignedToMe: true,
    statusCategory: 'active_bookings',
    notes: "Client is a VIP. Prefers morning appointments. Booked via website form."
  },
  {
    id: 'c2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1-555-5678',
    lastInteraction: '1 day ago (Call)', nextAppointment: null,
    totalAppointments: 0, totalChats: 3, totalTickets: 1, lastContactType: 'Call',
    country: 'Canada', state: 'Ontario',
    avatarInitials: 'JS', avatarColor: 'bg-green-500',
    assignedAgent: 'unassigned',
    isAssignedToMe: false,
    statusCategory: 'new_signups',
    notes: "First time visitor. Responded to Google Ads."
  },
  {
    id: 'c3', name: 'Alice Johnson', email: 'alice.j@example.com', phone: '+1-555-9876',
    lastInteraction: '3 hours ago (Appt. Inquiry)', nextAppointment: {date: '2023-12-05', time: '02:00 PM', status: 'Pending'},
    totalAppointments: 1, totalChats: 5, totalTickets: 0, lastContactType: 'Email',
    country: 'United Kingdom', state: 'London',
    avatarInitials: 'AJ', avatarColor: 'bg-purple-500',
    assignedAgent: 'Pytsud',
    isAssignedToMe: false,
    statusCategory: 'pending_confirmations',
    notes: "Follow-up needed for confirmation. Sent email reminder."
  },
  {
    id: 'c4', name: 'Bob Williams', email: 'bob.w@example.com', phone: '+1-555-4321',
    lastInteraction: '2 days ago (Email)', nextAppointment: null,
    totalAppointments: 3, totalChats: 2, totalTickets: 0, lastContactType: 'Email',
    country: 'Australia', state: 'New South Wales',
    avatarInitials: 'BW', avatarColor: 'bg-red-500',
    assignedAgent: 'unassigned',
    isAssignedToMe: false,
    statusCategory: 'unassigned_clients',
    notes: "Requires manual assignment."
  },
  {
    id: 'c5', name: 'Sarah Brown', email: 'sarah.b@example.com', phone: '+1-555-8765',
    lastInteraction: '5 min ago (Chat)', nextAppointment: null,
    totalAppointments: 0, totalChats: 1, totalTickets: 0, lastContactType: 'Chat',
    country: 'United States', state: 'Texas',
    avatarInitials: 'SB', avatarColor: 'bg-yellow-500',
    assignedAgent: 'Waelomeradam9',
    isAssignedToMe: true,
    statusCategory: 'my_assigned_clients',
    notes: "Recently engaged via chat. Potential new booking."
  },
];


const ClientsPage = React.memo(({ pageLabel = "Clients" }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(initialClients[0] || null);
  const [isDetailsSidebarCollapsed, setIsDetailsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('all_clients');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setClients(initialClients);
      setLoading(false);
      if (initialClients.length > 0) {
        setSelectedClient(initialClients[0]);
      }
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = useCallback((e) => setSearchTerm(e.target.value), []);
  const handleTabChange = useCallback((tabId) => setActiveTab(tabId), []);
  const handleSelectClient = useCallback((client) => {
    setSelectedClient(client);
    setIsDetailsSidebarCollapsed(false); // Always expand sidebar when new client selected from list
  }, []);
  const handleAssignClient = useCallback((clientId) => {
    setClients(prevClients => prevClients.map(client =>
      client.id === clientId ? { ...client, assignedAgent: 'Waelomeradam9', isAssignedToMe: true, statusCategory: 'my_assigned_clients' } : client
    ));
    setSelectedClient(prevSelected => prevSelected?.id === clientId ? { ...prevSelected, assignedAgent: 'Waelomeradam9', isAssignedToMe: true, statusCategory: 'my_assigned_clients' } : prevSelected);
    console.log(`Client ${clientId} assigned to me`);
  }, []);

  const handleToggleDetailsSidebarCollapse = useCallback(() => {
    setIsDetailsSidebarCollapsed(prev => !prev);
  }, []);
  const handleCloseDetailsSidebar = useCallback(() => {
    setSelectedClient(null);
    setIsDetailsSidebarCollapsed(true); // Also collapse sidebar fully if no client selected
  }, []);


  const tabs = useMemo(() => [
    { id: 'all_clients', label: 'All Clients', count: clients.length },
    { id: 'my_assigned_clients', label: 'My Assigned Clients', count: clients.filter(c => c.isAssignedToMe).length },
    { id: 'active_bookings', label: 'Active Bookings', count: clients.filter(c => c.nextAppointment && c.nextAppointment.status === 'Confirmed').length },
    { id: 'upcoming_bookings', label: 'Upcoming Bookings', count: clients.filter(c => c.nextAppointment && new Date(c.nextAppointment.date) > new Date()).length },
    { id: 'pending_confirmations', label: 'Pending Confirmations', count: clients.filter(c => c.nextAppointment && c.nextAppointment.status === 'Pending').length },
    { id: 'new_signups', label: 'New Signups', count: clients.filter(c => c.statusCategory === 'new_signups').length },
    { id: 'unassigned_clients', label: 'Unassigned', count: clients.filter(c => c.assignedAgent === 'unassigned').length },
    { id: 'recently_active', label: 'Recently Active', count: clients.filter(c => c.lastInteraction.includes('min ago') || c.lastInteraction.includes('hour ago')).length },
  ], [clients]);


  const filteredClients = useMemo(() => {
    const searchFiltered = clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (activeTab) {
      case 'all_clients': return searchFiltered;
      case 'my_assigned_clients': return searchFiltered.filter(client => client.isAssignedToMe);
      case 'active_bookings': return searchFiltered.filter(client => client.nextAppointment && client.nextAppointment.status === 'Confirmed');
      case 'upcoming_bookings': return searchFiltered.filter(client => client.nextAppointment && new Date(client.nextAppointment.date) > new Date());
      case 'pending_confirmations': return searchFiltered.filter(client => client.nextAppointment && client.nextAppointment.status === 'Pending');
      case 'new_signups': return searchFiltered.filter(client => client.statusCategory === 'new_signups');
      case 'unassigned_clients': return searchFiltered.filter(client => client.assignedAgent === 'unassigned');
      case 'recently_active':
        return searchFiltered.filter(client => client.lastInteraction.includes('min ago') || client.lastInteraction.includes('hour ago'));
      default: return searchFiltered;
    }
  }, [clients, searchTerm, activeTab]);


  return (
    // Outer container for the two columns
    <div className="flex flex-1 bg-slate-100 overflow-hidden">
      {/* Clients List Column (Left Side) */}
      <div className="flex-1 flex-shrink-0 transition-all duration-300 ease-in-out"> {/* <<<< FIX: Removed dynamic width class, set to flex-1 */}
        <ClientsListColumn
          clients={filteredClients}
          loading={loading}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedClient={selectedClient}
          onSelectClient={handleSelectClient}
          onAssignClient={handleAssignClient}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabs={tabs}
          onToggleDetailsSidebar={handleToggleDetailsSidebarCollapse}
          isDetailsSidebarOpen={!isDetailsSidebarCollapsed}
        />
      </div>

      {/* Client Details Sidebar (Right Column) */}
      <ClientDetailsSidebar
        client={selectedClient}
        onClose={handleCloseDetailsSidebar}
        isCollapsed={isDetailsSidebarCollapsed}
        onToggleCollapse={handleToggleDetailsSidebarCollapse}
      />
    </div>
  );
});

export default ClientsPage;