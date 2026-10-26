// src/components/appointments/AppointmentForm.jsx
import React, { useState } from 'react';

const AppointmentForm = ({ initialData, onSave, onCancel }) => {
    const isEditMode = !!initialData;
    const [formData, setFormData] = useState({
        client_name: initialData?.client_name || '',
        client_contact_phone: initialData?.client_contact_phone || '',
        client_email: initialData?.client_email || '',
        service_display_name: initialData?.service_display_name || '',
        appointment_date: initialData?.appointment_datetime_utc ? new Date(initialData.appointment_datetime_utc).toISOString().slice(0, 10) : '',
        appointment_time: initialData?.appointment_datetime_utc ? new Date(initialData.appointment_datetime_utc).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23'}) : '',
        provider_name_snapshot: initialData?.provider_info?.name_snapshot || '',
        notes_internal: initialData?.notes_internal || '',
        notes_for_client: initialData?.notes_for_client || '',
        status: initialData?.status || 'scheduled',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => { const newErrors = { ...prev }; delete newErrors[name]; return newErrors; });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.client_name.trim()) newErrors.client_name = 'Client Name is required';
        if (!formData.client_contact_phone.trim()) newErrors.client_contact_phone = 'Client Phone is required';
        if (!formData.service_display_name.trim()) newErrors.service_display_name = 'Service Type is required';
        if (!formData.appointment_date) newErrors.appointment_date = 'Date is required';
        if (!formData.appointment_time) newErrors.appointment_time = 'Time is required';
        if (!formData.provider_name_snapshot.trim()) newErrors.provider_name_snapshot = 'Provider is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) { return; }

        const apptDateTime = new Date(`${formData.appointment_date}T${formData.appointment_time}:00`);

        const newAppointment = {
            _id: isEditMode ? initialData._id : `objid-${Date.now()}`,
            appointment_id_human_readable: isEditMode ? initialData.appointment_id_human_readable : `APT-${Math.floor(1000 + Math.random() * 9000)}`,
            user_id_ref: initialData?.user_id_ref || `user_id-${Math.floor(Math.random() * 1000)}`,
            whatsapp_sender_id_of_booker_snapshot: initialData?.whatsapp_sender_id_of_booker_snapshot || `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            client_name: formData.client_name,
            client_contact_phone: formData.client_contact_phone,
            client_email: formData.client_email || null,
            appointment_subjects: initialData?.appointment_subjects || [{ subject_type: "person", name: formData.client_name, identifier: `CID-${Math.floor(1000 + Math.random() * 9000)}` }],
            service_type_key: formData.service_display_name.toUpperCase().replace(/ /g, '_'),
            service_display_name: formData.service_display_name,
            service_details_custom: initialData?.service_details_custom || {},
            provider_info: {
                provider_id_ref: initialData?.provider_info?.provider_id_ref || `prov_id-${Math.floor(Math.random() * 100)}`,
                name_snapshot: formData.provider_name_snapshot,
                type_snapshot: initialData?.provider_info?.type_snapshot || "consultant"
            },
            department_key: initialData?.department_key || 'General',
            location_key: initialData?.location_key || 'Main Office',
            appointment_datetime_utc: apptDateTime.toISOString(),
            appointment_date_str_local: apptDateTime.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
            appointment_time_str_local: apptDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            clinic_timezone: initialData?.clinic_timezone || "America/New_York",
            estimated_duration_minutes: initialData?.estimated_duration_minutes || 60,
            status: formData.status,
            booking_channel: initialData?.booking_channel || "manual",
            booked_by_actor_type: initialData?.booked_by_actor_type || "agent",
            booked_by_actor_id_ref: initialData?.booked_by_actor_id_ref || `agent_id-${Math.floor(Math.random() * 10)}`,
            booking_timestamp_utc: initialData?.booking_timestamp_utc || new Date().toISOString(),
            last_status_update_at_utc: new Date().toISOString(),
            price: initialData?.price || 0,
            payment_status: initialData?.payment_status || 'pending',
            notes_internal: formData.notes_internal,
            notes_for_client: formData.notes_for_client,
            id: isEditMode ? initialData.id : `appt-compat-${Date.now()}`,
            date: apptDateTime.toISOString().slice(0, 10),
            time: apptDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            dateTime: apptDateTime.getTime(),
            subject: formData.service_display_name,
            agent: initialData?.agent || 'Unassigned',
        };
        onSave(newAppointment);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">{isEditMode ? 'Edit Appointment' : 'New Appointment'}</h2>
                    <button onClick={onCancel} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto scrollbar-thin">
                    <h3 className="font-medium text-lg text-gray-700 mb-4">Client Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                            <input type="text" id="client_name" name="client_name" value={formData.client_name} onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.client_name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500`} />
                            {errors.client_name && <p className="text-red-500 text-xs mt-1">{errors.client_name}</p>}
                        </div>
                        <div>
                            <label htmlFor="client_contact_phone" className="block text-sm font-medium text-gray-700 mb-1">Client Phone</label>
                            <input type="text" id="client_contact_phone" name="client_contact_phone" value={formData.client_contact_phone} onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.client_contact_phone ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500`} />
                            {errors.client_contact_phone && <p className="text-red-500 text-xs mt-1">{errors.client_contact_phone}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="client_email" className="block text-sm font-medium text-gray-700 mb-1">Client Email (Optional)</label>
                            <input type="email" id="client_email" name="client_email" value={formData.client_email} onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>

                    <h3 className="font-medium text-lg text-gray-700 mb-4">Appointment Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label htmlFor="service_display_name" className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                            <input type="text" id="service_display_name" name="service_display_name" value={formData.service_display_name} onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.service_display_name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500`} />
                            {errors.service_display_name && <p className="text-red-500 text-xs mt-1">{errors.service_display_name}</p>}
                        </div>
                        <div>
                            <label htmlFor="provider_name_snapshot" className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                            <input type="text" id="provider_name_snapshot" name="provider_name_snapshot" value={formData.provider_name_snapshot} onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.provider_name_snapshot ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500`} />
                            {errors.provider_name_snapshot && <p className="text-red-500 text-xs mt-1">{errors.provider_name_snapshot}</p>}
                        </div>
                        <div>
                            <label htmlFor="appointment_date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input type="date" id="appointment_date" name="appointment_date" value={formData.appointment_date} onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.appointment_date ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500`} />
                            {errors.appointment_date && <p className="text-red-500 text-xs mt-1">{errors.appointment_date}</p>}
                        </div>
                        <div>
                            <label htmlFor="appointment_time" className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <input type="time" id="appointment_time" name="appointment_time" value={formData.appointment_time} onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.appointment_time ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500`} />
                            {errors.appointment_time && <p className="text-red-500 text-xs mt-1">{errors.appointment_time}</p>}
                        </div>
                        <div className="md:col-span-2">
                             <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select id="status" name="status" value={formData.status} onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500">
                                {['scheduled', 'pending', 'confirmed', 'completed', 'cancelled', 'no_show'].map(s => (
                                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <h3 className="font-medium text-lg text-gray-700 mb-4">Notes</h3>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <div>
                            <label htmlFor="notes_internal" className="block text-sm font-medium text-gray-700 mb-1">Internal Notes (for agents)</label>
                            <textarea id="notes_internal" name="notes_internal" value={formData.notes_internal} onChange={handleChange} rows="3"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"></textarea>
                        </div>
                        <div>
                            <label htmlFor="notes_for_client" className="block text-sm font-medium text-gray-700 mb-1">Notes for Client</label>
                            <textarea id="notes_for_client" name="notes_for_client" value={formData.notes_for_client} onChange={handleChange} rows="3"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button type="button" onClick={onCancel}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium">
                            Cancel
                        </button>
                        <button type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                            {isEditMode ? 'Save Changes' : 'Create Appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AppointmentForm;