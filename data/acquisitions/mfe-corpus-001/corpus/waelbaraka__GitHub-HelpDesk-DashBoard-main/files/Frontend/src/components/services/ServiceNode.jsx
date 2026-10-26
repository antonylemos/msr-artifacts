// src/components/services/ServiceNode.jsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';

const ServiceNode = ({ data }) => {
  return (
    // The main container for the node
    <div className="bg-white rounded-lg shadow-lg border-2 border-blue-500 w-60">
      <div className="p-3 bg-blue-500 text-white rounded-t-md">
        <h4 className="text-sm font-bold truncate">{data.name}</h4>
      </div>
      <div className="p-3 text-xs text-gray-700 space-y-1">
        <p><strong>Duration:</strong> {data.duration} min</p>
        <p><strong>Price:</strong> ${data.price.toFixed(2)}</p>
      </div>
      {/* Target handle (for connections from the root) */}
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !bg-gray-400" />
      {/* We are removing the single bottom source handle. React Flow can now draw edges from the node's center/bottom edge. */}
    </div>
  );
};

export default ServiceNode;