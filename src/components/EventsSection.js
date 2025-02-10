'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_NODE_URL, API_KEY } from '../../config/config';

const EventCard = ({ event }) => (
  <div className="min-w-[300px] md:min-w-[350px] lg:min-w-[400px] p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
    <h3 className="text-xl font-bold text-blue-900 mb-2">{event.title}</h3>
    <p className="text-blue-700 font-semibold mb-1">Date: {event?.date.split('T')[0]}</p>
    <p className="text-gray-600">{event.description}</p>
  </div>
);

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}events/all-events`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data?.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Could not fetch events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const infiniteScrollVariants = {
    animate: {
      x: ['0%', '-100%'],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 20,
          ease: 'linear',
        },
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-extrabold text-blue-900 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Upcoming Events
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Stay updated with the latest events and happenings at our college.
        </motion.p>

        {loading ? (
          <p className="text-gray-600">Loading upcoming events. Please wait...</p>
        ) : error ? (
          <p className="text-red-500">Unable to load events. Please try again later.</p>
        ) : (
          <div className="relative overflow-hidden">
            {Array.isArray(events) && events.length > 0 ? (
              <motion.div
                className="flex gap-8"
                variants={infiniteScrollVariants}
                animate="animate"
              >
                {[...events, ...events].map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </motion.div>
            ) : (
              <p className="text-gray-600">No events to display.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
