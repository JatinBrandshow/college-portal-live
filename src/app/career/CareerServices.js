"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

// Sample data for job listings and workshops
const jobListings = [
    {
        title: "Software Engineer",
        company: "Tech Innovators Inc.",
        location: "San Francisco, CA",
        description: "Develop and maintain web applications...",
        link: "#",
    },
    {
        title: "Marketing Coordinator",
        company: "Creative Solutions",
        location: "New York, NY",
        description: "Assist in the development of marketing campaigns...",
        link: "#",
    },
    // Add more job listings as needed
];

const workshops = [
    {
        title: "Resume Writing Workshop",
        date: "March 10, 2025",
        time: "2:00 PM - 4:00 PM",
        description: "Learn how to craft a compelling resume...",
        link: "#",
    },
    {
        title: "Interview Skills Seminar",
        date: "March 15, 2025",
        time: "1:00 PM - 3:00 PM",
        description: "Enhance your interview techniques...",
        link: "#",
    },
    // Add more workshops as needed
];

const CareerServices = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter job listings based on search term
    const filteredJobs = jobListings.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 py-10">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-blue-600">Career Services</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Explore job opportunities, attend workshops, and receive career guidance to achieve your professional goals.
                    </p>
                </div>

                {/* Job Listings */}
                <div className="mb-12">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-6">Job Listings</h2>
                    <div className="space-y-6">
                        {filteredJobs.map((job, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-lg shadow-md"
                            >
                                <h3 className="text-xl font-semibold">{job.title}</h3>
                                <p className="text-gray-500">
                                    {job.company} | {job.location}
                                </p>
                                <p className="text-gray-600 mt-2">{job.description}</p>
                                <a
                                    href={job.link}
                                    className="text-blue-500 hover:underline mt-4 inline-block"
                                >
                                    View Details
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Workshops and Events */}
                <div>
                    <h2 className="text-2xl font-semibold text-blue-600 mb-6">Upcoming Workshops & Events</h2>
                    <div className="space-y-6">
                        {workshops.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-lg shadow-md"
                            >
                                <h3 className="text-xl font-semibold">{event.title}</h3>
                                <p className="text-gray-500">
                                    {event.date} | {event.time}
                                </p>
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
                </div>
            </div>
        </div>
    );
};

export default CareerServices;
