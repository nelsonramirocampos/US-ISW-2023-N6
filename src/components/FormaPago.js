import React, { useState, useEffect } from 'react';
import { Paper, Typography, Divider, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import PagoEfectivo from './PagoEfectivo';
import PagoTarjeta from './PagoTarjeta';

function FormaPago({ onChangeFormaPago }) {
  // Estado local para la opción seleccionada, datos de tarjeta y monto
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('efectivo');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');

  // Estado local para validar si los datos de pago son correctos
  const [isPaymentDataValid, setIsPaymentDataValid] = useState(false);

  // Manejador para el cambio de la opción de pago
  const handlePaymentOptionChange = (event) => {
    setSelectedPaymentOption(event.target.value);
    setIsPaymentDataValid(false); // Reinicia la validación cuando cambia la opción de pago
  };

  // Manejador para el evento onBlur del número de tarjeta
  const handleCardNumberBlur = (cardNumber) => {
    setCardNumber(cardNumber);
    validatePaymentData();
  };

  // Manejador para el evento onBlur del nombre del titular de la tarjeta
  const handleCardHolderNameBlur = (cardHolderName) => {
    setCardHolderName(cardHolderName);
    validatePaymentData();
  };

  // Manejador para el evento onBlur del mes de vencimiento de la tarjeta
  const handleExpirationMonthBlur = (expirationMonth) => {
    setExpirationMonth(expirationMonth);
    validatePaymentData();
  };

  // Manejador para el evento onBlur del año de vencimiento de la tarjeta
  const handleExpirationYearBlur = (expirationYear) => {
    setExpirationYear(expirationYear);
    validatePaymentData();
  };

  // Manejador para el evento onBlur del CVV de la tarjeta
  const handleCvvBlur = (cvv) => {
    setCvv(cvv);
    validatePaymentData();
  };

  // Manejador para el evento onBlur del monto
  const handleAmountBlur = (amount) => {
    setAmount(amount);
    validatePaymentData();
  };

  // Función para validar los datos de pago
  const validatePaymentData = () => {
    if (
      (selectedPaymentOption === 'efectivo' && amount !== '') || // Validación para pago en efectivo
      (selectedPaymentOption === 'tarjeta' && // Validación para pago con tarjeta
        cardNumber.trim() !== '' &&
        cardHolderName.trim() !== '' &&
        expirationMonth.trim() !== '' &&
        expirationYear.trim() !== '' &&
        cvv.trim() !== '')
    ) {
      setIsPaymentDataValid(true);
    } else {
      setIsPaymentDataValid(false);
    }
  };

  // Efecto secundario para comunicar el estado de la validación al componente padre
  useEffect(() => {
    onChangeFormaPago(isPaymentDataValid);
  }, [isPaymentDataValid, onChangeFormaPago]);

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
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
        <PagoEfectivo onAmountBlur={handleAmountBlur} />
      )}
      {selectedPaymentOption === 'tarjeta' && (
        <PagoTarjeta
          onCardNumberBlur={handleCardNumberBlur}
          onCardHolderNameBlur={handleCardHolderNameBlur}
          onExpirationMonthBlur={handleExpirationMonthBlur}
          onExpirationYearBlur={handleExpirationYearBlur}
          onCvvBlur={handleCvvBlur}
        />
      )}
    </Paper>
  );
}

export default FormaPago;
