// src/components/services/ServiceFormModal.jsx
import React, { useState, useEffect } from 'react';

const daysOfWeek = [
    { id: 'monday', label: 'Mon' }, { id: 'tuesday', label: 'Tue' }, { id: 'wednesday', label: 'Wed' },
    { id: 'thursday', label: 'Thu' }, { id: 'friday', label: 'Fri' }, { id: 'saturday', label: 'Sat' }, { id: 'sunday', label: 'Sun' },
];

const ServiceFormModal = ({ service, onSave, onCancel }) => {
    const getInitialFormData = () => ({
        name: '',
        categoryId: '', // Only for sub-services/items
        description: '',
        duration: '',
        price: '',
        status: 'active',
        color: '#f97316', // Default color for categories
        is_recurring: false,
        recurrence_rule: { frequency: 'weekly', interval: 1, days_of_week: [] },
        preparationNotes: '', // For sub-services/items
    });

    const [formData, setFormData] = useState(getInitialFormData());

    useEffect(() => {
        if (service) {
            setFormData({
                name: service.name || '',
                // If service.categoryId is undefined (it's a category), keep formData.categoryId (which is '')
                // If service.categoryId is defined (it's an item), use service.categoryId
                categoryId: service.categoryId !== undefined ? service.categoryId : '',
                description: service.description || '',
                duration: service.duration || '',
                price: service.price || '',
                status: service.status || 'active',
                color: service.color || (service.categoryId ? '#3b82f6' : '#f97316'), // Different default for items
                is_recurring: service.is_recurring || false,
                recurrence_rule: service.recurrence_rule || { frequency: 'weekly', interval: 1, days_of_week: [] },
                preparationNotes: service.preparationNotes || '',
            });
        } else {
            setFormData(getInitialFormData()); // Reset for new
        }
    }, [service]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'is_recurring') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleRecurrenceChange = (field, value) => {
        setFormData(prev => ({ ...prev, recurrence_rule: { ...prev.recurrence_rule, [field]: value }}));
    };

    const handleDayToggle = (dayId) => {
        setFormData(prev => {
            const currentDays = prev.recurrence_rule.days_of_week;
            const newDays = currentDays.includes(dayId) ? currentDays.filter(d => d !== dayId) : [...currentDays, dayId];
            return { ...prev, recurrence_rule: { ...prev.recurrence_rule, days_of_week: newDays }};
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // If it's a category, ensure categoryId is not part of submission or is null/undefined
        const dataToSave = { ...formData };
        if (!dataToSave.categoryId) { // It's a category
            delete dataToSave.categoryId; 
            delete dataToSave.preparationNotes; // Categories don't have prep notes
            delete dataToSave.duration; // Categories might not have duration/price directly
            delete dataToSave.price;
        }
        onSave({ ...service, ...dataToSave });
    };
    
    const isSubService = !!formData.categoryId; // True if we are editing/creating a sub-service

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {service?.id ? `Edit ${isSubService ? 'Service Item' : 'Category'}` : `Add New ${formData.categoryId ? 'Service Item' : 'Category'}`}
                        </h3>
                    </div>
                    <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin">
                        <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Name*</label><input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="form-input mt-1 w-full" /></div>
                        <div><label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label><textarea name="description" id="description" value={formData.description} onChange={handleChange} rows="2" className="form-textarea mt-1 w-full"></textarea></div>
                        
                        {isSubService && ( // Fields specific to Service Items
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (min)*</label><input type="number" name="duration" id="duration" value={formData.duration} onChange={handleChange} required className="form-input mt-1 w-full" /></div>
                                    <div><label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)*</label><input type="number" step="0.01" name="price" id="price" value={formData.price} onChange={handleChange} required className="form-input mt-1 w-full" /></div>
                                </div>
                                <div className="pt-4 border-t border-gray-200">
                                    <label htmlFor="preparationNotes" className="block text-sm font-medium text-gray-700">Patient Preparation Notes / Instructions</label>
                                    <textarea name="preparationNotes" id="preparationNotes" value={formData.preparationNotes} onChange={handleChange} rows="3" className="form-textarea mt-1 w-full" placeholder="e.g., Fast for 8 hours before appointment..."></textarea>
                                </div>
                            </>
                        )}

                        {!isSubService && ( // Field specific to Categories (like color)
                             <div><label htmlFor="color" className="block text-sm font-medium text-gray-700">Category Color</label><input type="color" name="color" id="color" value={formData.color} onChange={handleChange} className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm p-1"/></div>
                        )}
                        
                        {/* Status could apply to both */}
                        <div><label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label><select name="status" id="status" value={formData.status} onChange={handleChange} className="form-select mt-1 w-full"><option value="active">Active</option><option value="inactive">Inactive</option></select></div>

                        {/* Recurrence (might apply more to specific service items) */}
                        {isSubService && (
                            <div className="pt-4 border-t border-gray-200">
                                <label className="flex items-center cursor-pointer"><div className="relative"><input type="checkbox" name="is_recurring" id="is_recurring" className="sr-only peer" checked={formData.is_recurring} onChange={handleChange} /><div className="block bg-gray-300 w-10 h-5 rounded-full transition-colors peer-checked:bg-blue-600"></div><div className="dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full"></div></div><span className="ml-3 text-sm font-medium text-gray-700">This is a recurring service</span></label>
                                {formData.is_recurring && (<div className="mt-4 pl-4 border-l-2 border-blue-200 space-y-4"><div><label htmlFor="frequency" className="block text-xs font-medium text-gray-500">Frequency</label><select name="frequency" id="frequency" value={formData.recurrence_rule.frequency} onChange={(e) => handleRecurrenceChange('frequency', e.target.value)} className="form-select mt-1 w-full text-sm"><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option></select></div>{formData.recurrence_rule.frequency === 'weekly' && (<div><label className="block text-xs font-medium text-gray-500 mb-2">Repeat on</label><div className="flex flex-wrap gap-2">{daysOfWeek.map(day => (<button type="button" key={day.id} onClick={() => handleDayToggle(day.id)} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${formData.recurrence_rule.days_of_week.includes(day.id) ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}>{day.label}</button>))}</div></div>)}<div><label htmlFor="interval" className="block text-xs font-medium text-gray-500">Repeat every</label><div className="flex items-center mt-1"><input type="number" name="interval" id="interval" value={formData.recurrence_rule.interval} onChange={(e) => handleRecurrenceChange('interval', parseInt(e.target.value, 10))} className="form-input block w-20 text-sm"/><span className="ml-2 text-sm text-gray-600">{formData.recurrence_rule.frequency.slice(0, -2)}{formData.recurrence_rule.interval > 1 ? 's' : ''}</span></div></div></div>)}
                            </div>
                        )}
                    </div>
                    <div className="p-4 bg-gray-50 flex justify-end space-x-2"><button type="button" onClick={onCancel} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 text-sm">Cancel</button><button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">{service?.id ? 'Save Changes' : 'Add Entity'}</button></div>
                </form>
            </div>
        </div>
    );
};
export default ServiceFormModal;