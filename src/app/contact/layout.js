// components/layout.js
import React from 'react';
import Header from '../../components/Header'; // Replace with the actual path to your Header component
import Footer from '@/components/Footer';

const Layout = ({ children }) => {
    return (
        <div>
            {/* Header Component */}
            <Header />

            {/* Main Content */}
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
