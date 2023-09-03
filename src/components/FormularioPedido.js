import React from 'react';
import Button from '@mui/material/Button';

function FormularioPedido() {

  // Maneja la función para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Realiza acciones con los datos del formulario, por ejemplo, enviarlos a un servidor
    // Aquí puedes agregar la lógica para enviar el pedido
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
      >
        Realizar Pedido
      </Button>
    </form>
  );
}

export default FormularioPedido;
