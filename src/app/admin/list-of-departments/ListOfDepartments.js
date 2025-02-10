"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { API_NODE_URL, API_KEY } from "../../../../config/config";

const ListOfDepartments = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}department/departments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
        });

        const result = await response.json();

        if (result.status && Array.isArray(result.data)) {
          setData(result.data);
          setFilteredData(result.data);
        } else {
          console.error("Unexpected response format:", result);
          setData([]);
          setFilteredData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
        setFilteredData([]);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filter = search.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(filter) ||
        item.short_name.toLowerCase().includes(filter) ||
        item.description.toLowerCase().includes(filter)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="w-full">
      <h1 className="text-lg font-semibold mb-4 text-center text-[#1c2333]">List Of Departments</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-[900px] w-full table-auto border-collapse">
          <thead className="bg-[#1c2333] text-white">
            <tr>
              <th className="px-4 py-1 text-left border border-gray-300">Name</th>
              <th className="px-4 py-1 text-left border border-gray-300">Short Name</th>
              <th className="px-4 py-1 text-left border border-gray-300">Description</th>
              <th className="px-4 py-1 text-center border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map((dept, index) => (
                <tr
                  key={dept.id}
                  className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2 text-sm font-medium text-gray-700 truncate">
                    {dept.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {dept.short_name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {dept.description}
                  </td>
                  <td className="px-4 py-2 text-sm text-center">
                    <Link href={`/admin/edit-department/${dept.id}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-lg flex items-center">
                        <span className="material-icons">edit</span>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-sm text-gray-500">
                  No Department found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default ListOfDepartments;
