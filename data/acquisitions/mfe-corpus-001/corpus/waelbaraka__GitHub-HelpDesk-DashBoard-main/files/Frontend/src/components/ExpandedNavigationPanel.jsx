// src/components/ExpandedNavigationPanel.jsx
import React from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const ExpandedNavigationPanel = React.memo(({ 
  items,
  activeSubItemId,
  openNestedSubmenus,
  onItemClick,
  onToggleNestedSubmenu,
  sectionLabel,
  onClose,
}) => {

  const renderNavItem = (item, isSubItem = false) => {
    const isActive = activeSubItemId === item.id;
    const isMenuOpen = item.subItems && openNestedSubmenus?.[item.id];

    let baseClasses = `
      w-full flex items-center px-3 py-2 rounded-lg transition-all duration-150
      ${isActive ? 'bg-primary-sidebar-icon-active-bg text-primary-sidebar-icon-active-fg font-medium' : 'hover:bg-expanded-panel-item-hover-bg'}
    `;

    let textClass = isSubItem || item.isSubItem
      ? 'text-expanded-panel-text-muted'
      : 'text-expanded-panel-text-default';

    if (isActive) textClass = 'text-primary-sidebar-icon-active-fg font-medium';

    if (item.isHeading) {
      return (
        <div
          key={item.id}
          className="flex justify-between items-center px-3 pt-4 pb-2 text-xs font-semibold uppercase tracking-wide text-expanded-panel-text-muted"
        >
          <span>{item.label}</span>
          {item.actionText && (
            <button
              onClick={() => console.log(item.actionLink)}
              className="text-white hover:underline text-xs"
            >
              {item.actionText}
            </button>
          )}
          {item.actionIcon && (
            <button className="ml-2 text-expanded-panel-text-muted hover:text-expanded-panel-text-default">
              {item.actionIcon}
            </button>
          )}
        </div>
      );
    }

    return (
      <div key={item.id} className={isSubItem ? 'pl-5' : ''}>
        <button
          onClick={() => (item.subItems ? onToggleNestedSubmenu(item.id) : onItemClick(item.id))}
          className={`${baseClasses} ${textClass}`}
        >
          {item.subIcon && <span className="mr-2">{item.subIcon}</span>}
          {item.icon && <span className="mr-2">{React.cloneElement(item.icon)}</span>}
          <span className="flex-1 text-left">{item.label}</span>

          {item.badge !== undefined && (
            <span className="ml-2 text-xs bg-badge-bg text-badge-text px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}

          {item.subItems && (
            isMenuOpen
              ? <ChevronDownIcon className="w-4 h-4 ml-2" />
              : <ChevronRightIcon className="w-4 h-4 ml-2" />
          )}

          {item.hasArrow && !item.subItems && (
            <ChevronRightIcon className="w-4 h-4 ml-2" />
          )}
        </button>

        {isMenuOpen && item.subItems && (
          <div className="ml-2 mt-1 space-y-0.5 border-l border-expanded-panel-border pl-2">
            {item.subItems.map(sub => renderNavItem(sub, true))}
          </div>
        )}
      </div>
    );
  };

  const itemsToRender = Array.isArray(items) ? items : [];

  return (
    <div className="w-expanded-panel-w flex-shrink-0 bg-expanded-panel-bg text-expanded-panel-text-default p-4 overflow-y-auto border-r border-expanded-panel-border scrollbar-thin flex flex-col">
      {sectionLabel && (
        <div className="flex items-center pb-4 mb-3 border-b border-expanded-panel-border">
          <h2 className="text-lg font-semibold text-expanded-panel-heading">{sectionLabel}</h2>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close panel"
              className="ml-auto text-xl font-light text-expanded-panel-text-muted hover:text-expanded-panel-text-default"
            >
              &times;
            </button>
          )}
        </div>
      )}

      <div className="space-y-1 flex-grow">
        {itemsToRender.map(item => renderNavItem(item))}
      </div>

      <div className="pt-4 mt-4 border-t border-expanded-panel-border">
        <button className="w-full text-sm font-medium text-center py-2 rounded-md bg-primary-sidebar-icon-active-bg hover:bg-expanded-panel-border text-expanded-panel-text-default transition">
          Manage your HelpDesk
        </button>
      </div>
    </div>
  );
});

export default ExpandedNavigationPanel;
