// src/components/appointments/calendar/CalendarCell.jsx
import React from 'react';
import { isToday, isSameDay } from '../utils'; // Import utils

const CalendarCell = React.memo(({ date, appointmentsForDay, isCurrentMonth, onClick }) => {
    // Style adjustments for a cleaner look
    const todayClass = isToday(date) ? 'border-blue-500 bg-blue-50 text-blue-800' : ''; // Highlight today
    const otherMonthClass = isCurrentMonth ? '' : 'text-gray-400 bg-gray-50'; // Dim days of other months
    const isPastDate = new Date(date).setHours(23, 59, 59, 999) < new Date().setHours(0,0,0,0); // Check if date is in the past

    const sortedAppointments = [...appointmentsForDay].sort((a, b) => {
        const timeA = new Date(a.appointment_datetime_utc).getTime();
        const timeB = new Date(b.appointment_datetime_utc).getTime();
        return timeA - timeB;
    });

    return (
        <div
            // FIX: Reduced height classes (h-20 sm:h-24 md:h-28 lg:h-32 -> h-16 sm:h-20 md:h-24 lg:h-28)
            className={`flex flex-col items-center justify-start p-1 border border-slate-200 rounded-md h-10 sm:h-20 md:h-10 lg:h-20 cursor-pointer transition-colors duration-100 relative
            ${todayClass} ${otherMonthClass} ${!isToday(date) && isPastDate && isCurrentMonth ? 'bg-gray-100 text-gray-400' : 'hover:bg-slate-100'}
            ${appointmentsForDay.length > 0 && !isToday(date) && isCurrentMonth ? 'bg-blue-50' : ''}`} // Slight blue tint if day has appointments
            onClick={() => onClick(date)}
        >
            <span className={`text-lg font-semibold w-full text-center ${isToday(date) ? 'text-blue-700' : isPastDate && isCurrentMonth ? 'text-gray-400' : 'text-slate-800'}`}>
                {date.getDate()}
            </span>
            {sortedAppointments.length > 0 ? (
                <div className="flex flex-col items-start mt-0.5 w-full px-0.5 overflow-hidden"> {/* Reduced mt-1 to mt-0.5 */}
                    {sortedAppointments.slice(0, 1).map((appt) => ( // FIX: Show only 1 appointment in cell for compactness
                        <span key={appt.id} className="text-xs w-full px-1 py-0.5 rounded-sm bg-blue-200 text-blue-800 truncate text-left mb-0.5">
                            {appt.appointment_time_str_local} {appt.client_name}
                        </span>
                    ))}
                    {sortedAppointments.length > 1 && ( // FIX: Changed from > 2 to > 1
                        <span className="text-xs w-full px-1 py-0.5 rounded-sm bg-gray-200 text-gray-700 truncate text-center">
                            +{sortedAppointments.length - 1} more
                        </span>
                    )}
                </div>
            ) : (
                <span className="text-xs mt-1 text-slate-400"></span> // Keep empty for spacing if no appointments
            )}
        </div>
    );
});

export default CalendarCell;