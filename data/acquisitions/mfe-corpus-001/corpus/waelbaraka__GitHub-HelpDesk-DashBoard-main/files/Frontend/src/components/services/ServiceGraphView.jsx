// src/components/services/ServiceGraphView.jsx
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    Panel,
    useNodesState,
    useEdgesState,
    MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { PlusIcon } from '@heroicons/react/24/solid';

import CategoryRootNode from './CategoryRootNode';
import ServiceCategoryNode from './ServiceCategoryNode';
import ServiceItemNode from './ServiceItemNode';


const initialServiceCategories = [
  { id: 1, name: 'Consultation', color: '#f97316' },
  { id: 2, name: 'Accounting', color: '#f97316' },
  { id: 3, name: 'Business', color: '#f97316' },
];
const initialServiceItems = [
  { id: 101, categoryId: 1, name: 'Virtual Consultation', providerIds: [101, 102, 201] }, // Assign 3 providers to test overlap
  { id: 102, categoryId: 1, name: 'In-Person Follow-up', providerIds: [101] },
  { id: 201, categoryId: 2, name: 'Tax Preparation', providerIds: [201] },
  { id: 301, categoryId: 3, name: 'Strategy Session', providerIds: [] }, // No providers
];
const initialProviders = [
  { id: 101, name: 'Dr. Jane Smith', specialty: 'General Practice', avatarBg: 'bg-blue-500', avatarInitial: 'JS', avatarUrl: 'https://i.pravatar.cc/40?img=1' },
  { id: 102, name: 'Dr. John Doe', specialty: 'General Practice', avatarBg: 'bg-green-500', avatarInitial: 'JD', avatarUrl: 'https://i.pravatar.cc/40?img=5' },
  { id: 201, name: 'Mr. Tax Man', specialty: 'Accounting', avatarBg: 'bg-purple-500', avatarInitial: 'TM', avatarUrl: 'https://i.pravatar.cc/40?img=3' },
];


// --- Graph Generation Logic (Pure Function) ---
const generateGraphLayout = (categories, items, providersList, handlers) => {
    const { onAddCategory, onAddItem, onEditItem, onDeleteItem, onEditCategory, onDeleteCategory, onAssignProviders } = handlers;
    const initialNodes = [];
    const initialEdges = [];
    const providerMap = new Map(providersList.map(p => [p.id, p]));

    const L1_Y = 150;
    const L2_Y_START = 300;
    const L2_Y_SPACING = 120;
    const STACK_X_SPACING = 288;
    let currentStackX = 0;

    categories.forEach(cat => {
        const categoryNodeId = `cat-${cat.id}`;
        const subItems = items.filter(item => item.categoryId === cat.id);
        
        initialNodes.push({
            id: categoryNodeId,
            type: 'serviceCategoryNode',
            data: { ...cat, onAddItem, onEdit: onEditCategory, onDelete: onDeleteCategory },
            position: { x: currentStackX, y: L1_Y }
        });

        subItems.forEach((item, itemIndex) => {
            const itemNodeId = `item-${item.id}`;
            const itemProviders = (item.providerIds || []).map(id => providerMap.get(id)).filter(Boolean);
            initialNodes.push({
                id: itemNodeId,
                type: 'serviceItemNode',
                data: { ...item, providers: itemProviders, onEdit: onEditItem, onDelete: onDeleteItem, onAssignProviders },
                position: { x: currentStackX, y: L2_Y_START + (itemIndex * L2_Y_SPACING) }
            });
            initialEdges.push({ id: `e-${cat.id}-${item.id}`, source: categoryNodeId, target: itemNodeId, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: '#d1d5db' }, style: { strokeWidth: 1.5, stroke: '#d1d5db' } });
        });
        currentStackX += STACK_X_SPACING;
    });

    if (categories.length > 0) {
        const rootX = (currentStackX - STACK_X_SPACING) / 2;
        initialNodes.push({ id: 'root', type: 'categoryRootNode', data: { label: 'Categories', onAddCategory }, position: { x: rootX, y: 0 } });
        categories.forEach(cat => {
            initialEdges.push({ id: `e-root-${cat.id}`, source: 'root', target: `cat-${cat.id}`, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: '#d1d5db' }, style: { strokeWidth: 1.5, stroke: '#d1d5db' } });
        });
    }
    
    return { initialNodes, initialEdges };
};


const ServiceGraphView = ({ categories, items, providers, setCategories, handlers }) => {
    const { onOpenServiceModal, onOpenProviderModal, onOpenAssignModal, onDeleteItem, onDeleteCategory } = handlers;
    
    // REACT FLOW HOOKS & EFFECT
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        const graphHandlers = {
            onAddCategory: () => onOpenServiceModal(),
            onAddItem: (categoryId) => onOpenServiceModal({ categoryId }),
            onEditCategory: (categoryData) => onOpenServiceModal(categoryData),
            onDeleteCategory: onDeleteCategory,
            onEditItem: (itemData) => onOpenServiceModal(itemData),
            onDeleteItem: onDeleteItem,
            onAssignProviders: onOpenAssignModal,
        };
        const { initialNodes, initialEdges } = generateGraphLayout(categories, items, providers, graphHandlers);
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [categories, items, providers, onOpenServiceModal, onDeleteCategory, onDeleteItem, onOpenAssignModal, setNodes, setEdges]);
    
    const handleNodesChange = (changes) => {
        onNodesChange(changes);
        const dropChange = changes.find(change => change.type === 'position' && !change.dragging && change.position);
        
        if (dropChange) {
            const currentFlowNodes = nodes; // Use the latest nodes from state
            const droppedNodeId = dropChange.nodeId;
            const isCategory = droppedNodeId.startsWith('cat-');
            
            if (isCategory) {
                const newOrderedCategories = currentFlowNodes
                    .filter(n => n.type === 'serviceCategoryNode')
                    .sort((a, b) => a.position.x - b.position.x)
                    .map(n => categories.find(c => `cat-${c.id}` === n.id))
                    .filter(Boolean);

                setCategories(newOrderedCategories);
            }
        }
    };
    
    const nodeTypes = useMemo(() => ({
        categoryRootNode: CategoryRootNode,
        serviceCategoryNode: ServiceCategoryNode,
        serviceItemNode: ServiceItemNode,
    }), []);

    return (
        <div className="w-full h-full relative">
            {nodes.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-slate-700">No Services Found</h3>
                        <p className="text-sm text-slate-500 mt-1 mb-4">Get started by adding your first service category.</p>
                        <button onClick={() => onOpenServiceModal()} className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 flex items-center mx-auto">
                            <PlusIcon className="w-5 h-5 mr-2" /> Add Category
                        </button>
                    </div>
                </div>
            )}
            
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={handleNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                nodesDraggable={true}
                nodesConnectable={false}
                proOptions={{ hideAttribution: true }}
                nodeDragThreshold={5}
            >
                <Panel position="top-right">
                    <button onClick={() => onOpenProviderModal()} className="bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600" title="Add New Provider">
                        <PlusIcon className="w-5 h-5" />
                    </button>
                </Panel>
                <Background variant="dots" gap={24} size={1} />
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    );
};

export default ServiceGraphView;