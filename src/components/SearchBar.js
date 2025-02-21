"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { API_NODE_URL, API_KEY } from "../../config/config";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState({ cities: [], states: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchBarRef = useRef(null);

  // Fetch accommodations for suggestions
  const fetchSuggestions = async () => {
    try {
      const response = await fetch(
        `${API_NODE_URL}accommodation/all-accommodations`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Extract unique cities and states for suggestions
        const uniqueCities = [...new Set(data.data.map((acc) => acc.location.city))];
        const uniqueStates = [...new Set(data.data.map((acc) => acc.location.state))];
        setSuggestions({ cities: uniqueCities, states: uniqueStates });
      }
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSuggestions();
      setShowSuggestions(true);
    } else {
      setSuggestions({ cities: [], states: [] });
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Handle search
  const handleSearch = (query) => {
    if (query.trim()) {
      router.push(`/accommodation?location=${query}`);
      setShowSuggestions(false);
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex-grow max-w-lg mx-4 hidden lg:block z-50" ref={searchBarRef}>
      <div className="flex">
        <input
          type="text"
          placeholder="Search for city or state..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <button
          onClick={() => handleSearch(searchQuery)}
          className="ml-2 px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          Search
        </button>
      </div>
      {showSuggestions && (suggestions.cities.length > 0 || suggestions.states.length > 0) && (
        <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg z-50">
          {/* City Suggestions */}
          {suggestions.cities.length > 0 && (
            <div>
              <div className="px-4 py-2 text-sm font-semibold text-gray-500">Cities</div>
              {suggestions.cities.map((city, index) => (
                <div
                  key={`city-${index}`}
                  onClick={() => handleSearch(city)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {city}
                </div>
              ))}
            </div>
          )}
          {/* State Suggestions */}
          {suggestions.states.length > 0 && (
            <div>
              <div className="px-4 py-2 text-sm font-semibold text-gray-500">States</div>
              {suggestions.states.map((state, index) => (
                <div
                  key={`state-${index}`}
                  onClick={() => handleSearch(state)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {state}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
