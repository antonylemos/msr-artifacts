// src/components/settings/GlobalBookingRulesTab.jsx
import React, { useState, useCallback } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/solid'; // For tooltips/info icons

const GlobalBookingRulesTab = () => {
    // Initialize with default or fetched values
    const [rules, setRules] = useState({
        minLeadTimeValue: 2,
        minLeadTimeUnit: 'hours', // 'minutes', 'hours', 'days'
        bookingHorizonValue: 90,
        bookingHorizonUnit: 'days', // 'days', 'weeks', 'months'
        
        allowCancellation: true,
        cancellationLeadTimeValue: 24,
        cancellationLeadTimeUnit: 'hours',
        
        allowReschedule: true,
        rescheduleLeadTimeValue: 24,
        rescheduleLeadTimeUnit: 'hours',

        defaultBufferBefore: 0, // minutes
        defaultBufferAfter: 5,  // minutes
    });

    const handleRuleChange = useCallback((field, value) => {
        setRules(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleToggleChange = useCallback((field) => {
        setRules(prev => ({ ...prev, [field]: !prev[field] }));
    }, []);
    
    const handleSaveChanges = () => {
        // In a real app, this would be an API call
        console.log("Saving Global Booking Rules:", rules);
        alert("Global Booking Rules saved!");
    };

    const TimeUnitSelector = ({ value, onChange, units = ['minutes', 'hours', 'days'] }) => (
        <select value={value} onChange={onChange} className="form-select rounded-md text-sm w-28 border-slate-300">
            {units.map(unit => (
                <option key={unit} value={unit}>{unit.charAt(0).toUpperCase() + unit.slice(1)}</option>
            ))}
        </select>
    );

    return (
        <div className="space-y-8 max-w-3xl mx-auto"> {/* Centered and max-width for better readability */}
            {/* Scheduling Window Section */}
            <section className="bg-white p-6 rounded-lg shadow border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">Scheduling Window</h3>
                <p className="text-sm text-slate-500 mb-4">Define how far in advance or into the future appointments can be booked.</p>
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <label htmlFor="minLeadTimeValue" className="text-sm text-slate-700 w-64 shrink-0">Minimum lead time for booking:</label>
                        <input type="number" id="minLeadTimeValue" min="0" value={rules.minLeadTimeValue} onChange={(e) => handleRuleChange('minLeadTimeValue', parseInt(e.target.value,10))} className="form-input rounded-md text-sm w-20 border-slate-300"/>
                        <TimeUnitSelector value={rules.minLeadTimeUnit} onChange={(e) => handleRuleChange('minLeadTimeUnit', e.target.value)} />
                    </div>
                     <div className="flex items-center space-x-3">
                        <label htmlFor="bookingHorizonValue" className="text-sm text-slate-700 w-64 shrink-0">Patients can book up to:</label>
                        <input type="number" id="bookingHorizonValue" min="1" value={rules.bookingHorizonValue} onChange={(e) => handleRuleChange('bookingHorizonValue', parseInt(e.target.value,10))} className="form-input rounded-md text-sm w-20 border-slate-300"/>
                        <TimeUnitSelector value={rules.bookingHorizonUnit} onChange={(e) => handleRuleChange('bookingHorizonUnit', e.target.value)} units={['days', 'weeks', 'months']}/>
                        <span className="text-sm text-slate-700">in advance.</span>
                    </div>
                </div>
            </section>

            {/* Cancellation & Rescheduling Section */}
            <section className="bg-white p-6 rounded-lg shadow border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">Cancellation & Rescheduling</h3>
                <p className="text-sm text-slate-500 mb-4">Set policies for when patients can cancel or reschedule their appointments.</p>
                <div className="space-y-4">
                    {/* Cancellation */}
                    <div className="flex items-center space-x-3">
                        <input type="checkbox" id="allowCancellation" checked={rules.allowCancellation} onChange={() => handleToggleChange('allowCancellation')} className="form-checkbox h-4 w-4 text-indigo-600 rounded border-slate-300"/>
                        <label htmlFor="allowCancellation" className="text-sm text-slate-700">Allow patients to cancel appointments</label>
                    </div>
                    {rules.allowCancellation && (
                        <div className="pl-7 flex items-center space-x-3">
                            <label htmlFor="cancellationLeadTimeValue" className="text-sm text-slate-700 w-56 shrink-0">If yes, up to:</label>
                            <input type="number" id="cancellationLeadTimeValue" min="0" value={rules.cancellationLeadTimeValue} onChange={(e) => handleRuleChange('cancellationLeadTimeValue', parseInt(e.target.value,10))} className="form-input rounded-md text-sm w-20 border-slate-300"/>
                            <TimeUnitSelector value={rules.cancellationLeadTimeUnit} onChange={(e) => handleRuleChange('cancellationLeadTimeUnit', e.target.value)} />
                            <span className="text-sm text-slate-700">before appointment.</span>
                        </div>
                    )}
                    {/* Rescheduling */}
                     <div className="flex items-center space-x-3 pt-2">
                        <input type="checkbox" id="allowReschedule" checked={rules.allowReschedule} onChange={() => handleToggleChange('allowReschedule')} className="form-checkbox h-4 w-4 text-indigo-600 rounded border-slate-300"/>
                        <label htmlFor="allowReschedule" className="text-sm text-slate-700">Allow patients to reschedule appointments</label>
                    </div>
                    {rules.allowReschedule && (
                        <div className="pl-7 flex items-center space-x-3">
                            <label htmlFor="rescheduleLeadTimeValue" className="text-sm text-slate-700 w-56 shrink-0">If yes, up to:</label>
                            <input type="number" id="rescheduleLeadTimeValue" min="0" value={rules.rescheduleLeadTimeValue} onChange={(e) => handleRuleChange('rescheduleLeadTimeValue', parseInt(e.target.value,10))} className="form-input rounded-md text-sm w-20 border-slate-300"/>
                            <TimeUnitSelector value={rules.rescheduleLeadTimeUnit} onChange={(e) => handleRuleChange('rescheduleLeadTimeUnit', e.target.value)} />
                             <span className="text-sm text-slate-700">before appointment.</span>
                        </div>
                    )}
                </div>
            </section>

            {/* Appointment Buffers Section */}
            <section className="bg-white p-6 rounded-lg shadow border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-1">Appointment Buffers</h3>
                <p className="text-sm text-slate-500 mb-4">Set default buffer times before and after appointments to allow for preparation or cleanup.</p>
                <div className="space-y-4">
                     <div className="flex items-center space-x-3">
                        <label htmlFor="defaultBufferBefore" className="text-sm text-slate-700 w-64 shrink-0">Default buffer time before appointment:</label>
                        <input type="number" id="defaultBufferBefore" min="0" value={rules.defaultBufferBefore} onChange={(e) => handleRuleChange('defaultBufferBefore', parseInt(e.target.value,10))} className="form-input rounded-md text-sm w-20 border-slate-300"/>
                        <span className="text-sm text-slate-700">minutes.</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <label htmlFor="defaultBufferAfter" className="text-sm text-slate-700 w-64 shrink-0">Default buffer time after appointment:</label>
                        <input type="number" id="defaultBufferAfter" min="0" value={rules.defaultBufferAfter} onChange={(e) => handleRuleChange('defaultBufferAfter', parseInt(e.target.value,10))} className="form-input rounded-md text-sm w-20 border-slate-300"/>
                        <span className="text-sm text-slate-700">minutes.</span>
                    </div>
                </div>
            </section>

             {/* Save Button */}
            <div className="pt-6 flex justify-end">
                <button onClick={handleSaveChanges} className="px-6 py-2.5 bg-indigo-600 text-white rounded-md font-semibold text-sm hover:bg-indigo-700 transition-colors">
                    Save Global Rules
                </button>
            </div>
        </div>
    );
};

export default GlobalBookingRulesTab;