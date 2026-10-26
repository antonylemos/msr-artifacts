// src/components/appointments/AppointmentDetailView.jsx
import React from 'react';
import { ArrowLeftIcon, PencilIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import { StatusBadge } from './utils'; // <<<< FIX: Import StatusBadge from utils

const AppointmentDetailView = ({ appointment, onBackToList, onEditAppointment, onSendReminder }) => {
    if (!appointment) return null;
    return (
        <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center">
                    <button onClick={onBackToList} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full mr-3">
                        <ArrowLeftIcon className="w-5 h-5"/>
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">Appointment #{appointment.appointment_id_human_readable || appointment.id}</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={() => onSendReminder(appointment)}
                        className="px-3 py-1.5 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600 flex items-center">
                        <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1.5" /> Send Reminder
                    </button>
                    <button onClick={() => onEditAppointment(appointment)}
                        className="px-3 py-1.5 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 flex items-center">
                        <PencilIcon className="w-4 h-4 mr-1.5" /> Edit
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Client Info */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">Client Details</h3>
                    <p className="text-gray-700 mb-1"><strong>Name:</strong> {appointment.client_name}</p>
                    <p className="text-gray-700 mb-1"><strong>Phone:</strong> {appointment.client_contact_phone}</p>
                    <p className="text-gray-700 mb-1"><strong>Email:</strong> {appointment.client_email || 'N/A'}</p>
                    <button className="mt-3 text-blue-600 hover:underline text-sm">Go to Client Profile →</button>
                </div>

                {/* Service & Provider Info */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">Service Details</h3>
                    <p className="text-gray-700 mb-1"><strong>Service:</strong> {appointment.service_display_name}</p>
                    <p className="text-gray-700 mb-1"><strong>Provider:</strong> {appointment.provider_info?.name_snapshot || 'N/A'}</p>
                    <p className="text-gray-700 mb-1"><strong>Location:</strong> {appointment.location_key || 'N/A'}</p>
                    <p className="text-gray-700 mb-1"><strong>Department:</strong> {appointment.department_key || 'N/A'}</p>
                    <p className="text-gray-700 mb-1"><strong>Duration:</strong> {appointment.estimated_duration_minutes} mins</p>
                </div>
            </div>

            {/* Scheduling & Status */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Scheduling & Status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    <p className="text-gray-700"><strong>Date:</strong> {new Date(appointment.appointment_datetime_utc).toLocaleDateString()}</p>
                    <p className="text-gray-700"><strong>Time:</strong> {appointment.appointment_time_str_local}</p>
                    <p className="text-gray-700"><strong>Booked Via:</strong> {appointment.booking_channel}</p>
                    <p className="text-gray-700"><strong>Status:</strong> <StatusBadge status={appointment.status} /></p>
                    <div className="col-span-full mt-2 flex items-center space-x-2">
                        <select
                            value={appointment.status}
                            onChange={(e) => {
                                const updatedAppt = { ...appointment, status: e.target.value };
                                onEditAppointment(updatedAppt);
                            }}
                            className="border border-gray-300 rounded-md p-2 text-sm text-gray-700"
                        >
                            {['scheduled', 'pending', 'confirmed', 'completed', 'cancelled', 'no_show'].map(s => (
                                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Financial & Notes */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Financial & Notes</h3>
                <p className="text-gray-700 mb-1"><strong>Price:</strong> ${appointment.price?.toFixed(2) || 'N/A'}</p>
                <p className="text-gray-700 mb-1"><strong>Payment Status:</strong> {appointment.payment_status || 'N/A'}</p>
                <p className="text-gray-700 mt-3"><strong>Internal Notes:</strong> {appointment.notes_internal || 'None'}</p>
                <p className="text-gray-700 mt-1"><strong>Notes for Client:</strong> {appointment.notes_for_client || 'None'}</p>
            </div>

            {/* Related Entities (Placeholders) */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Related Items</h3>
                <p className="text-gray-700 mb-1"><strong>Related Conversation:</strong> <button className="text-blue-600 hover:underline">View Conversation →</button> (ID: {appointment.related_conversation_id_ref || 'N/A'})</p>
                <p className="text-gray-700 mb-1"><strong>Related Ticket:</strong> <button className="text-blue-600 hover:underline">View Ticket →</button> (ID: {appointment.related_ticket_id_ref || 'N/A'})</p>
            </div>
        </div>
    );
};

export default AppointmentDetailView;