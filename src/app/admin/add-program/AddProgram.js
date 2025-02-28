"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_NODE_URL, API_KEY } from "../../../../config/config";

function AddProgram() {
  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("placement_details")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        placement_details: {
          ...prev.placement_details,
          [key]: value,
        },
      }));
    } else if (name.includes("location")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [key]: value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_NODE_URL}program/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      const result = JSON.parse(text);

      if (response.ok) {
        toast.success("Program data uploaded successfully!", {
          position: "top-right",
          autoClose: 3000,
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
      <h1 className="text-2xl font-bold mb-4 text-start">Add New Program</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-4 w-full"
      >
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter Program name"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Short Name</label>
            <input
              type="text"
              name="short_name"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter Short Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              placeholder="Enter Description"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-[#1c2333] hover:bg-opacity-90 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProgram;
