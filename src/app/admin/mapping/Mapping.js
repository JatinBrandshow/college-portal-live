"use client";

import { useState, useEffect } from "react";
import { API_NODE_URL, API_KEY } from "../../../../config/config";

const Mapping = () => {
  const [fields, setFields] = useState({
    field1: [],
    field2: [],
    field3: [],
    field4: [],
    field5: [],
    field6: [],
  });

  const [selectedValues, setSelectedValues] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
  });

  const BASE_URL = API_NODE_URL;

  useEffect(() => {
    const fetchFieldData = async (fieldName, endpoint) => {
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
        });

        const { status, data } = await response.json();

        if (status && Array.isArray(data)) {
          setFields((prev) => ({ ...prev, [fieldName]: data }));
        } else {
          console.error(`Unexpected response for ${fieldName}:`, data);
          setFields((prev) => ({ ...prev, [fieldName]: [] }));
        }
      } catch (error) {
        console.error(`Error fetching data for ${fieldName}:`, error);
        setFields((prev) => ({ ...prev, [fieldName]: [] }));
      }
    };

    fetchFieldData("field1", "college/all-colleges");
    fetchFieldData("field2", "departments/all-departments");
    fetchFieldData("field3", "accommodation/all-accommodations");
    fetchFieldData("field4", "program/all-programs");
    fetchFieldData("field5", "stream/all-streams");
    fetchFieldData("field6", "affiliation/all-affiliation");
  }, [BASE_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const fieldMappings = {
    field1: { label: "College", placeholder: "Select College" },
    field2: { label: "Department", placeholder: "Select Department" },
    field3: { label: "Accommodation", placeholder: "Select Accommodation" },
    field4: { label: "Program", placeholder: "Select Program" },
    field5: { label: "Stream", placeholder: "Select Stream" },
    field6: { label: "Affiliation", placeholder: "Select Affiliation" },
  };

  return (
    <>
      <h1 className="text-2xl font-bold px-4 mb-4 text-start max-md:text-xl max-sm:text-lg">Select Items For Mapping</h1>
      <div className="w-full mx-auto mt-5 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(fields).map((fieldKey, index) => (
            <div key={index} className="mb-2">
              <label
                htmlFor={fieldKey}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {fieldMappings[fieldKey].label}
              </label>
              <select
                id={fieldKey}
                name={fieldKey}
                value={selectedValues[fieldKey]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 text-xs rounded-lg focus:ring focus:ring-blue-300 placeholder-gray-400"
              >
                <option value="" disabled>
                  {fieldMappings[fieldKey].placeholder}
                </option>
                {(fields[fieldKey] || []).map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div className="col-span-2 text-center">
            <button
              type="submit"
              className="bg-[#1c2333] text-white py-2 px-6 rounded-lg shadow-md hover:bg-opacity-90"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Mapping;
