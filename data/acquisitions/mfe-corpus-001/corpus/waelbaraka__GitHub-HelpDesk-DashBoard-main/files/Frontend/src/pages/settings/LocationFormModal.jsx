// src/components/settings/LocationFormModal.jsx
import React, { useState, useEffect } from 'react';

const LocationFormModal = ({ location, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: location?.name || '',
        address: location?.address || '',
        type: location?.type || 'physical', // 'physical', 'virtual_video', 'virtual_phone'
        contact: location?.contact || '',
        instructions: location?.instructions || '', // e.g., for virtual calls, "Link will be sent via SMS"
    });

    useEffect(() => {
        if (location) {
            setFormData({
                name: location.name || '',
                address: location.address || (location.type?.startsWith('virtual') ? (location.type === 'virtual_phone' ? 'Phone Call' : 'Video Call') : ''),
                type: location.type || 'physical',
                contact: location.contact || '',
                instructions: location.instructions || '',
            });
        } else { // Reset for new location
             setFormData({ name: '', address: '', type: 'physical', contact: '', instructions: ''});
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // If type changes to virtual, clear address or set default
        if (name === 'type') {
            if (value.startsWith('virtual')) {
                setFormData(prev => ({ ...prev, address: value === 'virtual_phone' ? 'Phone Call' : 'Video Call' }));
            } else if (prev.address === 'Video Call' || prev.address === 'Phone Call') {
                 setFormData(prev => ({ ...prev, address: '' }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...location, ...formData });
    };
    
    const isVirtual = formData.type.startsWith('virtual');

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">{location?.id ? 'Edit Location' : 'Add New Location'}</h3>
                    </div>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Location Name*</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="form-input mt-1"/>
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Location Type*</label>
                            <select name="type" id="type" value={formData.type} onChange={handleChange} required className="form-select mt-1">
                                <option value="physical">Physical Clinic/Room</option>
                                <option value="virtual_video">Virtual - Video Call</option>
                                <option value="virtual_phone">Virtual - Phone Call</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                {isVirtual ? 'Platform / Method' : 'Full Address*'}
                            </label>
                            <input 
                                type="text" name="address" id="address" 
                                value={formData.address} onChange={handleChange} 
                                required={!isVirtual}
                                placeholder={isVirtual ? (formData.type === 'virtual_phone' ? 'e.g., Provider will call patient' : 'e.g., Zoom, Google Meet') : 'Street, City, State, Zip'}
                                className="form-input mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                                {isVirtual ? 'Contact for Issues' : 'Main Phone Number'}
                            </label>
                            <input type="text" name="contact" id="contact" value={formData.contact} onChange={handleChange} className="form-input mt-1"/>
                        </div>
                         <div>
                            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                                Additional Instructions (Optional)
                            </label>
                            <textarea name="instructions" id="instructions" value={formData.instructions} onChange={handleChange} rows="2" className="form-textarea mt-1" placeholder={isVirtual ? 'e.g., A secure link will be sent 15 mins before.' : 'e.g., Parking available in Lot B.'}></textarea>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 flex justify-end space-x-2">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 text-sm">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">Save Location</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
// Ensure you have Tailwind Forms plugin for form-input, form-select, form-textarea classes
// If not, replace with standard Tailwind classes for inputs/selects/textareas
export default LocationFormModal;