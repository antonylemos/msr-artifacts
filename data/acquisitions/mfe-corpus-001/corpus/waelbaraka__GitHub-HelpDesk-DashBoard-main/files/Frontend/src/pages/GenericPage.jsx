// src/pages/GenericPage.jsx
import React from 'react';

// Props you might pass from App.jsx:
// - sectionConfig: The configuration object for this section from sidebarConfig.jsx
// - activeSubItemId: If this generic page also has its own internal navigation
// - pageNavItems: The actual navigation items if provided
// - onSubItemClick: Handler for internal navigation
// - openNestedSubmenus: State for internal navigation submenus
// - onToggleNestedSubmenu: Handler for internal navigation submenus

const GenericPage = ({ sectionConfig, activeSubItemId, pageNavItems, onSubItemClick, openNestedSubmenus, onToggleNestedSubmenu }) => {
  const pageLabel = sectionConfig?.label || "Page";

  // Basic rendering, can be expanded significantly
  return (
    <main className="flex-1 p-6 bg-content-bg overflow-y-auto"> {/* Ensure bg-content-bg is defined for a light background */}
      <div className="h-[var(--height-page-section-header)] flex items-center border-b border-table-border"> {/* Optional: Page header bar */}
        <h1 className="text-xl font-semibold text-content-text-primary">{pageLabel}</h1>
      </div>

      <div className="pt-4">
        {/* Example: If this page type could also have internal navigation like HelpDesk */}
        {pageNavItems && pageNavItems.length > 0 ? (
          <div className="flex">
            <nav className="w-60 p-4 border-r border-page-nav-border bg-page-nav-bg">
              <h2 className="text-md font-semibold text-page-nav-heading-text mb-3">Page Navigation</h2>
              <ul>
                {pageNavItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => onSubItemClick && onSubItemClick(item.id)}
                      className={`w-full text-left p-2 my-0.5 rounded-md text-sm
                        ${activeSubItemId === item.id
                          ? 'bg-page-nav-item-hover-bg text-page-nav-text-active font-medium'
                          : 'text-page-nav-text-default hover:bg-page-nav-item-hover-bg'
                        }
                      `}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex-1 p-4">
              <h2 className="text-lg font-medium text-content-text-primary mb-2">
                Content for: {activeSubItemId ? pageNavItems.find(i => i.id === activeSubItemId)?.label : pageLabel}
              </h2>
              <p className="text-content-text-secondary">
                This is the main content area for the selected sub-item or the generic page.
              </p>
            </div>
          </div>
        ) : (
          <p className="text-content-text-secondary">
            This is a generic page for {pageLabel}. More specific content will be added here.
            {activeSubItemId && ` Currently viewing sub-section: ${activeSubItemId.split('/')[1] || 'default'}`}
          </p>
        )}
      </div>
    </main>
  );
};

export default GenericPage;