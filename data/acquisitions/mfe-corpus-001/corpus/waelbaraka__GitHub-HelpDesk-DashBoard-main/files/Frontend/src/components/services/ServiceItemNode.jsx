// src/components/services/ServiceItemNode.jsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { XCircleIcon, PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid'; // UserPlusIcon for assigning providers

const ServiceItemNode = ({ data }) => {
  // Ensure providers array exists and has data
  const assignedProviders = Array.isArray(data.providers) ? data.providers : [];

  return (
    <div className="group relative w-56"> {/* Increased width slightly for avatars */}
      <div className="bg-white rounded-lg shadow-md border-2 border-dashed border-slate-300 p-4">
        <h5 className="text-sm font-semibold text-slate-800 truncate text-center mb-2">{data.name}</h5>
        
        {/* --- NEW: Provider Avatars Section --- */}
        <div className="flex justify-center items-center -space-x-2"> {/* Negative space for overlapping effect */}
            {assignedProviders.slice(0, 3).map(provider => ( // Show up to 3 avatars
                <img
                    key={provider.id}
                    src={provider.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=random&size=32`} // Fallback to UI Avatars
                    alt={provider.name}
                    title={provider.name} // Tooltip for provider name
                    className="w-7 h-7 rounded-full object-cover border-2 border-white shadow"
                />
            ))}
            {assignedProviders.length > 3 && (
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-semibold border-2 border-white shadow">
                    +{assignedProviders.length - 3}
                </div>
            )}
            {assignedProviders.length === 0 && (
                <div className="text-xs text-slate-400 italic py-1">No providers</div>
            )}
        </div>
      </div>

      {/* Hover Actions (Ensure these have correct handlers passed via data object) */}
      <div className="absolute top-1 -right-2 transform flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button onClick={() => data.onDelete && data.onDelete(data.id)} title="Delete Service" className="p-1 bg-white rounded-full shadow border border-slate-200 text-red-500 hover:bg-red-50"><XCircleIcon className="w-5 h-5"/></button>
          <button onClick={() => data.onEdit && data.onEdit(data)} title="Edit Service" className="p-1 bg-white rounded-full shadow border border-slate-200 text-blue-500 hover:bg-blue-50"><PencilIcon className="w-5 h-5"/></button>
          <button onClick={() => data.onAssignProviders && data.onAssignProviders(data)} title="Assign Providers" className="p-1 bg-white rounded-full shadow border border-slate-200 text-green-500 hover:bg-green-50"><UserPlusIcon className="w-5 h-5"/></button>
      </div>
        
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-gray-400" />
    </div>
  );
};

export default ServiceItemNode;