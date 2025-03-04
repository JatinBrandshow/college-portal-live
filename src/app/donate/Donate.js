"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const Donate = () => {
    const [amount, setAmount] = useState("");
    const [recurring, setRecurring] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement donation processing logic here
        setMessage("Thank you for your generous donation!");
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 py-10">
            <div className="max-w-3xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-blue-600">Support Our Mission</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Your contribution helps us continue our work and make a difference.
                    </p>
                </div>

                {/* Donation Form */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-lg shadow-md"
                >
                    <div className="mb-6">
                        <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">
                            Donation Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={recurring}
                                onChange={() => setRecurring(!recurring)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">Make this a recurring donation</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Donate Now
                    </button>
                </motion.form>

                {/* Success Message */}
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-6 text-center text-green-600 font-semibold"
                    >
                        {message}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Donate;
