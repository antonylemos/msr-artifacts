import React from 'react';

// This would be a form for editing the user's name, phone, etc.
const UserDetailsForm = ({ user }) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-6">
        Personal Details
      </h2>
      <form className="space-y-6">
        {/* Simplified form fields for demonstration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="firstName" defaultValue={user.firstName} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="lastName" defaultValue={user.lastName} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
        </div>
        <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
            <input type="text" id="jobTitle" defaultValue={user.jobTitle} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
         {/* ... other form fields like phone number, etc. */}
      </form>
    </div>
  );
};

export default UserDetailsForm;