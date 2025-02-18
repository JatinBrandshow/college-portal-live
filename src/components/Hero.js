"use client";
import { Search, Sliders, Home, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { API_NODE_URL, API_KEY } from "../../config/config";

const images = [
  "image/hero/img5.jpg",
  "image/hero/img6.jpg",
  "image/hero/img7.jpg",
  "image/hero/img8.webp",
];


const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("college");
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [accommodationOptions, setAccommodationOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);



  // Fetch Colleges API
  const fetchColleges = async () => {
    try {
      const response = await fetch(
        `${API_NODE_URL}college/all-colleges`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCollegeOptions(data);
      }
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
    }
  };

  // Fetch Accommodations API
  const fetchAccommodations = async () => {
    try {
      const response = await fetch(
        `${API_NODE_URL}accommodation/all-accommodations`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAccommodationOptions(data);
      }
    } catch (error) {
      console.error("Failed to fetch accommodations:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab === "college") {
      fetchColleges();
    } else if (activeTab === "accommodation") {
      fetchAccommodations();
    }
  }, [activeTab]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  

  return (
    <div className="relative min-h-[85vh] flex flex-col md:flex-row items-center px-4 md:px-0 bg-sky-50">
      {/* Left Section */}
      <div className="items-center justify-center sm:pl-5 lg:pl-10 xl:pl-32 2xl:pl-80 w-full md:w-1/2 md:mb-20">
        <div className="mb-6 md:text-left pt-8 md:pt-0">
          {/* Typewriter Effect */}
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-3">
            <span className="text-violet-600">
              <Typewriter
                words={["Welcome to", "Find Your Path at"]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
            <br /> AdmiStay
          </h1>
          <p className="text-gray-600 pe-8">
            Discover endless opportunities and resources to make your academic journey extraordinary.
          </p>
          <p className="text-gray-800 mt-2 font-semibold">
            Connect, learn, and grow with us.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap md:flex-nowrap md:space-x-1 md:justify-start">
          <button
            className={`px-8 py-5 font-bold text-sm rounded-lg ${
              activeTab === "college"
                ? "bg-violet-600 text-white"
                : "bg-gray-200 text-black hover:bg-violet-600 hover:text-white"
            }`}
            onClick={() => setActiveTab("college")}
          >
            COLLEGE
          </button>
          <button
            className={`px-8 py-5 font-bold text-sm rounded-lg ${
              activeTab === "accommodation"
                ? "bg-violet-600 text-white"
                : "bg-gray-200 text-black hover:bg-violet-600 hover:text-white"
            }`}
            onClick={() => setActiveTab("accommodation")}
          >
            ACCOMMODATIONS
          </button>
        </div>

        {/* Search Fields */}
        <div className="flex flex-col md:absolute md:pr-5 z-20 xl:w-2/3">
          {activeTab === "college" && (
            <div>
              <div className="flex flex-col md:items-center md:flex-row gap-3 md:gap-10 bg-white py-5 lg:px-5 px-2 rounded-2xl shadow-sm">
                <div className="flex flex-col md:w-1/5 border-b md:border-b-0 md:border-r lg:px-2 px-1 pb-2 md:pb-0">
                  <label className="text-gray-400 text-sm">Type</label>
                  <select className="text-black outline-none rounded-xl w-full">
                    <option>All</option>
                    {Array.isArray(collegeOptions) && collegeOptions.map(college => (
                      <option key={index}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full md:w-1/5 border-b md:border-b-0 md:border-r lg:px-2 px-1 pb-2 md:pb-0">
                  <label className="text-gray-400 text-sm">Location</label>
                  <input
                    type="text"
                    placeholder="Search Location"
                    className="outline-none text-black rounded-xl w-full"
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/5 lg:px-2">
                  <label className="text-gray-400 text-sm">Keyword</label>
                  <input
                    type="text"
                    placeholder="Search Keyword"
                    className="outline-none text-black rounded-xl w-full"
                  />
                </div>
                <div className="gap-3 flex md:justify-start">
                  <button className="flex items-center border border-violet-600 h-12 py-1 space-x-2 px-2 sm:px-5 bg-white hover:bg-violet-600 hover:text-white text-black font-semibold rounded-3xl"
                    onClick={openModal}>
                    <span>Advanced</span>
                    <Sliders className="w-5 h-5" />
                  </button>
                  <button className="flex items-center border space-x-2 h-12 sm:px-3 px-3 md:px-5 py-2 border-violet-600 bg-violet-600 text-white rounded-3xl">
                    <span>Search</span>
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-2 ml-2 lg:flex items-center">
                            <p className="text-base ml-4 lg:ml-0">Which courses are you looking for?</p>
                            <div className="flex gap-2 lg:gap-1 xl:gap-2 overflow-x-auto scrollbar-hide pr-16">
                                {[{ icon: Home, label: "Engineering" }, { icon: Briefcase, label: "Medical" }].map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 lg:gap-1 xl:gap-2 p-2 lg:p-0 xl:p-2 rounded-lg">
                                        <item.icon className="w-4 h-4 text-blue-700" />
                                        <p className="text-base whitespace-nowrap">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
            </div>
          )}

          {activeTab === "accommodation" && (
            <div>
              <div className="flex flex-col md:items-center md:flex-row gap-3 md:gap-10 bg-white py-5 lg:px-5 px-2 rounded-2xl shadow-sm">
                <div className="flex flex-col md:w-1/5 border-b md:border-b-0 md:border-r lg:px-2 px-1 pb-2 md:pb-0">
                  <label className="text-gray-400 text-sm">Type</label>
                  <select className="text-black outline-none rounded-xl w-full">
                    <option>All</option>
                    {Array.isArray(accommodationOptions) && accommodationOptions.map(accommodation => (
                      <option key={index}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full md:w-1/5 border-b md:border-b-0 md:border-r lg:px-2 px-1 pb-2 md:pb-0">
                  <label className="text-gray-400 text-sm">Location</label>
                  <input
                    type="text"
                    placeholder="Search Location"
                    className="outline-none text-black rounded-xl w-full"
                  />
                </div>
                <div className="flex flex-col w-full md:w-1/5 lg:px-2">
                  <label className="text-gray-400 text-sm">Budget</label>
                  <input
                    type="text"
                    placeholder="Enter Budget"
                    className="outline-none text-black rounded-xl w-full"
                  />
                </div>
                <div className="gap-3 flex md:justify-start">
                  <button
                    className="flex items-center border border-violet-600 h-12 py-1 space-x-2 px-2 sm:px-5 bg-white hover:bg-violet-600 hover:text-white text-black font-semibold rounded-3xl"
                    onClick={openModal}
                  >
                    <span>Advanced</span>
                    <Sliders className="w-5 h-5" />
                  </button>
                  <button className="flex items-center border space-x-2 h-12 sm:px-3 px-3 md:px-5 py-2 border-violet-600 bg-violet-600 text-white rounded-3xl">
                    <span>Search</span>
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-2 ml-2 lg:flex items-center">
                            <p className="text-base ml-4 lg:ml-0">What are you looking for:</p>
                            <div className="flex gap-2 lg:gap-1 xl:gap-2 overflow-x-auto scrollbar-hide pr-16">
                                {[{ icon: Home, label: "House" }, { icon: Briefcase, label: "Accommodation" }].map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 lg:gap-1 xl:gap-2 p-2 lg:p-0 xl:p-2 rounded-lg">
                                        <item.icon className="w-4 h-4 text-blue-700" />
                                        <p className="text-base whitespace-nowrap">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Image Slider */}
      <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full z-10 overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="House"
            className={`w-full h-full object-cover absolute transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      {/* Modal for Advanced Filters */}
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-2xl max-h-[600px] overflow-y-auto no-scrollbar">
            <h2 className="text-xl font-bold mb-4">Advanced Filters</h2>
            {activeTab === "college" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Location:</label>
                  <select className="w-full p-2 border rounded">
                    <option>City/State Selection</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Admission Criteria:</label>
                  <select className="w-full p-2 border rounded">
                    <option>Entrance Exam Based (JEE, NEET, CAT, etc.)</option>
                    <option>Merit-Based</option>
                    <option>Direct Admission</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Fees Range:</label>
                  <select className="w-full p-2 border rounded">
                    <option>Less than ₹50,000</option>
                    <option>₹50,000 - ₹1,00,000</option>
                    <option>₹1,00,000 - ₹5,00,000</option>
                    <option>More than ₹5,00,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Facilities & Infrastructure:</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Hostel Availability
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Library & Labs
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Sports Complex
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Wi-Fi Campus
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Placement Support
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">Placement & Packages:</label>
                  <select className="w-full p-2 border rounded">
                    <option>Highest Package Offered</option>
                    <option>Average Package</option>
                    <option>Top Recruiters</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Scholarship & Financial Aid:</label>
                  <select className="w-full p-2 border rounded">
                    <option>Merit-Based Scholarships</option>
                    <option>Need-Based Scholarships</option>
                    <option>Government Scholarships</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">College Ranking & Reviews:</label>
                  <select className="w-full p-2 border rounded">
                    <option>NIRF Ranking</option>
                    <option>Student Ratings</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Courses Offered:</label>
                  <select className="w-full p-2 border rounded">
                    <option>Engineering (B.Tech, M.Tech, etc.)</option>
                    <option>Management (MBA, BBA, etc.)</option>
                    <option>Medical (MBBS, BDS, Nursing, etc.)</option>
                    <option>Law (LLB, LLM)</option>
                    <option>Arts & Humanities</option>
                    <option>Science & Technology</option>
                    <option>Commerce & Finance</option>
                    <option>Diploma Courses</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">College Type:</label>
                  <select className="w-full p-2 border rounded">
                    <option>Private</option>
                    <option>Government</option>
                    <option>Deemed University</option>
                    <option>Autonomous</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === "accommodation" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Location:</label>
                  <select className="w-full p-2 border rounded">
                    <option>City/State Selection</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Facilities & Infrastructure:</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Rating
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      Room Types
                    </label>
                  </div>
                </div>
              </div>
            )}

<div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={closeModal}
                >
                  Close
                </button>
                <button
                  className="ml-2 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
                  onClick={() => {
                    // Handle the apply filters logic here
                    closeModal();
                  }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Hero;
