// src/pages/settings/AppointmentSystemSettingsPage.jsx
import React, { useState } from 'react';
import { UserGroupIcon, MapPinIcon, Cog8ToothIcon, BellAlertIcon, BuildingOffice2Icon } from '@heroicons/react/24/solid'; // Added BuildingOffice2Icon

// We will create these tab content components next
import ProvidersAvailabilityTab from './ProvidersAvailabilityTab';
import LocationsManagementTab from './LocationsManagementTab';
import GlobalBookingRulesTab from './GlobalBookingRulesTab'; // <-- IMPORT NEW TAB
import ClinicProfileSettingsTab from './ClinicProfileSettingsTab'; // <-- IMPORT NEW TAB

const AppointmentSystemSettingsPage = () => {
    const [activeTab, setActiveTab] = useState('providers'); // Default to providers

    const tabs = [
        { id: 'profile', label: 'Clinic Profile', icon: BuildingOffice2Icon }, // <-- NEW TAB ENTRY
        { id: 'providers', label: 'Providers & Availability', icon: UserGroupIcon },
        { id: 'locations', label: 'Locations Management', icon: MapPinIcon },
        { id: 'rules', label: 'Global Booking Rules', icon: Cog8ToothIcon }, // <-- NEW TAB ENTRY

        // Add other setting tabs here later, e.g., Booking Rules, Notifications
    ];

    return (
        <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4">
                <h1 className="text-xl font-semibold text-slate-800">Appointment System Settings</h1>
                <p className="mt-1 text-sm text-slate-600">Configure provider schedules, clinic locations, and booking rules.</p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b border-slate-200 px-6">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center
                                ${activeTab === tab.id
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`}
                        >
                            <tab.icon className="w-5 h-5 mr-2" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content Area */}
            <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
                                {activeTab === 'profile' && <ClinicProfileSettingsTab />}

                {activeTab === 'providers' && <ProvidersAvailabilityTab />}
                {activeTab === 'locations' && <LocationsManagementTab />}
                                {activeTab === 'rules' && <GlobalBookingRulesTab />}

            </div>
        </div>
    );
};

export default AppointmentSystemSettingsPage;