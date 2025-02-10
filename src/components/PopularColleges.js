'use client';
import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const tabs = [
  { name: 'Uttar Pradesh', key: 'up' },
  { name: 'West Bengal', key: 'wb' },
  { name: 'Gujarat', key: 'gj' },
  { name: 'Rajasthan', key: 'rj' },
  { name: 'kerala', key: 'kr' },
  { name: 'Madhya Pradesh', key: 'mp' },
  { name: 'Assam', key: 'as' }
];

const data = {
  up: [
    { img: '/liverpool.jpg', text: 'Liverpool' },
    { img: '/sheffield.jpg', text: 'Sheffield' },
    { img: '/newcastle.jpg', text: 'Newcastle Upon Tyne' },
    { img: '/cardiff.jpg', text: 'Cardiff' },
    { img: '/edinburgh.jpg', text: 'Edinburgh' },
    { img: '/plymouth.jpg', text: 'Plymouth' },
    { img: '/chester.jpg', text: 'Chester' },
    { img: '/exeter.jpg', text: 'Exeter' },
    { img: '/edinburgh.jpg', text: 'Edinburgh' },
    { img: '/plymouth.jpg', text: 'Plymouth' },
    { img: '/chester.jpg', text: 'Chester' },
    { img: '/chester.jpg', text: 'Chester' },
    { img: '/exeter.jpg', text: 'Exeter' },
    { img: '/edinburgh.jpg', text: 'Edinburgh' },
    { img: '/plymouth.jpg', text: 'Plymouth' },
    { img: '/chester.jpg', text: 'Chester' },
  ],
  wb: [
    { img: '/sydney.jpg', text: 'Sydney' },
    { img: '/melbourne.jpg', text: 'Melbourne' },
    { img: '/brisbane.jpg', text: 'Brisbane' },
    { img: '/perth.jpg', text: 'Perth' },
    { img: '/sydney.jpg', text: 'Sydney' },
    { img: '/melbourne.jpg', text: 'Melbourne' },
    { img: '/brisbane.jpg', text: 'Brisbane' },
    { img: '/perth.jpg', text: 'Perth' },
    { img: '/sydney.jpg', text: 'Sydney' },
    { img: '/melbourne.jpg', text: 'Melbourne' },
    { img: '/brisbane.jpg', text: 'Brisbane' },
    { img: '/perth.jpg', text: 'Perth' },
  ],
  gj: [
    { img: '/dublin.jpg', text: 'Dublin' },
    { img: '/cork.jpg', text: 'Cork' },
    { img: '/brisbane.jpg', text: 'Brisbane' },
    { img: '/perth.jpg', text: 'Perth' },
    { img: '/sydney.jpg', text: 'Sydney' },
    { img: '/melbourne.jpg', text: 'Melbourne' },
    { img: '/brisbane.jpg', text: 'Brisbane' },
    { img: '/melbourne.jpg', text: 'Melbourne' },
    { img: '/brisbane.jpg', text: 'Brisbane' },
  ],
  rj: [
    { img: '/newyork.jpg', text: 'New York' },
    { img: '/losangeles.jpg', text: 'Los Angeles' },
    { img: '/chicago.jpg', text: 'Chicago' },
    { img: '/dublin.jpg', text: 'Dublin' },
    { img: '/cork.jpg', text: 'Cork' },
    { img: '/brisbane.jpg', text: 'Brisbane' },
    { img: '/perth.jpg', text: 'Perth' },
    { img: '/cork.jpg', text: 'Cork' },
    { img: '/brisbane.jpg', text: 'Brisbane' },
    { img: '/perth.jpg', text: 'Perth' },
  ],
  kr: [
    { img: '/toronto.jpg', text: 'Toronto' },
    { img: '/vancouver.jpg', text: 'Vancouver' },
    { img: '/newyork.jpg', text: 'New York' },
    { img: '/losangeles.jpg', text: 'Los Angeles' },
    { img: '/chicago.jpg', text: 'Chicago' }
  ],
  mp: [
    { img: '/berlin.jpg', text: 'Berlin' },
    { img: '/munich.jpg', text: 'Munich' },
    { img: '/vancouver.jpg', text: 'Vancouver' },
    { img: '/newyork.jpg', text: 'New York' },
    { img: '/losangeles.jpg', text: 'Los Angeles' },
    { img: '/chicago.jpg', text: 'Chicago' },
    { img: '/newyork.jpg', text: 'New York' },
    { img: '/losangeles.jpg', text: 'Los Angeles' },
  ],
  as: [
    { img: '/madrid.jpg', text: 'Madrid' },
    { img: '/barcelona.jpg', text: 'Barcelona' },
    { img: '/madrid.jpg', text: 'Madrid' },
    { img: '/barcelona.jpg', text: 'Barcelona' }
  ]
};

export default function PopularCities() {
  const [activeTab, setActiveTab] = useState('up');

  const firstRowCount = Math.min(9, Math.ceil(data[activeTab]?.length / 2));
const firstRow = data[activeTab]?.slice(0, firstRowCount);
const secondRow = data[activeTab]?.slice(firstRowCount);


  return (
    <div className="py-6 px-12 my-10">
      <h2 className="text-2xl font-bold mb-2">Popular Colleges/Universities Across India</h2>
      <p className="text-gray-600">Book student Colleges near top cities around India.</p>

      <div className="flex gap-3 overflow-x-auto mt-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={clsx(
              'px-4 py-2 border rounded-full transition-all',
              activeTab === tab.key ? 'border-red-500 text-red-500' : 'border-gray-300'
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div
  className="mt-6 overflow-x-auto relative"
  style={{
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE & Edge
  }}
>
  {/* Hide scrollbar for Chrome, Safari */}
  <style>
    {`
      ::-webkit-scrollbar {
        display: none;
      }
    `}
  </style>

  {/* Scrollable container */}
  <div className="flex flex-col gap-4 w-max">
    
    {/* First Row */}
    <div className="flex gap-4">
      {firstRow.map((item, index) => (
        <div
          key={index}
          className="relative w-40 h-40 min-w-[10rem] sm:min-w-[9rem] md:min-w-[10rem] lg:min-w-[11rem] rounded-lg overflow-hidden cursor-pointer"
        >
          {/* Background zoom effect */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
            style={{
              backgroundImage: `url(${item.img})`,
            }}
          ></div>

          {/* Overlay text */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2">
            <p className="text-white font-semibold mx-auto">{item.text}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Second Row */}
    <div className="flex gap-4">
      {secondRow.map((item, index) => (
        <div
          key={index}
          className="relative w-40 h-40 min-w-[10rem] sm:min-w-[9rem] md:min-w-[10rem] lg:min-w-[11rem] rounded-lg overflow-hidden cursor-pointer"
        >
          {/* Background zoom effect */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
            style={{
              backgroundImage: `url(${item.img})`,
            }}
          ></div>

          {/* Overlay text */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2">
            <p className="text-white font-semibold mx-auto">{item.text}</p>
          </div>
        </div>
      ))}
    </div>

  </div>
</div>

    </div>
  );
}
