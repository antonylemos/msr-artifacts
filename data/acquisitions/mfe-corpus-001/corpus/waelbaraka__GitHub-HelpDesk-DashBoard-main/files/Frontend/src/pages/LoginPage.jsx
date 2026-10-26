// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import AuthLayout from '../components/layouts/AuthLayout';
import SocialButton from '../components/auth/SocialButton';
import { loginSchema } from '../validators/auth.validator.js';
import api from '../api/api.js'; // Ensure this path is correct
import { useAuthStore } from '../stores/authStore.js';


// Re-using icons from RegisterPage for consistency
// In a real project, these would be in a shared icon component file.
const GoogleIcon = (props) => ( <svg {...props} viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.06 4.71c1.248-3.464 4.398-6.06 8.634-6.06c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.618-3.234-11.303-7.662l-6.06 4.71C9.656 40.032 16.318 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 36.178 44 30.561 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>);
const MicrosoftIcon = (props) => ( <svg {...props} viewBox="0 0 21 21"><path fill="#f25022" d="M1 1h9v9H1z"></path><path fill="#00a4ef" d="M1 11h9v9H1z"></path><path fill="#7fba00" d="M11 1h9v9h-9z"></path><path fill="#ffb900" d="M11 11h9v9h-9z"></path></svg>);
const AppleIcon = (props) => ( <svg {...props} viewBox="0 0 24 24"><path d="M12 2.03c-1.89 0-3.48.99-4.38 2.5a4.76 4.76 0 0 0-1.12 3.32c0 2.21 1.59 4.31 3.52 4.31a.51.51 0 0 0 .19-.04c.16-.06.31-.13.47-.21-1.63 1.29-2.58 3.3-2.58 5.48 0 3.82 2.75 5.54 5.37 5.54 1.14 0 2.37-.41 3.54-1.22s1.9-1.92 1.9-1.92c-.06.04-.13.06-.19.08-1.55.54-3.28.1-4.27-1.1-1.31-1.61-1.23-3.8.22-5.18 1.48-1.42 3.78-1.62 5.18-.33a.51.51 0 0 0 .69-.53c-.3-1.62-.99-3.1-2.12-4.14-1.29-1.2-2.9-1.88-4.57-1.88zM14.64 1.7c.03-.5-1.35-.74-2.52-.74-1.17 0-2.5.26-2.53.76s1.35.75 2.53.75c1.17 0 2.49-.26 2.52-.77z"></path></svg>);
const EyeIcon = (props) => ( <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>);
const EyeOffIcon = (props) => ( <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>);


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loginAction = useAuthStore((state) => state.login); // Ensure this is correctly defined

  const loginUser = async (credentials) => {
    console.log("FRONTEND: Sending login credentials:", credentials);
    try {
      const response = await api.login(credentials); // Use the correct method from realApiInterface
      console.log("API Response:", response); // Log the entire API response
      if (response && response.token && response.user) {
        loginAction(response.token, response.user); // Use the login action from useAuthStore
        toast.success('Login successful! Welcome.');
        navigate('/home'); // Redirect to the home page
      } else {
        console.error("Unexpected API response structure:", response);
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  // Setup react-hook-form with Zod for validation
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  
  const mutation = useMutation({
    mutationFn: loginUser, // The function to call when `mutation.mutate()` is executed
    onSuccess: (data) => {
      // This runs when the API call is successful (2xx status)
      loginAction(data.token, data.user); // Update the global auth store
      toast.success('Login successful! Welcome back.');
      navigate('/home'); // Redirect to the main dashboard page
    },
    onError: (error) => {
      // This runs when the API call fails (e.g., 401 Unauthorized, 500 Server Error)
      // The backend provides a clear error message, which we display
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    },
  });

   const onFormSubmit = (formData) => {
    mutation.mutate(formData); // Trigger the API call
  };

  
  return (
    <AuthLayout headerButtonLabel="Sign up free" headerButtonLink="/register">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Log in</h1>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Business email</label>
            <input {...register('email')} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="name@work-email.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} {...register('password')} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="12 characters or more" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                 {showPassword ? <EyeOffIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <button type="submit" disabled={mutation.isPending} className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm transition disabled:bg-blue-400">
              {mutation.isPending ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-3">
          <SocialButton icon={<GoogleIcon/>} label="Log in with Google" />
          <SocialButton icon={<MicrosoftIcon/>} label="Log in with Microsoft" />
          <SocialButton icon={<AppleIcon/>} label="Log in with Apple" />
        </div>

        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">Log in with custom SSO</a>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;