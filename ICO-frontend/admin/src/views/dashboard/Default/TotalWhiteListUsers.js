import PropTypes from 'prop-types';
import { useEffect } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {  Avatar,Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../store/action/admin"
 
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&>div': {
        position: 'relative',
        zIndex: 5
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        zIndex: 1,
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: 1,
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const TotalWhiteListUsers = (props,{ isLoading }) => {
    const theme = useTheme();
    const { dashboardDetails } = props.admin;

    useEffect(() => {
        props.getDashboardDetails();
    }, []);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalOrderCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor: theme.palette.primary[800],
                                                color: '#fff',
                                                mt: 1
                                            }}
                                        >
                                             
                                        </Avatar>
                                    </Grid>
                                     
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 0.75 }}>
                                <Grid container alignItems="center">
                                     
                                        <Grid container alignItems="center">
                                            <Grid item>
                                                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                    {dashboardDetails ? dashboardDetails.totalWhiteListUsers : ""} 
                                                    </Typography>
                                            </Grid>
                                             
                                            <Grid item xs={12}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        color: theme.palette.primary[200]
                                                    }}
                                                >
                                                    Total Whitelisted Users
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                   
                                     
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TotalWhiteListUsers.propTypes = {
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(TotalWhiteListUsers);