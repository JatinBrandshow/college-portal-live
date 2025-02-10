"use client";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_NODE_URL, API_KEY } from "../../../../config/config";  

const ListOfStreams = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}stream/all-streams`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
        });

        if (!response.ok) {
          console.error(`API Error: ${response.status} - ${response.statusText}`);
        }
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

  const handleEdit = (id) => {
    router.push(`/admin/edit-stream/${id}`);
  };

  return (
    <div className="w-full">
      <h1 className="text-lg font-semibold mb-4 text-center text-[#1c2333]">List Of Streams</h1>
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
              filteredData.map((stream, index) => (
                <tr
                  key={stream.id || stream._id}
                  className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-4 py-1 text-sm font-medium text-gray-700 truncate">
                    {stream.name}
                  </td>
                  <td className="px-4 py-1 text-sm text-gray-600 truncate">
                    {stream.short_name}
                  </td>
                  <td className="px-4 py-1 text-sm text-gray-600 truncate">
                    {stream.description}
                  </td>
                  <td className="px-4 py-1 text-sm text-center">
                    <button
                      onClick={() => handleEdit(stream.id || stream._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-lg mx-auto flex items-center"
                    >
                      <span className="material-icons"><FaEdit /></span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-sm text-gray-500">
                  No Stream found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOfStreams;
