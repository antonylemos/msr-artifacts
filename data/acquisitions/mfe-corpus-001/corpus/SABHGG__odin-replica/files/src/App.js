import React, { useMemo, useState } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const sections = useMemo(
    () => [
      { id: 'home', label: 'Inicio' },
      { id: 'reportes', label: 'Reportes' },
      { id: 'microfrontend', label: 'Leapdocs (Microfrontend)' }
    ],
    []
  );

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    window.dispatchEvent(
      new CustomEvent('toggle-leapdocs', {
        detail: { isActive: sectionId === 'microfrontend' }
      })
    );
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>ODIN</h2>
        {sections.map((section) => (
          <button
            key={section.id}
            className={`sidebar-btn ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => handleSectionChange(section.id)}
            type="button"
          >
            {section.label}
          </button>
        ))}
      </aside>

      <main className="content">
        {activeSection === 'home' && (
          <section className="panel">
            <h3>Home de Odin</h3>
            <p>Estás en la aplicación React.</p>
          </section>
        )}

        {activeSection === 'reportes' && (
          <section className="panel">
            <h3>Reportes</h3>
            <p>Vista local para reportes internos.</p>
          </section>
        )}

        {activeSection === 'microfrontend' && (
          <div id="microfrontend-container" className="microfrontend-container" />
        )}
      </main>
    </div>
  );
}

export default App;