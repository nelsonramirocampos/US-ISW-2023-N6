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

  const handlePedidoConfirmado = () => {
    setPedidoConfirmado(true);
  };

  const handleSalirClick = () => {
    setPedidoConfirmado(false);
  };

  const handleEnviarClick = () => {
    if (isPaymentDataValid && isShippingDataValid) {
      setPedidoConfirmado(true);
    }
  };

  return (
    <div>
      <h2>Formulario de Confirmación de Pedido</h2>
      {!pedidoConfirmado ? (
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
            onClick={handleEnviarClick}
            style={{ width: '100%' }} // Establece el ancho al 100%
          >
            Confirmar Pedido
          </Button>
        </div>
      ) : (
        <PedidoConfirmado onSalirClick={handleSalirClick} />
      )}
    </div>
  );
}

export default Formulario;
