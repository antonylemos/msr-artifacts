// src/components/booking/MonthView.jsx
import React, { useMemo } from 'react';

const MonthView = ({ currentDate, appointments, onSelectDate }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthDays = useMemo(() => {
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) { days.push({ key: `empty-prev-${i}`, isEmpty: true }); }
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayAppointments = appointments.filter(appt => new Date(appt.date).toDateString() === date.toDateString());
            const isToday = new Date().toDateString() === date.toDateString();
            days.push({ key: day, day, date, appointments: dayAppointments, isToday });
        }
        const totalCells = days.length;
        const remainingCells = (7 - (totalCells % 7)) % 7;
        for (let i = 0; i < remainingCells; i++) { days.push({ key: `empty-next-${i}`, isEmpty: true }); }
        return days;
    }, [year, month, firstDayOfMonth, daysInMonth, appointments]);

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="border-t border-slate-200">
            <div className="grid grid-cols-7 text-center text-xs text-slate-500 font-semibold py-2.5 border-b border-slate-200"> {/* Increased font weight */}
                {dayNames.map(name => <div key={name}>{name}</div>)}
            </div>
            <div className="grid grid-cols-7"> {/* Removed grid-rows-5 for dynamic height */}
                {monthDays.map(dayObj => (
                    <div
                        key={dayObj.key}
                        onClick={() => !dayObj.isEmpty && onSelectDate && onSelectDate(dayObj.date)}
                        className={`h-28 border-b border-r border-slate-200 p-2 text-xs overflow-y-auto scrollbar-thin 
                                   ${dayObj.isEmpty ? 'bg-slate-50' : 'hover:bg-slate-100 cursor-pointer transition-colors'}
                                   ${dayObj.isToday ? 'bg-teal-50 ring-1 ring-teal-200' : ''}`}
                    >
                        {!dayObj.isEmpty && (
                            <>
                                <span className={`font-bold text-sm ${dayObj.isToday ? 'text-teal-600' : 'text-slate-800'}`}>
                                    {dayObj.day}
                                </span>
                                <div className="mt-1.5 space-y-1">
                                    {dayObj.appointments.slice(0, 2).map(appt => (
                                <div key={appt.id} className={`truncate text-slate-800 text-[10px] font-medium px-1.5 py-0.5 rounded-sm shadow-sm ${appt.colorClass || 'bg-blue-100'}`}>                                            {appt.title}
                                        </div>
                                    ))}
                                    {dayObj.appointments.length > 2 && (
                                         <div className="text-slate-400 text-[9px] font-medium">+ {dayObj.appointments.length - 2} more</div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonthView;