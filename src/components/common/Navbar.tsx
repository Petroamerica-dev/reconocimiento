import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: any[] = [
    // { name: "Inicio", path: "/dashboard" },
    // { name: "Reconocer", path: "/recognize" },
    // { name: "Mis Reconocimientos", path: "/my-recognitions" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/dashboard">
            <img
              src="/img/logo-petroamerica-light.png"
              alt="Logo"
              width={150}
            />
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `font-semibold ${isActive ? "text-white" : "text-gray-300"}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative w-6 h-6">
              <span
                className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ${isOpen ? "rotate-45 top-2.5" : "top-1"
                  }`}
              />
              <span
                className={`block absolute h-0.5 w-6 bg-white transition duration-300 ${isOpen ? "opacity-0" : "top-2.5"
                  }`}
              />
              <span
                className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ${isOpen ? "-rotate-45 top-2.5" : "top-4"
                  }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300  backdrop-blur-md ${isOpen ? "max-h-60" : "max-h-0"
          }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "text-white font-semibold" : "text-gray-300"
              }
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
