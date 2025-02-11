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
    { "img": "image/homepage/iit.webp", "text": "Indian Institute of Technology Kanpur" },
    { "img": "image/homepage/bhu.webp", "text": "Indian Institute of Technology (BHU) Varanasi" },
    { "img": "image/homepage/iit.webp", "text": "Amity University, Noida" },
    { "img": "image/homepage/bhu.webp", "text": "Indian Institute of Information Technology Allahabad" },
    { "img": "image/homepage/iit.webp", "text": "Motilal Nehru National Institute of Technology Allahabad" },
    { "img": "image/homepage/bhu.webp", "text": "Aligarh Muslim University, Aligarh" },
    { "img": "image/homepage/iit.webp", "text": "Banaras Hindu University, Varanasi" },
    { "img": "image/homepage/bhu.webp", "text": "JSS Academy of Technical Education, Noida" },
    { "img": "/galgotias_university.jpg", "text": "Galgotias University, Greater Noida" },
    { "img": "/sharda_university.jpg", "text": "Sharda University, Greater Noida" },
    { "img": "/jaypee_noida.jpg", "text": "Jaypee Institute of Information Technology, Noida" },
    { "img": "/abviiitm_gwalior.jpg", "text": "Atal Bihari Vajpayee Indian Institute of Information Technology and Management, Gwalior" },
    { "img": "/hbtui_kanpur.jpg", "text": "Harcourt Butler Technical University, Kanpur" },
    { "img": "/iet_lucknow.jpg", "text": "Institute of Engineering and Technology, Lucknow" },
    { "img": "/knit_sultanpur.jpg", "text": "Kamla Nehru Institute of Technology, Sultanpur" },
    { "img": "/bundelkhand_university.jpg", "text": "Bundelkhand University, Jhansi" }
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

export default function PopularColleges() {
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
    <div className="max-w-[1500px] mx-auto py-6 px-6 my-10 relative">
      <h2 className="text-2xl font-bold mb-2">Popular Colleges/Universities Across India</h2>
      <p className="text-gray-600">Book student Colleges near top cities around India.</p>

      {/* Tab Buttons */}
      <div className="flex gap-3 overflow-x-auto mt-8 max-w-7xl ">
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
        <div ref={scrollRef} className="overflow-x-auto scroll-smooth w-full px-0 relative no-scrollbar ">
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
                  <div className="absolute flex items-end p-2 bottom-0">
                    <p className="text-white bg-opacity-20 bg-black font-semibold mx-auto ">{item.text}</p>
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
                  <div className="absolute flex items-end p-2 bottom-0">
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