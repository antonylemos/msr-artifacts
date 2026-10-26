// src/pages/HomePage.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  CalendarDaysIcon,
  TicketIcon,
  UsersIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
  PencilIcon, // For quick edit/status
  InformationCircleIcon, // For info tooltips
  BookOpenIcon, // For KnowledgeBase activity
  LinkIcon, // For KB ID link
  ClockIcon, // For Avg. Response Time KPI
  HandThumbUpIcon // For CSAT Score KPI
} from '@heroicons/react/24/solid'; // Using solid icons for dashboard prominence

// --- Dummy Data (Aggregated from other modules for the dashboard) ---
const dashboardData = {
  currentUser: {
    name: 'Pytsud',
    avatarInitials: 'P',
    avatarColor: 'bg-green-500',
    isAcceptingChats: true, // Example status
  },
  kpis: {
    chatsLast7Days: { value: 13 }, // New data for exact image match
    customersOnline: { value: 1 },
    ongoingChats: { value: 0 },
    activeBots: { value: 1 },
    // Retained old KPIs for demonstration of KPICard usage if needed elsewhere
    // chatsHandledToday: { value: 7, trend: 'up', delta: 2 },
    // upcomingAppointments: { value: 3, trend: 'neutral', delta: 0 },
    // openTicketsAssigned: { value: 2, trend: 'down', delta: 1 },
    // newClientsThisWeek: { value: 5, trend: 'up', delta: 3 },
    // avgResponseTime: { value: '35s', trend: 'down', delta: '5s' },
    // csatScore: { value: '92%', trend: 'up', delta: '1%' }
  },
  myWorkload: {
    openChats: [
      { id: 'c1', name: 'Tina Cornell', unread: true },
      { id: 'c2', name: 'George White', unread: false },
    ],
    appointmentsToday: [
      { id: 'a1', time: '10:00 AM', client: 'John Doe', type: 'Consultation' },
    ],
    ticketsToHandle: [
      { id: 't1', subject: 'Login issue', status: 'On hold' },
      { id: 't2', subject: 'API integration', status: 'Pending' },
    ],
    draftArticles: 3,
  },
  recentActivity: [
    { id: 'act1', type: 'appointment', text: 'Client John Doe booked "Initial Consultation".', timestamp: '2 minutes ago', icon: CalendarDaysIcon },
    { id: 'act2', type: 'chat', text: 'You responded to Tina Cornell in Chat #CH456.', timestamp: '15 minutes ago', icon: ChatBubbleLeftEllipsisIcon },
    { id: 'act3', type: 'client', text: 'New client Sarah Brown signed up.', timestamp: '1 hour ago', icon: UsersIcon },
    { id: 'act4', type: 'ticket', text: 'Ticket #040QO05 status changed to "Pending".', timestamp: '3 hours ago', icon: TicketIcon },
    { id: 'act5', type: 'knowledgebase', text: 'Article "Getting Started" status changed to "Published".', timestamp: 'Yesterday', icon: BookOpenIcon },
  ],
  trialDaysLeft: 14, // From KnowledgeBase
  kbId: '41984ecd-28bb-4109-8bbf-dd7b969494f8.kb.help' // From KnowledgeBase
};

// --- Reusable Components ---

// KPI Card Component - Styling adjusted to be completely flat, no bg, border, shadow, hover
const KPICard = React.memo(({ title, value, trend, delta, icon: Icon, isTime = false }) => {
  // Only use trend/delta if actually passed (for the older KPI types)
  const showTrend = trend !== undefined && delta !== undefined;
  const trendColorClass = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500';
  const TrendIcon = trend === 'up' ? ArrowUpIcon : trend === 'down' ? ArrowDownIcon : InformationCircleIcon;

  return (
    // Re-added bg-gray-50, border, rounded-lg, hover:bg-gray-100 for subtle card effect
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-start justify-between hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
      <div className="flex items-center text-gray-600 mb-2">
        {Icon && <Icon className="w-5 h-5 mr-2" />}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="flex items-baseline w-full">
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        {showTrend && (
          <span className={`ml-2 text-xs font-medium flex items-center ${trendColorClass}`}>
            {TrendIcon && <TrendIcon className="w-3 h-3 mr-0.5"/>}
            {isTime && trend === 'down' ? '-' : ''}{delta} {isTime && 'faster'}
          </span>
        )}
      </div>
    </div>
  );
});

// Activity Item Component (Already flat, just ensure padding/border)
const ActivityItem = React.memo(({ activity }) => (
  // Ensured padding, border-b remains for list items
  <div className="flex items-center py-2 px-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer">
    {activity.icon && <activity.icon className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />}
    <div className="flex-1">
      <p className="text-sm text-gray-800">{activity.text}</p>
      <span className="text-xs text-gray-500">{activity.timestamp}</span>
    </div>
  </div>
));


const HomePage = React.memo(({ sectionConfig }) => {
  const [data, setData] = useState(dashboardData);
  const [loading, setLoading] = useState(true);
  const [isAcceptingChats, setIsAcceptingChats] = useState(dashboardData.currentUser.isAcceptingChats);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(dashboardData);
      setIsAcceptingChats(dashboardData.currentUser.isAcceptingChats);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChatStatusToggle = useCallback(() => {
    setIsAcceptingChats(prev => !prev);
    console.log('Toggling chat acceptance status');
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col bg-gray-50 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-50 overflow-y-auto p-6 space-y-6"> {/* Main page background */}
      {/* Top Yellow Bar (Trial Info) - Still a distinct bar */}
      <div className="bg-yellow-400 text-center py-2 relative rounded-md">
        <span className="text-sm font-medium text-gray-800">Subscribe to KnowledgeBase</span>
        <div className="absolute top-1/2 left-4 -translate-y-1/2 flex items-center text-gray-800 text-sm font-medium">
          <span className="inline-block p-1 bg-white rounded-full mr-1">{data.trialDaysLeft}</span> trial days left
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center text-gray-800 text-sm">
          <LinkIcon className="w-4 h-4 mr-1 text-gray-600"/>
          <span className="text-gray-600">{data.kbId}</span>
          <label className="flex items-center cursor-pointer ml-3">
            <div className="relative">
              <input type="checkbox" className="sr-only peer" defaultChecked={true} />
              <div className="block bg-gray-300 w-10 h-5 rounded-full transition-colors peer-checked:bg-green-500"></div>
              <div className="dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Welcome & Agent Status Header - Applied card styles */}
      {/* This remains a distinct top section, not a "card" in the new subtle sense */}
      <div className="flex justify-between items-center py-4"> {/* Removed bg-white, rounded-lg, shadow-sm, border */}
        <div className="flex items-center">
          <div className={`w-12 h-12 ${data.currentUser.avatarColor} rounded-full flex items-center justify-center text-white text-xl font-semibold mr-3`}>
            {data.currentUser.avatarInitials}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Good morning, {data.currentUser.name}!</h1>
            <p className="text-sm text-gray-500">Welcome back to your dashboard.</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-base text-gray-700">Accepting Chats</span>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only peer" checked={isAcceptingChats} onChange={handleChatStatusToggle} />
              <div className="block bg-gray-300 w-12 h-6 rounded-full transition-colors peer-checked:bg-green-500"></div>
              <div className="dot absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-6"></div>
            </div>
          </label>
          <button className="text-gray-500 hover:text-gray-700">
            <PencilIcon className="w-5 h-5"/>
          </button>
        </div>
      </div>

      {/* Activity Overview (New Section Title) */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Activity Overview</h2>

      {/* Key Performance Indicators (KPIs) - No external card, KPI cards have subtle backgrounds */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Chats last 7 days" value={data.kpis.chatsLast7Days.value} />
        <KPICard title="Customers online" value={data.kpis.customersOnline.value} />
        <KPICard title="Ongoing chats" value={data.kpis.ongoingChats.value} />
        <KPICard title="Active bots" value={data.kpis.activeBots.value} />
      </div>

      {/* Other sections below this would also be flat. Example: My Workload & Recent Activity */}
      {/* My Workload & Recent Activity - Sections themselves are flat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6"> {/* Removed border-t, border-gray-200 */}
        {/* My Workload - Re-applied card styles */}
        <div className="bg-white rounded-lg  border border-gray-200 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-200">My Workload</h2>
          <div className="p-4 space-y-4">
            {/* Open Chats */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Open Chats</span>
              <div className="flex items-center">
                <span className="text-blue-600 font-medium">{data.myWorkload.openChats.length}</span>
                <span className="ml-2 text-sm text-gray-500">
                  ({data.myWorkload.openChats.filter(c => c.unread).length} unread)
                </span>
              </div>
            </div>
            {/* Appointments Today */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Appointments Today</span>
              <span className="text-blue-600 font-medium">{data.myWorkload.appointmentsToday.length}</span>
            </div>
            {/* Tickets to Handle */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Tickets to Handle</span>
              <span className="text-blue-600 font-medium">{data.myWorkload.ticketsToHandle.length}</span>
            </div>
            {/* Draft Articles */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Draft Articles</span>
              <span className="text-blue-600 font-medium">{data.myWorkload.draftArticles}</span>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">View All Work</button>
          </div>
        </div>

        {/* Recent Activity - Re-applied card styles */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-200">Recent Activity</h2>
          <div className="divide-y divide-gray-100">
            {data.recentActivity.map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
          <div className="p-4 border-t border-gray-200">
            <button className="w-full text-blue-600 hover:underline text-sm font-medium">View All Activity</button>
          </div>
        </div>
      </div>

      {/* Quick Actions - Re-applied card styles, adjusted padding */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mt-6"> {/* Added mt-6 for spacing */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center">
            <PlusIcon className="w-4 h-4 mr-2"/> Book Appointment
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center">
            <PlusIcon className="w-4 h-4 mr-2"/> Create Ticket
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center">
            <PlusIcon className="w-4 h-4 mr-2"/> Add New Client
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center">
            <PlusIcon className="w-4 h-4 mr-2"/> Write New Article
          </button>
        </div>
      </div>

    </div>
  );
});

export default HomePage;