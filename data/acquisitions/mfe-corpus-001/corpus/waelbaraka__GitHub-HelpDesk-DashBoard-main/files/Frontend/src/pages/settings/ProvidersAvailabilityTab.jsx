// src/components/settings/ProvidersAvailabilityTab.jsx
import React, { useState, useCallback } from 'react';
import AvailabilityEditorModal from './AvailabilityEditorModal'; // We'll use the refined one

// Dummy data for providers (doctors and resources)
const initialProviders = [
  { id: 101, name: 'Dr. Jane Smith', type: 'doctor', specialty: 'General Practice', avatarBg: 'bg-blue-500', avatarInitial: 'JS', availability: { weekly: [{ day: 'Monday', start: '09:00', end: '17:00' }], overrides: [] } },
  { id: 701, name: 'Blood Pressure Kiosk Alpha', type: 'resource', specialty: 'Automated Screening', avatarBg: 'bg-sky-500', avatarInitial: 'BP', availability: { weekly: [{ day: 'Monday', start: '08:00', end: '18:00' }, { day: 'Tuesday', start: '08:00', end: '18:00' }], overrides: [{ date: '2024-12-25', is_unavailable: true }] } },
];

const ProvidersAvailabilityTab = () => {
    const [providers, setProviders] = useState(initialProviders);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);

    const handleManageAvailability = useCallback((provider) => {
        setSelectedProvider(provider);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedProvider(null);
    }, []);

    const handleSaveAvailability = useCallback((providerId, newAvailabilityData) => {
        console.log("Saving availability for", providerId, newAvailabilityData);
        setProviders(prev => prev.map(p => p.id === providerId ? { ...p, availability: newAvailabilityData } : p));
        handleCloseModal();
    }, [handleCloseModal]);

    const formatAvailabilitySummary = (availability) => {
        if (!availability || !availability.weekly || availability.weekly.length === 0) {
            return 'Not set';
        }
        const summary = availability.weekly.slice(0, 2).map(slot => `${slot.day.substring(0,3)}: ${slot.start}-${slot.end}`).join('; ');
        return availability.weekly.length > 2 ? `${summary}...` : summary;
    };

    return (
        <>
            {isModalOpen && selectedProvider && (
                <AvailabilityEditorModal
                    provider={selectedProvider}
                    initialAvailability={selectedProvider.availability || { weekly: [], overrides: [] }}
                    onSave={handleSaveAvailability}
                    onCancel={handleCloseModal}
                />
            )}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200">
                    <h3 className="font-semibold text-gray-800">Manage Provider & Resource Availability</h3>
                    <p className="text-sm text-slate-500 mt-1">Set default working hours and specific days off for staff and equipment.</p>
                </div>
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Availability Summary</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {providers.map(provider => (
                            <tr key={provider.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 ${provider.avatarBg} rounded-full flex items-center justify-center text-white text-xs font-semibold mr-3`}>{provider.avatarInitial}</div>
                                        <span className="text-sm font-medium text-slate-900">{provider.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 capitalize">{provider.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600" title={formatAvailabilitySummary(provider.availability)}>
                                    {formatAvailabilitySummary(provider.availability)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleManageAvailability(provider)} className="text-indigo-600 hover:text-indigo-800 font-semibold">
                                        Manage Schedule
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ProvidersAvailabilityTab;