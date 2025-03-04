import React from "react";
import Header from "../../components/Header"; // Adjust path as needed
import Footer from "../../components/Footer";

const Layout = ({ children }) => {
    return (
        <div>
            {/* Header Component */}
            <Header />

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default Layout;
