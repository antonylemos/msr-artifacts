// src/components/booking/DayView.jsx
import React, { useState, useEffect } from 'react';

// Helper to format time (e.g., 8 -> "08 AM")
const formatHour = (hour) => {
    const h = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 || hour === 24 ? 'AM' : 'PM'; // Handle midnight and noon correctly
    return `${String(h).padStart(2, '0')} ${ampm}`;
};

const DayView = ({ selectedDate, appointments }) => {
    // Displaying from 8 AM to 8 PM (12 full hour slots)
    const START_HOUR = 8;
    const END_HOUR = 20; // Up to, but not including 8 PM (ends at 19:59)
    const totalHoursVisible = END_HOUR - START_HOUR;

    const hours = Array.from({ length: totalHoursVisible }, (_, i) => i + START_HOUR); 
    
    const dayAppointments = appointments.filter(
        appt => new Date(appt.date).toDateString() === selectedDate.toDateString()
    );

    // "Now" Indicator Logic
    const [nowLinePosition, setNowLinePosition] = useState(null);
    useEffect(() => {
        const updateNowLine = () => {
            const now = new Date();
            if (new Date(selectedDate).toDateString() === now.toDateString()) {
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();
                if (currentHour >= START_HOUR && currentHour < END_HOUR) {
                    const minutesFromStart = (currentHour - START_HOUR) * 60 + currentMinute;
                    const totalDayMinutes = totalHoursVisible * 60;
                    setNowLinePosition((minutesFromStart / totalDayMinutes) * 100);
                } else {
                    setNowLinePosition(null); // Outside visible hours
                }
            } else {
                setNowLinePosition(null); // Not today
            }
        };
        updateNowLine();
        const interval = setInterval(updateNowLine, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [selectedDate, totalHoursVisible]);


    const slotHeightRem = 4; // e.g., h-16 (4rem) for each hour slot

    return (
        <div className="grid grid-cols-[60px_1fr] text-sm relative border-t border-slate-200"> {/* Wider time column */}
            {/* Time Column */}
            <div className="pr-2 text-right">
                {hours.map(hour => (
                    <div 
                        key={`time-${hour}`} 
                        className="flex items-start justify-end text-slate-400 text-xs font-medium -mt-[7px]" // Negative margin to align with line
                        style={{ height: `${slotHeightRem}rem` }}
                    >
                        <span className="pt-1">{formatHour(hour)}</span>
                    </div>
                ))}
            </div>

            {/* Event Column */}
            <div className="relative border-l border-slate-200">
                 {/* Grid lines for each hour slot */}
                 {hours.map(hour => (
                    <div 
                        key={`gridline-${hour}`} 
                        className="border-t border-slate-200"
                        style={{ height: `${slotHeightRem}rem` }}
                    ></div>
                ))}

                {/* "Now" Indicator Line */}
                {nowLinePosition !== null && (
                    <div 
                        className="absolute left-0 w-full h-0.5 bg-red-500 z-10"
                        style={{ top: `${nowLinePosition}%`}}
                    >
                        <div className="absolute -left-1.5 -top-1 w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                )}

                {/* Render appointments for this day */}
                {dayAppointments.map(appt => {
                    const startHour = parseInt(appt.startTime.split(':')[0], 10);
                    const startMinute = parseInt(appt.startTime.split(':')[1], 10);
                    const endHour = parseInt(appt.endTime.split(':')[0], 10);
                    const endMinute = parseInt(appt.endTime.split(':')[1], 10);
                    
                    // Calculations are based on minutes from the START_HOUR
                    const totalDayMinutes = totalHoursVisible * 60;
                    const minutesFromStartHour = (startHour - START_HOUR) * 60 + startMinute;
                    
                    const topPercent = Math.min(100, Math.max(0, (minutesFromStartHour / totalDayMinutes) * 100));

                    const durationMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
                    const heightPercent = (durationMinutes / totalDayMinutes) * 100;
                    
                    const calculatedHeight = Math.min(heightPercent, 100 - topPercent); // Don't overflow bottom
                    const minHeightForEvent = (15 / totalDayMinutes) * 100; // Minimum height for a 15-min event


                    return (
                        <div
                            key={appt.id}
                            className="absolute w-full px-1.5 z-5" // Ensure events are above the "now" line slightly
                            style={{ 
                                top: `${topPercent}%`,
                                height: `${Math.max(calculatedHeight, minHeightForEvent)}%`
                            }}
                        >
                            <div 
                                className={`h-full p-2 rounded-md flex flex-col justify-start shadow-md ${appt.colorClass} overflow-hidden`}
                            >
                                <p className="font-semibold text-xs leading-tight text-slate-900 break-words">{appt.title}</p>
                                <p className="text-[10px] text-slate-700 mt-0.5">{appt.startTime} - {appt.endTime}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DayView;