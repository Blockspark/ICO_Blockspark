import React, { useEffect,  useState } from "react";
import {  Box, InputAdornment, OutlinedInput } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {  IconSearch } from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';
import Pagination from "../../../components/Common/Pagination";
import config from "../../../constants/config";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../store/action/admin"; 
import {FormControl,MenuItem,Select,InputLabel} from '@mui/material';
import { approvedWhiteListUser,approvedMultipleUserWhiteList } from "../../../helper/Common"
import { connectWallet,getOwner,getCurrentWalletConnected,verifyAdmin } from "../../../helper/interact"
import  showToast from "../../../helper/Api"
import Emitter from '../../../services/emitter';
import User from "../../../store/api/User";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {displayDate} from "../../../helper/Common";
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
    const [isAdmin, setIsAdmin] = useState(false);

    const param = {
        page_number: page,
        page_size: config.page_size,
        search: search,
        status:status
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = list.data.map((row) => row.wallet_address);
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

    };

    const isSelected = (wallet_address) => selected.indexOf(wallet_address) !== -1;

    useEffect(() => {
        props.getWhitelistedUsers(param);
    }, [page, search,status]);


    useEffect(() => {
         async function setup(){
            const { address } = await getCurrentWalletConnected();
            setWallet(address);
            
            if (address.length > 0) {
                let getOwnerAddress = await verifyAdmin(address);
                if(getOwnerAddress){
                    setIsAdmin(true);
                }                
            }
         }
         setup();
    }, []);

    

    const handleChange = async (event) => {
        setStatus(event.target.value);
    }

    const onApproved = async (id,row) => {

        if (walletAddress.length > 0 ) { //check wallet address is set or not
            if(isAdmin){
                if(parseInt(window.ethereum.networkVersion) !== 1){ // check valid test network
                    showToast({ message: "Please select ethereum network for transaction", type: "error" });
                    return false;
                }

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
                showToast({ message: "You are not authorized to approve user account,please contact administrator ", type: "error" });
            }

            
        }else {
            const walletResponse = await connectWallet();
            setWallet(walletResponse.address);
            Emitter.emit('setWalletAddressEmitter', walletResponse.address);
            let getOwnerAddress = await verifyAdmin(walletResponse.address); // check verify admin or not
            if(getOwnerAddress){
                setIsAdmin(true);
            }

            if(parseInt(window.ethereum.networkVersion) !== 1){ // check valid test network
                showToast({ message: "Please select ethereum network for transaction", type: "error" });
                return false;
            }

            if(getOwnerAddress){
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
            }else {
                showToast({ message: "You are not authorized to approve user account,please contact administrator ", type: "error" });
            }
        }
         
    }

    const onAllApproved = async () => {

        if(parseInt(window.ethereum.networkVersion) !== 1){ // check valid test network
            showToast({ message: "Please select binance network for transaction", type: "error" });
            return false;
        }
        
        if (walletAddress.length > 0 ) {

            
            if(isAdmin){
                setShowLoader(true);
                User.getPendingWhitelistUsers().then(async (res) => {
                
                    if(res.data.statusCode == 200){
                        if(res.data.result.data && res.data.result.data.length > 0){
                            let selectedAddress = res.data.result.data;
                            if(selectedAddress.length > 0 ){
                                try {
                                    setShowLoader(true);
                                    const response =  await approvedMultipleUserWhiteList(selectedAddress);
                                    if(response){
                                        await onVerifyWhiteListUser (0,selectedAddress,true);
                                    }else {
                                        setShowLoader(false);
                                    }
                                } catch (error) {
                                    console.log("error",error)
                                }
                            }
                        }
    
                        setShowLoader(false);
                        
                    }else {
                        setShowLoader(false);
                        showToast({ message: res.data.result.message, type: "error" });
                    }
                    
                }).catch((e) => {
                    setShowLoader(false);
                }) 
            }else {
                showToast({ message: "You are not authorized to approve user account,please contact administrator ", type: "error" });
            }
        
        }else {
            const walletResponse = await connectWallet();
            setWallet(walletResponse.address);
            Emitter.emit('setWalletAddressEmitter', walletResponse.address);
            setShowLoader(true);
            let getOwnerAddress = await verifyAdmin(walletResponse.address);
            if(getOwnerAddress){
                setIsAdmin(true);
                User.getPendingWhitelistUsers().then(async (res) => {
            
                    if(res.data.statusCode == 200){
                        if(res.data.result.data && res.data.result.data.length > 0){
                            let selectedAddress = res.data.result.data;
                            if(selectedAddress.length > 0 ){
                                try {
                                    setShowLoader(true);
                                    const response =  await approvedMultipleUserWhiteList(selectedAddress);
                                    if(response){
                                        await onVerifyWhiteListUser (0,selectedAddress,true);
                                    }else {
                                        setShowLoader(false);
                                    }
                                } catch (error) {
                                    console.log("error",error)
                                }
                            }
                        }
                        
                        setShowLoader(false);
                        
                    }else {
                        setShowLoader(false);
                        showToast({ message: res.data.result.message, type: "error" });
                    }
                        
                }).catch((e) => {
                    setShowLoader(false);
                }) 
            }else {
                showToast({ message: "You are not authorized to approve user account,please contact administrator ", type: "error" });
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
            <Button sx={{ minWidth: 170,p:1.4 }} onClick={() => onAllApproved()} variant="contained" color="primary">
                Approve All Address
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
                        <em>All</em>
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
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                         
                                        <TableCell id={labelId} component="th" scope="row">{row.id}</TableCell>
                                        <TableCell component="th" scope="row">{row.full_name}</TableCell>
                                        <TableCell >{row.email}</TableCell>
                                        <TableCell >{row.wallet_address}</TableCell>
                                        <TableCell > <div className={`white_list_status  color-${row.white_list_status} `}> <span > {row.white_list_status} </span> </div></TableCell>
                                        <TableCell > {row.whitelisted_at != undefined ?  displayDate(row.whitelisted_at)  : ""}</TableCell>
                                        <TableCell>
                                        { row.white_list_status.length && row.white_list_status.length > 0 && row.white_list_status === 'pending' ?  <Button variant="outlined" color="error"
                                                    className="view-btn"
                                                    onClick={() => onApproved(row.id,row)}
                                                    >
                                                    Approve
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
