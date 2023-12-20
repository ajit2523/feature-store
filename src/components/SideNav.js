// SideNav.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideNav.css';
import { IoShapesOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import { BsListNested } from 'react-icons/bs';
import { HiOutlineSquare2Stack } from "react-icons/hi2";
import { PiSuitcaseSimpleLight } from 'react-icons/pi';
import { TiArrowRepeat } from "react-icons/ti";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { RiTestTubeLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";


const SideNav = () => {
  const location = useLocation();

  return (
    <aside className="side-nav">
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <div className="group">
          <h2>FEATURE STORE</h2>
          <ul>
            <Link to="/feature-creation-request">
              <li className={location.pathname === '/feature-creation-request' ? 'active' : ''}>
              <IoShapesOutline /> Feature Creation Request
              </li>
            </Link>
            <Link to="/feature-store-metadata">
              <li className={location.pathname === '/feature-store-metadata' ? 'active' : ''}>
              <HiOutlineSquare2Stack /> FS Metadata
              </li >
            </Link>
            <Link to="/online-fs-details">
              <li className={location.pathname === '/online-fs-details' ? 'active' : ''}>
              <BsListNested /> Online FS Details
              </li >
            </Link>
          </ul>
        </div>
        <hr className='hr' />
        <div className="group">
          <h2>ML-OPS</h2>
          <ul>
            <Link to="/realtime">
              <li className={location.pathname === '/realtime' ? 'active' : ''}>
                <TiArrowRepeat /> Realtime
              </li>
            </Link>
            <Link to="/batch">
              <li className={location.pathname === '/batch' ? 'active' : ''}>
                <RiBarChartHorizontalFill /> Batch
              </li>
            </Link>
            <Link to="/test">
              <li className={location.pathname === '/test' ? 'active' : ''}>
                <RiTestTubeLine /> Test
              </li>
            </Link>
          </ul>
        </div>
        <hr className='hr' />
        <div className="group">
          <h2>HISTORY / PERFORMANCE</h2>
          <ul>
            <Link to="/job-status">
              <li className={location.pathname === '/job-status' ? 'active' : ''}>
                <PiSuitcaseSimpleLight /> Job Status
              </li >
            </Link>
            <Link to="/failed-jobs">
              <li className={location.pathname === '/failed-jobs' ? 'active' : ''}>
                <RxCrossCircled /> Failed Jobs
              </li >
            </Link>
          </ul>
        </div>
      </IconContext.Provider>
    </aside>
  );
};

export default SideNav;
