// src/components/settings/ClinicProfileSettingsTab.jsx
import React, { useState, useCallback } from 'react';
import { BuildingOffice2Icon, PhotoIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast'; // For feedback

// A more comprehensive, yet still abridged, list of timezones for the dropdown
const timezones = [
    "Etc/GMT+12", "Pacific/Midway", "Pacific/Honolulu", "America/Anchorage", 
    "America/Los_Angeles", "America/Denver", "America/Chicago", "America/New_York",
    "America/Caracas", "America/Halifax", "America/Sao_Paulo", "Atlantic/Azores",
    "Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Moscow",
    "Asia/Dubai", "Asia/Kolkata", "Asia/Bangkok", "Asia/Shanghai", "Asia/Tokyo",
    "Australia/Sydney", "Pacific/Auckland", "Etc/GMT-12"
].sort(); // Sort them for easier selection

const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "INR"].sort();

const weekStartDays = [
    { value: 'sunday', label: 'Sunday' },
    { value: 'monday', label: 'Monday' },
];

const initialProfileData = {
    clinicName: "Healing Hands General Hospital",
    tagline: "Compassionate care, advanced medicine.",
    logoUrl: "", // Will be set by preview or fetched
    logoFile: null, // To hold the actual file for upload
    website: "https://healinghands.example.com",
    mainPhoneNumber: "555-0100",
    secondaryPhoneNumber: "",
    supportEmail: "support@healinghands.example.com",
    faxNumber: "",
    addressLine1: "123 Health St",
    addressLine2: "Suite 100",
    city: "Medville",
    state: "MD",
    zipCode: "12345",
    country: "USA",
    timezone: "America/New_York",
    currency: "USD",
    defaultLanguage: "en",
    weekStartsOn: "sunday",
    businessRegNumber: "",
    clinicLicenseNumber: "",
};

const ClinicProfileSettingsTab = () => {
    const [profile, setProfile] = useState(initialProfileData);
    const [logoPreview, setLogoPreview] = useState(initialProfileData.logoUrl || "https://placehold.co/200x80?text=Your+Logo&font=roboto");
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // Max 2MB example
                toast.error("Logo file size should not exceed 2MB.");
                return;
            }
            if (!['image/png', 'image/jpeg', 'image/svg+xml', 'image/gif'].includes(file.type)) {
                toast.error("Invalid file type. Please use PNG, JPG, SVG, or GIF.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
                setProfile(prev => ({ ...prev, logoFile: file, logoUrl: '' })); // Clear old URL if new file
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        // Simulate API call
        console.log("Saving Clinic Profile:", profile);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        
        // In a real app, after successful API call:
        // setProfile(prev => ({ ...prev, logoFile: null, logoUrl: 'new_logo_url_from_server' }));
        toast.success("Clinic Profile saved successfully!");
        setIsSaving(false);
    };

    const InputField = ({ label, name, type = "text", value, onChange, required = false, placeholder = "", helpText = "", fullWidth = false }) => (
        <div className={fullWidth ? "col-span-1 md:col-span-2" : ""}>
            <label htmlFor={name} className="block text-xs font-medium text-slate-600 mb-1">{label}{required && '*'}</label>
            <input type={type} name={name} id={name} value={value || ''} onChange={onChange} required={required} placeholder={placeholder} className="form-input w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
            {helpText && <p className="mt-1 text-xs text-slate-500">{helpText}</p>}
        </div>
    );
    
    const SelectField = ({ label, name, value, onChange, options, required = false, helpText = "" }) => (
        <div>
            <label htmlFor={name} className="block text-xs font-medium text-slate-600 mb-1">{label}{required && '*'}</label>
            <select name={name} id={name} value={value} onChange={onChange} required={required} className="form-select w-full text-sm border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                {options.map(opt => typeof opt === 'string' ? <option key={opt} value={opt}>{opt}</option> : <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
             {helpText && <p className="mt-1 text-xs text-slate-500">{helpText}</p>}
        </div>
    );

    return (
        <div className="max-w-3xl mx-auto pb-12">
            <form onSubmit={handleSaveChanges} className="space-y-8">
                {/* Section 1: Basic Information & Branding */}
                <section className="bg-white p-6 rounded-lg shadow border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1 flex items-center">
                        <BuildingOffice2Icon className="w-5 h-5 mr-2 text-indigo-500"/>
                        Basic Information
                    </h3>
                    <p className="text-sm text-slate-500 mb-6">Set your organization's name and branding.</p>
                    <div className="space-y-5">
                        <InputField label="Clinic/Hospital Name" name="clinicName" value={profile.clinicName} onChange={handleChange} required fullWidth/>
                        <InputField label="Tagline / Short Description" name="tagline" value={profile.tagline} onChange={handleChange} placeholder="e.g., Your trusted partner in health" fullWidth/>
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Clinic Logo</label>
                            <div className="mt-1 flex items-center space-x-4">
                                <div className="w-36 h-20 bg-slate-100 rounded-md flex items-center justify-center overflow-hidden border border-slate-300">
                                    {logoPreview ? <img src={logoPreview} alt="Logo Preview" className="max-w-full max-h-full object-contain" /> : <PhotoIcon className="w-10 h-10 text-slate-400" />}
                                </div>
                                <label htmlFor="logo-upload" className="cursor-pointer bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center">
                                    <ArrowUpTrayIcon className="w-4 h-4 mr-2 text-slate-500"/> Change Logo
                                </label>
                                <input id="logo-upload" name="logoFile" type="file" className="sr-only" accept="image/png, image/jpeg, image/svg+xml, image/gif" onChange={handleLogoChange} />
                            </div>
                             <p className="mt-1 text-xs text-slate-500">Recommended: PNG, JPG, GIF, or SVG. Max 2MB. Approx 200x80px.</p>
                        </div>
                    </div>
                </section>

                {/* Section 2: Contact & Address */}
                <section className="bg-white p-6 rounded-lg shadow border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">Contact & Address</h3>
                    <p className="text-sm text-slate-500 mb-6">How patients and the system can reach you.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                        <InputField label="Main Phone Number" name="mainPhoneNumber" type="tel" value={profile.mainPhoneNumber} onChange={handleChange} required />
                        <InputField label="Secondary Phone" name="secondaryPhoneNumber" type="tel" value={profile.secondaryPhoneNumber} onChange={handleChange} />
                        <InputField label="Support Email" name="supportEmail" type="email" value={profile.supportEmail} onChange={handleChange} required />
                        <InputField label="Fax Number" name="faxNumber" type="tel" value={profile.faxNumber} onChange={handleChange} />
                        <InputField label="Website URL" name="website" type="url" value={profile.website} onChange={handleChange} placeholder="https://yourclinic.com"/>
                        <div></div> {/* Spacer */}

                        <InputField label="Address Line 1" name="addressLine1" value={profile.addressLine1} onChange={handleChange} required />
                        <InputField label="Address Line 2" name="addressLine2" value={profile.addressLine2} onChange={handleChange} placeholder="Suite, Floor, etc." />
                        <InputField label="City" name="city" value={profile.city} onChange={handleChange} required />
                        <InputField label="State / Province" name="state" value={profile.state} onChange={handleChange} required />
                        <InputField label="ZIP / Postal Code" name="zipCode" value={profile.zipCode} onChange={handleChange} required />
                        <InputField label="Country" name="country" value={profile.country} onChange={handleChange} required />
                    </div>
                </section>

                {/* Section 3: Regional Settings */}
                <section className="bg-white p-6 rounded-lg shadow border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">Regional Settings</h3>
                    <p className="text-sm text-slate-500 mb-6">Configure settings based on your operational region.</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                        <SelectField label="Timezone" name="timezone" value={profile.timezone} onChange={handleChange} options={timezones} required helpText="All appointment times will be based on this timezone."/>
                        <SelectField label="Currency" name="currency" value={profile.currency} onChange={handleChange} options={currencies} required helpText="Currency for any pricing displayed."/>
                        <SelectField label="Default Language" name="defaultLanguage" value={profile.defaultLanguage} onChange={handleChange} options={[{value: 'en', label: 'English'}, {value: 'es', label: 'Español (Example)'}]} helpText="System default language (if applicable)."/>
                        <SelectField label="Week Starts On" name="weekStartsOn" value={profile.weekStartsOn} onChange={handleChange} options={weekStartDays} helpText="For calendar displays."/>
                    </div>
                </section>
                
                {/* Section 4: Legal Information (Optional) */}
                 <section className="bg-white p-6 rounded-lg shadow border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">Legal Information (Optional)</h3>
                    <p className="text-sm text-slate-500 mb-6">Official registration details if needed for invoicing or records.</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                        <InputField label="Business Registration Number" name="businessRegNumber" value={profile.businessRegNumber} onChange={handleChange} />
                        <InputField label="Clinic License Number" name="clinicLicenseNumber" value={profile.clinicLicenseNumber} onChange={handleChange} />
                    </div>
                </section>


                {/* Save Button */}
                <div className="pt-2 flex justify-end">
                    <button 
                        type="submit" 
                        disabled={isSaving}
                        className="px-6 py-2.5 bg-indigo-600 text-white rounded-md font-semibold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-70 flex items-center"
                    >
                        {isSaving && <ArrowPathIcon className="w-4 h-4 animate-spin mr-2"/>}
                        {isSaving ? "Saving..." : "Save Profile Settings"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClinicProfileSettingsTab;