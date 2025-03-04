"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

// Sample data for alumni stories and events
const alumniStories = [
    {
        name: "Alice Johnson",
        graduationYear: "2010",
        story: "After graduating, Alice founded a successful tech startup...",
        photo: "/images/alumni/alice_johnson.jpg",
    },
    {
        name: "Bob Smith",
        graduationYear: "2012",
        story: "Bob transitioned into a leading role at a non-profit organization...",
        photo: "/images/alumni/bob_smith.jpg",
    },
    // Add more stories as needed
];

const upcomingEvents = [
    {
        title: "Annual Alumni Meetup",
        date: "June 15, 2025",
        location: "New York City",
        description: "Join fellow alumni for a day of networking and reminiscing...",
    },
    {
        title: "Webinar: Navigating Career Changes",
        date: "July 20, 2025",
        location: "Online",
        description: "Expert panel discusses strategies for successful career transitions...",
    },
    // Add more events as needed
];

const AlumniNetwork = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter alumni stories based on search term
    const filteredStories = alumniStories.filter((alumnus) =>
        alumnus.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 py-10">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-blue-600">Alumni Network</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Connect with fellow alumni, share your journey, and stay updated with upcoming events.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-1/2 mx-auto mb-8">
                    <input
                        type="text"
                        placeholder="Search alumni by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute right-3 top-2.5 text-gray-500" size={20} />
                </div>

                {/* Alumni Stories */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-6">Alumni Stories</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredStories.map((alumnus, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
                            >
                                <img
                                    src={alumnus.photo}
                                    alt={alumnus.name}
                                    className="w-32 h-32 rounded-full mb-4 object-cover"
                                />
                                <h3 className="text-lg font-semibold">{alumnus.name}</h3>
                                <p className="text-gray-500">Class of {alumnus.graduationYear}</p>
                                <p className="text-gray-600 mt-2">{alumnus.story}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div>
                    <h2 className="text-2xl font-semibold text-blue-600 mb-6">Upcoming Events</h2>
                    <div className="space-y-6">
                        {upcomingEvents.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-lg shadow-md"
                            >
                                <h3 className="text-xl font-semibold">{event.title}</h3>
                                <p className="text-gray-500">
                                    {event.date} | {event.location}
                                </p>
                                <p className="text-gray-600 mt-2">{event.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlumniNetwork;
