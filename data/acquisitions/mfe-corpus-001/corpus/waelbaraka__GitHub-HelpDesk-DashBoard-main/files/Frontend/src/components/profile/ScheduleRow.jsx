import React from 'react';
import TimePicker from './TimePicker';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

// Helper to calculate duration
const calculateDuration = (start, end) => {
  if (!start || !end || start === '24:00') return { hours: 0, minutes: 0, display: '0h 0m' };
  
  const [startH, startM] = start.split(':').map(Number);
  let [endH, endM] = end.split(':').map(Number);

  if (end === '24:00') { // Handle midnight next day
    endH = 24;
    endM = 0;
  }
  
  let diffMinutes = (endH * 60 + endM) - (startH * 60 + startM);
  if (diffMinutes < 0) diffMinutes = 0; // Should not happen if end > start
  
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  return { hours, minutes, display: `${hours}h ${minutes}m` };
};


const DayScheduleRow = ({ dayData, onToggleDay, onSlotChange, onAddSlot, onRemoveSlot }) => {
  return (
    <div className={`p-4 rounded-md ${dayData.enabled ? 'bg-sky-50' : 'bg-gray-50'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={dayData.enabled}
            onChange={() => onToggleDay(dayData.day)}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className={`ml-3 font-medium ${dayData.enabled ? 'text-gray-800' : 'text-gray-500'}`}>
            {dayData.day}
          </span>
        </div>
        {!dayData.enabled && <span className="text-sm text-gray-500">No schedule</span>}
      </div>

      {dayData.enabled && (
        <div className="mt-3 space-y-3">
          <button 
            type="button" 
            className="text-xs text-blue-600 hover:underline mb-1"
            onClick={() => alert(`Copy hours from ${dayData.day} - Feature coming soon!`)}
          >
            Copy hours to...
          </button>
          {dayData.slots.map((slot, index) => {
            const duration = calculateDuration(slot.start, slot.end);
            return (
              <div key={index} className="flex items-center space-x-2 justify-between">
                <div className="flex items-center space-x-2">
                  <TimePicker
                    value={slot.start}
                    onChange={(e) => onSlotChange(dayData.day, index, 'start', e.target.value)}
                  />
                  <span className="text-sm text-gray-500">to</span>
                  <TimePicker
                    value={slot.end}
                    onChange={(e) => onSlotChange(dayData.day, index, 'end', e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 w-16 text-right">{duration.display}</span>
                    <button
                        type="button"
                        onClick={() => onRemoveSlot(dayData.day, index)}
                        className="p-1 text-gray-500 hover:text-red-600"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
              </div>
            );
          })}
          <div className="flex justify-end">
            <button
                type="button"
                onClick={() => onAddSlot(dayData.day)}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add interval
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayScheduleRow;