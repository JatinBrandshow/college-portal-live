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

  const handleCardClick = (id) => {
    router.push(`/pages/${id}`);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}accommodation/all-accommodations`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
        });
  
        const text = await response.text();
        const data = JSON.parse(text);
  
        if (Array.isArray(data.data)) {
          const mappedProperties = data.data.map((item) => ({
            id: item._id,
            title: item.name || "No Name",
            city: item.location.city || "Unknown City",
            country: item.location.country || "Unknown Country",
            price: item.pricing ? `₹${item.pricing.minPrice}` : "N/A", // Use `pricing.minPrice`
            rating: item.reviewsRating || "No Rating", // Use `reviewsRating`
            images: Array.isArray(item.meta.images)
              ? item.meta.images // Use `images` directly
              : [],
            amenities: Array.isArray(item.amenities) ? item.amenities : [], // Map amenities
            description: item.description?.short_description || "No Description", // Map short description
            type: item.type || "Unknown Type", // Map property type
            reviewsCount: item.reviewsCount || 0, // Map reviews count
            featuredImagePath: item.featuredImagePath || "", // Map featured image
          }));
  
          setProperties(mappedProperties);
        } else {
          console.error("Unexpected API response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
  
    fetchProperties();
  }, []);
  

  // Get unique cities dynamically from API data
  const cities = ["All", ...new Set(properties.map((prop) => prop.city))];

  const filteredProperties = filter === "All" ? properties : properties.filter((prop) => prop.city === filter);

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading and Subheading */}
        <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 text-left">Budget Properties by Cities </h2>
          <p className="text-gray-600 mt-2 text-left">
            From studios to private rooms to shared apartments, we’ve got it all.
          </p>
        </div>

        {/* Filter Buttons (Dynamic from API) */}
        <div className="flex justify-left space-x-4 mb-8 overflow-x-auto">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setFilter(city)}
              className={`px-4 py-2 rounded-full border ${
                filter === city ? "bg-[#5e23dd] text-white border-[#5e23dd]" : "bg-white text-gray-700 border-gray-300"
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
            {filteredProperties.map((property) => (
              <SwiperSlide key={property.id}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
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
