"use client";

import { useState, useEffect } from "react";
import { API_KEY, API_NODE_URL } from "../../../../config/config";

const ListOfAccommodations = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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
              <th className="px-2 py-1 text-left border border-gray-300">Country</th>
              <th className="px-2 py-1 text-left border border-gray-300">Pincode</th>
              <th className="px-2 py-1 text-left border border-gray-300">Price</th>
              <th className="px-2 py-1 text-left border border-gray-300">Amenities</th>
              <th className="px-2 py-1 text-left border border-gray-300">Phone</th>
              <th className="px-2 py-1 text-left border border-gray-300">Email</th>
              <th className="px-2 py-1 text-left border border-gray-300">Image</th>
              <th className="px-2 py-1 text-center border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map((Accomo, index) => (
                <tr
                  key={Accomo.id}
                  className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                >
                  <td className="px-4 py-2 text-sm font-medium text-gray-700 truncate">
                    {Accomo.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {Accomo.type}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {Accomo.address}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {Accomo.city}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {Accomo.country}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {Accomo.pincode}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {Accomo.price}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {Accomo.phone}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600 truncate">
                    {Accomo.email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    <img
                      src={Accomo.image}
                      alt={Accomo.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-center">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-lg flex items-center">
                      <span className="material-icons">edit</span>
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
    </div>

  );
};

export default ListOfAccommodations;
