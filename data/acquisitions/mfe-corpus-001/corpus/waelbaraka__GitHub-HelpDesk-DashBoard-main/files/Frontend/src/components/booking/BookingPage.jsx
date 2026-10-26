// src/components/booking/BookingPage.jsx
import React, { useState, useMemo, useCallback } from 'react';

// Import the child components
import CategoryFilter from './CategoryFilter';
import EntityCard from './EntityCard'; // Assuming DoctorCard was renamed to EntityCard
import DoctorProfile from './DoctorProfile'; // This will need to become more generic or conditional
import BookingModal from './BookingModal';
import DoctorScheduleCalendar from './DoctorScheduleCalendar';

// --- Dummy Data ---
const categories = [
    { id: 'psychology', name: 'Psychology' }, 
    { id: 'pediatrics', name: 'Pediatrics' }, 
    { id: 'traumatology', name: 'Traumatology' },
    { id: 'anesthesiology', name: 'Anesthesiology' }, 
    { id: 'opthalmology', name: 'Opthalmology' },
    { id: 'diagnostics', name: 'Diagnostics' }, // Added for the resource
];

const allEntities = [ // Renamed from allDoctors
    { 
        id: 1, categoryId: 'psychology', name: 'Dr. Cris Jhonson', 
        specialty: 'Psychology Specialist', experience: '5 years experience', 
        rating: 4.9, avatarUrl: 'https://i.pravatar.cc/150?img=1', 
        availability: ['Available Today', 'Online Consultation', 'Offline at Doctora Hospitals, California'], 
        consultationType: 'Fee Consultation', priceRange: { min: 25, max: 385 }, 
        type: 'doctor' 
    },
    { 
        id: 2, categoryId: 'psychology', name: 'Dr. Bella Megan', 
        specialty: 'Psychology', experience: '9 years experience', 
        rating: 4.7, avatarUrl: 'https://i.pravatar.cc/150?img=5', 
        availability: ['Available Today', 'Online Consultation'], 
        consultationType: 'Fee Consultation', priceRange: { min: 17, max: 243 }, 
        type: 'doctor' 
    },
    { 
        id: 3, categoryId: 'pediatrics', name: 'Dr. Leo Shah', 
        specialty: 'Cardiology', experience: '10 years experience', 
        rating: 4.9, avatarUrl: 'https://i.pravatar.cc/150?img=3', 
        availability: ['Offline at Health Plus Clinic, New York'], 
        consultationType: 'Free Consultation', priceRange: { min: 50, max: 300 }, 
        type: 'doctor' 
    },
    { 
        id: 4, categoryId: 'pediatrics', name: 'Dr. Emma Liu', 
        specialty: 'Pediatrics', experience: '8 years experience', 
        rating: 4.8, avatarUrl: 'https://i.pravatar.cc/150?img=4', 
        availability: ['Offline at KidsCare, Texas'], 
        consultationType: 'Fee Consultation', priceRange: { min: 90, max: 210 }, 
        type: 'doctor' 
    },
    // Add a resource to the booking list
    { 
      id: 701, 
      categoryId: 'diagnostics', 
      name: 'Blood Pressure Kiosk Alpha', 
      specialty: 'Automated Screening', 
      type: 'resource', 
      avatarUrl: 'https://img.icons8.com/fluency-systems-filled/96/000000/health-checkup.png', // Example icon
      priceRange: { min: 10, max: 10 } 
    }
];

const allReviews = {
    1: [ {id: 1, name: 'Nadia Tailor', date: '15 May 2025', comment: "Dr. Jhonson's approach changed the way I see myself. He's incredibly patient.", avatarUrl: 'https://i.pravatar.cc/150?img=6' }, {id: 2, name: 'Ethan Parker', date: '22 June 2025', comment: "Dr. Johnson's approach is transformative. His insights have led me to profound personal growth.", avatarUrl: 'https://i.pravatar.cc/150?img=7' }, {id: 3, name: 'Sofia Ramirez', date: '10 July 2025', comment: "I was hesitant at first, but Dr. Johnson's expertise made all the difference.", avatarUrl: 'https://i.pravatar.cc/150?img=8' } ],
    2: [ {id: 4, name: 'Liam Chen', date: '18 July 2025', comment: "Dr. Megan is compassionate and understanding. Highly recommend.", avatarUrl: 'https://i.pravatar.cc/150?img=9' } ],
    3: [ {id: 5, name: 'Olivia Gonzalez', date: '02 Aug 2025', comment: "Dr. Shah is a lifesaver, literally. Very professional and caring.", avatarUrl: 'https://i.pravatar.cc/150?img=10' } ],
    4: [ {id: 6, name: 'Noah Patel', date: '05 Aug 2025', comment: "Dr. Liu was fantastic with my son. She made him feel comfortable and at ease.", avatarUrl: 'https://i.pravatar.cc/150?img=11' } ],
};

const doctorAppointments = [
    { id: 1, doctorId: 1, date: '2022-08-09', startTime: '08:45', endTime: '09:00', title: 'Sprint reviews', colorClass: 'bg-orange-100 border-l-4 border-orange-400' },
    { id: 5, doctorId: 1, date: '2022-08-11', startTime: '08:00', endTime: '09:40', title: '1 hour offline meeting for BAs', colorClass: 'bg-blue-100 border-l-4 border-blue-400' },
    // Add appointments for the resource if needed for the calendar
    { id: 10, doctorId: 701, date: '2022-08-10', startTime: '10:00', endTime: '10:15', title: 'BP Check Slot', colorClass: 'bg-green-100 border-l-4 border-green-400' },
];

// --- CORRECTED VARIABLE NAME HERE ---
const entitiesWithDetails = allEntities.map(entity => ({
    ...entity,
    // Add default empty arrays for resource types if these fields don't apply
    education: entity.type === 'doctor' ? ['PhD in Clinical Psychology, UCLA', 'Certified CBT Therapist, APA'] : [],
    schedule: entity.type === 'doctor' ? 'Monday - Saturday 10:00 - 20:00' : 'Check Kiosk for Availability',
    symptoms: entity.type === 'doctor' ? ['Anxiety & Panic Attacks', 'Stress', 'Depression', 'Sleep Disorders'] : [],
    procedures: entity.type === 'doctor' ? ['Cognitive Behavioral Therapy (CBT)', 'Family & Couples Therapy'] : [],
    reviews: allReviews[entity.id] || [],
    appointments: doctorAppointments.filter(appt => appt.doctorId === entity.id) // doctorId here matches entity.id
}));


const BookingPage = () => {
    const [activeCategoryId, setActiveCategoryId] = useState('all');
    const [selectedEntity, setSelectedEntity] = useState(entitiesWithDetails[0]); // Use corrected variable
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredEntities = useMemo(() => {
        if (activeCategoryId === 'all') return entitiesWithDetails;
        return entitiesWithDetails.filter(doc => doc.categoryId === activeCategoryId);
    }, [activeCategoryId]);
    
    const handleSelectEntity = useCallback((entity) => {
        setSelectedEntity(entity);
    }, []);

    const handleBookAppointment = useCallback((entity) => {
        // Here you would pass the selected entity's info to the modal
        // Ensure selectedEntity is up-to-date if the button is on a different entity than the profile
        if (entity) setSelectedEntity(entity); 
        setIsModalOpen(true);
    }, []);
    
    const handleConfirmBooking = useCallback(() => {
        if (selectedEntity) {
            alert(`Booking confirmed for ${selectedEntity.name}! (Payment simulation)`);
        }
        setIsModalOpen(false);
    }, [selectedEntity]);

    return (
        <div className="h-full w-full bg-slate-50 flex flex-col">
            {isModalOpen && selectedEntity && <BookingModal doctor={selectedEntity} onConfirm={handleConfirmBooking} onCancel={() => setIsModalOpen(false)} />}
            
            <div className="bg-white flex-shrink-0">
                <CategoryFilter categories={categories} activeCategoryId={activeCategoryId} onSelectCategory={setActiveCategoryId} />
            </div>
            
            <div className="flex-1 grid grid-cols-12 overflow-hidden gap-6 p-6">
                {/* Left Column: Entity List */}
                <div className="col-span-4 bg-white rounded-xl border border-slate-200 overflow-y-auto scrollbar-thin">
                    <div className="p-4">
                        <h2 className="text-lg font-bold text-slate-800 px-2">Choose Service / Provider</h2>
                    </div>
                    <div className="px-2 pb-2 space-y-2">
                        {filteredEntities.length > 0 ? filteredEntities.map(entity => (
                            <EntityCard
                                key={entity.id}
                                entity={entity}
                                isSelected={selectedEntity?.id === entity.id}
                                onSelect={handleSelectEntity}
                            />
                        )) : (
                            <p className="px-2 text-sm text-slate-500">No providers available for this category.</p>
                        )}
                    </div>
                </div>

                {/* Right Column: Entity Profile & Calendar */}
                <div className="col-span-8 overflow-y-auto scrollbar-thin">
                    {selectedEntity && <DoctorScheduleCalendar appointments={selectedEntity.appointments || []} />}
                    
                    <div className="bg-white rounded-xl border border-slate-200 mt-6"> {/* Added mt-6 for spacing */}
                        <DoctorProfile doctor={selectedEntity} onBookAppointment={handleBookAppointment} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;