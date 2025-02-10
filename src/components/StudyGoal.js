import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaSchool, FaBusinessTime, FaBalanceScale, FaPaintBrush, FaHeartbeat } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";

const studyGoals = [
  { icon: <FaSchool size={30} />, title: "Engineering", colleges: "6259 Colleges", branches: ["BE/B.Tech", "Diploma in Engineering", "ME/M.Tech"] },
  { icon: <FaBusinessTime size={30} />, title: "Management", colleges: "7754 Colleges", branches: ["MBA/PGDM", "BBA/BMS", "Executive MBA"] },
  { icon: <FaBalanceScale size={30} />, title: "Commerce", colleges: "4979 Colleges", branches: ["B.Com", "M.Com"] },
  { icon: <FaPaintBrush size={30} />, title: "Arts", colleges: "5617 Colleges", branches: ["BA", "MA", "BFA", "BSW"] },
  { icon: <FaHeartbeat size={30} />, title: "Medical", colleges: "4587 Colleges", branches: ["MBBS", "BDS", "BAMS"] },
  { title: "See All" },
];

const StudyGoal = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.update(); // Ensure swiper updates on mount
    }
  }, []);

  return (
    <div className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 text-center relative">
        <h2 className="text-3xl font-bold mb-8 text-left text-gray-700">Select Your Study Goal</h2>

        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          slidesPerGroup={1} // Ensures one card scrolls at a time
          spaceBetween={20}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 2, slidesPerGroup: 1 },
            768: { slidesPerView: 3, slidesPerGroup: 1 },
            1024: { slidesPerView: 4, slidesPerGroup: 2 }, // Moves 2 slides at a time for large screens
          }}
          centeredSlides={false}
          modules={[Navigation]}
          className="studyGoalSwiper"
        >
          {studyGoals.map((goal, index) => (
            <SwiperSlide key={index}>
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
                        {goal.title && <h3 className="text-xl font-semibold">{goal.title}</h3>}
                        {goal.colleges && <p className="text-gray-500">{goal.colleges}</p>}
                      </div>
                    </div>
                    {goal.branches && goal.branches.length > 0 && (
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
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className="custom-prev absolute top-16 md:top-4 lg:top-1/2 -translate-y-1/2 left-1/3 md:left-2/3 lg:-left-8 bg-white text-gray-800 border border-gray-300 shadow-md rounded-full p-3 hover:bg-gray-100 transition z-10"
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          className="custom-next absolute top-16 md:top-4 lg:top-1/2 -translate-y-1/2 right-4 lg:-right-8 bg-white text-gray-800 border border-gray-300 shadow-md rounded-full p-3 hover:bg-gray-100 transition z-10"
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default StudyGoal;
