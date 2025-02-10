"use client";

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/globals.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const programs = [
    {
        title: "Computer Science and Engineering",
        description: "Learn cutting-edge technologies like AI, Machine Learning, and Cloud Computing with hands-on experience.",
        duration: "4 Years",
        eligibility: "12th Pass with Science Stream",
        img: "/image/programs/cse.jpg",
    },
    {
        title: "Mechanical Engineering",
        description: "Build expertise in designing, manufacturing, and maintaining mechanical systems.",
        duration: "4 Years",
        eligibility: "12th Pass with Science Stream",
        img: "/image/programs/mechanical.jpg",
    },
    {
        title: "Business Administration",
        description: "Gain business insights and leadership skills to excel in the corporate world.",
        duration: "3 Years",
        eligibility: "12th Pass in Any Stream",
        img: "/image/programs/business.jpg",
    },
    {
        title: "Biotechnology",
        description: "Explore the fascinating world of genetic engineering, bioinformatics, and molecular biology.",
        duration: "4 Years",
        eligibility: "12th Pass with Science Stream",
        img: "/image/programs/biotech.jpg",
    },
];
const testimonials = [
    {
        quote: "The courses here transformed my career. The faculty is incredible, and the projects truly prepared me for the real world.",
        avatar: "/image/student/student1.png",
        name: "John Doe",
        role: "Software Engineer, Google",
    },
    {
        quote: "A life-changing experience! The curriculum is relevant and updated, and the community is so supportive.",
        avatar: "/image/student/student2.png",
        name: "Jane Smith",
        role: "Product Manager, Apple",
    },
    {
        quote: "The program helped me land my dream job. The learning environment is unmatched, and I’d recommend it to anyone.",
        avatar: "/image/student/student3.png",
        name: "Michael Lee",
        role: "Data Scientist, Amazon",
    },
];

const Programs = () => {
    return (
        <>
            <Header />
            <main className="bg-gray-100 text-gray-800">
                <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 lg:py-32 overflow-hidden">
                    <div className="container mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12">
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <motion.h1 className="text-2xl md:text-4xl font-bold leading-tight" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                                Your Future <span className="text-yellow-400">Starts Here</span>
                            </motion.h1>
                            <motion.p className="mt-6 text-lg md:text-xl text-gray-200" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                                Explore our comprehensive programs tailored to help you achieve excellence in your career and beyond. Join a community of innovators and leaders.
                            </motion.p>
                            <motion.div className="mt-8 flex justify-center lg:justify-start gap-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
                                <button className="px-6 py-3 bg-yellow-400 text-blue-800 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition">Get Started</button>
                                <button className="px-6 py-3 border border-gray-200 text-white font-semibold rounded-lg hover:bg-gray-100 hover:text-blue-800 transition">Learn More</button>
                            </motion.div>
                        </div>

                        <motion.div className="lg:w-1/2 relative" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                            <img src="/image/programs/hero-illustration.jpg" alt="Future Opportunities" className="w-full max-w-lg mx-auto lg:mx-0" />
                            <div className="absolute top-0 -left-10 w-48 h-48 bg-purple-500 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
                            <div className="absolute bottom-0 -right-10 w-56 h-56 bg-blue-500 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
                </section>

                <section className="bg-gray-100 py-16 lg:py-24">
                    <div className="max-w-[1500px] mx-auto px-6">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">Explore Our Programs</h2>

                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            navigation={true}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="swiper-wrapper"
                        >
                            {programs.map((program, index) => (
                                <SwiperSlide key={index} className="flex">
                                    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-[30rem]">
                                        <img src={program.img} alt={program.title} className="h-48 w-full object-cover" />
                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800 mb-4">{program.title}</h3>
                                                <p className="text-gray-600 line-clamp-3">{program.description}</p>
                                            </div>
                                            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                                                <span className="flex items-center">
                                                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M6 3a1 1 0 00-1 1v3a1 1 0 102 0V5h3a1 1 0 000-2H6zm8 0a1 1 0 011 1v3a1 1 0 01-2 0V5h-3a1 1 0 110-2h4zm2 8a1 1 0 00-1-1H5a1 1 0 000 2h10a1 1 0 011-1zm-3 5a1 1 0 10-2 0v1h-3a1 1 0 100 2h4a1 1 0 001-1v-2zm-4-5a1 1 0 100 2H9a1 1 0 100-2h2z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    {program.duration}
                                                </span>
                                                <span className="flex items-center">
                                                    <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M2 11a1 1 0 011-1h14a1 1 0 011 1v1a5 5 0 01-10 0v-1a1 1 0 00-2 0v1a5 5 0 01-10 0v-1zm8 3a1 1 0 102 0 1 1 0 00-2 0zM4 3a2 2 0 00-2 2v5h2V5a2 2 0 012-2h8a2 2 0 012 2v5h2V5a2 2 0 00-2-2H4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    {program.eligibility}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 ">
                                            <a href="#learn-more" className="block text-center bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200">
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                <section className="relative bg-gray-200 text-black py-16">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-black">What Our Students Say</h2>
                            <p className="mt-4 text-lg md:text-xl text-gray-700">Hear from the innovators, leaders, and achievers who shaped their future with us.</p>
                        </div>

                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            navigation={true}
                            pagination={{ clickable: true }}
                            className="testimonials-swiper"
                        >
                            {testimonials.map((testimonial, index) => (
                                <SwiperSlide key={index}>
                                    <div className="bg-gray-800 rounded-lg p-8 shadow-lg text-center transform transition hover:scale-105">
                                        <div className="text-yellow-400 mb-4">
                                            <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.89 11.166c0 .967-.767 1.75-1.71 1.75-.944 0-1.71-.783-1.71-1.75s.766-1.75 1.71-1.75c.944 0 1.71.783 1.71 1.75zM6.18 6.8a3.75 3.75 0 100 7.5c1.855 0 3.566-1.467 3.566-3.75h-1.78c0 .967-.767 1.75-1.71 1.75-.944 0-1.71-.783-1.71-1.75s.766-1.75 1.71-1.75a3.75 3.75 0 013.566-3.75zm9.63 4.366c0 .967-.767 1.75-1.71 1.75-.944 0-1.71-.783-1.71-1.75s.766-1.75 1.71-1.75c.944 0 1.71.783 1.71 1.75zM16.82 6.8a3.75 3.75 0 100 7.5c1.855 0 3.566-1.467 3.566-3.75h-1.78c0 .967-.767 1.75-1.71 1.75-.944 0-1.71-.783-1.71-1.75s.766-1.75 1.71-1.75a3.75 3.75 0 013.566-3.75z" />
                                            </svg>
                                        </div>
                                        <p className="text-lg text-gray-200 italic">“{testimonial.quote}”</p>
                                        <div className="mt-6 flex items-center justify-center gap-4">
                                            <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-yellow-400" />
                                            <div>
                                                <h4 className="text-md font-semibold text-gray-300">{testimonial.name}</h4>
                                                <p className="text-sm text-gray-400">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </section>

                <section className="relative h-[70vh] w-full bg-cover bg-center" style={{ backgroundImage: "url(/image/programs/collegecampus.jpg)" }}>
                    <div
                        className="absolute inset-0 bg-fixed bg-cover bg-center"
                        style={{
                            backgroundImage: "url(/image/about/collegecampus.jpg)",
                        }}
                    ></div>

                    <div className="absolute inset-0 bg-black bg-opacity-60"></div>

                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 lg:px-12">
                        <motion.h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                            Experience Our Campus Life
                        </motion.h2>
                        <motion.p className="text-lg lg:text-2xl text-gray-200 max-w-3xl" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
                            Immerse yourself in a dynamic and vibrant learning environment that fosters growth, innovation, and a sense of community.
                        </motion.p>

                        <motion.div className="mt-8" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
                            <a href="#learn-more" className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
                                Learn More
                            </a>
                        </motion.div>
                    </div>
                </section>
                <section className="relative bg-gradient-to-r from-blue-800 via-gray-900 to-blue-900 py-16 lg:py-24 overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gray-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
                    </div>

                    <div className="container mx-auto relative z-10 text-center px-6">
                        <motion.h2 className="text-2xl lg:text-3xl font-extrabold text-yellow-400 leading-tight mb-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                            Embrace the Future of <span className="text-white">Possibility</span>
                        </motion.h2>

                        <motion.p className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto mb-12" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
                            Join a movement driven by excellence and innovation. We create opportunities for limitless growth and success. Are you ready to step forward?
                        </motion.p>

                        <motion.div className="flex justify-center gap-6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}>
                            <a
                                href="#get-started"
                                className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold text-lg rounded-full shadow-lg hover:bg-yellow-500 hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105"
                            >
                                Get Started
                            </a>
                            <a
                                href="#learn-more"
                                className="px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold text-lg rounded-full shadow-lg hover:bg-yellow-400 hover:text-gray-900 hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105"
                            >
                                Learn More
                            </a>
                        </motion.div>

                        <div className="absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" className="w-full h-full">
                                <circle cx="100" cy="100" r="80" stroke="yellow" strokeWidth="1.5" />
                                <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="1.5" />
                                <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Programs;
