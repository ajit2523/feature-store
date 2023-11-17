// SideNav.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideNav.css';
import { LiaToolsSolid } from 'react-icons/lia';
import { BiSolidNetworkChart } from 'react-icons/bi';
import { IconContext } from "react-icons";
import { BsListNested } from 'react-icons/bs';
import { VscGroupByRefType } from 'react-icons/vsc';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { PiSuitcaseSimpleLight } from 'react-icons/pi';
import { GiProcessor } from 'react-icons/gi';

const SideNav = () => {
  const location = useLocation();

  return (
    <aside className="side-nav">
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <div className="group">
          <h2>Feature Store & MLOps</h2>
          <ul>
            <Link to="/feature-generation-request">
              <li className={location.pathname === '/feature-generation-request' ? 'active' : ''}>
                <LiaToolsSolid /> Feature Generation Request
              </li>
            </Link>
            <Link to="/model-call-request">
              <li className={location.pathname === '/model-call-request' ? 'active' : ''}>
              <BiSolidNetworkChart /> Model Call Request
              </li >
            </Link>
            <Link to="/feature-store-metadata">
              <li className={location.pathname === '/feature-store-metadata' ? 'active' : ''}>
              <VscGroupByRefType /> Feature Store Metadata
              </li >
            </Link>
            <Link to="/mlops-metadata">
              <li className={location.pathname === '/mlops-metadata' ? 'active' : ''}>
              <BsListNested /> MLOps Metadata
              </li >
            </Link>
          </ul>
        </div>
        {/* <div className="group">
          <h2>MLOps</h2>
          <ul>
            <Link to="/model-registry">
              <li className={location.pathname === '/model-registry' ? 'active' : ''}>
                <GiBookPile /> Model Registry
              </li>
            </Link>
            <Link to="/endpoints">
              <li className={location.pathname === '/endpoints' ? 'active' : ''}>
                <BiSolidNetworkChart /> Endpoints
              </li>
            </Link>
          </ul>
        </div> */}
        <div className="group">
          <h2>History & Performance</h2>
          <ul>
            <Link to="/search">
              <li className={location.pathname === '/search' ? 'active' : ''}>
                <AiOutlineFileSearch /> Search
              </li>
            </Link>
            <Link to="/jobs">
              <li className={location.pathname === '/jobs' ? 'active' : ''}>
                <PiSuitcaseSimpleLight /> Jobs
              </li >
            </Link>
            <Link to="/runs">
              <li className={location.pathname === '/runs' ? 'active' : ''}>
                <GiProcessor /> Runs
              </li >
            </Link>
          </ul>
        </div>
      </IconContext.Provider>
    </aside>
  );
};

export default SideNav;
