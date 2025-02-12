import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { API_NODE_URL, API_KEY } from "../../config/config";

const OurTestimonial = () => {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}testimonial/all-testimonials`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
          },
        });

        const text = await response.text();

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = JSON.parse(text);

        if (Array.isArray(data.testimonials)) {
          const mappedTestimonials = data.testimonials.map((item) => ({
            id: item._id,
            text: item.description || "No message available",
            name: item.name || "Anonymous",
            role: item.designation || "No role specified",
            image: item.img || "image/student/default.png",
            rating: item.rating || 0,
          }));

          setTestimonials(mappedTestimonials);
        } else {
          console.error("Unexpected API response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="bg-violet-50 py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-xl font-semibold text-[#8070dd]">Our Testimonial</h2>
        <p className="text-4xl text-black font-bold mt-4">What's People Say's</p>
        <p className="text-gray-500 mt-2 max-w-3xl mx-auto">
          <span className="font-semibold">Don’t Just Take Our Word for It – Read Reviews </span>
          From Students and Parents Who Successfully Used College Portal to Choose the Right Institution and Accommodation!
        </p>
      </div>

      <div className="relative flex flex-col justify-center">
        {testimonials.length > 0 ? ( // ✅ Ensure Swiper renders only when testimonials exist
          <Swiper
            key={testimonials.length} // ✅ Forces Swiper to re-render when testimonials change
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
              2560: { slidesPerView: 6 },
            }}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }} // ✅ Removed 'el' to ensure correct behavior
            modules={[Autoplay, Pagination]}
            className="w-full max-w-8xl"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="flex justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-[350px] min-h-[350px] border border-gray-200 hover:shadow-xl hover:scale-105 transition duration-300 flex flex-col justify-between">
                  {/* Quotation Mark */}
                  <div className="relative text-[#8070dd] text-5xl font-bold opacity-100">
                    <BiSolidQuoteAltLeft />
                  </div>

                  {/* Testimonial Text with Overflow Hidden */}
                  <p className="text-gray-700 italic mb-6 line-clamp-4 overflow-hidden">
                    {testimonial.text}
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full border-2 border-[#8070dd]"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                      {/* Star Rating */}
                      <div className="mt-2 text-yellow-500 flex justify-left gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-3 h-3"
                          >
                            <path d="M12 2c.7 0 1.5.6 1.6 1.3l1.4 4.2h4.5c.8 0 1.5.6 1.7 1.3.2.7-.1 1.5-.6 2l-3.7 3.2 1.3 4.3c.3.7.1 1.5-.4 2-.6.4-1.3.5-2 .2l-4-2.3-4 2.3c-.7.4-1.4.4-2-.2-.5-.5-.7-1.3-.4-2l1.3-4.3-3.7-3.2c-.5-.5-.8-1.3-.6-2 .2-.7.9-1.3 1.7-1.3h4.5L10.4 3.3C10.5 2.6 11.3 2 12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-600">Loading testimonials...</p>
        )}
      </div>
    </section>
  );
};

export default OurTestimonial;
