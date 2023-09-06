// Footer.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#333',
        color: 'white',
        padding: '16px',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body1">© 2023 DeliveryEat!. Todos los derechos reservados.</Typography>
    </Box>
  );
};

export default Footer;
