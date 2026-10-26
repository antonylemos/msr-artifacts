// src/components/services/ProviderNode.jsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { UserIcon, CubeIcon } from '@heroicons/react/24/solid'; // Using CubeIcon for generic resource

const ProviderNode = ({ data }) => {
  const isResource = data.type === 'resource';

  return (
    <div 
        onClick={() => data.onViewDetails && data.onViewDetails(data)} 
        className="bg-slate-50 rounded-lg shadow-md border border-slate-300 w-56 p-3 hover:shadow-xl hover:border-blue-400 cursor-pointer transition-shadow" // Slightly wider
    >
      <div className="flex items-center">
        {isResource ? (
          // Display resource icon (can be an <img> if avatarUrl points to a real image)
          <div className={`w-8 h-8 ${data.avatarBg || 'bg-slate-400'} rounded-md flex items-center justify-center text-white mr-3 flex-shrink-0`}>
            {data.avatarUrl ? <img src={data.avatarUrl} alt={data.name} className="w-5 h-5 object-contain invert-if-dark-bg" /> : <CubeIcon className="w-5 h-5"/>}
          </div>
        ) : (
          // Display doctor/personnel avatar
          <div className={`w-8 h-8 ${data.avatarBg} rounded-full flex items-center justify-center text-white font-semibold text-xs mr-3 flex-shrink-0`}>
            {data.avatarInitial}
          </div>
        )}
        <div className="flex-1 min-w-0"> {/* Added for text truncation */}
          <h5 className="text-xs font-bold text-slate-800 truncate">{data.name}</h5>
          <p className="text-xxs text-slate-500 truncate">{data.specialty}</p>
        </div>
      </div>
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-gray-400" />
    </div>
  );
};

export default ProviderNode;