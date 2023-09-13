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

  const validateExpiryDate = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Meses van de 0 a 11, sumamos 1
  
    const enteredYearInt = parseInt(expiryYear, 10);
    const enteredMonthInt = parseInt(expiryMonth, 10);
  
    let hasError = false;
  
    if (enteredMonthInt < 1 || enteredMonthInt > 12) {
      setExpiryMonthError('El mes debe estar en el rango de 01-12');
      hasError = true;
    } else {
      setExpiryMonthError('');
    }
  
    if (enteredYearInt < currentYear) {
      setExpiryYearError('La tarjeta está vencida');
      hasError = true;
    } else {
      setExpiryYearError('');
    }
  
    if (enteredYearInt === currentYear && enteredMonthInt < currentMonth) {
      setExpiryYearError('La tarjeta está vencida');
      setExpiryMonthError('La tarjeta está vencida');
      hasError = true;
    }
  
    if (!hasError) {
      setExpiryYearError('');
      setExpiryMonthError('');
    }
  };
  
  
    
    
    

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
  };

  // Maneja el evento onBlur para el nombre del titular
  const handleCardNameChange = (e) => {
    const alphanumericRegex = /^[a-zA\s]+$/;

    const value = e.target.value;

    // Verifica si el valor ingresado contiene caracteres no permitidos
    if (!alphanumericRegex.test(value)) {
      setCardNameError('La nombre del titular solo puede contener letras');
    }
    else {
      setCardNameError('');
      setCardName(value); // Actualiza el estado con el valor válido
    }

    //Por si no queda ningún caracter
    if (value === ''){
      setCardName(value);
    }

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

    if (expiryYear && expiryMonth) {
      validateExpiryDate(); // Valida la fecha de vencimiento si ambos campos están ingresados
    }

    validateData();
  };


  // Maneja el evento onBlur para el año de vencimiento
  const onExpiryYearBlur = () => {
    const currentYear = new Date().getFullYear();
    const enteredYear = parseInt(expiryYear, 10);

    if (expiryYear.length !== 4) {
      setExpiryYearError('El año debe tener 4 dígitos');
    } else if (!expiryYear.match(/^\d{4}$/) || enteredYear < currentYear) {
      setExpiryYearError('Año inválido (debe ser mayor o igual al actual)');
    } else {
      setExpiryYearError('');
    }

    if (expiryYear && expiryMonth) {
      validateExpiryDate(); // Valida la fecha de vencimiento si ambos campos están ingresados
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
      !Boolean(cardNumberError) &&
      !Boolean(cardNameError) &&
      !Boolean(expiryMonthError) &&
      !Boolean(expiryYearError) &&
      !Boolean(cvvError)
    );
  };

  return (
    <div>
      <h2>Pago con Tarjeta</h2>
      <div style={{ marginBottom: '20px' }}>
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
      </div>

      <div style={{ marginBottom: '20px' }}>
      <TextField
        label="Nombre del titular"
        variant="outlined"
        fullWidth
        value={cardName}
        onBlur={handleCardNameBlur}
        onChange={handleCardNameChange}
        error={Boolean(cardNameError)}
        helperText={cardNameError}
        inputProps={{ maxLength: 20 }}
        required
      />
      </div>

      <div style={{ marginBottom: '20px' }}>
      <TextField
        label="Mes (MM)"
        variant="outlined"
        fullWidth
        value={expiryMonth}
        onChange={(e) => setExpiryMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
        onBlur={onExpiryMonthBlur}
        error={Boolean(expiryMonthError)}
        helperText={expiryMonthError}
        inputProps={{ maxLength: 2 }}
        required
      />
      </div>

      <div style={{ marginBottom: '20px' }}>
      <TextField
        label="Año (AAAA)"
        variant="outlined"
        fullWidth
        value={expiryYear}
        onChange={(e) => setExpiryYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
        onBlur={onExpiryYearBlur}
        error={Boolean(expiryYearError)}
        helperText={expiryYearError}
        inputProps={{ maxLength: 4 }}
        required
      />
      </div>

      <div style={{ marginBottom: '20px' }}>
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
    </div>
  );
}

export default PagoTarjeta;
