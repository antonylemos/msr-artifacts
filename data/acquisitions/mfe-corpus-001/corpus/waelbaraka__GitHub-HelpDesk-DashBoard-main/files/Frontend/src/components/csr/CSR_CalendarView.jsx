// src/components/csr/CSR_CalendarView.jsx
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { 
    ChevronLeftIcon, 
    ChevronRightIcon, 
    UserCircleIcon as UserIconOutline 
} from '@heroicons/react/24/solid'; 
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import CalendarEventPopover from './CalendarEventPopover';
import toast from 'react-hot-toast'; // For unavailable slot messages

// Helper to check if two dates are on the same day
const isSameDay = (d1, d2) => 
    d1.getFullYear() === d2.getFullYear() && 
    d1.getMonth() === d2.getMonth() && 
    d1.getDate() === d2.getDate();

// Helper to format time (e.g., 8 -> "08 AM")
const formatHour = (hour) => {
    const h = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 || hour === 24 ? 'AM' : 'PM';
    return `${String(h).padStart(2, '0')} ${ampm}`;
};

// Helper to convert "HH:MM" string to total minutes from midnight
const timeToMinutes = (timeStr) => {
    if (!timeStr || !timeStr.includes(':')) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

const CSR_CalendarView = ({ 
    appointments, 
    providers, 
    services, 
    onOpenFinderForSlot, 
    onEditAppointment, 
    onChangeStatus, 
    onCancelAppointment, 
    onViewServiceDetails 
}) => {
    const [currentDate, setCurrentDate] = useState(new Date()); // This is the component's local current date
    const [selectedProviders, setSelectedProviders] = useState(
        providers.filter(p => p.id !== 'All' && p.type === 'doctor').slice(0, 3).map(p => p.id)
    );
    
    const [popoverData, setPopoverData] = useState(null);
    const calendarGridRef = useRef(null);

    const handlePrevWeek = useCallback(() => setCurrentDate(d => { const newD = new Date(d); newD.setDate(d.getDate() - 7); return newD; }), []);
    const handleNextWeek = useCallback(() => setCurrentDate(d => { const newD = new Date(d); newD.setDate(d.getDate() + 7); return newD; }), []);
    const goToToday = useCallback(() => setCurrentDate(new Date()), []);

    const handleProviderSelectionChange = (providerId) => {
        setSelectedProviders(prev => 
            prev.includes(providerId) ? prev.filter(id => id !== providerId) : [...prev, providerId]
        );
    };
    
    // --- DATE CALCULATIONS MOVED INSIDE AND USING LOCAL `currentDate` ---
    const startOfWeek = useMemo(() => {
        const d = new Date(currentDate); // Use local currentDate state
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
        return new Date(d.setDate(diff));
    }, [currentDate]);

    const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(d.getDate() + i);
        return d;
    }), [startOfWeek]);
    
    const timeSlotIntervalMinutes = 60;
    const pixelsPerHour = 80; 
    const timeSlotsToDisplay = Array.from({ length: 12 }, (_, i) => 8 + i); // 8 AM to 7 PM

    const getTitleForHeader = () => {
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        const optionsMonthYear = { month: 'long', year: 'numeric' };
        if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
            return `${startOfWeek.getDate()} - ${endOfWeek.getDate()}, ${startOfWeek.toLocaleDateString('en-US', optionsMonthYear)}`;
        }
        return `${startOfWeek.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})} - ${endOfWeek.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}`;
    };

    const isToday = (date) => new Date().toDateString() === date.toDateString();
    // --- END OF DATE CALCULATIONS ---


    const getAppointmentsForDayAndProvider = (providerId, date) => appointments.filter(appt => String(appt.providerId) === String(providerId) && isSameDay(new Date(appt.date), date));
    const displayedProviders = useMemo(() => providers.filter(p => p.id !== 'All' && selectedProviders.includes(p.id)), [providers, selectedProviders]);
    
     const statusColorsAndText = { Pending: { bg: 'bg-slate-400', text: 'text-white', border: 'border-slate-500' }, Confirmed: { bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-600' }, 'Checked-In': { bg: 'bg-teal-500', text: 'text-white', border: 'border-teal-600' }, Completed: { bg: 'bg-green-600', text: 'text-white', border: 'border-green-700' }, Cancelled: { bg: 'bg-yellow-400', text: 'text-yellow-900', border: 'border-yellow-500' }, 'No-Show': { bg: 'bg-red-600', text: 'text-white', border: 'border-red-700' }, Default: {bg: 'bg-gray-300', text: 'text-gray-800', border: 'border-gray-400'}};

    

   const handleAppointmentBlockClick = (appt, event) => { event.stopPropagation(); if (calendarGridRef.current) { const gridRect = calendarGridRef.current.getBoundingClientRect(); const clickX = event.clientX - gridRect.left; const clickY = event.clientY - gridRect.top; setPopoverData({ appointment: appt, position: { x: clickX + 10, y: clickY + 10 }}); } else { onEditAppointment(appt); }};
    const handleClosePopover = () => { setPopoverData(null); };

    const getSlotWorkingState = (providerId, date, hour) => {
        const provider = providers.find(p => String(p.id) === String(providerId));
        if (!provider || !provider.workingHours) return 'working';
        const dayOfWeek = date.getDay();
        const dailySchedule = provider.workingHours.find(wh => wh.dayOfWeek === dayOfWeek);
        if (!dailySchedule) return 'off';
        const slotStartMinutes = hour * 60;
        const slotEndMinutes = (hour + 1) * 60;
        const workStartMinutes = timeToMinutes(dailySchedule.start);
        const workEndMinutes = timeToMinutes(dailySchedule.end);
        if (slotStartMinutes < workStartMinutes || slotStartMinutes >= workEndMinutes) return 'off';
        if (dailySchedule.breakStart && dailySchedule.breakEnd) { const breakStartMinutes = timeToMinutes(dailySchedule.breakStart); const breakEndMinutes = timeToMinutes(dailySchedule.breakEnd); if ((slotStartMinutes >= breakStartMinutes && slotStartMinutes < breakEndMinutes) || (slotEndMinutes > breakStartMinutes && slotEndMinutes <= breakEndMinutes) || (slotStartMinutes < breakStartMinutes && slotEndMinutes > breakEndMinutes)) return 'break';}
        return 'working';
    };

    return (
        <div className="bg-white rounded-lg shadow border border-slate-200 flex flex-col h-full">
            {/* Calendar Header */}
            <div className="p-4 border-b border-slate-200 flex-shrink-0">
                <div className="flex flex-wrap justify-between items-center gap-y-3">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                        <button onClick={handlePrevWeek} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"><ChevronLeftIcon className="w-5 h-5"/></button>
                        <span className="font-semibold text-slate-700 text-sm sm:text-base text-center min-w-[200px] sm:min-w-[240px]">
                            {getTitleForHeader()} {/* Use local title generation */}
                        </span>
                        <button onClick={handleNextWeek} className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"><ChevronRightIcon className="w-5 h-5"/></button>
                        <button onClick={goToToday} className="ml-1 sm:ml-2 px-2 sm:px-3 py-1.5 border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">Today</button>
                    </div>
                    {/* Provider Filter Dropdown ... (same as before) ... */}
                    <div className="relative group"> {/* ... */} </div>
                </div>
                 <div className={`grid gap-px border-t border-slate-200 mt-3`} style={{gridTemplateColumns: `60px repeat(${Math.max(1, displayedProviders.length)}, minmax(150px, 1fr))`}}>
                    <div className="py-1 text-xs font-medium text-slate-500"></div> {/* Time Gutter */}
                    {displayedProviders.map(provider => (
                        <div key={`header-${provider.id}`} className="py-1.5 text-center text-xs font-medium text-slate-600 truncate border-l border-slate-200" title={provider.name}>
                            {provider.name}
                            <div className="text-[10px] text-slate-400">{provider.specialty}</div>
                        </div>
                    ))}
                    {displayedProviders.length === 0 && <div className="py-1 text-center text-xs font-medium text-slate-400 italic col-span-1 border-l border-slate-200">Select providers</div>}
                </div>
            </div>

            {/* Calendar Grid (Logic remains the same, using local weekDays) */}
            <div className="flex-1 overflow-auto scrollbar-thin" ref={calendarGridRef}>
                <div className={`grid gap-px relative`} style={{gridTemplateColumns: `60px repeat(${Math.max(1, displayedProviders.length)}, minmax(150px, 1fr))`}}>
                    <div className="sticky left-0 bg-white z-10">
                        {timeSlotsToDisplay.map(hour => (
                            <div key={`time-${hour}`} className="h-20 pr-2 flex items-start justify-end pt-1 text-slate-400 text-xs font-medium border-r border-slate-200">
                                {formatHour(hour)}
                            </div>
                        ))}
                    </div>

                    {displayedProviders.map(provider => (
                        <div key={`provider-col-${provider.id}`} className="relative">
                            {weekDays.map((day) => { // weekDays is now correctly calculated locally
                                const dayAppointments = getAppointmentsForDayAndProvider(provider.id, day);
                                return (
                                    <div key={`day-${day.toISOString()}-${provider.id}`} className={`relative border-r border-slate-200 h-full`}>
                                        {timeSlotsToDisplay.map((hour) => {
                                            const slotState = getSlotWorkingState(provider.id, day, hour);
                                            return (<div key={`slot-${hour}-${day.toISOString()}-${provider.id}`} className={`h-20 border-t border-slate-200 p-0.5 transition-colors ${slotState === 'working' ? 'hover:bg-indigo-50/70 cursor-pointer' : (slotState === 'break' ? 'bg-yellow-50/60 cursor-not-allowed' : 'bg-slate-100 cursor-not-allowed')}`} onClick={() => { if (slotState === 'working') { const apptsInSlot = getAppointmentsForDayAndProvider(provider.id, day).filter(a=>parseInt(a.time.split(':')[0]) === hour); if(apptsInSlot.length === 0) onOpenFinderForSlot({ providerId: provider.id, providerName: provider.name, date: day.toISOString().split('T')[0], time: `${String(hour).padStart(2,'0')}:00` }); } else { toast.error(`Slot unavailable: ${provider.name} is ${slotState === 'off' ? 'not working' : 'on break'}.`, {duration: 2000}); }}} title={slotState === 'working' ? `Find slot for ${provider.name}...` : `Unavailable (${slotState})`}></div>);
                                        })}
                                        {dayAppointments.map(appt => { 
                                            const service = services.find(s => String(s.id) === String(appt.serviceId));
                                            const apptDuration = appt.duration || service?.duration || timeSlotIntervalMinutes;
                                            const startHourCal = parseInt(appt.time.split(':')[0]);
                                            const startMinuteCal = parseInt(appt.time.split(':')[1]);
                                            const topOffset = ((startHourCal - 8) * pixelsPerHour) + ((startMinuteCal / 60) * pixelsPerHour);
                                            const blockHeight = (apptDuration / timeSlotIntervalMinutes) * pixelsPerHour;
                                            const styling = statusColorsAndText[appt.status] || statusColorsAndText['Default'];
                                            return ( <div key={appt.id} onClick={(e) => handleAppointmentBlockClick(appt, e)} className={`${styling.bg} ${styling.text} ${styling.border} border-l-4 text-[10px] p-1.5 rounded-md absolute left-0.5 right-0.5 leading-tight shadow-sm hover:brightness-110 cursor-pointer overflow-hidden z-[5]`} style={{ top: `${topOffset}px`, height: `${Math.max(blockHeight - 2, 18)}px` }} title={`${appt.patientName} - ${appt.serviceName}\nStatus: ${appt.status}\nTime: ${appt.time}\nClick for actions`}> <p className="font-semibold truncate">{appt.patientName}</p> <p className="truncate">{appt.serviceName}</p> <p className="text-[9px] opacity-75 truncate">{apptDuration} min</p> <p className="text-[9px] font-bold opacity-90 mt-0.5 truncate">{appt.status}</p> </div> );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                    {displayedProviders.length === 0 && <div className="col-span-1 border-l border-slate-200 h-full"></div>}
                </div>
            </div>
            {popoverData && <CalendarEventPopover appointment={popoverData.appointment} onEdit={onEditAppointment} onChangeStatus={onChangeStatus} onCancelAppt={onCancelAppointment} onViewServiceDetails={onViewServiceDetails} onClose={handleClosePopover} position={popoverData.position}/>}
        </div>
    );
};
export default CSR_CalendarView;