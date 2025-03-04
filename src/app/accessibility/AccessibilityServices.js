"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const AccessibilityServices = () => {
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement feedback submission logic here
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 py-10">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-blue-600">Accessibility Services</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        We are committed to ensuring our website is accessible to everyone. Learn about our accessibility features and provide feedback to help us improve.
                    </p>
                </div>

                {/* Accessibility Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 rounded-lg shadow-md mb-10"
                >
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Commitment</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>High contrast color schemes for better readability.</li>
                        <li>Keyboard navigable menus and interactive elements.</li>
                        <li>Alternative text for all images and media.</li>
                        <li>Resizable text without loss of content or functionality.</li>
                        <li>Consistent and predictable page layouts.</li>
                    </ul>
                </motion.div>

                {/* Feedback Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 rounded-lg shadow-md"
                >
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Feedback</h2>
                    <p className="text-gray-700 mb-6">
                        Your feedback is invaluable in helping us enhance our accessibility features. Please share your thoughts or report any issues you've encountered.
                    </p>
                    {!submitted ? (
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                                rows="5"
                                placeholder="Enter your feedback here..."
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Submit Feedback
                            </button>
                        </form>
                    ) : (
                        <p className="text-green-600 font-semibold">
                            Thank you for your feedback!
                        </p>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AccessibilityServices;
