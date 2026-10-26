// src/components/csr/SmartAvailabilityFinderModal.jsx
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { XMarkIcon, MagnifyingGlassIcon, CalendarDaysIcon, ClockIcon,ArrowPathIcon, UserCircleIcon, InformationCircleIcon  } from '@heroicons/react/24/solid';
import { CubeIcon } from '@heroicons/react/24/outline';



function getTimeOfDayFromTime(timeStr) {
    if (!timeStr || !timeStr.includes(':')) return 'any';
    const hour = parseInt(timeStr.split(':')[0], 10);
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening'; // Consider 'any' if no strict evening
}



    // Helper to convert "HH:MM" string to total minutes from midnight
const timeToMinutes = (timeStr) => {
    if (!timeStr || !timeStr.includes(':')) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};


const SmartAvailabilityFinderModal = ({ allServices, allProviders, onSlotSelected, onCancel , allAppointments,    initialSlotData 
 }) => {
    const [selectedServiceId, setSelectedServiceId] = useState(initialSlotData?.serviceId || '');
    const [selectedProviderId, setSelectedProviderId] = useState(initialSlotData?.providerId || 'any');
    const [preferredDate, setPreferredDate] = useState(initialSlotData?.date || new Date().toISOString().split('T')[0]);
    const [timeOfDay, setTimeOfDay] = useState(initialSlotData?.time ? getTimeOfDayFromTime(initialSlotData.time) : 'any');
    const [selectedServiceDetails, setSelectedServiceDetails] = useState(null);
    
    const [availableSlots, setAvailableSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchAttempted, setSearchAttempted] = useState(false);


      

// Helper to convert minutes from midnight back to "HH:MM"
const minutesToTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};



    const findSlots = useCallback(() => {
        if (!selectedServiceId) { alert("Please select a service."); return; }
        setIsLoading(true); setSearchAttempted(true); setAvailableSlots([]);

        const service = allServices.find(s => String(s.id) === selectedServiceId);
        if (!service) { setIsLoading(false); return; }
        const serviceDuration = service.duration || 30;

        setTimeout(() => { // Simulate API call
            const found = [];
            const targetSearchDate = new Date(preferredDate + "T00:00:00Z"); // Use Z for UTC
            const targetDayOfWeek = targetSearchDate.getDay(); // 0 for Sunday, 1 for Monday...

            const providersToConsider = selectedProviderId === 'any'
                ? allProviders.filter(p => p.id !== 'All')
                : allProviders.filter(p => String(p.id) === selectedProviderId);

            providersToConsider.forEach(provider => {
                const providerSchedule = provider.workingHours?.find(wh => wh.dayOfWeek === targetDayOfWeek);
                if (!providerSchedule) return; // Provider doesn't work on this day

                const scheduleStartMinutes = timeToMinutes(providerSchedule.start);
                const scheduleEndMinutes = timeToMinutes(providerSchedule.end);
                const breakStartMinutes = providerSchedule.breakStart ? timeToMinutes(providerSchedule.breakStart) : -1;
                const breakEndMinutes = providerSchedule.breakEnd ? timeToMinutes(providerSchedule.breakEnd) : -1;

                // Get existing appointments for this provider on this day
                const existingApptsOnDay = allAppointments.filter(appt =>
                    String(appt.providerId) === String(provider.id) &&
                    new Date(appt.date + "T00:00:00Z").toDateString() === targetSearchDate.toDateString() &&
                    appt.status !== 'Cancelled' // Don't consider cancelled appts as conflicts
                ).map(appt => ({
                    start: timeToMinutes(appt.time),
                    end: timeToMinutes(appt.time) + (appt.duration || 30) // Use actual duration if available
                })).sort((a,b) => a.start - b.start);


                // Iterate through provider's working day by 15-minute intervals
                for (let slotStartMinutes = scheduleStartMinutes; slotStartMinutes < scheduleEndMinutes; slotStartMinutes += 15) {
                    const slotEndMinutes = slotStartMinutes + serviceDuration;

                    // 1. Check if slot is within working hours
                    if (slotEndMinutes > scheduleEndMinutes) continue;

                    // 2. Check if slot is within break time
                    if (breakStartMinutes !== -1 && slotStartMinutes < breakEndMinutes && slotEndMinutes > breakStartMinutes) {
                        continue; 
                    }
                    
                    // 3. Check Time of Day Filter
                    const slotStartHour = Math.floor(slotStartMinutes / 60);
                    let passesTimeOfDayFilter = true;
                    if (timeOfDay === 'morning' && slotStartHour >= 12) passesTimeOfDayFilter = false;
                    if (timeOfDay === 'afternoon' && (slotStartHour < 12 || slotStartHour >= 17)) passesTimeOfDayFilter = false;
                    if (timeOfDay === 'evening' && slotStartHour < 17) passesTimeOfDayFilter = false;
                    if (!passesTimeOfDayFilter) continue;

                    // 4. Check for conflicts with existing appointments
                    let conflict = false;
                    for (const existingAppt of existingApptsOnDay) {
                        // Check for overlap: (SlotStart < ApptEnd) and (SlotEnd > ApptStart)
                        if (slotStartMinutes < existingAppt.end && slotEndMinutes > existingAppt.start) {
                            conflict = true;
                            break;
                        }
                    }
                    if (conflict) continue;
                    
                    // If all checks pass, it's an available slot
                    found.push({
                        date: targetSearchDate.toISOString().split('T')[0],
                        time: minutesToTime(slotStartMinutes),
                        providerId: provider.id,
                        providerName: provider.name,
                        providerType: provider.type,
                        serviceId: service.id,
                        serviceName: service.name,
                        duration: serviceDuration,
                    });

                    if (found.length >= 10) break; // Limit results for demo
                }
                if (found.length >= 10) return; // Break from provider loop if enough slots found
            });

            setAvailableSlots(found);
            setIsLoading(false);
        }, 700);
    }, [selectedServiceId, selectedProviderId, preferredDate, timeOfDay, allServices, allProviders, allAppointments]);

    useEffect(() => { // Auto-search effect
        if (initialSlotData?.providerId && initialSlotData?.date && selectedServiceId) {
            findSlots();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialSlotData, selectedServiceId]); // Note: findSlots is memoized via useCallback

    const handleServiceSelection = (serviceId) => { setSelectedServiceId(serviceId); const service = allServices.find(s => String(s.id) === serviceId); setSelectedServiceDetails(service || null); setAvailableSlots([]); setSearchAttempted(false);};
    const handleSelectSlot = (slot) => { onSlotSelected(slot); };

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
                <div className="p-5 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                        <MagnifyingGlassIcon className="w-5 h-5 mr-2 text-indigo-500"/> Find Available Slots
                    </h3>
                    <button onClick={onCancel} className="p-1 text-slate-400 hover:text-slate-600 rounded-full"><XMarkIcon className="w-5 h-5"/></button>
                </div>

                <div className="p-5 space-y-4 border-b border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        <div>
                            <label htmlFor="finder-serviceId" className="block text-xs font-medium text-slate-600 mb-1">Service*</label>
                            <select id="finder-serviceId" value={selectedServiceId} onChange={(e) => handleServiceSelection(e.target.value)} className="form-select w-full text-sm">
                                <option value="" disabled>Select a service</option>
                                {allServices.map(s => <option key={s.id} value={s.id}>{s.name} ({s.duration} min)</option>)}
                            </select>
                            {selectedServiceDetails?.preparationNotes && (
                                <div className="mt-2 p-2.5 bg-indigo-50 border border-indigo-200 rounded-md text-xs text-indigo-700">
                                    <div className="flex items-start"><InformationCircleIcon className="w-4 h-4 mr-1.5 mt-px flex-shrink-0"/><p><span className="font-medium">Prep:</span> {selectedServiceDetails.preparationNotes}</p></div>
                                </div>
                            )}
                        </div>
                        <div>
                            <label htmlFor="finder-providerId" className="block text-xs font-medium text-slate-600 mb-1">Provider/Resource</label>
                            <select id="finder-providerId" value={selectedProviderId} onChange={(e) => setSelectedProviderId(e.target.value)} className="form-select w-full text-sm">
                                <option value="any">Any Available</option>
                                {allProviders.map(p => <option key={p.id} value={p.id}>{p.name} ({p.type})</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="finder-preferredDate" className="block text-xs font-medium text-slate-600 mb-1">Preferred Date*</label>
                            <input type="date" id="finder-preferredDate" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className="form-input w-full text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="finder-timeOfDay" className="block text-xs font-medium text-slate-600 mb-1">Time of Day</label>
                            <select id="finder-timeOfDay" value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)} className="form-select w-full text-sm">
                                <option value="any">Any Time</option>
                                <option value="morning">Morning (9am-12pm)</option>
                                <option value="afternoon">Afternoon (12pm-5pm)</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={findSlots} disabled={isLoading || !selectedServiceId} className="w-full bg-indigo-600 text-white ... flex items-center justify-center">
            {isLoading && <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin"/>}
            {isLoading ? 'Searching...' : 'Find Slots'}
        </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-5 scrollbar-thin min-h-[200px]"> {/* Added min-h for consistent look */}
 {isLoading && (
            <div className="text-center py-10 text-slate-500 text-sm flex flex-col items-center">
                <ArrowPathIcon className="w-6 h-6 mb-2 animate-spin text-indigo-500"/>
                Searching for available slots...
            </div>
        )}                    {!isLoading && searchAttempted && availableSlots.length === 0 && (
                        <div className="text-center py-10 text-slate-500 text-sm">No slots found matching your criteria. Please try different options or a wider date range.</div>
                    )}
                    {!isLoading && availableSlots.length > 0 && (
                        <div className="space-y-2.5">
                            <h4 className="text-sm font-semibold text-slate-700 mb-1">Available Slots:</h4>
                            {availableSlots.map((slot, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => handleSelectSlot(slot)}
                                    className="w-full text-left p-3 border border-slate-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-400 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="font-semibold text-indigo-700 text-sm">{slot.time}</div>
                                        <div className="text-xs text-slate-500">{new Date(slot.date + "T00:00:00Z").toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                                    </div>
                                    <div className="text-xs text-slate-600 mt-1.5 flex items-center">
                                        {slot.providerType === 'resource' ? <CubeIcon className="w-3.5 h-3.5 inline-block mr-1.5 text-slate-400"/> : <UserCircleIcon className="w-3.5 h-3.5 inline-block mr-1.5 text-slate-400"/>}
                                        {slot.providerName}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                     {!isLoading && !searchAttempted && (
                         <div className="text-center py-10 text-slate-400 text-sm">Please select a service and click "Find Slots".</div>
                     )}
                </div>
            </div>
        </div>
    );
};



export default SmartAvailabilityFinderModal;