// src/components/appointments/AppointmentList.jsx
import React from 'react';
import { AdjustmentsHorizontalIcon, EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ChevronDownIcon } from '@heroicons/react/24/outline'; // Using outline for chevron
import { StatusBadge } from './utils';

const AppointmentList = React.memo(({
    appointments,
    currentViewLabel,
    searchTerm,
    onSearchTermChange,
    onAppointmentClick,
    onAddFilterClick,
    sortOrder,
    onSortOrderChange
}) => {
    const totalAppointments = appointments.length;

    return (
        // FIX: Removed bg-white, border, rounded-lg, overflow-hidden
        <div className="overflow-hidden"> {/* Container for the table without card styles */}
            {/* List Header/Toolbar */}
            {/* FIX: Removed border-b from this div, as the px-4 py-3 text-sm line will provide the separation */}
            <div className="p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-800">
                    {currentViewLabel}
                </h2>
                <div className="flex items-center space-x-3">
                    <div className="relative w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                            type="search"
                            placeholder="Search appointments..."
                            value={searchTerm}
                            onChange={(e) => onSearchTermChange(e.target.value)}
                            className="w-full bg-white text-slate-700 text-sm rounded-md py-2 pl-9 pr-3 border border-slate-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-slate-400"
                        />
                    </div>
                    <button onClick={onAddFilterClick} className="border border-slate-300 bg-white text-slate-600 hover:bg-slate-50 px-3.5 py-1.5 rounded-md text-sm font-medium flex items-center transition-colors">
                        <AdjustmentsHorizontalIcon className="w-5 h-5 mr-1.5 text-slate-500" />
                        Add filter
                    </button>
                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            value={sortOrder}
                            onChange={(e) => onSortOrderChange(e.target.value)}
                            className="pl-3 pr-8 py-1.5 text-sm font-medium text-slate-700 bg-gray-50 hover:bg-gray-100 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                        >
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>
                            {/* Add more sort options if needed */}
                        </select>
                        <ChevronDownIcon className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* FIX: This div now provides the separation. Add bg-white to ensure content is white. */}
            <div className="px-4 py-3 text-sm text-slate-500 border-b border-slate-200 bg-white">
                {totalAppointments} appointments
            </div>

            {/* Appointment Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="w-10 px-4 py-3 text-left"><input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Service Type</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Provider</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="relative px-4 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {totalAppointments > 0 ? (
                            appointments.map((appointment) => (
                                <tr key={appointment.id} className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => onAppointmentClick(appointment.id)}>
                                    <td className="px-4 py-3"><input type="checkbox" onClick={(e) => e.stopPropagation()} className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" /></td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`w-8 h-8 ${appointment.client?.avatarColor || 'bg-gray-400'} rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 flex-shrink-0`}>{appointment.client?.avatarInitials || appointment.client_name?.charAt(0).toUpperCase()}</div>
                                            <div>
                                                <div className="text-sm font-medium text-slate-700">{appointment.client_name}</div>
                                                <div className="text-xs text-slate-500">{appointment.client_email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-700 truncate max-w-xs" title={appointment.subject}>{appointment.subject}</td>
                                    <td className="px-4 py-3 text-sm text-slate-700">{appointment.service_display_name}</td>
                                    <td className="px-4 py-3 text-sm text-slate-500">{appointment.provider_info?.name_snapshot || 'N/A'}</td>
                                    <td className="px-4 py-3 text-sm text-slate-500">{appointment.location_key || 'N/A'}</td>
                                    <td className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">{appointment.appointment_date_str_local} at {appointment.appointment_time_str_local}</td>
                                    <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={appointment.status} /></td>
                                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={(e) => {e.stopPropagation(); console.log("Actions for", appointment.id)}} className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
                                            <EllipsisHorizontalIcon className="w-5 h-5"/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="px-4 py-6 text-center text-sm text-slate-500">
                                    No appointments found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default AppointmentList;