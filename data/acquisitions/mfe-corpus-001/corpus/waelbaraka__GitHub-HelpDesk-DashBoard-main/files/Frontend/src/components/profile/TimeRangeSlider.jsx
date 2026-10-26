import React, { useMemo } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

// Helper functions (timeToMinutes, minutesToDisplayTime, minutesToValueTime)
const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};
const minutesToDisplayTime = (totalMinutes) => {
  if (totalMinutes === 1440) return '12:00 am (next day)';
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const ampm = hours24 >= 12 && hours24 < 24 ? 'pm' : 'am';
  let hours12 = hours24 % 12;
  hours12 = hours12 === 0 ? 12 : hours12;
  return `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
};
const minutesToValueTime = (totalMinutes) => {
  if (totalMinutes === 1440) return '24:00';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const TimeRangeSlider = ({ value, onChange, disabled = false, step = 15 }) => {
  const minMinutes = 0;
  const maxMinutes = 24 * 60;

  const internalValue = useMemo(() => [
    value && value.start ? timeToMinutes(value.start) : minMinutes,
    value && value.end ? timeToMinutes(value.end) : maxMinutes,
  ], [value, minMinutes, maxMinutes]);

  const handleValueChange = (newValues) => {
    onChange({
      start: minutesToValueTime(newValues[0]),
      end: minutesToValueTime(newValues[1]),
    });
  };

  return (
    <div className={`w-full pt-3 pb-4 px-1 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <SliderPrimitive.Root
        className="relative flex items-center select-none touch-none w-full h-5 group"
        value={internalValue}
        onValueChange={handleValueChange}
        min={minMinutes}
        max={maxMinutes}
        step={step}
        minStepsBetweenThumbs={1}
        disabled={disabled}
        aria-label="Time range"
      >
        <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-[6px]">
          <SliderPrimitive.Range className="absolute bg-blue-500 rounded-full h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block w-4 h-4 bg-white shadow-md rounded-full border-2 border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-grab"
          aria-label={'Start time'}
        >
          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none">
            {minutesToDisplayTime(internalValue[0])}
          </div>
        </SliderPrimitive.Thumb>
        <SliderPrimitive.Thumb
          className="block w-4 h-4 bg-white shadow-md rounded-full border-2 border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-grab"
          aria-label={'End time'}
        >
          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none">
            {minutesToDisplayTime(internalValue[1])}
          </div>
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
      <div className="flex justify-between text-xs text-gray-600 mt-2 px-1">
        <span>{minutesToDisplayTime(internalValue[0])}</span>
        <span>{minutesToDisplayTime(internalValue[1])}</span>
      </div>
    </div>
  );
};
export default TimeRangeSlider;