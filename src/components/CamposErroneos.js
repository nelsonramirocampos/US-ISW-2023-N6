import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import ErrorIcon from '@mui/icons-material/Error'; // Usar un ícono de error en lugar de verificación

function CamposErroneos(props) {
  const { open, onClose } = props;

  // Estilo CSS para hacer que el texto sea rojo
  const textoRojoStyle = {
    color: 'red', // Cambiar el color a rojo
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Estilo para el contenedor del título
  const tituloContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Estilo para el contenedor del texto al lado del ícono
  const textoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Estilo para el ícono de error
  const iconoStyle = {
    fontSize: 48,
    color: 'red', // Cambiar el color a rojo
    marginRight: '8px',
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="campos-erroneos-dialog-title"
      aria-describedby="campos-erroneos-dialog-description"
      maxWidth="xs"
      PaperProps={{
        style: {
          boxShadow: 'none', 
          backgroundColor: '#EAEBED',
        },
      }}
    >
      <DialogTitle id="campos-erroneos-dialog-title" style={tituloContainerStyle}>
        <ErrorIcon style={iconoStyle} /> {/* Usar un ícono de error */}
        <span style={{ fontSize: '24px' }}>¡Campos con Errores!</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="campos-erroneos-dialog-description" style={textoContainerStyle}>
          <span style={textoRojoStyle}>Por favor, verifica los campos con errores.</span>
        </DialogContentText>
        <DialogContentText id="campos-erroneos-dialog-description-dos">
          <span style={textoRojoStyle}>Corrige los errores antes de continuar.</span>
        </DialogContentText>
      </DialogContent>
      <Button onClick={onClose} color="primary" variant="contained" fullWidth style={{ backgroundColor: '#006989' }}>
        Cerrar
      </Button>
    </Dialog>
  );
}

export default CamposErroneos;
