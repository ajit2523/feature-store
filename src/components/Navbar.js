import React from "react";
import './Navbar.css'
import { Avatar } from "@mui/material";
import UserAvatar from "./UserAvatar";

let emailID = 'ajit.bhosale@piramal.com'

export const setEmailID = (userEmail) => {
  emailID = userEmail;
};

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="logo">
                <img src={require('./Piramal-Finance-Logo-removebg-preview.png')} alt="Company Logo" />
                {/* <h3>MLOPS - FEATURE STORE</h3> */}
            </div>
            
            {/* Search Bar */}
            {/* <div className="search-bar">
                <input type="text" placeholder="Search for feature group / feature view" />
            </div> */}

            {/* Right Content (Placeholder) */}
            <div className="right-content">
                {emailID}
                <UserAvatar emailID={emailID}/>    
            </div>
        </nav>
    );
};

export default Navbar;
