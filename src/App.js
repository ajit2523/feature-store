import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import SideNav from './components/SideNav';
import FeatureCreationRequest from './pages/feature-creation-request'; // Update with correct import paths
import ModelCallRequest from './pages/model-call-request'; // Update with correct import paths
import ModelRegistry from './pages/model-registry'; // Update with correct import paths
import Endpoints from './pages/endpoints'; // Update with correct import paths

function App() {
  return (
    <Router>
      <div className="App" id="outer-container">
        <NavBar />
        <div style={{ display: 'flex' }}>
          <SideNav />
          <div id="page-wrap">
            <Routes>
              <Route path="/" element={<FeatureCreationRequest/>} />
              <Route path="/feature-request" element={<FeatureCreationRequest />} />
              <Route path="/model-request" element={<ModelCallRequest />} />
              <Route path="/model-registry" element={<ModelRegistry />} />
              <Route path="/endpoints" element={<Endpoints />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
