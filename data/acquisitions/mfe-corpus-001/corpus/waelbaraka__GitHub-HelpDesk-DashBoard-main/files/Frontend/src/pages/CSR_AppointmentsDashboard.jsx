// src/pages/CSR_AppointmentsDashboard.jsx
import React, { useState, useCallback, useMemo } from 'react';
import { PlusIcon, ListBulletIcon, CalendarDaysIcon as CalendarIconSoli } from '@heroicons/react/24/solid';

// View Components
import ServiceGraphView from '../components/services/ServiceGraphView'; // Not used here, but if admin toggled
import ServiceListView from '../components/services/ServiceListView'; // Changed from services/ServiceListView
import ServiceOrderEditor from '../components/services/ServiceOrderEditor'; // Not used here

// CSR Components
import CSR_CalendarView from '../components/csr/CSR_CalendarView';
import CSR_AppointmentFormModal from '../components/csr/CSR_AppointmentFormModal';
import SmartAvailabilityFinderModal from '../components/csr/SmartAvailabilityFinderModal';

// Modal and Sidebar Components
import ProviderFormModal from '../components/services/ProviderFormModal'; // Admin provider modal
import AssignProviderModal from '../components/services/AssignProviderModal'; // Admin assign modal

// Detail Sidebar & Popover Components
import DetailSidebar from '../components/services/details/DetailSidebar';
import ProviderInfoSection from '../components/services/details/ProviderInfoSection';
import ProviderServicesSection from '../components/services/details/ProviderServicesSection';
import ServiceInfoSection from '../components/services/details/ServiceInfoSection';
import AssignedProvidersSection from '../components/services/details/AssignedProvidersSection';
import ServiceDetailPopover from '../components/csr/ServiceDetailPopover'; // Popover for CSR view

// --- Dummy Data (Should be defined outside or fetched) ---

// --- Data (Single Source of Truth - DEFINED HERE or imported from a data file) ---
const DUMMY_CATEGORIES = [
  { id: 'cat1', name: 'Consultation', color: '#f97316' },
  { id: 'cat2', name: 'Diagnostics', color: '#22c55e' },
];

const DUMMY_SERVICES = [ 
  { id: 'srv101', categoryId: 'cat1', name: 'Virtual GP Consult', duration: 30, price: 75.00, preparationNotes: 'Stable internet required.' },
  { id: 'srv102', categoryId: 'cat1', name: 'Follow-up Consult', duration: 15, price: 50.00, preparationNotes: 'Bring previous notes.' },
  { id: 'srv401', categoryId: 'cat2', name: 'Automated BP Check', duration: 5, price: 10.00, preparationNotes: 'Relax for 5 mins prior.' },
];
const DUMMY_PROVIDERS = [ 
  { id: 'prov101', name: 'Dr. Ada Lovelace', specialty: 'General Practice', type: 'doctor', avatarBg: 'bg-blue-500', avatarInitial: 'AL', workingHours: [{ dayOfWeek: 1, start: '09:00', end: '17:00' }]},
  { id: 'prov701', name: 'Health Kiosk 1', specialty: 'Automated Screening', type: 'resource', avatarBg: 'bg-sky-500', avatarInitial: 'K1', avatarUrl: 'https://img.icons8.com/fluency-systems-filled/48/000000/health-checkup.png', workingHours: [{ dayOfWeek: 1, start: '08:00', end: '18:00' }]}
];
const DUMMY_APPOINTMENTS = [
    { id: 'APP001', patientId: 'PAT001', patientName: 'Alice Wonderland', patientPhone: '555-0101', serviceId: 'srv101', serviceName: 'Virtual GP Consult', providerId: 'prov101', providerName: 'Dr. Ada Lovelace', date: '2024-08-15', time: '10:00', duration: 30, status: 'Confirmed', notes: 'Morning slot.', bookedBy: 'CSR_X', bookingSource: 'Phone' },
    { id: 'APP002', patientId: 'PAT002', patientName: 'Bob The Builder', patientPhone: '555-0102', serviceId: 'srv401', serviceName: 'Automated BP Check', providerId: 'prov701', providerName: 'Health Kiosk 1', date: '2024-08-15', time: '11:30', duration: 5, status: 'Completed', notes: '', bookedBy: 'CSR_Y', bookingSource: 'Walk-in' },
];

const ALL_STATUSES_FILTER = ['All', 'Pending', 'Confirmed', 'Checked-In', 'Completed', 'Cancelled', 'No-Show'];

// For filter dropdowns, add the "All" option
const ALL_PROVIDERS_FILTER = [{ id: 'All', name: 'All Providers/Resources' }, ...DUMMY_PROVIDERS.map(p => ({id: p.id, name: p.name, type: p.type}))];
const ALL_SERVICES_FILTER = [{ id: 'All', name: 'All Services' }, ...DUMMY_SERVICES.map(s => ({id: s.id, name: s.name, duration: s.duration, price: s.price, preparationNotes: s.preparationNotes}))];




const CSR_AppointmentsDashboard = () => {
    const [viewMode, setViewMode] = useState('list'); 
    
    // --- Centralized State using the dummy data defined above ---
    const [categories, setCategories] = useState(DUMMY_CATEGORIES);       // Used by ServiceListView if it groups by category
    const [services, setServices] = useState(DUMMY_SERVICES);             // Source of truth for service details
    const [providers, setProviders] = useState(DUMMY_PROVIDERS);           // Source of truth for provider details
    const [appointments, setAppointments] = useState(DUMMY_APPOINTMENTS); // Main operational data

    // Modal State
    const [isAppointmentFormOpen, setIsAppointmentFormOpen] = useState(false); // Renamed for clarity
    const [isProviderFormOpen, setIsProviderFormOpen] = useState(false);     // For admin provider modal
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);       // For admin assign modal
    const [isFinderModalOpen, setIsFinderModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null); 

    // Detail Popover/Sidebar State
    const [selectedServiceForPopover, setSelectedServiceForPopover] = useState(null);
    const [selectedProviderForSidebar, setSelectedProviderForSidebar] = useState(null);
    const [finderInitialData, setFinderInitialData] = useState(null);


      // --- Handlers ---
    const handleOpenAppointmentForm = useCallback((data = null) => { // This is for booking/editing an APPOINTMENT
        setEditingData(data); 
        setIsAppointmentFormOpen(true); 
    }, []);

    const handleOpenProviderForm = useCallback((data = null) => { setEditingData(data); setIsProviderFormOpen(true); }, []);
    // const handleOpenAssignForm = useCallback((itemData) => { setEditingData(itemData); setIsAssignModalOpen(true); }, []); // If CSRs assign
    
    const handleCloseModals = useCallback(() => { 
        setIsAppointmentFormOpen(false); 
        setIsProviderFormOpen(false); 
        setIsAssignModalOpen(false); 
        setIsFinderModalOpen(false); 
        setEditingData(null); 
        setFinderInitialData(null);
    }, []);
    
    const handleSaveAppointment = useCallback((appointmentData) => {
        setAppointments(prev => {
            if (appointmentData.id && !String(appointmentData.id).startsWith('TEMP_') && !String(appointmentData.id).startsWith('NEW_')) { // Editing existing
                return prev.map(appt => appt.id === appointmentData.id ? appointmentData : appt);
            } else { // New appointment
                const newId = `APP_CSR_${Date.now()}`; // Simple new ID
                return [{ ...appointmentData, id: newId }, ...prev];
            }
        });
        handleCloseModals();
    }, [handleCloseModals]);
    
    // This would be for saving provider details if CSRs have that permission (less common)
    const handleSaveProviderData = useCallback((providerData) => { 
        setProviders(prev => { if (providerData.id) { return prev.map(p => p.id === providerData.id ? providerData : p); } return [...prev, { ...providerData, id: `PROV_${Date.now()}` }]; }); 
        handleCloseModals(); 
    }, [handleCloseModals]);

    // This would be for assigning providers to services if CSRs have that permission (less common)
    // const handleUpdateAssignments = useCallback((serviceId, newProviderIds) => { setServices(prevItems => prevItems.map(item => item.id === serviceId ? { ...item, providerIds: newProviderIds } : item)); handleCloseModals(); }, [handleCloseModals]);

    const handleCancelAppointment = useCallback((appointmentId) => { if (window.confirm("Cancel appointment?")) { setAppointments(prev => prev.map(appt => appt.id === appointmentId ? {...appt, status: 'Cancelled'} : appt)); }}, []);
    const handleChangeStatus = useCallback((appointmentId, newStatus) => { setAppointments(prev => prev.map(appt => appt.id === appointmentId ? {...appt, status: newStatus} : appt)); }, []);
    
    // Detail Popover/Sidebar Handlers
 const handleOpenServiceDetailsPopover = useCallback((serviceId) => { 
        const service = services.find(s => String(s.id) === String(serviceId)); 
        if (service) setSelectedServiceForPopover(service); 
    }, [services]); // Use the `services` state    const handleCloseServiceDetailsPopover = useCallback(() => { setSelectedServiceForPopover(null); }, []);
    const handleOpenProviderDetailsSidebar = useCallback((providerId) => { const provider = providers.find(p => String(p.id) === String(providerId)); if(provider) setSelectedProviderForSidebar(provider); }, [providers]);
    const handleCloseProviderDetailsSidebar = useCallback(() => { setSelectedProviderForSidebar(null); }, []);
    
    // Finder Handlers
    const handleOpenFinderDirectly = useCallback(() => { setFinderInitialData(null); setIsFinderModalOpen(true); }, []);
    const handleOpenFinderForCalendarSlot = useCallback((slotData) => { setFinderInitialData(slotData); setIsFinderModalOpen(true); }, []);
    const handleSlotSelectedFromFinder = useCallback((slotData) => { setIsFinderModalOpen(false); setFinderInitialData(null); const defaultNewAppt = { status: 'Pending', patientId: '', patientName: '', patientPhone: '' }; setEditingData({ ...defaultNewAppt, ...slotData }); setIsAppointmentFormOpen(true); }, []);
    const handleCloseServiceDetailsPopover = useCallback(() => { setSelectedServiceForPopover(null); }, []);

    // Define handlers passed to child components AFTER their constituent callbacks are defined
    const listViewHandlers = useMemo(() => ({ 
        onEditAppointment: handleOpenAppointmentForm, // Use the renamed handler
        onCancelAppointment: handleCancelAppointment, 
        onChangeStatus: handleChangeStatus, 
        onOpenServiceDetailsPopover: handleOpenServiceDetailsPopover,
        onOpenProviderDetailsSidebar: handleOpenProviderDetailsSidebar, // For provider list in list view
    }), [handleOpenAppointmentForm, handleCancelAppointment, handleChangeStatus, handleOpenServiceDetailsPopover, handleOpenProviderDetailsSidebar]);

    const calendarViewHandlers = useMemo(() => ({
        onEditAppointment: handleOpenAppointmentForm, // Use the renamed handler
        onCancelAppointment: handleCancelAppointment, 
        onChangeStatus: handleChangeStatus,
        onViewServiceDetails: handleOpenServiceDetailsPopover,
    }), [handleOpenAppointmentForm, handleCancelAppointment, handleChangeStatus, handleOpenServiceDetailsPopover]);
    
    
    const handlersForListView = useMemo(() => ({ 
        onEditAppointment: handleOpenAppointmentForm, // For editing an existing appointment
        onBookNewAppointmentForService: (serviceData) => { // NEW handler for "book this service" action
            // Pre-fill finder or appointment form with this service selected
            // For now, let's open the main appointment form with service pre-filled
            const defaultNewAppt = { 
                date: new Date().toISOString().split('T')[0], 
                time: '09:00', 
                status: 'Pending',
                serviceId: serviceData.id, // Pre-fill service
                serviceName: serviceData.name,
                duration: serviceData.duration,
                selectedServiceDetails: serviceData // Pass full service details
            };
            setEditingData(defaultNewAppt); 
            setIsAppointmentFormOpen(true); 
        },
        onCancelAppointment: handleCancelAppointment, 
        onChangeStatus: handleChangeStatus, 
        onOpenServiceDetailsPopover: handleOpenServiceDetailsPopover, // Correct name
        onOpenProviderDetailsSidebar: handleOpenProviderDetailsSidebar,
    }), [
        handleOpenAppointmentForm, handleCancelAppointment, handleChangeStatus, 
        handleOpenServiceDetailsPopover, handleOpenProviderDetailsSidebar
    ]);
    const renderContent = () => {
        switch (viewMode) {
            case 'list': 
                return <ServiceListView 
                            categories={categories} 
                            items={services} // Pass services (which are items)
                            providers={providers} 
                            appointments={appointments} // Pass appointments to list view
                            handlers={handlersForListView} 
                        />;
            // case 'edit-order': return <ServiceOrderEditor initialCategories={categories} initialItems={services} onSave={handleSaveOrder} onCancel={() => setViewMode('graph')} />; // Likely admin only
            case 'calendar': // Renamed from 'csr-calendar' for simplicity
            default: 
                return <CSR_CalendarView 
                            appointments={appointments} 
                            providers={providers} 
                            services={services} 
                            onOpenFinderForSlot={handleOpenFinderForCalendarSlot} 
                            onEditAppointment={handleOpenAppointmentForm} // Use the renamed handler
                            onChangeStatus={handleChangeStatus} 
                            onCancelAppointment={handleCancelAppointment} 
                            onViewServiceDetails={handleOpenServiceDetailsPopover}
                        />;
        }
    };



       return (
        <div className="flex-1 flex flex-col bg-slate-100 overflow-hidden">
            {isAppointmentFormOpen && <CSR_AppointmentFormModal allServices={services.filter(s=>s.id !== 'All')} allProviders={providers.filter(p=>p.id !== 'All')} onSave={handleSaveAppointment} onCancel={handleCloseModals} existingAppointment={editingData}/>}
            {/* ProviderFormModal and AssignProviderModal are more for admin setup */}
            {/* {isProviderFormOpen && <ProviderFormModal provider={editingData} onSave={handleSaveProviderData} onCancel={handleCloseModals} />} */}
            {/* {isAssignModalOpen && <AssignProviderModal service={editingData} allProviders={providers} onSave={handleUpdateAssignments} onCancel={handleCloseModals} />} */}
            {isFinderModalOpen && <SmartAvailabilityFinderModal allServices={services.filter(s=>s.id !== 'All')} allProviders={providers.filter(p=>p.id !== 'All')} allAppointments={appointments} onSlotSelected={handleSlotSelectedFromFinder} onCancel={handleCloseModals} initialSlotData={finderInitialData}/>}
            
            {selectedServiceForPopover && <ServiceDetailPopover service={selectedServiceForPopover} onClose={handleCloseServiceDetailsPopover} />}
            <DetailSidebar title="Provider Details" selectedItem={selectedProviderForSidebar} onClose={handleCloseProviderDetailsSidebar}><ProviderInfoSection /><ProviderServicesSection allServices={services} /></DetailSidebar>
            
            <header className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center flex-shrink-0">
                <h1 className="text-xl font-semibold text-slate-800">CSR Appointments Dashboard</h1>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setViewMode(viewMode === 'calendar' ? 'list' : 'calendar')} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                        {viewMode === 'list' ? 'CALENDAR VIEW' : 'LIST VIEW'}
                    </button>
                    <button onClick={handleOpenFinderDirectly} className="px-4 py-2 bg-teal-500 text-white rounded-md text-sm font-medium hover:bg-teal-600 flex items-center"> <PlusIcon className="w-4 h-4 mr-1.5"/> New Appointment </button>
                </div>
            </header>
            
            <main className="flex-1 overflow-auto p-6">
                {renderContent()}
            </main>
        </div>
    );
};
export default CSR_AppointmentsDashboard;