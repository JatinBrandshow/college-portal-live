"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiClock, FiMapPin } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
import { useRouter } from "next/navigation";

export const setLocalStorageValue = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageValue = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeState, setActiveState] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
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

  const updateRecentSearches = (item) => {
    const searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    if (!searches.includes(item)) {
      const updatedSearches = [item, ...searches.slice(0, 2)];
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
    }
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
    setRecentSearches(getLocalStorageValue("recentSearches"));
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-blue-50 py-16 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-4">
          Find Your Path at <span className="text-yellow-500">College Portal</span>
        </h2>
        <p className="text-lg text-blue-700 mb-8">
          Explore courses, programs, and events. Begin your journey today with a simple search.
        </p>

        <div className="relative w-full max-w-2xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={() => setShowDropdown(true)}
            placeholder="Search by courses, programs, and colleges..."
            className="w-full py-4 px-6 text-lg text-blue-900 rounded-full border border-blue-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-500 transition-all duration-300"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="absolute right-2 top-2 bottom-2 bg-yellow-500 hover:bg-yellow-400 text-white px-6 rounded-full text-xl font-semibold flex items-center justify-center transition-all duration-300"
          >
            <FiSearch />
          </button>

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-2 z-50 p-4 h-72 overflow-y-scroll"
            >
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

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg mb-3 text-left flex items-center gap-2">
                  <FiMapPin />
                  Top Cities
                </h3>
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

              <div>
                <h3 className="text-lg font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg mb-3 text-left flex items-center gap-2">
                  <FaUniversity />
                  Top Colleges
                </h3>
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
      </div>
    </section>
  );
};

export default Searchbar;
