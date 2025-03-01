"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_KEY, API_NODE_URL } from "../../../../config/config";

const ListOfAccommodations = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // Modal state
  const [accommodationToDelete, setAccommodationToDelete] = useState(null); // Accommodation to delete
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}accommodation/all-accommodations`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
        });
        const result = await response.json();
        console.log("result", result);

        // Check if the response contains the expected 'data' field
        if (result.status && Array.isArray(result.data)) {
          setData(result.data);  // Set the accommodations data
          setFilteredData(result.data);  // Set the filtered data
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
        item.location.city.toLowerCase().includes(filter) ||
        item.location.state.toLowerCase().includes(filter) ||
        item.location.university?.toLowerCase().includes(filter) ||
        item.phone?.includes(filter) ||
        item.email?.toLowerCase().includes(filter)
    );
    setFilteredData(filtered);
  };

  const handleEdit = (id) => {
    router.push(`/admin/edit-accommodation/${id}`);
  };

  const handleDelete = async () => {
    if (!accommodationToDelete) return;

    try {
      const response = await fetch(`${API_NODE_URL}accommodation/accommodations/${accommodationToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
      });
      const result = await response.json();
      if (result.status) {
        // Remove the deleted accommodation from the state
        setData(data.filter(item => item._id !== accommodationToDelete));
        setFilteredData(filteredData.filter(item => item._id !== accommodationToDelete));
        alert("Accommodation deleted successfully");
        setDeleteModalOpen(false);  // Close the modal after deletion
        setAccommodationToDelete(null); // Clear the accommodation to delete
      } else {
        alert("Failed to delete accommodation");
      }
    } catch (error) {
      console.error("Error deleting accommodation:", error);
      alert("An error occurred while deleting the accommodation");
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-lg font-semibold mb-4 text-center text-[#1c2333]">List Of Accommodations</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-[900px] w-full table-auto border-collapse">
          <thead className="bg-[#1c2333] text-white">
            <tr>
              <th className="px-2 py-1 text-left border border-gray-300">Name</th>
              <th className="px-2 py-1 text-left border border-gray-300">Type</th>
              <th className="px-2 py-1 text-left border border-gray-300">Address</th>
              <th className="px-2 py-1 text-left border border-gray-300">City</th>
              <th className="px-2 py-1 text-left border border-gray-300">State</th>
              <th className="px-2 py-1 text-left border border-gray-300">Pincode</th>
              <th className="px-2 py-1 text-left border border-gray-300">Price</th>
              <th className="px-2 py-1 text-left border border-gray-300">Amenities</th>
              <th className="px-2 py-1 text-left border border-gray-300">Ratings</th>
              <th className="px-2 py-1 text-left border border-gray-300">Image</th>
              <th className="px-2 py-1 text-center border border-gray-300">Actions</th>
              <th className="px-2 py-1 text-center border border-gray-300">Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map((accommodation, index) => (
                <tr
                  key={accommodation._id || index} // Use accommodation._id if available, otherwise fallback to index
                  className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-2 text-sm font-medium text-gray-700 truncate">
                    {accommodation.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {accommodation.type}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {accommodation.location.route}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {accommodation.location.city}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {accommodation.location.state}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {accommodation.location.postalCode}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {accommodation.meta.averagePropertyPrice}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {accommodation.amenities.join(", ")}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {accommodation.reviewsRating}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    <img
                      src={accommodation.image}
                      alt={accommodation.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-center">
                    <button
                      onClick={() => handleEdit(accommodation._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-lg flex items-center"
                    >
                      <span className="material-icons">edit</span>
                    </button>
                  </td>
                  <td className="px-4 py-2 text-sm text-center">
                    <button
                      onClick={() => {
                        setAccommodationToDelete(accommodation._id); // Set the accommodation to delete
                        setDeleteModalOpen(true); // Open the delete confirmation modal
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg flex items-center"
                    >
                      <span className="material-icons">delete</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="text-center py-4 text-sm text-gray-500"
                >
                  No Accommodation found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Popup */}
      {isDeleteModalOpen && accommodationToDelete && (
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
              Are you sure you want to delete this accommodation?
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

export default ListOfAccommodations;
