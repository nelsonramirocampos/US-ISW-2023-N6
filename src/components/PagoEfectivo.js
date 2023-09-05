import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { NumericFormat } from "react-number-format";

function PagoEfectivo({ onAmountBlur }) {
  // Estado local para el monto y el error del monto
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');

  // Manejador para el cambio de valor en el campo de entrada
  const handleChange = (values) => {
    const { floatValue, value } = values;

    if (value.trim() === '') {
      setAmountError('Este campo no puede quedar vacío');
    } else if (floatValue <= 0) {
      setAmountError('El monto a abonar debe ser mayor a cero');
    } else {
      setAmountError('');
      onAmountBlur(floatValue); // Llama a la función proporcionada desde el componente padre
    }

    setAmount(value); // Actualiza el valor incluso si es una cadena vacía
  };

  // Manejador para el evento onBlur del campo de entrada
  const handleBlur = () => {
    if (amount === '') {
      setAmountError('Este campo no puede quedar vacío');
    } else if (!isNaN(parseFloat(amount))) {
      setAmount(parseFloat(amount).toFixed(2)); // Formatea el valor a dos decimales si es numérico
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

  return (
    <div>
      <NumericFormat
        customInput={TextField}
        onValueChange={handleChange}
        onBlur={handleBlur} // Agrega el manejador onBlur para formatear el valor en caso de ser numérico
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2} // Establece la cantidad de decimales a 2
        {...materialUiTextFieldProps}
        value={amount} // Asigna el valor directamente
        error={Boolean(amountError)}
        helperText={amountError}
      />
    </div>
  );
}

export default PagoEfectivo;
