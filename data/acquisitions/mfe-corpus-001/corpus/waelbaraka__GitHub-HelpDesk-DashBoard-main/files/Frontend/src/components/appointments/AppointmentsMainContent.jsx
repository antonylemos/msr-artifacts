// src/components/appointments/AppointmentsMainContent.jsx
import React from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import AppointmentCalendar from './calendar/AppointmentCalendar'; // Ensure this is imported
import AppointmentList from './AppointmentList'; // Ensure this is imported

const AppointmentsMainContent = ({
  appointmentsData, // Full appointment data for the calendar
  filteredAppointments, // Filtered data for the list
  calendarViewMode,
  setCalendarViewMode,
  onSelectCalendarDate,
  currentViewLabelForList,
  onAppointmentClick,
  searchTerm,
  onSearchTermChange,
  onAddFilterClick,
  sortOrder,
  onSortOrderChange
}) => {
  const pageSectionHeaderHeightClass = 'h-[60px]';
  const sectionBorderClass = 'border-b border-slate-200';

  return (
    <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden">
      {/* Header aligned with sidebar */}
      <div className={`flex items-center justify-end px-6 ${sectionBorderClass} ${pageSectionHeaderHeightClass} bg-white`}>
        <button className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
          <EllipsisHorizontalIcon className="w-6 h-6"/>
        </button>
      </div>

      {/* Main Content Area: Now a flex-col container for Calendar and List */}
      <div className="flex-grow p-6 overflow-y-auto scrollbar-thin flex flex-col">

        {/* Calendar - Sits at the top of the main content area */}
        <AppointmentCalendar
          viewMode={calendarViewMode}
          onViewModeChange={setCalendarViewMode}
          appointments={appointmentsData} // Pass all appointments to calendar for rendering
          onSelectCalendarDate={onSelectCalendarDate}
        />

        {/* Appointment List - Sits below the calendar */}
        {/* Added margin-top to separate the list from the calendar */}
        <div className="mt-6 flex-1">
          <AppointmentList
            appointments={filteredAppointments} // Pass filtered list to AppointmentList
            currentViewLabel={currentViewLabelForList}
            searchTerm={searchTerm}
            onSearchTermChange={onSearchTermChange}
            onAppointmentClick={onAppointmentClick}
            onAddFilterClick={onAddFilterClick}
            sortOrder={sortOrder}
            onSortOrderChange={onSortOrderChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentsMainContent;