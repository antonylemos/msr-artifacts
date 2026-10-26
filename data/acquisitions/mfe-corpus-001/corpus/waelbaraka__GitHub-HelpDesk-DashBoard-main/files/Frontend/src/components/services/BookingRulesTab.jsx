// src/components/services/BookingRulesTab.jsx
import React, { useState, useCallback } from 'react';
import { InformationCircleIcon, PlusIcon } from '@heroicons/react/24/solid';

const BookingRulesTab = () => {
    const [rules, setRules] = useState({
        minLeadTimeValue: 2,
        minLeadTimeUnit: 'hours',
        bookingHorizonValue: 90,
        bookingHorizonUnit: 'days',
        cancellationLeadTimeValue: 24,
        cancellationLeadTimeUnit: 'hours',
        reminders: [
            { id: 1, enabled: true, value: 24, unit: 'hours', template: 'Default 24h Reminder' },
            { id: 2, enabled: true, value: 1, unit: 'hours', template: 'Default 1h Reminder' },
        ]
    });

    const handleRuleChange = useCallback((field, value) => {
        setRules(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleReminderChange = useCallback((id, field, value) => {
        setRules(prev => ({
            ...prev,
            reminders: prev.reminders.map(r => r.id === id ? { ...r, [field]: value } : r)
        }));
    }, []);

    const handleSaveChanges = () => {
        alert("Booking rules saved!");
        console.log("Saving rules:", rules);
    };

    return (
        <div className="space-y-8">
            {/* Scheduling Window Section */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-200">
                    <h3 className="font-semibold text-gray-800">Scheduling Window</h3>
                    <p className="text-sm text-slate-500 mt-1">Control how far in advance or future patients can book.</p>
                </div>
                <div className="p-4 space-y-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-700">Patients must book at least</span>
                        <input type="number" value={rules.minLeadTimeValue} onChange={(e) => handleRuleChange('minLeadTimeValue', e.target.value)} className="w-20 p-1 border border-gray-300 rounded-md text-sm"/>
                        <select value={rules.minLeadTimeUnit} onChange={(e) => handleRuleChange('minLeadTimeUnit', e.target.value)} className="p-1 border border-gray-300 rounded-md text-sm">
                            <option value="minutes">minutes</option>
                            <option value="hours">hours</option>
                            <option value="days">days</option>
                        </select>
                        <span className="text-sm text-slate-700">in advance.</span>
                    </div>
                     <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-700">Patients can book up to</span>
                        <input type="number" value={rules.bookingHorizonValue} onChange={(e) => handleRuleChange('bookingHorizonValue', e.target.value)} className="w-20 p-1 border border-gray-300 rounded-md text-sm"/>
                        <select value={rules.bookingHorizonUnit} onChange={(e) => handleRuleChange('bookingHorizonUnit', e.target.value)} className="p-1 border border-gray-300 rounded-md text-sm">
                            <option value="days">days</option>
                            <option value="weeks">weeks</option>
                            <option value="months">months</option>
                        </select>
                        <span className="text-sm text-slate-700">in the future.</span>
                    </div>
                </div>
            </div>

            {/* Automated Reminders Section */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-200">
                    <h3 className="font-semibold text-gray-800">Automated Reminders</h3>
                    <p className="text-sm text-slate-500 mt-1">Set up automated WhatsApp reminders for upcoming appointments.</p>
                </div>
                <div className="p-4 space-y-3">
                    {rules.reminders.map(reminder => (
                        <div key={reminder.id} className="flex items-center space-x-3 text-sm text-slate-700">
                            <input type="checkbox" checked={reminder.enabled} onChange={(e) => handleReminderChange(reminder.id, 'enabled', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                            <span>Send reminder</span>
                            <input type="number" value={reminder.value} onChange={(e) => handleReminderChange(reminder.id, 'value', e.target.value)} className="w-20 p-1 border border-gray-300 rounded-md text-sm" disabled={!reminder.enabled}/>
                            <select value={reminder.unit} onChange={(e) => handleReminderChange(reminder.id, 'unit', e.target.value)} className="p-1 border border-gray-300 rounded-md text-sm" disabled={!reminder.enabled}>
                                <option value="minutes">minutes</option>
                                <option value="hours">hours</option>
                                <option value="days">days</option>
                            </select>
                            <span>before the appointment.</span>
                            <button className="text-blue-600 hover:underline text-xs" disabled={!reminder.enabled}>Edit Template</button>
                        </div>
                    ))}
                    <button className="text-sm text-blue-600 flex items-center pt-2"><PlusIcon className="w-4 h-4 mr-1"/>Add new reminder</button>
                </div>
            </div>

             {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-slate-200">
                <button onClick={handleSaveChanges} className="px-5 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
                    Save All Settings
                </button>
            </div>
        </div>
    );
};

export default BookingRulesTab;