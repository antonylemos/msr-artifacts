// src/components/booking/EntityCard.jsx (Renamed from DoctorCard.jsx)
import React from 'react';
import { StarIcon, CubeIcon } from '@heroicons/react/24/solid'; // Added CubeIcon

const EntityCard = ({ entity, isSelected, onSelect }) => {
    const isResource = entity.type === 'resource';

    return (
        <button
            onClick={() => onSelect(entity)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200
                ${isSelected ? 'border-indigo-500 bg-indigo-50 shadow-lg' : 'border-transparent hover:bg-slate-50'}`}
        >
            <div className="flex space-x-4">
                {isResource ? (
                    entity.avatarUrl ? 
                        <img src={entity.avatarUrl} alt={entity.name} className="w-16 h-16 rounded-md object-contain p-1 bg-slate-100" /> 
                        : <CubeIcon className="w-16 h-16 text-slate-400 p-3 bg-slate-100 rounded-md" />
                ) : (
                    <img src={entity.avatarUrl} alt={entity.name} className="w-16 h-16 rounded-full object-cover" />
                )}
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-slate-800">{entity.name}</h3>
                            <p className="text-xs text-slate-500">{entity.specialty} {!isResource && entity.experience ? `• ${entity.experience}` : ''}</p>
                        </div>
                        {!isResource && entity.rating && (
                            <div className="flex items-center space-x-1 text-yellow-500">
                                <StarIcon className="w-4 h-4" />
                                <span className="text-sm font-bold text-slate-700">{entity.rating.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                    {!isResource && entity.availability && (
                        <div className="text-xs text-slate-600 mt-2 space-y-1">
                            {entity.availability.map((line, i) => <p key={i}>• {line}</p>)}
                        </div>
                    )}
                    {isResource && (
                        <p className="text-xs text-slate-600 mt-2">Available for booking.</p>
                    )}
                </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between items-center">
                <span className="text-xs font-medium text-slate-500">{isResource ? "Service Fee" : entity.consultationType}</span>
                <span className="text-sm font-bold text-slate-800">
                    {entity.priceRange ? `$${entity.priceRange.min} - $${entity.priceRange.max}` : 'Check Availability'}
                </span>
            </div>
        </button>
    );
};

export default EntityCard;