// src/components/services/CategoryRootNode.jsx
import { Handle, Position } from '@xyflow/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

const CategoryRootNode = ({ data }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-16 h-6 bg-slate-300 rounded-t-md flex justify-center items-center text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
        </div>
        <div className="bg-white rounded-md shadow-lg border border-slate-300 px-8 py-3 flex items-center">
            <span className="text-slate-700 font-semibold">{data.label}</span>
            {/* The onClick now calls the function passed in the node's data */}
            <button onClick={() => data.onAddCategory()} className="ml-3 p-0.5 bg-slate-200 text-slate-500 hover:bg-slate-300 rounded-full">
                <PlusIcon className="w-4 h-4" />
            </button>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !bg-gray-400" />
    </>
  );
};

export default CategoryRootNode;