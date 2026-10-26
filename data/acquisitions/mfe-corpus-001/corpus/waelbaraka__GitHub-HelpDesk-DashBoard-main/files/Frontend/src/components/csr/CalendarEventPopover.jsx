// src/components/csr/CalendarEventPopover.jsx
import React from 'react';
import { XCircleIcon,XMarkIcon , CheckCircleIcon, PencilSquareIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

const CalendarEventPopover = ({ 
    appointment, 
    onEdit, 
    onChangeStatus, 
    onCancelAppt, 
    onViewServiceDetails, // Handler to open the main ServiceDetailPopover
    onClose, 
    position 
}) => {
    if (!appointment) return null;

    const statusActions = [
        { label: 'Confirm', status: 'Confirmed', icon: CheckCircleIcon, color: 'text-blue-500', showIf: ['Pending'] },
        { label: 'Check-In', status: 'Checked-In', icon: CheckCircleIcon, color: 'text-teal-500', showIf: ['Confirmed'] },
        { label: 'Complete', status: 'Completed', icon: CheckCircleIcon, color: 'text-green-500', showIf: ['Checked-In', 'Confirmed'] },
        { label: 'No-Show', status: 'No-Show', icon: XCircleIcon, color: 'text-orange-500', showIf: ['Confirmed', 'Pending', 'Checked-In'] },
    ];
    const relevantStatusActions = statusActions.filter(action => action.showIf.includes(appointment.status));

    return (
        <div 
            className="absolute z-30 w-60 bg-white rounded-md shadow-xl border border-slate-200 p-3 text-xs animate-modalAppear" // Added animation
            style={{ top: position.y, left: position.x }}
            // onMouseLeave={onClose} // Can be added back if desired
        >
            <button onClick={onClose} className="absolute top-1 right-1 text-slate-400 hover:text-slate-600 p-1 rounded-full">
                <XMarkIcon className="w-4 h-4"/>
            </button>
            <div className="mb-2 pb-2 border-b border-slate-100">
                <p className="font-semibold text-slate-800 truncate pr-5">{appointment.patientName}</p>
                <p className="text-slate-500 truncate">{appointment.serviceName}</p>
                <p className="text-slate-500">{appointment.time} ({appointment.duration} min)</p>
            </div>
            <div className="space-y-1">
                <button onClick={() => { onEdit(appointment); onClose(); }} className="w-full text-left px-2 py-1.5 hover:bg-slate-100 rounded flex items-center text-slate-700 transition-colors"><PencilSquareIcon className="w-4 h-4 mr-2 text-blue-500"/>Edit / Reschedule</button>
                
                <button 
                    onClick={() => { onViewServiceDetails(appointment.serviceId); onClose(); }} 
                    className="w-full text-left px-2 py-1.5 hover:bg-slate-100 rounded flex items-center text-slate-700 transition-colors"
                >
                    <InformationCircleIcon className="w-4 h-4 mr-2 text-sky-500"/>View Service Info
                </button>
                
                <div className="my-1 border-t border-slate-100"></div>

                {relevantStatusActions.map(action => (
                     <button key={action.status} onClick={() => { onChangeStatus(appointment.id, action.status); onClose(); }} className="w-full text-left px-2 py-1.5 hover:bg-slate-100 rounded flex items-center text-slate-700 transition-colors"><action.icon className={`w-4 h-4 mr-2 ${action.color}`}/>{action.label}</button>
                ))}
                
                {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && appointment.status !== 'No-Show' && (
                    <>
                        <div className="my-1 border-t border-slate-100"></div>
                        <button onClick={() => { onCancelAppt(appointment.id); onClose(); }} className="w-full text-left px-2 py-1.5 hover:bg-red-50 rounded flex items-center text-red-600 transition-colors"><XCircleIcon className="w-4 h-4 mr-2"/>Cancel Appointment</button>
                    </>
                )}
            </div>
             <style jsx global>{`
                @keyframes modalAppear { /* Re-declare or ensure it's globally available */
                    from { opacity: 0; transform: translateY(10px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-modalAppear { animation: modalAppear 0.2s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default CalendarEventPopover;