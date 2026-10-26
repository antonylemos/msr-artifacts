// src/pages/RegisterPage.jsx (Full updated file)

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import AuthLayout from '../components/layouts/AuthLayout';
import SocialButton from '../components/auth/SocialButton.jsx';
import { registerSchema } from '../validators/auth.validator.js';
import api from '../api/api.js';
import { useAuthStore } from '../stores/authStore.js';

// Helper to split full name into first and last
const getFirstLastName = (fullName) => {
  const parts = fullName.trim().split(' ');
  const lastName = parts.pop() || '';
  const firstName = parts.join(' ');
  return { firstName, lastName };
};

const EyeOffIcon = (props) => ( <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>);

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Or use /24/solid if you prefer

// Placeholder SVG for Google Icon (from your provided LoginPage example)
const GoogleIcon = (props) => (
  <svg {...props} aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" className="w-5 h-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
  </svg>
);

// Placeholder SVG for Microsoft Icon
const MicrosoftIcon = (props) => (
  <svg {...props} aria-hidden="true" focusable="false" className="w-5 h-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
    <path fill="#f25022" d="M1 1h9v9H1z"></path><path fill="#00a4ef" d="M1 11h9v9H1z"></path><path fill="#7fba00" d="M11 1h9v9h-9z"></path><path fill="#ffb900" d="M11 11h9v9h-9z"></path>
  </svg>
);

// Placeholder SVG for Apple Icon
const AppleIcon = (props) => (
  <svg {...props} aria-hidden="true" focusable="false" className="w-5 h-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C39.2 141.1 0 183.3 0 245.4c0 42.3 14.5 80.8 40.2 108.4 22.4 24.2 49.5 36 85.8 36.2 33.1 0 61.9-19.3 80.4-19.3 17 0 43.7 19.3 78.4 19.3 36.8 0 62.3-12.5 83.6-36.2 21.7-24.7 32.2-52.9 32.6-100.9zM232.8 101.6c13.2-15.1 24.8-36.3 24.8-36.3-13.2-1.8-27.9 5.4-37.9 13.2s-16.7 23.4-16.7 23.4c14.6 2.1 29.8-2.4 30-0.1z"></path>
  </svg>
);

// API mutation function

const registerOwnerAndOrg = async (formData) => {
  const payload = {
    organizationName: formData.organizationName,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password,
  };

  console.log("FRONTEND: Sending registration payload:", payload);
  try {
    const response = await api.registerOwner(payload); // Use the correct method from realApiInterface
    console.log("API Response:", response); // Log the entire API response
    if (response && response.message && response.user && response.token) {
      return response; // Return the entire response object
    } else {
      console.error("Unexpected API response structure:", response);
      throw new Error("Unexpected API response structure");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};


const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login: loginUserInStore } = useAuthStore(); // Renamed to avoid conflict if any

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema), // Uses the updated schema
    mode: 'onBlur', // Validate on blur for better UX
  });

 const mutation = useMutation({
    mutationFn: registerOwnerAndOrg, // Use the updated function name
    onSuccess: (data) => {
      if (data && data.token && data.user) {
        loginUserInStore(data.token, data.user); // Use the renamed store action
        toast.success(data.message || 'Registration successful! Welcome.');
        navigate('/home'); // Or to an onboarding step
      } else {
        console.error("API response does not contain expected properties:", data);
        toast.error('Registration failed. Please try again.');
      }
    },
    onError: (error) => {
      console.error("Registration Error:", error); // Log the error details
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    },
  });

  const onFormSubmit = (formData) => {
    mutation.mutate(formData);
  };
  
  return (
    <AuthLayout headerButtonLabel="Log in" headerButtonLink="/login">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Start for free</h1>
          <p className="text-gray-500 mt-2">No credit card required</p>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <div>
                <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">Company name</label>
                <input 
                    {...register('organizationName')} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Your Company Inc." 
                />
                {errors.organizationName && <p className="text-red-500 text-xs mt-1">{errors.organizationName.message}</p>}
            </div>

            {/* --- MODIFIED: First Name and Last Name Inputs --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                    <input 
                        {...register('firstName')} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="e.g., Jane" 
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                    <input 
                        {...register('lastName')} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="e.g., Doe" 
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
            </div>
            {/* --- END MODIFIED Name Inputs --- */}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Business email</label>
                <input {...register('email')} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="name@work-email.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                    <input type={showPassword ? "text" : "password"} {...register('password')} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="12 characters or more" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                        {showPassword ? <EyeOffIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5" />}
                    </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            
            {/* Phone input - kept as is, assuming it's optional */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Mobile phone number <span className="text-gray-400">(Optional)</span></label>
                <div className="flex">
                    <select className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        {/* Add country codes if needed */}
                        <option>US +1</option> 
                        <option>UK +44</option>
                        <option>UAE +971</option>
                    </select>
                    <input type="tel" {...register('phone')} className="w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="050 123 4567" />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
                <button type="submit" disabled={mutation.isPending} className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm transition disabled:bg-red-400">
                    {mutation.isPending ? 'Signing up...' : 'Sign up'}
                </button>
            </div>
        </form>
        
        <div className="mt-6 space-y-3">
            <SocialButton icon={<GoogleIcon/>} label="Sign up with Google" />
            <SocialButton icon={<MicrosoftIcon/>} label="Sign up with Microsoft" />
            <SocialButton icon={<AppleIcon/>} label="Sign up with Apple" />
        </div>
        <p className="mt-6 text-center text-xs text-gray-500">You agree to our <a href="#" className="underline hover:text-gray-700">Terms of Use</a> and <a href="#" className="underline hover:text-gray-700">Privacy Policy</a></p>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;