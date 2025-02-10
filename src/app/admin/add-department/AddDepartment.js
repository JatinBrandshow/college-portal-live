"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_KEY } from '../../../../config/config';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function AddDepartment() {
  const [formData, setFormData] = useState({
    name: "",
    college_id: "",
    head_of_department: "",
    established_year: "",
    courses_offered: "",
    faculty_count: "",
    department_type: "Academic",
    location: {
      building: "",
      floor: "",
    },
    contact_email: "",
    contact_phone: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("location")) {
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
        `${BASE_URL}department/add-department`,
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
        toast.success("Department data uploaded successfully!", {
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
      <h1 className="text-2xl font-bold mb-4 text-start px-4">Add New Department</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-4 space-y-4 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Department Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full p-2  border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter department name"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">College ID</label>
            <input
              type="text"
              name="college_id"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter associated college ID"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Head of Department</label>
            <input
              type="text"
              name="head_of_department"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter head of department name"
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
            <label className="block text-sm mb-2 font-medium text-gray-700">Courses Offered</label>
            <input
              type="text"
              name="courses_offered"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter courses offered"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Faculty Count</label>
            <input
              type="number"
              name="faculty_count"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter number of faculty members"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-2 font-medium text-gray-700">Department Type</label>
          <select
            name="department_type"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
          >
            <option value="Academic">Academic</option>
            <option value="Research">Research</option>
          </select>
        </div>

        <h6 className="text-2xl font-semibold text-gray-800 mt-6">Location</h6>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Building</label>
            <input
              type="text"
              name="location.building"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter building"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Floor</label>
            <input
              type="text"
              name="location.floor"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter floor"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              name="contact_email"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Contact Phone</label>
            <input
              type="text"
              name="contact_phone"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter phone number"
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

export default AddDepartment;
