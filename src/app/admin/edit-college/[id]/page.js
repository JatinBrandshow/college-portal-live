"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { API_KEY, API_NODE_URL } from "../../../../../config/config";

const EditCollege = ({ params }) => {
  const router = useRouter();
  const unwrappedParams = use(params); // Unwrap `params` using `use`
  const id = unwrappedParams.id; // Safely access `id`

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    established_year: "",
    affiliated_university: "",
    college_type: "Public",
    courses_offered: [],
    ranking: "",
    accreditation: "",
    placement_details: {
      highest_package: "",
      avg_package: "",
    },
    hostel_availability: false,
    scholarship_details: "",
    phone: "",
    email: "",
    location: {
      latitude: "",
      longitude: "",
    },
    images: "",
    datasheet_url: "",
    website_url: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all colleges and find the specific college by ID
  useEffect(() => {
    if (!id) return; // Prevent fetching with an undefined id

    const fetchCollege = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}college/colleges`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch colleges");
        }

        const result = await response.json();
        console.log("API Response:", result);

        // Check if the response is an array
        if (Array.isArray(result)) {
          const foundCollege = result.find((college) => college._id === id);
          if (foundCollege) {
            setFormData(foundCollege); // Populate form with fetched data
          } else {
            setError("College not found");
          }
        } else {
          setError("Unexpected API response structure");
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
        setError("An error occurred while fetching colleges.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("placement_details")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        placement_details: {
          ...formData.placement_details,
          [key]: value,
        },
      });
    } else if (name.includes("location")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [key]: value,
        },
      });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      console.error("Error: ID is missing");
      return;
    }

    try {
      const response = await fetch(`${API_NODE_URL}college/update-college/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("College updated successfully!");
        router.push("/admin/list-of-colleges");
      } else {
        const error = await response.json();
        alert(`Failed to update: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating college:", error);
      alert("An error occurred while updating the college.");
    }
  };

  // Handle adding and removing courses
  const [newCourse, setNewCourse] = useState("");

  const addCourse = () => {
    if (newCourse.trim()) {
      setFormData((prev) => ({
        ...prev,
        courses_offered: [...prev.courses_offered, newCourse.trim()],
      }));
      setNewCourse(""); // Clear input
    }
  };

  const removeCourse = (index) => {
    setFormData((prev) => ({
      ...prev,
      courses_offered: prev.courses_offered.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-4 text-start px-4">Edit College</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-4 space-y-4 w-full"
      >
        {/* College Name */}
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">College Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
            placeholder="Enter college name"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
            placeholder="Enter address"
          />
        </div>

        {/* City and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter city"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter state"
            />
          </div>
        </div>

        {/* Established Year and Affiliated University */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Established Year</label>
            <input
              type="number"
              name="established_year"
              value={formData.established_year}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter established year"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Affiliated University</label>
            <input
              type="text"
              name="affiliated_university"
              value={formData.affiliated_university}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter affiliated university"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* College Type */}
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">College Type</label>
          <select
            name="college_type"
            value={formData.college_type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="Government">Government</option>
          </select>
        </div>

        {/* Accreditation */}
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Accreditation</label>
          <input
            type="text"
            name="accreditation"
            value={formData.accreditation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
            placeholder="Enter accreditation"
          />
        </div>
        </div>

        {/* Courses Offered */}
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Courses Offered</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter course name"
            />
            <button
              type="button"
              onClick={addCourse}
              className="px-4 py-2 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul className="mt-2">
            {formData.courses_offered.map((course, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded-lg mt-1">
                <span className="text-xs">{course}</span>
                <button
                  type="button"
                  onClick={() => removeCourse(index)}
                  className="text-red-500 text-xs"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Placement Details */}
        <h6 className="text-2xl font-semibold text-gray-800 mt-6">Placement Details</h6>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Highest Package</label>
            <input
              type="number"
              name="placement_details.highest_package"
              value={formData.placement_details.highest_package}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter highest package"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Average Package</label>
            <input
              type="number"
              name="placement_details.avg_package"
              value={formData.placement_details.avg_package}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter average package"
            />
          </div>
        </div>

        {/* Hostel Availability and Ranking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center text-sm mb-2 font-medium text-gray-700">
              <input
                type="checkbox"
                name="hostel_availability"
                checked={formData.hostel_availability}
                onChange={handleChange}
                className="form-checkbox text-blue-600"
              />
              <span className="ml-2">Hostel Availability</span>
            </label>
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Ranking</label>
            <input
              type="number"
              name="ranking"
              value={formData.ranking}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter ranking"
            />
          </div>
        </div>

        {/* Scholarship Details */}
        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Scholarship Details</label>
          <input
            type="text"
            name="scholarship_details"
            value={formData.scholarship_details}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
            placeholder="Enter scholarship details"
          />
        </div>

        {/* Phone and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter email"
            />
          </div>
        </div>

        {/* Latitude and Longitude */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Latitude</label>
            <input
              type="text"
              name="location.latitude"
              value={formData.location.latitude}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter latitude"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Longitude</label>
            <input
              type="text"
              name="location.longitude"
              value={formData.location.longitude}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter longitude"
            />
          </div>
        </div>

        {/* Image URL, Datasheet URL, and Website URL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter image URL"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Datasheet URL</label>
            <input
              type="text"
              name="datasheet_url"
              value={formData.datasheet_url}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter datasheet URL"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Website URL</label>
            <input
              type="text"
              name="website_url"
              value={formData.website_url}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter website URL"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#1c2333] hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded shadow-md"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCollege;