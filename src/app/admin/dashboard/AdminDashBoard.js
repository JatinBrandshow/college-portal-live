"use client";
import { useState } from "react";
import { User, Building, Home, LayoutDashboard } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const userActivityData = [
  { day: "Mon", users: 50, active: 30 },
  { day: "Tue", users: 70, active: 40 },
  { day: "Wed", users: 90, active: 60 },
  { day: "Thu", users: 110, active: 70 },
  { day: "Fri", users: 80, active: 50 },
  { day: "Sat", users: 60, active: 30 },
  { day: "Sun", users: 95, active: 55 },
];

const pieData = [
  { name: "Active Users", value: 300 },
  { name: "Inactive Users", value: 200 },
];

const COLORS = ["#4F46E5", "#60A5FA"];

const AdminDashBoard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <>
      <div
        className={`min-h-screen p-6 ${darkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
            : "bg-gradient-to-br from-blue-50 via-white to-gray-100 text-gray-900"
          }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { title: "Total Users", value: "1,250", icon: <User className="w-6 h-6" /> },
            { title: "Colleges Added", value: "35", icon: <Building className="w-6 h-6" /> },
            { title: "Accommodations Added", value: "12", icon: <Home className="w-6 h-6" /> },
            { title: "Departments Added", value: "20", icon: <LayoutDashboard className="w-6 h-6" /> },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-lg shadow-lg p-6 flex items-center justify-between ${darkMode ? "bg-gray-800" : "bg-white"
                }`}
            >
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
              <div
                className={`p-2 rounded-lg ${darkMode ? "bg-indigo-500" : "bg-indigo-100 text-indigo-800"
                  }`}
              >
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className={`rounded-lg shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold mb-4">User Activity (Weekly)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke={darkMode ? "#ffffff" : "#000000"} />
                <YAxis stroke={darkMode ? "#ffffff" : "#000000"} />
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#333" : "#fff" }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke={darkMode ? "#60A5FA" : "#4F46E5"}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={`rounded-lg shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">User Distribution</h2>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <span
                    className="block w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[0] }}
                  ></span>
                  <span className="ml-2 text-sm">Active Users</span>
                </div>
                <div className="flex items-center">
                  <span
                    className="block w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[1] }}
                  ></span>
                  <span className="ml-2 text-sm">Inactive Users</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: darkMode ? "#333" : "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className={`rounded-lg shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold mb-4">Recent Notices</h2>
            <ul>
              {[
                "New college affiliation requests pending approval",
                "Hostel accommodation guidelines updated",
                "Annual report submission deadline approaching",
              ].map((notice, idx) => (
                <li key={idx} className="mb-2">
                  <span
                    className={`block p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                  >
                    {notice}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`rounded-lg shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold mb-4">Pending Tasks</h2>
            <ul>
              {[
                "Add newly affiliated colleges",
                "Review and approve department additions",
                "Verify stream and program mappings",
              ].map((task, idx) => (
                <li key={idx} className="mb-2">
                  <span
                    className={`block p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                  >
                    {task}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          © 2024 College Portal Admin. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default AdminDashBoard;
