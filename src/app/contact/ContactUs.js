"use client";
import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
    return (
        <>
            <section className="relative h-[80vh] bg-cover bg-no-repeat bg-center bg-BG1 bg-slate-600 bg-blend-multiply">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-gray-200 opacity-50 z-0"></div>
                <div className="relative z-10 h-full max-w-[1400px] mx-auto text-white flex flex-col items-center justify-center">
                    <div className="relative z-10 text-center px-2 py-2">
                        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
                    </div>
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl px-8 py-8">
                        <div className="bg-white p-6 rounded-md shadow-md">
                            <form className="space-y-2.5">
                                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">Send Message</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" placeholder="Enter your name" className="w-full bg-transparent border-b border-gray-400 text-sm py-2 px-2 focus:outline-none text-gray-900" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" placeholder="Enter your email" className="w-full bg-transparent border-b border-gray-400 text-sm py-2 px-2 focus:outline-none text-gray-900" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea placeholder="Enter your message" className="w-full bg-transparent border-b border-gray-400 text-sm py-2 px-2 focus:outline-none text-gray-900"></textarea>
                                </div>
                                <button type="submit" className="bg-blue-500 text-white px-6 py-2 text-sm hover:bg-blue-600 rounded-md">
                                    Send
                                </button>
                            </form>
                        </div>

                        <div className="rounded-md overflow-hidden shadow-md">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509309!2d144.9537353159046!3d-37.81720987975198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5773d7b9ab4c6!2sMelbourne!5e0!3m2!1sen!2sau!4v1648795286805!5m2!1sen!2sau"
                                className="w-full h-full border-0"
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full bg-gradient-to-r from-gray-50 to-gray-100 py-12">
    <div className="container mx-auto px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                We'd Love to Hear From You
            </h2>
            <p className="text-gray-600 text-lg">
                Get in touch with our friendly team today.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Card - Chat to Sales */}
            <div className="p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                    <Mail className="text-blue-500 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
                    Chat to Sales
                </h3>
                <p className="text-gray-600 text-center mb-4">
                    Speak to our friendly team for assistance.
                </p>
                <p className="text-blue-500 text-center text-sm">
                    sales@untitlededu.com
                </p>
            </div>

            {/* Contact Card - Visit Us */}
            <div className="p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                    <MapPin className="text-green-500 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
                    Visit Us
                </h3>
                <p className="text-gray-600 text-center mb-4">
                    Visit our office for face-to-face assistance.
                </p>
                <p className="text-green-500 text-center text-sm">
                    100 Smith Street, Collingwood VIC 3066 AU
                </p>
            </div>

            {/* Contact Card - Call Us */}
            <div className="p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6 mx-auto">
                    <Phone className="text-yellow-500 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
                    Call Us
                </h3>
                <p className="text-gray-600 text-center mb-4">
                    Available Mon-Fri, 8am to 5pm.
                </p>
                <p className="text-yellow-500 text-center text-sm">
                    +1 (555) 000-0000
                </p>
            </div>
        </div>
    </div>
</section>
        </>
    );
};

export default ContactUs;
