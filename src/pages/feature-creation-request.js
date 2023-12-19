import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './feature-creation-request.css';
import { components, DropdownIndicatorProps, IndicatorsContainerProps } from 'react-select';
import data from '../db.json';
import Select from 'react-select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    fontFamily: 'Fira Code'
  },
  [`&.${tableCellClasses.body}`]: {
    borderBottom: '1px solid #365069',
    borderRight: '1px solid #365069',
    fontFamily: 'Fira Code'
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  [`&.${tableRowClasses.root}`]: {
    borderBottom: '1px solid #365069',

  },
}));

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <b>Feature Gen ID</b>
    </components.DropdownIndicator>
  );
};

const IndicatorsContainer = (props) => {
  return (
    <components.IndicatorsContainer {...props} style={{ justifyContent: 'center' }} />
  );
};

const genIDOptions = data.FEATURE_GEN_ID.GEN_ID_LIST.map((featureGenIDOption) => ({
  value: featureGenIDOption,
  label: featureGenIDOption,
}));


const FeatureCreationRequest = () => {
  const [featureGenID, setFeatureGenID] = useState();
  const [featureGroups, setFeatureGroups] = useState([]);
  const [selectedFeatureGenID, setSelectedFeatureGenID] = useState();
  const [runHistoryData, setRunHistoryData] = useState(null);

  const selectedFeatureGenData = selectedFeatureGenID
    ? data.FEATURE_GEN_ID[selectedFeatureGenID]
    : null;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/feature-creation-request-2', { state: { featureGenID: featureGenID } });
  }

  return (
    <>
      <div className="feature-creation-request">

        <Select
          className='feature-gen-id-dropdown'
          cacheOptions
          components={{ DropdownIndicator, IndicatorsContainer }}
          options={genIDOptions}
          placeholder="Start typing the feature generation ID and select from the dropdown menu"
          isSearchable
          backspaceRemovesValue
          onChange={(selectedOption) => {
            setFeatureGenID(selectedOption ? selectedOption.value : '');
            setSelectedFeatureGenID(selectedOption ? selectedOption.value : '');
            fetch(`http://localhost:5050/api/v1/fs-ui/last-runs/${selectedOption.value}`)
              .then(response => response.json())
              .then(data => {
                setRunHistoryData(data);
              });
            console.log(featureGenID)
          }}
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 1001,
              position: 'relative',
            }),
          }}
          theme={(theme) => ({
            ...theme,
            border: 0,
            colors: {
              ...theme.colors,
              primary25: '#D9D9D9',
              primary: '#717171',
            },
          })}
        />


        {featureGenID &&
          <Card variant='outlined' className='desc-card'>
            <CardContent>
              <div>
                <p className='description-box'><b>Description</b><br />
                  {selectedFeatureGenData ? selectedFeatureGenData.DESCRIPTION : ''}</p>
                <hr />
                <p className='owner-box'><b style={{ color: 'black', fontFamily: 'Poppins' }}>Owners</b><br />
                  {selectedFeatureGenData ? selectedFeatureGenData.OWNER.join(', ') : ''}</p>

              </div>
            </CardContent>
          </Card>}

        {selectedFeatureGenID && selectedFeatureGenData && (
          <div className='table'>
            <div className='table-title'>
              <b>Feature Groups in {selectedFeatureGenID}</b>
            </div>


            <div className='feature-group-table'>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell><b>Feature Group</b></StyledTableCell>
                      <StyledTableCell align="left" ><b>Input Query</b></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedFeatureGenData.GROUP_IDS.map((featureGroupID) => {
                      const featureGroup = data.FEATURE_GROUPS[featureGroupID];
                      return (
                        <StyledTableRow
                          key={featureGroupID}
                        >
                          <StyledTableCell component="th" scope="row" sx={{ maxWidth: '300px' }}>
                            {featureGroupID}
                          </StyledTableCell>
                          <StyledTableCell align="left" sx={{ fontFamily: 'Fira Code', maxWidth: '300px', overflow: 'auto', textOverflow: 'clip', whiteSpace: 'wrap' }}>{featureGroup.SQL_QUERY}</StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

          </div>
        )}

        {selectedFeatureGenID && selectedFeatureGenData && !runHistoryData && (
          <CircularProgress color='inherit' />
        )}

        {selectedFeatureGenID && selectedFeatureGenData && runHistoryData && (
          <div className='table'>
            <div className='table-title'>
              <b>Run History : Showing last {runHistoryData.Showing} runs</b>
            </div>


            <div className='feature-group-table'>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left"><b>Run ID</b></StyledTableCell>
                      <StyledTableCell align="left"><b>Run Timestamp</b></StyledTableCell>
                      <StyledTableCell align="left"><b>Completion Status</b></StyledTableCell>
                      <StyledTableCell align="left"><b>Submitted By</b></StyledTableCell>
                      <StyledTableCell align="left"><b>Comments</b></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {runHistoryData['Run ID'] && runHistoryData.Timestamp && runHistoryData['Completion Status'] && runHistoryData['Submitted By'] && runHistoryData['Run ID'].length > 0 &&
                      runHistoryData['Run ID'].map((runID, index) => (
                        <StyledTableRow key={runID} >
                          <StyledTableCell component="th" scope="row">
                            {runID}
                          </StyledTableCell>
                          <StyledTableCell align="left">{runHistoryData.Timestamp[index]}</StyledTableCell>
                          <StyledTableCell align='center' ><div className={runHistoryData['Completion Status'][index] === 'Success' ? 'completion-status' : 'completion-status-failure'}>
                            {runHistoryData['Completion Status'][index]}
                          </div>
                          </StyledTableCell>
                          <StyledTableCell align="left">{runHistoryData['Submitted By'][index]}</StyledTableCell>
                          {/* Add a cell for Comments based on your data structure */}
                          <StyledTableCell align="left">{/* runHistoryData.Comments[index] */}</StyledTableCell>
                        </StyledTableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

          </div>
        )}

        {selectedFeatureGenID && runHistoryData && !runHistoryData.Ongoing &&
          <Button className='next-button' variant='contained' style={{
            backgroundColor: '#FFF7F5', color: '#E24426', fontFamily: 'Poppins', marginTop: '20px', border: '1px solid #E24426', borderRadius: '10px', width: '100px', fontWeight: 'bold', position: 'fixed',
            bottom: '20px',
            right: '20px',
          }}
            onClick={handleClick}>
            Next
          </Button>
        }

        {selectedFeatureGenID && runHistoryData && runHistoryData.Ongoing &&
          <Button className='next-button' variant='outlined' style={{ backgroundColor: '#F2F2F2', color: '#E24426', fontFamily: 'Poppins', marginTop: '20px', float: 'right', position: 'fixed',
          bottom: '20px',
          right: '20px', }}
            onClick={handleClick}
            disabled
          >
            Next
          </Button>
        }

      </div>

    </>
  );
};

export default FeatureCreationRequest;