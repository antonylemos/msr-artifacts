// src/components/services/ProviderFormModal.jsx
import React, { useState, useEffect } from 'react';

const ProviderFormModal = ({ provider, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: provider?.name || '',
        specialty: provider?.specialty || '',
        type: provider?.type || 'doctor', // Default to 'doctor'
        avatarBg: provider?.avatarBg || 'bg-gray-500',
        avatarUrl: provider?.avatarUrl || '', // For resource icons
    });

    useEffect(() => {
        if (provider) {
            setFormData({
                name: provider.name || '',
                specialty: provider.specialty || '',
                type: provider.type || 'doctor',
                avatarBg: provider.avatarBg || 'bg-gray-500',
                avatarUrl: provider.avatarUrl || '',
            });
        }
    }, [provider]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let submissionData = { ...formData };
        if (formData.type !== 'resource') {
            submissionData.avatarInitial = formData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        }
        onSave({ ...provider, ...submissionData });
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">{provider?.id ? 'Edit Entity' : 'Add New Entity'}</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Entity Type</label>
                            <select 
                                name="type" 
                                id="type" 
                                value={formData.type} 
                                onChange={handleChange} 
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="doctor">Doctor/Personnel</option>
                                <option value="consultant">Consultant</option>
                                <option value="resource">Resource/Equipment</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div>
                            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
                                {formData.type === 'resource' ? 'Resource Category / Location' : 'Specialty / Role'}
                            </label>
                            <input type="text" name="specialty" id="specialty" value={formData.specialty} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        {formData.type === 'resource' && (
                            <div>
                                <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">Icon URL (for Resource)</label>
                                <input type="text" name="avatarUrl" id="avatarUrl" placeholder="e.g., /icons/bp-monitor.png" value={formData.avatarUrl} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                        )}
                    </div>
                    <div className="p-4 bg-gray-50 flex justify-end space-x-2">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Entity</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProviderFormModal;