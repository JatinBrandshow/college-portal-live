"use client";

import { useRouter } from "next/navigation"; // Import useRouter hook
import React from "react";
import { FaHouseUser, FaBuilding, FaWarehouse, FaHotel } from "react-icons/fa";

const propertyTypes = [
  {
    icon: <FaHouseUser size={60} className="text-[#8070dd]" />,
    title: "Multifamily Homes",
    properties: "13",
    availableType: "Multifamily",
  },
  {
    icon: <FaBuilding size={60} className="text-[#8070dd]" />,
    title: "Duplex Homes",
    properties: "15",
    availableType: "Duplex",
  },
  {
    icon: <FaWarehouse size={60} className="text-[#8070dd]" />,
    title: "Commercial House",
    properties: "16",
    availableType: "Commercial",
  },
  {
    icon: <FaHotel size={60} className="text-[#8070dd]" />,
    title: "Sweet Apartments",
    properties: "12",
    availableType: "Apartment",
  },
];

const PropertyType = () => {
  const router = useRouter(); // Initialize router for navigation

  // Function to handle the click on a property type and redirect to the accommodation page
  const handleAvailableTypeClick = (roomType) => {
    router.push(`/accommodation?roomType=${roomType}`); // Redirect to the accommodation page with the availableType
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10">
          <div className="lg:w-1/2">
            <div className="flex items-center text-[#5e23dd] space-x-2">
              <FaHouseUser size={24} />
              <span className="uppercase font-semibold text-sm tracking-wider">
                Trusted Real Estate Care
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Property By Type</h2>
            <p className="text-gray-600 mt-2 text-left">
              Different Stays for Different Needs –{" "}
              <span className="font-semibold">Pick What Suits You</span>!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyTypes.map((property, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Clickable container for each property type */}
              <div
                onClick={() => handleAvailableTypeClick(property.availableType)} // Trigger the function on click
                className="relative bg-white shadow-lg rounded-lg p-6 flex items-center justify-center text-center w-24 h-24 sm:w-28 sm:h-28 lg:w-72 lg:h-60 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
              >
                <div className="absolute top-2 right-2 bg-[#5e23dd] text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold transition-transform transform hover:scale-125 hover:bg-red-600">
                  {property.properties}
                </div>
                <div className="text-gray-800">{property.icon}</div>
              </div>
              <h3 className="text-xs md:text-lg font-semibold text-gray-800 mt-4 text-center">
                {property.title}
              </h3>
              <p className="text-violet-700 text-xs md:text-md text-center">
                {property.properties}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyType;
