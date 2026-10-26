// src/components/appointments/calendar/AppointmentCalendar.jsx
import React, { useState, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

import MonthViewGrid from './MonthViewGrid';
import WeekViewGrid from './WeekViewGrid';
import DayViewGrid from './DayViewGrid';
import { getStartOfWeek } from '../utils'; // Import utils

const AppointmentCalendar = React.memo(({ viewMode, onViewModeChange, appointments, onSelectCalendarDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const formatDateRange = useCallback((mode, date) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        if (mode === 'day') {
            return date.toLocaleDateString('en-US', options);
        } else if (mode === 'week') {
            const startOfWeek = getStartOfWeek(date);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            const endOptions = { day: 'numeric', year: 'numeric' };
            if (startOfWeek.getMonth() !== endOfWeek.getMonth() || startOfWeek.getFullYear() !== endOfWeek.getFullYear()) {
                endOptions.month = 'short';
            }
            if (startOfWeek.getFullYear() !== endOfWeek.getFullYear()) {
                endOptions.year = 'numeric';
            }
            return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', endOptions)}`;
        } else { // month
            return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }
    }, []);

    const navigateDate = useCallback((direction) => {
        const newDate = new Date(currentDate);
        if (viewMode === 'day') {
            newDate.setDate(newDate.getDate() + direction);
        } else if (viewMode === 'week') {
            newDate.setDate(newDate.getDate() + (direction * 7));
        } else { // month
            newDate.setMonth(newDate.getMonth() + direction);
        }
        setCurrentDate(newDate);
    }, [currentDate, viewMode]);

    const goToToday = useCallback(() => {
      setCurrentDate(new Date());
    }, []);

    return (
        // FIX: Removed bg-white, rounded-lg, border, shadow-sm
        <div className="mb-6"> {/* Removed mb-6 here too, let parent div manage overall spacing */}
            <div className="flex justify-between items-center mb-4">
                {/* Date Navigation */}
                <div className="flex items-center space-x-2">
                    <button onClick={() => navigateDate(-1)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
                        <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <span className="text-lg font-semibold text-slate-800">{formatDateRange(viewMode, currentDate)}</span>
                    <button onClick={() => navigateDate(1)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
                        <ChevronRightIcon className="w-5 h-5" />
                    </button>
                    <button onClick={goToToday} className="ml-4 px-3 py-1.5 border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 rounded-md text-sm font-medium">
                        Today
                    </button>
                </div>

                {/* View Mode Switcher */}
                <div className="flex space-x-1 bg-gray-100 p-0.5 rounded-md">
                    {['day', 'week', 'month'].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => onViewModeChange(mode)} // Uses prop handler
                            className={`px-3 py-1 text-xs font-medium rounded capitalize
                                ${viewMode === mode ? 'bg-white text-slate-800' : 'text-slate-600 hover:bg-gray-200'}`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            {/* Render the appropriate calendar grid based on viewMode */}
            {viewMode === 'month' && (
                <MonthViewGrid
                    currentDate={currentDate}
                    appointments={appointments}
                    onSelectDate={(date) => {
                        setCurrentDate(date); // Update internal state
                        onViewModeChange('day'); // Switch to day view
                        onSelectCalendarDate(date); // Notify parent of selected date
                    }}
                />
            )}
            {viewMode === 'week' && (
                <WeekViewGrid
                    currentDate={currentDate}
                    appointments={appointments}
                    onSelectDate={(date) => {
                        setCurrentDate(date); // Update internal state
                        onViewModeChange('day'); // Switch to day view
                        onSelectCalendarDate(date); // Notify parent of selected date
                    }}
                />
            )}
            {viewMode === 'day' && (
                <DayViewGrid
                    currentDate={currentDate}
                    appointments={appointments}
                    onSelectDate={(date) => {
                        onSelectCalendarDate(date); // Notify parent of selected date
                    }}
                />
            )}
        </div>
    );
});

export default AppointmentCalendar;