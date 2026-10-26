// src/components/services/LocationsTab.jsx
import React, { useState, useCallback } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

// Dummy Data
const initialLocations = [
    { id: 1, name: 'Main Hospital Campus', address: '123 Health St, Medville, MD 12345', is_virtual: false, status: 'active' },
    { id: 2, name: 'Downtown Urgent Care', address: '456 Wellness Ave, Medville, MD 12345', is_virtual: false, status: 'active' },
    { id: 3, name: 'Telehealth / Video Call', address: '', is_virtual: true, status: 'active' },
    { id: 4, name: 'North Clinic (Renovation)', address: '789 Cure Blvd, Medville, MD 12345', is_virtual: false, status: 'inactive' },
];

const LocationsTab = () => {
    const [locations, setLocations] = useState(initialLocations);
    // Modal state would go here if you build the form
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddLocation = () => {
        alert("Opening form to add a new location.");
        // Logic to open a form modal would go here
    };
    
    const handleEditLocation = (location) => {
        alert(`Opening form to edit ${location.name}.`);
    };

    const handleDeleteLocation = useCallback((locationId) => {
        if(window.confirm('Are you sure you want to delete this location?')) {
            setLocations(prev => prev.filter(loc => loc.id !== locationId));
        }
    }, []);

    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b border-slate-200">
                <div>
                    <h3 className="font-semibold text-gray-800">Manage Locations</h3>
                    <p className="text-sm text-slate-500 mt-1">Define the physical or virtual locations where appointments take place.</p>
                </div>
                <button onClick={handleAddLocation} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium">
                    <PlusIcon className="w-5 h-5 mr-2" /> Add Location
                </button>
            </div>
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Location Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Address / Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {locations.map(location => (
                        <tr key={location.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{location.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                {location.is_virtual ? 'Virtual Appointment' : location.address}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    location.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {location.status === 'active' ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button onClick={() => handleEditLocation(location)} className="text-blue-600 p-1 hover:text-blue-800"><PencilIcon className="w-4 h-4" /></button>
                                <button onClick={() => handleDeleteLocation(location.id)} className="text-red-600 p-1 hover:text-red-800"><TrashIcon className="w-4 h-4" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LocationsTab;