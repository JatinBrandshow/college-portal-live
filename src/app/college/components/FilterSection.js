"use client";

import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterSection = ({ filters, setFilters }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [cityValue, setCityValue] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [genderValue, setGenderValue] = useState(null);
  const [budgetRange, setBudgetRange] = useState({ min: 0, max: 500000 });
  const [programValue, setProgramValue] = useState("");
  const [programSuggestions, setProgramSuggestions] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [sortBy, setSortBy] = useState("Popularity");

  const toggleFilter = (filter) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  const closeFilter = () => setActiveFilter(null);

  const saveFilter = () => {
    setFilters({
      city: cityValue,
      gender: genderValue,
      budgetRange,
      programs: programValue,
      amenities,
      sortBy,
    });
    setActiveFilter(null); // Close the filter popup
  };

  const clearIndividualFilter = (filterKey) => {
    switch (filterKey) {
      case "city":
        setCityValue("");
        setFilters((prev) => ({ ...prev, city: "" }));
        break;
      case "gender":
        setGenderValue(null);
        setFilters((prev) => ({ ...prev, gender: null }));
        break;
      case "budget":
        setBudgetRange({ min: 0, max: 500000 });
        setFilters((prev) => ({ ...prev, budgetRange: { min: 0, max: 500000 } }));
        break;
      case "programs":
        setProgramValue("");
        setFilters((prev) => ({ ...prev, programs: "" }));
        break;
      case "amenities":
        setAmenities([]);
        setFilters((prev) => ({ ...prev, amenities: [] }));
        break;
      case "sortBy":
        setSortBy("Popularity");
        setFilters((prev) => ({ ...prev, sortBy: "Popularity" }));
        break;
      default:
        break;
    }
  };

  const clearAllFilters = () => {
    setCityValue("");
    setGenderValue(null);
    setBudgetRange({ min: 5000, max: 20000 });
    setProgramValue("");
    setAmenities([]);
    setSortBy("Popularity");
    setFilters({
      city: "",
      gender: null,
      budgetRange: { min: 5000, max: 20000 },
      programs: "",
      amenities: [],
      sortBy: "Popularity",
    });
  };

  const handleCitySearch = (value) => {
    setCityValue(value);
    const cities = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"];
    setCitySuggestions(
      value ? cities.filter((city) => city.toLowerCase().includes(value.toLowerCase())) : []
    );
  };

  const handleProgramSearch = (value) => {
    setProgramValue(value);
    const programs = ["Engineering", "MBA", "Medical", "Law", "Arts"];
    setProgramSuggestions(
      value ? programs.filter((program) => program.toLowerCase().includes(value.toLowerCase())) : []
    );
  };

  const handleSortChange = (value) => setSortBy(value);

  const handleBudgetChange = (e, type) => {
    const value = parseInt(e.target.value, 10) || 0;
    setBudgetRange((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <section className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {[
            { id: "city", label: "City" },
            { id: "gender", label: "Gender" },
            { id: "budget", label: "Budget" },
            { id: "programs", label: "Programs" },
            { id: "amenities", label: "Amenities" },
            { id: "moreFilters", label: "More Filters", icon: <FiFilter /> },
          ].map((filter) => (
            <div key={filter.id} className="relative">
              {/* Filter Button */}
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-900 rounded-full shadow-md hover:bg-blue-100 transition-all"
                onClick={() => toggleFilter(filter.id)}
              >
                {filter.icon || null}
                {filter.label}
                <span className="transition-transform duration-300">
                  {activeFilter === filter.id ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>

              {/* Filter Pop-up */}
              {activeFilter === filter.id && (
                <div
                  className="absolute left-0 top-full mt-2 w-64 bg-white border shadow-lg rounded-lg z-[1000] p-4"
                  onBlur={() => closeFilter()} // Close when focus is lost
                >
                  {filter.id === "city" && (
                    <>
                      <input
                        type="text"
                        placeholder="Search city..."
                        value={cityValue}
                        onChange={(e) => handleCitySearch(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded-lg"
                      />
                      <div className="space-y-2">
                        {citySuggestions.map((city) => (
                          <p
                            key={city}
                            className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg"
                            onClick={() => {
                              setCityValue(city);
                              setCitySuggestions([]);
                            }}
                          >
                            {city}
                          </p>
                        ))}
                      </div>
                    </>
                  )}

                  {filter.id === "gender" && (
                    <>
                      <div className="flex gap-4 mb-4">
                        {["Male", "Female"].map((gender) => (
                          <button
                            key={gender}
                            className={`w-1/2 px-4 py-2 border rounded-lg ${
                              genderValue === gender
                                ? "bg-blue-500 text-white"
                                : "hover:bg-gray-100"
                            }`}
                            onClick={() => setGenderValue(gender)}
                          >
                            {gender}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {filter.id === "budget" && (
                    <>
                      <h4 className="text-sm font-bold mb-2">Select Range</h4>
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        value={budgetRange.min}
                        onChange={(e) => handleBudgetChange(e, "min")}
                        className="w-full mb-2"
                      />
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        value={budgetRange.max}
                        onChange={(e) => handleBudgetChange(e, "max")}
                        className="w-full mb-2"
                      />
                      <div className="flex gap-4">
                        <input
                          type="number"
                          value={budgetRange.min}
                          onChange={(e) => handleBudgetChange(e, "min")}
                          className="w-1/2 px-2 py-1 border rounded-lg"
                          placeholder="Min"
                        />
                        <input
                          type="number"
                          value={budgetRange.max}
                          onChange={(e) => handleBudgetChange(e, "max")}
                          className="w-1/2 px-2 py-1 border rounded-lg"
                          placeholder="Max"
                        />
                      </div>
                    </>
                  )}

                  {filter.id === "programs" && (
                    <>
                      <input
                        type="text"
                        placeholder="Search programs..."
                        value={programValue}
                        onChange={(e) => handleProgramSearch(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded-lg"
                      />
                      <div className="space-y-2">
                        {programSuggestions.map((program) => (
                          <p
                            key={program}
                            className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg"
                            onClick={() => {
                              setProgramValue(program);
                              setProgramSuggestions([]);
                            }}
                          >
                            {program}
                          </p>
                        ))}
                      </div>
                    </>
                  )}

                  {filter.id === "amenities" && (
                    <>
                      <div className="space-y-2">
                        {["WiFi", "Library", "Canteen", "Hostel"].map((amenity) => (
                          <label key={amenity} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={amenities.includes(amenity)}
                              onChange={() =>
                                setAmenities((prev) =>
                                  prev.includes(amenity)
                                    ? prev.filter((a) => a !== amenity)
                                    : [...prev, amenity]
                                )
                              }
                              className="rounded"
                            />
                            {amenity}
                          </label>
                        ))}
                      </div>
                    </>
                  )}

                  {filter.id === "moreFilters" && (
                    <>
                      <h4 className="text-sm font-bold mb-2">Sort By</h4>
                      {["Popularity", "Price: Low to High", "Price: High to Low"].map(
                        (option) => (
                          <p
                            key={option}
                            className={`cursor-pointer px-2 py-1 rounded-lg ${
                              sortBy === option ? "bg-blue-100" : "hover:bg-gray-100"
                            }`}
                            onClick={() => handleSortChange(option)}
                          >
                            {option}
                          </p>
                        )
                      )}
                    </>
                  )}

                  <div className="flex justify-between mt-4">
                  <button
                      className="px-4 py-2 bg-red-50 text-red-500 rounded-full"
                      onClick={() => clearIndividualFilter(filter.id)}
                    >
                      Clear
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-full"
                      onClick={saveFilter}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
