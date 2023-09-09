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

function SeccionCarritoPedido({ onTotalChange, onCarritoChange }) {
  // Estado local para la lista de productos en el carrito
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

  // Función para calcular el total del carrito
  const calcularTotal = useCallback(() => {
    return productos.reduce((total, producto) => {
      return total + producto.cantidad * producto.precioUnitario;
    }, 0);
  }, [productos]);

  // Efecto secundario para actualizar el total cuando cambian los productos en el carrito
  useEffect(() => {
    const total = calcularTotal();
    onTotalChange(total);

    // Notificamos al componente padre si el carrito está vacío o no
    onCarritoChange(productos.length === 0);
  }, [productos, onTotalChange, calcularTotal, onCarritoChange]);

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
