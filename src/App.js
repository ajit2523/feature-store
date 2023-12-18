import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import SideNav from './components/SideNav';
import FeatureCreationRequest from './pages/feature-creation-request'; 
import FeatureCreationRequest2 from './pages/feature-creation-request-2';
import FeatureCreationRequest3 from './pages/feature-creation-request-3';
import FeatureStoreMetadata from './pages/feature-store-metadata';
import OnlineFSDetails from './pages/online-fs-details';
import Realtime from './pages/realtime';
import Batch from './pages/batch';
import Test from './pages/test';
import JobStatus from './pages/job-status';
import FailedJobs from './pages/failed-jobs';

function App() {
  return (
    <Router>
      <div className="App" id="outer-container">
        <NavBar />
        <div style={{ display: 'flex' }}>
          <SideNav style={{ flex: '0 0 auto', position: 'sticky', top: '0' }}/>
          <div id="page-wrap" style={{ flex: '1' }}>
            <Routes>
              <Route path="/" element={<FeatureCreationRequest/>} />
              <Route path="/feature-creation-request" element={<FeatureCreationRequest />} />
              <Route path="/feature-creation-request-2" element={<FeatureCreationRequest2 />} />
              <Route path="/feature-creation-request-3" element={<FeatureCreationRequest3 />} />
              <Route path="/feature-store-metadata" element={<FeatureStoreMetadata />} />
              <Route path="/online-fs-details" element={<OnlineFSDetails />} />
              <Route path="/realtime" element={<Realtime />} />
              <Route path="/batch" element={<Batch />} />
              <Route path="/test" element={<Test />} />
              <Route path="/job-status" element={<JobStatus />} />
              <Route path="/failed-jobs" element={<FailedJobs />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
