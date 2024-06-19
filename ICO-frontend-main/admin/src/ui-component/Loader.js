import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
// ==============================|| LOADER ||============================== //
const Loader = () => {
  const [open, setOpen] = React.useState(true);
   /*  <Box className='loader' >
    <CircularProgress />
  </Box> */
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
    open={open}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default Loader;
