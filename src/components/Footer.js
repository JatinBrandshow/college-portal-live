import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGraduationCap } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#002855] text-white py-10">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <FaGraduationCap className="mr-2" />
              College Portal
            </h3>
            <p className="text-sm">
              Empowering students and educators with tools and resources to succeed. Explore opportunities, connect
              with alumni, and achieve your goals.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 hover:text-gray-300 transition duration-200">Academic Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/library" className="hover:text-gray-300 transition duration-200">
                  Library
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-gray-300 transition duration-200">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-gray-300 transition duration-200">
                  Faculty Directory
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-gray-300 transition duration-200">
                  Admissions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 hover:text-gray-300 transition duration-200">Alumni & Career</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/alumni" className="hover:text-gray-300 transition duration-200">
                  Alumni Network
                </Link>
              </li>
              <li>
                <Link href="/career" className="hover:text-gray-300 transition duration-200">
                  Career Services
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-gray-300 transition duration-200">
                  Events & Reunions
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-gray-300 transition duration-200">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 hover:text-gray-300 transition duration-200">Accessibility & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="hover:text-gray-300 transition duration-200">
                  Student Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gray-300 transition duration-200">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-gray-300 transition duration-200">
                  Accessibility Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300 transition duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex flex-wrap space-x-4 gap-y-4 lg:gap-y-0">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition duration-200"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition duration-200"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition duration-200"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition duration-200"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 transition duration-200"
              >
                <FaYoutube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
          <form className="flex items-center justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-2/3 sm:w-1/3 px-4 py-2 text-black rounded-l-md focus:outline-none"
            />
            <button className="bg-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-600 transition duration-200">
              Subscribe
            </button>
          </form>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} College Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
