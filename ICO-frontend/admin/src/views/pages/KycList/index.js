import React, { useEffect,  useState } from "react";
import {  Box, InputAdornment, OutlinedInput } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {  IconSearch } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import Pagination from "../../../components/Common/Pagination";
import Datatable from "../../../components/Common/Datatable";
import config from "../../../constants/config";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../store/action/admin"; 
import {FormControl,MenuItem,Select,InputLabel} from '@mui/material';
import { approvedWhiteListUser,approvedMultipleUserWhiteList } from "../../../helper/Common"
import { connectWallet } from "../../../helper/interact"
import  showToast from "../../../helper/Api"
import Emitter from '../../../services/emitter';
import User from "../../../store/api/User";
import { Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {displayDate} from "../../../helper/Common";
import Checkbox from '@mui/material/Checkbox';
import Loader from "../../../ui-component/Loader";

// ==============================|| Whitelist User page ||============================== //

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
    width: 434,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));


const UserList = (props) => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [selected, setSelected] = useState([]);
    const [walletAddress, setWallet] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const theme = useTheme();
    const {  list } = props.admin;
    const param = {
        page_number: page,
        page_size: config.page_size,
        search: search,
        status:status
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = list.data.map((row) => row.wallet_address);
          console.log("newSelecteds from all",newSelecteds)
          setSelected(newSelecteds);
        }else {
            setSelected([]);
        }
        
    };

    const handleClick = (event, row) => {

        const selectedIndex = selected.indexOf(row.wallet_address);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, row.wallet_address);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
        console.log("newSelected",newSelected);

    };

    const isSelected = (wallet_address) => selected.indexOf(wallet_address) !== -1;

    useEffect(() => {
        props.getWhitelistedUsers(param);
    }, [page, search,status]);

    const handleChange = async (event) => {
        setStatus(event.target.value);
    }

    const onApproved = async (id,row) => {
        if (walletAddress.length > 0 ) {
            if(row.wallet_address > 0 ){
                try {
                    setShowLoader(true);
                    const response = await approvedWhiteListUser(row.wallet_address);
                    if(response){
                        await onVerifyWhiteListUser (row.id,row.wallet_address, false);
                        setShowLoader(false);
                    }else {
                        setShowLoader(false);
                    }
                    
                } catch (error) {
                    console.log("error",error)
                }
            }else {
                showToast({ message: "Does not exist user wallet address", type: "error" });
            }
        }else {
            const walletResponse = await connectWallet();
            setWallet(walletResponse.address);
            Emitter.emit('setWalletAddressEmitter', walletResponse.address);
            if(row.wallet_address > 0 ){
                try {
                    setShowLoader(true);
                    const response =  await approvedWhiteListUser(row.wallet_address);
                    if(response){
                        await onVerifyWhiteListUser (row.id,row.wallet_address, false);
                        setShowLoader(false);
                    }else {
                        setShowLoader(false);
                    }
                    
                } catch (error) {
                    console.log("error",error)
                }
            }else {
                showToast({ message: "Does not exist user wallet address", type: "error" });
            }
        }

    }

    const onAllApproved = async () => {
        if (walletAddress.length > 0 ) {
            if(selected.length > 0 ){
                try {
                    setShowLoader(true);
                    const response =  await approvedMultipleUserWhiteList(selected);
                    if(response){
                        await onVerifyWhiteListUser (0,selected,true);
                    }else {
                        setShowLoader(false);
                    }
                    
                } catch (error) {
                    console.log("error",error)
                }
            }else {
                showToast({ message: "Please select any valid user", type: "error" });
            }
        }else {
            const walletResponse = await connectWallet();
            setWallet(walletResponse.address);
            Emitter.emit('setWalletAddressEmitter', walletResponse.address);
            if(selected.length > 0 ){
                try {
                    setShowLoader(true);
                    const response =  await approvedMultipleUserWhiteList(selected);
                    if(response){
                        await onVerifyWhiteListUser (0,selected, true);
                    }else {
                        setShowLoader(false);
                    }
                    
                } catch (error) {
                    console.log("error",error)
                }
            }else {
                showToast({ message: "Please select any valid user", type: "error" });
            }
        }

    }
      
    const onVerifyWhiteListUser = async (id,address,isMultiple) => {
        try {

            let data = {
                id:id,
                address:address,
                is_multiple:isMultiple
            };

            User.verifyWhiteListUser(data).then((res) => {
            if(res.data.result.statusCode == 200){
                setSelected([]);
                showToast({ message: res.data.result.message, type: "success" });
                props.getWhitelistedUsers(param);
            }else {
                showToast({ message: res.data.result.message, type: "error" });
            }
                
            }).catch((e) => {
                showToast({ message: "Something went wrong, please try again", type: "error" });
            })

        } catch (err) {
            showToast({ message: "Something went wrong, please try again", type: "error" });
        }
    } 

    return ( 

            <MainCard title="Whitelisted Users" secondary={ <Box ssx={{
                ml: 2,
                mr: 3,
                [theme.breakpoints.down('md')]: {
                    mr: 2
                }
            }}>
            <Button sx={{ minWidth: 150,p:1.4 }} onClick={() => onAllApproved()}variant="contained" color="primary">
                    All Approved
            </Button>
            <OutlineInputStyle
                id="input-search-header"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                placeholder="Search"
                startAdornment={
                    <InputAdornment position="start">
                        <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                    </InputAdornment>
                }
                
                aria-describedby="search-helper-text"
                inputProps={{ 'aria-label': 'weight' }}
            />
           <FormControl className="whitelist-selectbox"  sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={status}
                    label="Status"
                    onChange={handleChange}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"pending"}>Pending</MenuItem>
                    <MenuItem value={"verify"}>Verify</MenuItem>
                    <MenuItem value={"disabled"}>Disabled</MenuItem>
                </Select>
                </FormControl>
        </Box>}>
        
       
       {list.data ? (
          <>
            <div className='MuiTableContainer-root css-kge0eu'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    onClick={handleSelectAllClick}
                                    checked={list.data.length > 0 && selected.length === list.data.length}
                                    inputProps={{
                                    'aria-label': 'select all desserts',
                                    }}
                                />
                                </TableCell>
                                <TableCell>#</TableCell>
                                <TableCell >Full Name</TableCell>
                                <TableCell >Email</TableCell>
                                <TableCell >Address</TableCell>
                                <TableCell >Whitelist Status</TableCell>
                                <TableCell >Whitelisted At</TableCell>
                                <TableCell >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.data.map((row,index) => {
                                
                                const isItemSelected = isSelected(row.wallet_address);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return ( 
                                <TableRow
                                    hover
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event) => handleClick(event, row)}
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }} />
                                        </TableCell>
                                        <TableCell id={labelId} component="th" scope="row">{row.id}</TableCell>
                                        <TableCell component="th" scope="row">{row.full_name}</TableCell>
                                        <TableCell >{row.email}</TableCell>
                                        <TableCell >{row.wallet_address}</TableCell>
                                        <TableCell > <div className={`white_list_status  color-${row.white_list_status} `}> <span > {row.white_list_status} </span> </div></TableCell>
                                        <TableCell > {row.whitelisted_at != undefined ?  displayDate(row.whitelisted_at)  : ""}</TableCell>
                                        <TableCell>
                                        {row.white_list_status.length && row.white_list_status.length > 0 && row.white_list_status === 'pending' ?  <Button variant="outlined" color="error"
                                                    className="view-btn"
                                                    onClick={() => onApproved(row.id,row)}
                                                    >
                                                    Approved
                                                </Button>  : ""}
                                                
                                        </TableCell>
                                </TableRow> );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 css-9gh3yu">
                <Pagination dataList={list} page={page} setPage={setPage} />
            </div>
          </>
        ) : null}
         {showLoader && <Loader />}
    </MainCard>
    );
}

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
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserList);