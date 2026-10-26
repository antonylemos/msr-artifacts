// src/components/services/AssignProviderModal.jsx
import React, { useState, useCallback } from 'react';

const AssignProviderModal = ({ service, allProviders, onSave, onCancel }) => {
    // Initialize the state with the IDs of providers already assigned to this service
    const [selectedProviderIds, setSelectedProviderIds] = useState(new Set(service.providerIds || []));

    const handleToggleProvider = useCallback((providerId) => {
        setSelectedProviderIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(providerId)) {
                newSet.delete(providerId);
            } else {
                newSet.add(providerId);
            }
            return newSet;
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert the Set back to an array for saving
        onSave(service.id, Array.from(selectedProviderIds));
    };

    
    return (
        <div className="fixed inset-0 bg-black/50 z-50 ...">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    {/* ... (Header remains the same) ... */}
                    <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
                        {allProviders.map(provider => (
                            <label key={provider.id} className="flex items-center p-3 rounded-md hover:bg-slate-50 border border-slate-200 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedProviderIds.has(provider.id)}
                                    onChange={() => handleToggleProvider(provider.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                {/* --- VISUAL CUE FOR TYPE --- */}
                                {provider.type === 'resource' ? (
                                    provider.avatarUrl ? 
                                        <img src={provider.avatarUrl} alt={provider.name} className="w-8 h-8 object-contain mx-3" /> 
                                        : <CubeIcon className="w-8 h-8 text-slate-400 mx-3" />
                                ) : (
                                    <div className={`w-8 h-8 ${provider.avatarBg} rounded-full flex items-center justify-center text-white text-xs font-semibold mx-3`}>
                                        {provider.avatarInitial}
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium text-sm text-slate-800">{provider.name}</p>
                                    <p className="text-xs text-slate-500">{provider.specialty}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                    {/* ... (Footer buttons remain the same) ... */}
                </form>
            </div>
        </div>
    );
};
// handleToggleProvider and handleSubmit from previous steps
export default AssignProviderModal;