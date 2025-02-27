"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleAvailableTypeClick = (roomType) => {
    router.push(`/accommodation?roomType=${roomType}`);
  };

  return (
    <div className="bg-gray-50 py-12 max-lg:py-10 max-md:py-8 max-sm:py-6">
      <div className="max-w-7xl mx-auto px-6 max-md:px-4 max-sm:px-2">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 max-md:mb-8 max-sm:mb-6">
          <div className="lg:w-1/2">
            <div className="flex items-center text-[#5e23dd] space-x-2">
              <FaHouseUser size={24} className="max-sm:w-4 max-sm:h-4"/>
              <span className="uppercase font-semibold text-sm tracking-wider max-sm:text-xs">
                Trusted Real Estate Care
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-2 max-md:text-2xl
            max-sm:text-xl">Property By Type</h2>
            <p className="text-base text-gray-600 mt-2 text-left max-sm:text-sm">
              Different Stays for Different Needs –{" "}
              <span className="font-semibold">Pick What Suits You</span>!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2 max-sm:grid-cols-2 max-lg:gap-5 max-md:gap-4 max-sm:gap-3">
          {propertyTypes.map((property, index) => (
            <div key={index} className="flex flex-col items-center max-sm:w-full">
              <div
                onClick={() => handleAvailableTypeClick(property.availableType)}
                className="relative bg-white shadow-lg rounded-lg p-6 flex items-center justify-center text-center w-72 h-60 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer max-lg:p-5 max-md:p-4 max-sm:p-3 max-xl:w-56 max-xl:h-56 max-lg:w-36 max-lg:h-36 max-md:w-48 max-md:h-48 max-sm:w-32 max-sm:h-32"
              >
                <div className="absolute top-2 right-2 bg-[#5e23dd] text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold transition-transform transform hover:scale-125 hover:bg-red-600 max-md:w-5 max-md:h-5 max-sm:w-4 max-sm:h-4">
                  {property.properties}
                </div>
                <div className="text-gray-800">{property.icon}</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center max-md:text-base max-sm:text-sm">
                {property.title}
              </h3>
              <p className="text-violet-700 text-base text-center max-md:text-sm max-sm:text-xs">
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
