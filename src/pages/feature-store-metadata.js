import Select from 'react-select'
import { useState, useEffect } from 'react';
import './feature-store-metadata.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.common.white,
        fontFamily: 'Fira Code'
    },
    [`&.${tableCellClasses.body}`]: {
        borderBottom: '1px solid #365069',
        borderRight: '1px solid #365069',
        fontFamily: 'Fira Code',
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





const FeatureStoreMetadata = ({ data }) => {
    const [featureGenID, setFeatureGenID] = useState(null);
    const [featureGroup, setFeatureGroup] = useState(null);
    const [featureGenData, setFeatureGenData] = useState(null);
    const [featureGroupData, setFeatureGroupData] = useState(null);

    const genIDOptions = data.FEATURE_GEN_ID.GEN_ID_LIST.map((featureGenIDOption) => ({
        value: featureGenIDOption,
        label: featureGenIDOption,
    }));
    
    const featureGroups = data.FEATURE_GROUPS;
    const groupIDOptions = Object.keys(featureGroups).map((groupID) => ({
        value: groupID,
        label: groupID,
    }));

    useEffect(() => {
        if (featureGenID) {
            setFeatureGenData(data.FEATURE_GEN_ID[featureGenID.value]);
        }
    }, [featureGenID]);

    useEffect(() => {
        if (featureGroup) {
            setFeatureGroupData(data.FEATURE_GROUPS[featureGroup.value]);
        }
    }, [featureGroup]);


    const options = [
        {
            label: 'Feature Generation IDs',
            options: genIDOptions
        },
        {
            label: 'Feature Groups',
            options: groupIDOptions
        }
    ]



    return (
        <div className='fs-metadata'>
            <Select
                className='dropdown'
                options={options}
                isSearchable
                onChange={(selectedOption) => {
                    //if selected option is a feature gen id, set feature gen id, else set feature group
                    if (genIDOptions.includes(selectedOption)) {
                        setFeatureGenID(selectedOption);
                        setFeatureGroup(null);
                        console.log(selectedOption);
                        console.log(featureGenID);
                    } else {
                        setFeatureGroup(selectedOption);
                        setFeatureGenID(null);
                        console.log(selectedOption);
                        console.log(featureGroup);
                    }
                }
                }
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

            {featureGenID && featureGenData && (
                <div className='feature-group-table'>
                    <TableContainer component={Paper}>
                        <Table aria-label="table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell><b>Feature Groups</b></StyledTableCell>
                                    <StyledTableCell align="left"><b>Input Query</b></StyledTableCell>
                                    <StyledTableCell align="left"><b>No. of Active Features</b></StyledTableCell>
                                    <StyledTableCell align="left"><b>FS Owners</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {featureGenData.GROUP_IDS.map((featureGroupID) => {
                                    const featureGroup = data.FEATURE_GROUPS[featureGroupID];
                                    return (
                                        <StyledTableRow
                                            key={featureGroupID}
                                        >
                                            <StyledTableCell component="th" scope="row" sx={{ width: '250px' }}>
                                                {featureGroupID}
                                            </StyledTableCell>
                                            <StyledTableCell align="left" sx={{ fontFamily: 'Fira Code', maxWidth: '300px', overflow: 'auto', textOverflow: 'clip', whiteSpace: 'wrap' }}>{featureGroup.SQL_QUERY.join("\n")}</StyledTableCell>
                                            <StyledTableCell align="left" >{featureGroup.FEATURES_LIST.length}</StyledTableCell>
                                            <StyledTableCell align="left">{featureGroup.FS_OWNER}</StyledTableCell>

                                        </StyledTableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}

            {featureGroup && featureGroupData && (
                <>
                    <Card variant='outlined' className='feature-group-card'>
                        <CardContent>
                            <div>
                                <p className='description-box'><b>Description :</b><br />
                                    {featureGroupData.FEATURE_GROUP_DESCRIPTION}
                                </p>
                                <p><b>Identifiers : </b>&nbsp;{featureGroupData.IDENTIFIERS.join(", ")}</p>
                                <p><b>FS Owner    : </b>&nbsp;{featureGroupData.FS_OWNER}</p>
                                <p><b>Retention   : </b>&nbsp;{featureGroupData.RETENTION}</p>
                                <p><b>Executors   : </b>&nbsp;{featureGroupData.EXECUTORS}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card variant='outlined' className='sql-query-card' sx={{ backgroundColor: '#fff7f5' }}>
                        <CardContent>
                            <div>
                                <b>SQL Query  :</b>
                                <p dangerouslySetInnerHTML={{ __html: featureGroupData.SQL_QUERY.join('<br/>') }} />
                            </div>
                        </CardContent>
                    </Card>
                    {/* make a lis showing features list */}
                    <Card variant='outlined' className='features-list-card'>
                        <CardContent>
                            <div>
                                <b>Features List  :</b>
                                <ListItem sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItemButton>
                                        <ListItemText primary={featureGroupData.FEATURES_LIST.join("\n")} />
                                    </ListItemButton>
                                </ListItem>
                            </div>
                        </CardContent>  
                    </Card>
                </>
            )}

        </div>
    );
};

export default FeatureStoreMetadata;
