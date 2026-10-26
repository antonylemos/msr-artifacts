import React from 'react';

const generateTimeOptions = (interval = 30) => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const hh = hour.toString().padStart(2, '0');
      const mm = minute.toString().padStart(2, '0');
      const time = `${hh}:${mm}`;
      
      // Format for display (e.g., 08:00 AM)
      let displayHour = hour % 12;
      if (displayHour === 0) displayHour = 12; // 00:00 is 12 AM, 12:00 is 12 PM
      const ampm = hour < 12 || hour === 24 ? 'am' : 'pm'; // Handle 24:00 as 12am next day for end time logic
      const displayTime = `${displayHour.toString().padStart(2, '0')}:${mm} ${ampm}`;
      
      times.push({ value: time, label: displayTime });
    }
  }
  // Add 24:00 for end time selection (represents midnight of the next day for ranges)
  times.push({ value: '24:00', label: '12:00 am (next day)' });
  return times;
};

const TimePicker = ({ value, onChange, disabled = false }) => {
  const timeOptions = React.useMemo(() => generateTimeOptions(), []);

  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-36 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
    >
      {timeOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default TimePicker;