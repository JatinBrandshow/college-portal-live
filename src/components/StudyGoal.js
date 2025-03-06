import React, { useRef } from "react";
import { FaSchool, FaBusinessTime, FaBalanceScale, FaPaintBrush, FaHeartbeat, FaArrowRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

const studyGoals = [
  { icon: <FaSchool size={30} />, title: "Engineering", colleges: "6259 Colleges", branches: ["B.Tech", "Diploma in Engineering", "M.Tech", "BE"] },
  { icon: <FaBusinessTime size={30} />, title: "Management", colleges: "7754 Colleges", branches: ["MBA", "PGDM", "BBA" ,"BMS"] },
  { icon: <FaBalanceScale size={30} />, title: "Commerce", colleges: "4979 Colleges", branches: ["B.Com", "M.Com"] },
  { icon: <FaPaintBrush size={30} />, title: "Arts", colleges: "5617 Colleges", branches: ["BA", "MA", "BFA", "BSW"] },
  { icon: <FaHeartbeat size={30} />, title: "Medical", colleges: "4587 Colleges", branches: ["MBBS", "BDS", "BAMS"] },
  { title: "See All" },
];

const StudyGoal = () => {
  const scrollRef = useRef(null);
  const router = useRouter();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const handleBranchClick = (branch) => {
    router.push(`/college?courses_offered=${encodeURIComponent(branch)}`);
  };

  return (
    <div className="bg-white py-12 relative max-lg:py-8 max-md:py-6 max-sm:py-4">
      <div className="max-w-7xl mx-auto px-4 text-center max-md:px-3 max-sm:px-2">
        <h2 className="text-3xl font-bold mb-8 text-left text-gray-700 max-md:text-2xl max-sm:text-xl max-md:mb-6 max-sm:mb-4">Select Your Study Goal</h2>

        <div className="relative">
          <div ref={scrollRef} className="flex space-x-6 overflow-x-auto no-scrollbar scroll-smooth max-lg:space-x-5 max-md:space-x-4 max-sm:space-x-3">
            {studyGoals.map((goal, index) => (
              <div key={index} className="min-w-[250px] md:min-w-[280px] lg:min-w-[320px] flex-shrink-0">
                <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow h-[300px] flex flex-col justify-between border-2 border-gray-300 max-lg:p-5 max-md:p-4 max-sm:p-3 max-sm:justify-center">
                  {goal.title === "See All" ? (
                    <button className="flex justify-center items-center h-full text-orange-500 font-semibold text-lg underline">
                      {goal.title} <FaArrowRight className="ml-2 rounded-full border-2 border-orange-500" />
                    </button>
                  ) : (
                    <>
                      <div className="flex items-start max-sm:items-center">
                        {goal.icon && (
                          <div className="w-16 h-16 bg-white border-2 border-gray-400 rounded-full flex items-center justify-center text-violet-400 max-sm:w-10 max-md:h-10">
                            {goal.icon}
                          </div>
                        )}
                        <div className="ml-4 text-left">
                          <h3 className="text-xl font-semibold max-sm:text-base">{goal.title}</h3>
                          <p className="text-base text-gray-500 max-sm:text-sm">{goal.colleges}</p>
                        </div>
                      </div>
                      {goal.branches && (
                        <ul className="mt-4 border-t pt-4 text-gray-700">
                          {goal.branches.map((branch, idx) => (
                            <li
                              key={idx}
                              onClick={() => handleBranchClick(branch)}
                              className={`hover:underline hover:text-[#5e23dd] cursor-pointer ${idx !== goal.branches.length - 1 ? "border-b" : ""} py-2 max-sm:text-sm max-sm:py-1`}
                            >
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

          <button
            onClick={() => scroll("left")}
            className="absolute left-0 xl:-left-12 top-1/2 -translate-y-1/2 bg-white text-gray-800 border border-gray-300 shadow-md rounded-full p-3 hover:bg-gray-100 transition z-10 max-lg:p-2.5 max-md:p-2 max-sm:p-1.5">
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-gray-800 border border-gray-300 shadow-md rounded-full p-3 hover:bg-gray-100 transition z-10 max-lg:p-2.5 max-md:p-2 max-sm:p-1.5">
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyGoal;
