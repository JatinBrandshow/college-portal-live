"use client";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";
import "../../../styles/globals.css"

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 bg-gray-100">
        <Header toggleSidebar={toggleSidebar} />
        <main className="ml-64">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
