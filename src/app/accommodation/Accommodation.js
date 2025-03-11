"use client";
import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Sliders, Home, Briefcase, X, ChevronDown, ChevronUp } from "lucide-react";
import "leaflet/dist/leaflet.css";
import Select from "react-select"; // For multi-select dropdown
import Slider from "rc-slider"; // For budget range slider
import "rc-slider/assets/index.css"; // Slider styles
import { API_NODE_URL, API_KEY } from "../../../config/config";
import dynamic from "next/dynamic";
import { useMap } from "react-leaflet";
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Enquire from "@/components/Enquire";

// Dynamically import MapContainer and related components with SSR disabled
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// 📌 Custom hook to update map center & zoom dynamically
const MapUpdater = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    map.invalidateSize(); // Fixes issues with dynamic loading
    map.flyTo(position, 13, { animate: true });
  }, [map, position]);

  return null;
};

// 📌 Custom hook to detect clicks outside of a component
const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

// 📌 Main Map Component
const MapComponent = ({ accommodations, hoveredAccommodationId }) => {
  const [L, setLeaflet] = useState(null);
  const [customMarker, setCustomMarker] = useState(null);

  // 📌 Load Leaflet library on client-side only
  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setLeaflet(leaflet);
      setCustomMarker(
        new leaflet.Icon({
          iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg",
          iconSize: [16, 16],
          className: "ping-marker", // Apply ping effect
        })
      );
    });
  }, []);

  if (!L || !customMarker) return <p>Loading map...</p>; // Ensure Leaflet is loaded before rendering

  // 📌 Default location for the map
  const defaultLocation = [28.679079, 77.069710]; // Default to India
  const hoveredAccommodation = accommodations.find(
    (acc) => acc._id === hoveredAccommodationId
  );
  const position = hoveredAccommodation
    ? [
        hoveredAccommodation.location.latitude,
        hoveredAccommodation.location.longitude,
      ]
    : defaultLocation;

  return (
    <div className="h-[600px] bg-gray-200 rounded-lg relative">
      <MapContainer
        center={position}
        zoom={hoveredAccommodation ? 13 : 5}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 📌 Update map position smoothly */}
        <MapUpdater position={position} />

        {/* 📌 Loop through accommodations to display markers */}
        {accommodations.map((accommodation) => (
          <Marker
            key={accommodation._id}
            position={[
              accommodation.location.latitude,
              accommodation.location.longitude,
            ]}
            icon={customMarker}
            ref={(marker) => {
              if (marker) {
                // Only open popup for the hovered accommodation
                if (hoveredAccommodationId === accommodation._id) {
                  marker.openPopup();
                } else {
                  marker.closePopup();
                }
              }
            }}
          >
            <Popup>
              <div className="text-center">
                <p className="font-semibold">{accommodation.name}</p>
                <p className="text-black">₹{accommodation.pricing.minPrice}/month</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// 📌 Main Accommodation Component
const Accommodation = () => {
  const searchParams = useSearchParams();
  const [accommodations, setAccommodations] = useState([]);
  const [cities, setCities] = useState([]); // State for cities data
  const [countries, setCountries] = useState([]); // State for countries data
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    locality: searchParams.get("locality") || "",
    facilities: searchParams.get("facilities")?.split(",") || [],
    budget: [0, 100000], // Budget range (low, high)
    roomType: searchParams.get("roomType") || "",
    sort: "", // Sort filter: "", priceLowToHigh, priceHighToLow, newlyAdded
    stayDuration: "", // Stay duration: "", 0-4, 5-10, 10-25, 25+
  });
  const [hoveredAccommodationId, setHoveredAccommodationId] = useState(null);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);
  const [isBudgetPopupOpen, setIsBudgetPopupOpen] = useState(false);
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
  const [isStayDurationPopupOpen, setIsStayDurationPopupOpen] = useState(false);
  const [isRoomTypePopupOpen, setIsRoomTypePopupOpen] = useState(false);
  const [isLocalityPopupOpen, setIsLocalityPopupOpen] = useState(false);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);

  const locationButtonRef = useRef(null);
  const localityButtonRef = useRef(null);
  const budgetButtonRef = useRef(null);
  const roomTypeButtonRef = useRef(null);
  const sortButtonRef = useRef(null);
  const stayDurationButtonRef = useRef(null);

  // Refs for popups
  const locationPopupRef = useRef(null);
  const localityPopupRef = useRef(null);
  const budgetPopupRef = useRef(null);
  const roomTypePopupRef = useRef(null);
  const sortPopupRef = useRef(null);
  const stayDurationPopupRef = useRef(null);
  const filterPopupRef = useRef(null);

  // Function to close all popups except the one being opened
  const closeAllPopups = () => {
    setIsLocationPopupOpen(false);
    setIsBudgetPopupOpen(false);
    setIsSortPopupOpen(false);
    setIsStayDurationPopupOpen(false);
    setIsRoomTypePopupOpen(false);
    setIsLocalityPopupOpen(false);
    setIsFilterPopupOpen(false);
  };

  // Use the custom hook for each popup
  useOutsideClick(locationPopupRef, () => setIsLocationPopupOpen(false));
  useOutsideClick(localityPopupRef, () => setIsLocalityPopupOpen(false));
  useOutsideClick(budgetPopupRef, () => setIsBudgetPopupOpen(false));
  useOutsideClick(roomTypePopupRef, () => setIsRoomTypePopupOpen(false));
  useOutsideClick(sortPopupRef, () => setIsSortPopupOpen(false));
  useOutsideClick(stayDurationPopupRef, () => setIsStayDurationPopupOpen(false));
  useOutsideClick(filterPopupRef, () => setIsFilterPopupOpen(false));

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

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}country/countries`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          console.error("Unexpected API response structure for countries:", data);
        }
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
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
          console.error("API response does not contain accommodations:", result);
          setAccommodations([]);
        }
      } catch (error) {
        console.error("Failed to fetch accommodations:", error);
        setAccommodations([]);
      }
    };

    fetchAccommodations();
  }, []);

  // Update filters when URL search params change
  useEffect(() => {
    const location = searchParams.get("location") || "";
    const locality = searchParams.get("locality") || "";
    const facilities = searchParams.get("facilities")?.split(",") || [];
    const roomType = searchParams.get("roomType") || "";

    setFilters((prev) => ({
      ...prev,
      location,
      locality,
      facilities,
      roomType,
    }));
  }, [searchParams]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      location: "",
      locality: "",
      facilities: [],
      budget: [0, 100000],
      roomType: "",
      sort: "",
      stayDuration: "",
    });
  };

  // Reset individual filters
  const resetFilter = (filterType) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]:
        filterType === "budget"
          ? [0, 100000]
          : filterType === "facilities"
          ? []
          : "",
    }));
  };

  // Get unique localities from accommodations
  const getUniqueLocalities = () => {
    const localities = new Set();
    accommodations.forEach((acc) => {
      if (acc.location.locality) {
        localities.add(acc.location.locality);
      }
    });
    return Array.from(localities).map((locality) => ({
      value: locality,
      label: locality,
    }));
  };

  // Map city_number to city_name and country_name
  const getCityAndCountryName = (cityNumber) => {
    const cityInfo = cities.find((city) => city.city_number === cityNumber);
    if (!cityInfo) return { cityName: "Unknown City", countryName: "Unknown Country" };

    const countryInfo = countries.find(
      (country) => country.country_number === cityInfo.country_number
    );
    const countryName = countryInfo ? countryInfo.country_name : "Unknown Country";

    return { cityName: cityInfo.city_name, countryName };
  };

  const getPopupPosition = (buttonRef) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      return {
        top: rect.bottom + window.scrollY + 8, // 8px offset from the button
        left: rect.left + window.scrollX,
      };
    }
    return { top: 0, left: 0 };
  };

  // Facilities options for multi-select dropdown
  const facilitiesOptions = [
    { value: "Gym", label: "Gym" },
    { value: "WiFi", label: "WiFi" },
    { value: "Pool", label: "Pool" },
    { value: "Laundry", label: "Laundry" },
  ];

  // Room type options for dropdown
  const roomTypeOptions = [
    { value: "Multifamily", label: "Multifamily" },
    { value: "Commercial", label: "Commercial" },
    { value: "Duplex", label: "Duplex" },
    { value: "Apartment", label: "Apartment" },
  ];

  // Sort options for dropdown
  const sortOptions = [
    { value: "", label: "Sort All" },
    { value: "priceLowToHigh", label: "Price: Low to High" },
    { value: "priceHighToLow", label: "Price: High to Low" },
    { value: "newlyAdded", label: "Newly Added" },
  ];

  // Stay duration options for dropdown
  const stayDurationOptions = [
    { value: "", label: "Duration All" },
    { value: "0-4", label: "0-4 Weeks" },
    { value: "5-10", label: "5-10 Weeks" },
    { value: "10-25", label: "10-25 Weeks" },
    { value: "25+", label: "25+ Weeks" },
  ];

  // Locality options for dropdown
  const localityOptions = getUniqueLocalities();

  // Filter accommodations based on filters
  const filteredAccommodations = accommodations.filter((accommodation) => {
    const { cityName, countryName } = getCityAndCountryName(accommodation.location.city_number);

    const matchesLocation = filters.location
      ? cityName.toLowerCase().includes(filters.location.toLowerCase()) ||
        countryName.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    const matchesLocality = filters.locality
      ? accommodation.location?.locality
          ?.toLowerCase()
          .includes(filters.locality.toLowerCase())
      : true;

    const matchesBudget =
      accommodation.pricing?.minPrice >= filters.budget[0] &&
      accommodation.pricing?.maxPrice <= filters.budget[1];

    const matchesFacilities = filters.facilities.length
      ? filters.facilities.every((facility) =>
          accommodation.amenities?.includes(facility)
        )
      : true;

    const matchesRoomType = filters.roomType
      ? accommodation.meta?.availableType?.includes(filters.roomType)
      : true;

    const matchesStayDuration =
      filters.stayDuration === ""
        ? true
        : filters.stayDuration === "0-4"
        ? accommodation.pricing?.duration <= 4
        : filters.stayDuration === "5-10"
        ? accommodation.pricing?.duration >= 5 && accommodation.pricing?.duration <= 10
        : filters.stayDuration === "10-25"
        ? accommodation.pricing?.duration >= 10 && accommodation.pricing?.duration <= 25
        : filters.stayDuration === "25+"
        ? accommodation.pricing?.duration >= 25
        : true;

    return (
      matchesLocation &&
      matchesLocality &&
      matchesBudget &&
      matchesFacilities &&
      matchesRoomType &&
      matchesStayDuration
    );
  });

  // Sort accommodations based on sort filter
  const sortedAccommodations = filteredAccommodations.sort((a, b) => {
    if (filters.sort === "priceLowToHigh") {
      return a.pricing.minPrice - b.pricing.minPrice;
    } else if (filters.sort === "priceHighToLow") {
      return b.pricing.minPrice - a.pricing.minPrice;
    } else if (filters.sort === "newlyAdded") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return 0; // Default: no sorting
    }
  });

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Add a state to store the selected accommodation details
  const [selectedAccommodation, setSelectedAccommodation] = useState({
    image: "",
    name: "",
    address: "",
    id: "",
  });

  // Function to calculate the number of applied filters
  const getAppliedFiltersCount = () => {
    let count = 0;

    if (filters.location) count++;
    if (filters.locality) count++;
    if (filters.facilities.length > 0) count++;
    if (filters.budget[0] !== 0 || filters.budget[1] !== 100000) count++;
    if (filters.roomType) count++;
    if (filters.sort) count++;
    if (filters.stayDuration) count++;

    return count;
  };

  const appliedFiltersCount = getAppliedFiltersCount();

  return (
    <div className="p-0">
      <h1 className="text-3xl font-bold mt-2 px-6 pt-2">Accommodation</h1>
      {/* Accommodation List and Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 ">
        {/* Left Side: Accommodation Cards */}
        <div className="lg:col-span-2">
          {/* Filter Buttons */}
          <div className="sticky top-[68px] md:top-[77px] z-30 bg-white shadow-xs px-6 py-2 flex items-center rounded-lg">
            {/* Left Scroll Button */}
            <button
              onClick={scrollLeft}
              className="absolute lg:hidden left-2 p-2 bg-white shadow-lg rounded-full z-50"
            >
              <FaChevronLeft className="w-3 h-3 text-gray-600" />
            </button>

            {/* Scrollable Buttons Container */}
            <div
              ref={scrollContainerRef}
              className="mx-start flex gap-4 justify-start overflow-x-auto no-scrollbar scroll-smooth px-2"
            >
              {/* Sort Button */}
              <button
                ref={sortButtonRef}
                onClick={() => {
                  closeAllPopups();
                  setIsSortPopupOpen(!isSortPopupOpen);
                }}
                className={`px-4 py-2 ${
                  filters.sort ? "bg-violet-700" : "bg-violet-600"
                } text-white rounded-md hover:bg-violet-700 text-nowrap flex items-center gap-2`}
              >
                {filters.sort
                  ? sortOptions.find((opt) => opt.value === filters.sort)?.label
                  : "Sort"}
                {filters.sort && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent button click event
                      resetFilter("sort");
                    }}
                    className="text-white hover:text-gray-200"
                  >
                    ×
                  </span>
                )}
                {isSortPopupOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Location Button */}
              <button
                ref={locationButtonRef}
                onClick={() => {
                  closeAllPopups();
                  setIsLocationPopupOpen(!isLocationPopupOpen);
                }}
                className={`px-4 py-2 ${
                  filters.location ? "bg-violet-700" : "bg-violet-600"
                } text-white rounded-md hover:bg-violet-700 text-nowrap flex items-center gap-2`}
              >
                {filters.location || "Location"}
                {filters.location && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent button click event
                      resetFilter("location");
                    }}
                    className="text-white hover:text-gray-200"
                  >
                    ×
                  </span>
                )}
                {isLocationPopupOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Locality Button */}
              <button
                ref={localityButtonRef}
                onClick={() => {
                  closeAllPopups();
                  setIsLocalityPopupOpen(!isLocalityPopupOpen);
                }}
                className={`px-4 py-2 ${
                  filters.locality ? "bg-violet-700" : "bg-violet-600"
                } text-white rounded-md hover:bg-violet-700 text-nowrap flex items-center gap-2`}
              >
                {filters.locality || "Locality"}
                {filters.locality && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent button click event
                      resetFilter("locality");
                    }}
                    className="text-white hover:text-gray-200"
                  >
                    ×
                  </span>
                )}
                {isLocalityPopupOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Budget Button */}
              <button
                ref={budgetButtonRef}
                onClick={() => {
                  closeAllPopups();
                  setIsBudgetPopupOpen(!isBudgetPopupOpen);
                }}
                className={`px-4 py-2 ${
                  filters.budget[0] !== 0 || filters.budget[1] !== 100000
                    ? "bg-violet-700"
                    : "bg-violet-600"
                } text-white rounded-md hover:bg-violet-700 text-nowrap flex items-center gap-2`}
              >
                {filters.budget[0] !== 0 || filters.budget[1] !== 100000
                  ? `₹${filters.budget[0]} - ₹${filters.budget[1]}`
                  : "Budget"}
                {(filters.budget[0] !== 0 || filters.budget[1] !== 100000) && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent button click event
                      resetFilter("budget");
                    }}
                    className="text-white hover:text-gray-200"
                  >
                    ×
                  </span>
                )}
                {isBudgetPopupOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Room Type Button */}
              <button
                ref={roomTypeButtonRef}
                onClick={() => {
                  closeAllPopups();
                  setIsRoomTypePopupOpen(!isRoomTypePopupOpen);
                }}
                className={`px-4 py-2 ${
                  filters.roomType ? "bg-violet-700" : "bg-violet-600"
                } text-white rounded-md hover:bg-violet-700 text-nowrap flex items-center gap-2`}
              >
                {filters.roomType || "Room Type"}
                {filters.roomType && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent button click event
                      resetFilter("roomType");
                    }}
                    className="text-white hover:text-gray-200"
                  >
                    ×
                  </span>
                )}
                {isRoomTypePopupOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Stay Duration Button */}
              <button
                ref={stayDurationButtonRef}
                onClick={() => {
                  closeAllPopups();
                  setIsStayDurationPopupOpen(!isStayDurationPopupOpen);
                }}
                className={`px-4 py-2 ${
                  filters.stayDuration ? "bg-violet-700" : "bg-violet-600"
                } text-white rounded-md hover:bg-violet-700 text-nowrap flex items-center gap-2`}
              >
                {filters.stayDuration
                  ? stayDurationOptions.find((opt) => opt.value === filters.stayDuration)
                      ?.label
                  : "Stay Duration"}
                {filters.stayDuration && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent button click event
                      resetFilter("stayDuration");
                    }}
                    className="text-white hover:text-gray-200"
                  >
                    ×
                  </span>
                )}
                {isStayDurationPopupOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Open Filters Button */}
              <button
                onClick={() => {
                  closeAllPopups();
                  setIsFilterPopupOpen(!isFilterPopupOpen);
                }}
                className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 text-nowrap flex items-center gap-2"
              >
                More Filters
                {appliedFiltersCount > 0 && (
                  <span className="bg-white text-violet-600 rounded-full px-2 py-1 text-xs">
                    {appliedFiltersCount}
                  </span>
                )}
                {isFilterPopupOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Reset Filters Button */}
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-100 text-red-600 font-semibold rounded-md text-nowrap"
              >
                Reset Filters
              </button>
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={scrollRight}
              className="absolute lg:hidden right-2 p-2 bg-white shadow-lg rounded-full z-50"
            >
              <FaChevronRight className="w-3 h-3 text-gray-600" />
            </button>
          </div>

          {/* Location Popup */}
          {isLocationPopupOpen && (
            <div
              ref={locationPopupRef}
              className="absolute bg-white p-2.5 rounded-lg shadow-lg z-40 w-[250px]"
              style={{
                top: getPopupPosition(locationButtonRef).top,
                left: getPopupPosition(locationButtonRef).left,
              }}
            >
              <button
                onClick={() => setIsLocationPopupOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-base font-semibold mb-2">Location</h2>
              <input
                type="text"
                placeholder="Search Location (City or State)"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => resetFilter("location")}
                className="mt-4 px-2 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
              >
                Reset Location
              </button>
            </div>
          )}

          {/* Locality Popup */}
          {isLocalityPopupOpen && (
            <div
              ref={localityPopupRef}
              className="absolute bg-white p-2.5 rounded-lg shadow-lg z-40 w-[250px]"
              style={{
                top: getPopupPosition(localityButtonRef).top,
                left: getPopupPosition(localityButtonRef).left,
              }}
            >
              <button
                onClick={() => setIsLocalityPopupOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-base font-semibold mb-2">Locality</h2>
              <Select
                options={localityOptions}
                value={localityOptions.find((opt) => opt.value === filters.locality)}
                onChange={(selectedOption) =>
                  handleFilterChange("locality", selectedOption?.value || "")
                }
                className="w-full"
              />
              <button
                onClick={() => resetFilter("locality")}
                className="mt-4 px-2 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
              >
                Reset Locality
              </button>
            </div>
          )}

          {/* Budget Popup */}
          {isBudgetPopupOpen && (
            <div
              ref={budgetPopupRef}
              className="absolute bg-white p-2.5 rounded-lg shadow-lg z-40 w-[250px]"
              style={{
                top: getPopupPosition(budgetButtonRef).top,
                left: getPopupPosition(budgetButtonRef).left,
              }}
            >
              <button
                onClick={() => setIsBudgetPopupOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-base font-semibold mb-2">Budget (₹)</h2>
              <Slider
                range
                min={0}
                max={100000}
                value={filters.budget}
                onChange={(value) => handleFilterChange("budget", value)}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{filters.budget[0]}</span>
                <span>₹{filters.budget[1]}</span>
              </div>
              <button
                onClick={() => resetFilter("budget")}
                className="mt-4 px-2 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
              >
                Reset Budget
              </button>
            </div>
          )}

          {/* Room Type Popup */}
          {isRoomTypePopupOpen && (
            <div
              ref={roomTypePopupRef}
              className="absolute bg-white p-2.5 rounded-lg shadow-lg z-40 w-[250px]"
              style={{
                top: getPopupPosition(roomTypeButtonRef).top,
                left: getPopupPosition(roomTypeButtonRef).left,
              }}
            >
              <button
                onClick={() => setIsRoomTypePopupOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-base font-semibold mb-2">Room Type</h2>
              <Select
                options={roomTypeOptions}
                value={roomTypeOptions.find((opt) => opt.value === filters.roomType)}
                onChange={(selectedOption) =>
                  handleFilterChange("roomType", selectedOption?.value || "")
                }
                className="w-full"
              />
              <button
                onClick={() => resetFilter("roomType")}
                className="mt-4 px-2 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
              >
                Reset Room Type
              </button>
            </div>
          )}

          {/* Sort Popup */}
          {isSortPopupOpen && (
            <div
              ref={sortPopupRef}
              className="absolute bg-white p-2.5 rounded-lg shadow-lg z-40 w-[250px]"
              style={{
                top: getPopupPosition(sortButtonRef).top,
                left: getPopupPosition(sortButtonRef).left,
              }}
            >
              <button
                onClick={() => setIsSortPopupOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-base font-semibold mb-2">Sort By</h2>
              <Select
                options={sortOptions}
                value={sortOptions.find((opt) => opt.value === filters.sort)}
                onChange={(selectedOption) =>
                  handleFilterChange("sort", selectedOption?.value || "")
                }
                className="w-full"
              />
              <button
                onClick={() => resetFilter("sort")}
                className="mt-4 px-2 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
              >
                Reset Sort
              </button>
            </div>
          )}

          {/* Stay Duration Popup */}
          {isStayDurationPopupOpen && (
            <div
              ref={stayDurationPopupRef}
              className="absolute bg-white p-2.5 rounded-lg shadow-lg z-40 w-[250px]"
              style={{
                top: getPopupPosition(stayDurationButtonRef).top,
                left: getPopupPosition(stayDurationButtonRef).left,
              }}
            >
              <button
                onClick={() => setIsStayDurationPopupOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-base font-semibold mb-2">Stay Duration</h2>
              <Select
                options={stayDurationOptions}
                value={stayDurationOptions.find((opt) => opt.value === filters.stayDuration)}
                onChange={(selectedOption) =>
                  handleFilterChange("stayDuration", selectedOption?.value || "")
                }
                className="w-full"
              />
              <button
                onClick={() => resetFilter("stayDuration")}
                className="mt-4 px-2 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
              >
                Reset Stay Duration
              </button>
            </div>
          )}

          {/* Open Filters Popup */}
          {isFilterPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div
                ref={filterPopupRef}
                className="bg-white p-4 rounded-lg h-2/3 overflow-auto no-scrollbar w-11/12 max-w-2xl relative"
              >
                <button
                  onClick={() => setIsFilterPopupOpen(false)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-semibold mb-4">Filters</h2>

                {/* Location */}
                <div className="mb-4">
                  <label className="block text-gray-700">Location</label>
                  <input
                    type="text"
                    placeholder="Search Location (City or State)"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* Locality */}
                <div className="mb-4">
                  <label className="block text-gray-700">Locality</label>
                  <Select
                    options={localityOptions}
                    value={localityOptions.find((opt) => opt.value === filters.locality)}
                    onChange={(selectedOption) =>
                      handleFilterChange("locality", selectedOption?.value || "")
                    }
                    className="w-full"
                  />
                </div>

                {/* Budget Range Slider */}
                <div className="mb-4">
                  <label className="block text-gray-700">Budget (₹)</label>
                  <Slider
                    range
                    min={0}
                    max={100000}
                    value={filters.budget}
                    onChange={(value) => handleFilterChange("budget", value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{filters.budget[0]}</span>
                    <span>₹{filters.budget[1]}</span>
                  </div>
                </div>

                {/* Facilities Multi-Select Dropdown */}
                <div className="mb-4">
                  <label className="block text-gray-700">Facilities</label>
                  <Select
                    isMulti
                    options={facilitiesOptions}
                    value={
                      filters.facilities.length
                        ? filters.facilities.map((facility) => ({
                            value: facility,
                            label: facility,
                          }))
                        : []
                    }
                    onChange={(selectedOptions) =>
                      handleFilterChange(
                        "facilities",
                        selectedOptions.map((option) => option.value)
                      )
                    }
                    className="w-full"
                  />
                </div>

                {/* Room Type Dropdown */}
                <div className="mb-4">
                  <label className="block text-gray-700">Room Type</label>
                  <Select
                    options={roomTypeOptions}
                    value={roomTypeOptions.find(
                      (option) => option.value === filters.roomType
                    )}
                    onChange={(selectedOption) =>
                      handleFilterChange("roomType", selectedOption?.value || "")
                    }
                    className="w-full"
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="mb-4">
                  <label className="block text-gray-700">Sort By</label>
                  <Select
                    options={sortOptions}
                    value={sortOptions.find((opt) => opt.value === filters.sort)}
                    onChange={(selectedOption) =>
                      handleFilterChange("sort", selectedOption?.value || "")
                    }
                    className="w-full"
                  />
                </div>

                {/* Stay Duration Dropdown */}
                <div className="mb-4">
                  <label className="block text-gray-700">Stay Duration</label>
                  <Select
                    options={stayDurationOptions}
                    value={stayDurationOptions.find((opt) => opt.value === filters.stayDuration)}
                    onChange={(selectedOption) =>
                      handleFilterChange("stayDuration", selectedOption?.value || "")
                    }
                    className="w-full"
                  />
                </div>

                {/* Clear Filters Button */}
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
                >
                  Clear All Filters
                </button>

                {/* Apply Filters Button */}
                <button
                  onClick={() => setIsFilterPopupOpen(false)}
                  className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
          
          {sortedAccommodations.length > 0 ? (
          sortedAccommodations.map((accommodation) => {
            const { cityName, countryName } = getCityAndCountryName(accommodation.location.city_number);

            return (
              <div key={accommodation._id}>
                <Link href={`/pages/${accommodation._id}`} passHref>
                  <div
                    className="bg-white p-6 rounded-lg shadow-lg mb-6 flex flex-col md:flex-row items-start transition hover:shadow-xl cursor-pointer"
                    onMouseEnter={() => setHoveredAccommodationId(accommodation._id)}
                    onMouseLeave={() => setHoveredAccommodationId(null)}
                  >
                    {/* Left Side: Image */}
                    <div className="w-full md:w-1/3">
                      <img
                        src={accommodation.meta.images[0] || "/placeholder-image.jpg"}
                        alt={accommodation.name}
                        className="w-full h-72 object-cover rounded-lg"
                      />
                    </div>

                    {/* Right Side: Details */}
                    <div className="w-full md:w-2/3 md:pl-6 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-semibold">{accommodation.name}</h2>
                        <p className="text-gray-600 mt-1">
                          {accommodation.location.streetNumber} {accommodation.location.route},{" "}
                          {accommodation.location.locality},{" "}
                          {cityName},{" "}
                          {countryName}
                        </p>

                        {/* Facilities */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {accommodation.amenities.map((amenity, index) => (
                            <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded-full">
                              {amenity}
                            </span>
                          ))}
                        </div>

                        {/* Description */}
                        <div className="mt-3">
                          <h3 className="text-lg font-semibold">Description:</h3>
                          <p className="text-gray-600">
                            {accommodation.description.short_description}
                          </p>
                        </div>

                        {/* Room Options */}
                        <div className="mt-3">
                          <h3 className="text-lg font-semibold">Room Options:</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {accommodation.meta.availableType.map((option, index) => (
                              <span key={index} className="bg-violet-100 text-violet-700 px-3 py-1 text-sm rounded-full">
                                {option}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Price & Enquiry Button */}
                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-lg font-semibold">
                          Starting from ₹{accommodation.pricing.minPrice}/month
                        </p>
                        <button
                            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                setIsEnquireOpen(true);
                                setSelectedAccommodation({
                                    image: accommodation.meta.images[0],
                                    name: accommodation.name,
                                    address: `${accommodation.location.streetNumber} ${accommodation.location.route}, ${accommodation.location.locality}, ${cityName}, ${countryName}`,
                                    id: accommodation._id,
                                    price: accommodation.pricing.minPrice,
                                  });
                            }}
                        >
                            Enquire
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
                  <Enquire
                    isOpen={isEnquireOpen}
                    setIsOpen={setIsEnquireOpen}
                    accommodationImage={selectedAccommodation.image}
                    accommodationName={selectedAccommodation.name}
                    accommodationAddress={selectedAccommodation.address}
                    accommodationId={selectedAccommodation.id}
                    accommodationPrice={selectedAccommodation.price}
                />
              </div>
            );
          })
        ) : (
          <p className="text-gray-600">No accommodations found.</p>
        )}
        </div>

        {/* Right Side: Map */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md sticky top-20">
            <MapComponent
              accommodations={sortedAccommodations}
              hoveredAccommodationId={hoveredAccommodationId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// 📌 Wrap the Accommodation component in Suspense
export default function AccommodationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Accommodation />
    </Suspense>
  );
}