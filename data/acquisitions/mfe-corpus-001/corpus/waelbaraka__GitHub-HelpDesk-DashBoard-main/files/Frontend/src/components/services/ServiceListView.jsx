// src/components/csr/ServiceListView.jsx
import React, { useState, useMemo } from 'react'; // Removed useCallback as it's not used here directly for these handlers
import { PlusIcon, PencilIcon, TrashIcon, UserGroupIcon, WrenchScrewdriverIcon, InformationCircleIcon as InfoIconOutline } from '@heroicons/react/24/solid'; // Ensure InfoIconOutline is from solid or outline as needed

// ServiceDetailPopover is managed by the parent (CSR_AppointmentsDashboard)

const ServiceListView = ({ categories, items, providers, appointments, handlers }) => {
    // Destructure the correct handlers
    const { 
        onEditAppointment,        // For editing an existing appointment (if appointments are listed here)
        onBookNewAppointmentForService, // For booking a new appointment for a listed service type
        onCancelAppointment,      // For cancelling an existing appointment
        onChangeStatus,           // For changing status of an existing appointment
        onOpenServiceDetailsPopover, // Correct handler name
        onOpenProviderDetailsSidebar // For viewing provider details
    } = handlers;
    
    const [activeTab, setActiveTab] = useState('services'); 
    
    // If this view is ONLY for listing service *types* and initiating booking for them:
    // You might not need the `appointments` prop here directly, unless you show appt counts.
    
    // Example: Data for service type listing
    const serviceTypeData = useMemo(() => {
        return categories.map(cat => ({
            ...cat,
            serviceItems: items.filter(item => item.categoryId === cat.id),
        }));
    }, [categories, items]);

    return (
        <div className="space-y-4">
            {/* Tab Navigation */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button onClick={() => setActiveTab('services')} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'services' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                        <WrenchScrewdriverIcon className="w-5 h-5 mr-2" /> Browse Services
                    </button>
                    <button onClick={() => setActiveTab('providers')} className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'providers' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                       <UserGroupIcon className="w-5 h-5 mr-2" /> Browse Providers
                    </button>
                </nav>
            </div>
            
            {activeTab === 'services' && serviceTypeData.map(category => (
                <div key={category.id} className="bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="px-6 py-3 bg-slate-50 border-b border-slate-200">
                        <h3 className="text-sm font-semibold text-slate-800">{category.name}</h3>
                    </div>
                    {category.serviceItems.length > 0 ? (
                        category.serviceItems.map(item => (
                            <div 
                                key={item.id} 
                                className="grid grid-cols-12 gap-x-6 px-6 py-3 items-center border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                            >
                                <div className="col-span-5 text-sm text-slate-700 font-medium">{item.name}</div>
                                <div className="col-span-2 text-sm text-slate-500">{item.duration} min</div>
                                <div className="col-span-2 text-sm text-slate-500">${item.price?.toFixed(2)}</div>
                                <div className="col-span-3 text-right space-x-2">
                                    {item.preparationNotes && (
                                        <button 
                                            onClick={() => onOpenServiceDetailsPopover(item.id)} 
                                            title="View Service Details & Prep Notes"
                                            className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 inline-flex items-center justify-center"
                                        >
                                            <InfoIconOutline className="w-4 h-4"/>
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => onBookNewAppointmentForService(item)}
                                        title="Book this service"
                                        className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-xs font-medium"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-4 text-sm text-slate-400 italic">No services in this category.</div>
                    )}
                </div>
            ))}

            {activeTab === 'providers' && (
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                     <div className="p-4"><h3 className="font-semibold text-gray-800">All Providers & Resources</h3></div>
                     <table className="min-w-full divide-y divide-slate-200">
                         <thead className="bg-slate-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th><th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Specialty</th></tr></thead>
                         <tbody className="divide-y divide-slate-200">
                             {providers.filter(p => p.id !== 'All').map(provider => ( // Filter out "All" option
                                 <tr key={provider.id} onClick={() => onOpenProviderDetailsSidebar(provider.id)} className="hover:bg-slate-50 cursor-pointer">
                                     <td className="px-6 py-4"><div className="flex items-center"><div className={`w-8 h-8 ${provider.avatarBg || 'bg-gray-300'} rounded-full flex items-center justify-center text-white text-xs font-semibold mr-3`}>{provider.avatarInitial || provider.name.substring(0,1)}</div><p className="font-medium text-sm text-slate-800">{provider.name}</p></div></td>
                                     <td className="px-6 py-4 text-sm text-slate-600 capitalize">{provider.type}</td>
                                     <td className="px-6 py-4 text-sm text-slate-600">{provider.specialty}</td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                </div>
            )}
        </div>
    );
};

export default ServiceListView;