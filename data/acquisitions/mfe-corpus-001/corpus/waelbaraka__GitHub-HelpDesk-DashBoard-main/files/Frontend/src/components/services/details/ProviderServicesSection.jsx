// src/components/services/details/ProviderServicesSection.jsx
import React from 'react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';

// This component needs both the provider (item) and the full list of services
const ProviderServicesSection = ({ item: provider, allServices }) => {
    if (!provider || !allServices) return null;

    const assignedServices = allServices.filter(service => 
        (service.assignedProviderIds || []).includes(provider.id)
    );

    return (
        <div className="p-4">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-slate-400"/>
                Assigned Services ({assignedServices.length})
            </h3>
            <div className="space-y-2">
                {assignedServices.length > 0 ? (
                    assignedServices.map(service => (
                        <div key={service.id} className="p-2 bg-slate-50 rounded-md text-sm">
                            <p className="font-medium text-slate-700">{service.name}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-slate-500 italic">This provider is not assigned to any services.</p>
                )}
            </div>
        </div>
    );
};

export default ProviderServicesSection;