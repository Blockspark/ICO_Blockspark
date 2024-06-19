import React, { useEffect, useState } from "react";
import {  Box, InputAdornment, OutlinedInput,FormHelperText,Grid } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
// mui
import { useTheme, styled } from '@mui/material/styles';
import {  IconSearch,IconClearAll } from '@tabler/icons';
import CloseIcon from '@mui/icons-material/Close';
import { shouldForwardProp } from '@mui/system';
import Pagination from "../../../components/Common/Pagination";
import Datatable from "../../../components/Common/Datatable";
import config from "../../../constants/config";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../store/action/admin";
import {FormControl,MenuItem,Select,InputLabel,Typography} from '@mui/material';

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
import Stack from '@mui/material/Stack';
import Loader from "../../../ui-component/Loader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Slide from '@mui/material/Slide';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import User from "../../../store/api/User";
import  showToast from "../../../helper/Api"
import TextField from '@mui/material/TextField';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AnimateButton from 'ui-component/extended/AnimateButton';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UserList = (props) => {
    const { children } = props;

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [id, setId] = useState("");
    const [open, setOpen] = useState(false);
    const [openEditModel, setOpenEditModel] = useState(false);
    const [addModelOpen, setAddModelOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const [newUserRole, setNewUserRole] = useState("user");
    
    const theme = useTheme();
    const { list } = props.admin;
    const param = {
        page_number: page,
        page_size: config.page_size,
        search: search,
        role:roleFilter
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickOpenEditDialog = async (row) => {
        setEmail("");
        setFullName("");
        setRole("");
        setPassword("");
        
        setEmail(row.email);
        setFullName(row.full_name);
        setRole(row.role);
        setId(row.id)
        setOpenEditModel(true);
    };

    const handleClickOpenDeleteDialog = async (id) => {
        setOpen(true);
        setId(id)
    };

    const addNewUserModelOpen = async () => {
        setAddModelOpen(true);
    };

    
    
    const updateUserDetails = () => {
        if(fullName == ""){
            showToast({ message: "Please enter valid full name", type: "error" });
        }else if(email == ""){
            showToast({ message: "Please enter valid email", type: "error" });
        }else if(role == ""){
            showToast({ message: "Please select valid status", type: "error" });
        }else {
            let data = {
                full_name:fullName,
                email:email,
                id:id,
                role:role,
                password:password
            }

            setShowLoader(true);
            User.updateUserDetail(data).then((res) => {
                if(res.data.result.statusCode == 200){
                    setShowLoader(false);
                    setOpenEditModel(false);
                    showToast({ message: res.data.result.message, type: "success" });
                    props.getUserList(param);
                }else {
                    setShowLoader(false);
                    showToast({ message: res.data.result.message, type: "error" });
                }
                    
                }).catch((e) => {
                    setShowLoader(false);
                })  
        }

        
    };

    const deleteUser = () => {
        setShowLoader(true);
        User.deleteUser(id).then((res) => {
            if(res.data.result.statusCode == 200){
                setShowLoader(false);
                setOpen(false);
                showToast({ message: res.data.result.message, type: "success" });
                props.getUserList(param);
            }else {
                setShowLoader(false);
                showToast({ message: res.data.result.message, type: "error" });
            }
                
            }).catch((e) => {
                setShowLoader(false);
                showToast({ message: "Something went wrong, please try again", type: "error" });
            })
    };

    const handleClose = () => {
        setOpen(false);
        setOpenEditModel(false);
        setAddModelOpen(false);
    };

    useEffect(() => {
        props.getUserList(param);
    }, [page, search,roleFilter]);

    const handleChange = async (event) => {
        setRoleFilter(event.target.value);
    }
    const handleChangeRole = async (event) => {
        setRole(event.target.value);
    }

    const selectNewUserRole = async (event) => {
        setNewUserRole(event.target.value);
    }
    
    return ( <MainCard title="User List" secondary={ <Box ssx={{
                ml: 2,
                mr: 3,
                [theme.breakpoints.down('md')]: {
                    mr: 2
                }
            }}>
            <Button sx={{ minWidth: 150,p:1.4 }} onClick={() => addNewUserModelOpen()}variant="contained" color="primary">
                    Add New User
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
                <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={roleFilter}
                    label="Role"
                    onChange={handleChange}>
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"user"}>User</MenuItem>
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
                                    <TableCell >Role</TableCell>
                                    <TableCell >KYC Approval</TableCell>
                                    <TableCell >Created At</TableCell>
                                    <TableCell >Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.data.map((row,index) => {
                                    return ( 
                                    <TableRow  key={row.id}>
                                            
                                            <TableCell  component="th" scope="row">{row.id}</TableCell>
                                            <TableCell component="th" scope="row">{row.full_name}</TableCell>
                                            <TableCell >{row.email}</TableCell>
                                            <TableCell > {row.role}</TableCell>
                                            <TableCell > {row.kyc_status}</TableCell>
                                            <TableCell > {row.created_at != undefined ?  displayDate(row.created_at)  : ""}</TableCell>
                                            <TableCell>
                                                
                                                <Stack direction="row" spacing={2}>
                                                    <Button onClick={() => handleClickOpenEditDialog(row)} variant="outlined">Edit</Button>
                                                    <Button  onClick={() => handleClickOpenDeleteDialog(row.id)}   color="error" variant="outlined">Delete</Button>
                                                </Stack>
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
        <div>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    fullWidth={true}
                    maxWidth="sm"
                    open={open} >
                    <DialogTitle sx={{ m: 0, p: 3 ,fontSize:"25px"}}  >
                        Are you sure you want to delete?
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogActions sx={{ m: 3, p: 10 ,}}>
                    <Button onClick={handleClose} color="secondary" variant="contained">
                        Close
                    </Button>
                    <Button onClick={deleteUser} color="error" variant="contained">
                        Delete
                    </Button>
                    </DialogActions>
                </BootstrapDialog>

                {/* edit user dialog */}
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    fullWidth={true}
                    maxWidth="sm"
                    open={openEditModel} >
                    <DialogTitle sx={{ m: 0, p: 3 ,fontSize:"25px"}}  >
                        Edit User Detail
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="full_name"
                            label="Full Name"
                            type="text"
                            fullWidth
                            autoComplete="off"
                            variant="standard"
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName} />

                        <TextField
                            sx={{ mt: 3 }}
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            autoComplete="off"
                            variant="standard"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />

                        <FormControl  variant="standard" sx={{ mt: 3, minWidth: 552 }}>
                            <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={role}
                                onChange={handleChangeRole}
                                label="Role" >
                                <MenuItem value={"admin"}>Admin</MenuItem>
                                <MenuItem value={"user"}>User</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                                autoComplete="off"
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                variant="standard" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                inputProps={{}}
                        />

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ m: 3, p: 10 ,}}>
                    <Button onClick={handleClose} color="secondary" variant="contained">
                        Close
                    </Button>
                    <Button  onClick={updateUserDetails} color="primary" variant="contained">
                        Update
                    </Button>
                    </DialogActions>
                </BootstrapDialog>

                {/* Add user dailog */}

                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    fullWidth={true}
                    maxWidth="sm"
                    open={addModelOpen} >
                    <DialogTitle sx={{ m: 0, p: 3 ,fontSize:"25px"}}  >
                        Add New User
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                    <Formik
                initialValues={{
                    full_name:'',
                    email: '',
                    password: '',
                    submit: null,
                    role:newUserRole
                }}
                validationSchema={Yup.object().shape({
                    full_name: Yup.string().max(255).required('Full Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                     
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        let data = values;
                        data = {
                            ...values
                        };
                        data.role = newUserRole
                        setShowLoader(true);
                         User.addNewUser(data).then((res) => {
                            setShowLoader(false);
                            setAddModelOpen(false);
                            props.getUserList(param);
                            showToast({ message: "New user Added successfully", type: "success" });
                            
                          }).catch((e) => {
                             
                          }) 

                    } catch (err) {
                        console.error(err);
                            showToast({ message: err.message, type: "error" });
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form autoComplete="off" noValidate onSubmit={handleSubmit} >
                         <FormControl fullWidth error={Boolean(touched.full_name && errors.full_name)} sx={{ ...theme.typography.customInput }}>
                         <TextField
                            autoFocus
                            margin="dense"
                            id="full_name"
                            label="Full Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.full_name}
                            autoComplete="off"
                            name="full_name"
                            onBlur={handleBlur}
                            onChange={handleChange} />
                            {touched.full_name && errors.full_name && (
                                <FormHelperText sx={{ ml: 0 }} error id="standard-weight-helper-text--register">
                                    {errors.full_name}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            autoComplete="new-password"
                            variant="standard"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange} />
                            {touched.email && errors.email && (
                                <FormHelperText sx={{ ml: 0 }} error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl variant="standard" fullWidth error={Boolean(touched.role && errors.role)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel className="new-user-role-label" id="demo-simple-select-standard-label">Role</InputLabel>
                        <Select
                          variant="standard"
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={newUserRole}
                            label="Role"
                             
                            onChange={(e) => {
                                handleChange(e);
                                selectNewUserRole(e);
                            }}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"admin"}>Admin</MenuItem>
                            <MenuItem value={"user"}>User</MenuItem>
                        </Select>

                        {touched.role && errors.role && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.role}
                                </FormHelperText>
                        )}
                    </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                              <TextField
                                 autoComplete="new-password"
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                variant="standard" 
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                inputProps={{}}
                                />
                            {touched.password && errors.password && (
                                <FormHelperText sx={{ ml: 0 }} error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }} >
                            <Stack direction="row" spacing={2}>
                            <Button type="button" onClick={handleClose} color="secondary" variant="contained">
                                Close
                            </Button>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary">
                                    Save User
                                </Button>
                            </AnimateButton>            
                            </Stack>                            
                        </Box>
                    </form>
                )}
            </Formik>
                    </DialogContent>
                </BootstrapDialog>
        </div>
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