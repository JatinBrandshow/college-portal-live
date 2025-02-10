'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const testimonials = [
  {
    name: 'John Doe',
    role: 'Alumnus, Class of 2020',
    category: 'Alumni',
    testimonial:
      '“The college transformed my career trajectory. The world-class faculty and vibrant community gave me opportunities I never imagined!”',
    image: '/image/student/student1.png',
  },
  {
    name: 'Jane Smith',
    role: 'Current Student, Engineering',
    category: 'Students',
    testimonial:
      '“Being part of this college is an experience of a lifetime. The state-of-the-art infrastructure and mentorship are unmatched.”',
    image: '/image/student/student2.png',
  },
  {
    name: 'Emily Davis',
    role: 'Alumna, Class of 2018',
    category: 'Alumni',
    testimonial:
      '“This institution laid the foundation for my successful career. I owe everything to the incredible support I received here.”',
    image: '/image/student/student3.png',
  },
  {
    name: 'Michael Brown',
    role: 'Parent of a Student',
    category: 'Students',
    testimonial:
      '“As a parent, I couldn’t be happier. My son has gained skills and confidence that I couldn’t have imagined.”',
    image: '/image/student/student4.png',
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isAutoplaying, setIsAutoplaying] = useState(true);

  const getVisibleSlides = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    setVisibleSlides(getVisibleSlides());
    const handleResize = () => setVisibleSlides(getVisibleSlides());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredTestimonials =
    categoryFilter === 'All'
      ? testimonials
      : testimonials.filter((testimonial) => testimonial.category === categoryFilter);

  const totalTestimonials = filteredTestimonials.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + totalTestimonials) % totalTestimonials
    );
  };

  const getVisibleTestimonials = () => {
    if (totalTestimonials <= visibleSlides) {
      return filteredTestimonials;
    }

    const start = currentIndex;
    const end = currentIndex + visibleSlides;

    if (end > totalTestimonials) {
      return [
        ...filteredTestimonials.slice(start, totalTestimonials),
        ...filteredTestimonials.slice(0, end % totalTestimonials),
      ];
    }

    return filteredTestimonials.slice(start, end);
  };

  const visibleTestimonials = getVisibleTestimonials();

  useEffect(() => {
    if (!isAutoplaying) return;
    const interval = setInterval(() => handleNext(), 5000);
    return () => clearInterval(interval);
  }, [isAutoplaying, currentIndex, visibleSlides]);

  return (
    <section className="relative py-20 bg-gradient-to-r from-indigo-100 via-purple-300 to-blue-300 text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-extrabold mb-8 text-black"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What Our Community Says
        </motion.h2>

        <div className="mb-8 flex justify-center gap-4">
          {['All', 'Alumni', 'Students'].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full font-medium ${categoryFilter === category
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white text-yellow-600 hover:bg-yellow-300'
                }`}
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          className="relative w-[75%] mx-auto bg-gray-300 p-5 rounded-lg"
          onMouseEnter={() => setIsAutoplaying(false)}
          onMouseLeave={() => setIsAutoplaying(true)}
        >
          <div className="flex gap-6 justify-center overflow-hidden rounded-lg">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center bg-white text-black p-6 rounded-lg shadow-lg transition-transform transform"
                style={{ flex: `0 0 ${100 / visibleSlides}%` }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-6 shadow-md"
                />
                <p className="italic text-lg mb-4">"{testimonial.testimonial}"</p>
                <h3 className="text-xl font-bold">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-gray-300 text-indigo-600 p-3 rounded-full shadow-md hover:bg-indigo-900 transition"
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-gray-300 text-indigo-600 p-3 rounded-full shadow-md hover:bg-indigo-900 transition z-10"
          >
            <FaArrowRight size={20} />
          </button>
        </div>
        <div className="mt-8">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-indigo-900 transition">
            Join Us Today
          </button>
        </div>
      </div>
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-purple-500 rounded-full opacity-30"
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-60 h-60 bg-blue-500 rounded-full opacity-20"
        animate={{ y: [0, -30, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </section>
  );
};

export default Testimonial;
