// src/components/auth/SocialButton.jsx

import React from 'react';

const SocialButton = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
    >
      {React.cloneElement(icon, { className: "w-5 h-5 mr-2" })}
      {label}
    </button>
  );
};

export default SocialButton;