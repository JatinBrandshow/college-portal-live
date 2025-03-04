"use client";
import { useState } from "react";
import "../../styles/globals.css";
import { motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

const faqsData = [
  { question: "How can I book accommodation?", answer: "You can book accommodation through our official website by selecting your preferred room and following the booking process." },
  { question: "What documents are required for college admission?", answer: "You need your high school certificate, identity proof, passport-size photos, and other documents specified by the institution." },
  { question: "Is there a refund policy for accommodation?", answer: "Yes, we offer a full refund if you cancel within 7 days of booking. After that, cancellation charges may apply." },
  { question: "How do I check the status of my application?", answer: "You can check your application status in your account dashboard under the 'My Applications' section." },
  { question: "Are there any scholarships available?", answer: "Yes, we provide merit-based and need-based scholarships. Visit our scholarships page for more details." },
];

export default function Faqs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqsData.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Frequently Asked Questions
        </h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for a question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3 text-gray-500" size={20} />
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white shadow-md rounded-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left p-4 font-medium text-gray-700 hover:bg-gray-200 transition-all duration-300"
                >
                  {faq.question}
                  <ChevronDown
                    className={`transform transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4 text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">No matching questions found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
