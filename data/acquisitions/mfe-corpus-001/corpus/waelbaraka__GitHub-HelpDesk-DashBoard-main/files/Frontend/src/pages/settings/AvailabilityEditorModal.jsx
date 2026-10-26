// src/components/settings/AvailabilityEditorModal.jsx
import React, { useState, useCallback } from 'react';
import { PlusIcon, TrashIcon, CalendarDaysIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/solid';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AvailabilityEditorModal = ({ provider, initialAvailability, onSave, onCancel }) => {
    const [weeklySchedule, setWeeklySchedule] = useState(initialAvailability.weekly || []);
    const [overrides, setOverrides] = useState(initialAvailability.overrides || []);
    
    const [newOverrideDate, setNewOverrideDate] = useState('');
    const [newOverrideType, setNewOverrideType] = useState('unavailable'); // 'unavailable' or 'custom_hours'
    const [newOverrideStart, setNewOverrideStart] = useState('09:00');
    const [newOverrideEnd, setNewOverrideEnd] = useState('17:00');

    const handleAddTimeSlot = (day) => {
        setWeeklySchedule(prev => [...prev, { day, start: '09:00', end: '17:00' }]);
    };
    const handleRemoveTimeSlot = (index) => setWeeklySchedule(prev => prev.filter((_, i) => i !== index));
    const handleTimeSlotChange = (index, field, value) => {
        setWeeklySchedule(prev => prev.map((slot, i) => i === index ? { ...slot, [field]: value } : slot));
    };

    const handleAddOverride = () => {
        if (!newOverrideDate) return; // Basic validation
        const newOverride = {
            date: newOverrideDate,
            is_unavailable: newOverrideType === 'unavailable',
            start_time: newOverrideType === 'custom_hours' ? newOverrideStart : undefined,
            end_time: newOverrideType === 'custom_hours' ? newOverrideEnd : undefined,
        };
        setOverrides(prev => [...prev, newOverride]);
        setNewOverrideDate(''); // Reset form
    };
    const handleRemoveOverride = (index) => setOverrides(prev => prev.filter((_, i) => i !== index));

    const handleSaveChanges = () => onSave(provider.id, { weekly: weeklySchedule, overrides });

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Edit Schedule for {provider.name}</h3>
                </div>

                <div className="p-6 flex-1 overflow-y-auto space-y-8 scrollbar-thin">
                    {/* Weekly Recurring Hours */}
                    <section>
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center"><ClockIcon className="w-5 h-5 mr-2 text-slate-400"/>Weekly Recurring Hours</h4>
                        <div className="space-y-4">
                            {daysOfWeek.map(day => (
                                <div key={day} className="p-3 border border-slate-200 rounded-md">
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">{day}</label>
                                    <div className="space-y-2">
                                        {weeklySchedule.filter(slot => slot.day === day).map((slot, index) => {
                                            const originalIndex = weeklySchedule.findIndex(s => s === slot); // Find index in original array
                                            return (
                                                <div key={originalIndex} className="flex items-center space-x-2">
                                                    <input type="time" value={slot.start} onChange={(e) => handleTimeSlotChange(originalIndex, 'start', e.target.value)} className="form-input rounded-md text-sm w-28"/>
                                                    <span className="text-gray-500">-</span>
                                                    <input type="time" value={slot.end} onChange={(e) => handleTimeSlotChange(originalIndex, 'end', e.target.value)} className="form-input rounded-md text-sm w-28"/>
                                                    <button onClick={() => handleRemoveTimeSlot(originalIndex)} className="p-1 text-red-500 hover:bg-red-100 rounded-full"><TrashIcon className="w-4 h-4" /></button>
                                                </div>
                                            );
                                        })}
                                        <button onClick={() => handleAddTimeSlot(day)} className="flex items-center text-xs text-indigo-600 hover:underline font-medium">
                                            <PlusIcon className="w-3 h-3 mr-1" /> Add time slot for {day}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Date Overrides / Specific Days Off */}
                    <section>
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center"><CalendarDaysIcon className="w-5 h-5 mr-2 text-slate-400"/>Date Overrides (Holidays, Special Hours)</h4>
                        <div className="space-y-3 mb-4">
                            {overrides.map((override, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-md text-sm">
                                    <span>{override.date}: {override.is_unavailable ? "Unavailable" : `${override.start_time} - ${override.end_time}`}</span>
                                    <button onClick={() => handleRemoveOverride(index)} className="text-red-400 hover:text-red-600"><XCircleIcon className="w-5 h-5"/></button>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 border border-dashed border-slate-300 rounded-md space-y-3">
                            <h5 className="text-sm font-medium text-slate-600">Add New Override:</h5>
                            <input type="date" value={newOverrideDate} onChange={(e) => setNewOverrideDate(e.target.value)} className="form-input rounded-md text-sm w-full"/>
                            <select value={newOverrideType} onChange={(e) => setNewOverrideType(e.target.value)} className="form-select rounded-md text-sm w-full">
                                <option value="unavailable">Mark as Unavailable</option>
                                <option value="custom_hours">Set Custom Hours</option>
                            </select>
                            {newOverrideType === 'custom_hours' && (
                                <div className="flex items-center space-x-2">
                                    <input type="time" value={newOverrideStart} onChange={(e) => setNewOverrideStart(e.target.value)} className="form-input rounded-md text-sm w-full"/>
                                    <span className="text-gray-500">-</span>
                                    <input type="time" value={newOverrideEnd} onChange={(e) => setNewOverrideEnd(e.target.value)} className="form-input rounded-md text-sm w-full"/>
                                </div>
                            )}
                            <button onClick={handleAddOverride} className="w-full bg-indigo-500 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-600">Add Override</button>
                        </div>
                    </section>
                </div>

                <div className="p-4 bg-gray-50 flex justify-end space-x-2 border-t border-gray-200">
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 text-sm">Cancel</button>
                    <button type="button" onClick={handleSaveChanges} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">Save Schedule</button>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityEditorModal;