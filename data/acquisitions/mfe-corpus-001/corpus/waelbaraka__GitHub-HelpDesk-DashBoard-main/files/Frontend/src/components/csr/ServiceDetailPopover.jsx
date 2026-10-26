// src/components/csr/ServiceDetailPopover.jsx
import React from 'react';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

const ServiceDetailPopover = ({ service, onClose }) => {
    if (!service) return null;

    return (
        // Fixed position, centered, with backdrop
        <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out" 
            onClick={onClose} // Click on backdrop closes
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-detail-popover-title"
        >
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalAppear"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside popover
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-slate-200">
                    <h4 id="service-detail-popover-title" className="font-semibold text-lg text-indigo-700 flex items-center">
                        <InformationCircleIcon className="w-6 h-6 mr-2"/>
                        {service.name} - Details
                    </h4>
                    <button 
                        onClick={onClose} 
                        className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                        aria-label="Close service details"
                    >
                        <XMarkIcon className="w-5 h-5"/>
                    </button>
                </div>
                
                {/* Content */}
                <div className="p-5 space-y-3 text-sm max-h-[70vh] overflow-y-auto scrollbar-thin">
                    {service.description && (
                        <div>
                            <p className="font-medium text-slate-500">Description:</p> 
                            <p className="text-slate-700 mt-0.5 whitespace-pre-wrap">{service.description}</p>
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2">
                        <div>
                            <p className="font-medium text-slate-500">Duration:</p>
                            <p className="text-slate-700">{service.duration || 'N/A'} minutes</p>
                        </div>
                        <div>
                            <p className="font-medium text-slate-500">Price:</p>
                            <p className="text-slate-700">${typeof service.price === 'number' ? service.price.toFixed(2) : 'N/A'}</p>
                        </div>
                    </div>
                    
                    {service.preparationNotes && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                            <p className="font-semibold text-slate-600 mb-1">Patient Preparation Instructions:</p>
                            <p className="text-slate-700 whitespace-pre-wrap bg-slate-50 p-3 rounded-md border border-slate-200">{service.preparationNotes}</p>
                        </div>
                    )}
                     {!service.preparationNotes && (
                         <div className="mt-3 pt-3 border-t border-slate-200">
                             <p className="font-semibold text-slate-600">Patient Preparation Notes:</p>
                             <p className="text-slate-400 italic mt-1">None specified for this service.</p>
                         </div>
                     )}
                </div>

                {/* Footer (Optional Close Button) */}
                 <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
                     <button 
                        onClick={onClose} 
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-medium transition-colors"
                    >
                        Close
                    </button>
                 </div>
            </div>
            {/* Add a simple appear animation (optional) */}
            <style jsx global>{`
                @keyframes modalAppear {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-modalAppear { animation: modalAppear 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default ServiceDetailPopover;