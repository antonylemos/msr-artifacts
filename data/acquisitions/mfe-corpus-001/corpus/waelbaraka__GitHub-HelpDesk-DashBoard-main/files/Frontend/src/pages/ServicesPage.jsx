// src/pages/ServicesPage.jsx
import React, { useState, useCallback, useMemo } from 'react';

// View Components
import ServiceGraphView from '../components/services/ServiceGraphView';
import ServiceListView from '../components/services/ServiceListView'; // This is the admin list view of categories/items
import ServiceOrderEditor from '../components/services/ServiceOrderEditor';

// Modal and Sidebar Components (used by ServiceGraphView and ServiceListView)
import ServiceFormModal from '../components/services/ServiceFormModal';
import ProviderFormModal from '../components/services/ProviderFormModal';
import AssignProviderModal from '../components/services/AssignProviderModal';
import DetailSidebar from '../components/services/details/DetailSidebar'; // If used by admin views
import ProviderInfoSection from '../components/services/details/ProviderInfoSection';
import ProviderServicesSection from '../components/services/details/ProviderServicesSection';
import ServiceInfoSection from '../components/services/details/ServiceInfoSection';
import AssignedProvidersSection from '../components/services/details/AssignedProvidersSection';

// --- Data (Single Source of Truth for Admin Service Configuration) ---
const initialAdminServiceCategories = [
  { id: 1, name: 'Consultation', color: '#f97316', description: "General medical consultations." },
  { id: 2, name: 'Accounting', color: '#10b981', description: "Financial services." },
  { id: 3, name: 'Diagnostics', color: '#3b82f6', description: "Screening and diagnostic tests." },
];
const initialAdminServiceItems = [
  { id: 101, categoryId: 1, name: 'Virtual Consultation', duration: 30, price: 150.00, providerIds: [101, 102], description: "Online video call with a doctor.", preparationNotes: 'Ensure stable internet and a quiet environment. Test your camera and microphone beforehand.' },
  { id: 102, categoryId: 1, name: 'In-Person Follow-up', duration: 15, price: 75.00, providerIds: [101], description: "Follow-up visit at the clinic.", preparationNotes: 'Please arrive 10 minutes early and bring any relevant test results or previous consultation notes.' },
  { id: 201, categoryId: 2, name: 'Tax Preparation', duration: 90, price: 350.00, providerIds: [201], description: "Assistance with tax filing.", preparationNotes: 'Gather all P60s, P45s, bank statements, and receipts for business expenses.' },
  { id: 301, categoryId: 3, name: 'Automated Blood Pressure Check', duration: 5, price: 10.00, providerIds: [701], description: "Self-service BP check.", preparationNotes: 'Relax for 5 minutes before taking the reading. Ensure cuff is snug but not too tight.' },
];
const initialAdminProviders = [ // These are the "Provider Entities" that can be assigned
  { id: 101, name: 'Dr. Jane Smith', specialty: 'General Practice', type: 'doctor', avatarBg: 'bg-blue-500', avatarInitial: 'JS', avatarUrl: 'https://i.pravatar.cc/40?img=1' },
  { id: 102, name: 'Dr. John Doe', specialty: 'General Practice', type: 'doctor', avatarBg: 'bg-green-500', avatarInitial: 'JD', avatarUrl: 'https://i.pravatar.cc/40?img=5' },
  { id: 201, name: 'Mr. Tax Advisor', specialty: 'Taxation', type: 'consultant', avatarBg: 'bg-purple-500', avatarInitial: 'TA', avatarUrl: 'https://i.pravatar.cc/40?img=3' },
  { id: 701, name: 'BP Kiosk Alpha', specialty: 'Automated Screening', type: 'resource', avatarBg: 'bg-sky-500', avatarInitial: 'BP', avatarUrl: 'https://img.icons8.com/fluency-systems-filled/48/000000/health-checkup.png' }
];

const ServicesPage = () => {
    const [viewMode, setViewMode] = useState('graph');
    
    const [categories, setCategories] = useState(initialAdminServiceCategories);
    const [items, setItems] = useState(initialAdminServiceItems);
    const [providers, setProviders] = useState(initialAdminProviders); // Providers available for assignment

    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null); // For service/category/provider edit

    const [selectedServiceDetail, setSelectedServiceDetail] = useState(null); // For admin detail view
    const [selectedProviderDetail, setSelectedProviderDetail] = useState(null);

    // Handlers for admin operations
    const handleOpenAdminServiceModal = useCallback((data = {}) => { setEditingData(data); setIsServiceModalOpen(true); }, []);
    const handleOpenAdminProviderModal = useCallback((data = null) => { setEditingData(data); setIsProviderModalOpen(true); }, []);
    const handleOpenAdminAssignModal = useCallback((itemData) => { setEditingData(itemData); setIsAssignModalOpen(true); }, []);
    const handleCloseAdminModals = useCallback(() => { setIsServiceModalOpen(false); setIsProviderModalOpen(false); setIsAssignModalOpen(false); setEditingData(null); }, []);
    
    const handleSaveAdminService = useCallback((serviceData) => {
        if (serviceData.id) { // Editing
            if (serviceData.categoryId !== undefined && serviceData.categoryId !== '') { // It's a service item
                setItems(prev => prev.map(item => item.id === serviceData.id ? {...item, ...serviceData} : item));
            } else { // It's a category
                setCategories(prev => prev.map(cat => cat.id === serviceData.id ? {...cat, ...serviceData} : cat));
            }
        } else { // Adding new
            if (serviceData.categoryId !== undefined && serviceData.categoryId !== '') { // New Service Item
                setItems(prev => [...prev, { ...serviceData, id: Date.now(), providerIds: [] }]);
            } else { // New Category
                setCategories(prev => [...prev, { ...serviceData, id: Date.now(), color: serviceData.color ||'#f97316' }]);
            }
        }
        handleCloseAdminModals();
    }, [handleCloseAdminModals]);
    
    const handleSaveAdminProvider = useCallback((providerData) => {
        setProviders(prev => { if (providerData.id) { return prev.map(p => p.id === providerData.id ? providerData : p); } return [...prev, { ...providerData, id: Date.now() }]; });
        handleCloseAdminModals();
    }, [handleCloseAdminModals]);

    const handleUpdateAdminProviderAssignments = useCallback((serviceItemId, newProviderIds) => {
        setItems(prevItems => prevItems.map(item => item.id === serviceItemId ? { ...item, providerIds: newProviderIds } : item));
        handleCloseAdminModals();
    }, [handleCloseAdminModals]);

    const handleDeleteAdminCategory = useCallback((categoryId) => { if (window.confirm("Delete category and all its services?")) { setCategories(p => p.filter(c => c.id !== categoryId)); setItems(p => p.filter(i => i.categoryId !== categoryId)); } }, []);
    const handleDeleteAdminItem = useCallback((itemId) => { if (window.confirm("Delete service item?")) { setItems(p => p.filter(i => i.id !== itemId)); } }, []);
    const handleSaveAdminOrder = useCallback((newCategories, newItems) => { setCategories(newCategories); setItems(newItems); setViewMode('graph'); }, []);
    
    // For admin detail sidebars (if needed)
    const handleOpenAdminServiceDetails = useCallback((service) => { setSelectedProviderDetail(null); setSelectedServiceDetail(service); }, []);
    const handleOpenAdminProviderDetails = useCallback((provider) => { setSelectedServiceDetail(null); setSelectedProviderDetail(provider); }, []);
    const handleCloseAdminSidebars = useCallback(() => { setSelectedServiceDetail(null); setSelectedProviderDetail(null); }, []);

    const adminHandlers = useMemo(() => ({
        onOpenServiceModal: handleOpenAdminServiceModal,
        onOpenProviderModal: handleOpenAdminProviderModal,
        onOpenAssignModal: handleOpenAdminAssignModal,
        onDeleteItem: handleDeleteAdminItem,
        onDeleteCategory: handleDeleteAdminCategory,
        onOpenServiceDetails: handleOpenAdminServiceDetails,
        onOpenProviderDetails: handleOpenAdminProviderDetails,
    }), [handleOpenAdminServiceModal, handleOpenAdminProviderModal, handleOpenAdminAssignModal, handleDeleteAdminItem, handleDeleteAdminCategory, handleOpenAdminServiceDetails, handleOpenAdminProviderDetails]);
    
    const renderAdminContent = () => {
        switch (viewMode) {
            case 'list': return <div className="p-6"><ServiceListView categories={categories} items={items} providers={providers} handlers={adminHandlers} /></div>; // Admin List View
            case 'edit-order': return <ServiceOrderEditor initialCategories={categories} initialItems={items} onSave={handleSaveAdminOrder} onCancel={() => setViewMode('graph')} />;
            case 'graph': default: return <ServiceGraphView categories={categories} items={items} providers={providers} setCategories={setCategories} setItems={setItems} handlers={adminHandlers} />;
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-slate-100 overflow-hidden">
            {isServiceModalOpen && <ServiceFormModal service={editingData} onSave={handleSaveAdminService} onCancel={handleCloseAdminModals} />}
            {isProviderModalOpen && <ProviderFormModal provider={editingData} onSave={handleSaveAdminProvider} onCancel={handleCloseAdminModals} />}
            {isAssignModalOpen && <AssignProviderModal service={editingData} allProviders={providers} onSave={handleUpdateAdminProviderAssignments} onCancel={handleCloseAdminModals} />}
            
            {/* Admin Detail Sidebars if needed */}
            {/* <DetailSidebar title="Service Detail (Admin)" selectedItem={selectedServiceDetail} onClose={handleCloseAdminSidebars}><ServiceInfoSection /><AssignedProvidersSection allProviders={providers} /></DetailSidebar> */}
            {/* <DetailSidebar title="Provider Detail (Admin)" selectedItem={selectedProviderDetail} onClose={handleCloseAdminSidebars}><ProviderInfoSection /><ProviderServicesSection allServices={items} /></DetailSidebar> */}
            
            <header className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center flex-shrink-0">
                <h1 className="text-xl font-semibold text-slate-800">Manage Services & Categories</h1>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setViewMode('edit-order')} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">EDIT ORDER</button>
                    <button onClick={() => setViewMode(viewMode === 'graph' ? 'list' : 'graph')} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">{viewMode === 'list' ? 'GRAPH VIEW' : 'LIST VIEW'}</button>
                </div>
            </header>
            
            <main className="flex-1 overflow-auto">{renderAdminContent()}</main>
        </div>
    );
};
export default ServicesPage;