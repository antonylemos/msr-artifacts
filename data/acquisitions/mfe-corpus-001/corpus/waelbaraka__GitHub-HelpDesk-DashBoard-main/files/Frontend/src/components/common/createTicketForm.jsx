// src/components/common/CreateTicketForm.jsx
import React, { useState, useCallback, useEffect } from 'react';
import { PlusIcon, InformationCircleIcon } from '@heroicons/react/24/solid'; // Assuming these are for "Add Tag" and info icons

const CreateTicketForm = React.memo(({ client, onSubmit, onCancel }) => {
    // Initialize formData based on client prop or defaults
    const [formData, setFormData] = useState({
        ticketSubject: `Ticket for ${client?.name || 'selected client'}`,
        customerName: client?.name || '',
        customerEmail: client?.email || '',
        team: 'General',
        agent: 'Unassigned',
        priority: 'Medium',
        status: 'Open',
        copyTags: false,
        privateNote: '',
        sendNotification: true,
    });

    // Effect to update form if client changes
    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            ticketSubject: `Ticket for ${client?.name || 'selected client'}`,
            customerName: client?.name || prevData.customerName || '',
            customerEmail: client?.email || prevData.customerEmail || '',
        }));
    }, [client]);


    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }, []);

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        // Basic validation (can be expanded)
        if (!formData.ticketSubject.trim() || !formData.customerName.trim() || !formData.customerEmail.trim()) {
            alert("Please fill in all required fields: Subject, Customer Name, and Customer Email.");
            return;
        }
        if (onSubmit) {
            onSubmit(formData); // Pass the form data to the parent handler
        }
        // Optionally reset form or close modal here if onSubmit doesn't handle it
    }, [formData, onSubmit]);

    return (
        // Added p-4 for padding if this form is used outside a pre-padded container
        <form onSubmit={handleSubmitForm} className="space-y-4 text-sm text-gray-700 p-4">
            <h2 className="text-lg font-semibold text-gray-800">Create ticket in HelpDesk</h2>

            {/* Ticket Subject */}
            <div>
                <label htmlFor="ticketSubject" className="block text-gray-600 mb-1">Ticket subject</label>
                <input
                    type="text" id="ticketSubject" name="ticketSubject"
                    value={formData.ticketSubject} onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ticket subject" required
                />
            </div>

            {/* Customer's Name */}
            <div>
                <label htmlFor="customerName" className="block text-gray-600 mb-1">Customer's name</label>
                <input
                    type="text" id="customerName" name="customerName"
                    value={formData.customerName} onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            {/* Customer's Email */}
            <div>
                <label htmlFor="customerEmail" className="block text-gray-600 mb-1">Customer's email</label>
                <input
                    type="email" id="customerEmail" name="customerEmail"
                    value={formData.customerEmail} onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            {/* Team Dropdown */}
            <div>
                <label htmlFor="team" className="block text-gray-600 mb-1">Team</label>
                <select id="team" name="team" value={formData.team} onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-blue-500 focus:border-blue-500 bg-white">
                    <option value="General">General</option>
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                </select>
            </div>

            {/* Agent Dropdown */}
            <div>
                <label htmlFor="agent" className="block text-gray-600 mb-1">Agent</label>
                <select id="agent" name="agent" value={formData.agent} onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-blue-500 focus:border-blue-500 bg-white">
                    <option value="Unassigned">Unassigned</option>
                    <option value="Waelomeradam9">Waelomeradam9</option>
                    <option value="Pytsud">Pytsud</option>
                </select>
            </div>

            {/* Priority Dropdown */}
            <div>
                <label htmlFor="priority" className="block text-gray-600 mb-1">Priority</label>
                <select id="priority" name="priority" value={formData.priority} onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-blue-500 focus:border-blue-500 bg-white">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            {/* Status Dropdown */}
            <div>
                <label htmlFor="status" className="block text-gray-600 mb-1">Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-blue-500 focus:border-blue-500 bg-white">
                    <option value="Open">Open</option>
                    <option value="Pending">Pending</option>
                    <option value="Solved">Solved</option>
                </select>
            </div>

            {/* Tags Toggle & Add Tag */}
            <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                    <label htmlFor="copyTags" className="flex items-center cursor-pointer text-gray-600 mr-2">
                        <div className="relative">
                            <input type="checkbox" id="copyTags" name="copyTags" className="sr-only peer" checked={formData.copyTags} onChange={handleChange} />
                            <div className="block bg-gray-300 w-10 h-5 rounded-full transition-colors peer-checked:bg-blue-600"></div>
                            <div className={`dot absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full`}></div>
                        </div>
                        <span className="ml-2">Copy tags from chat</span>
                    </label>
                    <InformationCircleIcon className="w-4 h-4 text-gray-500 ml-1" title="If created from a chat, copies existing chat tags."/>
                </div>
                <button type="button" className="text-blue-600 hover:underline flex items-center">
                    <PlusIcon className="w-4 h-4 mr-1"/> Add tag
                </button>
            </div>

            {/* Private Note */}
            <div>
                <label htmlFor="privateNote" className="block text-gray-600 mb-1">Private note (optional)</label>
                <textarea
                    id="privateNote" name="privateNote"
                    value={formData.privateNote} onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md resize-y focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter private note" rows="3"
                ></textarea>
            </div>

            {/* Send Notification Checkbox */}
            <div className="flex items-center pt-2">
                <input
                    type="checkbox" id="sendNotification" name="sendNotification"
                    checked={formData.sendNotification} onChange={handleChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="sendNotification" className="ml-2 text-gray-700">Send notification to the customer</label>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-4">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
                >
                    Create ticket
                </button>
            </div>

            <p className="text-xs text-gray-500 text-center pt-1">
                Ticket with chat transcript will be created. Customer will receive the transcript, too.
            </p>
        </form>
    );
});

export default CreateTicketForm;