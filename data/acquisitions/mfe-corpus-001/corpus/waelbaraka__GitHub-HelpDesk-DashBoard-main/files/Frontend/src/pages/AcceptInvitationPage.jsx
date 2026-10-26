// src/pages/AcceptInvitationPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { z } from 'zod';

// Assuming your API client is set up in api.js
import api from '../api/api.js'; // Or your actual path to the API interface
import AuthLayout from '../components/layouts/AuthLayout.jsx'; // Assuming you have this
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

// Zod schema for the accept invitation form
const acceptInvitationSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Point error to confirmPassword field
});

// API mutation function
const acceptInvitationApiCall = async ({ token, password, firstName, lastName }) => {
  console.log("FRONTEND: Calling api.acceptInvitation with token:", token, "and data:", { password: '***', firstName, lastName });
  
  // 'api' is your realApiInterface object, which has the 'acceptInvitation' method
  const data = await api.acceptInvitation({ token, password, firstName, lastName }); 
  return data;
};
const AcceptInvitationPage = () => {
  const { token } = useParams(); // Get token from URL (e.g., /accept-invitation/:token)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [invitedUserDetails, setInvitedUserDetails] = useState(null); // Optional: to prefill name

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(acceptInvitationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    }
  });

    const mutation = useMutation({
    mutationFn: (formData) => {
      console.log("Form data submitted:", formData); // Log the form data before mutation
      return acceptInvitationApiCall({ 
        token, // Token from URL params
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      });
    },
    onSuccess: (data) => {
      console.log("API call successful:", data); // Log the success response from the API
      toast.success(data.message || "Invitation accepted! Your account is now active. Please log in.");
      navigate('/login'); // Redirect to login page after successful acceptance
    },
    onError: (error) => {
      console.error("API call error:", error); // Log the error response from the API
      toast.error(error.response?.data?.message || 'Failed to accept invitation. The link may be invalid or expired.');
    },
  });

  const onFormSubmit = (formData) => {
    mutation.mutate(formData);
  };
  if (!token) {
    return (
      <AuthLayout>
        <div className="text-center text-red-600">
          <p>Invalid invitation link. No token provided.</p>
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Go to Login</Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Accept Invitation</h1>
          <p className="text-gray-500 mt-2">Set up your account to join the team.</p>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              type="text"
              id="firstName"
              {...register('firstName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your first name"
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input 
              type="text"
              id="lastName"
              {...register('lastName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your last name"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password"
                {...register('password')} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Create a strong password" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                id="confirmPassword"
                {...register('confirmPassword')} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                placeholder="Re-type your password" 
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <button 
              type="submit" 
              disabled={mutation.isPending} 
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? 'Setting up account...' : 'Accept Invitation & Set Password'}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AcceptInvitationPage;