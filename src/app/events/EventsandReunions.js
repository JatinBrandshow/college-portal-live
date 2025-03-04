"use client";
import { useState } from "react";
import { motion } from "framer-motion";

// Sample data for events and reunions
const events = [
    {
        title: "Annual Alumni Reunion",
        date: "April 25, 2025",
        time: "6:00 PM - 10:00 PM",
        location: "Grand Ballroom, University Center",
        description: "Reconnect with fellow alumni at our annual reunion event...",
        link: "#",
    },
    {
        title: "Homecoming Weekend",
        date: "October 15-17, 2025",
        time: "All Day",
        location: "University Campus",
        description: "Join us for a weekend full of festivities, including...",
        link: "#",
    },
    // Add more events as needed
];

const EventsandReunions = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <div className="min-h-screen bg-white text-gray-800 py-10">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-blue-600">Events & Reunions</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Stay connected with our community through upcoming events and reunions.
                    </p>
                </div>

                {/* Events List */}
                <div className="grid gap-8 md:grid-cols-2">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            onClick={() => setSelectedEvent(event)}
                        >
                            <h3 className="text-2xl font-semibold text-blue-600">{event.title}</h3>
                            <p className="text-gray-500 mt-1">
                                {event.date} | {event.time}
                            </p>
                            <p className="text-gray-500">{event.location}</p>
                            <p className="text-gray-600 mt-2">{event.description}</p>
                            <a
                                href={event.link}
                                className="text-blue-500 hover:underline mt-4 inline-block"
                            >
                                Learn More
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Event Details Modal */}
                {selectedEvent && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                onClick={() => setSelectedEvent(null)}
                            >
                                &times;
                            </button>
                            <h2 className="text-3xl font-bold text-blue-600">{selectedEvent.title}</h2>
                            <p className="text-gray-500 mt-1">
                                {selectedEvent.date} | {selectedEvent.time}
                            </p>
                            <p className="text-gray-500">{selectedEvent.location}</p>
                            <p className="text-gray-600 mt-4">{selectedEvent.description}</p>
                            <a
                                href={selectedEvent.link}
                                className="text-blue-500 hover:underline mt-4 inline-block"
                            >
                                Register Now
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsandReunions;
