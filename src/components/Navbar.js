import React from "react";
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="logo">
                <img src={require('./Piramal-Finance-Logo.png')} alt="Company Logo" />
            </div>

            {/* Search Bar */}
            <div className="search-bar">
                <input type="text" placeholder="Search for feature group / feature view" />
            </div>

            {/* Right Content (Placeholder) */}
            <div className="right-content">
                {/* Add your content here */}
            </div>
        </nav>
    );
};

export default Navbar;
