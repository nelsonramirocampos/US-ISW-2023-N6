import React, { useState } from 'react';
import Button from '@mui/material/Button';
import FormaPago from './secciones/forma-pago/SeccionFormaPago';
import DatosEnvio from './secciones/SeccionDatosEnvio';
import PedidoConfirmado from './PedidoConfirmado';
import SeccionRecibimiento from './secciones/SeccionRecibimiento';
import SeccionCarritoPedido from './secciones/SeccionCarritoPedido';

function Formulario() {
  const [isPaymentDataValid, setIsPaymentDataValid] = useState(false);
  const [isShippingDataValid, setIsShippingDataValid] = useState(false);
  const [total, setTotal] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  // Agregamos un estado para controlar si el carrito está vacío o no
  const [carritoVacio, setCarritoVacio] = useState(true);

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

  // Agregamos una función para manejar el cambio en el estado del carrito
  const handleCarritoChange = (isEmpty) => {
    setCarritoVacio(isEmpty);
  };

  const handleCloseDialog = () => {
    setIsPaymentDataValid(false);
    setIsShippingDataValid(false);
    setDialogOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <h2>Formulario de Confirmación de Pedido</h2>

      <SeccionCarritoPedido
        onTotalChange={handleTotalChange}
        // Pasamos la función handleCarritoChange al componente hijo
        onCarritoChange={handleCarritoChange}
      />

      {pedidoConfirmado ? (
        <PedidoConfirmado onClose={handleCloseDialog} />
      ) : (
        <div>
          <DatosEnvio onChangeDatosEnvio={handleShippingDataChange} />

          <SeccionRecibimiento />

          <FormaPago
            onChangeFormaPago={handlePaymentDataChange}
            total={total}
          />

          <Button
            variant="contained"
            color="primary"
            // Deshabilitamos el botón si el carrito está vacío
            disabled={!isPaymentDataValid || !isShippingDataValid || carritoVacio}
            onClick={handleOpenDialog}
            style={{ width: '100%' }}
          >
            Confirmar Pedido
          </Button>

          <PedidoConfirmado open={dialogOpen} onClose={handleCloseDialog} />
        </div>
      )}
    </div>
  );
}

export default Formulario;
