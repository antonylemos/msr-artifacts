// src/components/chat/common/AppointmentsTabContent.jsx
import React, { useState, useMemo, useCallback } from 'react';
import { CalendarDaysIcon, PlusIcon, PencilIcon, EyeIcon, UserCircleIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid'; // Added UserCircleIcon, CurrencyDollarIcon
import { StatusBadge } from '../appointments/utils';

const AppointmentItem = React.memo(({ appointment, onEdit, onView }) => {
    const appointmentDate = new Date(appointment.appointment_datetime_utc);
    const formattedDate = appointmentDate.toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric'
    });

    let bookedByDisplay = 'N/A';
    if (appointment.booked_by_actor_type === 'agent') {
        // In a real app, you'd look up the agent's name using booked_by_actor_id_ref
        // For dummy data, we might use a placeholder or the ID itself if no name snapshot.
        // Your dummy data has an 'agent' field which seems to be the assigned agent, not necessarily the booker.
        // Let's assume for now `booked_by_actor_id_ref` might just be a name or type for simplicity.
        bookedByDisplay = `Agent (${appointment.booked_by_actor_id_ref || 'Unknown'})`;
    } else if (appointment.booked_by_actor_type === 'user') {
        bookedByDisplay = `Client (${appointment.booking_channel || 'Online'})`;
    } else if (appointment.booking_channel) {
        bookedByDisplay = `Channel: ${appointment.booking_channel}`;
    }

    const isPast = appointmentDate < new Date() && appointment.status !== 'scheduled' && appointment.status !== 'pending' && appointment.status !== 'confirmed';

    return (
        <div className={`p-3 rounded-md border mb-2 last:mb-0 transition-all duration-150 hover:shadow-md ${
            isPast ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-white border-slate-300 hover:border-blue-400'
        }`}>
            <div className="flex justify-between items-start mb-1.5">
                <h4 className={`text-sm font-medium ${isPast ? 'text-slate-600' : 'text-slate-800'}`}>
                    {appointment.service_display_name || appointment.subject || 'Appointment'}
                </h4>
                <StatusBadge status={appointment.status} />
            </div>
            <p className={`text-xs ${isPast ? 'text-slate-500' : 'text-slate-600'} mb-1`}>
                {formattedDate} at {appointment.appointment_time_str_local}
            </p>
            <p className={`text-xs ${isPast ? 'text-slate-400' : 'text-slate-500'} mb-1 flex items-center`}>
                <UserCircleIcon className="w-3.5 h-3.5 mr-1 opacity-75"/> Booked by: {bookedByDisplay}
            </p>
            {appointment.payment_status && (
                <p className={`text-xs mb-1.5 flex items-center ${
                    appointment.payment_status === 'paid' ? (isPast ? 'text-green-500' : 'text-green-600') : (isPast ? 'text-orange-400' : 'text-orange-500')
                }`}>
                    <CurrencyDollarIcon className="w-3.5 h-3.5 mr-1 opacity-75"/>
                    Payment: <span className="font-medium ml-1">{appointment.payment_status.charAt(0).toUpperCase() + appointment.payment_status.slice(1)}</span>
                </p>
            )}

            <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-end space-x-2">
                {onView && (
                    <button
                        onClick={() => onView(appointment)}
                        title="View Details"
                        className="p-1.5 text-slate-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                    >
                        <EyeIcon className="w-4 h-4" />
                    </button>
                )}
                {/* Only allow edit for future/current non-completed/non-cancelled appointments */}
                {onEdit && !isPast && !['completed', 'cancelled', 'no_show'].includes(appointment.status.toLowerCase()) && (
                    <button
                        onClick={() => onEdit(appointment)}
                        title="Edit Appointment"
                        className="p-1.5 text-slate-500 hover:text-green-600 rounded-full hover:bg-green-50 transition-colors"
                    >
                        <PencilIcon className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
});

// The rest of AppointmentsTabContent.jsx (state, handlers, main structure)
// remains largely the same as the previous version.
// Just ensure it passes onEdit and onView to AppointmentItem.

const AppointmentsTabContent = ({ contact, onBookNewAppointment, onEditAppointment, onViewAppointmentDetails }) => {
    const now = new Date();
    now.setHours(0,0,0,0); // For comparing with appointment dates

    const upcomingAppointments = useMemo(() => {
        return (contact?.appointments || [])
            .filter(appt => {
                const apptDate = new Date(appt.appointment_datetime_utc);
                return apptDate >= now && !['completed', 'cancelled', 'no_show'].includes(appt.status.toLowerCase());
            })
            .sort((a, b) => new Date(a.appointment_datetime_utc) - new Date(b.appointment_datetime_utc));
    }, [contact?.appointments, now]);

    const pastAppointments = useMemo(() => {
        return (contact?.appointments || [])
            .filter(appt => {
                const apptDate = new Date(appt.appointment_datetime_utc);
                return apptDate < now || ['completed', 'cancelled', 'no_show'].includes(appt.status.toLowerCase());
            })
            .sort((a, b) => new Date(b.appointment_datetime_utc) - new Date(a.appointment_datetime_utc))
            .slice(0, 5); // Show only last 5 past appointments
    }, [contact?.appointments, now]);

    const handleBookNewClick = useCallback(() => {
        if (onBookNewAppointment) {
            onBookNewAppointment(contact);
        }
    }, [onBookNewAppointment, contact]);

    return (
        <div className="flex flex-col h-full p-1">
            <div className="p-3 border-b border-slate-200">
                <button
                    onClick={handleBookNewClick}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Book New Appointment
                </button>
            </div>

            <div className="flex-grow overflow-y-auto scrollbar-thin p-3 space-y-1"> {/* Reduced space-y for tighter list */}
                {upcomingAppointments.length > 0 && (
                    <div>
                        <h3 className="text-xs font-semibold text-slate-500 uppercase mb-2 px-1">Upcoming</h3>
                        {upcomingAppointments.map(appt => (
                            <AppointmentItem
                                key={appt.id || appt._id}
                                appointment={appt}
                                onEdit={onEditAppointment}
                                onView={onViewAppointmentDetails}
                            />
                        ))}
                    </div>
                )}

                {pastAppointments.length > 0 && (
                    <div className={upcomingAppointments.length > 0 ? "mt-4" : ""}> {/* Add margin if upcoming exists */}
                        <h3 className="text-xs font-semibold text-slate-500 uppercase mb-2 px-1">Recent & Past</h3>
                        {pastAppointments.map(appt => (
                            <AppointmentItem
                                key={appt.id || appt._id}
                                appointment={appt}
                                onView={onViewAppointmentDetails}
                                // No onEdit for past appointments typically
                            />
                        ))}
                    </div>
                )}

                {upcomingAppointments.length === 0 && pastAppointments.length === 0 && (
                    <div className="text-center text-sm text-slate-500 py-10">
                        <CalendarDaysIcon className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                        No appointments found for {contact?.name || 'this contact'}.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentsTabContent;