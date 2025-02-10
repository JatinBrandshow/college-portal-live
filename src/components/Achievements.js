'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { title: 'Placement Rate', value: 95, suffix: '%', description: 'Students successfully placed in top companies.' },
  { title: 'Alumni Worldwide', value: 20000, suffix: '+', description: 'Proud graduates making an impact globally.' },
  { title: 'Programs Offered', value: 150, suffix: '+', description: 'Diverse programs across disciplines.' },
  // { title: 'Ranking', value: 10, suffix: '', description: 'Top 10 College for Engineering in 2023.' },
];

const achievements = [
  {
    title: 'Best Engineering College',
    description:
      'Awarded "Best Engineering College" in 2023 by the National Education Board.',
    icon: '/image/student/student5.png',
  },
  {
    title: 'Innovation Hub Recognition',
    description:
      'Recognized as a hub for innovation and research by Global Innovation Forum.',
    icon: '/image/student/student6.png',
  },
  {
    title: 'Outstanding Alumni Network',
    description:
      '20,000+ alumni across the globe, with many in Fortune 500 companies.',
    icon: '/image/student/student1.png',
  },
];

const Achievements = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounters((prevCounters) =>
        prevCounters.map((counter, index) => {
          if (counter < stats[index].value) {
            return Math.min(counter + Math.ceil(stats[index].value / 50), stats[index].value);
          }
          return counter;
        })
      );
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 via-purple-100 to-indigo-200">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-12 text-indigo-900"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Achievements & Statistics
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6 lg:pr-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white text-center p-6 rounded-xl shadow-lg w-full sm:w-[90%] lg:w-[85%] mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="text-5xl font-extrabold text-indigo-700">
                  {counters[index]}
                  {stat.suffix}
                </h3>
                <p className="mt-2 text-lg font-medium text-gray-600">{stat.title}</p>
                <p className="mt-4 text-sm text-gray-500">{stat.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-16">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="flex items-center bg-indigo-50 p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <img
                  src={achievement.icon}
                  alt={achievement.title}
                  className="w-16 h-16 mr-6"
                />
                <div>
                  <h4 className="text-xl font-bold text-yellow-500">{achievement.title}</h4>
                  <p className="mt-2 text-sm text-gray-600">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
