// src/components/csr/AppointmentListTableView.jsx
import React, { useState, useMemo, useCallback } from 'react';
import { 
    DocumentArrowDownIcon, FunnelIcon, MagnifyingGlassIcon, EllipsisVerticalIcon, 
    PencilSquareIcon, XCircleIcon, CheckCircleIcon 
} from '@heroicons/react/24/solid';
import { ChevronUpIcon, ChevronDownIcon, InformationCircleIcon as InfoIconOutline } from '@heroicons/react/24/outline';

// --- Helper for CSV Export ---
const convertToCSV = (data) => {
    if (!data || data.length === 0) return "";
    const array = [Object.keys(data[0])].concat(data);
    return array.map(it => {
        return Object.values(it).map(value => 
            `"${String(value === null || value === undefined ? '' : value).replace(/"/g, '""')}"`
        ).join(',');
    }).join('\n');
};

const downloadCSV = (csvData, filename = 'appointments_csr_view.csv') => {
    if (!csvData) return;
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
};

const AppointmentListTableView = ({ appointments, providersList, servicesList, statusesList, handlers }) => {


     const { onEditAppointment, onCancelAppointment, onChangeStatus, onOpenServiceDetailsPopover } = handlers;

    const [filters, setFilters] = useState({ dateFrom: '', dateTo: '', providerId: 'All', serviceId: 'All', status: 'All', patientSearch: '' });
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [activeActionMenu, setActiveActionMenu] = useState(null);

    const handleFilterChange = useCallback((e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1);
    }, []);

    const handleSort = useCallback((key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending'
        }));
    }, []);

     const handleViewServiceDetails = useCallback((serviceId, e) => {
        e.stopPropagation();
        if (onOpenServiceDetailsPopover) {
            onOpenServiceDetailsPopover(serviceId);
        }
    }, [onOpenServiceDetailsPopover]);

    const filteredAndSortedAppointments = useMemo(() => {
        let filtered = [...appointments];
        // Apply filters
        filtered = filtered.filter(appt => 
            (!filters.dateFrom || appt.date >= filters.dateFrom) &&
            (!filters.dateTo || appt.date <= filters.dateTo) &&
            (filters.providerId === 'All' || String(appt.providerId) === filters.providerId) &&
            (filters.serviceId === 'All' || String(appt.serviceId) === filters.serviceId) &&
            (filters.status === 'All' || appt.status === filters.status) &&
            (appt.patientName.toLowerCase().includes(filters.patientSearch.toLowerCase()) || 
             (appt.patientPhone && appt.patientPhone.includes(filters.patientSearch)))
        );
        // Apply sort
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];
                if (valA === null || valA === undefined) return 1; // Push nulls/undefined to the end
                if (valB === null || valB === undefined) return -1;
                if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [appointments, filters, sortConfig]);

    const totalPages = Math.ceil(filteredAndSortedAppointments.length / itemsPerPage);
    const paginatedAppointments = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredAndSortedAppointments.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredAndSortedAppointments, currentPage, itemsPerPage]);
    
    const handleExport = () => {
        if (filteredAndSortedAppointments.length === 0) {
            alert("No data to export.");
            return;
        }
        const csv = convertToCSV(filteredAndSortedAppointments);
        downloadCSV(csv);
    };

    const SortableHeader = ({ children, sortKey }) => (
        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort(sortKey)}>
            <div className="flex items-center justify-between pr-2">
                {children}
                {sortConfig.key === sortKey && (sortConfig.direction === 'ascending' ? <ChevronUpIcon className="w-3 h-3 text-slate-600" /> : <ChevronDownIcon className="w-3 h-3 text-slate-600" />)}
            </div>
        </th>
    );
    
    const statusColors = {
        Pending: 'bg-slate-100 text-slate-700 border border-slate-300',
        Confirmed: 'bg-blue-100 text-blue-800 border border-blue-300',
        'Checked-In': 'bg-teal-100 text-teal-800 border border-teal-300',
        Completed: 'bg-green-100 text-green-800 border border-green-300',
        Cancelled: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
        'No-Show': 'bg-red-100 text-red-800 border border-red-300',
    };

    const availableStatusActions = (currentStatus) => {
        const actions = [];
        if (currentStatus !== 'Confirmed' && ['Pending'].includes(currentStatus)) actions.push({ label: 'Mark Confirmed', status: 'Confirmed', icon: CheckCircleIcon, color: 'text-blue-500' });
        if (currentStatus !== 'Checked-In' && ['Confirmed'].includes(currentStatus)) actions.push({ label: 'Mark Checked-In', status: 'Checked-In', icon: CheckCircleIcon, color: 'text-teal-500' });
        if (currentStatus !== 'Completed' && ['Checked-In', 'Confirmed'].includes(currentStatus)) actions.push({ label: 'Mark Completed', status: 'Completed', icon: CheckCircleIcon, color: 'text-green-500' });
        if (currentStatus !== 'No-Show' && ['Confirmed', 'Pending', 'Checked-In'].includes(currentStatus)) actions.push({ label: 'Mark No-Show', status: 'No-Show', icon: XCircleIcon, color: 'text-orange-500' });
        return actions;
    };

    return (
        <>
            {viewingServiceDetails && (
                <ServiceDetailPopover 
                    service={viewingServiceDetails} 
                    onClose={handleCloseServicePopover}
                />
            )}

            <div className="bg-white rounded-lg shadow border border-slate-200 flex flex-col h-full">
                {/* Filters Section */}
                <div className="p-4 border-b border-slate-200">
                    <h3 className="text-md font-semibold text-slate-700 mb-3 flex items-center"><FunnelIcon className="w-5 h-5 mr-2 text-indigo-500"/>Filter Appointments</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <div><label htmlFor="dateFrom" className="block text-xs font-medium text-slate-600 mb-1">From</label><input type="date" name="dateFrom" id="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} className="form-input text-sm w-full"/></div>
                        <div><label htmlFor="dateTo" className="block text-xs font-medium text-slate-600 mb-1">To</label><input type="date" name="dateTo" id="dateTo" value={filters.dateTo} onChange={handleFilterChange} className="form-input text-sm w-full"/></div>
                        <div><label htmlFor="providerId" className="block text-xs font-medium text-slate-600 mb-1">Provider</label><select name="providerId" id="providerId" value={filters.providerId} onChange={handleFilterChange} className="form-select text-sm w-full">{providersList.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
                        <div><label htmlFor="serviceId" className="block text-xs font-medium text-slate-600 mb-1">Service</label><select name="serviceId" id="serviceId" value={filters.serviceId} onChange={handleFilterChange} className="form-select text-sm w-full">{servicesList.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
                        <div><label htmlFor="status" className="block text-xs font-medium text-slate-600 mb-1">Status</label><select name="status" id="status" value={filters.status} onChange={handleFilterChange} className="form-select text-sm w-full">{statusesList.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                        <div className="relative"><label htmlFor="patientSearch" className="block text-xs font-medium text-slate-600 mb-1">Patient Name/Phone</label><input type="text" name="patientSearch" id="patientSearch" value={filters.patientSearch} onChange={handleFilterChange} placeholder="Search..." className="form-input pl-9 text-sm w-full"/><MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-2.5 top-7"/></div>
                    </div>
                </div>
                
                <div className="p-4 flex justify-between items-center border-b border-slate-200">
                     <p className="text-xs text-slate-600">Showing <span className="font-semibold">{paginatedAppointments.length}</span> of <span className="font-semibold">{filteredAndSortedAppointments.length}</span> appointments.</p>
                    <button onClick={handleExport} className="text-indigo-600 hover:text-indigo-700 text-xs font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed" disabled={filteredAndSortedAppointments.length === 0}>
                        <DocumentArrowDownIcon className="w-4 h-4 mr-1"/> Export CSV
                    </button>
                </div>

                <div className="flex-grow overflow-auto scrollbar-thin">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50 sticky top-0 z-10">
                            <tr>
                                <SortableHeader sortKey="date">Date & Time</SortableHeader>
                                <SortableHeader sortKey="patientName">Patient</SortableHeader>
                                <SortableHeader sortKey="serviceName">Service</SortableHeader>
                                <SortableHeader sortKey="providerName">Provider</SortableHeader>
                                <SortableHeader sortKey="status">Status</SortableHeader>
                                <SortableHeader sortKey="notes">Notes</SortableHeader>
                                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {paginatedAppointments.map((appt) => (
                                <tr key={appt.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-700"><div>{appt.date}</div><div className="text-slate-500">{appt.time}</div></td>
                                    <td className="px-4 py-3 whitespace-nowrap text-xs"><div className="font-medium text-slate-800">{appt.patientName}</div><div className="text-slate-500">{appt.patientPhone || 'N/A'}</div></td>
                                    <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-700">
                                        <div className="flex items-center">
                                            <span>{appt.serviceName}</span>
                                            {servicesList.find(s => String(s.id) === String(appt.serviceId))?.preparationNotes && (
                                                <button onClick={(e) => handleViewServiceDetails(appt.serviceId, e)} title="View Service Details" className="ml-1.5 p-0.5 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100"><InfoIconOutline className="w-3.5 h-3.5"/></button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-xs text-slate-700">{appt.providerName}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-xs"><span className={`px-2 py-1 inline-flex text-[11px] leading-tight font-semibold rounded-full ${statusColors[appt.status] || 'bg-slate-100 text-slate-800 border border-slate-300'}`}>{appt.status}</span></td>
                                    <td className="px-4 py-3 text-xs text-slate-500 max-w-xs truncate" title={appt.notes}>{appt.notes || '-'}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-right text-xs relative">
                                        <button onClick={(e) => { e.stopPropagation(); setActiveActionMenu(activeActionMenu === appt.id ? null : appt.id);}} className="p-1 text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"><EllipsisVerticalIcon className="w-4 h-4"/></button>
                                        {activeActionMenu === appt.id && (
                                            <div className="absolute right-0 mt-1 w-52 bg-white rounded-md shadow-lg border border-slate-200 z-20 py-1" onMouseLeave={() => setActiveActionMenu(null)}>
                                                <button onClick={() => { onEditAppointment(appt); setActiveActionMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 flex items-center transition-colors"><PencilSquareIcon className="w-4 h-4 mr-2 text-blue-500"/>Edit / Reschedule</button>
                                                {availableStatusActions(appt.status).map(action => (<button key={action.status} onClick={() => { onChangeStatus(appt.id, action.status); setActiveActionMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 flex items-center transition-colors"><action.icon className={`w-4 h-4 mr-2 ${action.color}`}/>{action.label}</button>))}
                                                {appt.status !== 'Cancelled' && appt.status !== 'No-Show' && (<><div className="my-1 border-t border-slate-100"></div><button onClick={() => { onCancelAppointment(appt.id); setActiveActionMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center transition-colors"><XCircleIcon className="w-4 h-4 mr-2"/>Cancel Appointment</button></>)}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {paginatedAppointments.length === 0 && (<tr><td colSpan="7" className="text-center p-8 text-slate-500">No appointments match your filters.</td></tr>)}
                        </tbody>
                    </table>
                </div>
                {totalPages > 1 && (<div className="p-4 flex justify-center items-center space-x-2 border-t border-slate-200"><button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border border-slate-300 rounded-md text-xs hover:bg-slate-100 disabled:opacity-50 transition-colors">Prev</button><span className="text-xs text-slate-600">Page {currentPage} of {totalPages}</span><button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border border-slate-300 rounded-md text-xs hover:bg-slate-100 disabled:opacity-50 transition-colors">Next</button></div>)}
            </div>
        </>
    );
};

export default AppointmentListTableView;