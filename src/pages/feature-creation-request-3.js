import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { FiCopy } from 'react-icons/fi';
import './feature-creation-request-3.css';
import Button from '@mui/material/Button';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { FaCheckCircle } from "react-icons/fa";
import { FiLink2 } from "react-icons/fi";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkIcon from '@mui/icons-material/Link';
import CopyToClipboard from 'react-copy-to-clipboard';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FeatureCreationRequest3 = () => {
    const location = useLocation();
    const featureGenID = location.state.featureGenID;
    const response = location.state.responseData;
    const [snackbarOpenCopy, setSnackbarOpenCopy] = useState(false);
    const [snackbarOpenRunID, setSnackbarOpenRunID] = useState(false);
    const [snackbarOpenCloudWatch, setSnackbarOpenCloudWatch] = useState(false);


    console.log(response)

    const handleCopyClick = (type) => {
        // Handle snackbar based on the type
        switch (type) {
            case 'copy':
                setSnackbarOpenCopy(true);
                break;
            case 'runID':
                setSnackbarOpenRunID(true);
                break;
            case 'cloudWatch':
                setSnackbarOpenCloudWatch(true);
                break;
            default:
                break;
        }
    };


    const handleSnackbarClose = (type) => {
        switch (type) {
            case 'copy':
                setSnackbarOpenCopy(false);
                break;
            case 'runID':
                setSnackbarOpenRunID(false);
                break;
            case 'cloudWatch':
                setSnackbarOpenCloudWatch(false);
                break;
            default:
                break;
        }
    };



    return (
        <>
            <div className='title'>
                <CopyToClipboard text={featureGenID} onCopy={() => handleCopyClick('copy')}>
                    <IconButton className='copy-button'>
                        <ContentCopyIcon />
                    </IconButton>
                </CopyToClipboard>
                <Snackbar open={snackbarOpenCopy} autoHideDuration={4000} onClose={() => handleSnackbarClose('copy')}>
                    <Alert onClose={() => handleSnackbarClose('copy')}>
                        Feature Gen ID copied to clipboard!
                    </Alert>
                </Snackbar>
                <h2>{featureGenID} </h2> &nbsp;&nbsp;&nbsp;&nbsp;
                <FaCheckCircle className="check" />
            </div>

            <div className="run-id">
                <CopyToClipboard text={response.run_id} onCopy={() => handleCopyClick('runID')}>
                    <IconButton className='copy-button'>
                        <ContentCopyIcon />
                    </IconButton>
                </CopyToClipboard>
                <Snackbar open={snackbarOpenRunID} autoHideDuration={4000} onClose={() => handleSnackbarClose('runID')}>
                    <Alert onClose={() => handleSnackbarClose('runID')} severity="success">
                        Run ID copied to clipboard!
                    </Alert>
                </Snackbar>
                <h2 style={{ display: 'flex', alignItems: 'center' }}>Run ID : <div style={{ color: "#1AB900", marginLeft: '5px', fontWeight: 'normal', paddingLeft: '5px' }}>{response.run_id}</div></h2>
            </div>

            <div className="start-time">
                <h2 className='Special' style={{ display: 'flex', alignItems: 'center' }}>Job Start Time : <div style={{ color: "#1AB900", marginLeft: '5px' }}>{response.start_time}</div></h2>
            </div>





            <div className="cloudwatch-link">
                <CopyToClipboard text={response.status} onCopy={() => handleCopyClick('cloudWatch')}>
                    <IconButton className='copy-button'>
                        <LinkIcon />
                    </IconButton>
                </CopyToClipboard>
                <Snackbar open={snackbarOpenCloudWatch} autoHideDuration={4000} onClose={() => handleSnackbarClose('cloudWatch')}>
                    <Alert onClose={() => handleSnackbarClose('cloudWatch')} severity="success">
                        CloudWatch link copied to clipboard!
                    </Alert>
                </Snackbar>
                <h2><a className="link">CloudWatch Link</a></h2>
            </div>

            <div style={{ fontSize: '20px', paddingTop: '50px', paddingLeft: '55px' }}>
                <p>
                    You will receive an email once the job is completed, please use the provided queries<br /> in the email to access generated features.
                </p>
            </div>

            <div style={{ fontSize: '12px', paddingTop: '50px', paddingLeft: '55px' }}>
                <p>
                    Click here or go to the <a className="tab-redirect">Feature Creation Request</a> tab to Submit another job.
                </p>
                <p>
                    Click here or go to the <a className="tab-redirect">MLOPS Batch</a> tab to Submit another job.
                </p>
            </div>
        </>

    )
}

export default FeatureCreationRequest3;