// src/components/services/ServiceListTableView.jsx
import React from 'react';
import { PencilIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/24/solid';

const ServiceListTableView = ({ categories, items, handlers }) => {
    const { onOpenServiceDetails, onDeleteItem } = handlers;

    return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
            <div className="divide-y divide-slate-200">
                {categories.map(category => {
                    const categoryItems = items.filter(item => item.categoryId === category.id);
                    return (
                        <div key={category.id}>
                            {/* Category Header Row */}
                            <div className="px-6 py-3 bg-slate-50">
                                <h3 className="text-sm font-semibold text-slate-800">{category.name}</h3>
                            </div>
                            {/* Service Item Rows */}
                            {categoryItems.length > 0 ? (
                                categoryItems.map(item => (
                                    <div 
                                        key={item.id} 
                                        onClick={() => onOpenServiceDetails(item)}
                                        className="grid grid-cols-12 gap-x-6 px-6 py-3 items-center hover:bg-slate-50 cursor-pointer"
                                    >
                                        <div className="col-span-6 text-sm text-slate-700">{item.name}</div>
                                        <div className="col-span-1 text-sm text-slate-500 text-right">{item.duration} min</div>
                                        <div className="col-span-1 text-sm text-slate-500 text-right">${item.price.toFixed(2)}</div>
                                        <div className="col-span-2 text-sm text-slate-500 flex items-center justify-end">
                                            <UserGroupIcon className="w-4 h-4 mr-1.5 text-slate-400"/>
                                            {item.providerIds?.length || 0}
                                        </div>
                                        <div className="col-span-2 text-right space-x-3">
                                            <button onClick={(e) => { e.stopPropagation(); handlers.onOpenServiceModal(item); }} className="text-blue-600 p-1 hover:text-blue-800"><PencilIcon className="w-4 h-4" /></button>
                                            <button onClick={(e) => { e.stopPropagation(); onDeleteItem(item.id); }} className="text-red-600 p-1 hover:text-red-800"><TrashIcon className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-4 text-sm text-slate-400 italic">No services in this category.</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ServiceListTableView;