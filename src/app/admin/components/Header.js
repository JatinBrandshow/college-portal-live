"use client";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_NODE_URL } from "../../../../config/config";

const Header = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to toggle update form
  const [user, setUser] = useState(null); // Initialize user state as null

  // Retrieve user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage and redirect to /admin
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/admin";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_NODE_URL}admin/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setShowUpdateForm(false); // Hide the update form after successful update
      } else {
        toast.error(result.message || "Error updating profile.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("An error occurred during the process.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-between items-center bg-white shadow p-2 md:pl-64">
      {/* Left: Search */}
      <div className="flex items-center space-x-2">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="focus:outline-none"
        />
      </div>

      {/* Right: Notification, Profile, and Menu */}
      <div className="flex items-center space-x-4 ml-auto">
        <FiBell className="text-gray-600 cursor-pointer" />

        {/* Profile Image */}
        <div className="relative">
          <img
            src="/image/dashboard/profile.webp"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          />
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2">
              {/* Show email and buttons initially */}
              {!showUpdateForm && (
                <>
                  <div className="px-4 py-2">
                    <p className="text-gray-800 font-semibold">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => setShowUpdateForm(true)}
                    className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                  >
                    Logout
                  </button>
                </>
              )}

              {/* Show update form when "Update Profile" is clicked */}
              {showUpdateForm && (
                <form onSubmit={handleProfileUpdate} className="px-4 py-2 space-y-4">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Username"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Mobile"
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUpdateForm(false)}
                    className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Menu Button (Visible on Mobile) */}
        <button
          className="md:hidden text-gray-600"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FiMenu size={24} />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;