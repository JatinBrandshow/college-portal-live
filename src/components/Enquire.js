"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { API_NODE_URL, API_KEY } from "../../config/config";
import { toast } from "react-toastify";

const Enquire = ({ isOpen, setIsOpen, accommodationImage, accommodationName, accommodationAddress, accommodationId , accommodationPrice}) => {
    const [isChecked, setIsChecked] = useState(false);
    const closeModal = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(false);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const [enquireData, setEnquireData] = useState({
        fullName: "",
        email: "",
        countryCode: "+91",
        mobileNumber: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEnquireData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validate required fields
        if (!enquireData.fullName.trim() || !enquireData.email.trim() || !enquireData.mobileNumber.trim()) {
            toast.error("Please fill in all required fields before proceeding.");
            return;
        }
    
        // Check if terms are accepted
        if (!isChecked) {
            toast.error("You must agree to the terms and privacy policy.");
            return;
        }
    
        console.log("Submitting Data:", JSON.stringify(enquireData, null, 2));
    
        fetch(`${API_NODE_URL}enquireNow/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify(enquireData),
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("Result:", result);
    
            if (result.status) {
                toast.success("Enquiry submitted successfully! 🎉");
    
                // Reset form
                setEnquireData({
                    fullName: "",
                    email: "",
                    countryCode: "+91",
                    mobileNumber: "",
                });
                setIsChecked(false); // Reset checkbox
    
                // Redirect after successful submission with query parameters
                const queryParams = new URLSearchParams({
                    accommodationImage: encodeURIComponent(accommodationImage),
                    accommodationName: encodeURIComponent(accommodationName),
                    accommodationAddress: encodeURIComponent(accommodationAddress),
                    accommodationId: encodeURIComponent(accommodationId),
                    enquiryId: encodeURIComponent(result.data._id), // Assuming result.data._id is the enquiry ID
                    name: encodeURIComponent(result.data.fullName),
                }).toString();
    
                setTimeout(() => {
                    window.location.href = `/booking-form?${queryParams}`;
                }, 1000);
            } else {
                toast.error(result.msg || "Error submitting enquiry.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            toast.error("An error occurred while submitting the enquiry.");
        });
    };
    

    if (!isOpen) return null;

    return (
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

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="fullName" className="block font-medium">
                                Full Name<span className="text-red-500">*</span>
                            </label>
                            <input id="fullName" name="fullName" value={enquireData.fullName} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Enter your full name" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block font-medium">
                                Email Address<span className="text-red-500">*</span>
                            </label>
                            <input id="email" name="email" type="email" value={enquireData.email} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Enter your email" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="mobileNumber" className="block font-medium">
                                Mobile Number<span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2">
                                <select name="countryCode" value={enquireData.countryCode} onChange={handleChange} className="p-2 border rounded">
                                    <option value="+91">+91</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                </select>
                                <input id="mobileNumber" name="mobileNumber" type="tel" value={enquireData.mobileNumber} onChange={handleChange} className="flex-1 p-2 border rounded" placeholder="Enter your mobile number" required />
                            </div>
                        </div>

                        {/* Terms and Conditions Checkbox */}
                        <div className="flex items-start gap-2 text-sm">
                            <input type="checkbox" id="terms" className="mt-1" checked={isChecked} onChange={handleCheckboxChange} />
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

                        {/* Next Button */}
                        <button type="submit" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
                            Next
                        </button>
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
                                <img src={accommodationImage} alt="Property interior showing a modern bedroom" className="w-full h-40 rounded-xl" />
                                <div className="">
                                    <h3 className="text-lg font-semibold">{accommodationName}</h3>
                                    <p className="text-sm text-gray-600">{accommodationAddress}</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-b-2" />
                        <div className="bg-white rounded-br-xl rounded-bl-xl px-4 py-2">
                            <div className="text-sm text-gray-500">Rent</div>
                            <div className="text-lg font-semibold">₹{accommodationPrice}/ month</div>
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
    );
};

export default Enquire;