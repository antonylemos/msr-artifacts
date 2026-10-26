import React from 'react';

const SPREAD_COLORS = [
  'bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 
  'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500',
  'bg-orange-500', 'bg-lime-500', 'bg-cyan-500', 'bg-violet-500',
];

const getDeterministicAvatarColor = (idOrName) => {
  if (!idOrName) return SPREAD_COLORS[0];
  let hash = 0;
  const str = String(idOrName);
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash &= hash;
  }
  const index = Math.abs(hash) % SPREAD_COLORS.length;
  return SPREAD_COLORS[index];
};

const MemberAvatarsStack = React.memo(({ members = [], maxVisible = 5 }) => {
  if (!Array.isArray(members) || members.length === 0) {
    return <span className="text-xs text-gray-500 italic">No members</span>;
  }

  const visibleMembers = members.slice(0, maxVisible);
  const hiddenCount = members.length - maxVisible;

  const getInitial = (member) => {
    if (member.avatarInitials) return member.avatarInitials.charAt(0).toUpperCase();
    if (member.firstName) return member.firstName.charAt(0).toUpperCase();
    if (member.fullName) return member.fullName.charAt(0).toUpperCase();
    if (member.email) return member.email.charAt(0).toUpperCase();
    return 'U';
  };

  return (
    <div className="flex -space-x-1.5 items-center">
      {visibleMembers.map((member, index) => {
        const initial = getInitial(member);
        const bgColor = member.avatarBg || getDeterministicAvatarColor(member.id || member.fullName || index);
        const tooltip = member.fullName || member.name || member.email || 'User';

        return (
          <div
            key={member.id || `member-${index}`}
            title={tooltip}
            className={`inline-flex items-center justify-center h-6 w-6 ${bgColor} rounded-full ring-1 ring-white text-white text-[11px] sm:text-xs font-semibold leading-none text-center transition-transform hover:scale-105`}
            style={{ lineHeight: '1', aspectRatio: '1 / 1' }}
          >
            {initial}
          </div>
        );
      })}

      {hiddenCount > 0 && (
        <div
          title={`${hiddenCount} more member(s)`}
          className="inline-flex items-center justify-center h-6 w-6 bg-gray-200 text-gray-600 text-[11px] sm:text-xs font-medium rounded-full ring-1 ring-white"
          style={{ lineHeight: '1', aspectRatio: '1 / 1' }}
        >
          +{hiddenCount}
        </div>
      )}
    </div>
  );
});

export default MemberAvatarsStack;
