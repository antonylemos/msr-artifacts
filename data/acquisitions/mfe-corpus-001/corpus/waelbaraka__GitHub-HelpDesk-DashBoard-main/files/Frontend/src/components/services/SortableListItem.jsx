// src/components/services/SortableListItem.jsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Bars3Icon } from '@heroicons/react/24/solid';

const SortableListItem = ({ id, label, isSelected, onClick }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 100 : 'auto',
    };

    return (
        <div ref={setNodeRef} style={style} className="mb-2">
            <button
                onClick={onClick}
                className={`w-full flex items-center p-3 text-left rounded-md border text-sm font-medium
                    ${isSelected 
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
            >
                <div {...attributes} {...listeners} className="p-1 mr-3 cursor-grab touch-none text-slate-400 hover:text-slate-600">
                    <Bars3Icon className="w-5 h-5" />
                </div>
                {label}
            </button>
        </div>
    );
};

export default SortableListItem;