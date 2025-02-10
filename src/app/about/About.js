"use client";
import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { FaGraduationCap, FaBook, FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import "../../styles/globals.css";
// import Faqs from "@/components/Faqs";
// import TeamComponent from "@/components/TeamComponent";
// import WhyChooseUs from "@/components/WhyChooseUs";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const heroRef = useRef(null);
    const heroTextRef = useRef(null);
    const heroImageRef = useRef(null);
    const imageRefs = useRef([]);
    const [zIndex, setZIndex] = useState([1, 2]);

    const handleHoverStart = (index) => {
        const updatedZIndex = [...zIndex];
        updatedZIndex[index] = 2;
        updatedZIndex[1 - index] = 1;
        setZIndex(updatedZIndex);
    };

    const handleHoverEnd = () => {
        setZIndex([1, 2]);
    };
    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "+=100%",
                scrub: true,
                pin: true,
                anticipatePin: 1,
            },
        });

        tl.to(heroImageRef.current, {
            scale: 1,
            duration: 2,
            ease: "power3.inOut",
        });

        tl.to(
            heroTextRef.current,
            {
                opacity: 0,
                y: -100,
                duration: 1,
                ease: "power3.inOut",
            },
            "<"
        );

        imageRefs.current.forEach((imageRef) => {
            tl.to(
                imageRef,
                {
                    opacity: 0,
                    y: -50,
                    duration: 1,
                    ease: "power3.inOut",
                },
                "<"
            );
        });
    }, []);

    const visionRef = useRef(null);
    const highlightsRef = useRef(null);
    const testimonialsRef = useRef(null);

    useEffect(() => {
        const sections = [visionRef, highlightsRef, testimonialsRef];

        sections.forEach((sectionRef) => {
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });
    }, []);

    return (
        <>
            <Header />
            <main className="bg-gray-100 text-gray-800">
                <section
                    ref={heroRef}
                    className="relative h-screen bg-gradient-to-b from-blue-500 via-blue-300 to-yellow-400 text-yellow-100 overflow-hidden flex items-center"
                >
                    <div
                        ref={heroImageRef}
                        className="absolute inset-0 z-0 scale-0 origin-center"
                    >
                        <Image
                            src="/image/about/collegecampus.jpg"
                            alt="College Campus"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            priority
                        />
                    </div>

                    <div className="relative z-10 container mx-auto px-6 flex flex-col md:grid md:grid-cols-2 gap-8 items-center">
                        <div
                            ref={heroTextRef}
                            className="text-center md:text-left order-2 md:order-1"
                        >
                            <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-50">
                                About Our College
                            </h1>
                            <p className="mt-4 text-lg md:text-xl text-yellow-100">
                                Empowering students with excellence in education and innovation.
                            </p>
                        </div>

                        <div className="flex-1 relative flex items-center justify-center h-full order-1 md:order-2">
                            <motion.div
                                ref={(el) => (imageRefs.current[0] = el)}
                                className="absolute top-1/4 left-1/4 md:top-auto md:left-auto md:relative transform hover:scale-105 transition-transform duration-500"
                                whileHover={{ scale: 1.1 }}
                                style={{ zIndex: zIndex[0] }}
                                onHoverStart={() => handleHoverStart(0)}
                                onHoverEnd={handleHoverEnd}
                            >
                                <Image
                                    src="/image/about/hero1.jpg"
                                    alt="Campus View"
                                    width={200}
                                    height={200}
                                    className="rounded-lg shadow-lg"
                                />
                            </motion.div>

                            <motion.div
                                ref={(el) => (imageRefs.current[1] = el)}
                                className="absolute bottom-1/4 right-1/4 md:bottom-auto md:right-auto md:relative transform hover:scale-105 transition-transform duration-500 mt-4"
                                whileHover={{ scale: 1.1 }}
                                style={{ zIndex: zIndex[1] }}
                                onHoverStart={() => handleHoverStart(1)}
                                onHoverEnd={handleHoverEnd}
                            >
                                <Image
                                    src="/image/about/hero2.jpg"
                                    alt="Student Activities"
                                    width={200}
                                    height={200}
                                    className="rounded-lg shadow-lg"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section ref={visionRef} className="py-16 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
                    <div className="container mx-auto px-6">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-12 text-gray-800">
                            Our Vision, Mission, and Values
                        </h2>
                        <div className="relative grid gap-12 md:grid-cols-3">
                            {[
                                {
                                    icon: <FaGraduationCap size={40} className="text-blue-600" />,
                                    title: "Our Vision",
                                    description:
                                        "To be a leading institution recognized globally for academic excellence and innovation.",
                                    bg: "bg-gradient-to-b from-blue-100 to-blue-200",
                                },
                                {
                                    icon: <FaBook size={40} className="text-green-600" />,
                                    title: "Our Mission",
                                    description:
                                        "To provide quality education that fosters innovation and inclusivity.",
                                    bg: "bg-gradient-to-b from-green-100 to-green-200",
                                },
                                {
                                    icon: <FaUsers size={40} className="text-red-600" />,
                                    title: "Our Values",
                                    description:
                                        "Integrity, diversity, and a commitment to lifelong learning.",
                                    bg: "bg-gradient-to-b from-red-100 to-red-200",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`p-10 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500 ${item.bg}`}
                                    whileHover={{ translateY: -10 }}
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold mt-6 text-gray-800">
                                            {item.title}
                                        </h3>
                                        <p className="mt-4 text-gray-700 text-center leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section ref={highlightsRef} className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-16 text-gray-800">
                            Why Choose Us?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {[
                                {
                                    icon: <FaChalkboardTeacher size={50} className="text-indigo-600" />,
                                    title: "Expert Faculty",
                                    description:
                                        "Learn from industry-leading professors and mentors committed to your success.",
                                    image: "/image/about/faculty.jpg",
                                },
                                {
                                    icon: <FaBook size={40} className="text-purple-600" />,
                                    title: "Diverse Programs",
                                    description:
                                        "Choose from a wide range of courses designed to prepare you for the future.",
                                    image: "/image/about/programs.jpg",
                                },
                                {
                                    icon: <FaUsers size={50} className="text-orange-600" />,
                                    title: "Global Community",
                                    description:
                                        "Be part of a vibrant, diverse, and inclusive student body from across the globe.",
                                    image: "/image/about/community.jpg",
                                },
                                {
                                    icon: <FaGraduationCap size={50} className="text-green-600" />,
                                    title: "Career Opportunities",
                                    description:
                                        "Benefit from strong industry connections and personalized career support.",
                                    image: "/image/about/career.jpg",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="relative overflow-hidden rounded-lg shadow-lg bg-white group transform transition-all duration-500 hover:scale-105"
                                    whileHover={{ translateY: -5 }}
                                >
                                    <div className="absolute inset-0">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="opacity-85 group-hover:opacity-50 transition-opacity duration-500"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 opacity-75 group-hover:opacity-90 transition-opacity duration-500"></div>
                                    <div className="relative p-8 flex flex-col items-center text-center text-yellow-200">
                                        <div className="w-16 h-16 flex items-center justify-center bg-gray-50 opacity-90 rounded-full shadow-md mb-6">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold">{item.title}</h3>
                                        <p className="mt-4 text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* <WhyChooseUs />
                <TeamComponent /> */}

                <section ref={testimonialsRef} className="py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-2xl md:text-3xl font-extrabold mb-12">What Our Students Say</h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    name: "Jane Doe",
                                    feedback:
                                        "The professors here are amazing and the campus is beautiful. I’ve learned so much!",
                                    image: "/image/student/student1.png",
                                },
                                {
                                    name: "John Smith",
                                    feedback:
                                        "The best decision of my life was to join this college. It’s an incredible experience.",
                                    image: "/image/student/student2.png",
                                },
                                {
                                    name: "Emily Johnson",
                                    feedback:
                                        "I’ve grown both academically and personally thanks to the supportive environment.",
                                    image: "/image/student/student3.png",
                                },
                            ].map((item, index) => (
                                <motion.div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        className="rounded-full mx-auto"
                                        width={80}
                                        height={80}
                                    />
                                    <h4 className="mt-4 text-xl font-semibold">{item.name}</h4>
                                    <p className="mt-2 text-gray-600">{item.feedback}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            {/* <Faqs /> */}
            <Footer />
        </>
    );
}

export default About;
