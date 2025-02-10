// app/college/College.js
"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useRef } from "react";
import { FiFilter } from "react-icons/fi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FilterSection from "./components/FilterSection";
// import CollegeSection from "./components/CollegeSection";

// Dynamically import the CollegeSection component
const CollegeSection = dynamic(() => import("./components/CollegeSection"), {
  ssr: false, // Disable server-side rendering for this component
});

const College = () => {

    const slides = [
        {
          id: 1,
          image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
          title: "Explore Top Colleges",
          subtitle: "Find the best colleges near you and start your journey.",
        },
        {
          id: 2,
          image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
          title: "Discover Courses",
          subtitle: "Choose from a variety of programs that match your interests.",
        },
        {
          id: 3,
          image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
          title: "Join Events",
          subtitle: "Participate in events and enrich your college experience.",
        },
      ];
    
      const [currentSlide, setCurrentSlide] = useState(0);
    
      // Autoplay functionality
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval); // Cleanup interval on component unmount
      }, [slides.length]);

      const [filters, setFilters] = useState({
        city: "",
        gender: null,
        budgetRange: { min: 0, max: Infinity },
        programs: "",
        amenities: [],
      });
    
      const updateFilters = (newFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
      };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Slider Section */}
      <section className="relative overflow-hidden rounded-xl mb-10">
        <div className="relative w-full h-[450px]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-white">
                <h2 className="text-4xl font-extrabold mb-4">{slide.title}</h2>
                <p className="text-lg">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Navigation */}
        <div className="absolute bottom-4 left-2/4 z-40 flex -translate-x-2/4 gap-2">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                currentSlide === i ? "w-8 bg-yellow-500" : "w-4 bg-white/50"
              }`}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
      </section>
      {/* Filter Section */}
      <FilterSection filters={filters} setFilters={updateFilters} />
      <CollegeSection filters={filters} />

    </div>
  );
};

export default College;



// {/* College List */}
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// {/* College Card */}
// {[1, 2, 3, 4, 5, 6].map((college) => (
//   <div
//     key={college}
//     className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
//   >
//     <img
//       src="https://via.placeholder.com/400x200"
//       alt="College"
//       className="w-full h-48 object-cover"
//     />
//     <div className="p-6">
//       <h2 className="text-xl font-bold text-blue-900">
//         College Name #{college}
//       </h2>
//       <p className="text-gray-600 mt-2">
//         Explore top programs, faculty, and amenities at this college.
//       </p>
//       <button className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded-lg font-semibold">
//         View Details
//       </button>
//     </div>
//   </div>
// ))}
// </div>
