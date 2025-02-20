"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Search, Sliders, Home, Briefcase, X } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Select from "react-select"; // For multi-select dropdown
import Slider from "rc-slider"; // For budget range slider
import "rc-slider/assets/index.css"; // Slider styles
import { API_NODE_URL, API_KEY } from "../../../config/config";

// Custom hook to update map center & zoom dynamically
const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1.5 }); // Smooth zoom transition
    }
  }, [position, map]);
  return null;
};

// Custom marker icon with ping effect
const customMarker = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg",
  iconSize: [16, 16],
  className: "ping-marker", // Apply ping effect
});

const MapComponent = ({ accommodations, hoveredAccommodationId }) => {
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
        <MapUpdater position={position} />

        {/* Loop through all accommodations to display markers with name and price */}
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
                <p className="text-black">₹{accommodation.price}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

const Accommodation = () => {
  const searchParams = useSearchParams();
  const [accommodations, setAccommodations] = useState([]);
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    facilities: searchParams.get("facilities")?.split(",") || [],
    budget: [0, 10000], // Budget range (low, high)
    roomType: searchParams.get("roomType") || "",
  });
  const [hoveredAccommodationId, setHoveredAccommodationId] = useState(null);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);
  const [isBudgetPopupOpen, setIsBudgetPopupOpen] = useState(false);

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
      budget: [0, 10000],
      roomType: "",
    });
  };

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
      accommodation.price >= filters.budget[0] &&
      accommodation.price <= filters.budget[1];

    const matchesFacilities = filters.facilities.length
      ? filters.facilities.every((facility) =>
          accommodation.amenities.includes(facility)
        )
      : true;

    const matchesRoomType = filters.roomType
      ? accommodation.room_options.some(
          (option) => option.room_type === filters.roomType
        )
      : true;

    return (
      matchesLocation && matchesBudget && matchesFacilities && matchesRoomType
    );
  });

  // Facilities options for multi-select dropdown
  const facilitiesOptions = [
    { value: "Wi-Fi", label: "Wi-Fi" },
    { value: "24/7 Reception", label: "24/7 Reception" },
    { value: "Security", label: "Security" },
    { value: "Power Backup", label: "Power Backup" },
  ];

  // Room type options for dropdown
  const roomTypeOptions = [
    { value: "Single Room", label: "Single Room" },
    { value: "Double Room", label: "Double Room" },
    { value: "Shared Room", label: "Shared Room" },
  ];

  return (
    <div className="p-6">
      {/* Filter Buttons */}
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

          {/* Open Filters Button */}
          <button
            onClick={() => setIsFilterPopupOpen(true)}
            className="px-4 py-2 bg-violet-600 text-white rounded-3xl hover:bg-violet-700"
          >
            Open Filters
          </button>
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
              max={10000}
              value={filters.budget}
              onChange={(value) => handleFilterChange("budget", value)}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{filters.budget[0]}</span>
              <span>₹{filters.budget[1]}</span>
            </div>
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
                max={10000}
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
                    : [{ value: "All Facilities", label: "All Facilities" }]
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

            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
            >
              Clear Filters
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
          {filteredAccommodations.length > 0 ? (
            filteredAccommodations.map((accommodation) => (
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
                      accommodation.images[0]?.url || "/placeholder-image.jpg"
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
                      {accommodation.location.address},{" "}
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
                        {accommodation.room_options.map((option, index) => (
                          <span
                            key={index}
                            className="bg-violet-100 text-violet-700 px-3 py-1 text-sm rounded-full"
                          >
                            {option.room_type} - ₹{option.price_per_week}/month
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price & Enquiry Button */}
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-semibold">
                      Starting from ₹{accommodation.price}/month
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
              accommodations={filteredAccommodations}
              hoveredAccommodationId={hoveredAccommodationId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accommodation;