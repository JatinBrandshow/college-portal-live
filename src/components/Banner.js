"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_NODE_URL, API_KEY } from "../../config/config";

const Banner = () => {
  const [advertisement, setAdvertisement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAdvertisement = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}advertisement/all-advertisement`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch advertisement");
        }

        const data = await response.json();
        setAdvertisement(data?.advertisements[0]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Could not fetch advertisement. Please try again later.");
        setLoading(false);
      }
    };

    fetchAdvertisement();
  }, []);

  const handleBrowse = () => {
    if (advertisement?.url) {
      router.push(advertisement.url);
    }
  };

  return (
    <section className="relative bg-white overflow-hidden p-2 mb-2">
      <div className="bg-gray-300 container mx-auto px-6 lg:px-12 py-16 flex flex-col lg:flex-row items-center gap-8 rounded-lg">
        {loading ? (
          <p className="text-gray-600">Loading advertisement...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="lg:w-1/2 relative">
              <div className="absolute top-4 left-0 bg-purple-500 text-white text-sm font-semibold py-1 px-4 rounded-lg transform rotate-[-45deg] shadow-md z-10">
                New
              </div>
              <img
                src={advertisement?.img[0]}
                alt={advertisement?.title || "Advertisement Image"}
                className="rounded-lg shadow-lg transform hover:scale-90 transition-transform duration-300 z-0"
              />
            </div>

            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
                {advertisement?.title || "Explore Colleges"}
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                {advertisement?.description ||
                  "Discover the best institutions to shape your future. Find the right college for you with our comprehensive guide."}
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleBrowse}
                  className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-medium rounded-full text-xl shadow-md flex items-center justify-center transition-all duration-300"
                >
                  Browse College
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-100"></div>
    </section>
  );
}

export default Banner;
