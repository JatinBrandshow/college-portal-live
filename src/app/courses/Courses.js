"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

const courses = [
  { title: "Full-Stack Web Development", instructor: "John Doe", image: "/courses/webdev.jpg", category: "Technology" },
  { title: "Machine Learning & AI", instructor: "Jane Smith", image: "/courses/ai.jpg", category: "Technology" },
  { title: "Digital Marketing Mastery", instructor: "Alice Brown", image: "/courses/marketing.jpg", category: "Business" },
  { title: "Graphic Design Essentials", instructor: "David Lee", image: "/courses/design.jpg", category: "Design" },
  { title: "Cybersecurity Basics", instructor: "Emily White", image: "/courses/cybersecurity.jpg", category: "Technology" },
];

const categories = ["All", "Technology", "Business", "Design"];

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === "All" || course.category === selectedCategory) &&
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">🎓 Explore Our Courses</h1>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          {/* Search Bar */}
          <div className="relative w-full sm:w-1/2 mb-4 sm:mb-0">
            <Search className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-3 text-gray-500" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured Section */}
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg mb-10">
          <h2 className="text-2xl font-bold mb-2">🌟 Featured Course: Full-Stack Web Development</h2>
          <p>Master front-end & back-end technologies and build real-world projects.</p>
        </div>

        {/* Courses Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 transform transition-transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <img src={course.image} alt={course.title} className="w-full h-52 object-cover rounded-lg mb-4" />
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-gray-600">{course.instructor}</p>
                <span className="text-sm text-blue-500">{course.category}</span>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">No courses found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
