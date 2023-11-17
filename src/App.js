import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import SideNav from './components/SideNav';
import FeatureGenerationRequest from './pages/feature-generation-request'; 
import ModelCallRequest from './pages/model-call-request'; 
import FeatureStoreMetadata from './pages/feature-store-metadata';
import MlopsMetadata from './pages/mlops-metadata';
import Search from './pages/search';
import Runs from './pages/runs';
import Jobs from './pages/jobs';

function App() {
  return (
    <Router>
      <div className="App" id="outer-container">
        <NavBar />
        <div style={{ display: 'flex' }}>
          <SideNav />
          <div id="page-wrap">
            <Routes>
              <Route path="/" element={<FeatureGenerationRequest/>} />
              <Route path="/feature-generation-request" element={<FeatureGenerationRequest />} />
              <Route path="/model-call-request" element={<ModelCallRequest />} />
              <Route path="/feature-store-metadata" element={<FeatureStoreMetadata />} />
              <Route path="/mlops-metadata" element={<MlopsMetadata />} />
              <Route path="/search" element={<Search />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/runs" element={<Runs />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
