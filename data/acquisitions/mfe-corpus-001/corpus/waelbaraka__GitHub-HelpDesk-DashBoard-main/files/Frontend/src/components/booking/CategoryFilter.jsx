// src/components/booking/CategoryFilter.jsx
import React from 'react';

const CategoryFilter = ({ categories, activeCategoryId, onSelectCategory }) => {
    return (
        <div className="border-b border-slate-200">
            <nav className="px-6 -mb-px flex space-x-6 overflow-x-auto">
                <button
                    onClick={() => onSelectCategory('all')}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center
                        ${activeCategoryId === 'all' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm
                            ${activeCategoryId === cat.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        {cat.name}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default CategoryFilter;