"use client";
import { Search, Sliders, Home, Briefcase, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";
import { API_NODE_URL, API_KEY } from "../../config/config";

const images = [
  "image/hero/img5.jpg",
  "image/hero/img6.jpg",
  "image/hero/img7.jpg",
  "image/hero/img8.webp",
];

const Hero = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [cities, setCities] = useState([]); // State for cities data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
        console.log(data);

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

  // Fetch cities from API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}city/cities`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          setCities(data);
        } else {
          console.error("Unexpected API response structure for cities:", data);
        }
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
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
        console.log("API Response:", result);

        if (response.ok && result.status === "success" && Array.isArray(result.data.accommodations)) {
          console.log("Data:", result.data.accommodations);
          setAccommodations(result.data.accommodations); // Set accommodations with the extracted array
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      // Filter colleges by name, city, state, or country
      const collegeSuggestions = colleges.filter((college) =>
        college.name.toLowerCase().includes(query.toLowerCase()) ||
        college.city.toLowerCase().includes(query.toLowerCase()) ||
        college.state.toLowerCase().includes(query.toLowerCase())
      );

      // Filter accommodations by city_name (mapped from city_number)
      const accommodationCities = accommodations
        .map((accommodation) => {
          const cityNumber = accommodation.location?.city_number;
          const cityInfo = cities.find((city) => city.city_number === cityNumber);
          return cityInfo ? cityInfo.city_name : null;
        })
        .filter((city) => city !== null && city !== undefined) // Filter out null or undefined cities
        .filter((city, index, self) => self.indexOf(city) === index); // Remove duplicates

      const accommodationSuggestions = accommodationCities.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase())
      );

      // Combine suggestions
      setSuggestions([
        ...collegeSuggestions.map((college) => ({ ...college, type: "college" })),
        ...accommodationSuggestions.map((city) => ({ city, type: "accommodation" })),
      ]);
      setShowSuggestions(true); // Show suggestions when typing
    } else {
      setSuggestions([]);
      setShowSuggestions(false); // Hide suggestions when query is too short
    }
  };

  // Clear search query and suggestions
  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery) {
      router.push(`/accommodation`);
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

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowSuggestions(false); // Hide suggestions when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative min-h-[85vh] flex flex-col md:flex-row items-center px-4 md:px-0 bg-sky-50 max-sm:h-fit">
      {/* Left Section */}
      <div className="items-center justify-center sm:pl-5 lg:pl-10 xl:pl-32 2xl:pl-80 w-full md:w-1/2 md:mb-20">
        <div className="mb-6 md:text-left pt-8 md:pt-24">
          {/* Typewriter Effect */}
          <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-3 max-lg:text-5xl max-md:text-4xl max-sm:text-3xl">
            <span className="text-violet-600">
              <Typewriter
                words={["Welcome to", "Find Your Path at"]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
            <br /> AdmiStay
          </h1>
          <p className="text-base text-gray-600 pe-8 max-sm:text-sm max-sm:pe-4 max-md:pe-6">
            Discover endless opportunities and resources to make your academic journey extraordinary.
          </p>
          <p className="text-base text-gray-800 mt-2 font-semibold max-sm:text-sm max-sm:mt-1">
            Connect, learn, and grow with us.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:absolute md:pr-5 z-20 xl:w-2/3" ref={searchBarRef}>
          <div className="flex flex-col md:items-center md:flex-row gap-10 bg-white py-5 px-5 rounded-2xl shadow-sm max-lg:gap-7 max-md:gap-5 max-sm:gap-3 max-md:py-4 max-sm:py-3 max-md:px-4 max-sm:px-3">
            <div className="flex flex-col w-full relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for colleges or accommodations..."
                  className="outline-none text-black rounded-xl w-full p-2 border"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(true)} // Show suggestions when focused
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
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
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
            <div className="gap-3 flex md:justify-start max-sm:justify-around">
              <button
                className="text-base flex items-center border border-violet-600 h-12 py-2 space-x-2 px-5 bg-white hover:bg-violet-600 hover:text-white text-black font-semibold rounded-3xl max-sm:text-sm max-sm:px-2.5 max-sm:h-fit"
                onClick={() => setIsModalOpen(true)}
              >
                <span>Advanced</span>
                <Sliders className="w-5 h-5" />
              </button>
              <button
                className="text-base flex items-center border space-x-2 h-12 px-5 py-2 border-violet-600 bg-violet-600 text-white rounded-3xl max-sm:text-sm max-sm:px-2.5 max-sm:h-fit"
                onClick={handleSearch}
              >
                <span>Search</span>
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* What are you looking for */}
        <div className="mt-32 ml-2 lg:flex items-center z-50">
          <p className="text-base max-sm:pl-0">What are you looking for:</p>
          <div className="flex gap-2 lg:gap-1 xl:gap-2 overflow-x-auto scrollbar-hide pr-16 max-sm:pr-0">
            {[
              { icon: Home, label: "College" },
              { icon: Briefcase, label: "Accommodation" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 lg:gap-1 xl:gap-2 p-2 lg:p-0 xl:p-2 rounded-lg"
              >
                <item.icon className="w-4 h-4 text-blue-700" />
                <p className="text-base whitespace-nowrap max-sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Image Slider */}
      <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full z-10 overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="House"
            className={`w-full h-full object-cover absolute transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Modal for Advanced Filters */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-2xl relative max-h-[500px] overflow-y-auto">
            {/* Close Button (Cross Icon) */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <X className="w-6 h-6 text-gray-600 hover:text-gray-900" />
            </button>
            <h2 className="text-xl font-bold mb-4">Advanced Filters</h2>
            {/* Advanced Filters Content */}
            <div className="space-y-4">
              {/* Add your advanced filters here */}
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
                onClick={() => {
                  // Handle the apply filters logic here
                  setIsModalOpen(false);
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;