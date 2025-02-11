import React from "react";
import { FaHome, FaBuilding, FaHouseUser, FaWarehouse, FaHotel } from "react-icons/fa";

const propertyTypes = [
  {
    icon: <FaHouseUser size={60} className="text-red-500" />,
    title: "Multifamily Homes",
    properties: "13 Properties",
    number: 13,
  },
  {
    icon: <FaBuilding size={60} className="text-red-500" />,
    title: "Duplex Homes",
    properties: "15 Properties",
    number: 15,
  },
  {
    icon: <FaWarehouse size={60} className="text-red-500" />,
    title: "Commercial House",
    properties: "16 Properties",
    number: 16,
  },
  {
    icon: <FaHotel size={60} className="text-red-500" />,
    title: "Sweet Apartments",
    properties: "12 Properties",
    number: 12,
  },
];

const PropertyType = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10">
          {/* Left Section */}
          <div className="lg:w-1/2">
            <div className="flex items-center text-red-500 space-x-2">
              <FaHome size={24} />
              <span className="uppercase font-semibold text-sm tracking-wider">Trusted Real Estate Care</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Property By Type</h2>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2 mt-6 lg:mt-0">
            <p className="text-gray-600 leading-relaxed">
              Our company provides a full range of services for the construction of private houses and cottages
              since 19XX.
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {propertyTypes.map((property, index) => (
            <div key={index} className="flex flex-col items-center">
            {/* Card */}
            <div
                className="relative bg-white shadow-lg rounded-lg p-6 flex items-center justify-center text-center w-24 h-24 sm:w-28 sm:h-28 lg:w-52 lg:h-40 transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
                {/* Number Badge */}
                <div className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold transition-transform transform hover:scale-125 hover:bg-red-600">
                {property.number}
                </div>
                {/* Icon */}
                <div className="text-gray-800 ">{property.icon}</div>
            </div>
            {/* Title and Properties */}
            <h3 className="text-xs md:text-lg font-semibold text-gray-800 mt-4 text-center">
                {property.title}
            </h3>
            <p className="text-red-700 text-xs md:text-md text-center">{property.properties}</p>
            </div>
        ))}
        </div>


      </div>
    </div>
  );
};

export default PropertyType;
