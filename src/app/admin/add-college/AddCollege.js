"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API_KEY } from '../../../../config/config';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function AddCollege() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    established_year: "",
    affiliated_university: "",
    college_type: "Public",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${BASE_URL}college/add-college`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("College data uploaded successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(result.message || "Error uploading data.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading data.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
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
            <label className="block text-sm mb-2 font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter city"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter state"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Established Year</label>
            <input
              type="number"
              name="established_year"
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
            <label className="block text-sm mb-2 font-medium text-gray-700">Ranking</label>
            <input
              type="number"
              name="ranking"
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
              name="latitude"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter latitude"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Longitude</label>
            <input
              type="text"
              name="longitude"
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
