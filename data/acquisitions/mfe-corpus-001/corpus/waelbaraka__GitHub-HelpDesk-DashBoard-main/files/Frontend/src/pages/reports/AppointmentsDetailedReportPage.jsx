// src/pages/reports/AppointmentsDetailedReportPage.jsx
import React, { useState, useMemo, useCallback } from 'react';
import { DocumentArrowDownIcon, FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

// --- Dummy Data (Replace with API data in a real app) ---
const initialAppointments = [
    { id: 'A001', patientName: 'Alice Wonderland', service: 'GP Consultation', provider: 'Dr. Jane Smith', date: '2024-03-15', time: '10:00 AM', status: 'Completed', price: 75.00, bookingSource: 'Chatbot' },
    { id: 'A002', patientName: 'Bob The Builder', service: 'Dental Check-up', provider: 'Dr. Emily Davis', date: '2024-03-15', time: '11:30 AM', status: 'Confirmed', price: 120.00, bookingSource: 'Staff' },
    { id: 'A003', patientName: 'Charlie Brown', service: 'Physiotherapy Session', provider: 'Mr. Alex Allen', date: '2024-03-16', time: '02:00 PM', status: 'Cancelled', price: 90.00, bookingSource: 'Patient Portal' },
    { id: 'A004', patientName: 'Diana Prince', service: 'Virtual Consultation', provider: 'Dr. John Doe', date: '2024-03-16', time: '09:00 AM', status: 'Completed', price: 150.00, bookingSource: 'Chatbot' },
    { id: 'A005', patientName: 'Edward Scissorhands', service: 'Blood Pressure Check', provider: 'BP Kiosk Alpha', date: '2024-03-17', time: '03:30 PM', status: 'No-Show', price: 10.00, bookingSource: 'Staff' },
    // Add more appointments to test pagination and filtering
    ...Array.from({ length: 20 }, (_, i) => ({
        id: `A${String(i + 6).padStart(3, '0')}`,
        patientName: `Patient ${String.fromCharCode(65 + i)}`,
        service: i % 3 === 0 ? 'GP Consultation' : (i % 3 === 1 ? 'Dental Check-up' : 'Physiotherapy Session'),
        provider: i % 2 === 0 ? 'Dr. Jane Smith' : 'Dr. Emily Davis',
        date: `2024-03-${String(18 + (i % 5)).padStart(2, '0')}`,
        time: `${String(9 + (i % 4)).padStart(2, '0')}:00 AM`,
        status: i % 4 === 0 ? 'Completed' : (i % 4 === 1 ? 'Confirmed' : (i % 4 === 2 ? 'Cancelled' : 'No-Show')),
        price: 75 + (i * 5),
        bookingSource: i % 2 === 0 ? 'Chatbot' : 'Staff',
    }))
];

const providersList = ['All', 'Dr. Jane Smith', 'Dr. Emily Davis', 'Mr. Alex Allen', 'Dr. John Doe', 'BP Kiosk Alpha'];
const servicesList = ['All', 'GP Consultation', 'Dental Check-up', 'Physiotherapy Session', 'Virtual Consultation', 'Blood Pressure Check'];
const statusesList = ['All', 'Confirmed', 'Completed', 'Cancelled', 'No-Show', 'Pending'];

// --- Helper for CSV Export ---
const convertToCSV = (data) => {
    const array = [Object.keys(data[0])].concat(data);
    return array.map(it => {
        return Object.values(it).map(value => `"${String(value).replace(/"/g, '""')}"`).join(',');
    }).join('\n');
};
const downloadCSV = (csvData, filename = 'appointments_report.csv') => {
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
    }
};


const AppointmentsDetailedReportPage = () => {
    const [appointments, setAppointments] = useState(initialAppointments);
    const [filters, setFilters] = useState({
        dateFrom: '',
        dateTo: '',
        provider: 'All',
        service: 'All',
        status: 'All',
        patientSearch: ''
    });
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleFilterChange = useCallback((e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1); // Reset to first page on filter change
    }, []);

    const handleSort = useCallback((key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }, [sortConfig]);

    const filteredAndSortedAppointments = useMemo(() => {
        let sortableItems = [...appointments];
        // Filtering
        sortableItems = sortableItems.filter(appt => {
            const date = new Date(appt.date);
            const dateFrom = filters.dateFrom ? new Date(filters.dateFrom) : null;
            const dateTo = filters.dateTo ? new Date(filters.dateTo) : null;

            return (
                (!dateFrom || date >= dateFrom) &&
                (!dateTo || date <= dateTo) &&
                (filters.provider === 'All' || appt.provider === filters.provider) &&
                (filters.service === 'All' || appt.service === filters.service) &&
                (filters.status === 'All' || appt.status === filters.status) &&
                (appt.patientName.toLowerCase().includes(filters.patientSearch.toLowerCase()))
            );
        });

        // Sorting
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
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
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100" onClick={() => handleSort(sortKey)}>
            <div className="flex items-center justify-between">
                {children}
                {sortConfig.key === sortKey && (
                    sortConfig.direction === 'ascending' ? <ChevronUpIcon className="w-4 h-4 text-slate-600" /> : <ChevronDownIcon className="w-4 h-4 text-slate-600" />
                )}
            </div>
        </th>
    );

    return (
        <div className="flex-1 flex flex-col bg-slate-50 p-6 overflow-hidden">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-slate-800">Appointments Detailed Report</h1>
                <p className="text-sm text-slate-600 mt-1">View, filter, and export all appointment records.</p>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-4 rounded-lg shadow border border-slate-200 mb-6">
                <h3 className="text-md font-semibold text-slate-700 mb-3 flex items-center"><FunnelIcon className="w-5 h-5 mr-2 text-indigo-500"/>Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="dateFrom" className="block text-xs font-medium text-slate-600">Date From</label>
                        <input type="date" name="dateFrom" id="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} className="form-input mt-1 text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="dateTo" className="block text-xs font-medium text-slate-600">Date To</label>
                        <input type="date" name="dateTo" id="dateTo" value={filters.dateTo} onChange={handleFilterChange} className="form-input mt-1 text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="provider" className="block text-xs font-medium text-slate-600">Provider</label>
                        <select name="provider" id="provider" value={filters.provider} onChange={handleFilterChange} className="form-select mt-1 text-sm">
                            {providersList.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="service" className="block text-xs font-medium text-slate-600">Service</label>
                        <select name="service" id="service" value={filters.service} onChange={handleFilterChange} className="form-select mt-1 text-sm">
                            {servicesList.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-xs font-medium text-slate-600">Status</label>
                        <select name="status" id="status" value={filters.status} onChange={handleFilterChange} className="form-select mt-1 text-sm">
                            {statusesList.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="relative">
                        <label htmlFor="patientSearch" className="block text-xs font-medium text-slate-600">Search Patient</label>
                        <input type="text" name="patientSearch" id="patientSearch" value={filters.patientSearch} onChange={handleFilterChange} placeholder="Enter patient name..." className="form-input mt-1 pl-10 text-sm"/>
                        <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3 top-7"/>
                    </div>
                </div>
            </div>
            
            {/* Action Bar & Summary */}
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-slate-600">
                    Showing <span className="font-semibold">{paginatedAppointments.length}</span> of <span className="font-semibold">{filteredAndSortedAppointments.length}</span> appointments.
                </p>
                <button onClick={handleExport} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center">
                    <DocumentArrowDownIcon className="w-5 h-5 mr-2"/> Export CSV
                </button>
            </div>

            {/* Table */}
            <div className="flex-1 bg-white rounded-lg shadow border border-slate-200 overflow-auto scrollbar-thin">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50 sticky top-0 z-10">
                        <tr>
                            <SortableHeader sortKey="id">ID</SortableHeader>
                            <SortableHeader sortKey="patientName">Patient</SortableHeader>
                            <SortableHeader sortKey="service">Service</SortableHeader>
                            <SortableHeader sortKey="provider">Provider</SortableHeader>
                            <SortableHeader sortKey="date">Date</SortableHeader>
                            <SortableHeader sortKey="time">Time</SortableHeader>
                            <SortableHeader sortKey="status">Status</SortableHeader>
                            <SortableHeader sortKey="price">Price</SortableHeader>
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {paginatedAppointments.map((appt) => (
                            <tr key={appt.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{appt.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{appt.patientName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{appt.service}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{appt.provider}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{appt.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{appt.time}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        appt.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        appt.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                                        appt.status === 'Cancelled' ? 'bg-yellow-100 text-yellow-800' :
                                        appt.status === 'No-Show' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
                                    }`}>
                                        {appt.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 text-right">${appt.price.toFixed(2)}</td>
                            </tr>
                        ))}
                        {paginatedAppointments.length === 0 && (
                             <tr><td colSpan="8" className="text-center p-8 text-slate-500">No appointments match your filters.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center items-center space-x-2">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border border-slate-300 rounded-md text-sm hover:bg-slate-100 disabled:opacity-50">Previous</button>
                    <span className="text-sm text-slate-600">Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border border-slate-300 rounded-md text-sm hover:bg-slate-100 disabled:opacity-50">Next</button>
                </div>
            )}
        </div>
    );
};

export default AppointmentsDetailedReportPage;