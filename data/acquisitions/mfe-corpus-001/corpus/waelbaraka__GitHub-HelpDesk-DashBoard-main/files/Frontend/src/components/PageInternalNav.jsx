// src/components/PageInternalNav.jsx
import React from 'react'; // No need for useState/useEffect here, it's presentational
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const PageInternalNav = React.memo(({ // <<<< Wrapped with React.memo
  navItems,
  activeSubItemId,
  onSubItemClick,
  openNestedSubmenus,
  onToggleNestedSubmenu,
  footerButton // Not currently used in this component's render, but keep in props
}) => {

  const renderNavItem = (item, isSubItem = false) => {
    const isActive = activeSubItemId === item.id;
    const isMenuOpen = item.subItems && openNestedSubmenus && openNestedSubmenus[item.id];

    let itemBaseClass = `
      w-full flex items-center text-left px-3 py-1.5 group text-sm rounded-md
      transition-colors duration-150
    `;
    let textColorClass = isSubItem || item.isSubItem ? 'text-page-nav-text-muted' : 'text-page-nav-text-default';

    if (isActive) {
      textColorClass = 'text-page-nav-text-active font-medium';
    } else {
      itemBaseClass += ' hover:bg-page-nav-item-hover-bg';
      textColorClass += ` group-hover:text-page-nav-text-default`;
    }

    if (item.isHeading) {
      return (
        <div key={item.id} className="px-3 pt-4 pb-1 text-xs font-semibold text-page-nav-text-muted uppercase tracking-wider flex justify-between items-center">
          <span>{item.label}</span>
          {item.actionText && <button onClick={() => console.log(item.actionLink)} className="text-button-primary-blue-bg hover:underline text-xs normal-case font-medium">{item.actionText}</button>}
          {item.actionIcon && <button className="text-page-nav-text-muted hover:text-page-nav-text-default">{item.actionIcon}</button>}
        </div>
      );
    }

    return (
      <div key={item.id} className={`${item.isSubItem ? "pl-3" : ""}`}>
        <button
          onClick={() => item.subItems && onToggleNestedSubmenu ? onToggleNestedSubmenu(item.id) : onSubItemClick(item.id)}
          className={`${itemBaseClass} ${textColorClass}`}
        >
          {item.subIcon && <span className="mr-1.5">{item.subIcon}</span>}
          <span className="flex-1">{item.label}</span>
          {item.badge !== undefined && (
            <span className={`ml-auto mr-2 text-xs bg-page-nav-badge-bg text-page-nav-badge-text px-1.5 py-0.5 rounded-full font-medium`}>
              {item.badge}
            </span>
          )}
          {item.subItems && onToggleNestedSubmenu && (
            isMenuOpen ? <ChevronDownIcon className="w-4 h-4 ml-auto" /> : <ChevronRightIcon className="w-4 h-4 ml-auto" />
          )}
          {item.hasArrow && !item.subItems && <ChevronRightIcon className="w-4 h-4 ml-auto" />}
        </button>
        {isMenuOpen && item.subItems && (
          <div className="my-0.5 space-y-0.5">
            {item.subItems.map(sub => renderNavItem(sub, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-grow overflow-y-auto  scrollbar-thin pt-2">
      {navItems.map(item => renderNavItem(item))}
    </div>
  );
});

export default PageInternalNav;