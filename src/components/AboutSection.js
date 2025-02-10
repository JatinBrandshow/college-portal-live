'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 text-gray-800 py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="w-72 h-72 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-full blur-3xl absolute top-20 left-10 animate-pulse"></div>
        <div className="w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full blur-3xl absolute bottom-20 right-10 animate-pulse"></div>
      </div>

      <div className="container mx-auto relative z-10 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-blue-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-yellow-500">College Portal</span>
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl leading-relaxed mb-8 text-gray-700"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Discover endless opportunities and resources to make your academic journey extraordinary. 
          Learn, connect, and grow with us.
        </motion.p>
        <motion.div
          className="inline-block"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a
            href="#"
            className="bg-yellow-400 text-blue-900 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-500 hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
