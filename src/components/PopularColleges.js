"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API_NODE_URL, API_KEY } from "../../config/config";
import Link from "next/link"; // Import the Link component

const PopularColleges = () => {
  const [colleges, setColleges] = useState([]);
  const [cities, setCities] = useState([]);
  const [activeCity, setActiveCity] = useState("All");
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}college/colleges`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const text = await response.text(); // Read raw response
        const data = JSON.parse(text); // Parse JSON manually

        if (Array.isArray(data)) {
          // Filter colleges where isPopular is true
          const popularColleges = data.filter((college) => college.isPopular === true);
          setColleges(popularColleges);

          // Get unique cities from popular colleges
          const uniqueCities = ["All", ...new Set(popularColleges.map((college) => college.city))];
          setCities(uniqueCities);
        } else {
          console.error("Unexpected API response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setShowLeftButton(scrollRef.current.scrollLeft > 0);
        setShowRightButton(
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth < scrollRef.current.scrollWidth
        );
      }
    };
    handleScroll();
    scrollRef.current?.addEventListener("scroll", handleScroll);
    return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 170;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Filter colleges based on active city
  const filteredColleges =
    activeCity === "All"
      ? colleges
      : colleges.filter((college) => college.city === activeCity);

  // Split colleges into two rows
  const firstRowCount =
    filteredColleges.length > 6
      ? Math.min(9, Math.max(6, filteredColleges.length - Math.floor(filteredColleges.length / 2)))
      : filteredColleges.length;

  const firstRow = filteredColleges.slice(0, firstRowCount);
  const secondRow = filteredColleges.length > 6 ? filteredColleges.slice(firstRowCount) : [];

  const shouldShowSecondRow = filteredColleges.length > 6;

  return (
    <div className="max-w-[1500px] mx-auto py-6 px-6 my-10 relative max-md:px-5 max-sm:px-3 max-md:py-5 max-sm:py-3 max-lg:my-8 max-md:my-6 max-sm:my-4">
      <h2 className="text-3xl font-bold mb-2 max-md:text-2xl max-sm:text-xl">Top Colleges/Universities</h2>
      <p className="text-base text-gray-600">
        Top Cities, Best Colleges – <span className="font-semibold">Your Stay, Sorted</span>!
      </p>

      {/* City Tabs */}
      <div className="flex gap-3 overflow-x-auto mt-8 max-w-7xl max-md:mt-6 max-sm:mt-4 max-md:gap-2.5 max-sm:gap-2">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            className={`px-4 py-2 border rounded-2xl md:rounded-full transition-all text-sm md:text-base max-sm:px-2.5 max-sm:py-1.5 max-sm:whitespace-nowrap ${
              activeCity === city ? "border-[#5e23dd] bg-[#5e23dd] text-white" : "border-gray-300"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Scrollable Colleges Section */}
      <div className="mt-6 relative">
        {showLeftButton && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:bg-red-500 hover:text-white transition max-sm:p-1.5"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div ref={scrollRef} className="overflow-x-auto scroll-smooth w-full px-0 relative no-scrollbar">
          <div className="flex flex-col gap-4 w-max max-sm:grid max-sm:grid-cols-2">
            {/* First Row */}
            <div className="flex gap-4">
              {firstRow.map((college) => (
                <Link key={college._id} href={`/collegepages/${college._id}`} passHref>
                  <div className="relative w-40 h-48 min-w-[10rem] sm:min-w-[9rem] md:min-w-[10rem] lg:min-w-[14rem] rounded-lg overflow-hidden cursor-pointer">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110 bg-gray-400 bg-blend-darken"
                      style={{
                        backgroundImage: `url(${college.images?.[0] || "/placeholder-image.jpg"})`, // Updated to use `images` and added fallback
                      }}
                    ></div>
                    <div className="absolute flex items-end p-2 bottom-0">
                      <p className="text-white font-bold mx-auto line-clamp-1 overflow-hidden">
                        {college.name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Second Row */}
            {shouldShowSecondRow && (
              <div className="flex gap-4">
                {secondRow.map((college) => (
                  <Link key={college._id} href={`/collegepages/${college._id}`} passHref>
                    <div className="relative w-40 h-48 min-w-[10rem] sm:min-w-[9rem] md:min-w-[10rem] lg:min-w-[14rem] rounded-lg overflow-hidden cursor-pointer">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110 bg-gray-400 bg-blend-darken"
                        style={{
                          backgroundImage: `url(${college.images?.[0] || "/placeholder-image.jpg"})`, // Updated to use `images` and added fallback
                        }}
                      ></div>
                      <div className="absolute flex items-end p-2 bottom-0">
                        <p className="text-white font-bold mx-auto line-clamp-1 overflow-hidden">
                          {college.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {showRightButton && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:bg-red-500 hover:text-white transition max-sm:p-1.5"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PopularColleges;