"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import "leaflet/dist/leaflet.css";
import Link from 'next/link';
import img1 from '../../../../public/image/pages/img1.avif';
import img2 from '../../../../public/image/pages/img2.avif';
import Image from 'next/image';
import { API_NODE_URL, API_KEY } from "../../../../config/config";
import dynamic from "next/dynamic";
import { useMap } from "react-leaflet";
import { FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown } from "react-icons/fa";


// 📌 Dynamic imports for Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

// 📌 Custom hook to update map center & zoom dynamically
const MapUpdater = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    map.invalidateSize(); // Fixes issues with dynamic loading
    map.flyTo(position, 13, { animate: true });
  }, [map, position]);

  return null;
};

// 📌 Main Map Component for Property Location
const PropertyMap = ({ property }) => {
  const [L, setLeaflet] = useState(null);
  const [customMarker, setCustomMarker] = useState(null);

  // 📌 Load Leaflet library on client-side only
  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setLeaflet(leaflet);
      setCustomMarker(
        new leaflet.Icon({
          iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg", // Custom icon URL
          iconSize: [25, 25], // Adjust marker size
          className: "ping-marker", // Apply ping effect
        })
      );
    });
  }, []);

  if (!L || !customMarker) return <p>Loading map...</p>; // Ensure Leaflet is loaded before rendering

  // 📌 Default location for the map based on property's latitude and longitude
  const position = [property.location.latitude, property.location.longitude];

  return (
    <div className="h-[300px] lg:h-[600px] bg-gray-200 rounded-lg relative">
      <MapContainer center={position} zoom={13} className="w-full h-full">
        {/* 📌 OpenStreetMap Tile Layer */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 📌 Update map position smoothly */}
        <MapUpdater position={position} />

        {/* 📌 Display marker for the property */}
        <Marker
          position={position}
          icon={customMarker}
          eventHandlers={{
            add: (e) => {
              // Open the popup as soon as the marker is added to the map
              e.target.openPopup();
            },
          }}
        >
          <Popup autoClose={false} closeOnClick={false}>
            <div className="text-center">
              <p className="font-semibold">{property.location.locality}, {property.location.city}</p>
              <p>{property.location.state}, {property.location.country}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

const Pages = ({ id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [property, setProperty] = useState(null);
  const [allProperties, setAllProperties] = useState([]);


  // Static data
  const images = [img1, img2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPreviousBtn = () => {
    setCurrentIndex((previndex) => (previndex === 0 ? images.length - 1 : previndex - 1));
  };
  const goToNextBtn = () => {
    setCurrentIndex((previndex) => (previndex + 1) % images.length);
  };

  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [showAll, setShowAll] = useState(false);
  const offers = [
    "Snag £200 Cashback On Select Rooms!",
    "Snag £200 Cashback On Select Rooms!",
    "Exclusive Cashback Of £50 For Referring A Friend On Amber!",
    "Get An Additional £20 Cashback By Booking Via The Amber App",
  ];
  const visibleOffers = showAll ? offers : offers.slice(0, 2);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const propertyInfo =
    "Strategically positioned for academic convenience, iQ East Court London at 450 Mile End Rd, E1 4GG stands as a preferred choice for student accommodation in London. Offering a variety of room types, providing a wide range of different types of studios so students have an array of options to suit their preferences. Renowned institutions like Queen Mary University of London (Mile End), Queen Mary University (Whitechapel), and Hult International Business School are easily accessible, substantiating why iQ East Court London is a prime choice.";

  const tabs = [
    {
      id: "Studio1",
      label: "Studio 1",
      title: "Studio One",
      content: "This is Studio 1 content. All-in-one space with a bedroom, private bathroom, living area, and kitchenette — Ideal for complete independence",
      img: img1,
      availableFrom: "15 Feb, 2025",
      price: "389",
      features: ["Studio", "Entire Place", "Private Bathroom", "Private Kitchen", "14 sqm"],
    },
    {
      id: "Studio2",
      label: "Studio 2",
      title: "Studio Two",
      content: "This is Studio 2 content. All-in-one space with a bedroom, private bathroom, living area, and kitchenette — Ideal for complete independence",
      img: img1,
      availableFrom: "1 Mar, 2025",
      price: "420",
      features: ["Studio", "Entire Place", "Private Bathroom", "Private Kitchen", "16 sqm"],
    },
    {
      id: "Studio1",
      label: "Studio 1",
      title: "Studio One",
      content: "This is Studio 1 content. All-in-one space with a bedroom, private bathroom, living area, and kitchenette — Ideal for complete independence",
      img: img1,
      availableFrom: "15 Feb, 2025",
      price: "389",
      features: ["Studio", "Entire Place", "Private Bathroom", "Private Kitchen", "14 sqm"],
    },
    {
      id: "Studio1",
      label: "Studio 1",
      title: "Studio One",
      content: "This is Studio 1 content. All-in-one space with a bedroom, private bathroom, living area, and kitchenette — Ideal for complete independence",
      img: img1,
      availableFrom: "15 Feb, 2025",
      price: "389",
      features: ["Studio", "Entire Place", "Private Bathroom", "Private Kitchen", "14 sqm"],
    },
  ];
  const tenancies = [
    { id: 1, tabId: "Studio1", duration: "29 weeks", moveIn: "15 Feb, 2025", moveOut: "6 Sept, 2025", price: "389" },
    { id: 2, tabId: "Studio2", duration: "40 weeks", moveIn: "1 Mar, 2025", moveOut: "10 Dec, 2025", price: "420" },
    { id: 3, tabId: "Studio2", duration: "52 weeks", moveIn: "15 Apr, 2025", moveOut: "30 Apr, 2026", price: "450" },
    { id: 4, tabId: "Studio1", duration: "29 weeks", moveIn: "15 Feb, 2025", moveOut: "6 Sept, 2025", price: "389" },
    { id: 5, tabId: "Studio1", duration: "29 weeks", moveIn: "15 Feb, 2025", moveOut: "6 Sept, 2025", price: "389" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [openAccordion, setOpenAccordion] = useState('Studio1');
  const [openTenancies, setOpenTenancies] = useState(false);
  const uniqueTabs = Array.from(new Set(tabs.map((tab) => tab.id))).map((id) => tabs.find((tab) => tab.id === id));
  const filteredTenancies = tenancies.filter((tenancy) => tenancy.tabId === activeTab);

  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);

  const faqs = [
    { question: "Are sites secure?", answer: "Instant booking allows you to quickly book the property by paying the amount." },
    { question: "What payment methods are accepted?", answer: "You can pay via credit card, debit card, and bank transfer." },
    { question: "Can I cancel my booking?", answer: "Yes, but cancellation policies vary by property. Please check the terms before booking." },
    { question: "Is Wi-Fi included in the rent?", answer: "Yes, high-speed Wi-Fi is included in the rental price." },
    { question: "Do I need to pay a deposit?", answer: "Yes, a security deposit is required and refundable upon lease completion." },
    { question: "Are pets allowed?", answer: "Pets are allowed in select properties. Check the listing details." },
    { question: "What is the minimum lease period?", answer: "Most properties require a minimum lease of 6 months." },
    { question: "Do I need to provide any documents for booking?", answer: "Yes, ID proof and income verification may be required." },
  ];
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showfaqsAll, setShowfaqsAll] = useState(false);
  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const [view, setView] = useState("map");
  const [activeAddressTab, setAddressActiveTab] = useState("addressTab1"); // Default active tab

  const ratings = [
    { title: "Location", rating: "4.5/5", icon: <i className="fa-solid fa-star mx-2 fa-sx"></i> },
    { title: "Staff & Management", rating: "4.0/5", icon: <i className="fa-solid fa-star mx-2 fa-sx"></i> },
    { title: "Social Experience", rating: "4.0/5", icon: <i className="fa-solid fa-star mx-2 fa-sx"></i> },
    { title: "Amenities", rating: "4.0/5", icon: <i className="fa-solid fa-star mx-2 fa-sx"></i> },
  ];
  const reviews = [
    {
      name: "Jacob F",
      rating: "5.0",
      text: "I've lived here for two years now and I am yet to encounter anything that can be deemed as a negative. The staff is incredibly helpful and very kind....",
      images: [img1, img2],
    },
    {
      name: "Vaishnavi V",
      rating: "5.0",
      text: "I've stayed here for the past year and I've had one of the best experiences. The rooms are bright, vibrant and of a decent size. The property has excellent facilities...",
      images: [img1, img2],
    },
    {
      name: "Mavi F",
      rating: "4.8",
      text: "It has been a great place to live since moving in. Every place has its issues but honestly, the team helped me when I contacted...",
      images: [img1, img2],
    },
  ];

  const properties = [
    {
      id: 1,
      image: img1,
      title: "GoBritanya White City Residence",
      location: "London, England, GB",
      price: "£495",
    },
    {
      id: 2,
      image: img2,
      title: "GoBritanya Lewisham Residence",
      location: "London, England, GB",
      price: "£375",
    },
    {
      id: 3,
      image: img1,
      title: "Host View Studios, London",
      location: "London, England, GB",
      price: "£355",
    },
    {
      id: 4,
      image: img2,
      title: "North Lodge, London",
      location: "London, England, GB",
      price: "£250",
    },
    {
      id: 5,
      image: img1,
      title: "Rahere Court, London",
      location: "London, England, GB",
      price: "£325",
    },
  ];
  const [currentPropertiesIndex, setCurrentPropertiesIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 1024) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(4);
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);
  const prevPropertiesSlide = () => {
    setCurrentPropertiesIndex((prev) => (prev === 0 ? properties.length - itemsPerPage : prev - 1));
  };
  const nextPropertiesSlide = () => {
    setCurrentPropertiesIndex((prev) => (prev >= properties.length - itemsPerPage ? 0 : prev + 1));
  };

  const mapRef = useRef(null);
  const scrollToMap = () => {
    console.log("Button clicked!"); // Debugging log
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Fetch property details
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`${API_NODE_URL}accommodation/all-accommodations`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const text = await response.text();
        const data = JSON.parse(text);
        console.log(data);

        if (Array.isArray(data.data)) {
          setAllProperties(data.data); // Store all accommodations
          const foundProperty = data.data.find((item) => item._id === id);
          console.log(foundProperty);
          if (foundProperty) {
            setProperty(foundProperty); // Set the entire property object
          } else {
            setError("Property not found");
          }
        } else {
          setError("Unexpected API response structure");
        }
      } catch (error) {
        setError("Error fetching property details");
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading property details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!property) {
    return <div className="text-center py-10 text-red-500">Property not found.</div>;
  }


    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-12 sm:col-span-1 md:col-span-8 lg:col-span-8 xl:col-span-8 2xl:col-span-8 overflow-y-auto max-h-[100vh] no-scrollbar">
                    <div className="border border-1 border-t-0 rounded-lg p-6 mb-3">
                    <p className="UniColor text-l my-1">
                        {property.location?.country} / {property.location?.state} / {property.location?.city}
                    </p>                        
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 sm:col-span-8 md:col-span-9 lg:col-span-9 xl:col-span-9 2xl:col-span-9 bg-white flex items-center">
                                <div className="m-3 w-full">
                                    <div className="relative w-full h-[400px]">
                                        <div className="relative w-full h-full overflow-hidden rounded-lg">
                                        {property.meta.images.length > 0 && (
                                            <Image
                                                src={property.meta.images[currentIndex]}
                                                alt="property banner"
                                                className="w-full h-full object-cover"
                                                width={500} // Adjust width accordingly
                                                height={400} // Adjust height accordingly
                                            />
                                        )}
                                        </div>
                                        <div className="absolute top-2 left-2 bg-white text-green-700 text-sm px-3 py-1 rounded-md">
                                            Immediate Move-In
                                        </div>
                                        <div className="absolute bottom-2 left-2 bg-white text-black text-sm px-3 py-1 rounded-full">
                                            <i className="fa-solid fa-star mx-2 fa-xs text-green-700"></i>{property?.reviewsRating || "N/A"} ({property?.reviewsCount || 0})
                                        </div>
                                        <button
                                            onClick={goToPreviousBtn}
                                            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full shadow-lg focus:outline-none"
                                        >
                                            <i className="fa-solid fa-chevron-left"></i>
                                        </button>
                                        <button
                                            onClick={goToNextBtn}
                                            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full shadow-lg focus:outline-none"
                                        >
                                            <i className="fa-solid fa-chevron-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-4 md:col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-3 bg-white flex items-center">
                                <div className="flex flex-col space-y-3 p-3 w-full">
                                    
                                    {/* First item: Use <video> instead of <Image> for videos */}
                                    {property?.meta?.videos?.length > 0 ? (
                                    <video
                                        controls
                                        className="rounded w-full h-[120px] object-cover"
                                    >
                                        <source src={property.meta.videos[0]} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    ) : (
                                    <div className="rounded w-full h-[120px] bg-gray-200 flex items-center justify-center">
                                        No Video Available
                                    </div>
                                    )}

                                    {/* Second and third images from meta.images */}
                                    {[0, 1].map((index) =>
                                    property?.meta?.images?.[index] ? (
                                        <Image
                                        key={index}
                                        src={property.meta.images[index]}
                                        alt="Property Image"
                                        className="rounded w-full h-[120px] object-cover"
                                        width={200}
                                        height={120}
                                        />
                                    ) : (
                                        <div key={index} className="rounded w-full h-[120px] bg-gray-200 flex items-center justify-center">
                                        No Image Available
                                        </div>
                                    )
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 my-2 lg:grid-cols-6">
                            <button className="flex flex-1 items-center justify-center space-x-2 hover:bg-gray-200 border border-black p-1 rounded-lg w-full">
                                <i className="fa-solid fa-camera"></i>
                                <span className="text-sm">Photos</span>
                            </button>
                            <button className="flex flex-1 items-center justify-center space-x-2 hover:bg-gray-200 border border-black p-1 rounded-lg w-full">
                                <i className="fa-regular fa-circle-play"></i>
                                <span className="text-sm">Videos</span>
                            </button>
                            <button className="flex flex-1 items-center justify-center space-x-2 hover:bg-gray-200 border border-black p-1 rounded-lg w-full">
                                <i className="fa-solid fa-cube"></i>
                                <span className="text-sm">3D Views</span>
                            </button>
                            <button onClick={scrollToMap} className="flex flex-1 items-center justify-center space-x-2 hover:bg-gray-200 border border-black p-1 rounded-lg w-full">
                                <span className="text-sm">Map View</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-12 gap-3 my-5 items-center">
                        <div className="col-span-12 md:col-span-9">
                        {/* Property Name */}
                        <h1 className="text-lg md:text-2xl font-bold">{property?.name || "Property Name"}</h1>

                        {/* Location */}
                        <p className="text-sm md:text-base text-gray-500">
                            {property?.location?.route}, {property?.location?.locality}, {property?.location?.city}, {property?.location?.state}, {property?.location?.country}
                        </p>

                        {/* Distance & Map */}
                        <div className="flex items-center space-x-3 my-3">
                            {property?.meta?.images?.[0] ? (
                            <Image
                                src={property.meta.images[0]}
                                alt="map"
                                className="w-12 h-auto rounded-md"
                                width={230}
                                height={180}
                            />
                            ) : (
                            <div className="w-12 h-auto rounded-md bg-gray-200 flex items-center justify-center">
                                No Image
                            </div>
                            )}

                            <div className="text-sm space-y-1">
                            <p>{property?.meta?.distance || "N/A"} mi from City Center</p>
                            <p>(26m · 31m · 1h 27m)</p>
                            <p className="text-blue-600 cursor-pointer font-semibold" onClick={scrollToMap}>
                                View map
                            </p>
                            </div>
                        </div>
                                <div className="col-span-12 space-y-2 md:col-span-3 gap-2 xl:flex text-sm">
                                    <p className="flex items-center gap-2 p-2 border border-gray-300 rounded-full">
                                        <i className="fa-solid fa-graduation-cap"></i>
                                        Queen Mary University of London | 0.11 mi
                                    </p>
                                    <p className="flex items-center gap-2 p-2 border border-gray-300 rounded-full">
                                        <i className="fa-solid fa-graduation-cap"></i>
                                        University of Cumbria London | 1.04 mi
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-3 md:text-right l:text-right space-y-1">
                                <p className="text-sm text-gray-500">From</p>
                                <h1 className="text-lg md:text-2xl font-bold">
                                    <i className="fa-solid fa-indian-rupee-sign"></i> 389
                                </h1>
                                <p className="text-sm text-gray-500">per week</p>
                            </div>
                        </div>

                        <div className="my-3 flex flex-wrap justify-start md:justify-start gap-2">
                        {property?.amenities?.map((amenity, index) => (
                            <button key={index} className="flex justify-between border p-2 gap-1 rounded-full">
                            <i className="fa-regular fa-circle-check UniColor"></i>
                            <span className="text-xs font-medium">{amenity}</span>
                            </button>
                        ))}

                        {/* View All Button */}
                        <button onClick={() => setIsAmenitiesModalOpen(true)} className="flex justify-between p-2 gap-1">
                            <span className="text-xs font-medium UniColor">View All</span>
                        </button>
                        </div>

                    </div>

                    <div className='border border-1 rounded-lg p-6 my-3'>
                        <h2 className="text-xl font-semibold mb-3">Offers ({offers.length})</h2>
                        <div className="space-y-2">
                            {visibleOffers.map((offer, index) => (
                                <div key={index} className="flex justify-between items-center border-b py-2 last:border-b-0">
                                    <div className="flex items-center gap-2">
                                        <i className="fa-solid fa-tag UniColor"></i>
                                        <span>{offer}</span>
                                    </div>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </div>
                            ))}
                        </div>
                        <button
                            className="text-red-500 mt-2 flex items-center"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? "View less offers" : "View more offers"}
                            {showAll ? <i className="fa-solid fa-chevron-right"></i> : <i className="fa-solid fa-chevron-right"></i>}
                        </button>
                    </div>

                    <div className='border border-1 rounded-lg p-6 my-3'>
                        <h2 className="text-xl font-semibold mb-3">About the Property</h2>

                        {/* Short Description */}
                        <p className="text-gray-700">
                            {property?.description?.short_description}
                        </p>

                        {/* Show More Button */}
                        <button
                            className="text-red-500 mt-2 flex items-center"
                            onClick={() => setIsModalOpen(true)}>
                            Show more
                            <i className="fa-solid fa-chevron-right ml-1"></i>
                        </button>

                        {/* Modal for Long Description */}
                        {isModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
                                    {/* Modal Header */}
                                    <div className="flex justify-between items-center border-b pb-2">
                                        <h2 className="text-xl font-semibold">About the Property</h2>
                                        <button onClick={() => setIsModalOpen(false)}>
                                            <i className="fa-solid fa-xmark text-gray-600 hover:text-black"></i>
                                        </button>
                                    </div>

                                    {/* Long Description */}
                                    <p className="text-gray-500 mt-4">
                                        {property?.description?.long_description}
                                    </p>

                                    {/* Close Button */}
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                            onClick={() => setIsModalOpen(false)}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className='border border-1 rounded-lg p-6 my-3'>
                            <h2 className="text-xl font-semibold mb-3">Room Types ({uniqueTabs.length})</h2>
                            <div className="flex">
                                {uniqueTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-4 py-2 text-l font-medium border-b-2 ${activeTab === tab.id ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500"
                                            } hover:text-blue-500`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected Room Data */}
                        {uniqueTabs.map((tab) =>
                            activeTab === tab.id && (
                                <div key={tab.id} className="border border-1 rounded-lg p-6 my-3">
                                    <div className="flex justify-start">
                                        <i className="fa-solid fa-box p-3 bg-gray-200 rounded"></i>
                                        <p className="mx-3 text-lg font-bold">{tab.title}</p>
                                    </div>
                                    <div className="flex justify-between my-2">
                                        <p className="text-sm">{tab.content}</p>
                                        <button onClick={() => setOpenAccordion(openAccordion === tab.id ? null : tab.id)}>
                                            <i className={`fa-solid ${openAccordion === tab.id ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        )}

                        {/* Room Details */}
                        {uniqueTabs.map((tab) =>
                            activeTab === tab.id && openAccordion === tab.id && (
                                <div key={tab.id} className="border border-1 rounded-lg p-6 my-2">
                                    <div className='grid grid-cols-12 gap-1 mx-auto'>
                                        <div className="col-span-3">
                                            <img src={tab.img} alt={tab.title} className='rounded h-50 w-50' />
                                        </div>
                                        <div className="col-span-9 p-2">
                                            <h1 className='font-bold text-lg mb-4'>{tab.title}</h1>
                                            <p className='text-l'>Available From: {tab.availableFrom} · Starting From: <span className='font-bold'><i className="fa-solid fa-indian-rupee-sign"></i>{tab.price}/week</span></p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center text-s my-2 gap-3">
                                                {tab.features.map((feature, index) => (
                                                    <div key={index} className="flex items-center justify-center md:justify-start gap-2">
                                                        <i className="fa-solid fa-circle-check text-sm mt-0.5"></i>
                                                        <p className="text-sm">{feature}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className='UniColor text-m mt-3'>View More Details <i className="fa-solid fa-chevron-right"></i></p>
                                        </div>
                                    </div>

                                    {/* Filtered Tenancies */}
                                    <div>
                                        {filteredTenancies.slice(0, openTenancies ? filteredTenancies.length : 2).map((tenancy, index) => (
                                            <div key={index} className='grid grid-cols-1 lg:border-b-2 lg:grid lg:grid-cols-12 gap-1 mx-auto'>
                                                <div className="col-span-8 p-2 flex justify-between">
                                                    <p className='text-sm'>Duration <br /><span className='font-bold text-sm'>{tenancy.duration}</span></p>
                                                    <p className='text-sm'>Move In <br /><span className='font-bold text-sm'>{tenancy.moveIn}</span></p>
                                                    <p className='text-sm'>Move Out <br /><span className='font-bold text-sm'>{tenancy.moveOut}</span></p>
                                                </div>
                                                <div className='col-span-1'></div>
                                                <div className="col-span-2 p-2">
                                                    <div className='flex justify-between space-x-3'>
                                                        <p className='text-m font-bold'>{tenancy.price}/week</p>
                                                        <button className='text-white UniBgColor py-1 px-4 rounded'>Book</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {filteredTenancies.length > 2 && (
                                            <div className='mx-auto my-2 flex justify-end'>
                                                <button onClick={() => setOpenTenancies(!openTenancies)} className="UniColor">
                                                    {openTenancies ? "View Less Tenancies" : `View More Tenancies (${filteredTenancies.length - 2})`}
                                                    <i className={`fa-solid mx-3 ${openTenancies ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <div className='border border-1 rounded-lg p-6 my-3'>
                        <h2 className="text-xl mb-3 font-bold">Amenities</h2>
                        <div>
                            <div className='border-t-2'>
                                <p className="text-gray-700 text-l mt-3 font-bold">
                                    Bills Included
                                </p>
                                <div>
                                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto p-6'>
                                        {property?.tags?.map((tag, index) => (
                                            <div key={index} className='col-span-1'>
                                                <p className="text-gray-700 capitalize">{tag}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='border-t-2'>
                                <p className="text-gray-700 mt-3 text-l font-bold">
                                    Common Amenities
                                </p>
                                <div>
                                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto p-6'>
                                        {property?.amenities?.map((amenity, index) => (
                                            <div key={index} className='col-span-1'>
                                                <p className="text-gray-700">{amenity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className="text-red-500 flex items-center"
                            onClick={() => setIsAmenitiesModalOpen(true)}>
                            View all amenities ({(property?.tags?.length || 0) + 
                                                (property?.amenities?.length || 0) + 
                                                (property?.rules?.length || 2) + 
                                                (property?.safety?.length || 3)})
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                        {/* Modal */}
                        {isAmenitiesModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-screen flex flex-col">
                                    {/* Header (Fixed) */}
                                    <div className="flex justify-between items-center pb-2">
                                        <h2 className="text-xl font-semibold">Amenities</h2>
                                        <button onClick={() => setIsAmenitiesModalOpen(false)}>
                                            <i className="fa-solid fa-xmark text-gray-600 hover:text-black"></i>
                                        </button>
                                    </div>

                                    {/* Scrollable Content */}
                                    <div className="overflow-y-auto max-h-[70vh] p-4 scrollbar-hidden">
                                        {/* Bills Included */}
                                        <div className='border-t-2'>
                                        <p className="text-gray-700 mt-3 font-bold text-l">Bills Included</p>
                                        
                                        {/* Community Facts (Displayed as a single paragraph) */}
                                        {property?.meta?.communityFacts?.inc && (
                                            <p className="text-gray-700 p-2">{property.meta.communityFacts.inc}</p>
                                        )}
                                        
                                        {/* Tags (Displayed in a grid format) */}
                                        <div className='grid grid-cols-2 gap-4 p-2'>
                                            {property?.tags?.map((tag, index) => (
                                                <p key={index} className="text-gray-700 capitalize">{tag}</p>
                                            ))}
                                        </div>
                                        </div>

                                        {/* Common Amenities */}
                                        <div className='border-t-2 mt-4'>
                                            <p className="text-gray-700 mt-3 font-bold text-l">Common Amenities</p>
                                            <div className='grid grid-cols-2 gap-4 p-2'>
                                                {property?.amenities?.map((amenity, index) => (
                                                    <p key={index} className="text-gray-700">{amenity}</p>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Property Rules */}
                                        <div className='border-t-2 mt-4'>
                                            <p className="text-gray-700 mt-3 font-bold text-l">Property Rules</p>
                                            <div className='grid grid-cols-2 gap-4 p-2'>
                                                <p className="text-gray-700">No Pets Allowed</p>
                                                <p className="text-gray-700">No Smoking Allowed</p>
                                            </div>
                                        </div>

                                        {/* Safety and Security */}
                                        <div className='border-t-2 mt-4'>
                                            <p className="text-gray-700 mt-3 font-bold text-l">Safety and Security</p>
                                            <div className='grid grid-cols-2 gap-4 p-2'>
                                                <p className="text-gray-700">24/7 Staff Presence</p>
                                                <p className="text-gray-700">24/7 Security</p>
                                                <p className="text-gray-700">CCTV</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer (Fixed) */}
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                            onClick={() => setIsAmenitiesModalOpen(false)}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='border border-1 rounded-lg p-6 my-3'>
  <h2 className="text-xl font-semibold mb-3">Cancellation Policies (6)</h2>
  <div className="space-y-2">
    <div className="flex justify-between items-center border-t-2 py-2 last:border-b-0">
      <div className="flex justify-between">
        <i className="fa-solid fa-star UniColor mx-2 fa-sx"></i>
        <p className='text-black mx-3'>Cooling Off Period <br></br><span>This property  <span className='font-bold'>offers</span> cooling-off period.</span></p>
      </div>
      <i className="fa-solid fa-chevron-right"></i>
    </div>
    <div className="flex justify-between items-center border-t-2 py-2 last:border-b-0">
      <div className="flex justify-between">
        <i className="fa-solid fa-star UniColor mx-2 fa-sx"></i>
        <p className='text-black mx-3'>No Visa No Pay <br></br><span>This property  <span className='font-bold'>allows</span> cooling-off period.</span></p>
      </div>
      <i className="fa-solid fa-chevron-right"></i>
    </div>
    <div className="flex justify-between items-center border-t-2 py-2 last:border-b-0">
      <div className="flex justify-between">
        <i className="fa-solid fa-star UniColor mx-2 fa-sx"></i>
        <p className='text-black mx-3'>Cooling Off Period <br></br><span>This property  <span className='font-bold'>offers</span> cooling-off period.</span></p>
      </div>
      <i className="fa-solid fa-chevron-right"></i>
    </div>
  </div>
</div>

                    <div className='border border-1 rounded-lg p-6 my-3'>
                        <h2 className="text-xl font-semibold mb-3">Payment Policies (4)</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center border-t-2 py-2 last:border-b-0">
                                <div className="flex justify-between">
                                    <i className="fa-solid fa-star UniColor mx-2 fa-sx"></i>
                                    <p className='text-black mx-3'>Booking Deposit <br></br><span>This property  <span className='font-bold'>offers</span> cooling-off period.</span></p>
                                </div>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                            <div className="flex justify-between items-center border-t-2 py-2 last:border-b-0">
                                <div className="flex justify-between">
                                    <i className="fa-solid fa-star UniColor mx-2 fa-sx"></i>
                                    <p className='text-black mx-3'>Pay In Instalment <br></br><span>This property  <span className='font-bold'>allows</span> cooling-off period.</span></p>
                                </div>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                            <div className="flex justify-between items-center border-t-2 py-2 last:border-b-0">
                                <div className="flex justify-between">
                                    <i className="fa-solid fa-star UniColor mx-2 fa-sx"></i>
                                    <p className='text-black mx-3'>Mode Of Payment <br></br><span>This property  <span className='font-bold'>offers</span> cooling-off period.</span></p>
                                </div>
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>

                    <div className='border border-1 rounded-lg p-6 my-3'>
                        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>
                        <div className="w-full mx-auto my-3">
                            <input
                                type="text"
                                placeholder="Enter your query or topic here"
                                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className='my-4'>
                            <div className="w-full mx-auto">
                                {faqs.slice(0, showfaqsAll ? faqs.length : 6).map((faq, index) => (
                                    <div key={index} className="my-2 border-t">
                                        <button
                                            onClick={() => toggleFAQ(index)}
                                            className="w-full flex justify-between items-center p-3 text-left"
                                        >
                                            <span>{faq.question}</span>
                                            <i className={`fa-solid ${expandedIndex === index ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                                        </button>
                                        {expandedIndex === index && (
                                            <div className="p-4 bg-gray-100">
                                                <p>{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {!showfaqsAll && faqs.length > 6 && (
                                    <button
                                        onClick={() => setShowfaqsAll(true)}
                                        className="mt-4 UniColor">
                                        View All Questions
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4" >
                    <div className='border border-1 rounded-lg p-3 my-2 pb-5 '>
                        <div className='flex justify-between my-3'>
                            <h2 className="text-m font-semibold">{property.name}, {property.location.city}</h2>
                            <div className='mb-2'>
                                <button className='rounded-full p-1.5 mx-1 border border-1 text-sm'><i className="fa-regular fa-heart fa-sm"></i></button>
                                <button className='rounded-full p-1.5 mx-1 border border-1 text-sm'><i className="fa-solid fa-arrow-up-from-bracket fa-sm"></i></button>
                            </div>
                        </div>
                        <button className="w-full border-red-500 text-red-500 outline-red-500 py-2 rounded-md shadow-md ">
                            View Rooms
                        </button>
                        <button className="w-full text-white bg-red-500  py-2 rounded-md shadow-md mt-3">
                            Enquire Now
                        </button>
                    </div>
                    <div className='border border-1 rounded-lg p-3 my-2'>
                        <div className="w-full max-w-md mx-auto">
                            <div className="text-sm">
                                <button
                                    onClick={() => toggleAccordion(0)}
                                    className="w-full flex justify-between p-3 border-b"
                                >
                                    Instant Booking
                                    {openIndex === 0 ? (
                                        <FaChevronUp className="w-4 h-4" />
                                    ) : (
                                        <FaChevronDown className="w-4 h-4" />
                                    )}
                                </button>
                                {openIndex === 0 && (
                                    <div className="p-4">
                                        <p>Instant booking allows you to quickly book the property by paying the amount.</p>
                                    </div>
                                )}
                            </div>

                            <div className="text-sm">
                                <button
                                    onClick={() => toggleAccordion(1)}
                                    className="w-full flex justify-between p-3 border-b"
                                >
                                    Lowest Price Guaranteed
                                    {openIndex === 1 ? (
                                        <FaChevronUp className="w-4 h-4" />
                                    ) : (
                                        <FaChevronDown className="w-4 h-4" />
                                    )}
                                </button>
                                {openIndex === 1 && (
                                    <div className="p-4">
                                        <p>We guarantee to match the price of your accommodation if you find an identical offer on another.</p>
                                        <u><Link href="#">Learn More</Link></u>
                                    </div>
                                )}
                            </div>

                            <div className="text-sm">
                                <button
                                    onClick={() => toggleAccordion(2)}
                                    className="w-full flex justify-between p-3 border-b"
                                >
                                    Verified Properties
                                    {openIndex === 2 ? (
                                        <FaChevronUp className="w-4 h-4" />
                                    ) : (
                                        <FaChevronDown className="w-4 h-4" />
                                    )}
                                </button>
                                {openIndex === 2 && (
                                    <div className="p-4">
                                        <p>We guarantee that what you see on our website is exactly what you'll get.</p>
                                    </div>
                                )}
                            </div>

                            <div className="text-sm">
                                <button
                                    onClick={() => toggleAccordion(3)}
                                    className="w-full flex justify-between p-3 border-b"
                                >
                                    24x7 Personal Assistance
                                    {openIndex === 3 ? (
                                        <FaChevronUp className="w-4 h-4" />
                                    ) : (
                                        <FaChevronDown className="w-4 h-4" />
                                    )}
                                </button>
                                {openIndex === 3 && (
                                    <div className="p-4">
                                        <p>For any doubts or queries, a quick call is all it takes - we're here to assist you promptly.</p>
                                    </div>
                                )}
                            </div>

                            <div className="text-sm">
                                <button
                                    onClick={() => toggleAccordion(4)}
                                    className="w-full flex justify-between p-3 border-b"
                                >
                                    5.8K+ Reviews
                                    {openIndex === 4 ? (
                                        <FaChevronUp className="w-4 h-4" />
                                    ) : (
                                        <FaChevronDown className="w-4 h-4" />
                                    )}
                                </button>
                                {openIndex === 4 && (
                                    <div className="p-4">
                                        <p>We've earned an excellent rating from over 5,800+ students for our outstanding services.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section ref={mapRef} >
                <div className='md:grid md:gap-6 mx-auto p-6 overflow-y-auto max-h-[screen] scrollbar-hidden'>
                    <div className='border border-1 rounded-lg p-3 my-2 pb-5 '>
                        <div className='flex justify-between'>
                            <h1 className='text-l md:text-2xl font-bold'>Nearby Locations and Map</h1>
                            <div className=' md:flex justify-between'>
                                <button
                                    onClick={() => setView("map")}
                                    className={`px-6 py-2 rounded-lg text-sm ${view === "map" ? "border border-2 text-black" : "bg-gray-200"}`}>
                                    Map View
                                </button>
                                <button
                                    onClick={() => setView("street")}
                                    className={`px-6 py-2 rounded-lg text-sm ${view === "map" ? "border border-2 text-black" : "bg-gray-200"}`}>
                                    Street View
                                </button>
                            </div>
                        </div>
                        <div className='my-5'>
                            {view === "map" ? (
                                <div className="p-2">
                                    {/* Tab Buttons */}
                                    <div className="md:flex border-b">
                                        <button
                                            onClick={() => setAddressActiveTab("addressTab1")}
                                            className={`px-6 py-2 text-m font-semibold ${activeTab === "tab1" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
                                                }`}
                                        >
                                            Universities
                                        </button>
                                        <button
                                            onClick={() => setAddressActiveTab("addressTab2")}
                                            className={`px-6 py-2 text-m font-semibold ${activeTab === "tab2" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
                                                }`}
                                        >
                                            Bus Stations
                                        </button>
                                        <button
                                            onClick={() => setAddressActiveTab("addressTab3")}
                                            className={`px-6 py-2 text-m font-semibold ${activeTab === "tab3" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
                                                }`}
                                        >
                                            Train Stations
                                        </button>
                                    </div>

                                    {/* Tab Content */}
                                    <div className="mt-4 p-4 border rounded-lg">
                                    {activeAddressTab === "addressTab1" && property?.location?.latitude && property?.location?.longitude && (
                                        <div className='md:flex justify-between'>
                                            <div className="w-full md:w-full lg:w-full overflow-hidden">
                                            {property?.location?.latitude && property?.location?.longitude && <PropertyMap property={property} />}

                                                </div>
                                                {/* <div className='p-3'>
                                                    <p className='border-b my-5'>Queen Mary University Of London (stop E) <span className='ml-5 text-right'>0.2 mi</span></p>
                                                    <p className='border-b my-5'>Queen Mary University Of London (stop E) <span className='ml-5 text-right'>0.2 mi</span></p>
                                                    <p className='border-b my-5'>Queen Mary University Of London (stop E) <span className='ml-5 text-right'>0.2 mi</span></p>
                                                    <p className='border-b my-5'>Queen Mary University Of London (stop E) <span className='ml-5 text-right'>0.2 mi</span></p>
                                                </div> */}
                                            </div>
                                        )}

                                        {activeAddressTab === "addressTab2" && (
                                            <div>
                                                <h2 className="text-xl font-bold">Tab 2 Content</h2>
                                                <p>This is the content for Tab 2.</p>
                                            </div>
                                        )}

                                        {activeAddressTab === "addressTab3" && (
                                            <div>
                                                <h2 className="text-xl font-bold">Tab 3 Content</h2>
                                                <p>This is the content for Tab 3.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <div className="w-full h-screen flex items-center justify-center">
                                        <iframe
                                            title='map2'
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188839.20277303818!2d73.69814984457464!3d18.52487061439116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1739902899074!5m2!1sen!2sin"
                                            className="w-full h-full"
                                            style={{ border: "0" }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className='md:grid md:gap-6 mx-auto p-6 overflow-y-auto max-h-[screen] scrollbar-hidden'>
                <div className='border border-1 rounded-lg p-3 pb-5'>
                    <div className='md:flex justify-between'>
                        <div>
                            <h1 className='text-xl'>Interested in the <span className='UniColor'>property?</span></h1>
                            <p className='text-sm'>Explore the place with our 360° live virtual tour</p>
                        </div>
                        <div className='flex justify-between'>
                            <button className="w-full UniColor UniBorderColor py-2 px-3 rounded-md shadow-md ">
                                Request now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:grid md:gap-6 mx-auto p-6 overflow-y-auto max-h-[screen] scrollbar-hidden">
            {property?.reviewsRating && property?.meta?.reviewSummary && (
                <div className="border border-1 rounded-lg p-3">
                    {/* Rating Header */}
                    <div className="flex justify-start items-center">
                        <span className="text-xs font-medium px-2 py-1 bg-green-600 text-white rounded-sm">
                            {property.reviewsRating} <i className="fa-solid fa-star mx-2 fa-sx"></i>
                        </span>
                        <h1 className="text-xl font-bold mx-2">Reviews</h1>
                    </div>

                    <p className="my-3">Summary curated from the web</p>

                    {/* Ratings Grid */}
                    <div className="grid grid-cols-1 md:grid md:grid-cols-4 gap-6 pb-4">
                        {Object.entries(property.meta.reviewSummary.rating).map(([key, value], index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <h3 className="text-lg capitalize">{key.replace(/([A-Z])/g, " $1")}</h3>
                                <p className="text-gray-700 font-medium">{value}/5</p>
                                <div className="text-2xl text-gray-600">
                                    <i className="fa-solid fa-star"></i>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Text */}
                    <p className="text-gray-600 mt-4">
                        {property.meta.reviewSummary.summary}
                    </p>
                </div>
            )}

                <div className="border border-1 rounded-lg p-5">
                    <h2 className="text-2xl font-bold mb-4">{property.reviewsCount} Reviews</h2>
                    {/* Main Images Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:flex md:justify-start md:col-span-3 py-4 bg-white">
                        {property.meta.images.map((img, index) => (
                            <Image 
                                key={index} 
                                src={img} 
                                alt="Property Image" 
                                width={80}  // Set width
                                height={80} // Set height
                                className="rounded h-20 w-20 mx-4 object-cover"
                            />
                        ))}
                    </div>


                    <div className="md:grid md:grid-cols-3 gap-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="border rounded-lg p-4 shadow-md">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold">
                                        {review.name[0]}
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="font-semibold">{review.name}</h3>
                                        <span className="text-green-600 text-sm font-medium">
                                            {review.rating}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-700 text-sm">{review.text} <span className="text-blue-500 cursor-pointer">Read more</span></p>

                                {/* Review Images */}
                                <div className="flex gap-2 mt-3">
                                {property.meta.images.map((img, index) => (
                                    <Image 
                                        key={index} 
                                        src={img} 
                                        alt="Property Image" 
                                        width={80}  // Set width
                                        height={80} // Set height
                                        className="rounded h-20 w-20 mx-4 object-cover"
                                    />
                                ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='border-t my-5'>
                        <p className='UniColor mt-5'>View All</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto p-6 overflow-y-auto max-h-screen no-scrollbar">
  <div className="border border-1 rounded-lg p-3">
    <div className="mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Similar Properties</h2>
      <div className="relative">
        {/* Flex container with responsive behavior */}
        <div className="flex overflow-hidden gap-4">
          {allProperties
            .slice(currentPropertiesIndex, currentPropertiesIndex + itemsPerPage)
            .map((property) => (
              <Link
                key={property._id} // Use the unique ID from the API
                href={`/pages/${property._id}`} // Navigate to the property's detail page
                passHref
              >
                <div className="w-full sm:w-full md:w-full lg:min-w-[350px] lg:max-w-sm border rounded-lg overflow-hidden shadow-md bg-white relative cursor-pointer hover:shadow-lg transition-shadow">
                  <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                    <i className="fa-regular fa-heart fa-sm"></i>
                  </button>
                  {/* Use the first image from meta.images */}
                  {property.meta.images.length > 0 && (
                    <Image
                      src={property.meta.images[0]}
                      alt={property.name}
                      className="w-full h-40 object-cover"
                      width={300} // Adjust width accordingly
                      height={200} // Adjust height accordingly
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold truncate">{property.name}</h3>
                    {/* Display location as city, state, country */}
                    <p className="text-gray-600 text-sm">
                      {property.location.city}, {property.location.state}, {property.location.country}
                    </p>
                    {/* Display minimum price */}
                    <p className="mt-2 text-lg font-bold">
                      From <span className="text-black">£{property.pricing.minPrice}</span> / week
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
                        {/* Navigation Buttons */}
                        <button
                            onClick={prevPropertiesSlide}
                            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 shadow-lg rounded-full"
                            >
                            <FaChevronLeft className="w-5 h-5 text-gray-700" />
                            </button>

                            <button
                            onClick={nextPropertiesSlide}
                            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 shadow-lg rounded-full"
                            >
                            <FaChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                    </div>
                </div>
                </div>

            <div className="grid gap-12 mx-auto p-6 overflow-y-auto max-h-[screen] scrollbar-hidden">
                <div className='border border-1 rounded-lg p-6 my-3'>
                    <h2 className="text-lg font-semibold mb-3">Student Accommodations in {property.location.city}</h2>
                    <div className='my-4'>
                        <div className="w-full mx-auto">
                            {faqs.slice(0, showfaqsAll ? faqs.length : 6).map((faq, index) => (
                                <div key={index} className="my-2 border-t">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex justify-between items-center p-3 text-left"
                                    >
                                        <span>{faq.question}</span>
                                        <i className={`fa-solid ${expandedIndex === index ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                                    </button>
                                    {expandedIndex === index && (
                                        <div className="p-4 bg-gray-100">
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {!showfaqsAll && faqs.length > 6 && (
                                <button
                                    onClick={() => setShowfaqsAll(true)}
                                    className="mt-4 UniColor">
                                    View All Questions
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Pages;