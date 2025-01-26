import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = ({ userName = "Admin", userEmail = "admin@example.com", activePage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleNavbar = () => setNavbarOpen(!navbarOpen);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link
          to="/admin"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://student.saylaniwelfare.com/assets/logo-OpazD70S.png"
            className="h-8"
            alt="Admin Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Admin Panel
          </span>
        </Link>

        <div className="flex items-center space-x-3 relative">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://student.saylaniwelfare.com/assets/logo-OpazD70S.png"
              alt="User"
            />
          </button>
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md dark:bg-gray-700"
            >
              <div className="px-4 py-3">
                <p className="text-sm text-gray-900 dark:text-white">{userName}</p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">{userEmail}</p>
              </div>
              <ul className="py-2">
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleNavbar}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-between ${navbarOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto`}
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
            <li>
              <Link
                to="/dashboard"
                className={`block py-2 px-3 ${activePage === 'dashboard' ? 'text-blue-700 dark:text-blue-500' : 'text-gray-900 dark:text-white'} hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:bg-gray-700 md:dark:hover:text-blue-500`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className={`block py-2 px-3 ${activePage === 'users' ? 'text-blue-700 dark:text-blue-500' : 'text-gray-900 dark:text-white'} hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:bg-gray-700 md:dark:hover:text-blue-500`}
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={`block py-2 px-3 ${activePage === 'settings' ? 'text-blue-700 dark:text-blue-500' : 'text-gray-900 dark:text-white'} hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:bg-gray-700 md:dark:hover:text-blue-500`}
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
