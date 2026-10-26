// src/pages/settings/AppointmentSettingsPage.jsx
import React, { useState } from 'react';
import { WrenchScrewdriverIcon, UserGroupIcon, BuildingStorefrontIcon, Cog8ToothIcon } from '@heroicons/react/24/solid';

// Corrected import paths from ../../
import ServicesTab from '../../components/services/ServicesTab';
import ProvidersTab from '../../components/services/ProvidersTab';
import LocationsTab from '../../components/services/LocationsTab';
import BookingRulesTab from '../../components/services/BookingRulesTab';

const AppointmentSettingsPage = React.memo(() => {
    const [activeTab, setActiveTab] = useState('services');

    const tabs = [
        { id: 'services', label: 'Services', icon: WrenchScrewdriverIcon },
        { id: 'providers', label: 'Providers & Availability', icon: UserGroupIcon },
        { id: 'locations', label: 'Locations', icon: BuildingStorefrontIcon },
        { id: 'rules', label: 'Booking Rules', icon: Cog8ToothIcon },
    ];

    return (
        <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4">
                <h1 className="text-xl font-semibold text-slate-800">Appointment Settings</h1>
                <p className="mt-1 text-sm text-slate-600">Define your services, provider schedules, locations, and global booking rules.</p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b border-slate-200 px-6">
                <nav className="-mb-px flex space-x-6">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                            <tab.icon className="w-5 h-5 mr-2" /> {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content Area */}
            <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
                {activeTab === 'services' && <ServicesTab />}
                {activeTab === 'providers' && <ProvidersTab />}
                {activeTab === 'locations' && <LocationsTab />}
                {activeTab === 'rules' && <BookingRulesTab />}
            </div>
        </div>
    );
});

export default AppointmentSettingsPage;