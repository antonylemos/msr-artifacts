// src/components/services/ServiceOrderEditor.jsx
import React, { useState, useMemo } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableListItem from './SortableListItem';
import { ArrowUturnLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const ServiceOrderEditor = ({ initialCategories, initialItems, onSave, onCancel }) => {
    const [orderedCategories, setOrderedCategories] = useState(initialCategories);
    const [orderedItems, setOrderedItems] = useState(initialItems);
    const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategories[0]?.id || null);

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const activeIdStr = String(active.id);
        const overIdStr = String(over.id);

        if (activeIdStr.startsWith('cat-')) {
            // Reordering categories
            setOrderedCategories((cats) => {
                const oldIndex = cats.findIndex(c => `cat-${c.id}` === activeIdStr);
                const newIndex = cats.findIndex(c => `cat-${c.id}` === overIdStr);
                return arrayMove(cats, oldIndex, newIndex);
            });
        } else if (activeIdStr.startsWith('item-')) {
            // Reordering items within the selected category
            setOrderedItems((items) => {
                const oldIndex = items.findIndex(i => `item-${i.id}` === activeIdStr);
                const newIndex = items.findIndex(i => `item-${i.id}` === overIdStr);
                // Ensure we are only reordering items of the same category
                if (items[oldIndex]?.categoryId === items[newIndex]?.categoryId) {
                    return arrayMove(items, oldIndex, newIndex);
                }
                return items;
            });
        }
    };
    
    const handleReset = () => {
        setOrderedCategories(initialCategories);
        setOrderedItems(initialItems);
    };

    const handleSave = () => {
        onSave(orderedCategories, orderedItems);
    };

    const itemsForSelectedCategory = useMemo(() => 
        orderedItems.filter(item => item.categoryId === selectedCategoryId),
        [orderedItems, selectedCategoryId]
    );

    return (
        <div className="flex-1 flex flex-col bg-slate-100 overflow-hidden">
            {/* Header Toolbar */}
            <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center flex-shrink-0">
                <div className="flex items-center text-xl font-semibold text-slate-800">
                    <span className="text-blue-600">Services</span>
                    <span className="text-slate-400 mx-2">›</span>
                    <span>Edit order</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={handleReset} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center">
                        <ArrowUturnLeftIcon className="w-4 h-4 mr-2" />
                        RESET ORDER
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 flex items-center">
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        SAVE CHANGES
                    </button>
                </div>
            </div>

            {/* Main Content: Two Columns */}
            <div className="flex-1 p-6 overflow-auto grid grid-cols-2 gap-6">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    {/* Left Column: Categories */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                        <SortableContext items={orderedCategories.map(c => `cat-${c.id}`)} strategy={verticalListSortingStrategy}>
                            {orderedCategories.map(cat => (
                                <SortableListItem
                                    key={`cat-${cat.id}`}
                                    id={`cat-${cat.id}`}
                                    label={cat.name}
                                    isSelected={selectedCategoryId === cat.id}
                                    onClick={() => setSelectedCategoryId(cat.id)}
                                />
                            ))}
                        </SortableContext>
                    </div>

                    {/* Right Column: Sub-Services */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                        <SortableContext items={itemsForSelectedCategory.map(i => `item-${i.id}`)} strategy={verticalListSortingStrategy}>
                            {itemsForSelectedCategory.map(item => (
                                <SortableListItem
                                    key={`item-${item.id}`}
                                    id={`item-${item.id}`}
                                    label={item.name}
                                    isSelected={false} // Sub-items don't have a selected state in this UI
                                />
                            ))}
                        </SortableContext>
                        {itemsForSelectedCategory.length === 0 && (
                            <div className="text-center text-sm text-slate-400 py-10">
                                No sub-services in this category.
                            </div>
                        )}
                    </div>
                </DndContext>
            </div>
        </div>
    );
};

export default ServiceOrderEditor;