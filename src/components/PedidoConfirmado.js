import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

function PedidoConfirmado(props) {
  const { open, onClose } = props;

  // Estilo CSS para hacer que el texto sea negro
  const textoNegroStyle = {
    color: 'black',
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

  // Estilo para el ícono de verificación
  const iconoStyle = {
    fontSize: 48,
    color: 'green',
    marginRight: '8px',
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="pedido-confirmado-dialog-title"
      aria-describedby="pedido-confirmado-dialog-description"
      maxWidth="xs"
      PaperProps={{
        style: {
          boxShadow: 'none', // Quita la sombra predeterminada
          backgroundColor: '#EAEBED', // Cambia el color de fondo a #EAEBED
        },
      }}
    >
      <DialogTitle id="pedido-confirmado-dialog-title" style={tituloContainerStyle}>
        <CheckIcon style={iconoStyle} />
        <span style={{ fontSize: '24px' }}>¡Pedido Confirmado!</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="pedido-confirmado-dialog-description" style={textoContainerStyle}>
          <span style={textoNegroStyle}>Tu pedido se ha generado correctamente.</span>
        </DialogContentText>
        <DialogContentText id="pedido-confirmado-dialog-description-dos">
          <span style={textoNegroStyle}>¡Gracias por elegirnos!</span>
        </DialogContentText>
      </DialogContent>
      <Button onClick={onClose} color="primary" variant="contained" fullWidth style={{ backgroundColor: '#006989' }}>
        Cerrar
      </Button>
    </Dialog>
  );
}

export default PedidoConfirmado;
