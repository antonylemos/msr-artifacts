// src/components/csr/CSR_AppointmentFormModal.jsx
import React, { useState, useEffect, useCallback, useMemo,useRef  } from 'react';
import { XMarkIcon, MagnifyingGlassIcon, InformationCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';

// --- DEFINED SNIPPETS (Would come from admin settings/API in a real app) ---

const noteSnippets = [
    { id: 'ns1', shortcode: '!prep_fasting', label: 'Fasting Required (8h)', text: 'Patient advised to fast for 8 hours prior to the appointment. Only water is permitted.' },
    { id: 'ns2', shortcode: '!bring_reports', label: 'Bring Previous Reports', text: 'Patient reminded to bring all previous medical reports and test results relevant to this consultation.' },
    { id: 'ns3', shortcode: '!arrival_15min', label: 'Arrive 15 Min Early', text: 'Please advise patient to arrive 15 minutes prior to the scheduled appointment time for registration and pre-checks.' },
    { id: 'ns4', shortcode: '!insurance_confirm', label: 'Insurance Confirmation Needed', text: 'CONFIRMATION REQUIRED: Patient needs to confirm insurance coverage for this service prior to appointment. Follow up if not confirmed within 24h.' },
    { id: 'ns5', shortcode: '!telemed_instructions', label: 'Telemedicine Link Info', text: 'A secure telemedicine link will be sent to the patient via SMS/email 30 minutes before the scheduled appointment time. Please ensure contact details are correct.' },
    { id: 'ns6', shortcode: '!post_op_care', label: 'Post-Op Care Instructions', text: 'Provide patient with post-operative care instruction sheet. Schedule follow-up if necessary.'}
];

const CSR_AppointmentFormModal = ({ 
    allServices, 
    allProviders, 
    onSave, 
    onCancel, 
    existingAppointment 
}) => {
    const isEditing = !!existingAppointment?.id;

    const getInitialFormData = () => ({
        patientId: '',
        patientName: '',
        patientPhone: '',
        serviceId: '',
        providerId: '',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        duration: 0,
        notes: '',
        status: 'Pending',
        selectedServiceDetails: null, // To store the full selected service object
    });

    const [formData, setFormData] = useState(getInitialFormData());
    const [patientSearch, setPatientSearch] = useState('');
    const [foundPatients, setFoundPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showSnippets, setShowSnippets] = useState(false);
    const snippetButtonRef = useRef(null); // For detecting clicks outside snippet dropdown
    const snippetDropdownRef = useRef(null);
    const snippetContainerRef = useRef(null); // One ref for the container of button + dropdown

    useEffect(() => {
        if (isEditing && existingAppointment) {
            const serviceForDetails = allServices.find(s => String(s.id) === String(existingAppointment.serviceId));
            setSelectedPatient({ 
                id: existingAppointment.patientId, 
                name: existingAppointment.patientName, 
                phone: existingAppointment.patientPhone 
            });
            setFormData({
                patientId: existingAppointment.patientId || '',
                patientName: existingAppointment.patientName || '',
                patientPhone: existingAppointment.patientPhone || '',
                serviceId: String(existingAppointment.serviceId || ''),
                providerId: String(existingAppointment.providerId || ''),
                date: existingAppointment.date || '',
                time: existingAppointment.time || '',
                duration: existingAppointment.duration || serviceForDetails?.duration || 0,
                notes: existingAppointment.notes || '',
                status: existingAppointment.status || 'Pending',
                selectedServiceDetails: serviceForDetails || null,
            });
        } else if (existingAppointment) { // Pre-filling from slot finder or calendar click (new appointment)
             const serviceForDetails = allServices.find(s => String(s.id) === String(existingAppointment.serviceId));
             setFormData(prev => ({
                ...getInitialFormData(), // Start with defaults for a new appointment
                ...existingAppointment, // Overlay slot data (date, time, providerId, serviceId)
                duration: existingAppointment.duration || serviceForDetails?.duration || 0,
                selectedServiceDetails: serviceForDetails || null,
             }));
             setSelectedPatient(null); // Patient needs to be searched/created for new appt
        } else { // Totally new appointment, no prefill
            setFormData(getInitialFormData());
            setSelectedPatient(null);
        }
    }, [existingAppointment, isEditing, allServices]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleServiceChange = (e) => {
        const serviceId = e.target.value;
        const serviceDetails = allServices.find(s => String(s.id) === serviceId);
        setFormData(prev => ({
            ...prev,
            serviceId,
            duration: serviceDetails?.duration || 0,
            selectedServiceDetails: serviceDetails || null,
            providerId: '' 
        }));
    };
    
    const handlePatientSearch = useCallback(async () => {
        if (!patientSearch.trim()) {
            setFoundPatients([]);
            return;
        }
        const dummyPatients = [ /* ... defined in CSR_AppointmentsDashboard or fetched ... */ 
            { id: 'PAT001', name: 'Alice Wonderland', phone: '555-0101' },
            { id: 'PAT002', name: 'Bob The Builder', phone: '555-0102' },
        ];
        const results = dummyPatients.filter(p => 
            p.name.toLowerCase().includes(patientSearch.toLowerCase()) || 
            p.phone.includes(patientSearch)
        );
        results.push({ id: `NEW_${patientSearch.replace(/\s+/g, '_')}`, name: `Create new: "${patientSearch}"`, phone: 'N/A (New)' });
        setFoundPatients(results);
    }, [patientSearch]);

    const selectPatient = (patient) => {
        if (String(patient.id).startsWith('NEW_')) {
            const newName = patient.name.replace('Create new: "', '').slice(0, -1);
            const tempPatient = { id: `TEMP_${Date.now()}`, name: newName, phone: '' };
            setSelectedPatient(tempPatient);
            setFormData(prev => ({...prev, patientId: tempPatient.id, patientName: tempPatient.name, patientPhone: ''}));
        } else {
            setSelectedPatient(patient);
            setFormData(prev => ({...prev, patientId: patient.id, patientName: patient.name, patientPhone: patient.phone}));
        }
        setFoundPatients([]);
        setPatientSearch('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedPatient?.id || !formData.serviceId || !formData.providerId || !formData.date || !formData.time) {
            alert("Patient, Service, Provider, Date, and Time are required.");
            return;
        }
        const serviceDetails = allServices.find(s => String(s.id) === formData.serviceId);
        const providerDetails = allProviders.find(p => String(p.id) === formData.providerId);
        
        onSave({ 
            ...(isEditing ? existingAppointment : { id: null }), // Pass existing ID if editing, or null for new
            ...formData, 
            patientId: selectedPatient.id,
            patientName: selectedPatient.name,
            patientPhone: selectedPatient.phone || '', // Ensure phone is passed
            serviceName: serviceDetails?.name || 'Unknown Service', 
            providerName: providerDetails?.name || 'Unknown Provider',
            bookedBy: isEditing ? existingAppointment.bookedBy : 'CSR_CurrentUser', 
            bookingSource: isEditing ? existingAppointment.bookingSource : 'CSR_Dashboard'
        });
    };
    
    const providersForSelectedService = useMemo(() => {
        return allProviders.filter(p => p.id !== 'All'); 
    }, [allProviders, formData.serviceId]);

  const handleInsertSnippet = (snippetText) => {
        setFormData(prev => ({
            ...prev,
            notes: prev.notes ? `${prev.notes}\n${snippetText}`.trim() : snippetText
        }));
        setShowSnippets(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showSnippets && snippetContainerRef.current && !snippetContainerRef.current.contains(event.target)) {
                setShowSnippets(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSnippets]);

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-5 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-slate-800">{isEditing ? 'Edit Appointment' : 'Book New Appointment'}</h3>
                    <button onClick={onCancel} className="p-1 text-slate-400 hover:text-slate-600 rounded-full"><XMarkIcon className="w-5 h-5"/></button>
                </div>

                <form id="appointmentFormInternal" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
                    {/* Patient Selection */}
                    <div className="p-3 border border-slate-200 rounded-md bg-slate-50/50">
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Patient*</label>
                        {selectedPatient ? (
                          
                          <div className="flex justify-between items-center p-2.5 bg-indigo-50 border border-indigo-200 rounded-md">
                                <div><p className="font-medium text-indigo-700 text-sm">{selectedPatient.name}</p><p className="text-xs text-indigo-600">{selectedPatient.phone}</p></div>
                                <button type="button" onClick={() => { setSelectedPatient(null); setFormData(prev => ({...prev, patientId: '', patientName: '', patientPhone: ''})); }} className="text-xs text-indigo-600 hover:underline font-medium">Change Patient</button>
                            </div>
                        ) : (
                            <div className="relative">
                                <input type="text" value={patientSearch} onChange={(e) => setPatientSearch(e.target.value)} onBlur={() => setTimeout(() => { if(!document.activeElement.closest('.patient-search-results')) setFoundPatients([]); }, 150) } placeholder="Search by name or phone..." className="form-input w-full pl-10 text-sm"/>
                                <button type="button" onClick={handlePatientSearch} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-indigo-600" title="Search Patients"><MagnifyingGlassIcon className="w-5 h-5"/></button>
                                <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                                {foundPatients.length > 0 && (
                                    <ul className="patient-search-results absolute z-20 w-full bg-white border border-slate-300 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
                                        {foundPatients.map(p => ( <li key={p.id} onClick={() => selectPatient(p)} className="px-3 py-2 hover:bg-slate-100 cursor-pointer text-sm">{p.name} {String(p.id).startsWith('NEW_') || String(p.id).startsWith('TEMP_') ? '' : <span className="text-xs text-slate-500">({p.phone})</span>}</li> ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                    
                    <div><label htmlFor="serviceId" className="block text-sm font-medium text-slate-700">Service*</label><select name="serviceId" id="serviceId" value={formData.serviceId} onChange={handleServiceChange} required className="form-select mt-1 w-full text-sm"><option value="" disabled>Select service</option>{allServices.map(s => <option key={s.id} value={s.id}>{s.name} ({s.duration || '?'} min)</option>)}</select>
                        {formData.selectedServiceDetails?.preparationNotes && (
                            <div className="mt-2 p-2.5 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-700">
                                <div className="flex items-start"><InformationCircleIcon className="w-4 h-4 mr-1.5 mt-px flex-shrink-0"/><p><span className="font-medium">Prep Notes:</span> {formData.selectedServiceDetails.preparationNotes}</p></div>
                            </div>
                        )}
                    </div>
                    <div><label htmlFor="providerId" className="block text-sm font-medium text-slate-700">Provider/Resource*</label><select name="providerId" id="providerId" value={formData.providerId} onChange={handleInputChange} required className="form-select mt-1 w-full text-sm" disabled={!formData.serviceId}><option value="" disabled>Select provider</option>{providersForSelectedService.map(p => <option key={p.id} value={p.id}>{p.name} ({p.type})</option>)}</select></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label htmlFor="date" className="block text-sm font-medium text-slate-700">Date*</label><input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} required className="form-input mt-1 w-full text-sm"/></div>
                        <div><label htmlFor="time" className="block text-sm font-medium text-slate-700">Time*</label><input type="time" name="time" id="time" value={formData.time} onChange={handleInputChange} required className="form-input mt-1 w-full text-sm"/></div>
                    </div>
                    <div><label className="block text-sm font-medium text-slate-700">Duration</label><p className="mt-1 text-sm text-slate-600 bg-slate-100 p-2.5 rounded-md">{formData.duration || 'N/A'} minutes</p></div>
                    
                    <div>
                       
                         <div className="flex justify-between items-center mb-1">
                            <label htmlFor="notes" className="block text-sm font-medium text-slate-700">
                                CSR Notes (Internal & Patient Context)
                            </label>
                            {/* Snippet Button and Dropdown Container */}
                            <div className="relative" ref={snippetContainerRef}> 
                                <button 
                                    type="button"
                                    onClick={() => setShowSnippets(prev => !prev)}
                                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                                    aria-haspopup="true"
                                    aria-expanded={showSnippets}
                                >
                                    <SparklesIcon className="w-3.5 h-3.5 mr-1"/> Insert Snippet
                                </button>
                                {showSnippets && (
                                    <div 
                                        className="absolute right-0 mt-1 w-72 bg-white rounded-md shadow-lg border border-slate-200 z-30 py-1 max-h-60 overflow-y-auto scrollbar-thin"
                                        role="menu"
                                    >
                                        {noteSnippets.map(snippet => (
                                            <button
                                                type="button"
                                                key={snippet.id}
                                                onClick={() => handleInsertSnippet(snippet.text)}
                                                className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 block transition-colors"
                                                title={snippet.text} // Show full text on hover
                                                role="menuitem"
                                            >
                                                <span className="font-medium block truncate">{snippet.label}</span>
                                                <span className="block text-slate-400 text-[10px]">({snippet.shortcode})</span>
                                            </button>
                                        ))}
                                        {noteSnippets.length === 0 && <p className="px-3 py-1.5 text-xs text-slate-500">No snippets defined.</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                        <textarea 
                            name="notes" 
                            id="notes" 
                            value={formData.notes} 
                            onChange={handleInputChange} 
                            rows="5"
                            className="form-textarea mt-1 w-full text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-slate-300 rounded-md"
                            placeholder="Enter reason for visit, patient requests, allergies mentioned by patient, special assistance needs, or use a snippet..."
                        ></textarea>
                        <p className="mt-1 text-xs text-slate-500">Internal notes for staff and provider context. Not typically visible to the patient directly.</p>
                    </div>
                </form>




                
                <div className="p-4 bg-slate-50 flex justify-end space-x-3 border-t border-slate-200">
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 text-sm font-medium">Cancel</button>
                    <button type="submit" form="appointmentFormInternal" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium">{isEditing ? 'Save Changes' : 'Book Appointment'}</button>
                </div>
            </div>
        </div>
    );
};

export default CSR_AppointmentFormModal;