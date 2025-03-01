"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { API_KEY, API_NODE_URL } from "../../../../config/config";

const ListOfColleges = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [collegeToDelete, setCollegeToDelete] = useState(null); // Track the college to delete

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}college/colleges`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
        });

        const result = await response.json();
        console.log("result", result);

        if (Array.isArray(result)) {
          setData(result);
          setFilteredData(result);
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
        item.city.toLowerCase().includes(filter) ||
        item.state.toLowerCase().includes(filter) ||
        item.university.toLowerCase().includes(filter) ||
        item.phone.includes(filter) ||
        item.email.toLowerCase().includes(filter)
    );
    setFilteredData(filtered);
  };

  const handleDelete = async () => {
    if (!collegeToDelete || !collegeToDelete._id) {
      console.error("College object or ID is undefined!");
      return;
    }

    try {
      const response = await fetch(`${API_NODE_URL}college/delete-college/${collegeToDelete._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
      });

      if (response.ok) {
        setDeleteModalOpen(false);
        alert("College deleted successfully!");
        setCollegeToDelete(null); // Clear the college to delete
        // Update the state by removing the deleted college
        setData((prevData) => prevData.filter((college) => college._id !== collegeToDelete._id));
        setFilteredData((prevData) => prevData.filter((college) => college._id !== collegeToDelete._id));
      } else {
        alert("Failed to delete the college.");
      }
    } catch (error) {
      console.error("Error deleting college:", error);
      alert("Error deleting college.");
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-lg font-semibold mb-4 text-center text-[#1c2333]">
        List Of Colleges
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead className="bg-[#1c2333] text-white">
            <tr>
              <th className="px-4 py-2 font-semibold text-left border border-gray-300">Name</th>
              <th className="px-4 py-2 font-semibold text-left border border-gray-300">Address</th>
              <th className="px-4 py-2 font-semibold text-left border border-gray-300">City</th>
              <th className="px-4 py-2 font-semibold text-left border border-gray-300">State</th>
              <th className="px-4 py-2 font-semibold text-left border border-gray-300">Established</th>
              <th className="px-4 py-2 font-semibold text-left border border-gray-300">University</th>
              <th className="px-4 py-2 font-semibold text-left border border-gray-300">Type</th>
              <th className="px-4 py-2 font-semibold text-left border border-gray-300">Phone</th>
              <th className="px-4 py-2 font-semibold text-left border border-gray-300">Email</th>
              <th className="px-4 py-2 font-semibold text-center border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map((college, index) => (
                <tr
                  key={college._id}
                  className={`border border-gray-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                    } hover:bg-gray-200`}
                >
                  <td className="px-4 py-3 text-sm text-gray-700 align-middle truncate">{college.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 align-middle truncate">{college.address}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 align-middle truncate">{college.city}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 align-middle truncate">{college.state}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 align-middle truncate">{college.established_year}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 align-middle truncate">{college.affiliated_university}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 align-middle truncate">{college.college_type}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 align-middle truncate">{college.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 align-middle truncate">{college.email}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700 align-middle truncate">
                    <Link href={`/admin/edit-college/${college._id}`}>
                      <div className="flex items-center space-x-2">
                        {/* Edit button */}
                        <button className="bg-blue-500 text-white px-2 py-1 rounded-lg flex items-center">
                          <FaEdit />
                        </button>
                      </div>
                    </Link>
                    {/* Delete button */}
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-lg flex items-center"
                      onClick={() => {
                        setCollegeToDelete(college); // Set the college object to delete
                        setDeleteModalOpen(true); // Open the delete confirmation modal
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No colleges found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Popup */}
      {isDeleteModalOpen && collegeToDelete && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
          onClick={() => setDeleteModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-md w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-center">Confirm Deletion</h3>
            <p className="text-center text-sm mb-4">
              Are you sure you want to delete {collegeToDelete.name}?
            </p>
            <div className="flex justify-between">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListOfColleges;
