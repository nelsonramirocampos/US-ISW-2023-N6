import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function SeccionCarritoPedido({ onTotalChange }) {
  // Estado para mantener los productos en el carrito
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Lomito con Chimi', cantidad: 2, precioUnitario: 10 },
    { id: 2, nombre: 'Panchito', cantidad: 3, precioUnitario: 15 },
    { id: 3, nombre: 'Gaseosa', cantidad: 1, precioUnitario: 20 },
  ]);

  // Función para eliminar un producto del carrito
  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter((producto) => producto.id !== id);
    setProductos(nuevosProductos);
  };

  // Función para calcular el total a abonar
  const calcularTotal = useCallback(() => {
    return productos.reduce((total, producto) => {
      return total + producto.cantidad * producto.precioUnitario;
    }, 0);
  }, [productos]);

  useEffect(() => {
    const total = calcularTotal();
    onTotalChange(total); // Llama a la función con el total calculado después de la renderización
  }, [productos, onTotalChange, calcularTotal]);

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Detalle de Pedido
      </Typography>
      <Divider style={{ marginBottom: '20px' }} />

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio Unitario</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.cantidad}</TableCell>
                <TableCell>${producto.precioUnitario}</TableCell>
                <TableCell>${producto.cantidad * producto.precioUnitario}</TableCell>
                <TableCell>
                  <IconButton onClick={() => eliminarProducto(producto.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" gutterBottom>
        Total a abonar: ${calcularTotal()}
      </Typography>
    </Paper>
  );
}

export default SeccionCarritoPedido;
