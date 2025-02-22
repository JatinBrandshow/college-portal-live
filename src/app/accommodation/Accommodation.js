"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Sliders, Home, Briefcase, X } from "lucide-react";
import "leaflet/dist/leaflet.css";
import Select from "react-select"; // For multi-select dropdown
import Slider from "rc-slider"; // For budget range slider
import "rc-slider/assets/index.css"; // Slider styles
import { API_NODE_URL, API_KEY } from "../../../config/config";
import dynamic from "next/dynamic";
import { useMap } from "react-leaflet";

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
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    facilities: searchParams.get("facilities")?.split(",") || [],
    budget: [0, 100000], // Budget range (low, high)
    roomType: searchParams.get("roomType") || "",
    sort: "all", // Sort filter: all, priceLowToHigh, priceHighToLow, newlyAdded
    stayDuration: "all", // Stay duration: all, 0-4, 5-10, 10-25, 25+
  });
  const [hoveredAccommodationId, setHoveredAccommodationId] = useState(null);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);
  const [isBudgetPopupOpen, setIsBudgetPopupOpen] = useState(false);
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
  const [isStayDurationPopupOpen, setIsStayDurationPopupOpen] = useState(false);
  const [isRoomTypePopupOpen, setIsRoomTypePopupOpen] = useState(false);

  // Fetch accommodations based on filters
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

      if (response.ok && result.status) {
        if (Array.isArray(result.data)) {
          console.log("Data:", result.data);
          setAccommodations(result.data);
        } else {
          console.error("API response data is not an array:", result.data);
          setAccommodations([]);
        }
      } else {
        console.error("Failed to fetch accommodations:", result.message);
        setAccommodations([]);
      }
    } catch (error) {
      console.error("Failed to fetch accommodations:", error);
      setAccommodations([]);
    }
  };

  useEffect(() => {
    fetchAccommodations();
  }, []);

  // Update filters when URL search params change
  useEffect(() => {
    const location = searchParams.get("location") || "";
    const facilities = searchParams.get("facilities")?.split(",") || [];
    const roomType = searchParams.get("roomType") || "";

    setFilters((prev) => ({
      ...prev,
      location,
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
      facilities: [],
      budget: [0, 100000],
      roomType: "",
      sort: "all",
      stayDuration: "all",
    });
  };

  // ... (previous imports and code remain the same)

// Reset individual filters
const resetFilter = (filterType) => {
  setFilters((prev) => ({
    ...prev,
    [filterType]:
      filterType === "budget"
        ? [0, 100000]
        : filterType === "facilities"
        ? []
        : "", // Set to empty string for sort and stayDuration
  }));
};

// ... (rest of the code remains the same)

// Sort options for dropdown
const sortOptions = [
  { value: "", label: "Sort All" }, // Use empty string for default
  { value: "priceLowToHigh", label: "Price: Low to High" },
  { value: "priceHighToLow", label: "Price: High to Low" },
  { value: "newlyAdded", label: "Newly Added" },
];

// Stay duration options for dropdown
const stayDurationOptions = [
  { value: "", label: "Duration All" }, // Use empty string for default
  { value: "0-4", label: "0-4 Weeks" },
  { value: "5-10", label: "5-10 Weeks" },
  { value: "10-25", label: "10-25 Weeks" },
  { value: "25+", label: "25+ Weeks" },
];

// ... (rest of the code remains the same)

// Filter accommodations based on filters
const filteredAccommodations = accommodations.filter((accommodation) => {
  const matchesLocation = filters.location
    ? accommodation.location.city
        .toLowerCase()
        .includes(filters.location.toLowerCase()) ||
      accommodation.location.state
        .toLowerCase()
        .includes(filters.location.toLowerCase())
    : true;

  const matchesBudget =
    accommodation.pricing.minPrice >= filters.budget[0] &&
    accommodation.pricing.maxPrice <= filters.budget[1];

  const matchesFacilities = filters.facilities.length
    ? filters.facilities.every((facility) =>
        accommodation.amenities.includes(facility)
      )
    : true;

  const matchesRoomType = filters.roomType
    ? accommodation.meta.availableType.includes(filters.roomType)
    : true;

  const matchesStayDuration =
    filters.stayDuration === ""
      ? true
      : filters.stayDuration === "0-4"
      ? accommodation.pricing.duration <= 4
      : filters.stayDuration === "5-10"
      ? accommodation.pricing.duration >= 5 && accommodation.pricing.duration <= 10
      : filters.stayDuration === "10-25"
      ? accommodation.pricing.duration >= 10 && accommodation.pricing.duration <= 25
      : filters.stayDuration === "25+"
      ? accommodation.pricing.duration >= 25
      : true;

  return (
    matchesLocation &&
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

// ... (rest of the code remains the same)

  // Facilities options for multi-select dropdown
  const facilitiesOptions = [
    { value: "Gym", label: "Gym" },
    { value: "WiFi", label: "WiFi" },
    { value: "Pool", label: "Pool" },
    { value: "Laundry", label: "Laundry" },
  ];

  // Room type options for dropdown
  const roomTypeOptions = [
    { value: "private room", label: "Private Room" },
    { value: "entire place", label: "Entire Place" },
  ];

  

  return (
    <div className="p-6">
      {/* Filter Buttons and Selected Filters */}
      <div className="sticky top-0 z-40 bg-white shadow-md px-6 py-2">
        <div className="mx-auto flex gap-4 justify-start">
          {/* Location Button */}
          <button
            onClick={() => setIsLocationPopupOpen(true)}
            className="px-4 py-2 bg-violet-600 text-white rounded-3xl hover:bg-violet-700"
          >
            Location
          </button>

          {/* Budget Button */}
          <button
            onClick={() => setIsBudgetPopupOpen(true)}
            className="px-4 py-2 bg-violet-600 text-white rounded-3xl hover:bg-violet-700"
          >
            Budget
          </button>

          {/* Room Type Button */}
          <button
            onClick={() => setIsRoomTypePopupOpen(true)}
            className="px-4 py-2 bg-violet-600 text-white rounded-3xl hover:bg-violet-700"
          >
            Room Type
          </button>

          {/* Sort Button */}
          <button
            onClick={() => setIsSortPopupOpen(true)}
            className="px-4 py-2 bg-violet-600 text-white rounded-3xl hover:bg-violet-700"
          >
            Sort
          </button>

          {/* Stay Duration Button */}
          <button
            onClick={() => setIsStayDurationPopupOpen(true)}
            className="px-4 py-2 bg-violet-600 text-white rounded-3xl hover:bg-violet-700"
          >
            Stay Duration
          </button>

          {/* Open Filters Button */}
          <button
            onClick={() => setIsFilterPopupOpen(true)}
            className="px-4 py-2 bg-violet-600 text-white rounded-3xl hover:bg-violet-700"
          >
            Open Filters
          </button>
        </div>

        {/* Display Selected Filters */}
        <div className="flex flex-wrap gap-2 mt-2">
          {filters.location && (
            <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
              <span>{filters.location}</span>
              <button
                onClick={() => resetFilter("location")}
                className="ml-2 text-gray-600 hover:text-gray-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {filters.budget[0] !== 0 || filters.budget[1] !== 100000 ? (
            <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
              <span>₹{filters.budget[0]} - ₹{filters.budget[1]}</span>
              <button
                onClick={() => resetFilter("budget")}
                className="ml-2 text-gray-600 hover:text-gray-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : null}
          {filters.roomType && (
            <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
              <span>{filters.roomType}</span>
              <button
                onClick={() => resetFilter("roomType")}
                className="ml-2 text-gray-600 hover:text-gray-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {filters.sort !== "all" && (
            <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
              <span>{sortOptions.find((opt) => opt.value === filters.sort)?.label}</span>
              <button
                onClick={() => resetFilter("sort")}
                className="ml-2 text-gray-600 hover:text-gray-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {filters.stayDuration !== "all" && (
            <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
              <span>{stayDurationOptions.find((opt) => opt.value === filters.stayDuration)?.label}</span>
              <button
                onClick={() => resetFilter("stayDuration")}
                className="ml-2 text-gray-600 hover:text-gray-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Location Popup */}
      {isLocationPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setIsLocationPopupOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <input
              type="text"
              placeholder="Search Location (City or State)"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full p-2 border rounded"
            />
            {/* Reset Button */}
            <button
              onClick={() => resetFilter("location")}
              className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Reset Location
            </button>
          </div>
        </div>
      )}

      {/* Budget Popup */}
      {isBudgetPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setIsBudgetPopupOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Budget (₹)</h2>
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
            {/* Reset Button */}
            <button
              onClick={() => resetFilter("budget")}
              className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Reset Budget
            </button>
          </div>
        </div>
      )}

      {/* Room Type Popup */}
      {isRoomTypePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setIsRoomTypePopupOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-semibold mb-4">Room Type</h2>
            <Select
              options={roomTypeOptions}
              value={roomTypeOptions.find((opt) => opt.value === filters.roomType)}
              onChange={(selectedOption) =>
                handleFilterChange("roomType", selectedOption?.value || "")
              }
              className="w-full"
            />
            {/* Reset Button */}
            <button
              onClick={() => resetFilter("roomType")}
              className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Reset Room Type
            </button>
          </div>
        </div>
      )}

      {/* Sort Popup */}
      {isSortPopupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-11/12 max-w-md relative">
      {/* Close Button */}
      <button
        onClick={() => setIsSortPopupOpen(false)}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
      >
        <X className="w-6 h-6" />
      </button>

      <h2 className="text-xl font-semibold mb-4">Sort By</h2>
      <Select
        options={sortOptions}
        value={sortOptions.find((opt) => opt.value === filters.sort)}
        onChange={(selectedOption) =>
          handleFilterChange("sort", selectedOption?.value || "")
        }
        className="w-full"
      />
      {/* Reset Button */}
      <button
        onClick={() => resetFilter("sort")}
        className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        Reset Sort
      </button>
    </div>
  </div>
)}

      {/* Stay Duration Popup */}
      {isStayDurationPopupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-11/12 max-w-md relative">
      {/* Close Button */}
      <button
        onClick={() => setIsStayDurationPopupOpen(false)}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
      >
        <X className="w-6 h-6" />
      </button>

      <h2 className="text-xl font-semibold mb-4">Stay Duration</h2>
      <Select
        options={stayDurationOptions}
        value={stayDurationOptions.find((opt) => opt.value === filters.stayDuration)}
        onChange={(selectedOption) =>
          handleFilterChange("stayDuration", selectedOption?.value || "")
        }
        className="w-full"
      />
      {/* Reset Button */}
      <button
        onClick={() => resetFilter("stayDuration")}
        className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        Reset Stay Duration
      </button>
    </div>
  </div>
)}
      {/* Open Filters Popup */}
      {isFilterPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-2xl relative">
            {/* Close Button */}
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
                  handleFilterChange("sort", selectedOption?.value || "all")
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
                  handleFilterChange("stayDuration", selectedOption?.value || "all")
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

      <h1 className="text-3xl font-bold mb-6 mt-2">Accommodation</h1>
      {/* Accommodation List and Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Left Side: Accommodation Cards */}
        <div className="lg:col-span-2">
          {sortedAccommodations.length > 0 ? (
            sortedAccommodations.map((accommodation) => (
              <div
                key={accommodation._id}
                className="bg-white p-6 rounded-lg shadow-lg mb-6 flex flex-col md:flex-row items-start transition hover:shadow-xl"
                onMouseEnter={() => setHoveredAccommodationId(accommodation._id)}
                onMouseLeave={() => setHoveredAccommodationId(null)}
              >
                {/* Left Side: Image */}
                <div className="w-full md:w-1/3">
                  <img
                    src={
                      accommodation.meta.images[0] || "/placeholder-image.jpg"
                    }
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
                      {accommodation.location.city},{" "}
                      {accommodation.location.state},{" "}
                      {accommodation.location.country}
                    </p>

                    {/* Facilities (Horizontal Badges) */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {accommodation.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* Description (Only Short) */}
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
                          <span
                            key={index}
                            className="bg-violet-100 text-violet-700 px-3 py-1 text-sm rounded-full"
                          >
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
                    <button className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700">
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No accommodations found.</p>
          )}
        </div>

        {/* Right Side: Map */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md sticky top-14">
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