"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, Building, Check, ChevronDown, ChevronRight, ChevronUp, Headphones, Pencil, ShieldCheck, Star, Tag, X, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const bookingSideBarData = {
    "Payment Policy": {
        data: [
            {
                title: "Fully Refundable Holding Fee",
                description: [
                    "A holding fee of €50 prioritizes and fast-tracks your application with our partners.",
                    "The €50 holding fee is fully refundable within 6 days of payment. A full refund is applicable whether your booking is finalized with Amber or if we are unable to find a suitable match for you.",
                ],
            },
            {
                title: "Pay in Instalments",
                description: "This property offers flexible installment plans.",
                subheadings: [
                    {
                        title: "For AY 25-26:",
                        content: ["Payment in full.", "Payment in monthly installments."],
                    },
                    {
                        title: "For AY 24-25:",
                        content: ["Pay rent in full (no guarantor required) or in 4 installments (guarantor required).", "Installment dates align with the university term for students receiving loan support or scholarships."],
                    },
                ],
            },
            {
                title: "Mode of Payment",
                description: ["Payment via easy transaction modes.", "You can pay via Credit card, debit card and Bank Transfer."],
            },
            {
                title: "Guarantor Requirement",
                description: "The property accepts non-Irish guarantors, and they do not need to be Irish residents to act as guarantors for international students.",
                subheadings: [
                    {
                        title: "However, to qualify as a guarantor, you must provide the following documents:",
                        content: ["Proof of address issued within the last three months", "Proof of identification valid within the last three months"],
                    },
                ],
            },
        ],
    },
    Offers: {
        data: [
            {
                title: "Exclusive Cashback Offer",
                description: "Earn €50 cashback by referring a friend to Amber. Win up to €10,000 through our referral program!",
            },
        ],
    },
    "Cancellation Policy": {
        data: [
            {
                title: "Cooling-Off Period",
                subheadings: [
                    {
                        title: "This property offers a cooling-off period:",
                        description: [
                            "The property offers a 7 Days Cooling Off Period wherein you can cancel your booking & your advance rental payment will be refunded to you.",
                            "The cooling off period will get reduced to 48 hours for bookings made on or after the 1st August.",
                        ],
                    },
                    {
                        title: "For summer or short stays booked before June 1, 2024:",
                        description: [
                            "1. You can cancel before 1st June 2024 with no penalty and a full refund will be given.",
                            "2. For bookings made before 1st June 2024, you will get a 5 day cooling off period in which the booking can be canceled without penalty.",
                        ],
                    },
                ],
                note: "Note: For any refunds via international bank transfers a fee of €12 will be applied.",
            },
            {
                title: "No Pay No Visa",
                description: [
                    "This property allows cancellation due to visa rejection.",
                    "If your visa application is denied, the property can cancel your booking upon receiving evidence of the refusal within 5 days.",

                    "If you encounter difficulties obtaining a visa while preparing to travel, the property will endeavor to reserve your room until your visa is processed. However, it is essential to ensure you possess the appropriate visa and confirmation of enrollment from your college/university before your arrival, where required. Maintaining visa status is the responsibility of the student. In the event of a visa delay, you may be held responsible for adhering to the terms and conditions of the license.",
                ],
            },
            {
                title: "No Place No Pay",
                description: "This property allows cancellation if admission is not secured.",
                subheadings: [
                    {
                        title: "The following is applicable to first-year undergraduate and pre-sessional post-graduate intakes only:",
                        description: [
                            "If you do not secure admission to your chosen university/college, the property will facilitate your release from the tenancy agreement and refund any advanced rent payments made, provided you can demonstrate that you did not secure a place at a university/college within a reasonable distance from the booked accommodation.",
                            "To initiate the cancellation process, you must submit your request via email along with supporting evidence within five working days of receiving confirmation that you have not obtained your place.",
                            "In the event that you were unsuccessful in securing a college place in Dublin through the CAO system, the property will refund the advanced rental fee.",
                        ],
                    },
                ],
            },
            {
                title: "Other Cancellation Policies",
                description: "General cancellation policies may apply to this property.",
                subheadings: [
                    {
                        title: "Failure to Check In",
                        description: [
                            "If you fail to check in you will remain liable to pay any rent or other fees associated with the original agreement, and they reserve the right to pursue any sums outstanding in respect of the same.",
                            "Where possible, they may remarket your room. Until a new occupant has taken over the agreement and moved in, the tenant will be liable for the terms and conditions of the agreement.",
                        ],
                    },
                    {
                        title: "Cancellation after you have moved in",
                        description: [
                            "Once you have moved into the residence, you will only be considered for a tenancy release in exceptional circumstances.",
                            "You must have withdrawn from your University or College and provided proof in the form of a withdrawal letter, signed on headed paper from the institution. You must also have a suitable letter from the doctor or medical institution detailing the issue of why you have withdrawn from the University.",
                        ],
                        exceptions: [
                            {
                                title: "Tenancy Releases for exceptional circumstances will not be granted where:",
                                description: [
                                    "1. You are still at University and have not withdrawn from your course.",
                                    "2. You have chosen to defer for a year for any reason other than above.",
                                    "3. You have left the University of your own volition for any other reason, including not attaining correct funding or loan, or suitable grades during the year.",
                                    "4. The University has removed the tenant from your course, including disciplinary reasons.",
                                ],
                            },
                        ],
                    },
                ],
                note: "Once a tenancy release decision has been made, this decision is final and any appeal of this decision will be undertaken using the framework of the property's complaints policy.",
            },
            {
                title: "Replacement Tenant Policy",
                description: "This property allows cancellation upon finding a replacement tenant.",
                subheadings: [
                    {
                        title: "Terms & Conditions",
                        description: [
                            "1. Once you have signed your tenancy and paid your booking fee online, you are bound to pay the fees in their entirety.",
                            "2. In very limited circumstances, any subsequent request to cancel will require you to find a student to replace you, who is approved by the property.",
                        ],
                    },
                ],
                note: "Note: This carries an administration fee of €100.",
            },
        ],
    },
};

const iconMap = {
    "Payment Policy": <ShieldCheck className="h-7 w-7 text-blue-500 p-1" />,
    Offers: <Tag className="h-7 w-7 text-green-500 p-1" />,
    "Cancellation Policy": <XCircle className="h-7 w-7 text-red-500 p-1" />,
    "Lowest Price Guaranteed": <BadgeCheck className="h-7 w-7 text-yellow-500 p-1" />,
    "Verified Properties": <Building className="h-7 w-7 text-purple-500 p-1" />,
    "24x7 Personal Assistance": <Headphones className="h-7 w-7 text-indigo-500 p-1" />,
    Reviews: <Star className="h-7 w-7 text-orange-500 p-1" />,
};

const BookingForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [editableStep, setEditableStep] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});
    const [formData, setFormData] = useState({
        roomType: "",
        stayDuration: "",
        moveInDate: "",
        title: "",
        fullName: "",
        birthDate: "",
        gender: "",
        code: "",
        mobileNumber: "",
        email: "",
        alternateEmail: "",
        nationality: "",
        address: "",
        country: "",
        city: "",
        zipcode: "",
        universityName: "",
        courseName: "",
        enrolmentStatus: "",
        relation: "",
        guarantorTitle: "",
        guarantorName: "",
        guarantorBirthDate: "",
        guarantorEmail: "",
        guarantorCode: "",
        guarantorMobile: "",
        guarantorAddress: "",
        guarantorCountry: "",
        guarantorCity: "",
        guarantorZipcode: "",
    });

    const handleEdit = (step) => {
        setEditableStep(step);
        setCurrentStep(step);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (selectedCategory && bookingSideBarData[selectedCategory]?.data.length > 0) {
            setExpandedSections({ 0: true });
        }
    }, [selectedCategory]);

    const handleNextStep = (e, step) => {
        e.preventDefault();
        setCurrentStep(step);
        setEditableStep(null);
    };

    const openModal = (category) => {
        setSelectedCategory(category);
    };

    const closeModal = () => {
        setSelectedCategory(null);
        setExpandedSections({});
    };

    const toggleSection = (index) => {
        setExpandedSections((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <section className="bg-[#f7f7f7]">
            <div className="max-w-6xl mx-auto px-2 py-10">
                <div className="flex gap-6 max-sm:flex-col">
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Booking Form</h1>
                            <div className="text-sm">
                                Need help? We are here{" "}
                                <a href="/contact" className="text-primary font-medium underline">
                                    Contact us
                                </a>
                            </div>
                        </div>
                        <div className="bg-[#ddf7ec] p-4 rounded-lg mb-6">
                            <div className="flex items-center gap-4 px-6 py-5">
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "easeOut",
                                        repeatDelay: 1,
                                    }}
                                    className="flex items-center justify-center w-10 h-10 bg-emerald-600 rounded-full"
                                >
                                    <Check className="h-5 w-5 text-white" />
                                </motion.div>

                                <div>
                                    <h2 className="text-lg font-semibold text-green-900 max-md:text-base max-sm:text-sm">Thanks Jatin!</h2>
                                    <p className="text-green-800 text-sm">We're excited to receive your request! Fasten up the booking by filling out the details.</p>
                                </div>
                            </div>
                        </div>
                        <div className="border rounded-lg p-6 bg-white">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={`rounded-full h-8 w-8 flex items-center justify-center font-bold border ${currentStep > 1 ? "bg-green-500 text-white" : "border-green-500"}`}>
                                        {currentStep > 1 ? <Check className="w-5 h-5" /> : "1"}
                                    </div>
                                    <h2 className="font-semibold text-lg">Accommodation Details</h2>
                                </div>
                                {currentStep > 1 && (
                                    <button onClick={() => handleEdit(1)}>
                                        <Pencil className="w-5 h-5 text-gray-600" />
                                    </button>
                                )}
                            </div>
                            {(currentStep === 1 || editableStep === 1) && (
                                <form onSubmit={(e) => handleNextStep(e, 2)} className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Room Type <span className="text-red-500">*</span>
                                        </label>
                                        <select name="roomType" value={formData.roomType} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required>
                                            <option value="" hidden>
                                                Click to Select
                                            </option>
                                            <option value="single">Single Room</option>
                                            <option value="double">Double Room</option>
                                            <option value="suite">Suite</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Stay Duration <span className="text-red-500">*</span>
                                        </label>
                                        <select name="stayDuration" value={formData.stayDuration} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-muted/50" required>
                                            <option value="" hidden>
                                                Click to Select
                                            </option>
                                            <option value="1-month">1 Month</option>
                                            <option value="3-months">3 Months</option>
                                            <option value="6-months">6 Months</option>
                                            <option value="12-months">12 Months</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Move In Date <span className="text-red-500">*</span>
                                        </label>
                                        <select name="moveInDate" value={formData.moveInDate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-muted/50">
                                            <option value="" hidden>
                                                Click to Select
                                            </option>
                                            <option value="date1">Jan 1, 2024</option>
                                            <option value="date2">Jan 15, 2024</option>
                                            <option value="date3">Feb 1, 2024</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium">Move Out Date</label>
                                        <input type="text" placeholder="Move Out Date" className="px-3 py-2 border rounded-md bg-muted/50" disabled />
                                    </div>

                                    <button type="submit" className="mt-6 p-4 gap-2 bg-purple-600 text-white rounded-md flex items-center text-base w-fit">
                                        Save and Next <ChevronRight className="ml-2 h-5 w-5" />
                                    </button>
                                </form>
                            )}
                        </div>

                        <div className="border rounded-lg p-6 bg-white">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={`rounded-full h-8 w-8 flex items-center justify-center font-bold border ${currentStep > 2 ? "bg-green-500 text-white" : "bg-gray-200"}`}>
                                        {currentStep > 2 ? <Check className="w-5 h-5" /> : "2"}
                                    </div>
                                    <h2 className="font-semibold text-lg">Personal Details</h2>
                                </div>
                                {currentStep > 2 && (
                                    <button onClick={() => handleEdit(2)}>
                                        <Pencil className="w-5 h-5 text-gray-600" />
                                    </button>
                                )}
                            </div>
                            {(currentStep === 2 || editableStep === 2) && (
                                <form onSubmit={(e) => handleNextStep(e, 3)} className="space-y-4">
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium">Title *</label>
                                            <div className="flex space-x-2">
                                                <select name="title" value={formData.title} onChange={handleChange} className="border rounded-md p-2" required>
                                                    <option value="" hidden>
                                                        Title
                                                    </option>
                                                    <option value="Mr">Mr.</option>
                                                    <option value="Ms">Ms.</option>
                                                    <option value="Miss">Miss</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-span-4">
                                            <label className="block text-sm font-medium">Your Full Name *</label>
                                            <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" className="w-full border rounded-md p-2" required />
                                        </div>
                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium">Your Date of Birth *</label>
                                            <input name="birthDate" value={formData.birthDate} onChange={handleChange} type="date" className="w-full border rounded-md p-2" required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-4">
                                            <label className="block text-sm font-medium">Gender *</label>
                                            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border rounded-md p-2">
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium">Code *</label>
                                            <div className="flex space-x-2">
                                                <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="border rounded-md p-2">
                                                    <option value="+1">+1</option>
                                                    <option value="+44">+44</option>
                                                    <option value="+91">+91</option>
                                                    <option value="+61">+61</option>
                                                    <option value="+81">+81</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium">Your Mobile Number *</label>
                                            <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} type="text" className="w-full border rounded-md p-2" required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium">Your Email Address *</label>
                                            <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full border rounded-md p-2" required />
                                        </div>

                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium">Alternate Email Address</label>
                                            <input name="alternateEmail" value={formData.alternateEmail} onChange={handleChange} type="email" className="w-full border rounded-md p-2" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Nationality *</label>
                                        <input name="nationality" value={formData.nationality} onChange={handleChange} type="text" className="w-full border rounded-md p-2" required />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">Your Full Address *</label>
                                        <textarea name="address" value={formData.address} onChange={handleChange} className="w-full border rounded-md p-2" rows="1" required></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium">Country of Residence *</label>
                                            <input name="country" type="text" value={formData.country} onChange={handleChange} className="w-full border rounded-md p-2" required />
                                        </div>

                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium">City *</label>
                                            <input name="city" value={formData.city} onChange={handleChange} type="text" className="w-full border rounded-md p-2" required />
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="block text-sm font-medium">Zipcode/Pincode *</label>
                                        <input name="zipcode" value={formData.zipcode} onChange={handleChange} type="text" className="border rounded-md p-2 w-4/12" required />
                                    </div>

                                    <h3 className="font-semibold text-lg mt-6">University Details</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium">University Name *</label>
                                            <input name="universityName" value={formData.universityName} onChange={handleChange} type="text" className="w-full border rounded-md p-2" required />
                                        </div>

                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium">Course Name</label>
                                            <input name="courseName" value={formData.courseName} onChange={handleChange} type="text" className="w-full border rounded-md p-2" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium">Enrolment Status *</label>
                                        <select name="enrolmentStatus" value={formData.enrolmentStatus} onChange={handleChange} className="border rounded-md p-2 w-5/12">
                                            <option>Enrolled</option>
                                            <option>Not Enrolled</option>
                                        </select>
                                    </div>

                                    <button type="submit" className="mt-6 p-4 gap-2 bg-purple-600 text-white rounded-md flex items-center text-base">
                                        Save & Next <ChevronRight className="w-5 h-5" />
                                    </button>
                                </form>
                            )}
                        </div>

                        <div className="border rounded-lg p-6 bg-white">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={`rounded-full h-8 w-8 flex items-center justify-center font-bold border ${currentStep === 3 ? "bg-green-500 text-white" : "bg-gray-200"}`}>
                                        {currentStep === 3 ? <Check className="w-5 h-5" /> : "3"}
                                    </div>
                                    <h2 className="font-semibold text-lg">Guarantor Details</h2>
                                </div>
                            </div>
                            {currentStep === 3 && (
                                <form className="space-y-4">
                                    <div className="grid grid-cols-12 gap-3">
                                        <div className="col-span-6">
                                            <label className="block text-sm font-medium">Your Relation With Them *</label>
                                            <input name="relation" value={formData.relation} onChange={handleChange} type="text" className="w-full border p-2 rounded" required />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium">Title *</label>
                                            <select name="guarantorTitle" value={formData.guarantorTitle} onChange={handleChange} className="border rounded-md p-2" required>
                                                <option value="" hidden>
                                                    Title
                                                </option>
                                                <option value="Mr">Mr.</option>
                                                <option value="Ms">Ms.</option>
                                                <option value="Miss">Miss</option>
                                            </select>
                                        </div>
                                        <div className="col-span-4">
                                            <label className="block text-sm font-medium">Your Guarantor's Name *</label>
                                            <input name="guarantorName" value={formData.guarantorName} onChange={handleChange} type="text" className="w-full border p-2 rounded" required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium">Their Date of Birth *</label>
                                            <input name="guarantorBirthDate" value={formData.guarantorBirthDate} onChange={handleChange} type="date" className="w-full border p-2 rounded" required />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium">Their Email Address *</label>
                                            <input name="guarantorEmail" value={formData.guarantorEmail} onChange={handleChange} type="email" className="w-full border p-2 rounded" required />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-3">
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium">Code *</label>
                                            <select name="guarantorCode" value={formData.guarantorCode} onChange={handleChange} type="text" className="w-full border p-2 rounded" required>
                                                <option value="+1">+1</option>
                                                <option value="+44">+44</option>
                                                <option value="+91">+91</option>
                                                <option value="+61">+61</option>
                                                <option value="+81">+81</option>
                                            </select>
                                        </div>
                                        <div className="col-span-3">
                                            <label className="block text-sm font-medium">Their Mobile Number *</label>
                                            <input name="guarantorMobile" value={formData.guarantorMobile} onChange={handleChange} type="tel" className="w-full border p-2 rounded" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Their Full Address *</label>
                                        <textarea name="guarantorAddress" value={formData.guarantorAddress} onChange={handleChange} className="w-full border p-2 rounded" required></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium">Country of Residence *</label>
                                            <select name="guarantorCountry" value={formData.guarantorCountry} onChange={handleChange} className="w-full border p-2 rounded" required>
                                                <option value="" hidden>
                                                    Select Country
                                                </option>
                                                <option value="USA">United States</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="India">India</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Germany">Germany</option>
                                                <option value="France">France</option>
                                                <option value="Japan">Japan</option>
                                                <option value="China">China</option>
                                                <option value="Brazil">Brazil</option>
                                                <option value="South Africa">South Africa</option>
                                            </select>
                                        </div>

                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium">City *</label>
                                            <input name="guarantorCity" value={formData.guarantorCity} onChange={handleChange} type="text" className="w-full border p-2 rounded" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Zipcode/Pincode *</label>
                                        <input name="guarantorZipcode" value={formData.guarantorZipcode} onChange={handleChange} type="text" className="w-full border p-2 rounded" required />
                                    </div>
                                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                                        Submit
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                    <div className="lg:w-[400px]">
                        <div className="overflow-hidden gap-6">
                            <div className="relative bg-white rounded-3xl border flex flex-col gap-3 p-4">
                                <img src="/image/contact-us/contact-bg.jpg" alt="Beckett House" className="w-full h-48 object-cover rounded-3xl" />
                                <div>
                                    <h2 className="font-semibold text-lg">Beckett House, Dublin</h2>
                                    <p className="text-muted-foreground text-sm">Dublin 1, County Dublin, IE</p>
                                </div>
                            </div>

                            <div className="mt-2 bg-white rounded-xl border">
                                <div className="flex flex-col">
                                    {Object.keys(bookingSideBarData).map((key) => (
                                        <button key={key} onClick={() => openModal(key)} className="px-2 py-2 hover:bg-gray-100 flex items-center gap-3 text-left w-full">
                                            {iconMap[key] || <BadgeCheck className="h-7 w-7 text-gray-500 p-1" />}
                                            {key} ({bookingSideBarData[key].data.length})
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {selectedCategory && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
                                <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={closeModal} className="absolute top-3 right-3 p-2 text-gray-600 hover:text-black">
                                        <X className="h-6 w-6" />
                                    </button>
                                    <h2 className="text-xl font-semibold mb-4">{selectedCategory}</h2>
                                    <div className="space-y-4">
                                        {bookingSideBarData[selectedCategory].data.map((item, index) => (
                                            <div key={index} className="border-b pb-4">
                                                <button onClick={() => toggleSection(index)} className="w-full flex justify-between items-center text-left rounded-md">
                                                    <h3 className="">{item.title}</h3>
                                                    {expandedSections[index] ? <ChevronUp /> : <ChevronDown />}
                                                </button>
                                                {expandedSections[index] && (
                                                    <div className="mt-2 pl-4 text-sm">
                                                        {Array.isArray(item.description) ? item.description.map((desc, idx) => <p key={idx}>{desc}</p>) : <p>{item.description}</p>}
                                                        {item.subheadings?.map((sub, idx) => (
                                                            <div key={idx} className="mt-2">
                                                                <h4 className="font-medium">{sub.title}</h4>
                                                                <div className="mt-1 pl-4">
                                                                    {sub.content?.map((point, subIdx) => (
                                                                        <p key={subIdx} className="text-sm">
                                                                            - {point}
                                                                        </p>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingForm;
