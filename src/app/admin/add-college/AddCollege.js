"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_NODE_URL, API_KEY } from "../../../../config/config";

function AddCollege() {
  const [formData, setFormData] = useState({
    name: "",
    address:"",
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
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setFormData((prevData) => {
    // Ensure courses_offered is properly formatted as an array of strings
    const updatedFormData = {
      ...formData,
      courses_offered: Array.isArray(formData.courses_offered) 
        ? formData.courses_offered.map(course => String(course).trim()) 
        : [], // Ensure it's always an array
    };  
      console.log("Submitting Data:", JSON.stringify(updatedFormData, null, 2));
  
      fetch(`${API_NODE_URL}college/add-college`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(updatedFormData),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Result:", result);
          if (result.status) {
            toast.success("College data uploaded successfully!");
          } else {
            toast.error(result.msg || "Error uploading data.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("An error occurred while uploading data.");
        });
  
      return prevData; // Prevent unnecessary re-renders
    });
  };
  const [newCourse, setNewCourse] = useState(""); // Track input value

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
  return (
    <div className="container p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-start px-4">Add New College</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-4 space-y-4 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">College Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full p-2  border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter college name"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter city"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter state"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter year"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Affiliated University Name</label>
            <input
              type="text"
              name="affiliated_university"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter university name"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">College Type</label>
            <select
              name="college_type"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Government">Government</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Established Year</label>
            <input
              type="number"
              name="established_year"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter ranking"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Accreditation</label>
            <input
              type="text"
              name="accreditation"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter accreditation"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

            {/* Show added courses */}
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
        </div>

        <h6 className="text-2xl font-semibold text-gray-800 mt-6">Placement Details</h6>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Highest Package</label>
            <input
              type="number"
              name="placement_details.highest_package"
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
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter average package"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="flex items-center text-sm mb-2 font-medium text-gray-700">
            <input
              type="checkbox"
              name="hostel_availability"
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
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter ranking"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Scholarship Details</label>
          <input
            type="text"
            name="scholarship_details"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
            placeholder="Enter scholarship details"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
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
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter email"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Latitude</label>
            <input
              type="text"
              name="location.latitude"
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
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter longitude"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <div>
            <label className="block font-semibold text-sm mb-2">Image URL</label>
            <input
              type="text"
              name="images"
              onChange={handleChange}
              className="w-full p-2 border rounded text-xs shadow-sm mb-2"
              placeholder="Enter Image URL"
            />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-2">Datasheet URL</label>
            <input
              type="text"
              name="datasheet_url"
              onChange={handleChange}
              className="w-full p-2 border rounded text-xs shadow-sm mb-2"
              placeholder="Enter datasheet URL"
            />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-2">Website URL</label>
            <input
              type="text"
              name="website_url"
              onChange={handleChange}
              className="w-full p-2 border rounded text-xs shadow-sm mb-2"
              placeholder="Enter Website URL"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-[#1c2333] hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCollege;