import axios from 'axios';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import './model-call-request.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const modelOptions = [
  { value: 'lap-model-lt1', label: 'lap-model-lt1' },
  { value: 'lap-model-lt2', label: 'lap-model-lt2' },
  { value: 'lap-model-lt3', label: 'lap-model-lt3' },
  { value: 'lap-model-lt4', label: 'lap-model-lt4' }]

const versionOptions = [
  { value: 'v1', label: 'v1' },
  { value: 'v2', label: 'v2' },
  { value: 'v3', label: 'v3' }]

const emailIdOptions = [
  { value: 'vidit.ostwal@piramal.com', label: 'vidit.ostwal@piramal.com' },
  { value: 'nirmalya.mukherjee@piramal.com', label: 'nirmalya.mukherjee@piramal.com' },
  { value: 'yajamanyam.darahaas@piramal.com', label: 'yajamanyam.darahaas@piramal.com' },
  { value: 'subramanian.v@piramal.com', label: 'subramanian.v@piramal.com' }]

const theme = createTheme({
  palette: {
    primary: {
      main:'#E77864'
    }
  },
});
const filterModelOptions = (inputValue) => {
  return modelOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
}

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterModelOptions(inputValue));
  }, 0);
}

const filterEmailIdOptions = (inputValue) => {
  return emailIdOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
}

const loadEmailIdOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterEmailIdOptions(inputValue));
  }, 0);
}

const defaultEmailID = 'ajit.bhosale@piramal.com';

const ModelCallRequest = () => {
  const [model, setModel] = useState();
  const [description, setDescription] = useState();
  const [version, setVersion] = useState();
  const [query, setQuery] = useState();
  const [emailID, setEmailID] = useState([defaultEmailID]);

  useEffect(() => {
    console.log(model)
  }, [model])

  useEffect(() => {
    console.log(description)
  }, [description])

  useEffect(() => {
    console.log(version)
  }, [version])

  useEffect(() => {
    console.log(query)
  }, [query])

  useEffect(() => {
    console.log(emailID)
  }, [emailID])

  const handleModelChange = (selectedOption) => {
    setModel(selectedOption ? selectedOption.value : '');
  }

  const handleClearModel = () => {
    setModel(null);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleVersionChange = (selectedOption) => {
    setVersion(selectedOption ? selectedOption.value : '');
  }

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  }

  const handleEmailIDChange = (selectedOptions) => {
    const selectedEmailIDs = selectedOptions.map((x) => x.value);
    selectedEmailIDs.unshift(defaultEmailID);
    setEmailID(selectedEmailIDs);
  }


  return (
    <div className="model-call-request">
      <AsyncSelect className='model-dropdown'
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleModelChange}
        onClear={handleClearModel}
        placeholder='Select a Model'
        noOptionsMessage={() => 'Start typing to find the required model'}
        isClearable
        backspaceRemovesValue
        styles={{
          menu: (provided) => ({
            ...provided,
            zIndex: 1001, 
            position: 'relative'
          }),
        }}
      />

      <TextField className='description'
        id="outlined-multiline-static"
        label="Enter description"
        variant='outlined'
        size='small'
        fullWidth
        style={{ paddingBottom: '20px' }}
        onChange={handleDescriptionChange}
      />   

      <Select className='version-dropdown'
        options={versionOptions}
        onChange={handleVersionChange}
        placeholder='Select version'
        backspaceRemovesValue
        styles={{
          menu: (provided) => ({
            ...provided,
            zIndex: 1001, 
            position: 'relative'
          }),
        }}
      />

      <Box className='email-id-default'
        component="form"
        sx={{
          '& .MuiTextField-root': { width: '100%', },
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
            size='small'
            fullWidth
          />
        </>
      </Box>

      <AsyncSelect className='model-dropdown'
        cacheOptions
        loadOptions={loadEmailIdOptions}
        onChange={handleEmailIDChange}
        isMulti
        placeholder='Select secondary email ID'
        backspaceRemovesValue
        styles={{
          menu: (provided) => ({
            ...provided,
            zIndex: 1001, 
            position: 'relative'
          }),
        }}
      />

      <TextField className='query'
        label="Enter SQL query"
        variant='outlined'
        size='small'
        fullWidth
        style={{ paddingBottom: '20px' }}
        onChange={handleQueryChange}
      />

      <ThemeProvider theme={theme}>
        <Button variant="contained" className='submit-button' onClick={() => {
          console.log({
            model: model,
            description: description,
            version: version,
            emailID: emailID,
            query: query
          })
          axios.post('http://localhost:5000/feature-creation-request', {
            model: model,
            description: description,
            version: version,
            emailID: emailID,
            query: query
          })
            .then((response) => {
              console.log(response);
            }, (error) => {
              console.log(error);
            });
        }}>Submit</Button>
      </ThemeProvider>
    </div>
  )
};

export default ModelCallRequest;