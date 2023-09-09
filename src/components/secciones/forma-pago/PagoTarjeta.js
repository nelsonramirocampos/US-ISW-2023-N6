import React, { useState } from 'react';
import TextField from "@mui/material/TextField";

function PagoTarjeta({ onPaymentDataValidChange }) {
  // Estados locales para los campos de la tarjeta y errores
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  const [cardNumberError, setCardNumberError] = useState('');
  const [cardNameError, setCardNameError] = useState('');
  const [expiryMonthError, setExpiryMonthError] = useState('');
  const [expiryYearError, setExpiryYearError] = useState('');
  const [cvvError, setCvvError] = useState('');

  // Maneja el evento onBlur para el número de tarjeta
  const handleCardNumberBlur = () => {
    if (cardNumber.length !== 16) {
      setCardNumberError('El número de tarjeta debe ser de 16 dígitos');
    } else if (!/^4/.test(cardNumber)) {
      setCardNumberError('Solo se aceptan tarjetas Visa');
    } else {
      setCardNumberError('');
    }

    validateData();
  };

  // Maneja el evento onBlur para el nombre del titular
  const handleCardNameBlur = () => {
    const cardNameWithoutSpaces = cardName.trim();

    if (cardNameWithoutSpaces.length > 20) {
      setCardNameError('El nombre del titular no puede tener más de 20 caracteres.');
    } else {
      setCardNameError('');
    }

    setCardName(cardNameWithoutSpaces);

    validateData();
  };

  // Maneja el evento onBlur para el mes de vencimiento
  const onExpiryMonthBlur = () => {
    if (expiryMonth < 1 || expiryMonth > 12) {
      setExpiryMonthError('El mes debe estar en el rango de 01-12');
    } else if (!expiryMonth.match(/^(0[1-9]|1[0-2])$/)) {
      setExpiryMonthError('El mes debe tener dos números (01-12)');
    } else {
      setExpiryMonthError('');
    }

    validateData();
  };

  // Maneja el evento onBlur para el año de vencimiento
  const onExpiryYearBlur = () => {
    const currentYear = new Date().getFullYear();
    const enteredYear = parseInt(expiryYear, 10);

    if (!expiryYear.match(/^\d{4}$/) || enteredYear < currentYear) {
      setExpiryYearError('Año inválido (debe ser mayor o igual al actual)');
    } else {
      setExpiryYearError('');
    }

    validateData();
  };

  // Maneja el evento onBlur para el CVV
  const onCvvBlur = () => {
    if (cvv.length < 3) {
      setCvvError('El CVV debe ser de 3 números');
    } else {
      setCvvError('');
    }

    validateData();
  };

  // Función para validar si todos los campos son válidos y llama a la función del padre
  const validateData = () => {
    onPaymentDataValidChange(
      (cardNumber !== '' && cardNumber[0] === '4') &&
      cardName !== '' &&
      expiryMonth !== '' &&
      expiryYear !== '' &&
      cvv !== ''
    );
  };

  return (
    <div>
      <h2>Pago con Tarjeta</h2>
      <TextField
        type="text"
        id="cardNumber"
        label="Número de Tarjeta"
        variant="outlined"
        fullWidth
        value={cardNumber}
        onBlur={handleCardNumberBlur}
        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
        error={Boolean(cardNumberError)}
        helperText={cardNumberError}
        required
      />
      <TextField
        label="Nombre del titular"
        variant="outlined"
        fullWidth
        value={cardName}
        onBlur={handleCardNameBlur}
        onChange={(e) => setCardName(e.target.value.slice(0, 30))}
        error={Boolean(cardNameError)}
        helperText={cardNameError}
        required
      />
      <TextField
        label="Mes (MM)"
        variant="outlined"
        fullWidth
        value={expiryMonth}
        onChange={(e) => setExpiryMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
        onBlur={onExpiryMonthBlur}
        error={Boolean(expiryMonthError)}
        helperText={expiryMonthError}
        required
      />
      <TextField
        label="Año (AAAA)"
        variant="outlined"
        fullWidth
        value={expiryYear}
        onChange={(e) => setExpiryYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
        onBlur={onExpiryYearBlur}
        error={Boolean(expiryYearError)}
        helperText={expiryYearError}
        required
      />
      <TextField
        label="CVV"
        variant="outlined"
        fullWidth
        value={cvv}
        onBlur={onCvvBlur}
        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
        error={Boolean(cvvError)}
        helperText={cvvError}
        required
      />
    </div>
  );
}

export default PagoTarjeta;
