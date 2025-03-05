"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

// Sample data for faculty members
const facultyData = [
    {
        name: "Dr. Jane Smith",
        title: "Professor of Computer Science",
        department: "Computer Science",
        email: "jane.smith@example.com",
        phone: "(123) 456-7890",
        photo: "/image/dashboard/profile.webp",
    },
    {
        name: "Dr. John Doe",
        title: "Associate Professor of Mathematics",
        department: "Mathematics",
        email: "john.doe@example.com",
        phone: "(123) 456-7891",
        photo: "/image/dashboard/profile.webp",
    },
    // Add more faculty members as needed
];

const FacultyDirectory = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All");

    // Extract unique departments for filter options
    const departments = ["All", ...new Set(facultyData.map((member) => member.department))];

    // Filter faculty members based on search term and selected department
    const filteredFaculty = facultyData.filter((member) => {
        const matchesSearchTerm =
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment =
            selectedDepartment === "All" || member.department === selectedDepartment;
        return matchesSearchTerm && matchesDepartment;
    });

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 py-10">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-blue-600">Faculty Directory</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Meet our esteemed faculty members.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row md:justify-between items-center mb-8">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
                        <input
                            type="text"
                            placeholder="Search by name or title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute right-3 top-2.5 text-gray-500" size={20} />
                    </div>

                    {/* Department Filter */}
                    <div className="relative w-full md:w-1/3">
                        <select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {departments.map((dept, index) => (
                                <option key={index} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                        <Filter className="absolute right-3 top-2.5 text-gray-500" size={20} />
                    </div>
                </div>

                {/* Faculty Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredFaculty.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
                        >
                            <img
                                src={member.photo}
                                alt={member.name}
                                className="w-32 h-32 rounded-full mb-4 object-cover"
                            />
                            <h3 className="text-lg font-semibold">{member.name}</h3>
                            <p className="text-blue-600">{member.title}</p>
                            <p className="text-gray-500">{member.department}</p>
                            <a
                                href={`mailto:${member.email}`}
                                className="text-gray-600 mt-2"
                            >
                                {member.email}
                            </a>
                            <p className="text-gray-600">{member.phone}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FacultyDirectory;
