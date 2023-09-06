import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function PedidoConfirmado({ onSalirClick }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'green' }} />
      <Typography variant="h4" sx={{ mt: 2 }}>
        Pedido Confirmado con Éxito
      </Typography>
      <Button variant="contained" color="primary" onClick={onSalirClick}>
        Salir
      </Button>
    </Box>
  );
};

export default PedidoConfirmado;


