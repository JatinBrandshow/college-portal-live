import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { BiSolidQuoteAltLeft } from "react-icons/bi";


const OurTestimonial = () => {
  const testimonials = [
    {
      id: 1,
      text: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
      name: "Courtney Henry",
      role: "CEO Themesflat",
      image: "image/student/student1.png",
    },
    {
      id: 2,
      text: "The team is incredible! They offer unparalleled expertise and always keep our best interests in mind. The results speak for themselves.",
      name: "John Doe",
      role: "Founder XYZ Corp",
      image: "image/student/student2.png",
    },
    {
      id: 3,
      text: "Professional and timely services. The team ensures everything is handled efficiently, making our lives stress-free.",
      name: "Jane Smith",
      role: "CTO ABC Inc.",
      image: "image/student/student3.png",
    },
    {
        id: 4,
        text: "Professional and timely services. The team ensures everything is handled efficiently, making our lives stress-free.",
        name: "Jane Smith",
        role: "CTO ABC Inc.",
        image: "image/student/student4.png",
      },
      {
        id: 5,
        text: "Professional and timely services. The team ensures everything is handled efficiently, making our lives stress-free.",
        name: "Jane Smith",
        role: "CTO ABC Inc.",
        image: "image/student/student5.png",
      },
      {
        id: 6,
        text: "Professional and timely services. The team ensures everything is handled efficiently, making our lives stress-free.",
        name: "Jane Smith",
        role: "CTO ABC Inc.",
        image: "image/student/student6.png",
      },
      {
        id: 7,
        text: "Professional and timely services. The team ensures everything is handled efficiently, making our lives stress-free.",
        name: "Jane Smith",
        role: "CTO ABC Inc.",
        image: "image/student/student5.png",
      },
      {
        id: 8,
        text: "Professional and timely services. The team ensures everything is handled efficiently, making our lives stress-free.",
        name: "Jane Smith",
        role: "CTO ABC Inc.",
        image: "image/student/student5.png",
      },
      {
        id: 9,
        text: "Professional and timely services. The team ensures everything is handled efficiently, making our lives stress-free.",
        name: "Jane Smith",
        role: "CTO ABC Inc.",
        image: "image/student/student5.png",
      },
  ];

  return (
    <section className="bg-blue-50 py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-xl font-semibold text-sky-500">Our Testimonial</h2>
        <p className="text-4xl text-black font-bold mt-4">What's People Say's</p>
        <p className="text-gray-500 mt-2 max-w-3xl mx-auto">
        <span className="font-semibold">Don’t Just Take Our Word for It – Read Reviews </span>From Students and Parents Who Successfully Used College Portal to Choose the Right Institution and Accommodation!
        </p>
      </div>

      <div className="relative flex flex-col justify-center">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
            2560: {slidesPerView: 6}
          }}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          modules={[Autoplay, Pagination]}
          className="w-full max-w-8xl"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="flex justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-[350px] min-h-[350px] border border-gray-200 hover:shadow-xl hover:scale-105 transition duration-300 flex flex-col justify-between">
                {/* Quotation Mark */}
                <div className="relative text-blue-500 text-5xl font-bold opacity-100">
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
                    className="w-14 h-14 rounded-full border-2 border-blue-500"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    {/* Star Rating */}
                <div className="mt-2 text-yellow-500 flex justify-left gap-1">
                  {[...Array(5)].map((_, i) => (
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
        <div className="custom-pagination mt-6 flex justify-center"></div>

      </div>
    </section>
  );
};

export default OurTestimonial;