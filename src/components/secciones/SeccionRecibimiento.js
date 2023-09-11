import * as React from 'react';
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import Radio from '@mui/material/Radio';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import 'dayjs/locale/es';
import dayjs from 'dayjs';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function SeccionRecibimiento() {
  // Estados para manejar la lógica del componente
  const [isDatePickerEnabled, setIsDatePickerEnabled] = useState(false); // Estado para habilitar/deshabilitar el DatePicker
  const [selectedDate, setSelectedDate] = useState(null); // Estado para almacenar la fecha seleccionada
  const [selectedHour, setSelectedHour] = useState(8); // Estado para almacenar la hora seleccionada (inicializada en 8)

  // Función para manejar el cambio de opción en el RadioGroup
  const handleRadioChange = (event) => {
    setIsDatePickerEnabled(event.target.value === 'enable');
  };

  // Función para manejar el cambio de fecha en el DatePicker
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // Función para manejar el cambio de hora en el Select
  const handleHourChange = (event) => {
    setSelectedHour(parseInt(event.target.value, 10));
  };

  // Función para verificar si es domingo
  const isSunday = (date) => {
    return date.day() === 0;
  };

  // Función para deshabilitar fechas (domingos en este caso)
  const shouldDisableDate = (date) => {
    return isSunday(date);
  };

  // Genera un arreglo de horas desde 8 hasta 23
  const hoursArray = Array.from({ length: 23 - 8 + 1 }, (_, i) => i + 8);

  // Efecto secundario que se ejecuta una vez al montar el componente
  useEffect(() => {
    // Inicializa la fecha seleccionada con la fecha actual más 1 día
    setSelectedDate(dayjs().add(1, 'day'));

    // Establece la hora seleccionada inicialmente como 8
    setSelectedHour(8);
  }, []);

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Elije cuando quieres la entrega
      </Typography>
      <Divider style={{ marginBottom: '20px' }} />

      {/* RadioGroup para habilitar/deshabilitar el DatePicker */}
      <RadioGroup
        aria-label="DatePicker"
        name="datePickerControl"
        value={isDatePickerEnabled ? 'enable' : 'disable'}
        onChange={handleRadioChange}
      >
        <FormControlLabel
          value="disable"
          control={<Radio />}
          label="Lo antes posible"
        />
        <FormControlLabel
          value="enable"
          control={<Radio />}
          label="Elegir cuando"
        />
      </RadioGroup>

      {/* Componentes relacionados con la fecha y la hora */}
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        {isDatePickerEnabled && (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {/* DatePicker para elegir la fecha de entrega */}
            <DatePicker
              label="Fecha de Entrega"
              minDate={dayjs().add(1, 'day')} // Fecha mínima, 1 día después de la fecha actual
              maxDate={dayjs().add(7, 'day')} // Fecha máxima, 7 días después de la fecha actual
              disablePast
              shouldDisableDate={shouldDisableDate}
              inputFormat="DD-MM-YYYY"
              value={selectedDate}
              onChange={handleDateChange}
              required
              style={{ marginRight: '10px' }} // Añade margen derecho para separar los componentes
            />
            
            {/* Select para elegir la hora de entrega */}
            <FormControl style={{ minWidth: '120px' }}>
              <InputLabel>Hora de Entrega</InputLabel>
              <Select
                label='Hora de Entrega'
                value={selectedHour}
                onChange={handleHourChange}
                style={{ minWidth: '120px' }}
              >
                {hoursArray.map((hour) => (
                  <MenuItem key={hour} value={hour}>
                    {hour < 10 ? `0${hour}:00` : `${hour}:00`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </LocalizationProvider>
    </Paper>
  );
}
