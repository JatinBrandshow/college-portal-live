"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const Admissions = () => {
    const [language, setLanguage] = useState("en");

    const changeLanguage = (e) => setLanguage(e.target.value);

    const timeline = [
        {
            date: "Sept 1 - Nov 30",
            title: { en: "Application Period", es: "Período de Aplicación" },
            description: {
                en: "Submit your application along with required documents.",
                es: "Envíe su aplicación con los documentos requeridos."
            },
        },
        {
            date: "Dec 15",
            title: { en: "Decision Notifications", es: "Notificaciones de Decisión" },
            description: {
                en: "Receive admission decisions via email.",
                es: "Reciba decisiones de admisión por correo electrónico."
            },
        },
        {
            date: "Jan 10",
            title: { en: "Enrollment Deadline", es: "Fecha Límite de Inscripción" },
            description: {
                en: "Confirm your enrollment to secure your spot.",
                es: "Confirme su inscripción para asegurar su lugar."
            },
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 py-10">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-blue-600">
                        {language === "en" ? "Admissions" : "Admisiones"}
                    </h1>
                    <div className="relative">
                        <Globe className="absolute left-3 top-2.5 text-gray-500" size={20} />
                        <select
                            value={language}
                            onChange={changeLanguage}
                            className="pl-10 pr-4 py-2 border rounded-lg bg-white"
                        >
                            <option value="en">English</option>
                            <option value="es">Español</option>
                        </select>
                    </div>
                </div>

                {/* Application Timeline */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">{language === "en" ? "Application Timeline" : "Cronograma de Aplicación"}</h2>
                    <div className="relative">
                        <div className="border-l-4 border-blue-500 absolute h-full left-5"></div>
                        {timeline.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative flex items-center mb-6"
                            >
                                <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
                                    {index + 1}
                                </div>
                                <div className="ml-6 bg-white p-4 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold">{event.title[language]}</h3>
                                    <p className="text-sm text-gray-600">{event.description[language]}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Application Form */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">{language === "en" ? "Apply Now" : "Aplica Ahora"}</h2>
                    <form className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">{language === "en" ? "Full Name" : "Nombre Completo"}</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">{language === "en" ? "Email Address" : "Correo Electrónico"}</label>
                            <input type="email" className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                            {language === "en" ? "Submit Application" : "Enviar Aplicación"}
                        </button>
                    </form>
                </section>

                {/* Virtual Campus Tour */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">{language === "en" ? "Virtual Campus Tour" : "Recorrido Virtual del Campus"}</h2>
                    <div className="relative w-full h-64">
                        <iframe
                            className="absolute inset-0 w-full h-full rounded-lg"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQa"
                            title="Virtual Campus Tour"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>

                {/* Admission Statistics */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">{language === "en" ? "Admission Statistics" : "Estadísticas de Admisión"}</h2>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-3xl font-bold text-blue-600">85%</h3>
                            <p>{language === "en" ? "Acceptance Rate" : "Tasa de Aceptación"}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-3xl font-bold text-green-600">120+</h3>
                            <p>{language === "en" ? "Programs Offered" : "Programas Ofrecidos"}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-3xl font-bold text-purple-600">50+</h3>
                            <p>{language === "en" ? "Countries Represented" : "Países Representados"}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Admissions;
