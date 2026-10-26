// src/components/services/ProvidersTableView.jsx
import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const ProvidersTableView = ({ providers, handlers }) => {
    const { onOpenProviderDetails, onOpenProviderModal } = handlers;

    const handleDelete = (e, providerId) => {
        e.stopPropagation();
        if(window.confirm("Are you sure you want to delete this provider?")) {
            // In a real app, call a handler passed from ServicesPage
            console.log("Deleting provider:", providerId);
        }
    };
    
    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
             <table className="min-w-full divide-y divide-slate-200">
                 <thead className="bg-slate-50">
                     <tr>
                         <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Provider</th>
                         <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Specialty</th>
                         <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-200">
                     {providers.map(provider => (
                         <tr key={provider.id} onClick={() => onOpenProviderDetails(provider)} className="hover:bg-slate-50 cursor-pointer">
                             <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className={`w-8 h-8 ${provider.avatarBg} rounded-full flex items-center justify-center text-white text-xs font-semibold mr-3`}>{provider.avatarInitial}</div>
                                    <p className="font-medium text-sm text-slate-800">{provider.name}</p>
                                </div>
                             </td>
                             <td className="px-6 py-4 text-sm text-slate-600">{provider.specialty}</td>
                             <td className="px-6 py-4 text-right space-x-3">
                                <button onClick={(e) => { e.stopPropagation(); onOpenProviderModal(provider); }} className="text-blue-600 p-1 hover:text-blue-800"><PencilIcon className="w-4 h-4" /></button>
                                <button onClick={(e) => handleDelete(e, provider.id)} className="text-red-600 p-1 hover:text-red-800"><TrashIcon className="w-4 h-4" /></button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
        </div>
    );
};

export default ProvidersTableView;