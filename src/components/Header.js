import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#007090' }}>
      <Toolbar>
        <Typography variant="h6">DeliveryEat!</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
