// src/components/settings/LocationsManagementTab.jsx
import React, { useState, useCallback } from 'react';
import LocationFormModal from './LocationFormModal'; // We'll create this next
import { PlusIcon, PencilIcon, TrashIcon, GlobeAltIcon, PhoneIcon as PhoneSolidIcon } from '@heroicons/react/24/solid';

const initialLocations = [
    { id: 1, name: 'Main Hospital Campus', address: '123 Health St, Medville, MD', type: 'physical', contact: '555-0101' },
    { id: 2, name: 'Downtown Urgent Care', address: '456 Wellness Ave, Medville, MD', type: 'physical', contact: '555-0102' },
    { id: 3, name: 'Telemedicine (Video Call)', address: 'Online', type: 'virtual_video', contact: 'N/A - Link Provided' },
    { id: 4, name: 'Telemedicine (Phone Call)', address: 'Phone', type: 'virtual_phone', contact: 'Provider will call patient' },
];

const LocationsManagementTab = () => {
    const [locations, setLocations] = useState(initialLocations);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState(null);

    const handleOpenModal = useCallback((location = null) => {
        setEditingLocation(location);
        setIsModalOpen(true);
    }, []);
    const handleCloseModal = useCallback(() => {
        setEditingLocation(null);
        setIsModalOpen(false);
    }, []);

    const handleSaveLocation = useCallback((locationData) => {
        setLocations(prev => {
            if (locationData.id) {
                return prev.map(loc => loc.id === locationData.id ? locationData : loc);
            }
            return [...prev, { ...locationData, id: Date.now() }];
        });
        handleCloseModal();
    }, [handleCloseModal]);

    const handleDeleteLocation = useCallback((locationId) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            setLocations(prev => prev.filter(loc => loc.id !== locationId));
        }
    }, []);

    const getLocationIcon = (type) => {
        if (type === 'virtual_video') return <GlobeAltIcon className="w-5 h-5 text-blue-500 mr-2"/>;
        if (type === 'virtual_phone') return <PhoneSolidIcon className="w-5 h-5 text-green-500 mr-2"/>;
        return <MapPinIcon className="w-5 h-5 text-slate-400 mr-2"/>;
    };

    return (
        <>
            {isModalOpen && <LocationFormModal location={editingLocation} onSave={handleSaveLocation} onCancel={handleCloseModal} />}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b border-slate-200">
                    <div>
                        <h3 className="font-semibold text-gray-800">Manage Clinic & Service Locations</h3>
                        <p className="text-sm text-slate-500 mt-1">Define physical addresses and virtual consultation methods.</p>
                    </div>
                    <button onClick={() => handleOpenModal()} className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm font-medium">
                        <PlusIcon className="w-5 h-5 mr-2" /> Add Location
                    </button>
                </div>
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Location Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type / Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Contact Info</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {locations.map(loc => (
                            <tr key={loc.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 flex items-center">
                                   {getLocationIcon(loc.type)} {loc.name}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{loc.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{loc.contact}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button onClick={() => handleOpenModal(loc)} className="text-indigo-600 p-1 hover:text-indigo-800"><PencilIcon className="w-4 h-4" /></button>
                                    <button onClick={() => handleDeleteLocation(loc.id)} className="text-red-500 p-1 hover:text-red-700"><TrashIcon className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
// Add MapPinIcon to imports if not already there
import { MapPinIcon } from '@heroicons/react/24/outline'; 
export default LocationsManagementTab;