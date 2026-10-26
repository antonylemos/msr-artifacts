// src/components/services/ServiceCategoryNode.jsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { PlusIcon, Cog6ToothIcon, XCircleIcon } from '@heroicons/react/24/outline';

const ServiceCategoryNode = ({ data }) => {
  return (
    <div className="group relative">
        <div style={{ backgroundColor: data.color || '#f9a8d4' }} className="px-5 py-2 rounded-md shadow text-white font-semibold text-sm">
            {data.name}
        </div>
        
        {/* Hover Actions */}
        <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {/* Add Sub-Item */}
            <button onClick={() => data.onAddItem(data.id)} title="Add Sub-Service" className="p-1 bg-white rounded-full shadow border border-slate-200 text-slate-500 hover:text-blue-500"><PlusIcon className="w-4 h-4"/></button>
            
            {/* Edit Category */}
            <button onClick={() => data.onEdit(data)} title="Edit Category" className="p-1 bg-white rounded-full shadow border border-slate-200 text-slate-500 hover:text-green-500"><Cog6ToothIcon className="w-4 h-4"/></button>
            
            {/* Delete Category */}
            <button onClick={() => data.onDelete(data.id)} title="Delete Category" className="p-1 bg-white rounded-full shadow border border-slate-200 text-slate-500 hover:text-red-500"><XCircleIcon className="w-4 h-4"/></button>
        </div>
        
        <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-gray-400" />
        <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-gray-400" />
    </div>
  );
};

export default ServiceCategoryNode;