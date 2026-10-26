// src/components/clients/ClientTableRow.jsx
import React, { useCallback } from 'react';
import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/solid';

const ClientTableRow = React.memo(({ client, isSelected, onSelect, onAssignClient }) => {
  const baseClasses = `cursor-pointer transition-colors`;
  const selectedClasses = 'bg-blue-50';
  const hoverClasses = 'hover:bg-gray-50';

  let actionButtonText;
  let actionButtonClass = 'bg-blue-600 hover:bg-blue-700';
  let handleActionButtonClick = useCallback((e) => { e.stopPropagation(); console.log(`Book new appointment for ${client.name}`); }, [client.name]);

  if (client.nextAppointment) {
      actionButtonText = 'View Next Appt.';
      actionButtonClass = 'bg-green-600 hover:bg-green-700';
      handleActionButtonClick = useCallback((e) => { e.stopPropagation(); console.log(`Viewing appointment for ${client.name}`); }, [client.name]);
  } else if (client.isAssignedToMe) {
      actionButtonText = 'Manage Client';
      actionButtonClass = 'bg-indigo-600 hover:bg-indigo-700';
      handleActionButtonClick = useCallback((e) => { e.stopPropagation(); console.log(`Managing client ${client.name}`); }, [client.name]);
  } else {
      actionButtonText = 'Assign to Me';
      actionButtonClass = 'bg-blue-600 hover:bg-blue-700';
      handleActionButtonClick = useCallback((e) => { e.stopPropagation(); onAssignClient(client.id); }, [client.id, onAssignClient]);
  }

  const handleRowClick = useCallback(() => onSelect(client), [client, onSelect]);
  const handleMoreActionsClick = useCallback((e) => { e.stopPropagation(); console.log('More actions for', client.name); }, [client.name]);


  return (
    <tr
      onClick={handleRowClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : hoverClasses}`}
    >
      {/* Checkbox Column (optional, but in image) */}
      <td className="w-10 px-4 py-3"><input type="checkbox" onClick={(e) => e.stopPropagation()} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></td>

      {/* Name/Email Column */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className={`w-8 h-8 ${client.avatarColor} rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3 flex-shrink-0`}>{client.avatarInitials}</div>
          <div>
            <div className="text-sm font-medium text-gray-700">{client.name}</div>
            <div className="text-xs text-gray-500">{client.email}</div>
          </div>
        </div>
      </td>

      {/* Actions Column */}
      <td className="px-4 py-3 whitespace-nowrap">
        <button
            className={`text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${actionButtonClass}`}
            onClick={handleActionButtonClick}
        >
            {actionButtonText}
        </button>
      </td>

      {/* Activity Column */}
      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
        {client.lastInteraction} ({client.lastContactType})
      </td>

      {/* Next Appointment Column */}
      <td className="px-4 py-3 text-sm text-gray-700 truncate max-w-xs" title={client.nextAppointment ? `${client.nextAppointment.date} at ${client.nextAppointment.time} (${client.nextAppointment.status})` : 'No upcoming appointment'}>
        {client.nextAppointment ? `${client.nextAppointment.date} ${client.nextAppointment.time}` : '—'}
      </td>

      {/* Total Bookings Column */}
      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
        {client.totalAppointments > 0 ? `${client.totalAppointments} bookings` : 'No bookings'}
      </td>

      {/* Location Column */}
      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
        {client.country}, {client.state}
      </td>

      {/* Ellipsis Menu Column */}
      <td className="px-4 py-3 text-right text-sm font-medium">
        <button onClick={handleMoreActionsClick} className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
          <EllipsisHorizontalIcon className="w-5 h-5"/>
        </button>
      </td>
    </tr>
  );
});

export default ClientTableRow;