import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from '@mui/material/Chip';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import './feature-creation-request-2.css';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { FaCheckCircle } from 'react-icons/fa';
import { RxCrossCircled } from "react-icons/rx";

let defaultEmailID = 'ajit.bhosale@piramal.com'
export const setEmail = (email) => {
    defaultEmailID = email;
};

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

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//     },
//     [`&.${tableRowClasses.root}`]: {
//         borderBottom: '1px solid #365069',

//     },
// }));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FeatureCreationRequest2 = ({ data }) => {

    const [emailIdList, setEmailIdList] = useState([{ emailID: '' }]);
    const [open, setOpen] = useState(false);
    const [uniqueIdentifiers, setUniqueIdentifiers] = useState({});
    const [validationStatus, setValidationStatus] = useState({});
    const [rowLoading, setRowLoading] = useState({});


    const handleSubmitClick = async () => {
        setOpen(true);

        try {

            const identifiersPayload = {};
            Object.keys(uniqueIdentifiers).forEach((featureGroupID) => {
                identifiersPayload[featureGroupID] = uniqueIdentifiers[featureGroupID].uniqueIdentifiers;
            });

            const allEmailIds = [defaultEmailID, ...emailIdList.map((email) => email.emailID)];

            const requestBody = {
                uniqueIdentifier: identifiersPayload,
                email: allEmailIds.join(','),
                featureGenID,
            };
            console.log(requestBody)
            console.log(JSON.stringify(requestBody));

            const response = await fetch('https://jj8gswywya.execute-api.ap-south-1.amazonaws.com/api/v1/fs-ui/submit-feature-gen-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })

            const responseText0 = await response.text();
            console.log(responseText0)
            //replace all ' with " in responseText
            const responseText = responseText0.replace(/'/g, '"');
            const responseData = JSON.parse(responseText);
            console.log(responseData)
            //send responseData to feature-creation-request-3 in a delay of 2 sec
            setTimeout(() => {
                navigate('/feature-creation-request-3', { state: { featureGenID: featureGenID, responseData: responseData } });
            }, 2000);

        } catch (error) {
            console.log(error);
        }

    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    const handleEmailIDChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...emailIdList];
        list[index][name] = value;
        setEmailIdList(list);
        // console.log(emailIdList)
    };

    const handleEmailIDAddition = () => {
        setEmailIdList([...emailIdList, { emailID: "" }])
    };

    const handleEmailIDDeletion = (index) => {
        const list = [...emailIdList];
        list.splice(index, 1);
        setEmailIdList(list);
    }

    const handleIdentifierChange = (e, index, featureGroupID) => {
        const { value } = e.target;

        // Reset validation status for the current featureGroupID
        setValidationStatus((prevStatus) => ({
            ...prevStatus,
            [featureGenID]: {
                ...prevStatus[featureGenID],
                [featureGroupID]: null, // Set to null or an initial state
            },
        }));

        setUniqueIdentifiers((prevIdentifiers) => {
            const updatedIdentifiers = { ...prevIdentifiers };
            const currentIdentifier = updatedIdentifiers[featureGroupID] || {};
            currentIdentifier.uniqueIdentifiers = value;
            updatedIdentifiers[featureGroupID] = currentIdentifier;
            return updatedIdentifiers;
        });
    };


    const location = useLocation();
    const featureGenID = location.state.featureGenID;

    const navigate = useNavigate();

    const handleValidation = async (featureGroupID) => {
        setRowLoading((prevLoading) => ({
            ...prevLoading,
            [featureGroupID]: true,
        }));

        try {
            const identifiersPayload = {};
            Object.keys(uniqueIdentifiers).forEach((featureGroupID) => {
                identifiersPayload[featureGroupID] = uniqueIdentifiers[featureGroupID].uniqueIdentifiers;
            });

            const validationRequestBody = {
                F_GEN_ID: featureGenID,
                UID: Object.values(identifiersPayload).join(',')
            };
            console.log(validationRequestBody);

            const response = await fetch('https://jj8gswywya.execute-api.ap-south-1.amazonaws.com/api/v1/fs-ui/validate-queries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(validationRequestBody)
            });

            try {
                const responseText = await response.text();
                console.log(responseText)
                try {
                    const validationResponseData = JSON.parse(responseText);
                    console.log(validationResponseData);

                    setValidationStatus((prevStatus) => ({
                        ...prevStatus,
                        [featureGenID]: {
                            ...prevStatus[featureGenID],
                            [featureGroupID]: validationResponseData,
                        },
                    }));
                } catch (jsonError) {
                    console.error('Error parsing JSON response:', jsonError);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setRowLoading((prevLoading) => ({
                ...prevLoading,
                [featureGroupID]: false,
            }));
        }
    };


    const selectedFeatureGenData = featureGenID
        ? data.FEATURE_GEN_ID[featureGenID]
        : null;
    return (
        <div>
            <h4 style={{ textAlign: 'left' }}>{featureGenID} : Configure Run Details</h4>
            <div className='table'>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell><b>Feature Group</b></StyledTableCell>
                                <StyledTableCell align="left"><b>Input Query</b></StyledTableCell>
                                <StyledTableCell align="left"><b>Unique Identifiers</b></StyledTableCell>
                                <StyledTableCell align="left"><b>Validate</b></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedFeatureGenData.GROUP_IDS.map((featureGroupID, index) => {
                                const featureGroup = data.FEATURE_GROUPS[featureGroupID];
                                const isSuccess =
                                    validationStatus[featureGenID]?.[featureGroupID]?.[featureGroupID] &&
                                    Object.values(validationStatus[featureGenID]?.[featureGroupID]?.[featureGroupID]).every((status) => status === 'SUCCESS');


                                const isFailure =
                                    validationStatus[featureGenID]?.[featureGroupID]?.[featureGroupID] &&
                                    Object.values(validationStatus[featureGenID]?.[featureGroupID]?.[featureGroupID]).some((status) => status === 'FAILED');


                                const isLoading = rowLoading[featureGroupID];

                                console.log('validation status: ', validationStatus);
                                console.log('isSuccess: ', isSuccess);
                                console.log('isFailure: ', isFailure);
                                console.log('rowLoading: ', rowLoading[featureGroupID]);
                                return (
                                    <TableRow
                                        key={featureGroupID}
                                    >
                                        <StyledTableCell component="th" scope="row" sx={{ maxWidth: '300px' }}>
                                            {featureGroupID}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="left"
                                            sx={{
                                                fontFamily: 'Fira Code',
                                                maxWidth: '300px',
                                                overflow: 'auto',
                                                textOverflow: 'clip',
                                                whiteSpace: 'wrap',
                                            }}
                                            dangerouslySetInnerHTML={{ __html: featureGroup.SQL_QUERY.join('<br/>') }}
                                        />
                                        <StyledTableCell align="left" sx={{ fontFamily: 'Fira Code' }}>
                                            <TextField
                                                fullWidth
                                                id={`filled-size-small-${featureGroupID}`}
                                                label={`${featureGroup.IDENTIFIERS.join(', ')}`}
                                                size="small"
                                                InputProps={{
                                                    style: {
                                                        borderRadius: "10px",
                                                        border: '0px',
                                                        backgroundColor: "#e4e4e6",
                                                        marginBottom: '5px'
                                                    }
                                                }}
                                                required
                                                name={featureGroupID}
                                                value={uniqueIdentifiers[featureGroupID]?.uniqueIdentifiers || ''}
                                                onChange={(e) => handleIdentifierChange(e, index, featureGroupID)}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="center">

                                            {isLoading ? (
                                                <CircularProgress size={24} />
                                            ) : isSuccess ? (
                                                <FaCheckCircle style={{ color: 'green', fontSize: '24px' }} />
                                            ) : isFailure ? (
                                                <RxCrossCircled style={{ color: 'red', fontSize: '24px' }} />
                                            ) : (
                                                <Button
                                                    variant='outlined'
                                                    fullWidth
                                                    onClick={() => handleValidation(featureGroupID)}
                                                >
                                                    Validate
                                                </Button>
                                            )}

                                        </StyledTableCell>
                                    </TableRow>

                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <h4 style={{ textAlign: 'left' }}>EMAIL NOTIFICATIONS</h4>
            <div className="email-notifs">
                <b>You: </b><Chip color='error' label={defaultEmailID} style={{ fontFamily: 'Fira Code', backgroundColor: '#FFE4E4', color: '#FF0000' }} /><br />
                <b>Owners: </b> {selectedFeatureGenData.OWNER.map((owner) => {
                    return (<Chip key={owner} label={`${owner}`} style={{ fontFamily: 'Fira Code' }} />)
                })}<br />
                <b>Additional Emails: </b>
                <div className="additional-emails">
                    {emailIdList.map((x, i) => {
                        return (
                            <div key={i} className="email-id">
                                <div className="text-field-box">
                                    <TextField
                                        name="emailID"
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        size="small"
                                        InputProps={{
                                            style: {
                                                borderRadius: "10px",
                                                border: '0px',
                                                backgroundColor: "#e4e4e6",
                                                marginBottom: '5px'
                                            }
                                        }}
                                        value={x.emailID}
                                        onChange={e => handleEmailIDChange(e, i)}
                                    />
                                    {emailIdList.length !== 1 && (
                                        <IconButton
                                            className="remove-button"
                                            size="small"
                                            onClick={() => handleEmailIDDeletion(i)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </div>
                                {emailIdList.length - 1 === i && (
                                    <IconButton
                                        className="add-button"
                                        onClick={handleEmailIDAddition}
                                        size="small"
                                    >
                                        <AddIcon />
                                    </IconButton>
                                )}
                            </div>
                        );
                    })}

                </div>

            </div>
            <Button
                className='submit-button'
                variant='contained'
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#D7F9CB',
                    color: '#117D00',
                    border: '1px solid #117D00',
                    fontWeight: 'bold',
                }}
                onClick={handleSubmitClick}
            >
                Submit
            </Button>

            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Feature Creation Request Submitted Successfully!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default FeatureCreationRequest2;