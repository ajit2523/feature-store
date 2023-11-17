import axios from 'axios';
import { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import './feature-generation-request.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const featureGenIDOptions = [
  {
    FeatureGenID: 'ETP_DEROGS_BATCH',
    FeatureGroups: [
      'DEROGS_FEATURES_ETP'
    ],
  },
  {
    FeatureGenID: 'NTP_PARTNER_DEROGS_BATCH',
    FeatureGroups: ['PARTNER_DEROGS_NTP'],
  },
];

const genIdOptions = featureGenIDOptions.map((featureGenIDOption) => ({
  value: featureGenIDOption.FeatureGenID,
  label: featureGenIDOption.FeatureGenID,
}));

const emailIdOptions = [
  { value: 'vidit.ostwal@piramal.com', label: 'vidit.ostwal@piramal.com' },
  { value: 'nirmalya.mukherjee@piramal.com', label: 'nirmalya.mukherjee@piramal.com' },
  { value: 'yajamanyam.darahaas@piramal.com', label: 'yajamanyam.darahaas@piramal.com' },
  { value: 'subramanian.v@piramal.com', label: 'subramanian.v@piramal.com' },
  { value: 'kaushik.deb@piramal.com', label: 'kaushik.deb@piramal.com' }
];

const defaultEmailID = 'ajit.bhosale@piramal.com';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ea4022',
    },
  },
});

const FeatureGenerationRequest = () => {
  const [featureGenID, setFeatureGenID] = useState();
  const [featureGroups, setFeatureGroups] = useState([]);
  const [emailID, setEmailID] = useState([defaultEmailID]);
  const [batchIDs, setBatchIDs] = useState({});
  const [response, setResponse] = useState(null);

  const fetchFeatureGroups = (selectedFeatureGenID) => {
    const selectedOption = featureGenIDOptions.find(
      (option) => option.FeatureGenID === selectedFeatureGenID
    );

    return selectedOption ? selectedOption.FeatureGroups : [];
  };

  useEffect(() => {
    console.log(featureGenID);
    setFeatureGroups(fetchFeatureGroups(featureGenID));
  }, [featureGenID]);

  useEffect(() => {
    console.log(featureGroups);
    setBatchIDs({});
  }, [featureGroups]);

  useEffect(() => {
    console.log(emailID);
  }, [emailID]);

  const handleEmailIDChange = (selectedOptions) => {
    const selectedEmailIDs = selectedOptions.map((x) => x.value);
    selectedEmailIDs.unshift(defaultEmailID);
    setEmailID(selectedEmailIDs);
  };

  const filterEmailIdOptions = (inputValue) => {
    return emailIdOptions.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  const handleBatchIDChange = (featureGroup, batchID) => {
    setBatchIDs((prevBatchIDs) => ({
      ...prevBatchIDs,
      [featureGroup]: batchID,
    }));
  };

  const handleSubmit = () => {
    // Check if batch IDs are saved for all feature groups
    const isBatchIDsComplete = featureGroups.every(
      (featureGroup) => batchIDs[featureGroup]
    );

    if (!isBatchIDsComplete) {
      alert('Please enter batch IDs for all the feature groups.');
      return;
    }

    const featureGroupsData = {};
    featureGroups.forEach((featureGroup) => {
      featureGroupsData[featureGroup] = batchIDs[featureGroup] || '';
    });

    const postData = {
      uniqueIdentifier: featureGroupsData,
      email: defaultEmailID,
      // secondaryEmail: emailID.slice(1),
      featureGenID: featureGenID,
    };

    console.log(postData);


    axios
      .post('https://biuprodapi.piramalfinance.com/feature-store/feature-store-resource', postData)
      .then(
        (response) => {
          setResponse(response.data);
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="feature-creation-request">
      <AsyncSelect
        className="feature-dropdown"
        cacheOptions
        loadOptions={(inputValue, callback) => {
          setTimeout(() => {
            callback(
              genIdOptions.filter((i) =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
              )
            );
          }, 0);
        }}
        onChange={(selectedOption) => {
          setFeatureGenID(selectedOption ? selectedOption.value : '');
        }}
        placeholder="Select Feature Gen ID"
        noOptionsMessage={() => 'Start typing to find the feature generation ID'}
        isClearable
        backspaceRemovesValue
        styles={{
          menu: (provided) => ({
            ...provided,
            zIndex: 1001,
            position: 'relative',
          }),
        }}
      />

      {/* Make a table with two columns. One for feature group, another for batch id. For each feature group, user will input the batch id in the table */}
      {featureGroups.length > 0 &&
        <TableContainer component={Paper} className='table'>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size='small'>
            <TableHead>
              {/* add border to table head */}
              <TableRow>
                <TableCell align='center' sx={{ backgroundColor: '#F2EDE6', color: '#B15D21' }}><h3>Feature Group</h3></TableCell>
                <TableCell align="center" sx={{ backgroundColor: '#F2EDE6', color: '#B15D21' }}><h3>Batch ID</h3></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {featureGroups.map((featureGroup) => (
                <TableRow
                  key={featureGroup}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align='center'>
                    {featureGroup}
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      id={`batch-id-${featureGroup}`}
                      label="Batch ID"
                      fullWidth
                      value={batchIDs[featureGroup] || ''}
                      onChange={(event) =>
                        handleBatchIDChange(featureGroup, event.target.value)
                      }
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}

      <Box
        className="email-id-default"
        component="form"
        sx={{
          '& .MuiTextField-root': { width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <>
          <TextField
            disabled
            id="outlined-disabled"
            label="default"
            defaultValue={defaultEmailID}
            size="small"
          />
        </>
      </Box>

      <AsyncSelect
        className="feature-dropdown"
        cacheOptions
        loadOptions={(inputValue, callback) => {
          setTimeout(() => {
            callback(
              filterEmailIdOptions(inputValue).filter(
                (option) => option.value !== defaultEmailID
              )
            );
          }, 0);
        }}
        onChange={handleEmailIDChange}
        isMulti
        placeholder="Select secondary email ID"
        backspaceRemovesValue
        styles={{
          menu: (provided) => ({
            ...provided,
            zIndex: 1001,
            position: 'relative',
          }),
        }}
      />

      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          className="submit-button"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </ThemeProvider>

      {response && (
        <div className="response">
          <Box sx={{ border: 1, borderRadius: 1.5, borderColor: 'grey' }}>
            <h3>Response</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </Box>
        </div>
      )}
    </div>
  );
};

export default FeatureGenerationRequest;
