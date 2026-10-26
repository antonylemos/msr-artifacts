// src/components/services/details/ProviderInfoSection.jsx
import React from 'react';

const ProviderInfoSection = ({ item: provider }) => {
    if (!provider) return null;
    return (
        <div className="p-4 border-b border-slate-200 text-center">
            <div className={`w-20 h-20 ${provider.avatarBg} rounded-full flex items-center justify-center text-white text-3xl font-semibold mx-auto mb-3`}>
                {provider.avatarInitial}
            </div>
            <h3 className="font-semibold text-lg text-slate-800">{provider.name}</h3>
            <p className="text-sm text-slate-500">{provider.specialty}</p>
        </div>
    );
};

export default ProviderInfoSection;