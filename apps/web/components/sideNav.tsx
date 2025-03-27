"use client";

import { useState } from "react";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Home");

  const icons = {
    Home: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
    Search: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    ),
    File: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
          clipRule="evenodd"
        />
      </svg>
    ),
    Add: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    Settings: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clipRule="evenodd"
        />
      </svg>
    ),
    ChevronLeft: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    ChevronRight: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  const topNavigationItems = [
    { name: "Search", icon: icons.Search },
    { name: "Home", icon: icons.Home },
    { name: "File", icon: icons.File },
    { name: "Add", icon: icons.Add },
  ];

  const bottomNavigationItems = [{ name: "Settings", icon: icons.Settings }];

  return (
    <div className="flex h-screen">
      <div
        className={`bg-gray-800 text-white p-4 pt-6 transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        } flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center justify-between">
            {isOpen && <h1 className="text-xl font-bold">Knowster</h1>}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              {isOpen ? icons.ChevronLeft : icons.ChevronRight}
            </button>
          </div>

          {/* Top Navigation */}
          <nav className="mt-8">
            <ul className="space-y-2">
              {topNavigationItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => setActiveItem(item.name)}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                      activeItem === item.name
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <span className="text-white">{item.icon}</span>
                    {isOpen && (
                      <span className="ml-3 text-sm text-white">
                        {item.name}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mb-4">
          <div className="border-t border-gray-700 pt-4">
            {/* Avatar */}
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-xs text-white">JP</span>
              </div>
              {isOpen && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-gray-300">Admin</p>
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            <nav className="mt-4">
              <ul className="space-y-2">
                {bottomNavigationItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => setActiveItem(item.name)}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
                        activeItem === item.name
                          ? "bg-gray-700"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      <span className="text-white">{item.icon}</span>
                      {isOpen && (
                        <span className="ml-3 text-sm text-white">
                          {item.name}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
