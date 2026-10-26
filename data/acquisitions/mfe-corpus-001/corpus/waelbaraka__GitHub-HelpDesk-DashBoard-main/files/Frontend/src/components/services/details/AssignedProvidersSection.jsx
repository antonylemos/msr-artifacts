// src/components/services/details/AssignedProvidersSection.jsx
import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

// This component needs access to the full providers list to get details
const AssignedProvidersSection = ({ item: service, allProviders }) => {
    if (!service) return null;

    const assigned = (service.providerIds || []).map(id => 
        allProviders.find(p => p.id === id)
    ).filter(Boolean); // Filter out any undefined if a provider was deleted

    return (
        <div className="p-4">
            <h3 className="font-semibold text-slate-800 mb-3">Assigned Providers ({assigned.length})</h3>
            <div className="space-y-3">
                {assigned.length > 0 ? (
                    assigned.map(provider => (
                        <div key={provider.id} className="flex items-center">
                             <div className={`w-8 h-8 ${provider.avatarBg} rounded-full flex items-center justify-center text-white text-xs font-semibold mr-3`}>
                                {provider.avatarInitial}
                            </div>
                            <div>
                                <p className="font-medium text-sm text-slate-800">{provider.name}</p>
                                <p className="text-xs text-slate-500">{provider.specialty}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-slate-500 italic">No providers assigned to this service.</p>
                )}
                <button className="text-sm text-blue-600 hover:underline pt-2">
                    Manage Assignments
                </button>
            </div>
        </div>
    );
};

export default AssignedProvidersSection;