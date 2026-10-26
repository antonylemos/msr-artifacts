// src/components/appointments/calendar/WeekViewGrid.jsx
import React from 'react';
import CalendarCell from './CalendarCell';
import { getStartOfWeek, isSameDay } from '../utils'; // Import utils

const WeekViewGrid = React.memo(({ currentDate, appointments, onSelectDate }) => {
    const startOfWeek = getStartOfWeek(currentDate);
    const days = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const dayAppointments = appointments.filter(appt => isSameDay(new Date(appt.appointment_datetime_utc), date));
        days.push(
            <CalendarCell
                key={date.toDateString()}
                date={date}
                appointmentsForDay={dayAppointments}
                isCurrentMonth={true} // Always considered current month for week view context
                onClick={onSelectDate}
            />
        );
    }
    return (
        <div>
            <div className="grid grid-cols-7 gap-1.5 md:gap-2 text-center text-xs font-semibold text-slate-600 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1.5 md:gap-2">
                {days}
            </div>
        </div>
    );
});

export default WeekViewGrid;