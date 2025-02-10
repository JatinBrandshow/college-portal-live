"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiBook } from "react-icons/fi";
import { MdOutlineAccountBalance, MdOutlineAppRegistration } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaBuilding, FaStream } from "react-icons/fa";
import { FaSection } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { PiMapPinSimpleBold } from "react-icons/pi";


const Sidebar = ({ isOpen }) => {
  const [activeItem, setActiveItem] = useState(null);
  const router = useRouter();

  // Data for list items and their sublists
  const menuItems = [
    { title: "Dashboard", icon: <MdDashboard />, route: "/admin/dashboard", subList: [] },
    {
      title: "College",
      icon: <MdOutlineAccountBalance />,
      subList: [
        { name: "Add College", route: "/admin/add-college" },
        { name: "List Of Colleges", route: "/admin/list-of-colleges" },
      ],
    },
    {
      title: "Accommodation",
      icon: <FaBuilding />,
      subList: [
        { name: "Add Accommodations", route: "/admin/add-accomodation" },
        { name: "List Of Accommodations", route: "/admin/list-of-accomodations" },
      ],
    },
    {
      title: "Department",
      icon: <FaSection />,
      subList: [
        { name: "Add Department", route: "/admin/add-department" },
        { name: "List Of Departments", route: "/admin/list-of-departments" },
      ],
    },
    {
      title: "Program",
      icon: <FiBook />,
      subList: [
        { name: "Add Program", route: "/admin/add-program" },
        { name: "List Of Programs", route: "/admin/list-of-programmes" },
      ],
    },
    {
      title: "Stream",
      icon: <FaStream />,
      subList: [
        { name: "Add Stream", route: "/admin/add-stream" },
        { name: "List Of Streams", route: "/admin/list-of-streams" },
      ],
    },
    {
      title: "Affiliation",
      icon: <MdOutlineAppRegistration />,
      subList: [
        { name: "Add Affiliation", route: "/admin/add-affiliation" },
        { name: "List Of Affiliations", route: "/admin/list-of-affiliations" },
      ],
    },
    { title: "Mapping", icon: <PiMapPinSimpleBold />, route: "/admin/mapping", subList: [] },
  ];

  const toggleSublist = (index) => {
    setActiveItem(activeItem === index ? null : index);
  };

  const navigateTo = (route) => {
    router.push(route);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#1c2333] text-white w-60 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0 z-50`}
    >
      {/* Logo */}
      <div className="p-4 text-lg flex font-bold">
        <div className="p-1 bg-blue-600 text-white me-2 ms-1 rounded-lg">
          <GiNetworkBars />
        </div>
        PortalAdmin
      </div>

      {/* Menu Items */}
      <ul className="mt-8 px-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => {
                item.route ? navigateTo(item.route) : toggleSublist(index);
              }}
              className="w-full flex justify-between items-center p-3 hover:bg-gray-700 transition"
            >
              <div className="flex items-center space-x-2">
                {item.icon}
                <span>{item.title}</span>
              </div>
              {item.subList.length > 0 && (
                <FiChevronDown
                  className={`transition-transform ${
                    activeItem === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              )}
            </button>
            {/* Sublist */}
            {activeItem === index && (
              <ul className="pl-8 bg-[#1c2333]">
                {item.subList.map((subItem, i) => (
                  <li
                    key={i}
                    onClick={() => navigateTo(subItem.route)}
                    className="p-2 text-sm hover:bg-gray-700 transition cursor-pointer"
                  >
                    {subItem.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
