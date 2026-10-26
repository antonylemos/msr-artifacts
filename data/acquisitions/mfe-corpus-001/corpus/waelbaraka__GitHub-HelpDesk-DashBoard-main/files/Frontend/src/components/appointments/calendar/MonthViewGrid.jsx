// src/components/appointments/calendar/MonthViewGrid.jsx
import React from 'react';
import CalendarCell from './CalendarCell';
import { getDaysInMonth, getStartOfWeek, isSameDay } from '../utils'; // Import utils

const MonthViewGrid = React.memo(({ currentDate, appointments, onSelectDate }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);

    const firstDayOfMonth = new Date(year, month, 1);
    const startOffset = firstDayOfMonth.getDay(); // 0 for Sunday, 6 for Saturday

    const days = [];
    const prevMonthLastDay = new Date(year, month, 0); // Last day of previous month
    // Fill leading empty days (from previous month)
    for (let i = startOffset -1; i >= 0; i--) {
        const date = new Date(prevMonthLastDay);
        date.setDate(prevMonthLastDay.getDate() - i);
        const dayAppointments = appointments.filter(appt => isSameDay(new Date(appt.appointment_datetime_utc), date));
        days.push(
            <CalendarCell
                key={`prev-${date.toDateString()}`}
                date={date}
                appointmentsForDay={dayAppointments}
                isCurrentMonth={false}
                onClick={onSelectDate}
            />
        );
    }

    // Fill days of current month
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        const dayAppointments = appointments.filter(appt => isSameDay(new Date(appt.appointment_datetime_utc), date));
        days.push(
            <CalendarCell
                key={date.toDateString()}
                date={date}
                appointmentsForDay={dayAppointments}
                isCurrentMonth={true}
                onClick={onSelectDate}
            />
        );
    }

    // Fill trailing empty days (from next month)
    const totalCells = days.length;
    const remainingCells = 42 - totalCells; // Max 6 weeks * 7 days = 42 cells
    if (remainingCells > 0) {
        for (let i = 1; i <= remainingCells; i++) {
            const date = new Date(year, month + 1, i);
            const dayAppointments = appointments.filter(appt => isSameDay(new Date(appt.appointment_datetime_utc), date));
            days.push(
                <CalendarCell
                    key={`next-${date.toDateString()}`}
                    date={date}
                    appointmentsForDay={dayAppointments}
                    isCurrentMonth={false}
                    onClick={onSelectDate}
                />
            );
        }
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

export default MonthViewGrid;