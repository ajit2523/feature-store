// SideNav.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';
import { LiaToolsSolid } from 'react-icons/lia';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { BiSolidNetworkChart } from 'react-icons/bi';
import { GiBookPile } from 'react-icons/gi';
import { IconContext } from "react-icons";

const SideNav = () => {
  return (
    <aside className="side-nav">
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <div className="group">
          <h2>Feature Store</h2>
          <ul>
            <Link to="/feature-request">
              <li>
                <LiaToolsSolid /> Feature Creation Request
              </li>
            </Link>
            <Link to="/model-request">
              <li>
                <HiOutlineLightBulb /> Model Call Request
              </li>
            </Link>
          </ul>
        </div>
        <div className="group">
          <h2>MLOps</h2>
          <ul>
            <Link to="/model-registry">
              <li>
                <GiBookPile /> Model Registry
              </li>
            </Link>
            <Link to="/endpoints">
              <li>
                <BiSolidNetworkChart /> Endpoints
              </li>
            </Link>
          </ul>
        </div>
      </IconContext.Provider>
    </aside>
  );
};

export default SideNav;
