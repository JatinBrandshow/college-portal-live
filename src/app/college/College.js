"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import Modal from "react-modal";
import { FiFilter, FiX } from "react-icons/fi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { API_NODE_URL, API_KEY } from "../../../config/config";
import { useMap } from "react-leaflet";

// Dynamically import Leaflet and related components with SSR disabled
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


const markerIcon = typeof window !== "undefined" 
  ? (() => {
      const L = require("leaflet"); // Dynamically require Leaflet
      return new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/1673/1673221.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
    })()
  : null;

// Zoom to hovered location component
const ZoomToCollege = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (map && coordinates) {
      map.flyTo(coordinates, 10, { animate: true });
    }
  }, [map, coordinates]);

  return null;
};

const College = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [colleges, setColleges] = useState([]);
  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    college_type: searchParams.get("college_type") || "",
    courses_offered: searchParams.get("courses_offered") || "",
    budgetRange: {
      min: parseInt(searchParams.get("min_budget")) || 0,
      max: parseInt(searchParams.get("max_budget")) || Infinity,
    },
  });
  const [hoveredCollege, setHoveredCollege] = useState(null);
  const [modalData, setModalData] = useState({
    isOpen: false,
    activeTab: "Schedule a Visit",
    name: "",
    mobile: "",
  });
  const [activeFilter, setActiveFilter] = useState(null);
  const filterRef = useRef(null);

  

  // Slider data
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
      title: "Explore Top Colleges",
      subtitle: "Find the best colleges near you and start your journey.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
      title: "Discover Courses",
      subtitle: "Choose from a variety of programs that match your interests.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
      title: "Join Events",
      subtitle: "Participate in events and enrich your college experience.",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch colleges from API
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}popularCollege/colleges`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const text = await response.text();
        const data = JSON.parse(text);
        console.log(data);

        if (Array.isArray(data.data)) { // Corrected API response path
          setColleges(data.data);
        } else {
          console.error("Unexpected API response structure");
        }
      } catch (error) {
        console.error("Failed to fetch colleges:", error);
      }
    };

    fetchColleges();
  }, []);


  // Autoplay functionality for slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Update URL when filters change
  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (filters.city) queryParams.set("city", filters.city);
    if (filters.college_type) queryParams.set("college_type", filters.college_type);
    if (filters.courses_offered) queryParams.set("courses_offered", filters.courses_offered);
    if (filters.budgetRange.min > 0) queryParams.set("min_budget", filters.budgetRange.min);
    if (filters.budgetRange.max < Infinity) queryParams.set("max_budget", filters.budgetRange.max);

    router.replace(`/college?${queryParams.toString()}`);
  }, [filters, router]);

  // Filter colleges based on filters
  const filteredColleges = colleges.filter((college) => {
    return (
      (!filters.city || college.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.college_type || college.college_type === filters.college_type) &&
      (!filters.courses_offered || college.courses_offered.some((course) => course.toLowerCase().includes(filters.courses_offered.toLowerCase()))) &&
      parseInt(college.placement_details.avg_package, 10) >= filters.budgetRange.min &&
      parseInt(college.placement_details.avg_package, 10) <= filters.budgetRange.max
    );
  });

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      city: "",
      college_type: "",
      courses_offered: "",
      budgetRange: { min: 0, max: Infinity },
    });
  };

  // Modal functions
  const openModal = (title) => {
    setModalData({ isOpen: true, activeTab: title, name: "", mobile: "" });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, activeTab: "Schedule a Visit", name: "", mobile: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevState) => ({ ...prevState, [name]: value }));
  };

  const isFormValid = modalData.name.trim() && /^[0-9]{10}$/.test(modalData.mobile);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Slider Section */}
      <section className="relative overflow-hidden rounded-xl mb-10">
        <div className="relative w-full h-[450px]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white">
                <h2 className="text-4xl font-extrabold mb-4">{slide.title}</h2>
                <p className="text-lg">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Navigation */}
        <div className="absolute bottom-4 left-2/4 z-40 flex -translate-x-2/4 gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                currentSlide === i ? "w-8 bg-yellow-500" : "w-4 bg-white/50"
              }`}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {[
              { id: "city", label: "City" },
              { id: "college_type", label: "College Type" },
              { id: "courses_offered", label: "Courses Offered" },
              { id: "budget", label: "Budget" },
            ].map((filter) => (
              <div key={filter.id} className="relative" ref={filterRef}>
                {/* Filter Button */}
                <button
  className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all ${
    filters[filter.id]
      ? "bg-blue-500 text-white"
      : "bg-blue-50 text-blue-900 hover:bg-blue-100"
  }`}
  onClick={() => setActiveFilter(filter.id === activeFilter ? null : filter.id)}
>
  {filter.label}
  {filters[filter.id] && (
    <span
      onClick={(e) => {
        e.stopPropagation(); // Prevent the filter button from toggling
        setFilters((prev) => ({ ...prev, [filter.id]: "" }));
      }}
      className="ml-2 p-1 rounded-full hover:bg-blue-600"
    >
      <FiX className="w-4 h-4" />
    </span>
  )}
  <span className="transition-transform duration-300">
    {activeFilter === filter.id ? <FaChevronUp /> : <FaChevronDown />}
  </span>
</button>

                {/* Filter Pop-up */}
                {activeFilter === filter.id && (
  <div
    className="absolute left-0 top-full mt-2 w-64 bg-white border shadow-lg rounded-lg z-[1000] p-4"
  >
    {/* Cross Button to Close Pop-up */}
    <button
      onClick={() => setActiveFilter(null)} // Close pop-up when clicked
      className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
    >
      <FiX className="w-4 h-4" />
    </button>

    {/* Filter Content */}
    {filter.id === "city" && (
      <>
        <input
          type="text"
          placeholder="Search city..."
          value={filters.city}
          onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
      </>
    )}

    {filter.id === "college_type" && (
      <>
        <select
          value={filters.college_type}
          onChange={(e) => setFilters((prev) => ({ ...prev, college_type: e.target.value }))}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        >
          <option value="">Select College Type</option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
        </select>
      </>
    )}

    {filter.id === "courses_offered" && (
      <>
        <input
          type="text"
          placeholder="Search courses..."
          value={filters.courses_offered}
          onChange={(e) => setFilters((prev) => ({ ...prev, courses_offered: e.target.value }))}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
      </>
    )}

    {filter.id === "budget" && (
      <>
        <h4 className="text-sm font-bold mb-2">Select Range</h4>
        <div className="flex gap-4">
          <input
            type="number"
            value={filters.budgetRange.min}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                budgetRange: { ...prev.budgetRange, min: parseInt(e.target.value, 10) || 0 },
              }))
            }
            className="w-1/2 px-2 py-1 border rounded-lg"
            placeholder="Min"
          />
          <input
            type="number"
            value={filters.budgetRange.max}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                budgetRange: { ...prev.budgetRange, max: parseInt(e.target.value, 10) || Infinity },
              }))
            }
            className="w-1/2 px-2 py-1 border rounded-lg"
            placeholder="Max"
          />
        </div>
      </>
    )}
  </div>
)}
              </div>
            ))}
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-red-500 text-white rounded-full"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      {/* College List */}
      <div className="flex bg-gray-50 min-h-screen">
        {/* Left Section */}
        <div className="w-2/3 p-4">
          {filteredColleges.length > 0 ? (
            filteredColleges.map((college) => (
              <div
                key={college._id}
                className="flex h-64 mb-6 p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-transform transform hover:scale-105"
                onMouseEnter={() => setHoveredCollege(college)}
                onMouseLeave={() => setHoveredCollege(null)}
              >
                {/* College Image */}
                <div className="h-full w-1/3">
                  <img
                    src={college.img[0]}
                    alt={college.name}
                    className="w-full h-full object-cover rounded-lg hover:scale-105"
                  />
                </div>

                {/* College Details */}
                <div className="w-2/3 flex flex-col justify-between pl-4">
                  <div>
                    <h2 className="text-lg font-bold">{college.name}</h2>
                    <p className="text-sm text-gray-500">{college.city}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-700 text-sm">{college.gender || "Co-ed"}</span>
                      <span className="text-gray-700 text-sm">
                        Avg Package: ₹{college.placement_details.avg_package}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                      Courses: {college.courses_offered.join(", ")}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg w-1/2"
                      onClick={() => openModal("Schedule a Visit")}
                    >
                      Schedule a Visit
                    </button>
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-lg w-1/2"
                      onClick={() => openModal("Request a Call")}
                    >
                      Request a Call
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No colleges match your filter criteria.</p>
          )}
        </div>

        {/* Right Section */}
        <div className="w-1/3 px-4 py-8 sticky top-0 h-[600px]">
          <MapContainer
            center={[20.5937, 78.9629]} // Default center to India
            zoom={5}
            className="h-full rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            {filteredColleges.map((college) => (
              <Marker
                position={[college.location.latitude, college.location.longitude]}
                icon={markerIcon}
                key={college._id}
              >
                <Popup>
                  <strong>{college.name}</strong>
                  <p>{college.city}</p>
                </Popup>
              </Marker>
            ))}
            {hoveredCollege && (
              <ZoomToCollege
                coordinates={[hoveredCollege.location.latitude, hoveredCollege.location.longitude]}
              />
            )}
          </MapContainer>
        </div>

        {/* Modal for Actions */}
        <Modal
          isOpen={modalData.isOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50"
          overlayClassName="fixed inset-0"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setModalData({ ...modalData, activeTab: "Schedule a Visit" })}
                className={`px-4 py-2 w-1/2 rounded-md ${
                  modalData.activeTab === "Schedule a Visit"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                Schedule a Visit
              </button>
              <button
                onClick={() => setModalData({ ...modalData, activeTab: "Request a Call" })}
                className={`px-4 py-2 w-1/2 rounded-md ${
                  modalData.activeTab === "Request a Call"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                Request a Call
              </button>
            </div>

            {/* Form */}
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={modalData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
              />
              <label className="block mt-4 mb-2 font-medium">Mobile Number</label>
              <div className="flex">
                <span className="bg-gray-200 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md">
                  +91
                </span>
                <input
                  type="text"
                  name="mobile"
                  value={modalData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-r-md"
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>

            {/* Buttons */}
            <button
              className="w-full py-2 bg-green-500 text-white font-semibold rounded-md mb-2"
              disabled={!isFormValid}
            >
              {modalData.activeTab}
            </button>
            <button
              className="w-full py-2 bg-gray-300 text-black font-semibold rounded-md"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default function CollegePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <College />
    </Suspense>
  );
}