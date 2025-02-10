"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Modal from "react-modal";

// Modal.setAppElement("#__next"); // Use the root ID for Next.js apps

// Icon for map marker
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1673/1673221.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Zoom to hovered location component
const ZoomToCollege = ({ coordinates }) => {
  const map = useMap();
  if (coordinates) {
    map.setView(coordinates, 10, { animate: true });
  }
  return null;
};

const CollegeSection = ({ filters }) => {
  const colleges = [
    {
      id: 1,
      name: "National Institute of Technology",
      city: "Delhi",
      budget: "₹20,000",
      gender: "Co-ed",
      programs: "Engineering",
      image: "https://home.iitd.ac.in/images/slider/slide1.jpg",
      coordinates: [28.6139, 77.209],
    },
    {
      id: 2,
      name: "Indian Institute of Technology",
      city: "Mumbai",
      budget: "₹2,00,000",
      gender: "Co-ed",
      programs: "Engineering",
      image: "https://iitb-wustl.org/images/banner-2.jpg",
      coordinates: [19.076, 72.8777],
    },
    {
      id: 3,
      name: "Medical College",
      city: "Bangalore",
      budget: "₹1,00,000",
      gender: "Female Only",
      programs: "Medical",
      image: "https://admissionbangalore.co.in/wp-content/uploads/2023/03/PES-university-Bangalore-photo.jpeg",
      coordinates: [12.9716, 77.5946],
    },
    {
      id: 4,
      name: "Law College",
      city: "Chennai",
      budget: "₹80,000",
      gender: "Co-ed",
      programs: "Law",
      image: "https://www.livechennai.com/businesslistings/News_photo/Ambedkar21218.jpg",
      coordinates: [13.0827, 80.2707],
    },
    {
      id: 5,
      name: "Arts Academy",
      city: "Kolkata",
      budget: "₹1,20,000",
      gender: "Male Only",
      programs: "Arts",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Academy_of_Fine_Arts_-_2_Cathedral_Road_-_Kolkata_2014-09-16_7946-7950_Archive.tif/lossy-page1-390px-Academy_of_Fine_Arts_-_2_Cathedral_Road_-_Kolkata_2014-09-16_7946-7950_Archive.tif.jpg",
      coordinates: [22.5726, 88.3639],
    },
  ];

  const [hoveredCollege, setHoveredCollege] = useState(null);
  
  const filteredColleges = colleges.filter((college) => {
    return (
      (!filters.city || college.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.gender || college.gender === filters.gender) &&
      (!filters.programs || college.programs.toLowerCase().includes(filters.programs.toLowerCase())) &&
      parseInt(college.budget.replace(/[^0-9]/g, ""), 10) >= filters.budgetRange.min &&
      parseInt(college.budget.replace(/[^0-9]/g, ""), 10) <= filters.budgetRange.max
    );
  });

  const [modalData, setModalData] = useState({
    isOpen: false,
    activeTab: "Schedule a Visit",
    name: "",
    mobile: "",
  });

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
    <div className="flex bg-gray-50 min-h-screen">
      {/* Left Section */}
      <div className="w-2/3 p-4">
        {filteredColleges.length > 0 ? (
          filteredColleges.map((college) => (
            <div
              key={college.id}
              className="flex h-64 mb-6 p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-transform transform hover:scale-105"
              onMouseEnter={() => setHoveredCollege(college)}
              onMouseLeave={() => setHoveredCollege(null)}
            >
              {/* College Image */}
              <div className="h-full w-1/3">
                <img
                  src={college.image}
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
                    <span className="text-gray-700 text-sm">{college.gender}</span>
                    <span className="text-gray-700 text-sm">
                      Starts from {college.budget}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{college.programs}</p>
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
            <Marker position={college.coordinates} icon={markerIcon} key={college.id}>
              <Popup>
                <strong>{college.name}</strong>
                <p>{college.city}</p>
              </Popup>
            </Marker>
          ))}
          {hoveredCollege && <ZoomToCollege coordinates={hoveredCollege.coordinates} />}
        </MapContainer>
      </div>

      {/* Modal for Actions */}
      <Modal
        isOpen={modalData.isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false} // Disables the need for `setAppElement`
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
  );
};

export default CollegeSection;
