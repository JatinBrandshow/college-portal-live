"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { API_NODE_URL, API_KEY } from "../../config/config";

const PopularCities = () => {
  const [countries, setCountries] = useState([]); // State for countries
  const [cities, setCities] = useState([]); // State for cities
  const [activeCountry, setActiveCountry] = useState("All"); // State for active country filter
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const router = useRouter();

  // Fetch countries and cities
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch countries
        const countriesResponse = await fetch(`${API_NODE_URL}country/countries`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        const countriesData = await countriesResponse.json();
        if (Array.isArray(countriesData)) {
          setCountries(countriesData);
        } else {
          console.error("Unexpected API response structure for countries:", countriesData);
        }

        // Fetch cities
        const citiesResponse = await fetch(`${API_NODE_URL}city/cities`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        const citiesData = await citiesResponse.json();
        if (Array.isArray(citiesData)) {
          setCities(citiesData);
        } else {
          console.error("Unexpected API response structure for cities:", citiesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle scroll events
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

  // Scroll left or right
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 170;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Handle city card click
  const handleCityClick = (cityName) => {
    router.push(`/accommodation?location=${cityName}`);
  };

  // Filter cities by active country
  const filteredCities = activeCountry === "All"
    ? cities
    : cities.filter((city) => city.country_number === activeCountry);

  // Split cities into two rows
  const firstRowCount = filteredCities.length > 7
    ? Math.min(9, Math.ceil(filteredCities.length / 2))
    : filteredCities.length;

  const firstRow = filteredCities.slice(0, firstRowCount);
  const secondRow = filteredCities.length > 7
    ? filteredCities.slice(firstRowCount)
    : [];

  const shouldShowSecondRow = filteredCities.length > 7;

  return (
    <div className="max-w-[1500px] mx-auto py-6 px-6 my-10 relative max-md:px-5 max-sm:px-3 max-md:py-5 max-sm:py-3 max-lg:my-8 max-md:my-6 max-sm:my-4">
      <h2 className="text-3xl font-bold mb-2 max-md:text-2xl max-sm:text-xl">Popular Accommodation Cities</h2>
      <p className="text-base text-gray-600">
        Find Student Stays in <span className="font-semibold">India’s Best Cities</span>!
      </p>

      {/* Country Tabs */}
      <div className="flex gap-3 overflow-x-auto mt-8 max-w-7xl max-md:mt-6 max-sm:mt-4 max-md:gap-2.5 max-sm:gap-2">
        <button
          key="All"
          onClick={() => setActiveCountry("All")}
          className={`px-4 py-2 border rounded-2xl md:rounded-full transition-all text-sm md:text-base max-sm:px-2.5 max-sm:py-1.5 ${
            activeCountry === "All" ? "border-[#5e23dd] bg-[#5e23dd] text-white" : "border-gray-300"
          }`}
        >
          All
        </button>
        {countries.map((country) => (
          <button
            key={country.country_number}
            onClick={() => setActiveCountry(country.country_number)}
            className={`px-4 py-2 border rounded-2xl md:rounded-full transition-all text-sm md:text-base max-sm:px-2.5 max-sm:py-1.5 ${
              activeCountry === country.country_number ? "border-[#5e23dd] bg-[#5e23dd] text-white" : "border-gray-300"
            }`}
          >
            {country.country_name}
          </button>
        ))}
      </div>

      {/* Scrollable Cities Section */}
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
          <div className="flex flex-col gap-4 w-max max-sm:gap-2.5 max-md:gap-3 max-sm:grid max-sm:grid-cols-2">
            {/* First Row */}
            <div className="flex gap-4">
              {firstRow.map((city) => (
                <div
                  key={city.city_number}
                  className="relative w-40 h-48 min-w-[10rem] sm:min-w-[9rem] md:min-w-[10rem] lg:min-w-[14rem] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => handleCityClick(city.city_name)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110 bg-gray-400 bg-blend-darken"
                    style={{ backgroundImage: `url(${city.city_img?.[0] || "/placeholder-image.jpg"})` }}
                  ></div>
                  <div className="absolute flex items-end p-2 bottom-0">
                    <p className="text-white font-bold mx-auto line-clamp-1 overflow-hidden">{city.city_name}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Conditionally render the second row */}
            {shouldShowSecondRow && (
              <div className="flex gap-4">
                {secondRow.map((city) => (
                  <div
                    key={city.city_number}
                    className="relative w-40 h-48 min-w-[10rem] sm:min-w-[9rem] md:min-w-[10rem] lg:min-w-[14rem] rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => handleCityClick(city.city_name)}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110 bg-gray-400 bg-blend-darken"
                      style={{ backgroundImage: `url(${city.city_img?.[0] || "/placeholder-image.jpg"})` }}
                    ></div>
                    <div className="absolute flex items-end p-2 bottom-0">
                      <p className="text-white font-bold mx-auto line-clamp-1 overflow-hidden">{city.city_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {showRightButton && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:bg-red-500 hover:text-white transition max-md:p-1.5"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PopularCities;