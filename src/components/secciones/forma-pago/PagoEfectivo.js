import { InputAdornment, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";

function PagoEfectivo({ onAmountBlur, total }) {
  // Estado local para el monto y el error del monto
  const [amount, setAmount] = useState(total.toString()); // Inicializa el estado con el valor total
  const [amountError, setAmountError] = useState('');

  /**
   * Validación: No se permite dejar el campo vacío.
   * 
   * @param {string} value - El valor del campo.
   * @returns {boolean} - Verdadero si el valor no está vacío, falso en caso contrario.
   */
  const validateNotEmpty = (value) => {
    return value.trim() !== '';
  };

  /**
   * Validación: Debe ser un número positivo.
   * 
   * @param {string} value - El valor del campo.
   * @returns {boolean} - Verdadero si el valor es un número positivo, falso en caso contrario.
   */
  const validatePositiveNumber = (value) => {
    const floatValue = parseFloat(value);
    return !isNaN(floatValue) && floatValue > 0;
  };

  /**
   * Validación: Debe ser menor o igual a 100.000.
   * 
   * @param {string} value - El valor del campo.
   * @returns {boolean} - Verdadero si el valor es menor o igual a 100.000, falso en caso contrario.
   */
  const validateMaxValue = (value) => {
    const floatValue = parseFloat(value);
    return !isNaN(floatValue) && floatValue <= 100000;
  };

  /**
   * Función de validación principal.
   * 
   * @param {object} values - Objeto que contiene el valor actual del campo.
   */
  const handleAmountChange = (values) => {
    const value = values.value;

    let error = '';

    if (!validateNotEmpty(value)) {
      error = 'No deje el campo vacío';
    } else if (!validatePositiveNumber(value)) {
      error = 'Ingrese un número positivo mayor que cero';
    } else if (!validateMaxValue(value)) {
      error = 'Ingrese un valor menor o igual a $100.000';
    } else if (parseFloat(value) < total) {
      error = 'El monto debe ser igual o mayor al total';
    }

    setAmountError(error);
    setAmount(value);

    // Llamar a onAmountBlur con el valor correcto
    if (error) {
      onAmountBlur('');
    } else {
      onAmountBlur(value);
    }
  };

  // Propiedades para personalizar el TextField de Material UI
  const materialUiTextFieldProps = {
    required: true,
    fullWidth: true,
    label: "Total a Pagar",
    InputProps: {
      startAdornment: <InputAdornment position="start">$</InputAdornment>,
    },
  };

  // Efecto secundario para actualizar el estado del monto cuando cambia el total
  useEffect(() => {
    setAmount(total.toString());
  }, [total]);

  return (
    <div>
      <NumericFormat
        customInput={TextField}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        {...materialUiTextFieldProps}
        value={amount}
        onValueChange={handleAmountChange}
        error={Boolean(amountError)}
        helperText={amountError}
      />
    </div>
  );
}

export default PagoEfectivo;
