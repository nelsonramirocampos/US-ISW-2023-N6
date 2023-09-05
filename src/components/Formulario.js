import React, { useState } from 'react';
import Button from '@mui/material/Button';
import FormaPago from './FormaPago';
import DatosEnvio from './DatosEnvio';

function Formulario() {
  // Estados para controlar la validez de los datos de FormaPago y DatosEnvio
  const [isPaymentDataValid, setIsPaymentDataValid] = useState(false);
  const [isShippingDataValid, setIsShippingDataValid] = useState(false);

  // Función para manejar el cambio en la validez de los datos de FormaPago
  const handlePaymentDataChange = (isValid) => {
    setIsPaymentDataValid(isValid);
  };

  // Función para manejar el cambio en la validez de los datos de DatosEnvio
  const handleShippingDataChange = (isValid) => {
    setIsShippingDataValid(isValid);
  };

  return (
    <div>
      <h2>Formulario de Envío</h2>
      {/* Componente para ingresar los datos de envío */}
      <DatosEnvio onChangeDatosEnvio={handleShippingDataChange} />
      {/* Componente para seleccionar la forma de pago */}
      <FormaPago onChangeFormaPago={handlePaymentDataChange} />
      {/* Botón para enviar el formulario */}
      <Button
        variant="contained"
        color="primary"
        disabled={!isPaymentDataValid || !isShippingDataValid}
      >
        Enviar
      </Button>
    </div>
  );
}

export default Formulario;
