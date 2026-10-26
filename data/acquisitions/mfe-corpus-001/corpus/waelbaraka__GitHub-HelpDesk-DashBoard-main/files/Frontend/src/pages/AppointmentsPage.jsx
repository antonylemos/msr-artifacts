// src/pages/AppointmentsPage.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid'; // Only PlusIcon needed directly here

// --- NEW COMPONENT IMPORTS ---
import AppointmentsSidebar from '../components/appointments/AppointmentsSidebar';
import AppointmentsMainContent from '../components/appointments/AppointmentsMainContent';
import AppointmentForm from '../components/appointments/AppointmentForm'; // For new/edit appointment modal
import AppointmentDetailView from '../components/appointments/AppointmentDetailView'; // For detailed view
// --- END NEW COMPONENT IMPORTS ---

// --- Utils and Data Generation ---  
import { generateRandomAppointments, isSameDay } from '../components/appointments/utils'; // Import everything from utils

const initialAppointmentsData = generateRandomAppointments(150); // Generate a larger set of dummy data

const AppointmentsPage = React.memo(({
  pageLabel = "Appointments",
  navItems,
  activeSubItemId,
  onSubItemClick,
  navFooterButton,
  openNestedSubmenus,
  onToggleNestedSubmenu,
}) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null); // For detail view
  const [showAppointmentForm, setShowAppointmentForm] = useState(false); // For new/edit modal
  const [editAppointmentData, setEditAppointmentData] = useState(null); // Data for edit form
  const [calendarViewMode, setCalendarViewMode] = useState('month'); // State for calendar view: 'day', 'week', 'month'
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date()); // Date selected on calendar

  // Simulate data fetching
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setAppointments(initialAppointmentsData);
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Handlers for List and Calendar
  const handleAppointmentClick = useCallback((appointmentId) => setSelectedAppointmentId(appointmentId), []);
  const handleBackToList = useCallback(() => setSelectedAppointmentId(null), []);
  const handleSearchTermChange = useCallback((term) => setSearchTerm(term), []);
  const handleCalendarViewModeChange = useCallback((mode) => setCalendarViewMode(mode), []);
  const handleSelectCalendarDate = useCallback((date) => {
    setSelectedCalendarDate(date);
    // When a date is selected from calendar, ideally filter list for that day
    // For now, it just updates the selected date. Filtering logic can be added later.
  }, []);

  // Handlers for Forms/Modals
  const handleNewAppointmentClick = useCallback(() => {
    setEditAppointmentData(null); // Clear any old edit data
    setShowAppointmentForm(true);
  }, []);
  const handleEditAppointment = useCallback((appt) => {
    setEditAppointmentData(appt);
    setShowAppointmentForm(true);
  }, []);
  const handleSaveAppointment = useCallback((newOrUpdatedAppt) => {
    setAppointments(prev => {
      if (prev.some(appt => appt.id === newOrUpdatedAppt.id)) {
        return prev.map(appt => appt.id === newOrUpdatedAppt.id ? newOrUpdatedAppt : appt);
      } else {
        return [...prev, newOrUpdatedAppt];
      }
    });
    setShowAppointmentForm(false);
    setEditAppointmentData(null);
    setSelectedAppointmentId(newOrUpdatedAppt.id); // Show details of newly created/edited appt
  }, []);
  const handleCancelAppointmentForm = useCallback(() => {
    setShowAppointmentForm(false);
    setEditAppointmentData(null);
  }, []);

  // Handlers for AppointmentDetailView
  const handleSendReminder = useCallback((appt) => {
    console.log("Sending reminder for appointment:", appt.id);
    alert(`Reminder sent for ${appt.client_name}'s appointment.`);
  }, []);
  const handleUpdateAppointmentStatus = useCallback((appt) => {
    setAppointments(prev => prev.map(a => a.id === appt.id ? appt : a));
    console.log("Appointment status updated:", appt.id, appt.status);
  }, []);


  // Filter appointments for the list view based on sidebar nav item and search term
  const filteredAppointmentsForList = useMemo(() => {
    let appts = appointments.filter(appt => {
      const matchesSearch = appt.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            appt.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            appt.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            appt.status.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Apply internal nav item filter
    switch (activeSubItemId) {
        case 'appointments/upcoming':
            const now = new Date();
            appts = appts.filter(appt => new Date(appt.appointment_datetime_utc) >= now && ['scheduled', 'pending', 'confirmed'].includes(appt.status));
            break;
        case 'appointments/today':
            appts = appts.filter(appt => isSameDay(new Date(appt.appointment_datetime_utc), new Date()));
            break;
        case 'appointments/past':
            const today = new Date();
            today.setHours(0,0,0,0);
            appts = appts.filter(appt => new Date(appt.appointment_datetime_utc) < today);
            break;
        case 'appointments/cancelled':
            appts = appts.filter(appt => appt.status === 'cancelled');
            break;
        case 'appointments/my_appointments': // Assuming agents are current agent
        case 'appointments/scheduled_by_me':
            appts = appts.filter(appt => appt.agent === 'Waelomeradam9'); // Dummy agent
            break;
        case 'appointments/awaiting_confirmation':
            appts = appts.filter(appt => appt.status === 'pending');
            break;
        case 'appointments/team_calendar':
            // This is a direct link in sidebarConfig, so it would navigate to a separate route/page
            // For now, it will simply show the main AppointmentsPage with all relevant data
            break;
        case 'appointments/all':
        default:
            // No additional filter for 'all' or default
            break;
    }
    return appts.sort((a, b) => new Date(a.appointment_datetime_utc).getTime() - new Date(b.appointment_datetime_utc).getTime()); // Sort by date/time
  }, [appointments, searchTerm, activeSubItemId]);


  // Determine the current label for the list view from sidebar config
  const currentViewLabelForList = useMemo(() => {
    const navItem = navItems?.find(item => item.id === activeSubItemId);
    return navItem ? navItem.label : 'All Appointments';
  }, [activeSubItemId, navItems]);


  return (
    <div className="flex flex-1 overflow-hidden bg-slate-100"> {/* Page Background */}

      {/* Pane 1: Left Internal Navigation Sidebar */}
      <AppointmentsSidebar
        pageLabel={pageLabel}
        onNewAppointmentClick={handleNewAppointmentClick}
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        navItems={navItems}
        activeSubItemId={activeSubItemId}
        onSubItemClick={onSubItemClick}
        openNestedSubmenus={openNestedSubmenus}
        onToggleNestedSubmenu={onToggleNestedSubmenu}
        navFooterButton={navFooterButton}
      />

      {/* Main Content Area (List + Calendar OR Detail View) */}
      {selectedAppointmentId ? (
        <AppointmentDetailView
          appointment={appointments.find(appt => appt.id === selectedAppointmentId)}
          onBackToList={handleBackToList}
          onEditAppointment={handleEditAppointment}
          onSendReminder={handleSendReminder}
          onUpdateStatus={handleUpdateAppointmentStatus} // Pass handler for status changes in detail view
        />
      ) : (
        <AppointmentsMainContent
          appointmentsData={appointments} // Pass all appointments to calendar
          filteredAppointments={filteredAppointmentsForList} // Pass filtered list to AppointmentList
          calendarViewMode={calendarViewMode}
          setCalendarViewMode={handleCalendarViewModeChange}
          onSelectCalendarDate={handleSelectCalendarDate}
          currentViewLabelForList={currentViewLabelForList}
          onAppointmentClick={handleAppointmentClick}
          searchTerm={searchTerm}
          onSearchTermChange={handleSearchTermChange}
          onAddFilterClick={() => console.log('Add filter clicked')}
          sortOrder="Newest" // Hardcoded sort order for demo
          onSortOrderChange={(order) => console.log('Sort order changed:', order)}
        />
      )}

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <AppointmentForm
          initialData={editAppointmentData}
          onSave={handleSaveAppointment}
          onCancel={handleCancelAppointmentForm}
        />
      )}
    </div>
  );
});

export default AppointmentsPage;