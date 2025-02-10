'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    { img: '/image/homepage/up/agra.webp', text: 'Agra' },
    { img: '/image/homepage/up/ayodhya.webp', text: 'Ayodhya' },
    { img: '/image/homepage/up/banda.webp', text: 'Banda' },
    { img: '/image/homepage/up/delhi.webp', text: 'Delhi' },
    { img: '/image/homepage/up/firozabad.webp', text: 'Firozabad' },
    { img: '/image/homepage/up/jhansi.webp', text: 'Jhansi' },
    { img: '/image/homepage/up/kanpur-city.webp', text: 'Kanpur' },
    { img: '/image/homepage/up/noida.webp', text: 'Noida' },
    { img: '/image/homepage/up/pryagraj.webp', text: 'Pryagraj' },
    { img: '/image/homepage/up/unnao.webp', text: 'Unnao' },
    { img: '/image/homepage/up/varanasi.webp', text: 'Varanasi' },
  ],
  wb: [
    { img: '/image/homepage/up/agra.webp', text: 'Sydney' },
    { img: '/image/homepage/up/agra.webp', text: 'Melbourne' },
    { img: '/image/homepage/up/agra.webp', text: 'Brisbane' },
    { img: '/image/homepage/up/agra.webp', text: 'Perth' },
    { img: '/image/homepage/up/agra.webp', text: 'Sydney' },
    { img: '/image/homepage/up/agra.webp', text: 'Melbourne' },
    { img: '/image/homepage/up/agra.webp', text: 'Brisbane' },
    { img: '/image/homepage/up/agra.webp', text: 'Perth' },
    { img: '/image/homepage/up/agra.webp', text: 'Sydney' },
    { img: '/image/homepage/up/agra.webp', text: 'Melbourne' },
    { img: '/image/homepage/up/agra.webp', text: 'Brisbane' },
    { img: '/image/homepage/up/agra.webp', text: 'Perth' },
    { img: '/image/homepage/up/agra.webp', text: 'Sydney' },
    { img: '/image/homepage/up/agra.webp', text: 'Melbourne' },
    { img: '/image/homepage/up/agra.webp', text: 'Brisbane' },
  ],
  gj: [
    { img: '/image/homepage/up/agra.webp', text: 'Dublin' },
    { img: '/image/homepage/up/agra.webp', text: 'Cork' },
    { img: '/image/homepage/up/agra.webp', text: 'Brisbane' },
    { img: '/image/homepage/up/agra.webp', text: 'Perth' },
    { img: '/image/homepage/up/agra.webp', text: 'Sydney' },
    { img: '/image/homepage/up/agra.webp', text: 'Melbourne' },
    { img: '/image/homepage/up/agra.webp', text: 'Brisbane' },
  ],
  rj: [
    { img: '/newyork.jpg', text: 'New York' },
    { img: '/losangeles.jpg', text: 'Los Angeles' },
    { img: '/chicago.jpg', text: 'Chicago' },
    { img: '/dublin.jpg', text: 'Dublin' },
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
    { img: '/chicago.jpg', text: 'Chicago' }
  ],
  as: [
    { img: '/madrid.jpg', text: 'Madrid' },
    { img: '/barcelona.jpg', text: 'Barcelona' }
  ]
};

export default function PopularCities() {
  const [activeTab, setActiveTab] = useState('up');
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setShowLeftButton(scrollRef.current.scrollLeft > 0);
        setShowRightButton(
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth <
          scrollRef.current.scrollWidth
        );
      }
    };
    handleScroll();
    scrollRef.current?.addEventListener('scroll', handleScroll);
    return () => scrollRef.current?.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 170; // Adjust scroll distance
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const firstRowCount = Math.min(9, Math.ceil(data[activeTab]?.length / 2));
  const firstRow = data[activeTab]?.slice(0, firstRowCount);
  const secondRow = data[activeTab]?.slice(firstRowCount);

  return (
    <div className="py-6 px-12 my-10 relative">
      <h2 className="text-2xl font-bold mb-2">Popular Cities Across India</h2>
      <p className="text-gray-600">Book student accommodations near top cities and universities around India.</p>

      {/* Tab Buttons */}
      <div className="flex gap-3 overflow-x-auto mt-8 max-w-7xl">
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

      {/* Scrollable Cities Section */}
      <div className="mt-6 relative">
        {/* Left Scroll Button */}
        {showLeftButton && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:bg-red-500 hover:text-white transition"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Scrollable Content */}
        <div ref={scrollRef} className="overflow-x-auto scroll-smooth w-full px-10 relative no-scrollbar">
          <div className="flex flex-col gap-4 w-max">
            {/* First Row */}
            <div className="flex gap-4">
              {firstRow.map((item, index) => (
                <div
                  key={index}
                  className="relative w-40 h-40 min-w-[10rem] sm:min-w-[9rem] md:min-w-[10rem] lg:min-w-[11rem] rounded-lg overflow-hidden cursor-pointer"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110 bg-gray-400"
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></div>
                  {/* Overlay Text */}
                  <div className="absolute flex items-end p-2 bottom-0 left-1/2 -translate-x-1/2">
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
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110 bg-gray-400"
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></div>
                  {/* Overlay Text */}
                  <div className="absolute flex items-end p-2 bottom-0 left-1/2 -translate-x-1/2">
                    <p className="text-white font-semibold mx-auto">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Scroll Button */}
        {showRightButton && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:bg-red-500 hover:text-white transition"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}