"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { API_KEY, API_NODE_URL } from "../../../../../config/config";

const EditAffiliation = () => {
  const router = useRouter();
  const params = useParams(); // Unwrapping params
  const { id } = params || {}; // Ensuring safe access

  const [formData, setFormData] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  useEffect(() => {
    if (!id) return; // Prevent fetching with an undefined id

    const fetchAffiliation = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}affiliation/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const result = await response.json();
        console.log("API Response:", result);

        if (result.status && result.data) {
          setFormData(result.data);
        } else {
          console.error("Unexpected response format:", result);
          setFormData({ name: "", short_name: "", description: "" });
        }
      } catch (error) {
        console.error("Error fetching affiliation data:", error);
        setFormData({ name: "", short_name: "", description: "" });
      }
    };

    fetchAffiliation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      console.error("Error: ID is missing");
      return;
    }

    try {
      const response = await fetch(`${API_NODE_URL}affiliation/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Affiliation updated successfully!");
        router.push("/admin/list-of-affiliations");
      } else {
        const error = await response.json();
        alert(`Failed to update: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating affiliation:", error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold text-center text-[#1c2333]">Edit Affiliation</h1>
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

export default EditAffiliation;
