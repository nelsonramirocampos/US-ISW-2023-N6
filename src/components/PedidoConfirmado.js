import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// Importa el ícono de Material Icons
import CheckIcon from '@mui/icons-material/Check';

/**
 * Componente que muestra un diálogo de confirmación de pedido exitoso.
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.open - Determina si el diálogo está abierto o cerrado.
 * @param {function} props.onClose - Función para cerrar el diálogo.
 */
function PedidoConfirmado(props) {
  const { open, onClose } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="pedido-confirmado-dialog-title"
      aria-describedby="pedido-confirmado-dialog-description"
      maxWidth="xs"
      PaperProps={{
        style: {
          backgroundColor: 'rgba(76, 175, 80, 0.8)', // Verde semi-transparente que indica éxito
          textAlign: 'center',
          boxShadow: 'none', // Quita la sombra predeterminada
        },
      }}
    >
      <DialogTitle id="pedido-confirmado-dialog-title">
        <CheckIcon style={{ fontSize: 48, color: 'white' }} /> ¡Pedido Confirmado!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="pedido-confirmado-dialog-description">
          Tu pedido se ha generado correctamente.
        </DialogContentText>
        <DialogContentText id="pedido-confirmado-dialog-description-dos">
          ¡Gracias por elegirnos!
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button onClick={onClose} color="primary" variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PedidoConfirmado;
