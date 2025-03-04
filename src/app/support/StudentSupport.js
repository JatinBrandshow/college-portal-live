"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Headphones, MessageCircle, Users, Phone } from "lucide-react";

const supportOptions = [
    {
        icon: <Headphones size={40} className="text-blue-500" />,
        title: "Live Chat Support",
        description: "Get real-time assistance from our support team.",
        bg: "bg-blue-100",
    },
    {
        icon: <Phone size={40} className="text-green-500" />,
        title: "24/7 Helpline",
        description: "Call our dedicated helpline for any urgent queries.",
        bg: "bg-green-100",
    },
    {
        icon: <MessageCircle size={40} className="text-purple-500" />,
        title: "Student Community",
        description: "Join forums & interact with fellow students.",
        bg: "bg-purple-100",
    },
    {
        icon: <Users size={40} className="text-orange-500" />,
        title: "One-on-One Counseling",
        description: "Book a session with our student advisors.",
        bg: "bg-orange-100",
    },
];

const faqData = [
    {
        question: "How do I contact student support?",
        answer: "You can use our 24/7 live chat, email us, or call our helpline.",
    },
    {
        question: "Where can I find academic resources?",
        answer: "Visit our Student Portal for e-books, past papers, and more.",
    },
    {
        question: "How do I book a counseling session?",
        answer: "You can book a session online through the student dashboard.",
    },
];

const StudentSupport = () => {
    const [faqOpen, setFaqOpen] = useState(null);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 py-10">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-blue-600">Student Support</h1>
                    <p className="text-lg text-gray-600 mt-2">Get the help you need, anytime.</p>
                </div>

                {/* Support Options */}
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {supportOptions.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className={`p-6 rounded-lg shadow-md ${item.bg} flex flex-col items-center text-center`}
                        >
                            {item.icon}
                            <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
                            <p className="text-gray-600 mt-2">{item.description}</p>
                        </motion.div>
                    ))}
                </section>

                {/* FAQ Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-white p-5 rounded-lg shadow-md cursor-pointer"
                                onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium">{faq.question}</h3>
                                    <HelpCircle className="text-gray-500" size={24} />
                                </div>
                                {faqOpen === index && (
                                    <p className="text-gray-600 mt-3">{faq.answer}</p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Contact Form */}
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Contact Support Demo</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Full Name</label>
                                <input type="text" className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Email Address</label>
                                <input type="email" className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea className="w-full px-4 py-2 border rounded-lg bg-gray-50" rows="4"></textarea>
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                                Send Message
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default StudentSupport;
