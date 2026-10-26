// src/components/booking/WeekView.jsx
import React from 'react';

// Helper to check if two dates are on the same day
const isSameDay = (d1, d2) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();


// Helper to format time (e.g., 8 -> "08 AM")
const formatHour = (hour) => {
    const h = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    return `${String(h).padStart(2, '0')} ${ampm}`;
};

const WeekView = ({ startDate, appointments, onSelectDate }) => { // <-- ADD onSelectDate PROP
    const hours = Array.from({ length: 5 }, (_, i) => i + 8);
    const days = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i);
        return d;
    });


    return (
        <div className="grid grid-cols-[50px_1fr] text-sm relative">
            {/* Time Column */}
            <div className="pr-2 text-right">
                {hours.map(hour => (
                    <div key={hour} className="h-20 flex items-start justify-end pt-0.5 text-slate-400 text-xs font-medium">
                        {formatHour(hour)}
                    </div>
                ))}
            </div>

            {/* Day Columns */}
            <div className="grid grid-cols-6 h-full">
                {days.map((day, dayIndex) => (
                    // --- MAKE THE ENTIRE DAY COLUMN CLICKABLE ---
                    <div 
                        key={dayIndex} 
                        className={`relative border-l border-slate-200 ${dayIndex === 0 ? 'border-l-0' : ''} cursor-pointer hover:bg-slate-50 transition-colors`}
                        onClick={() => onSelectDate && onSelectDate(day)} // <-- CALL onSelectDate
                    >
                        {appointments
                            .filter(appt => isSameDay(new Date(appt.date), day))
                            .map(appt => {
                                const startHour = parseInt(appt.startTime.split(':')[0], 10);
                                const startMinute = parseInt(appt.startTime.split(':')[1], 10);
                                const endHour = parseInt(appt.endTime.split(':')[0], 10);
                                const endMinute = parseInt(appt.endTime.split(':')[1], 10);
                                
                                const totalVisibleMinutes = 5 * 60; // 8 AM to 1 PM is 5 hours
                                const minutesFrom8AM = (startHour - 8) * 60 + startMinute;
                                
                                // Ensure top is not negative and is within bounds (0% to 100%)
                                const topPercent = Math.min(100, Math.max(0, (minutesFrom8AM / totalVisibleMinutes) * 100));

                                const durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
                                const heightPercent = (durationMinutes / totalVisibleMinutes) * 100;
                                
                                // Ensure height is positive and doesn't exceed remaining space
                                const calculatedHeight = Math.min(heightPercent, 100 - topPercent);

                                return (
                                    <div
                                        key={appt.id}
                                        className="absolute w-full px-1"
                                        style={{ 
                                            top: `${topPercent}%`, 
                                            height: `${Math.max(calculatedHeight, 8)}%` // Min height (e.g., 8% of 5h view)
                                        }}
                                    >
                                        <div 
                                            className={`h-full p-1.5 rounded-md flex flex-col justify-start shadow-md ${appt.colorClass} overflow-hidden`}
                                        >
                                            <p className="font-semibold text-[11px] leading-tight text-slate-800 break-words">{appt.title}</p>
                                            <p className="text-[10px] text-slate-600 mt-0.5">{appt.startTime} - {appt.endTime}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        {/* Grid lines */}
                        {hours.map(hour => (
                            <div key={`grid-${hour}`} className="h-20 border-t border-slate-200"></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekView;