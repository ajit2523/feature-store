import React, { useState } from 'react';
import axios from 'axios';
import { isEmail } from 'validator';
import Select from 'react-select';
import './feature-creation-request.css';

const attributeKeysForFeatureStore = ['Email ID'];


const FeatureCreationRequest = () => {
  // const [featureGenID, setFeatureGenID] = useState('');
  // const genIdOptions = axios.get('http://localhost:3001/notes')
  // return (
  //   <div>
  //     <Select
  //       id="dropdown"
  //       value={featureGenID || ""}
  //       onChange={(e) => setFeatureGenID(e.target.value)}
  //       options={Object.keys(genIdOptions).map((key) => ({ value: key, label: key }))}

  //     >
  //       {/* <option value="">Select from the options</option> */}
  //       <option value="" disabled={featureGenID !== null}>Select from the options</option>
  //       <option value="ETP_DEROGS_BATCH">ETP_DEROGS_BATCH</option>
  //       <option value="NTP_PAISABAZAR_DEROGS_BATCH">NTP_PAISABAZAR_DEROGS_BATCH</option>
  //     </Select>
  //   </div>
  // );
  const [attributeValues, setAttributeValues] = useState(
    attributeKeysForFeatureStore.reduce((acc, key) => ({ ...acc, [key]: '' }), {})
  );
  const [response, setResponse] = useState('');
  const [selectedOption, setSelectedOption] = useState('Feature Store');
  const [selectedGenID, setSelectedGenID] = useState(null);
  const [selectedAPIURL, setSelectedAPIURL] = useState('https://biuuatapi.piramalfinance.com/feature-store/feature-store-resource');
  const [genIdOptions, setGenIdOptions] = useState({
    ETP_DEROGS_BATCH: {
      DEROGS_FEATURES_ETP_0: '',
      DEROGS_FEATURES_ETP_1: '',
      DEROGS_FEATURES_ETP_2: '',
      DEROGS_FEATURES_ETP_3: ''
    }, 
    NTP_PAISABAZAR_DEROGS_BATCH: {
      PAISABAZAR_DEROGS_NTP_0: '',
      PAISABAZAR_DEROGS_NTP_1: '',
      PAISABAZAR_DEROGS_NTP_2: ''
    }
  });
  const [emailIds, setEmailIds] = useState(['ajit.bhosale@piramal.com']);

  const handleInputChange = (key, value, parentId) => {
    setAttributeValues((prevValues) => ({ ...prevValues, [key]: value }));
    setGenIdOptions((prevValues) => {
      return {
        ...prevValues,
        [parentId]: { ...prevValues[parentId], [key]: value }
      };
    });
  };

  const handleSend = async () => {
    try {
      const requestBody = JSON.stringify(genIdOptions[selectedGenID]);

      const response = await axios.post(selectedAPIURL, requestBody);

      setResponse(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  const handleEmailIdChange = (index, event) => {
    let emails = [...emailIds];
    emails[index] = event.target.value;
    setEmailIds(emails);
  };

  const addEmailId = () => {
    const lastIndex = emailIds.length - 1;
    const lastEmailId = emailIds[lastIndex];

    if (isEmail(lastEmailId)) {
      setEmailIds([...emailIds, '']);
    } else {
      alert('Please enter a valid email id');
    }
  };

  // const loadOptions = (inputValue, callback) => {
  //   setTimeout(() => {
  //     const filteredOptions = aquaticCreatures.filter((option) =>
  //       option.label.toLowerCase().includes(inputValue.toLowerCase())
  //     );
  //     callback(filteredOptions);
  //   }, 1); // Simulate a 1-milisecond delay for demonstration purposes
  // };


  return (
    <div className="FeatureCreationRequest">
      
      {/* <div className="dropdown-section-0">
        <label htmlFor="dropdown">Select from:</label>
        <Select
          id="dropdown"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="Feature Store">Feature Store</option>
          <option value="MLOps">MLOps</option>
        </Select>
      </div> */}
      <div className="input-section">
        {/* <label htmlFor="dropdown">Select Feature Gen ID:</label> */}
        <Select
          id="dropdown"
          value={selectedGenID || ""}
          onChange={(e) => setSelectedGenID(e.target.value)}
          options={Object.keys(genIdOptions).map((key) => ({ value: key, label: key }))}
          placeholder="Select a Feature Generation ID"
        >
          {/* <option value="">Select from the options</option> */}
          <option value="" disabled={selectedGenID !== null}>Select from the options</option>
          <option value="ETP_DEROGS_BATCH">ETP_DEROGS_BATCH</option>
          <option value="NTP_PAISABAZAR_DEROGS_BATCH">NTP_PAISABAZAR_DEROGS_BATCH</option>
        </Select>
      </div>
      <div className="input-section">
        {/* <label htmlFor="dropdown">Select Environment:</label> */}
        <Select
          id="dropdown"
          value={selectedAPIURL}
          onChange={(e) => setSelectedAPIURL(e.target.value)}
          options={[{label: "UAT - https://biuuatapi.piramalfinance.com/feature-store/feature-store-resource", value: "https://biuuatapi.piramalfinance.com/feature-store/feature-store-resource"}, {label: "PROD - https://biuprodapi.piramalfinance.com/feature-store/feature-store-resource", value: "https://biuprodapi.piramalfinance.com/feature-store/feature-store-resource"}]}

        />
      </div>
      {selectedGenID 
        && Object.keys(genIdOptions[selectedGenID]).map((key) => (
      <div className="input-section" key={key}>
        <label htmlFor={key}>{key}:</label>
        <input
          type="text"
          id={key}
          value={genIdOptions[selectedGenID][key]}
          onChange={(e) => handleInputChange(key, e.target.value, selectedGenID)}
          placeholder={`Enter value for ${key}`}
        />
      </div>
        
      ))}
      {emailIds.map((emailId, index) => {
        return (
          <div className="email-wrapper" key={index}>
          <label htmlFor={`email_${index}`}>Email ID {index + 1}:</label>
          <div className="email-input-section">
            <input
              id={`email_${index}`}
              className={`email-input-${isEmail(emailId) ? '' : 'invalid'}`}
              value={emailId}
              onChange={(e) => handleEmailIdChange(index, e)}
              placeholder={`Enter Email ID ${index + 1}`}
            />
            {index === emailIds.length - 1 && (
              <button type="button" className="add-email-button" onClick={addEmailId}>+</button>
            )}
          </div>
        </div>

      )}
      )}
      <button onClick={handleSend}>Send</button>
      {response && (
        <div className="response-box">
          <label>Response:</label>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default FeatureCreationRequest;