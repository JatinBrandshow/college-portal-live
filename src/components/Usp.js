'use client';

import Image from 'next/image';
import { FaCheckCircle, FaHeadset, FaTag, FaPassport, FaShieldAlt } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <>
    <div className=" p-6 md:p-12 ">
    <h1 className="text-5xl font-bold mb-2">USP</h1>
    <p className="text-md mb-12 text-gray-500">Empowering students with a seamless college experience – from admissions to <br/> academics, all in one smart portal!</p>
      {/* Left Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center relative">
      <div className="relative z-10 shadow-lg h-full px-4 py-10 bg-gray-50">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Where every student feels <br/> at home!</h1>
        <p className="text-gray-600 mt-4">Get personalised options with your preferences <br/> in just a few clicks.</p>
        
        <div className="flex items-center mt-4 text-green-600 font-medium">
          <FaCheckCircle className="mr-2" /> Upto £200 Cashback
        </div>
        
        <button className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold shadow-lg w-48">
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
      <div className="absolute right-0 bottom-0 w-32 md:w-40 lg:w-60 xl:w-72">
        <Image src="/image/homepage/student.png" alt="Student" width={300} height={300} className="w-full" />
      </div>
      </div>
      
      
      {/* Right Column */}
      <div className="space-y-1">
  {features.map((feature, index) => (
    <div key={index} className="flex items-start px-4 py-8 bg-gray-50 shadow-lg rounded-lg h-full">
      <div className={`p-3 rounded-full ${feature.bgColor} my-auto`}>{feature.icon}</div>
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold">{feature.title}</h3>
        <p className="text-gray-500 text-sm mt-1">{feature.description}</p>
      </div>
    </div>
  ))}
</div>
    </div>
    </div>
</>
  );
}
const features = [
  { icon: <FaHeadset className="text-white text-lg" />, title: "24x7 Personal Assistance", description: "We offer 24*7 expert support in resolving all your housing-related queries, providing peace !", bgColor: "bg-green-500" },
  { icon: <FaTag className="text-white text-lg" />, title: "Price Match Guarantee", description: "If you find a lower price for any place on another platform, we'll match it when you book.", bgColor: "bg-yellow-500" },
  { icon: <FaPassport className="text-white text-lg" />, title: "No Visa, No Pay", description: "If you are unable to obtain a visa, you can cancel your booking at no cost.", bgColor: "bg-red-500" },
  { icon: <FaShieldAlt className="text-white text-lg" />, title: "Verified Listings", description: "All our properties are verified, which guarantees a seamless booking experience.", bgColor: "bg-blue-500" }
];