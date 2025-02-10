"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { API_NODE_URL, API_KEY } from "../../../config/config";

const AdminPanel = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        type: "",
        email: "",
        mobile: "",
        pincode: "",
        role: "",
    });

    const [isLogin, setIsLogin] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let apiEndpoint = "";

        if (isLogin) {
            if (formData.email.includes("admin.com")) {
                apiEndpoint = `${API_NODE_URL}admin/login`;
            } else {
                apiEndpoint = `${API_NODE_URL}user/login`;
            }
        } else {
            if (formData.email.includes("admin.com")) {
                apiEndpoint = `${API_NODE_URL}admin/register`;
            } else {
                apiEndpoint = `${API_NODE_URL}user/register`;
            }
        }

        try {
            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`,
                },
                body: JSON.stringify(formData),
            });
            const result = await response.text();

            try {
                const parsedResult = JSON.parse(result);
                if (response.ok) {
                    const { token, role } = parsedResult;
                    localStorage.setItem("authToken", token);
                    toast.success("Login successful!", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                } else {
                    toast.error(parsedResult.message || "Error during authentication.", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                console.error("Error parsing response as JSON:", error);
                toast.error("Received an unexpected response. It might be an error page.", {
                    position: "top-right",
                    autoClose: 3000,
                });
                console.error("HTML Response:", result);
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            toast.error("An error occurred during the process.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="container p-8 w-full sm:w-[450px] md:w-[500px] lg:w-[600px] bg-white shadow-xl rounded-lg">
                {isClient && <ToastContainer />}
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    {isLogin ? "Login" : "Register"}
                </h1>
                <div className="text-center mb-4">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 hover:underline"
                    >
                        {isLogin
                            ? "Don't have an account? Register here."
                            : "Already have an account? Login here."}
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block mb-1 font-semibold text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter username"
                                required={!isLogin}
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    {!isLogin && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-semibold text-gray-700">Role</label>
                                    <select
                                        name="role"
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="superAdmin">Super Admin</option>
                                        <option value="portalSuperAdmin">Portal Super Admin</option>
                                        <option value="portalDataEntry">Portal Data Entry</option>
                                        <option value="collegeSuperAdmin">College Super Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold text-gray-700">Mobile</label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter mobile number"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-semibold text-gray-700">Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter pincode"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-semibold text-gray-700">Type</label>
                                    <input
                                        type="text"
                                        name="type"
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter type"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <div className="text-center">
                        <Link href="admin/dashboard">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                {isLogin ? "Login" : "Register"}
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminPanel;
