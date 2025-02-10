import React from "react";
import { motion } from "framer-motion";


const logos = [
    "/image/college-logo/college-logo.jpeg",
    "/image/college-logo/college-logo.jpeg",
    "/image/college-logo/college-logo.jpeg",
    "/image/college-logo/college-logo.jpeg",
    "/image/college-logo/college-logo.jpeg",
    "/image/college-logo/college-logo.jpeg",
    "/image/college-logo/college-logo.jpeg",
    "/image/college-logo/college-logo.jpeg",
    "/image/college-logo/college-logo.jpeg",
    "/image/college-logo/college-logo.jpeg",
];

const LogoSlider = () => {

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

    const infiniteLogos = [...logos, ...logos];

    return (
        <>
            <section className="py-10">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-blue-900">
                    Colleges Tie-Ups
                </h2>
                <div className="relative overflow-hidden">
                    <motion.div
                        className="flex gap-8"
                        variants={infiniteScrollVariants}
                        animate="animate"
                    >
                        {infiniteLogos.map((logo, index) => (
                            <div
                                key={index}
                                className="min-w-[150px] md:min-w-[200px] lg:min-w-[250px] p-4 flex items-center justify-center bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
                            >
                                <img
                                    src={logo}
                                    alt={`Logo ${index + 1}`}
                                    className="h-16 md:h-20 lg:h-24 object-contain"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
}

export default LogoSlider;
