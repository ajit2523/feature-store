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
import { useMsal, useMsalAuthentication } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { useState, useEffect } from 'react';
import { setEmail } from './pages/feature-creation-request-2';
import { setEmailID } from './components/Navbar';
import axios from 'axios';


const App = () => {

  // useMsalAuthentication(InteractionType.Redirect);
  const [m_strUser, setm_strUser] = useState("");
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jj8gswywya.execute-api.ap-south-1.amazonaws.com/api/v1/fs-ui/metadata');
        setMetadata(response.data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    fetchData();
  }, []);


  function Render() {

    const { accounts } = useMsal();

    try {
      const username = accounts[0].username;
      setm_strUser(username);
    }
    catch (e) {
    }
  }

  // if (m_strUser !== "") {
  //   setEmail(m_strUser);
  //   setEmailID(m_strUser);

  //   const metadata_raw = fetch('https://jj8gswywya.execute-api.ap-south-1.amazonaws.com/api/v1/fs-ui/metadata')
  //   const metadata = metadata_raw.json();

  //   return (
  //     <Router>
  //       <div className="App" id="outer-container">
  //         <NavBar />
  //         <div style={{ display: 'flex' }}>
  //           <SideNav style={{ flex: '0 0 auto', position: 'sticky', top: '0' }} />
  //           <div id="page-wrap" style={{ flex: '1' }}>
  //             <Routes>
  //               <Route path="/" element={<FeatureCreationRequest data={metadata}/>} />
  //               <Route path="/feature-creation-request" element={<FeatureCreationRequest data={metadata}/>} />
  //               <Route path="/feature-creation-request-2" element={<FeatureCreationRequest2 data={metadata}/>} />
  //               <Route path="/feature-creation-request-3" element={<FeatureCreationRequest3 />} />
  //               <Route path="/feature-store-metadata" element={<FeatureStoreMetadata data={metadata}/>} />
  //               <Route path="/online-fs-details" element={<OnlineFSDetails />} />
  //               <Route path="/realtime" element={<Realtime />} />
  //               <Route path="/batch" element={<Batch />} />
  //               <Route path="/test" element={<Test />} />
  //               <Route path="/job-status" element={<JobStatus />} />
  //               <Route path="/failed-jobs" element={<FailedJobs />} />
  //             </Routes>
  //           </div>
  //         </div>
  //       </div>
  //     </Router>
  //   )
  // }

  // else {
  //   return <>{Render()}<div style={{ textAlign: 'center' }}>Please wait...</div></>
  // }


  return (
    <Router>
      <div className="App" id="outer-container">
        <NavBar />
        <div style={{ display: 'flex' }}>
          <SideNav style={{ flex: '0 0 auto', position: 'sticky', top: '0' }} />
          <div id="page-wrap" style={{ flex: '1' }}>
            {metadata ? (
              <Routes>
                <Route path="/" element={<FeatureCreationRequest />} />
                <Route path="/feature-creation-request" element={<FeatureCreationRequest data={metadata} />} />
                <Route path="/feature-creation-request-2" element={<FeatureCreationRequest2 data={metadata} />} />
                <Route path="/feature-creation-request-3" element={<FeatureCreationRequest3 />} />
                <Route path="/feature-store-metadata" element={<FeatureStoreMetadata data={metadata} />} />
                <Route path="/online-fs-details" element={<OnlineFSDetails />} />
                <Route path="/realtime" element={<Realtime />} />
                <Route path="/batch" element={<Batch />} />
                <Route path="/test" element={<Test />} />
                <Route path="/job-status" element={<JobStatus />} />
                <Route path="/failed-jobs" element={<FailedJobs />} />
              </Routes>
            ) : (
              <div style={{ textAlign: 'center' }}>Please wait...</div>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
