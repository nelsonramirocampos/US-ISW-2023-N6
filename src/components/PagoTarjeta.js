import React, { useState } from 'react';
import TextField from "@mui/material/TextField";

function PagoTarjeta( { onCardNumberBlur, onCardHolderNameBlur, onExpirationMonthBlur, onExpirationYearBlur, onCvvBlur } ) {
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

  const handleCardNumberBlur = () => {
    if(cardNumber.length < 16)
    {
        setCardNumberError('El número de tarjeta debe ser de 16 digitos');
        onCardNumberBlur('');
    }
    else{
        setCardNumberError('');
        onCardNumberBlur(cardNumber)
    }
  };

  const valueCardNumber = (e) => {
    const inputValue = e.target.value;
    const cardNumberWithoutSpaces = inputValue.replace(/\s+/g, ''); // Elimina espacios en blanco
    const regex = /^[0-9\b]+$/;
    
    if (inputValue === '') {
      // Si el campo está vacío, no mostramos error.
      setCardNumber(cardNumberWithoutSpaces);
      setCardNumberError('');
    } else if (regex.test(cardNumberWithoutSpaces) && cardNumberWithoutSpaces.length <= 16) {
      // Si la entrada es válida y no supera los 16 dígitos, no mostramos error.
      setCardNumber(cardNumberWithoutSpaces);
      setCardNumberError('');
    } else {
      // Si la entrada no es válida, mostramos un mensaje de error.
      setCardNumberError('Número de tarjeta inválido');
    }
  };
    
  
  const handleCardNameBlur = () => {
    const cardNameWithoutSpaces = cardName.trim();
  
    if (cardNameWithoutSpaces.length > 20) {
      setCardNameError('El nombre del título no puede tener más de 20 caracteres.');
      onCardHolderNameBlur('');
    } else {
      setCardNameError('');
      onCardHolderNameBlur(cardNameWithoutSpaces);
    }

    setCardName(cardNameWithoutSpaces)
  };
  
  const valueCardName = (e) => {
    const inputValue = e.target.value;

    if (inputValue.trim() === '') {
      // Si el campo está vacío, no mostramos error.
      setCardName(inputValue);
      setCardNameError('');
    } else if (inputValue.trim().length <= 20) {
      // Si la entrada es válida y no supera los 16 dígitos, no mostramos error.
      setCardName(inputValue);
      setCardNameError('');
    } else {
      // Si la entrada no es válida, mostramos un mensaje de error.
      //setCardNameError('Nombre del titular invalido');
    }
  };
  





  const validateExpiryMonth = () => {
    if (expiryMonth < 1 || expiryMonth > 12) {
      setExpiryMonthError('El mes debe estar en el rango de 01-12');
      onExpirationMonthBlur('');
    } else if (!expiryMonth.match(/^(0[1-9]|1[0-2])$/)) {
      setExpiryMonthError('Mes inválido (01-12)');
      onExpirationMonthBlur('');
    } else {
      setExpiryMonthError('');
      onExpirationMonthBlur(expiryMonth);
    }  
  };
  
  

  const handleExpiryMonthChange = (e) => {
    const inputValue = e.target.value;
  
    // Elimina caracteres no numéricos
    const sanitizedValue = inputValue.replace(/[^0-9]/g, '');
  
    // Limita a 2 caracteres
    const truncatedValue = sanitizedValue.slice(0, 2);
  
    // Actualiza el estado con el valor truncado
    setExpiryMonth(truncatedValue);
  };
    

  const validateExpiryYear = () => {
    const currentYear = new Date().getFullYear();
    const enteredYear = parseInt(expiryYear, 10);
  
    if (!expiryYear.match(/^\d{4}$/) || enteredYear < currentYear) {
      setExpiryYearError('Año inválido (debe ser mayor o igual al actual)');
      onExpirationYearBlur('')
    } else {
      setExpiryYearError('');
      onExpirationYearBlur(expiryYear)
    }
  };
  

  const handleExpiryYearChange = (e) => {
    const inputValue = e.target.value;
  
    // Elimina caracteres no numéricos
    const sanitizedValue = inputValue.replace(/[^\d]/g, '');
  
    // Limita a 4 caracteres
    const truncatedValue = sanitizedValue.slice(0, 4);
  
    // Actualiza el estado con el valor truncado
    setExpiryYear(truncatedValue);
  };
  

  const handleCvvChange = (e) => {
    const inputValue = e.target.value;
  
    // Elimina caracteres no numéricos y limita a 3 caracteres
    const sanitizedValue = inputValue.replace(/[^\d]/g, '').slice(0, 3);
  
    // Actualiza el estado con el valor truncado
    setCvv(sanitizedValue);
  
    // Realiza la validación en tiempo real
    validateCvv();
  };
  
  const validateCvv = () => {
    const cvvWithoutSpaces = cvv.replace(/\s+/g, ''); // Elimina espacios en blanco
  
    if (!cvvWithoutSpaces.match(/^\d{3}$/)) {
      setCvvError('CVV inválido (3 dígitos)');
      onCvvBlur('')
    } else {
      setCvvError('');
      onCvvBlur(cvvWithoutSpaces)
    }
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
        onChange={valueCardNumber}
        error={Boolean(cardNumberError)}
        helperText={cardNumberError}
      />
      <TextField
        label="Nombre en la Tarjeta"
        variant="outlined"
        fullWidth
        value={cardName}
        onBlur={handleCardNameBlur}
        onChange={valueCardName}
        error={Boolean(cardNameError)}
        helperText={cardNameError}
      />
<TextField
  label="Mes (MM)"
  variant="outlined"
  fullWidth
  value={expiryMonth}
  onChange={handleExpiryMonthChange}
  onBlur={validateExpiryMonth}
  error={Boolean(expiryMonthError)}
  helperText={expiryMonthError}
/>
<TextField
  label="Año (AAAA)"
  variant="outlined"
  fullWidth
  value={expiryYear}
  onChange={handleExpiryYearChange}
  onBlur={validateExpiryYear}
  error={Boolean(expiryYearError)}
  helperText={expiryYearError}
/>

      <TextField
        label="CVV"
        variant="outlined"
        fullWidth
        value={cvv}
        onChange={handleCvvChange}
        onBlur={validateCvv}
        error={Boolean(cvvError)}
        helperText={cvvError}
      />
    </div>
  );
}

export default PagoTarjeta;
