// src/components/profile/DayScheduleRow.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TimeRangeSlider from './TimeRangeSlider';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const calculateDuration = (start, end) => {
  if (!start || !end) return { hours: 0, minutes: 0, display: '0h 0m' };
  const [startH, startM] = start.split(':').map(Number);
  let [endH, endM] = end.split(':').map(Number);
  if (end === '24:00') { endH = 24; endM = 0; }
  let diffMinutes = (endH * 60 + endM) - (startH * 60 + startM);
  if (diffMinutes < 0) diffMinutes = 0;
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  return { hours, minutes, display: `${hours}h ${minutes}m` };
};

// --- Helper component for a single time slot ---
const TimeSlot = React.memo(({ dayName, slotIndex, slotData, onSlotChange, onRemoveSlot, disabled }) => {
  const timeRangeValue = useMemo(() => ({
    start: slotData.start,
    end: slotData.end
  }), [slotData.start, slotData.end]);

  const handleTimeRangeChange = useCallback((newTimeRange) => {
    onSlotChange(dayName, slotIndex, newTimeRange);
  }, [onSlotChange, dayName, slotIndex]);

  const duration = useMemo(() => calculateDuration(slotData.start, slotData.end), [slotData.start, slotData.end]);

  return (
    <div className="pt-1 pb-2">
      <TimeRangeSlider
        value={timeRangeValue} // Pass memoized value
        onChange={handleTimeRangeChange} // Pass memoized handler
        step={15}
        disabled={disabled}
      />

      
      <div className="flex justify-end items-center mt-1 pr-1">
        <div className='flex items-center space-x-2'>
          <span className="text-sm text-gray-600 w-16 text-right">{duration.display}</span>
          <button
            type="button"
            onClick={() => onRemoveSlot(dayName, slotIndex)}
            disabled={disabled}
            className="p-1 text-gray-500 hover:text-red-600 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
});
// --- End TimeSlot helper component ---

const DayScheduleRow = ({ dayData, onToggleDay, onSlotChange, onAddSlot, onRemoveSlot, disabled, onCopyHours }) => {
  return (
    <div className={`p-4 rounded-md ${dayData.enabled ? 'bg-sky-50' : 'bg-gray-50'} ${disabled ? 'opacity-70' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={dayData.enabled}
            onChange={() => onToggleDay(dayData.day)}
            disabled={disabled}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
          />
          <span className={`ml-3 font-medium ${dayData.enabled ? 'text-gray-800' : 'text-gray-500'} ${disabled ? 'text-gray-400' : ''}`}>
            {dayData.day}
          </span>
        </div>
        {!dayData.enabled && <span className="text-sm text-gray-500">No schedule</span>}
      </div>

      {dayData.enabled && (
        <div className="space-y-1">
          
          {dayData.slots.map((slot, index) => (
            <TimeSlot
              key={index}
              dayName={dayData.day}
              slotIndex={index}
              slotData={slot}
              onSlotChange={onSlotChange}
              onRemoveSlot={onRemoveSlot}
              disabled={disabled}
            />
          ))}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => onAddSlot(dayData.day)}
              disabled={disabled}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <PlusIcon className="w-4 h-4 mr-1" /> Add interval
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default DayScheduleRow;
