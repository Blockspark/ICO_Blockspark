import PropTypes from 'prop-types';
import React, { useState ,useEffect} from 'react';
// material-ui
 
import { Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../store/action/admin"
import moment from "moment";
import {convertToLocalTime} from "../../../helper/Common"
import Loader from '../../../ui-component/Loader';
// ==============================|| DASHBOARD DEFAULT - LATEST USERS ||============================== //

const LatestUsers = (props,{ isLoading }) => {
 
    /* const theme = useTheme();
    const customization = useSelector((state) => state.customization); */
    const { list } = props.admin;
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        props.getLatestUsers();
    }, []);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                      {showLoader && <Loader />}
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                       
                                        <Grid item>
                                            <Typography variant="h3">Latest Users</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                       
                        {list.data ? (
                            <>
                                     <TableContainer component={Paper}>
                                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#</TableCell>
                                                    <TableCell>Full Name</TableCell>
                                                    <TableCell align="right">Email</TableCell>
                                                    <TableCell align="right">Created At</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {list.data.map((row) => (
                                                    <TableRow
                                                    key={row.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                    <TableCell component="th" scope="row">
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.full_name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.email}</TableCell>
                                                    <TableCell align="right"> 
                                                    {moment(convertToLocalTime(row.created_at)).fromNow()}
                                                    </TableCell>
                                                
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                            </>
                        ) : null}

                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

LatestUsers.propTypes = {
    isLoading: PropTypes.bool
};


const mapStateToProps = (state) => {
    return {
        admin: state.Admin,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      ...bindActionCreators({ ...Actions }, dispatch),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(LatestUsers);