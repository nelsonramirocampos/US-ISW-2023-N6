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
      <h1 align="center" style={{ fontSize: '24px' }}>Completa los datos de tú Pedido</h1>

      <SeccionCarritoPedido
        onTotalChange={handleTotalChange}
        onCarritoChange={handleCarritoChange}
      />

      {pedidoConfirmado ? (
        <PedidoConfirmado onClose={handleCloseDialog} />
      ) : (
        <div>
          <DatosEnvio onChangeDatosEnvio={handleShippingDataChange} />

          <SeccionRecibimiento />

          <FormaPago onChangeFormaPago={handlePaymentDataChange} total={total} />

          <Button
            variant="contained"
            color="primary"
            disabled={!isPaymentDataValid || !isShippingDataValid || carritoVacio}
            onClick={handleOpenDialog}
            style={{ width: '100%', fontSize: '20px' }}
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
