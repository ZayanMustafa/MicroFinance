import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Navbar = ({ userId, activePage }) => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [applicationDropdownOpen, setApplicationDropdownOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://github.com/ZayanMustafa/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fsaylaniwelfare.com%2FEn&psig=AOvVaw26Rghgv-bUlneygyUimGe-&ust=1737938031377000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCODr2OmRkosDFQAAAAAdAAAAABAE"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Qarz E Hasana
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={dropdownOpen}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="user photo"
            />
          </button>
          <div
            className={`absolute right-8 mt-12 w-48 z-50 ${dropdownOpen ? 'block' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600`}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {user?.name || 'John Doe'}
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                {user?.email || 'user@gmail.com'}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={navbarOpen}
            onClick={toggleNavbar}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${navbarOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
            <Link
                to="/nav"
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current={activePage === 'home' ? 'page' : undefined}
              >
                Home
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/application"
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current={activePage === 'application' ? 'page' : undefined}
              >
                Application
              </Link>
              <button
                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                
              </button>
              <div
                className={`absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md ${applicationDropdownOpen ? 'block' : 'hidden'}`}
              >
                <div className="px-4 py-2 hover:bg-gray-100 relative">
                  Wedding Loan
                  <div className="absolute left-full top-0 mt-0 w-48 bg-white shadow-md rounded-md hidden group-hover:block">
                    <div className="px-4 py-2 hover:bg-gray-100">Valima</div>
                    <div className="px-4 py-2 hover:bg-gray-100">Furniture</div>
                  </div>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 relative">
                  Home Construction
                  <div className="absolute left-full top-0 mt-0 w-48 bg-white shadow-md rounded-md hidden group-hover:block">
                    <div className="px-4 py-2 hover:bg-gray-100">Structure</div>
                    <div className="px-4 py-2 hover:bg-gray-100">Finishing</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
