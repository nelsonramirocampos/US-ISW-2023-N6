import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function DatosEnvio({ onChangeDatosEnvio }) {
  // Definición de estados locales para los datos de envío y errores
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [ciudad, setCiudad] = useState(''); 
  const [calleError, setCalleError] = useState('');
  const [numeroError, setNumeroError] = useState('');
  const [ciudadError, setCiudadError] = useState('');

  // Manejador para el evento onBlur de la calle
  const handleCalleBlur = () => {
    const trimmedCalle = calle.trim(); // Elimina espacios en blanco
    setCalle(trimmedCalle); // Actualiza el estado con el valor sin espacios
    if (trimmedCalle === '') {
      setCalleError('La calle no puede estar vacía');
    } else {
      setCalleError('');
    }
  };

  // Efecto secundario que se ejecuta cuando cambian los datos de envío
  useEffect(() => {
    // Calcula el estado de isDatosEnvioValid en función de las dependencias
    const isDatosEnvioValid = calle !== '' && numero !== '' && ciudad !== '';
    // Llama a la función de devolución de llamada para informar al componente padre
    onChangeDatosEnvio(isDatosEnvioValid);
  }, [calle, numero, ciudad, onChangeDatosEnvio]);

  // Manejador para el evento onBlur del número
  const handleNumeroBlur = () => {
    const trimmedNumero = numero.trim(); // Elimina espacios en blanco
    setNumero(trimmedNumero); // Actualiza el estado con el valor sin espacios
    if (trimmedNumero === '') {
      setNumeroError('El campo número no puede quedar vacío');
    } else if (isNaN(trimmedNumero)) {
      setNumeroError('Debe ingresar un número válido');
    } else {
      setNumeroError('');
    }
  };

  // Manejador para el evento onBlur de la ciudad
  const handleCiudadBlur = () => {
    const trimmedCiudad = ciudad.trim(); // Elimina espacios en blanco
    setCiudad(trimmedCiudad); // Actualiza el estado con el valor sin espacios
    if (trimmedCiudad === 'Seleccionar' || trimmedCiudad === '') {
      setCiudadError('Debe seleccionar una ciudad');
    } else {
      setCiudadError('');
    }
  };

  return (
    // Componente que muestra los datos de envío y errores
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Datos del Envío
      </Typography>
      <FormGroup>
        {/* Campo de entrada para la calle */}
        <TextField
          required
          label="Calle"
          variant="outlined"
          fullWidth
          value={calle}
          onChange={(e) => setCalle(e.target.value)}
          onBlur={handleCalleBlur}
          error={Boolean(calleError)}
          helperText={calleError}
        />
        {/* Campo de entrada para el número */}
        <TextField
          required
          label="Número"
          variant="outlined"
          fullWidth
          type="number"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          onBlur={handleNumeroBlur}
          error={Boolean(numeroError)}
          helperText={numeroError}
        />
        {/* Selector de ciudad */}
        <FormControl fullWidth required>
          <InputLabel id="ciudad-label">Ciudad</InputLabel>
          <Select
            labelId="ciudad-label"
            id="ciudad"
            value={ciudad}
            label="Ciudad"
            onChange={(e) => setCiudad(e.target.value)}
            onBlur={handleCiudadBlur}
            error={Boolean(ciudadError)}
          >
            {/* Opciones de ciudades */}
            <MenuItem value="CO">Cosquin</MenuItem>
            <MenuItem value="MC">Mina Clavero</MenuItem>
            <MenuItem value="NO">Nono</MenuItem>
            <MenuItem value="SRC">Santa Rosa de Calamuchita</MenuItem>
            <MenuItem value="VCP">Villa Carlos Paz</MenuItem>
            <MenuItem value="VGB">Villa General Belgrano</MenuItem>
          </Select>
          {/* Mensaje de error para la ciudad */}
          {ciudadError && (
            <FormHelperText error>{ciudadError}</FormHelperText>
          )}
        </FormControl>
      </FormGroup>
    </Paper>
  );
}

export default DatosEnvio;
