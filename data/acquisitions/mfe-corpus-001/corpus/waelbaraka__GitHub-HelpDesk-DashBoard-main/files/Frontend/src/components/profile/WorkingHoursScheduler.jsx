import React, { useState, useEffect, useCallback, useMemo } from 'react';
import DayScheduleRow from './DayScheduleRow';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import isEqual from 'lodash.isequal';

const initialDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WorkingHoursScheduler = ({ initialSchedule = [], onScheduleChange, onCancel, disabled = false }) => {
  const [schedule, setSchedule] = useState(() => {
    const initialMap = new Map((initialSchedule || []).filter(d => d && d.day).map(d => [d.day, d]));
    return initialDays.map(dayName =>
      initialMap.get(dayName) || { day: dayName, enabled: false, slots: [] }
    );
  });

  const [copyFromDay, setCopyFromDay] = useState('Monday');
  const [copyToDays, setCopyToDays] = useState([]);

  useEffect(() => {
    const newScheduleBasedOnProp = initialDays.map(dayName => {
      const dayFromProp = (initialSchedule || []).find(d => d && d.day === dayName);
      return dayFromProp || { day: dayName, enabled: false, slots: [] };
    });

    if (!isEqual(schedule, newScheduleBasedOnProp)) {
      setSchedule(newScheduleBasedOnProp);
    }
  }, [initialSchedule]);

  useEffect(() => {
    if (typeof onScheduleChange === 'function') {
      onScheduleChange(schedule);
    }
  }, [schedule, onScheduleChange]);

  const totalWeeklyHours = useMemo(() => {
    let totalMinutes = 0;
    schedule.forEach(day => {
      if (day.enabled) {
        day.slots.forEach(slot => {
          if (!slot.start || !slot.end) return;
          const [startH, startM] = slot.start.split(':').map(Number);
          let [endH, endM] = slot.end.split(':').map(Number);
          if (slot.end === '24:00') { endH = 24; endM = 0; }
          const diff = (endH * 60 + endM) - (startH * 60 + startM);
          if (diff > 0) totalMinutes += diff;
        });
      }
    });
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }, [schedule]);

  const handleToggleDay = useCallback((dayName) => {
    setSchedule(prev => prev.map(d =>
      d.day === dayName ? { ...d, enabled: !d.enabled, slots: !d.enabled ? [{ start: '09:00', end: '17:00' }] : [] } : d
    ));
  }, []);

  const handleSlotChange = useCallback((dayName, slotIndex, newTimeRangeObject) => {
    setSchedule(prev => prev.map(d =>
      d.day === dayName ? { ...d, slots: d.slots.map((s, i) => i === slotIndex ? { ...newTimeRangeObject } : s) } : d
    ));
  }, []);

  const handleAddSlot = useCallback((dayName) => {
    setSchedule(prev => prev.map(d =>
      d.day === dayName ? { ...d, slots: [...d.slots, { start: '09:00', end: '17:00' }] } : d
    ));
  }, []);

  const handleRemoveSlot = useCallback((dayName, slotIndex) => {
    setSchedule(prev => prev.map(d =>
      d.day === dayName ? { ...d, slots: d.slots.filter((_, i) => i !== slotIndex) } : d
    ));
  }, []);

  const copyDaySlotsToOtherDays = useCallback(() => {
    setSchedule(prev =>
      prev.map(day => {
        if (copyToDays.includes(day.day) && day.day !== copyFromDay) {
          const sourceDay = prev.find(d => d.day === copyFromDay);
          return {
            ...day,
            enabled: sourceDay?.enabled ?? false,
            slots: sourceDay?.slots.map(slot => ({ ...slot })) || [],
          };
        }
        return day;
      })
    );
  }, [copyFromDay, copyToDays]);

  const handleToDayToggle = (day) => {
    setCopyToDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className={`p-6 bg-white rounded-lg border border-gray-200 shadow-sm ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}>
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center text-sm text-gray-600">
          <GlobeAltIcon className="w-5 h-5 mr-2 text-gray-400" /> Timezone: Always base on agent's location
        </div>
        <div className="text-sm font-medium text-gray-800">Total: <span className="text-blue-600">{totalWeeklyHours}</span></div>
      </div>

      <div className="space-y-3">
        {schedule.map(dayData => (
          <DayScheduleRow
            key={dayData.day}
            dayData={dayData}
            onToggleDay={handleToggleDay}
            onSlotChange={handleSlotChange}
            onAddSlot={handleAddSlot}
            onRemoveSlot={handleRemoveSlot}
            disabled={disabled}
          />
        ))}
      </div>

      {/* Copy Controls */}
      <div className="mt-8 border-t pt-4">
        <div className="text-sm font-medium text-gray-800 mb-2">Copy hours</div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
          <label className="text-sm text-gray-700">
            From:
            <select
              className="ml-2 border border-gray-300 rounded px-2 py-1"
              value={copyFromDay}
              onChange={(e) => setCopyFromDay(e.target.value)}
            >
              {initialDays.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </label>

          <div className="flex flex-wrap gap-3">
            {initialDays.map(day => (
              <label key={day} className="text-sm text-gray-700 flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={copyToDays.includes(day)}
                  onChange={() => handleToDayToggle(day)}
                  disabled={day === copyFromDay}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={copyDaySlotsToOtherDays}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          type="button"
          onClick={onCancel}
          disabled={disabled}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WorkingHoursScheduler;
