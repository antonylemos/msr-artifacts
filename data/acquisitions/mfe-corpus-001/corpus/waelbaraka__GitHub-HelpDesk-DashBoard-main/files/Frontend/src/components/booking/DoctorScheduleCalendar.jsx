// src/components/booking/DoctorScheduleCalendar.jsx
import React, { useState, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import WeekView from './WeekView';
import MonthView from './MonthView'; // <-- IMPORT MonthView
import DayView from './DayView';   // <-- IMPORT DayView

const DoctorScheduleCalendar = ({ appointments }) => {
    const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'
    const [currentDate, setCurrentDate] = useState(new Date(2022, 7, 8)); // August 8, 2022 (Monday)

     const handleDayHeaderClick = useCallback((date) => {
        setCurrentDate(date);
        setViewMode('day'); // Switch to DayView
    }, []);
    const handleDateSelect = useCallback((date) => {
        setCurrentDate(date);
        setViewMode('day');
    }, []);

    const handlePrev = useCallback(() => {
        setCurrentDate(prev => {
            const d = new Date(prev);
            if (viewMode === 'week') d.setDate(d.getDate() - 7);
            else if (viewMode === 'month') d.setMonth(d.getMonth() - 1);
            else d.setDate(d.getDate() - 1);
            return d;
        });
    }, [viewMode]);

    const handleNext = useCallback(() => {
        setCurrentDate(prev => {
            const d = new Date(prev);
            if (viewMode === 'week') d.setDate(d.getDate() + 7);
            else if (viewMode === 'month') d.setMonth(d.getMonth() + 1);
            else d.setDate(d.getDate() + 1);
            return d;
        });
    }, [viewMode]);

    const handleDateSelectFromMonth = useCallback((date) => {
        setCurrentDate(date);
        setViewMode('day'); // Switch to day view when a date is clicked in month view
    }, []);

      const getTitle = () => {
        const optionsMonthYear = { month: 'long', year: 'numeric' };
        const optionsDayMonthYear = { weekday: 'long', month: 'long', day: 'numeric' }; // Removed year for day view

        if (viewMode === 'month') return currentDate.toLocaleDateString('en-US', optionsMonthYear);
        if (viewMode === 'day') return currentDate.toLocaleDateString('en-US', optionsDayMonthYear);
        
        const start = new Date(currentDate);
        const day = start.getDay();
        const diff = start.getDate() - day + (day === 0 ? -6 : 1);
        start.setDate(diff);
        const end = new Date(start);
        end.setDate(start.getDate() + 5); // Week view is Mon-Sat
        
        if (start.getMonth() === end.getMonth()) {
            return `${start.getDate()} - ${end.getDate()}, ${start.toLocaleDateString('en-US', optionsMonthYear)}`;
        }
        return `${start.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})} - ${end.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}`;
    };
    
     const weekDaysForHeader = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(currentDate);
        const dayOfWeek = d.getDay();
        const diff = d.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        d.setDate(diff + i);
        return d;
    });
    
    const isToday = (date) => new Date().toDateString() === date.toDateString();

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6 shadow-sm"> {/* Added shadow, adjusted padding */}
            {/* Header */}
            <div className="flex justify-between items-center mb-5"> {/* Increased bottom margin */}
                <div className="flex items-center space-x-2">
                    <button onClick={handlePrev} className="p-1 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"><ChevronLeftIcon className="w-5 h-5"/></button>
                    <span className="font-semibold text-slate-800 text-base min-w-[220px] text-left">{getTitle()}</span> {/* Adjusted min-width */}
                    <button onClick={handleNext} className="p-1 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"><ChevronRightIcon className="w-5 h-5"/></button>
                </div>
                <div className="flex space-x-1 bg-slate-100 p-0.5 rounded-lg"> {/* Adjusted padding */}
                    {['day', 'week', 'month'].map(mode => (
                        <button key={mode} onClick={() => setViewMode(mode)} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${viewMode === mode ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-600 hover:bg-white/60'}`}> {/* Adjusted font size, hover */}
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Week Day Headers (Only for Week View) */}
            {viewMode === 'week' && (
                 <div className="grid grid-cols-[50px_1fr] mb-2.5">
                    <div></div> {/* Spacer for time column */}
                    <div className="grid grid-cols-6">
                        {weekDaysForHeader.map(day => (
                            // --- ADD onClick and cursor-pointer HERE ---
                            <div 
                                key={day.toISOString()} 
                                className="text-center py-1 cursor-pointer hover:bg-slate-100 rounded-md transition-colors"
                                onClick={() => handleDayHeaderClick(day)} // <-- Call the new handler
                            >
                                <p className="text-[11px] text-slate-400 font-medium">{day.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</p>
                                <p className={`font-bold text-lg mt-0.5 ${isToday(day) ? 'text-teal-500' : 'text-slate-700'}`}>{day.getDate()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
           
            {/* Calendar Grid */}
            {viewMode === 'week' && <WeekView startDate={weekDaysForHeader[0]} appointments={appointments} onSelectDate={handleDateSelect}  />}
            {viewMode === 'month' && <MonthView currentDate={currentDate} appointments={appointments} onSelectDate={handleDateSelectFromMonth} />}
            {viewMode === 'day' && <DayView selectedDate={currentDate} appointments={appointments} />}
        </div>
    );
};

export default DoctorScheduleCalendar;