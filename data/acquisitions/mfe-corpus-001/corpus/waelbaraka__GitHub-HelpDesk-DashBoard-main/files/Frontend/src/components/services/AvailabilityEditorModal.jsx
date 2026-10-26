// src/components/services/AvailabilityEditorModal.jsx
import React, { useState, useCallback } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AvailabilityEditorModal = ({ provider, onSave, onCancel }) => {
    // We manage a local copy of the schedule to avoid updating the main state on every change
    const [weeklySchedule, setWeeklySchedule] = useState(provider?.availability || []);
    const [overrides, setOverrides] = useState(provider?.overrides || []);

    const handleAddTimeSlot = (day) => {
        setWeeklySchedule(prev => [...prev, { day, start: '09:00', end: '17:00' }]);
    };

    const handleRemoveTimeSlot = (index) => {
        setWeeklySchedule(prev => prev.filter((_, i) => i !== index));
    };

    const handleTimeSlotChange = (index, field, value) => {
        setWeeklySchedule(prev => {
            const newSchedule = [...prev];
            newSchedule[index] = { ...newSchedule[index], [field]: value };
            return newSchedule;
        });
    };

    const handleSaveChanges = () => {
        onSave(provider.id, { weekly: weeklySchedule, overrides });
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Manage Availability for {provider.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Set the recurring weekly hours when this provider is available for bookings.</p>
                </div>

                <div className="p-6 flex-1 overflow-y-auto space-y-6">
                    {/* Weekly Schedule Section */}
                    <div>
                        <h4 className="font-medium text-gray-700 mb-3">Weekly Hours</h4>
                        <div className="space-y-4">
                            {daysOfWeek.map(day => (
                                <div key={day}>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">{day}</label>
                                    <div className="space-y-2">
                                        {weeklySchedule.filter(slot => slot.day === day).map((slot, index) => {
                                            const originalIndex = weeklySchedule.findIndex(s => s === slot);
                                            return (
                                                <div key={originalIndex} className="flex items-center space-x-2">
                                                    <input type="time" value={slot.start} onChange={(e) => handleTimeSlotChange(originalIndex, 'start', e.target.value)} className="p-1 border border-gray-300 rounded-md text-sm w-32" />
                                                    <span className="text-gray-500">-</span>
                                                    <input type="time" value={slot.end} onChange={(e) => handleTimeSlotChange(originalIndex, 'end', e.target.value)} className="p-1 border border-gray-300 rounded-md text-sm w-32" />
                                                    <button onClick={() => handleRemoveTimeSlot(originalIndex)} className="p-1 text-red-500 hover:bg-red-100 rounded-full"><TrashIcon className="w-4 h-4" /></button>
                                                </div>
                                            );
                                        })}
                                        <button onClick={() => handleAddTimeSlot(day)} className="flex items-center text-xs text-blue-600 hover:underline">
                                            <PlusIcon className="w-4 h-4 mr-1" /> Add time slot
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Overrides Section */}
                    <div>
                        <h4 className="font-medium text-gray-700 mb-3">Date Overrides (Holidays / Days Off)</h4>
                        <div className="p-4 bg-gray-50 rounded-md text-center text-sm text-gray-600">
                            <p>Feature coming soon.</p>
                            <p className="text-xs text-gray-500">Here you will be able to mark specific dates as unavailable.</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 flex justify-end space-x-2 border-t border-gray-200">
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                    <button type="button" onClick={handleSaveChanges} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default AvailabilityEditorModal;