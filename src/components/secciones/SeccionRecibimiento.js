import * as React from 'react'; // Importa React y sus módulos
import { useState, useEffect } from 'react'; // Importa useState y useEffect de React
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Importa el adaptador para el componente DatePicker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Importa el proveedor de localización
import { DatePicker } from '@mui/x-date-pickers'; // Importa el componente DatePicker
import Radio from '@mui/material/Radio'; // Importa el componente Radio de Material-UI
import RadioGroup from '@mui/material/RadioGroup'; // Importa el componente RadioGroup de Material-UI
import FormControlLabel from '@mui/material/FormControlLabel'; // Importa el componente FormControlLabel de Material-UI
import Paper from '@mui/material/Paper'; // Importa el componente Paper de Material-UI
import Typography from '@mui/material/Typography'; // Importa el componente Typography de Material-UI
import 'dayjs/locale/es'; // Importa el idioma español para Dayjs
import dayjs from 'dayjs'; // Importa la librería Dayjs

import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'; // Importa componentes de Material-UI

export default function SeccionRecibimiento() {
  const [isDatePickerEnabled, setIsDatePickerEnabled] = useState(false); // Estado para habilitar/deshabilitar el DatePicker
  const [selectedDate, setSelectedDate] = useState(null); // Estado para almacenar la fecha seleccionada
  const [selectedHour, setSelectedHour] = useState(8); // Estado para almacenar la hora seleccionada (inicializada en 8)
  const [availableHours, setAvailableHours] = useState([]); // Estado para almacenar las horas disponibles

  // Función para manejar el cambio de opción en el RadioGroup
  const handleRadioChange = (event) => {
    setIsDatePickerEnabled(event.target.value === 'enable'); // Habilita o deshabilita el DatePicker según la opción seleccionada
  };

  // Función para manejar el cambio de fecha en el DatePicker
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate); // Actualiza el estado de la fecha seleccionada
  };

  // Función para manejar el cambio de hora en el Select
  const handleHourChange = (event) => {
    setSelectedHour(parseInt(event.target.value, 10)); // Actualiza el estado de la hora seleccionada
  };

  // Función para verificar si es domingo
  const isSunday = (date) => {
    return date.day() === 0; // 0 representa el domingo
  };

  // Función para deshabilitar fechas (domingos en este caso)
  const shouldDisableDate = (date) => {
    return isSunday(date);
  };

  // Efecto secundario que se ejecuta una vez al montar el componente
  useEffect(() => {
    setSelectedDate(dayjs().add(1, 'day')); // Actualiza la fecha actual cuando cambia el estado
    const currentHour = dayjs().hour();
    const minHour = 8; // Hora mínima permitida (08:00)
    const maxHour = 23; // Hora máxima permitida (23:00)

    // Calcula las horas disponibles dentro del rango
    const availableHours = Array.from({ length: maxHour - currentHour + 1 }, (_, i) => {
      const hour = currentHour + i;
      return hour >= minHour ? hour : null; // Filtra las horas fuera del rango
    }).filter(hour => hour !== null);

    setAvailableHours(availableHours);
    setSelectedHour(availableHours[0]); // Establece la hora seleccionada inicialmente
  }, []);

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
