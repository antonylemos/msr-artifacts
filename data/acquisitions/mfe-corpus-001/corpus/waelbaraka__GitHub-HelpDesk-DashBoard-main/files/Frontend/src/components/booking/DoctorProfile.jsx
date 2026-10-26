// src/components/booking/DoctorProfile.jsx
import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

const ReviewCard = ({ review }) => (
    <div className="flex space-x-3">
        <img src={review.avatarUrl} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
            <div className="flex justify-between items-center">
                <h5 className="font-semibold text-sm text-slate-800">{review.name}</h5>
                <p className="text-xs text-slate-400">{review.date}</p>
            </div>
            <p className="text-sm text-slate-600 mt-1">{review.comment}</p>
        </div>
    </div>
);

const DoctorProfile = ({ doctor, onBookAppointment }) => {
    if (!doctor) {
        return <div className="flex items-center justify-center h-full text-slate-400 p-6">Select an entity to see their profile.</div>;
    }

    const isResource = doctor.type === 'resource';

    // --- Fallback for array properties to prevent .join or .map errors ---
    const education = Array.isArray(doctor.education) ? doctor.education : [];
    const availability = Array.isArray(doctor.availability) ? doctor.availability : [];
    const schedule = doctor.schedule || (isResource ? "Check kiosk for operating hours" : "Not specified");
    const symptoms = Array.isArray(doctor.symptoms) ? doctor.symptoms : [];
    const procedures = Array.isArray(doctor.procedures) ? doctor.procedures : [];
    const reviews = Array.isArray(doctor.reviews) ? doctor.reviews : [];

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex space-x-5 items-start">
                {isResource ? (
                    doctor.avatarUrl ? 
                        <img src={doctor.avatarUrl} alt={doctor.name} className="w-24 h-24 rounded-md object-contain p-2 bg-slate-100" /> 
                        : <div className="w-24 h-24 rounded-md bg-slate-200 flex items-center justify-center text-slate-400 text-4xl">?</div>
                ) : (
                    <img src={doctor.avatarUrl} alt={doctor.name} className="w-24 h-24 rounded-full object-cover" />
                )}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-800">{doctor.name}</h2>
                    <p className="text-slate-500">{doctor.specialty}</p>
                    {!isResource && doctor.experience && (
                         <p className="text-sm text-slate-500">{doctor.experience}</p>
                    )}
                    <button 
                        onClick={() => onBookAppointment(doctor)}
                        className="mt-3 w-full bg-teal-500 text-white rounded-lg py-2.5 font-semibold hover:bg-teal-600 transition-colors"
                    >
                        {isResource ? 'Book This Service' : 'Book an Appointment'}
                    </button>
                </div>
            </div>

            {/* Details */}
            <div className="space-y-4 text-sm">
                {!isResource && education.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-1">Education</h4>
                        <p className="text-slate-600">{education.join(', ')}</p>
                    </div>
                )}

                {!isResource && availability.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-1">Available Today</h4>
                        <p className="text-slate-600">{availability.join(' • ')}</p>
                    </div>
                )}

                <div>
                    <h4 className="font-semibold text-slate-700 mb-1">Schedule</h4>
                    <p className="text-slate-600">{schedule}</p>
                </div>

                {!isResource && symptoms.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-1">Symptoms Addressed</h4>
                        <div className="flex flex-wrap gap-2">
                            {symptoms.map(symptom => <span key={symptom} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">{symptom}</span>)}
                        </div>
                    </div>
                )}

                {!isResource && procedures.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-1">Specialty Procedures</h4>
                        <div className="flex flex-wrap gap-2">
                            {procedures.map(proc => <span key={proc} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">{proc}</span>)}
                        </div>
                    </div>
                )}

                {isResource && doctor.description && ( // Example: Add a description for resources
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-1">Description</h4>
                        <p className="text-slate-600">{doctor.description}</p>
                    </div>
                )}
            </div>
            
            {/* Reviews (Typically only for doctors/personnel) */}
            {!isResource && reviews.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3">Doctor's Reviews ({reviews.length} Reviews)</h3>
                    <div className="space-y-5">
                        {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorProfile;