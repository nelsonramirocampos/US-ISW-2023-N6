import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormaPago from './secciones/forma-pago/SeccionFormaPago';
import DatosEnvio from './secciones/SeccionDatosEnvio';
import PedidoConfirmado from './PedidoConfirmado';
import SeccionRecibimiento from './secciones/SeccionRecibimiento';
import SeccionCarritoPedido from './secciones/SeccionCarritoPedido';
import CamposErroneos from './CamposErroneos';

function Formulario() {
  // Estados iniciales
  const [isPaymentDataValid, setIsPaymentDataValid] = useState(false);
  const [isShippingDataValid, setIsShippingDataValid] = useState(false);
  const [total, setTotal] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pedidoConfirmado, ] = useState(false);
  const [carritoVacio, setCarritoVacio] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const [isDateValid, setIsDateValid] = useState(true);

  // Funciones para controlar cambios en los datos
  const handlePaymentDataChange = (isValid) => {
    setIsPaymentDataValid(isValid);
  };

  const handleShippingDataChange = (isValid) => {
    setIsShippingDataValid(isValid);
  };

  const handleDateChange = (isValid) => {
    setIsDateValid(isValid);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleTotalChange = (newTotal) => {
    setTotal(newTotal);
  };

  const handleCarritoChange = (isEmpty) => {
    setCarritoVacio(isEmpty);
  };

  const handleCloseDialog = () => {
    // Cuando se cierra el diálogo, se restablecen los estados de validación
    setIsPaymentDataValid(false);
    setIsShippingDataValid(false);
    setDialogOpen(false);
    
    window.location.reload(); // Recarga la página al cerrar el diálogo de confirmación
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación antes de abrir el diálogo de confirmación
    if (isPaymentDataValid && isShippingDataValid && !carritoVacio && isDateValid) {
      handleOpenDialog(); // Abre el diálogo de confirmación si todo es válido
    } else {
      setHasErrors(true); // Muestra errores si alguna validación falla
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ backgroundColor: '#EAEBED', minHeight: '100vh', padding: '20px' }}>
        <div>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom>
                Completá los datos de tu Pedido
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SeccionCarritoPedido
                onTotalChange={handleTotalChange}
                onCarritoChange={handleCarritoChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: '20px', marginBottom: '20px' }}>
              {pedidoConfirmado ? (
                <PedidoConfirmado onClose={handleCloseDialog} />
              ) : (
                <div>
                  <DatosEnvio onChangeDatosEnvio={handleShippingDataChange} />
                </div>
              )}
            </Grid>
            <Grid item xs={12} sx={{ marginTop: '20px', marginBottom: '20px' }}>
              <SeccionRecibimiento onChangeDate={handleDateChange}/>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: '20px', marginBottom: '20px' }}>
              <FormaPago onChangeFormaPago={handlePaymentDataChange} total={total} />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: '20px', marginBottom: '20px' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '100%', fontSize: '20px', backgroundColor: '#007090' }}
                type="submit"
              >
                Confirmar Pedido
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: '20px', marginBottom: '20px' }}>
              <PedidoConfirmado open={dialogOpen} onClose={handleCloseDialog} />
            </Grid>
          </Grid>
        </div>
      </Box>
      {hasErrors && <CamposErroneos open={true} onClose={() => setHasErrors(false)} />}
    </form>
  );
}

export default Formulario;
