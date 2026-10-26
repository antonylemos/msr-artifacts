// src/components/booking/BookingModal.jsx
import React, { useState, useCallback, useMemo } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const BookingModal = ({ doctor, onConfirm, onCancel }) => {
    const [consultationType, setConsultationType] = useState('online');
    const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // June 2025
    const [selectedDate, setSelectedDate] = useState(19); // Default to 19th
    const [selectedTime, setSelectedTime] = useState('10:00 - 11:00am');

    const availableTimes = ['10:00 - 11:00am', '02:00 - 03:00pm', '03:00 - 04:00pm'];
    const fee = 35.90;
    const tax = 2.00;

    const daysInMonth = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(), [currentDate]);
    const startDay = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(), [currentDate]);
    
    const calendarDays = [];
    for (let i = 0; i < startDay; i++) { calendarDays.push(<div key={`empty-${i}`}></div>); }
    for (let day = 1; day <= daysInMonth; day++) {
        const isSelected = day === selectedDate;
        const isLimited = day > 15 && day < 25 && day !== 19;
        const isAvailable = !isLimited && day > 10;
        
        let dayClass = 'text-slate-700 hover:bg-slate-100';
        let dotClass = '';
        if (isSelected) {
            dayClass = 'bg-indigo-600 text-white font-bold';
        } else if (isLimited) {
            dotClass = 'bg-orange-400';
        } else if (isAvailable) {
            dotClass = 'bg-teal-400';
        }

        calendarDays.push(
            <div key={day} onClick={() => setSelectedDate(day)} className="flex flex-col items-center justify-center cursor-pointer h-9">
                <span className={`h-7 w-7 flex items-center justify-center rounded-full text-sm ${dayClass}`}>{day}</span>
                {dotClass && !isSelected && <div className={`mt-1 w-1 h-1 rounded-full ${dotClass}`}></div>}
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl grid grid-cols-2 shadow-xl">
                {/* Left Side: Type and Calendar */}
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">Book Appointment</h2>
                        <button onClick={onCancel} className="p-1 text-slate-400 hover:text-slate-600 rounded-full"><XMarkIcon className="w-6 h-6"/></button>
                    </div>
                    
                    <div className="relative flex p-1 bg-slate-100 rounded-xl mb-4">
                        <div className={`absolute top-1 bottom-1 transition-all duration-300 bg-white rounded-lg shadow`} style={{ width: 'calc(50% - 4px)', left: consultationType === 'online' ? '4px' : 'calc(50% + 0px)' }}></div>
                        <button onClick={() => setConsultationType('offline')} className="relative w-1/2 py-2 text-sm font-semibold z-10 text-slate-700">Offline</button>
                        <button onClick={() => setConsultationType('online')} className="relative w-1/2 py-2 text-sm font-semibold z-10 text-slate-700">Online</button>
                    </div>

                    <p className="text-sm text-slate-500 mb-6">
                        {consultationType === 'online'
                            ? "The clinic will send an online consultation link to your number. The doctor will be available at the time you choose."
                            : "Please visit the doctor at the clinic location at the selected time."}
                    </p>

                    {/* Calendar */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-slate-700">June 2025</span>
                            <div className="flex space-x-2">
                                <button className="p-1 text-slate-500 hover:bg-slate-100 rounded-full"><ChevronLeftIcon className="w-5 h-5"/></button>
                                <button className="p-1 text-slate-500 hover:bg-slate-100 rounded-full"><ChevronRightIcon className="w-5 h-5"/></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-slate-400 mb-2">
                            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                        </div>
                        <div className="grid grid-cols-7 gap-y-1">
                            {calendarDays}
                        </div>
                        <div className="flex space-x-4 text-xs mt-4">
                            <div className="flex items-center"><span className="w-2 h-2 bg-teal-400 rounded-full mr-1.5"></span>Available</div>
                            <div className="flex items-center"><span className="w-2 h-2 bg-orange-400 rounded-full mr-1.5"></span>Limited</div>
                            <div className="flex items-center"><span className="w-2 h-2 bg-slate-200 rounded-full mr-1.5"></span>Not Available</div>
                            <div className="flex items-center"><span className="w-2 h-2 bg-indigo-600 rounded-full mr-1.5"></span>Selected</div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Time and Payment */}
                <div className="bg-slate-50 p-8 rounded-r-2xl flex flex-col">
                    <h3 className="font-semibold text-slate-700 mb-4">Time</h3>
                    <div className="space-y-3">
                        {availableTimes.map(time => (
                             <label key={time} className={`flex items-center p-4 rounded-lg border-2 cursor-pointer ${selectedTime === time ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-white'}`}>
                                <input type="radio" name="time-slot" value={time} checked={selectedTime === time} onChange={(e) => setSelectedTime(e.target.value)} className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
                                <span className="ml-3 font-medium text-slate-700">{time}</span>
                            </label>
                        ))}
                    </div>

                    <div className="mt-auto pt-6">
                        <div className="space-y-2 text-sm border-t border-slate-200 pt-4">
                            <div className="flex justify-between text-slate-600"><span>Fee Consultation</span><span>${fee.toFixed(2)}</span></div>
                            <div className="flex justify-between text-slate-600"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                            <div className="flex justify-between font-bold text-slate-800"><span>Total</span><span>${(fee + tax).toFixed(2)}</span></div>
                        </div>
                        <button onClick={onConfirm} className="mt-4 w-full bg-teal-500 text-white rounded-lg py-3 font-semibold hover:bg-teal-600 transition-colors">
                            Proceed Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;