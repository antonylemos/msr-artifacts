// src/components/appointments/calendar/DayViewGrid.jsx
import React from 'react';
import { isSameDay } from '../utils'; // Import utils

const DayViewGrid = React.memo(({ currentDate, appointments, onSelectDate }) => {
    // Hours from 8 AM to 9 PM (inclusive) for a common work day
    const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM (20:00)

    return (
        // FIX: Reduced height from 250px to 400px (adjust this calc value based on your actual page height)
        <div className="h-fit overflow-y-hidden scrollbar-thin border border-slate-200 rounded-md p-1.5 bg-white">
            <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
                {hours.map(hour => {
                    const hourDate = new Date(currentDate);
                    hourDate.setHours(hour, 0, 0, 0);
                    const hourAppointments = appointments.filter(appt => {
                        const apptDateTime = new Date(appt.appointment_datetime_utc);
                        return isSameDay(apptDateTime, currentDate) && apptDateTime.getHours() === hour;
                    }).sort((a,b) => new Date(a.appointment_datetime_utc).getTime() - new Date(b.appointment_datetime_utc).getTime());

                    return (
                        <React.Fragment key={hour}>
                            <div className="text-right text-xs text-slate-500 pt-1 sticky top-0 bg-white z-10"> {/* Sticky hour labels */}
                                {hourDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                            </div>
                            <div className="relative border-b border-gray-200 pb-2">
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {hourAppointments.length > 0 ? (
                                        hourAppointments.map(appt => (
                                            <span key={appt.id} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full truncate max-w-full">
                                                {appt.appointment_time_str_local} {appt.client_name} - {appt.subject}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-slate-400"></span>
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
});

export default DayViewGrid;