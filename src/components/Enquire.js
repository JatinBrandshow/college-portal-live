"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

const Enquire = ({ isOpen, setIsOpen }) => {
    const closeModal = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(false);
    };

    if (!isOpen) return null;
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-[800px] flex justify-between overflow-hidden">
                        <div className="p-6 space-y-6 w-7/12">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">Enquire Now</h2>
                                    <p className="text-sm text-gray-500">
                                        <strong>Spot-on choice and perfect timing!</strong> Your home is just a few steps away. Enquiry is absolutely <span className="font-medium">free</span>.
                                    </p>
                                </div>
                            </div>

                            <form className="space-y-4 flex flex-col justify-between">
                                <div>
                                    <div className="space-y-2">
                                        <label htmlFor="fullName" className="block font-medium">
                                            Your Full Name<span className="text-red-500">*</span>
                                        </label>
                                        <input id="fullName" required className="w-full p-2 border rounded" placeholder="Enter your full name" />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block font-medium">
                                            Your Email Address<span className="text-red-500">*</span>
                                        </label>
                                        <input id="email" type="email" required className="w-full p-2 border rounded" placeholder="Enter your email" />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="mobile" className="block font-medium">
                                            Your Mobile Number<span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-2">
                                            <select defaultValue="+91" className="p-2 border rounded">
                                                <option value="+91">+91</option>
                                                <option value="+1">+1</option>
                                                <option value="+44">+44</option>
                                            </select>
                                            <input id="mobile" type="tel" required className="flex-1 p-2 border rounded" placeholder="Enter your mobile number" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <input type="checkbox" id="terms" className="mt-1" required />
                                        <label htmlFor="terms">
                                            I agree with all the{" "}
                                            <Link href="#" className="text-blue-500 hover:underline">
                                                terms
                                            </Link>{" "}
                                            and{" "}
                                            <Link href="#" className="text-blue-500 hover:underline">
                                                privacy
                                            </Link>
                                            .
                                        </label>
                                    </div>

                                    <button type="submit" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
                                        Next
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="relative w-5/12 bg-gray-100 p-4 rounded-xl shadow-lg">
                            <button onClick={closeModal} className="absolute top-4 right-4 rounded-full">
                                <X className="h-5 w-5" />
                                <span className="sr-only">Close</span>
                            </button>
                            <div className="flex flex-col mt-6 border rounded-xl">
                                <div className="bg-white rounded-tr-xl rounded-tl-xl p-3">
                                    <div className="overflow-hidden relative gap-3 flex flex-col">
                                        <img src="/image/contact-us/contact-bg.jpg" alt="Property interior showing a modern bedroom" className="w-full h-40 rounded-xl" />
                                        <div className="">
                                            <h3 className="text-lg font-semibold">Beckett House, Dublin</h3>
                                            <p className="text-sm text-gray-600">Dublin 1, County Dublin, IE</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b-2" />
                                <div className="bg-white rounded-br-xl rounded-bl-xl px-4 py-2">
                                    <div className="text-sm text-gray-500">Rent</div>
                                    <div className="text-lg font-semibold">€284 / week</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 bg-white p-4 rounded-xl shadow-md mt-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-4 h-4 flex items-center justify-center rounded-full">💰</span>
                                    Lowest Price Guarantee
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-4 h-4 flex items-center justify-center rounded-full">✓</span>
                                    Verified Properties
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-4 h-4 flex items-center justify-center rounded-full">💬</span>
                                    24x7 Personal Assistance
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="w-4 h-4 flex items-center justify-center rounded-full">⭐</span>
                                    5.8k+ Reviews
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Enquire;
