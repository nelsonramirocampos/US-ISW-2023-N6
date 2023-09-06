import React, { useState } from 'react';
import Button from '@mui/material/Button';
import FormaPago from './secciones/forma-pago/SeccionFormaPago';
import DatosEnvio from './secciones/SeccionDatosEnvio';
import PedidoConfirmado from './PedidoConfirmado';
import SeccionRecibimiento from './secciones/SeccionRecibimiento';

function Formulario() {
  // Estados para controlar la validez de los datos de FormaPago y DatosEnvio
  const [isPaymentDataValid, setIsPaymentDataValid] = useState(false);
  const [isShippingDataValid, setIsShippingDataValid] = useState(false);

  // Estado para controlar la apertura del diálogo de confirmación
  const [dialogOpen, setDialogOpen] = useState(false);

  // Estado para mostrar el Pedido Confirmado
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  // Función para manejar el cambio en la validez de los datos de FormaPago
  const handlePaymentDataChange = (isValid) => {
    setIsPaymentDataValid(isValid);
  };

  // Función para manejar el cambio en la validez de los datos de DatosEnvío
  const handleShippingDataChange = (isValid) => {
    setIsShippingDataValid(isValid);
  };

  // Función para manejar la confirmación del pedido
  const handlePedidoConfirmado = () => {
    setPedidoConfirmado(true);
  };

  // Función para manejar el clic en el botón "Salir" del pop-up
  const handleSalirClick = () => {
    // Restablece los estados y cierra el diálogo
    setIsPaymentDataValid(false);
    setIsShippingDataValid(false);
    setDialogOpen(false);
    // Recarga la página
    window.location.reload();
  };

  // Función para manejar el clic en el botón "Enviar" del formulario
  const handleEnviarClick = () => {
    if (isPaymentDataValid && isShippingDataValid) {
      setPedidoConfirmado(true);
    }
  };

  // Función para abrir el diálogo de confirmación
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // Función para cerrar el diálogo de confirmación
  const handleCloseDialog = () => {
    // Restablece los estados y cierra el diálogo
    setIsPaymentDataValid(false);
    setIsShippingDataValid(false);
    setDialogOpen(false);
    // Recarga la página
    window.location.reload();
  };

  return (
    <div>
      <h2>Formulario de Confirmación de Pedido</h2>
      {pedidoConfirmado ? (
        // Condicional ternario para mostrar el pop-up o el formulario
        <PedidoConfirmado onClose={handleCloseDialog} />
      ) : (
        <div>
          {/* Componente para ingresar los datos de envío */}
          <DatosEnvio onChangeDatosEnvio={handleShippingDataChange} />

          <SeccionRecibimiento />

          {/* Componente para seleccionar la forma de pago */}
          <FormaPago
            onChangeFormaPago={handlePaymentDataChange}
            onPedidoConfirmado={handlePedidoConfirmado}
          />

          {/* Botón para enviar el formulario */}
          <Button
            variant="contained"
            color="primary"
            disabled={!isPaymentDataValid || !isShippingDataValid}
            onClick={handleOpenDialog} // Abre el diálogo al hacer clic
            style={{ width: '100%' }}
          >
            Confirmar Pedido
          </Button>

          {/* Diálogo de confirmación */}
          <PedidoConfirmado open={dialogOpen} onClose={handleCloseDialog} />
        </div>
      )}
    </div>
  );
}

export default Formulario;
