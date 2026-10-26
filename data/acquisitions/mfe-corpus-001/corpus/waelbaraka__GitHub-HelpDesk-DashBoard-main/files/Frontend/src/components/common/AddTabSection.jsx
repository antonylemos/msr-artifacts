// src/components/chat/detailsContent/AddTabSection.jsx
import React from 'react';
import { PlusIcon, CalendarDaysIcon, TicketIcon } from '@heroicons/react/24/outline';

const AddTabSection = React.memo(({ contact }) => {
  // Actions could interact with the 'contact' prop if needed
  const handleCreateTicket = () => console.log("Create ticket for:", contact?.name);
  const handleBookAppointment = () => console.log("Book appointment for:", contact?.name);

  return (
    <div className="space-y-3 text-sm">
      <button
        onClick={handleCreateTicket}
        className="w-full flex items-center p-2.5 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 border border-gray-200"
      >
        <TicketIcon className="w-5 h-5 mr-2 text-gray-500"/>
        Create New Ticket
      </button>
      <button
        onClick={handleBookAppointment}
        className="w-full flex items-center p-2.5 bg-gray-50 hover:bg-gray-100 rounded-md text-gray-700 border border-gray-200"
      >
        <CalendarDaysIcon className="w-5 h-5 mr-2 text-gray-500"/>
        Book Appointment
      </button>
      {/* Add more actions as needed */}
    </div>
  );
});

export default AddTabSection;