import { Search, Sliders, LocateIcon, Home, Landmark, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

const images = [
    "image/hero/img5.jpg",
    "image/hero/img6.jpg",
    "image/hero/img7.jpg",
    "image/hero/img8.webp",
];
const Hero = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-[85vh] flex flex-col md:flex-row items-center px-4 md:px-0 bg-sky-50">
            {/* Left Section */}
            <div className="items-center justify-center sm:pl-5 lg:pl-10 xl:pl-32 2xl:pl-80 w-full md:w-1/2 md:mb-20 ">
                <div className="mb-6 md:text-left pt-8 md:pt-0">
                    {/* Typewriter Effect */}
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-3">
                        <span className="text-blue-600">
                            <Typewriter
                                words={["Welcome to", "Find Your Path at"]}
                                loop={true}
                                cursor
                                cursorStyle="_"
                                typeSpeed={80}
                                deleteSpeed={50}
                                delaySpeed={2000}
                            />
                        </span>
                        <br /> College Portal
                    </h1>
                    <p className="text-gray-600 pe-8">
                        Discover endless opportunities and resources to make your academic journey extraordinary. 
                    </p>
                    <p className="text-gray-800 mt-2 font-semibold">Connect, learn, and grow with us.</p>
                </div>
                <div className="flex flex-wrap md:flex-nowrap md:space-x-1  md:justify-start">
                    <button className="px-8 py-5 font-bold text-sm rounded-lg bg-blue-600 text-white">
                        COLLEGE
                    </button>
                    <button className="px-8 py-5 font-bold text-sm rounded-lg bg-gray-200 text-black hover:bg-blue-600 hover:text-white">
                        ACCOMMODATIONS
                    </button>
                </div>
                {/* Search Section */}
                <div className="flex flex-col md:absolute md:pr-5 z-20 xl:w-2/3">
                    <div className="flex flex-col md:items-center md:flex-row gap-3 md:gap-10  bg-white py-5 lg:px-5 px-2 rounded-2xl shadow-sm">
                        <div className="flex  flex-col md:w-1/5 border-b md:border-b-0 md:border-r lg:px-2 px-1 pb-2 md:pb-0">
                            <label className="text-gray-400 text-sm">Type</label>
                            <select className=" text-black outline-none rounded-xl w-full">
                                <option>All</option>
                                <option>House</option>
                                <option>College</option>
                                <option>Accommodation</option>
                            </select>
                        </div>
                        <div className="flex flex-col w-full md:w-1/5 border-b md:border-b-0 md:border-r  lg:px-2 px-1 pb-2 md:pb-0">
                            <label className="text-gray-400 text-sm">Location</label>
                            <div className="flex items-center">
                                <input type="text" placeholder="Search Location" className=" outline-none text-black rounded-xl w-full" />
                                <LocateIcon className="w-4 h-4 text-gray-900 ml-2" />
                            </div>
                        </div>
                        <div className="flex flex-col w-full md:w-1/5 lg:px-2 ">
                            <label className="text-gray-400 text-sm">Keyword</label>
                            <input type="text" placeholder="Search Keyword" className=" outline-none text-black rounded-xl w-full" />
                        </div>
                        <div className="gap-3 flex  md:justify-start">
                            <button className="flex items-center border border-blue-600 h-12 py-1 space-x-2 px-2 sm:px-5 bg-white hover:bg-blue-600 hover:text-white text-black font-semibold rounded-3xl">
                                <span>Advanced</span>
                                <Sliders className="w-5 h-5" />
                            </button>
                            <button className="flex items-center border space-x-2 h-12 sm:px-3 px-3  md:px-5 py-2 border-blue-600 bg-blue-600 text-white rounded-3xl">
                                <span>Search</span>
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    {/* Property Type Icons */}
                    <div className="mt-2 ml-2 lg:flex  items-center">
                        <p className="text-base ml-4 lg:ml-0">What are you looking for:</p>
                        <div className="flex gap-2 lg:gap-1 xl:gap-2 overflow-x-auto scrollbar-hide pr-16 ">
                            {[{ icon: Home, label: "House" }, { icon: Landmark, label: "College" }, { icon: Briefcase, label: "Accommodation" }].map((item, index) => (
                                <div key={index} className="flex items-center gap-2 lg:gap-1 xl:gap-2 p-2 lg:p-0 xl:p-2 rounded-lg">
                                    <item.icon className="w-4 h-4 text-blue-700" />
                                    <p className="text-base whitespace-nowrap">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            {/* Right Section - Image */}
            <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full z-10 overflow-hidden ">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt="House"
                        className={`w-full h-full object-cover absolute transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;