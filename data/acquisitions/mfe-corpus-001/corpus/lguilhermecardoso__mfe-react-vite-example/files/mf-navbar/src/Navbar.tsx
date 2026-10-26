import React, { useState, useEffect } from "react";

type NavbarProps = {
  user: {
    username: string;
  };
  onLogout?: () => void;
};

function getInitials(username: string) {
  return username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick() {
      setDropdownOpen(false);
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [dropdownOpen]);

  return (
    <>
      {/* Navbar fixa */}
      <nav className="w-full h-16 bg-gray-900 flex items-center justify-between px-4 shadow fixed top-0 left-0 z-30">
        {/* Left: Hamburger */}
        <button
          className="text-gray-100 hover:text-white focus:outline-none"
          onClick={() => setDrawerOpen(true)}
          aria-label="Abrir menu"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Right: Avatar + Dropdown */}
        <div className="relative">
          <button
            className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg focus:outline-none"
            onClick={e => {
              e.stopPropagation();
              setDropdownOpen((open) => !open);
            }}
            aria-label="Abrir menu do usuário"
          >
            {getInitials(user.username)}
          </button>
          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50 animate-fade-in">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => alert('Perfil!')}
              >
                Perfil
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Overlay + Drawer animado */}
      <div
        className={`fixed inset-0 z-40 flex transition-all duration-300 ${drawerOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!drawerOpen}
      >
        {/* Overlay com fade */}
        <div
          className={`
            fixed inset-0 bg-black/60 transition-opacity duration-300
            ${drawerOpen ? "opacity-100" : "opacity-0"}
          `}
          onClick={() => setDrawerOpen(false)}
        />
        {/* Drawer lateral animado */}
        <aside
          className={`
            relative h-full w-64 bg-white shadow-lg px-6 py-8 z-50
            transition-transform duration-300
            ${drawerOpen ? "translate-x-0" : "-translate-x-80"}
          `}
          style={{ willChange: "transform" }}
        >
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={() => setDrawerOpen(false)}
            aria-label="Fechar menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="mt-8 space-y-4">
            <a href="#/dashboard" className="block text-gray-900 font-medium hover:text-blue-600">
              Dashboard
            </a>
            <a href="#/sobre" className="block text-gray-900 font-medium hover:text-blue-600">
              Sobre o projeto
            </a>
            <a
              href="https://github.com/lguilhermecardoso/mfe-react-vite-example"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-900 font-medium hover:text-blue-600"
            >
              Repositório GIT
            </a>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Navbar; // <<< ESSENCIAL!