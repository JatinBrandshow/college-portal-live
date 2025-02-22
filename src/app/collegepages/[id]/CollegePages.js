"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "leaflet/dist/leaflet.css";
import Select from "react-select"; // For multi-select dropdown
import Slider from "rc-slider"; // For budget range slider
import "rc-slider/assets/index.css"; // Slider styles
import { API_NODE_URL, API_KEY } from "../../../../config/config"; // Update to use college API
import dynamic from "next/dynamic";
import { useMap } from "react-leaflet";
import { useRouter } from "next/navigation";


// 📌 Dynamic imports for Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

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

// 📌 Main Map Component for Colleges
const MapComponent = ({ college }) => {
  const [L, setLeaflet] = useState(null);
  const [customMarker, setCustomMarker] = useState(null);

  // 📌 Load Leaflet library on client-side only
  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setLeaflet(leaflet);
      setCustomMarker(
        new leaflet.Icon({
          iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg", // Custom icon URL
          iconSize: [25, 25], // Adjust the size of the marker
          className: "ping-marker", // Apply ping effect
        })
      );
    });
  }, []);

  if (!L || !customMarker) return <p>Loading map...</p>; // Ensure Leaflet is loaded before rendering

  // 📌 Default location for the map based on college's latitude and longitude
  const position = [college.location.latitude, college.location.longitude];

  return (
    <div className="h-[600px] bg-gray-200 rounded-lg relative">
      <MapContainer center={position} zoom={13} className="w-full h-full">
        {/* 📌 OpenStreetMap Tile Layer */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 📌 Update map position smoothly */}
        <MapUpdater position={position} />

        {/* 📌 Display marker for the college */}
        <Marker position={position} icon={customMarker}
        >
          <Popup>
            <div className="text-center">
              <p className="font-semibold">{college.name}</p>
              {/* Optionally add more details like fees or ranking */}
              {/* <p className="text-black">₹{college.fees.perYear}/year</p> */}
              <p>{college.city}, {college.state}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};






const CollegePages = ({ id }) => {
  const router = useRouter();
  const [collegeDetails, setCollegeDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  console.log("id", id); // Debugging

  useEffect(() => {
    const fetchCollegeDetails = async () => {
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

        if (Array.isArray(data.colleges)) {
          const foundCollege = data.colleges.find((item) => item._id === id);
          console.log(foundCollege);
          if (foundCollege) {
            setCollegeDetails(foundCollege); // Set the entire college object
          } else {
            setError("College not found");
          }
        } else {
          setError("Unexpected API response structure");
        }
      } catch (error) {
        setError("Error fetching college details");
        console.error("Error fetching college details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCollegeDetails();
    }
  }, [id]); // Re-run this effect when the `id` changes

  // Show loading state while fetching the data
  if (loading) {
    return <div className="text-center py-10">Loading college details...</div>;
  }

  console.log("collegeDetails", collegeDetails); 

  // Show error message if any error occurred during the fetch
  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  // If no college details are found, show a message
  if (!collegeDetails) {
    return <div className="text-center py-10 text-red-500">No college details found.</div>;
  }

  return (
    <div className="p-6">
    <h1 className="text-4xl font-bold mb-6 mt-2 text-center">{collegeDetails.name}</h1>
  
    {/* College Details and Map Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
  {/* College Image */}
  <div className="w-full mb-8">
    <img
      src={collegeDetails.img[0] || "/placeholder-image.jpg"}
      alt={collegeDetails.name}
      className="w-full h-80 object-cover rounded-xl shadow-md"
    />
  </div>

  {/* College Details */}
  <div>
    {/* About College */}
    <div className="mb-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">About {collegeDetails.name}</h2>
      <p className="text-lg text-gray-700">{collegeDetails.description}</p>
    </div>

    {/* Established Year */}
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Established Year</h3>
        <p className="text-gray-600">{collegeDetails.established_year}</p>
      </div>

      {/* Affiliation */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Affiliation</h3>
        <p className="text-gray-600">{collegeDetails.affiliation}</p>
      </div>
    </div>

    {/* College Type */}
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">College Type</h3>
        <p className="text-gray-600">{collegeDetails.college_type}</p>
      </div>

      {/* Address */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Address</h3>
        <p className="text-gray-600">{collegeDetails.address}</p>
      </div>
    </div>

    {/* Location */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Location</h3>
      <p className="text-gray-600">{collegeDetails.city}, {collegeDetails.state}, {collegeDetails.country}</p>
    </div>

    {/* Contact Information */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
      <p className="text-gray-600">Phone: <span className="font-semibold">{collegeDetails.contact_number}</span></p>
      <p className="text-gray-600">Email: <a href={`mailto:${collegeDetails.email}`} className="text-blue-600 hover:text-blue-800">{collegeDetails.email}</a></p>
      <p className="text-gray-600">Website: <a href={collegeDetails.website} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">{collegeDetails.website}</a></p>
    </div>

    {/* Courses Offered */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Courses Offered</h3>
      <div className="flex flex-wrap gap-4 mt-2">
        {collegeDetails.courses_offered.map((course, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-4 py-2 text-sm rounded-full"
          >
            {course}
          </span>
        ))}
      </div>
    </div>

    {/* Placement Details */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Placement Details</h3>
      <p className="text-gray-600">Highest Package: ₹{collegeDetails.placement_details.highest_package}</p>
      <p className="text-gray-600">Average Package: ₹{collegeDetails.placement_details.avg_package}</p>
    </div>

    {/* Scholarship Details */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Scholarship Details</h3>
      <p className="text-gray-600">{collegeDetails.scholarship_details}</p>
    </div>

    {/* Hostel Availability */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Hostel Availability</h3>
      <p className="text-gray-600">{collegeDetails.hostel_availability ? 'Available' : 'Not Available'}</p>
    </div>

    {/* Ranking */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Ranking</h3>
      <p className="text-gray-600">{collegeDetails.ranking}</p>
    </div>
  </div>
</div>

  
      {/* Right Side: Map */}
      <div className="lg:col-span-1">
        <div className="sticky top-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <MapComponent college={collegeDetails} />
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default CollegePages;