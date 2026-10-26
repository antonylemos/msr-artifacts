// src/components/services/ProvidersTab.jsx
import React, { useState, useCallback } from 'react';
import AvailabilityEditorModal from './AvailabilityEditorModal';
import DetailSidebar from './details/DetailSidebar'; // <-- CORRECTED IMPORT PATH
import ProviderInfoSection from './details/ProviderInfoSection';
import ProviderServicesSection from './details/ProviderServicesSection';

// Note: This component now needs `allServices` passed as a prop for the detail view
const ProvidersTab = ({ providers, setProviders, allServices }) => {
    const [isAvailModalOpen, setIsAvailModalOpen] = useState(false);
    const [providerForAvail, setProviderForAvail] = useState(null);

    const [selectedProviderForDetails, setSelectedProviderForDetails] = useState(null);

    const handleManageAvailability = useCallback((provider) => {
        setProviderForAvail(provider);
        setIsAvailModalOpen(true);
    }, []);

    const handleCloseAvailModal = useCallback(() => {
        setIsAvailModalOpen(false);
        setProviderForAvail(null);
    }, []);

    const handleSaveAvailability = useCallback((providerId, newAvailability) => {
        setProviders(prev => prev.map(p => p.id === providerId ? { ...p, availability: newAvailability.weekly } : p));
        handleCloseAvailModal();
    }, [setProviders, handleCloseAvailModal]);

    // Handlers for the details sidebar
    const handleRowClick = useCallback((provider) => {
        setSelectedProviderForDetails(provider);
    }, []);

    const handleCloseDetailSidebar = useCallback(() => {
        setSelectedProviderForDetails(null);
    }, []);

    const formatAvailability = (availability) => {
        if (!availability || availability.length === 0) return 'Not set';
        return `${availability.length} schedule block(s) defined`;
    };

    return (
        <>
            {isAvailModalOpen && (
                <AvailabilityEditorModal
                    provider={providerForAvail}
                    onSave={handleSaveAvailability}
                    onCancel={handleCloseAvailModal}
                />
            )}

            <DetailSidebar
                title="Provider Details"
                selectedItem={selectedProviderForDetails}
                onClose={handleCloseDetailSidebar}
            >
                <ProviderInfoSection />
                <ProviderServicesSection allServices={allServices} />
            </DetailSidebar>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200">
                    <h3 className="font-semibold text-gray-800">Providers & Availability</h3>
                    <p className="text-sm text-slate-500 mt-1">Click a provider to see details, or manage their schedule.</p>
                </div>
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Provider</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Availability Summary</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {providers.map(provider => (
                            <tr key={provider.id} onClick={() => handleRowClick(provider)} className="hover:bg-slate-50 cursor-pointer">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className={`w-10 h-10 ${provider.avatarBg} rounded-full flex items-center justify-center text-white font-semibold mr-4`}>{provider.avatarInitial}</div>
                                        <div>
                                            <div className="text-sm font-medium text-slate-900">{provider.name}</div>
                                            <div className="text-xs text-slate-500">{provider.specialty}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600" title={formatAvailability(provider.availability)}>
                                    {formatAvailability(provider.availability)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={(e) => { e.stopPropagation(); handleManageAvailability(provider); }} className="text-blue-600 hover:text-blue-800 font-semibold">
                                        Manage Availability
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

export default ProvidersTab;