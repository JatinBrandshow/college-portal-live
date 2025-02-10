'use client';

import React from 'react';
import { motion } from 'framer-motion';

const programs = [
  {
    title: 'Engineering',
    description: 'Shape the future with cutting-edge engineering programs.',
    icon: '⚙️',
  },
  {
    title: 'Business',
    description: 'Become a leader with world-class business and management studies.',
    icon: '💼',
  },
  {
    title: 'Arts & Humanities',
    description: 'Explore creativity and culture with arts and humanities programs.',
    icon: '🎨',
  },
  {
    title: 'Computer Science',
    description: 'Dive deep into AI, algorithms, and programming with CS courses.',
    icon: '💻',
  },
  {
    title: 'Medicine',
    description: 'Excel in healthcare with comprehensive medical training.',
    icon: '🩺',
  },
  {
    title: 'Law',
    description: 'Master the art of justice and governance with law programs.',
    icon: '⚖️',
  },
];

const ProgramsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-5xl font-extrabold text-blue-900 mb-6 tracking-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Explore Our Programs
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Select from a wide range of professionally crafted programs designed to align with your aspirations.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50 rounded-2xl pointer-events-none"
                style={{ zIndex: -1 }}
              ></div>

              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl group-hover:scale-110 transition-transform duration-300">
              {program.icon}
              </div>

              <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-2">
                {program.title}
              </h3>

              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                {program.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
