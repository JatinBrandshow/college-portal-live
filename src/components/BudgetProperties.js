"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { API_NODE_URL, API_KEY } from "../../config/config";

const BudgetProperties = () => {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState("All");
  const [cities, setCities] = useState([]); // State for cities data
  const [countries, setCountries] = useState([]); // State for countries data

  const handleCardClick = (id) => {
    router.push(`/pages/${id}`);
  };

  // Fetch cities and countries data
  useEffect(() => {
    const fetchCitiesAndCountries = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching cities and countries:", error);
      }
    };

    fetchCitiesAndCountries();
  }, []);

  // Fetch accommodations and map city and country names
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}accommodation/all-accommodations`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const data = await response.json();

        if (data.status === "success" && Array.isArray(data.data.accommodations)) {
          const mappedProperties = data.data.accommodations.map((item) => {
            // Get city_number from location
            const cityNumber = item.location?.city_number;

            // Find city data using city_number
            const cityInfo = cities.find((city) => city.city_number === cityNumber);
            const cityName = cityInfo?.city_name || "Unknown City";

            // Get country_number from city data
            const countryNumber = cityInfo?.country_number;

            // Find country data using country_number
            const countryInfo = countries.find((country) => country.country_number === countryNumber);
            const countryName = countryInfo?.country_name || "Unknown Country";

            return {
              id: item._id,
              title: item.name || "No Name",
              city: cityName,
              country: countryName,
              price: item.pricing?.minPrice ? `₹${item.pricing.minPrice}` : "N/A",
              rating: item.reviewsRating || "No Rating",
              images: Array.isArray(item.meta?.images) ? item.meta.images : [],
              amenities: Array.isArray(item.amenities) ? item.amenities : [],
              description: item.description?.short_description || "No Description",
              type: item.type || "Unknown Type",
              reviewsCount: item.reviewsCount || 0,
              featuredImagePath: item.featuredImagePath || "",
            };
          });

          setProperties(mappedProperties);
        } else {
          console.error("Unexpected API response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    if (cities.length > 0 && countries.length > 0) {
      fetchProperties();
    }
  }, [cities, countries]);

  // Filter properties with price up to ₹5000
  const budgetProperties = properties.filter((prop) => {
    const price = parseFloat(prop.price.replace(/[^0-9.-]+/g, "")); // Extract numeric value from price string
    return price <= 5000; // Only include properties with price <= ₹5000
  });

  // Get unique cities dynamically from budgetProperties
  const uniqueCities = ["All", ...new Set(budgetProperties.map((prop) => prop.city))];

  // Filter properties based on selected city
  const filteredProperties =
    filter === "All"
      ? budgetProperties
      : budgetProperties.filter((prop) => prop.city === filter);

  // Sort properties from low to high price
  const sortedProperties = filteredProperties.sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, "")); // Extract numeric value from price string
    const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, "")); // Extract numeric value from price string
    return priceA - priceB;
  });

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading and Subheading */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 text-left">Budget Properties by Cities</h2>
          <p className="text-gray-600 mt-2 text-left">
            From studios to private rooms to shared apartments, we’ve got it all.
          </p>
        </div>

        {/* Filter Buttons (Dynamic from budgetProperties) */}
        <div className="flex justify-left space-x-4 mb-8 overflow-x-auto">
          {uniqueCities.map((city) => (
            <button
              key={city}
              onClick={() => setFilter(city)}
              className={`px-4 py-2 rounded-full border ${
                filter === city
                  ? "bg-[#5e23dd] text-white border-[#5e23dd]"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            centeredSlides={false}
            modules={[Navigation]}
            className="relative"
          >
            {sortedProperties.map((property) => (
              <SwiperSlide key={property.id}>
                <div
                  className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => handleCardClick(property.id)} // Navigate on click
                >
                  {/* Image Slider */}
                  <div className="relative w-full h-48">
                    <Swiper
                      spaceBetween={0}
                      slidesPerView={1}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      className="h-full"
                      modules={[Autoplay]}
                    >
                      {property.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img src={image} alt={property.title} className="w-full h-full object-cover" />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* Property Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{property.title}</h3>
                    <p className="text-gray-600">
                      {property.city}, {property.country}
                    </p>
                    <p className="text-gray-800 font-medium mt-2">
                      From <span className="text-red-500">{property.price}</span>/week
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-yellow-600 text-sm font-semibold">
                        <FaStar className="mr-1" />
                        {property.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="custom-prev absolute top-1/2 transform -translate-y-1/2 left-4 xl:-left-12 bg-white text-gray-800 border border-gray-300 shadow-md rounded-full p-3 hover:bg-gray-100 transition z-10">
            <FiChevronLeft size={16} />
          </button>
          <button className="custom-next absolute top-1/2 transform -translate-y-1/2 right-4 xl:-right-12 bg-white text-gray-800 border border-gray-300 shadow-md rounded-full p-3 hover:bg-gray-100 transition z-10">
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetProperties;