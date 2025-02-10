import React, { useRef } from "react";
import { FaSchool, FaBusinessTime, FaBalanceScale, FaPaintBrush, FaHeartbeat, FaArrowRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const studyGoals = [
  { icon: <FaSchool size={30} />, title: "Engineering", colleges: "6259 Colleges", branches: ["BE/B.Tech", "Diploma in Engineering", "ME/M.Tech"] },
  { icon: <FaBusinessTime size={30} />, title: "Management", colleges: "7754 Colleges", branches: ["MBA/PGDM", "BBA/BMS", "Executive MBA"] },
  { icon: <FaBalanceScale size={30} />, title: "Commerce", colleges: "4979 Colleges", branches: ["B.Com", "M.Com"] },
  { icon: <FaPaintBrush size={30} />, title: "Arts", colleges: "5617 Colleges", branches: ["BA", "MA", "BFA", "BSW"] },
  { icon: <FaHeartbeat size={30} />, title: "Medical", colleges: "4587 Colleges", branches: ["MBBS", "BDS", "BAMS"] },
  { title: "See All" },
];

const StudyGoal = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust this value for smooth scrolling
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white py-12 relative">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-left text-gray-700">Select Your Study Goal</h2>

        <div className="relative">
          {/* Scrollable Container */}
          <div ref={scrollRef} className="flex space-x-6 overflow-x-auto no-scrollbar scroll-smooth">
            {studyGoals.map((goal, index) => (
              <div key={index} className="min-w-[250px] md:min-w-[280px] lg:min-w-[320px] flex-shrink-0">
                <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow h-72 flex flex-col justify-between border-2 border-gray-300">
                  {goal.title === "See All" ? (
                    <button className="flex justify-center items-center h-full text-orange-500 font-semibold text-lg underline">
                      {goal.title} <FaArrowRight className="ml-2 rounded-full border-2 border-orange-500" />
                    </button>
                  ) : (
                    <>
                      <div className="flex items-start">
                        {goal.icon && (
                          <div className="w-16 h-16 bg-white border-2 border-gray-400 rounded-full flex items-center justify-center text-sky-400">
                            {goal.icon}
                          </div>
                        )}
                        <div className="ml-4 text-left">
                          <h3 className="text-xl font-semibold">{goal.title}</h3>
                          <p className="text-gray-500">{goal.colleges}</p>
                        </div>
                      </div>
                      {goal.branches && (
                        <ul className="mt-4 border-t pt-4 text-gray-700">
                          {goal.branches.map((branch, idx) => (
                            <li key={idx} className={`hover:underline hover:text-sky-600 cursor-pointer ${idx !== goal.branches.length - 1 ? "border-b" : ""} py-2`}>
                              {branch}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 xl:-left-12 top-1/2 -translate-y-1/2 bg-white text-gray-800 border border-gray-300 shadow-md rounded-full p-3 hover:bg-gray-100 transition z-10"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-gray-800 border border-gray-300 shadow-md rounded-full p-3 hover:bg-gray-100 transition z-10"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyGoal;
