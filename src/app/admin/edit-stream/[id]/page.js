"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_KEY } from "../../../../../config/config";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EditStream = ({ params }) => {
  const router = useRouter();
  const { id } = params;

  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  useEffect(() => {
    const fetchStream = async () => {
      try {
        const response = await fetch(`${BASE_URL}/stream/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
        });
        const result = await response.json();

        if (result.status && result.data) {
          setFormData(result.data);
        } else {
          console.error("Failed to fetch stream data:", result);
        }
      } catch (error) {
        console.error("Error fetching stream data:", error);
      }
    };

    fetchStream();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}stream/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Stream updated successfully!");
        router.push("/admin/list-of-streams");
      } else {
        const error = await response.json();
        alert(`Failed to update: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating stream:", error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold text-center text-[#1c2333]">Edit Stream</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Short Name</label>
          <input
            type="text"
            name="short_name"
            value={formData.short_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditStream;
