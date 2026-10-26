// src/components/services/details/ServiceInfoSection.jsx
import React from 'react';

const DetailRow = ({ label, value }) => (
    <div className="py-2 flex justify-between text-sm">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-800 font-medium text-right">{value}</span>
    </div>
);

const ServiceInfoSection = ({ item: service }) => {
    if (!service) return null;
    return (
        <div className="p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-2">{service.name}</h3>
            <p className="text-sm text-slate-600 mb-4">{service.description}</p>
            <div className="divide-y divide-slate-100">
                <DetailRow label="Duration" value={`${service.duration} min`} />
                <DetailRow label="Price" value={`$${service.price.toFixed(2)}`} />
                <DetailRow label="Status" value={service.status === 'active' ? 'Active' : 'Inactive'} />
            </div>
        </div>
    );
};

export default ServiceInfoSection;