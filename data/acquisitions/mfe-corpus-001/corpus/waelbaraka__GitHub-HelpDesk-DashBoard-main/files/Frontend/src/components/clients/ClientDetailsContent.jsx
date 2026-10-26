// src/components/clients/ClientDetailsContent.jsx
import React, { useState, useCallback } from 'react'; // Added useState, useCallback
import { PlusIcon, PhoneIcon, ChatBubbleLeftEllipsisIcon, CalendarDaysIcon, TicketIcon, EllipsisHorizontalIcon, InformationCircleIcon } from '@heroicons/react/24/solid'; // Added InformationCircleIcon
import CreateTicketForm from '../common/CreateTicketForm'; // <-- IMPORT THE NEW COMMON COMPONENT

// Content for sections
// IMPORTANT: Each of these is now a function that accepts `client` as a prop and returns JSX.
// This is how they should be used in sectionsData in ClientDetailsSidebar.jsx
export const ClientHeaderInfoContent = React.memo(({ client }) => (
    <div className="flex flex-col items-center text-center w-full">
        <div className={`w-20 h-20 ${client.avatarColor} rounded-full flex items-center justify-center text-white text-3xl font-semibold mb-2`}>
            {client.avatarInitials}
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{client.name}</h3>
        <p className="text-sm text-gray-500">{client.email}</p>
        <p className="text-sm text-gray-500 mt-1 flex items-center"><PhoneIcon className="w-4 h-4 mr-1"/> {client.phone}</p>
        <div className="mt-3 flex items-center space-x-2">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">Standard Client</span>
        </div>
    </div>
));

export const QuickActionsContent = React.memo(() => (
    <>
        <button className="flex items-center justify-center p-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100"><ChatBubbleLeftEllipsisIcon className="w-4 h-4 mr-1"/> Start Chat</button>
        <button className="flex items-center justify-center p-2 rounded-md bg-green-50 text-green-700 hover:bg-green-100"><CalendarDaysIcon className="w-4 h-4 mr-1"/> Book Appt.</button>
        <button className="flex items-center justify-center p-2 rounded-md bg-yellow-50 text-yellow-700 hover:bg-yellow-100"><TicketIcon className="w-4 h-4 mr-1"/> Create Ticket</button>
        <button className="flex items-center justify-center p-2 rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100"><EllipsisHorizontalIcon className="w-4 h-4 mr-1"/> More Actions</button>
    </>
));

export const GeneralInfoContent = React.memo(({ client }) => (
    <div className="space-y-2">
        <p>Location: <span className="font-medium">{client.country}, {client.state}</span></p>
        <p>Phone: <span className="font-medium">{client.phone}</span></p>
        <p>Assigned Agent: <span className="font-medium">{client.assignedAgent}</span></p>
        <p>Client Status: <span className="font-medium">{client.statusCategory.replace(/_/g, ' ')}</span></p>
    </div>
));

export const AppointmentsHistoryContent = React.memo(({ client }) => (
    <div className="space-y-2">
        {client.nextAppointment ? (
            <p className="font-medium">Next: {client.nextAppointment.date} {client.nextAppointment.time} ({client.nextAppointment.status})</p>
        ) : (
            <p className="italic">No upcoming appointments.</p>
        )}
        {client.totalAppointments > 0 ? (
            <>
                <p>Total Bookings: <span className="font-medium">{client.totalAppointments}</span></p>
                <a href="#" className="text-blue-600 hover:underline">View All Appointments</a>
            </>
        ) : (
            <p className="italic">No past appointments recorded.</p>
        )}
    </div>
));

export const CommunicationHistoryContent = React.memo(({ client }) => (
    <div className="space-y-2">
        <p>Total Chats: <span className="font-medium">{client.totalChats}</span></p>
        <p>Total Tickets: <span className="font-medium">{client.totalTickets}</span></p>
        <p>Last Contact: <span className="font-medium">{client.lastInteraction} ({client.lastContactType})</span></p>
        <a href="#" className="text-blue-600 hover:underline">View Full History</a>
    </div>
));

export const ClientNotesContent = React.memo(({ client }) => (
    <div className="space-y-2">
        <p>{client.notes || <span className="italic">No notes for this client.</span>}</p>
        <button className="text-blue-600 hover:underline">Edit Notes</button>
    </div>
)); // FIX: Ensure this is correctly closed and a semicolon after it.

export const ClientTagsContent = React.memo(({ client }) => (
    <div className="flex flex-wrap gap-2">
        {client.name === 'John Doe' && <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">VIP</span>}
        {client.name === 'Alice Johnson' && <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">Follow-up</span>}
        <button className="text-blue-600 hover:underline text-sm font-medium flex items-center"><PlusIcon className="w-4 h-4 mr-1"/> Add Tag</button>
    </div>
));

// --- NEW COMPONENT: AdditionalInfoContent ---
export const AdditionalInfoContent = React.memo(({ client }) => (
    <div className="space-y-2">
        <p>Returning visitor: <span className="font-medium">{client.returningVisits || 0} visits, {client.returningChats || 0} chat(s)</span></p>
        <p>Last seen: <span className="font-medium">{client.lastSeen || 'N/A'}</span></p>
        <p>Came from: <span className="font-medium text-blue-600 hover:underline cursor-pointer">{client.cameFrom || 'N/A'}</span></p>
        <p>Groups: <span className="font-medium">{client.groups?.join(', ') || 'General'}</span></p> {/* Assuming client.groups is an array of strings */}
    </div>
));


// THIS IS THE WRAPPER FOR THE "CREATE TICKET" TAB IN ClientDetailsSidebar
export const CreateTicketFormContent = React.memo(({ client }) => {
    const handleTicketSubmit = (formData) => {
        console.log('Ticket submitted from ClientDetailsSidebar tab:', formData, "for client:", client);
        // Here, you might want to close the sidebar, show a success message, etc.
        // For example, if DetailSidebar had an `onCloseTab` prop or similar.
        alert('Ticket creation simulated from sidebar tab!');
    };

    // The CreateTicketForm component itself has p-4, so no extra padding needed here
    // unless DetailSidebar's content area for tabs already has padding that you want to remove.
    return (
        <CreateTicketForm
            client={client}
            onSubmit={handleTicketSubmit}
            // onCancel could be used if DetailSidebar manages tab changes or closing
        />
    );
});
export const AddTabContent = React.memo(() => (
    <div className="p-4 text-sm text-gray-600">
        <h3 className="font-semibold mb-2">Actions:</h3>
        <ul className="list-disc list-inside space-y-1">
            <li>Create New Appointment</li>
            <li>Add Client Note</li>
            <li>Assign Tags</li>
            <li>Send Marketing Email</li>
            <li>Block Client</li>
        </ul>
    </div>
));