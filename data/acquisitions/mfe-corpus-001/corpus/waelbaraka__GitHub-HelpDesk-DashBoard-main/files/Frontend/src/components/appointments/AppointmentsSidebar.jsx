
// src/components/appointments/AppointmentsSidebar.jsx
import React from 'react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';
import PageInternalNav from '../PageInternalNav'; // Assuming PageInternalNav is in the parent components folder

const AppointmentsSidebar = ({
  pageLabel,
  onNewAppointmentClick,
  searchTerm,
  onSearchTermChange,
  navItems,
  activeSubItemId,
  onSubItemClick,
  openNestedSubmenus,
  onToggleNestedSubmenu,
  navFooterButton,
}) => {
  const pageSectionHeaderHeightClass = 'h-[60px]';
  const sectionBorderClass = 'border-b border-slate-200';

  return (
    <div className="flex flex-col w-1/5 bg-white border-r border-slate-200">
      {/* Block 1: "Appointments" Title */}
      <div className={`flex items-center px-4 ${sectionBorderClass} ${pageSectionHeaderHeightClass}`}>
        <h1 className="text-xl font-semibold text-slate-800">{pageLabel}</h1>
      </div>

      {/* Block 2: "Appointments" Tab, New Button, and Search */}
      <div className={`p-3 space-y-3 ${sectionBorderClass}`}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1 px-1">
            Appointments
          </span>
          <button onClick={onNewAppointmentClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium flex items-center transition-colors">
            <PlusIcon className="w-4 h-4 mr-1.5" />
            New appointment
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="search"
            placeholder="Search in all appointments..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="w-full bg-white text-slate-700 text-sm rounded-md py-2 pl-9 pr-3 border border-slate-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-slate-400"
          />
        </div>
      </div>

      <PageInternalNav
        navItems={navItems}
        activeSubItemId={activeSubItemId}
        onSubItemClick={onSubItemClick}
        openNestedSubmenus={openNestedSubmenus}
        onToggleNestedSubmenu={onToggleNestedSubmenu}
      />
      {navFooterButton && (
        <div className="p-3 border-t border-slate-200 mt-auto">
          <button
            onClick={navFooterButton.action}
            className="w-full text-sm text-center py-2.5 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 font-medium transition-colors"
          >
            {navFooterButton.text}
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentsSidebar;