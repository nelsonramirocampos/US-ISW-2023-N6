import React, { useState } from 'react'; // Importa React y useState desde React
import Button from '@mui/material/Button'; // Importa el componente Button desde la biblioteca Material-UI
import Grid from '@mui/material/Grid'; // Importa el componente Grid desde la biblioteca Material-UI
import Typography from '@mui/material/Typography'; // Importa el componente Typography desde la biblioteca Material-UI
import Box from '@mui/material/Box'; // Importa el componente Box desde la biblioteca Material-UI
import FormaPago from './secciones/forma-pago/SeccionFormaPago'; // Importa un componente llamado FormaPago desde una ubicación relativa
import DatosEnvio from './secciones/SeccionDatosEnvio'; // Importa un componente llamado DatosEnvio desde una ubicación relativa
import PedidoConfirmado from './PedidoConfirmado'; // Importa un componente llamado PedidoConfirmado desde una ubicación relativa
import SeccionRecibimiento from './secciones/SeccionRecibimiento'; // Importa un componente llamado SeccionRecibimiento desde una ubicación relativa
import SeccionCarritoPedido from './secciones/SeccionCarritoPedido'; // Importa un componente llamado SeccionCarritoPedido desde una ubicación relativa
import CamposErroneos from './CamposErroneos'; // Importa un componente llamado CamposErroneos desde una ubicación relativa

function Formulario() {
  const [isPaymentDataValid, setIsPaymentDataValid] = useState(false); // Estado para rastrear si los datos de pago son válidos
  const [isShippingDataValid, setIsShippingDataValid] = useState(false); // Estado para rastrear si los datos de envío son válidos
  const [total, setTotal] = useState(0); // Estado para rastrear el total del pedido
  const [dialogOpen, setDialogOpen] = useState(false); // Estado para controlar si el diálogo de confirmación está abierto
  const [pedidoConfirmado, ] = useState(false); // Estado para rastrear si el pedido está confirmado
  const [carritoVacio, setCarritoVacio] = useState(true); // Estado para rastrear si el carrito de compras está vacío
  const [hasErrors, setHasErrors] = useState(false); // Estado para rastrear si hay errores en el formulario

  const handlePaymentDataChange = (isValid) => {
    setIsPaymentDataValid(isValid);
  };

  const handleShippingDataChange = (isValid) => {
    setIsShippingDataValid(isValid);
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
    setIsPaymentDataValid(false);
    setIsShippingDataValid(false);
    setDialogOpen(false);
    window.location.reload(); // Recarga la página al cerrar el diálogo de confirmación
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página

    // Realiza las acciones necesarias, por ejemplo, muestra un mensaje de confirmación
    if (isPaymentDataValid && isShippingDataValid && !carritoVacio) {
      handleOpenDialog();
    } else {

      setHasErrors(true); // Establece hasErrors en true si hay errores en los datos del formulario
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
              <SeccionRecibimiento />
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
