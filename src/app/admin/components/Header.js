"use client";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="flex justify-between items-center bg-white shadow p-2 md:pl-64">
      {/* Left: Search */}
      <div className="flex items-center space-x-2">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className=" focus:outline-none"
        />
      </div>

      {/* Right: Notification, Profile, and Menu */}
      <div className="flex items-center space-x-4">
        <FiBell className="text-gray-600 cursor-pointer" />

        {/* Profile Image */}
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />

        {/* Menu Button (Visible on Mobile) */}
        <button
          className="md:hidden text-gray-600"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FiMenu size={24} />
        </button>
      </div>
    </div>
  );
};

export default Header;
