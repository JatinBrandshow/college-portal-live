// app/college/layout.js
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiClock, FiMapPin, FiBookOpen } from "react-icons/fi";

const CollegeLayout = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [activeState, setActiveState] = useState("");
  const dropdownRef = useRef(null);
  const router = useRouter();

  const topCities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"];
  const topColleges = [
    "Sheffield Hallam University",
    "Coventry University",
    "University of Exeter",
    "University of Sydney",
  ];
  const states = ["All", "UP", "DL", "MH"];

  // Load recent searches from localStorage
  const loadRecentSearches = () => {
    const searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(searches);
  };

  // Update recent searches in localStorage
  const updateRecentSearches = (item) => {
    const searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    if (!searches.includes(item)) {
      const updatedSearches = [item, ...searches.slice(0, 2)]; // Keep only the latest 3
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/college?query=${encodeURIComponent(searchQuery)}`);
      updateRecentSearches(searchQuery);
    }
  };

  const handleSelection = (item) => {
    setSearchQuery(item);
    setShowDropdown(false);
    router.push(`/college?query=${encodeURIComponent(item)}`);
    updateRecentSearches(item);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="bg-blue-900 text-white py-4 px-6 flex items-center">
        {/* Title */}
        <a href="/" className="text-white text-3xl font-bold tracking-wide hover:opacity-90">
          College<span className="text-yellow-400">Portal</span>
        </a>

        {/* Search Bar */}
        <div className="relative flex items-center justify-center flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={() => setShowDropdown(true)}
            placeholder="Search colleges, programs, or cities..."
            className="py-2 px-4 w-2/3 text-blue-900 rounded-full border border-blue-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-300"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="absolute right-10 bg-yellow-500 hover:bg-yellow-400 text-white p-2 rounded-full transition-all duration-300"
          >
            <FiSearch size={20} />
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg mt-2 z-50 p-4 w-full max-w-2xl"
            >
              {/* States */}
              <div className="flex items-center gap-4 mb-6">
                {states.map((state) => (
                  <button
                    key={state}
                    onClick={() => setActiveState(state)}
                    className={`py-2 px-4 ${
                      activeState === state ? "border-2 border-red-500" : "border"
                    } bg-white text-blue-800 rounded-lg font-medium shadow-sm transition-all`}
                  >
                    {state}
                  </button>
                ))}
              </div>

              {/* Recent Searches */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2 mb-3">
                  <FiClock />
                  Recent Searches
                </h3>
                <div className="flex flex-wrap gap-3">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelection(search)}
                      className="py-2 px-4 bg-white text-blue-800 rounded-lg shadow-sm font-medium transition-all"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              {/* Top Cities */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 bg-gray-100">
                  <FiMapPin className="text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-700">
                    Top Cities
                  </h3>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {topCities.map((city, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelection(city)}
                      className="py-2 px-4 bg-white hover:bg-gray-100 text-blue-800 rounded-lg shadow-sm font-medium transition-all text-left"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Top Colleges */}
              <div>
                <div className="flex items-center gap-2 mb-3 bg-gray-100">
                  <FiBookOpen className="text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-700">
                    Top Colleges
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {topColleges.map((college, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelection(college)}
                      className="py-2 px-4 bg-white hover:bg-gray-100 text-blue-800 rounded-lg shadow-sm font-medium transition-all"
                    >
                      {college}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-4 mt-8">
        <p className="text-center">&copy; 2024 College Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CollegeLayout;
