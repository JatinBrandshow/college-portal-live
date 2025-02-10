"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_KEY } from "../../../../../config/config";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EditProgram = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);

  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/program/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
        });
        const result = await response.json();

        if (response.ok && result.data) {
          setFormData(result.data);
        } else {
          console.error("Failed to fetch program data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching program data:", error);
      }
    };

    if (id) {
      fetchProgramData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}program/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Program updated successfully!");
        router.push("/admin/list-of-programs");
      } else {
        const error = await response.json();
        alert(`Failed to update program: ${error.message}`);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center text-[#1c2333] mb-4">
        Edit Program: {id}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Program Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">
              Short Name
            </label>
            <input
              type="text"
              name="short_name"
              value={formData.short_name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Short Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Description"
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-[#1c2333] text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 shadow-md"
          >
            Update Program
          </button>
        </div>
      </form>
    </div>

  );
};

export default EditProgram;
