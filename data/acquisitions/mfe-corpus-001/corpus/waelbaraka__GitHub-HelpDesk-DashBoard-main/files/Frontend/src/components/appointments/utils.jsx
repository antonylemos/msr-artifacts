// src/components/appointments/utils.jsx

// --- Date and Time Utilities ---
export const getStartOfWeek = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay(); // 0 for Sunday, 6 for Saturday
    const diff = d.getDate() - day; // Adjust to Sunday in the same week
    d.setDate(diff);
    return d;
};

export const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

export const getDayName = (date) => {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
};

export const getMonthName = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'long' });
};

export const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false; // Handle null/undefined dates
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
};

export const isToday = (date) => isSameDay(new Date(), date);


// --- StatusBadge Component ---
export const StatusBadge = ({ status }) => {
  let bgColor, textColor;
  switch (status.toLowerCase()) {
    case 'scheduled': bgColor = 'bg-blue-100'; textColor = 'text-blue-700'; break;
    case 'pending': bgColor = 'bg-yellow-100'; textColor = 'text-yellow-700'; break;
    case 'confirmed': bgColor = 'bg-indigo-100'; textColor = 'text-indigo-700'; break;
    case 'completed': bgColor = 'bg-green-100'; textColor = 'text-green-700'; break;
    case 'cancelled': bgColor = 'bg-red-100'; textColor = 'text-red-700'; break;
    case 'no_show': bgColor = 'bg-gray-100'; textColor = 'text-gray-700'; break;
    default: bgColor = 'bg-gray-100'; textColor = 'text-gray-700';
  }
  return <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>{status}</span>;
};


// --- Dynamic Dummy Appointment Data Generation ---
export const generateRandomAppointments = (count = 150) => {
    const appointments = [];
    const subjects = ['Initial Consultation', 'Follow-up Meeting', 'Product Demo', 'Strategy Session', 'Client Onboarding', 'Review Call'];
    const agents = ['Waelomeradam9', 'Pytsud', 'Sarah Miller', 'John Smith'];
    const statuses = ['scheduled', 'pending', 'confirmed', 'cancelled', 'completed', 'no_show'];
    const serviceTypes = ['GP_CONSULT', 'DENTAL_IMPLANT', 'CAR_OIL_CHANGE', 'FINANCIAL_ADVICE', 'DESIGN_REVIEW'];
    const providers = ['Dr. Smith', 'Clinic A', 'AutoFix Inc.', 'Consultant Jane', 'Designer Pro'];
    const locations = ['Main Branch', 'Downtown Clinic', 'Remote', 'Online', 'Service Center 2'];
    const clientNames = ['Alice Smith', 'Bob Johnson', 'Charlie Brown', 'Diana Prince', 'Eve Adams', 'Frank White', 'Grace Hopp', 'Harry Potter', 'Ivan Jones', 'Kelly Green'];
    const avatarColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];

    const today = new Date();
    today.setHours(0,0,0,0);

    for (let i = 0; i < count; i++) {
        const appointmentDate = new Date(today);
        appointmentDate.setDate(today.getDate() + Math.floor(Math.random() * 120) - 60); // Appointments 60 days in past/future

        const hours = Math.floor(Math.random() * 10) + 9; // 9 AM to 6 PM
        const minutes = Math.random() < 0.5 ? 0 : 30;
        appointmentDate.setHours(hours, minutes, 0, 0);

        const clientIndex = Math.floor(Math.random() * clientNames.length);
        const clientName = clientNames[clientIndex];
        const clientEmail = `${clientName.toLowerCase().replace(' ', '.')}${Math.floor(Math.random() * 1000)}@example.com`;
        const avatarInitial = clientName.split(' ').map(n => n[0]).join('');

        const serviceType = serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
        const providerName = providers[Math.floor(Math.random() * providers.length)];
        const locationName = locations[Math.floor(Math.random() * locations.length)];
        const estimatedDuration = Math.floor(Math.random() * 60) + 30; // 30-90 minutes
        const price = (Math.floor(Math.random() * 200) + 50) * 10; // $500 - $2500
        const paymentStatus = Math.random() > 0.8 ? 'paid' : 'pending';

        const currentStatus = statuses[Math.floor(Math.random() * statuses.length)];

        appointments.push({
            _id: `objid-${Date.now() + i}`, // Unique ID for schema
            appointment_id_human_readable: `APT-${1000 + i}`,
            user_id_ref: `user_id-${clientIndex}`,
            whatsapp_sender_id_of_booker_snapshot: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,

            client_name: clientName,
            client_contact_phone: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            client_email: clientEmail,
            client: { // For compatibility with existing table/detail view
                name: clientName,
                email: clientEmail,
                avatarInitials: avatarInitial,
                avatarColor: avatarColors[Math.floor(Math.random() * avatarColors.length)]
            },

            appointment_subjects: [{
                subject_type: "person",
                name: clientName,
                identifier: `CID-${Math.floor(1000 + Math.random() * 9000)}`
            }],

            service_type_key: serviceType,
            service_display_name: serviceType.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
            service_details_custom: {},

            provider_info: {
                provider_id_ref: `prov_id-${Math.floor(Math.random() * 5)}`,
                name_snapshot: providerName,
                type_snapshot: "consultant"
            },

            department_key: 'Sales',
            location_key: 'Main Office', // Changed to Main Office to match display
            
            appointment_datetime_utc: appointmentDate.toISOString(), // Primary date/time for calendar
            appointment_date_str_local: appointmentDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
            appointment_time_str_local: appointmentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
            clinic_timezone: "America/New_York",
            estimated_duration_minutes: estimatedDuration,
            status: currentStatus,
            booking_channel: "whatsapp",
            booked_by_actor_type: "user",
            booked_by_actor_id_ref: "1234567890",
            booking_timestamp_utc: new Date(appointmentDate.getTime() - Math.random() * 86400000 * 5).toISOString(),
            last_status_update_at_utc: new Date().toISOString(),

            price: price,
            payment_status: paymentStatus,
            notes_internal: 'Internal notes about appointment. Lorem ipsum dolor sit amet.',
            notes_for_client: 'Please bring all necessary documents. Lorem ipsum dolor sit amet.',

            // For existing table compatibility:
            id: `appt-compat-${Date.now() + i}`, // Ensures unique 'id' for React lists
            date: appointmentDate.toISOString().slice(0, 10), // YYYY-MM-DD (simplified for table)
            time: appointmentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }), // HH:MM AM/PM (simplified for table)
            dateTime: appointmentDate.getTime(), // Unix timestamp
            subject: subjects[Math.floor(Math.random() * subjects.length)], // Original subject field
            agent: agents[Math.floor(Math.random() * agents.length)], // Original agent field
        });
    }
    return appointments;
};