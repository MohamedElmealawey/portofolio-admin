import React, { useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaListAlt } from 'react-icons/fa';
import { IoLogOut, IoBagAdd } from "react-icons/io5";
import { AiFillContacts } from "react-icons/ai";
import { AdminContext } from '../context/AdminContext';

const SideBar = () => {
  const { token } = useContext(AdminContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const navItems = [
    { path: "/", icon: FaHome, label: "Home" },
    { path: "/addWork", icon: IoBagAdd, label: "Add Work" },
    { path: "/workList", icon: FaListAlt, label: "Work List" },
    { path: "/contactList", icon: AiFillContacts, label: "Contact List" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Admin Panel
          </h2>
          <p className="text-xs text-gray-400 mt-1">Portfolio Management</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`
                  }
                >
                  <item.icon className="text-xl" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logoutHandler}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200"
          >
            <IoLogOut className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;