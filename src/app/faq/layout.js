import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header Component */}
            <Header />

            {/* Main Content */}
            <main className="flex-grow">{children}</main>

            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default Layout;
