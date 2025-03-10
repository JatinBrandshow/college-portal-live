"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { API_NODE_URL, API_KEY } from "../../config/config";
import { X } from "lucide-react"; // Import the X icon for the clear button

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchBarRef = useRef(null);

  // Fetch colleges from API
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}college/colleges`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const text = await response.text();
        const data = JSON.parse(text);

        if (Array.isArray(data)) {
          setColleges(data);
        } else {
          console.error("Unexpected API response structure");
        }
      } catch (error) {
        console.error("Failed to fetch colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  // Fetch accommodations from API
  useEffect(() => {
    const fetchAccommodations = async () => {
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

        const result = await response.json();

        if (response.ok && Array.isArray(result)) { // Check if the response is an array
          // console.log("Data:", result);
          setAccommodations(result); // Directly set the accommodations state with the response
        } else {
          console.error("API response is not an array:", result);
          setAccommodations([]);
        }
      } catch (error) {
        console.error("Failed to fetch accommodations:", error);
        setAccommodations([]);
      }
    };

    fetchAccommodations();
  }, []);

  // Handle search input change
  useEffect(() => {
    if (searchQuery.length > 2) {
      // Filter colleges by name, city, or state
      const collegeSuggestions = colleges.filter((college) =>
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.state.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Filter accommodations by city or state
      const accommodationCities = accommodations
        .map((accommodation) => accommodation.location?.city) // Use optional chaining to avoid errors
        .filter((city) => city !== null && city !== undefined) // Filter out null or undefined cities
        .filter((city, index, self) => self.indexOf(city) === index); // Remove duplicates

      const accommodationSuggestions = accommodationCities.filter((city) =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Combine suggestions
      setSuggestions([
        ...collegeSuggestions.map((college) => ({ ...college, type: "college" })),
        ...accommodationSuggestions.map((city) => ({ city, type: "accommodation" })),
      ]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, colleges, accommodations]);

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery) {
      router.push(`/accommodation`); // Redirect to /accommodation without query parameters
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === "college") {
      // It's a college
      router.push(`/college?name=${suggestion.name}`);
    } else if (suggestion.type === "accommodation") {
      // It's an accommodation city
      router.push(`/accommodation?location=${suggestion.city}`);
    }
  };

  // Clear search query and suggestions
  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
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
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for colleges or accommodations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)} // Show suggestions when focused
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          Search
        </button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg z-50">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex justify-between items-center">
                <span>{suggestion.name || suggestion.city}</span>
                <div className="flex gap-2">
                  {/* Show Admission button for both college and accommodation suggestions */}
                  <button
                    className="px-2 py-1 bg-violet-600 text-white rounded hover:bg-violet-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (suggestion.type === "college") {
                        router.push(`/collegepages/${suggestion._id}`);
                      } else {
                        router.push(`/college?city=${suggestion.city}`);
                      }
                    }}
                  >
                    Admission
                  </button>
                  {/* Show Stay button for both college and accommodation suggestions */}
                  <button
                    className="px-2 py-1 bg-violet-600 text-white rounded hover:bg-violet-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (suggestion.type === "college") {
                        router.push(`/accommodation?location=${suggestion.city}`);
                      } else {
                        router.push(`/accommodation?location=${suggestion.city}`);
                      }
                    }}
                  >
                    Stay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;