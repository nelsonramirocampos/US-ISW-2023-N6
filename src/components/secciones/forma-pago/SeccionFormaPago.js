import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import PagoEfectivo from './PagoEfectivo';
import PagoTarjeta from './PagoTarjeta';

function SeccionFormaPago({ onChangeFormaPago, total }) {
  // Estado local para la opción seleccionada
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('efectivo');

  // Estado local para validar si el monto es válido
  const [isAmountValid, setIsAmountValid] = useState(false);

  // Estado local para validar si los datos de pago son correctos
  const [isPaymentDataValid, setIsPaymentDataValid] = useState(false);

  // Manejador para el cambio de la opción de pago
  const handlePaymentOptionChange = (event) => {
    // Establece la opción seleccionada en false para ambos estados
    setIsAmountValid(false);
    setIsPaymentDataValid(false);
    setSelectedPaymentOption(event.target.value);
  };

  // Efecto secundario para comunicar el estado de la validación al componente padre
  useEffect(() => {
    onChangeFormaPago(isAmountValid !== isPaymentDataValid);
  }, [isAmountValid, isPaymentDataValid, onChangeFormaPago]);

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Forma de Pago
      </Typography>
      <Divider style={{ marginBottom: '20px' }} />

      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="forma-de-pago"
          name="forma-de-pago"
          value={selectedPaymentOption}
          onChange={handlePaymentOptionChange}
        >
          <FormControlLabel
            value="efectivo"
            control={<Radio />}
            label="Efectivo"
          />
          <FormControlLabel
            value="tarjeta"
            control={<Radio />}
            label="Tarjeta"
          />
        </RadioGroup>
      </FormControl>

      {selectedPaymentOption === 'efectivo' && (
        <PagoEfectivo
          total={total}
          onAmountValidChange={setIsAmountValid}
        />
      )}
      {selectedPaymentOption === 'tarjeta' && (
        <PagoTarjeta
          onPaymentDataValidChange={setIsPaymentDataValid}
        />
      )}
    </Paper>
  );
}

export default SeccionFormaPago;
