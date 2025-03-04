"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

const books = [
  { title: "Introduction to AI", author: "John Doe", image: "/books/ai.jpg", category: "Technology" },
  { title: "Modern Web Development", author: "Jane Smith", image: "/books/webdev.jpg", category: "Technology" },
  { title: "Digital Marketing", author: "Alice Brown", image: "/books/marketing.jpg", category: "Business" },
  { title: "World History", author: "David Lee", image: "/books/history.jpg", category: "History" },
  { title: "Psychology 101", author: "Emily White", image: "/books/psychology.jpg", category: "Science" },
];

const categories = ["All", "Technology", "Business", "History", "Science"];

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBooks = books.filter(
    (book) =>
      (selectedCategory === "All" || book.category === selectedCategory) &&
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">📚 Library Collection</h1>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          {/* Search Bar */}
          <div className="relative w-full sm:w-1/2 mb-4 sm:mb-0">
            <Search className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search books..."
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

        {/* Book Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 transform transition-transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <img src={book.image} alt={book.title} className="w-full h-52 object-cover rounded-lg mb-4" />
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-gray-600">{book.author}</p>
                <span className="text-sm text-blue-500">{book.category}</span>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">No books found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
