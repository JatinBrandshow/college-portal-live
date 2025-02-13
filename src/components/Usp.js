'use client';

import Image from 'next/image';
import { FaCheckCircle, FaHeadset, FaTag, FaPassport, FaShieldAlt } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const features = [
  { icon: <FaHeadset className="text-green-500 text-xl" />, title: "24x7 Personal Assistance", description: "We offer 24*7 expert support in resolving all your housing-related queries, providing peace !", bgColor: "bg-green-50" },
  { icon: <FaTag className="text-orange-500 text-xl" />, title: "Price Match Guarantee", description: "If you find a lower price for any place on another platform, we'll match it when you book.", bgColor: "bg-orange-50" },
  { icon: <FaPassport className="text-red-500 text-xl" />, title: "No Visa, No Pay", description: "If you are unable to obtain a visa, you can cancel your booking at no cost.", bgColor: "bg-red-50" },
  { icon: <FaShieldAlt className="text-yellow-500 text-xl" />, title: "Verified Listings", description: "All our properties are verified, which guarantees a seamless booking experience.", bgColor: "bg-yellow-50" }
];

export default function HeroSection() {
  return (
    <>
    <div className=" p-6 md:p-12 bg-gray-50 max-w-[1500px] mx-auto">
    <h1 className="text-5xl font-bold mb-2 md:px-12">USP</h1>
    <p className="text-md mb-2 text-gray-500 md:px-12">Hassle-Free Booking – Secure Your Perfect Student Home in <span className="font-semibold"> Just a Few Clicks! </span></p>
      {/* Left Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center relative md:p-10">
      <div className="relative z-10 shadow-lg h-full px-4 py-10 bg-white rounded-lg pl-10 border border-gray-200">
        <h1 className="text-2xl md:text-3xl font-bold font-sans text-gray-900">Where every student feels <br/> at home!</h1>
        <p className="text-gray-600 mt-4">Get personalised options with your preferences <br/> in just a few clicks.</p>
        
        <div className="flex items-center mt-4 text-[#8070dd] font-medium">
          <FaCheckCircle className="mr-2" /> Upto £200 Cashback
        </div>
        
        <button className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-400 text-white rounded-lg font-semibold shadow-lg w-auto md:w-48">
          Find My Home
        </button>
        
        <div className="mt-8 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
          <div className="text-center border-b md:border-b-0 md:border-r border-gray-300 pb-6 md:pb-0 md:pe-8">
          <h2 className="text-3xl font-bold">10+</h2>
          <p className="text-gray-500 text-md">Countries</p>
        </div>
        <div className="text-center border-b md:border-b-0 md:border-r border-gray-300 pb-6 md:pb-0 md:pe-8">
          <h2 className="text-3xl font-bold">1.5M+</h2>
          <p className="text-gray-500 text-md">Beds</p>
        </div>
        <div className="text-center pb-6 md:pb-0">
          <h2 className="text-3xl font-bold">10K+</h2>
          <p className="text-gray-500 text-md">Properties</p>
        </div>
      </div>

      {/* Student Image */}
      <div className="relative md:absolute right-0 top-0 w-32 md:w-40 lg:w-60 xl:w-72">
        <Image src="/image/homepage/banner.png" alt="Student" width={200} height={200} className="w-full" />
      </div>
      <div className="absolute right-0 bottom-0 w-32 md:w-40 lg:w-60 xl:w-72">
        <Image src="/image/homepage/student.png" alt="Student" width={300} height={300} className="w-full" />
      </div>
      
      </div>
      
      
      {/* Right Column */}
      {/* Right Column - Static for md and above, Swiper for sm */}
      <div className="hidden md:block space-y-0 border border-gray-200 rounded-lg">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start px-4 py-8 bg-white shadow-xl rounded-lg h-full border border-gray-200">
            <div className={`p-4 rounded-full ${feature.bgColor} my-auto`}>{feature.icon}</div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-semibold text-black">{feature.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Swiper Slider for sm view */}
      <div className="md:hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="pb-8"
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-start px-4 py-8 bg-white shadow-xl rounded-lg h-full border border-gray-200">
                <div className={`p-4 rounded-full ${feature.bgColor} my-auto`}>{feature.icon}</div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-semibold text-black">{feature.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{feature.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    </div>
  </>
  );
}
