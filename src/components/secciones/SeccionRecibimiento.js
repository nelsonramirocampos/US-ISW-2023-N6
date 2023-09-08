import * as React from 'react';
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import 'dayjs/locale/es'; // Importa el idioma español
import dayjs from 'dayjs';

import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function SeccionRecibimiento() {
  const [isDatePickerEnabled, setIsDatePickerEnabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(8);
  const [availableHours, setAvailableHours] = useState([]);


  const handleRadioChange = (event) => {
    setIsDatePickerEnabled(event.target.value === 'enable');
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleHourChange = (event) => {
    setSelectedHour(parseInt(event.target.value, 10));
  };

  // Función para verificar si es domingo
  const isSunday = (date) => {
    return date.day() === 0; // 0 representa el domingo
  };

  // Función para deshabilitar fechas (domingos en este caso)
  const shouldDisableDate = (date) => {
    return isSunday(date);
  };

  // Horas disponibles (de 8 a 23)
  //const hoursAvailable = Array.from({ length: 16 }, (_, i) => i + 8);

  useEffect(() => {
    setSelectedDate(dayjs().add(1, 'day')); // Actualiza la fecha actual cuando cambia el estado
    const currentHour = dayjs().hour();
    const nextThreeHours = Array.from({ length: 3 }, (_, i) => currentHour + i + 1);
    setAvailableHours(nextThreeHours);
    setSelectedHour(nextThreeHours[0]); // Establece la hora seleccionada inicialmente
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Elije cuando quieres la entrega
      </Typography>
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

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        {isDatePickerEnabled && (
          <div>
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
            />
            <FormControl style={{ minWidth: '120px' }}>
              <InputLabel>Hora de Entrega</InputLabel>
              <Select
                value={selectedHour}
                onChange={handleHourChange}
                style={{ minWidth: '120px' }}
              >
                {availableHours.map((hour) => (
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
