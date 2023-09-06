import * as React from 'react';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper'; // Importa Paper para el contenedor
import Typography from '@mui/material/Typography'; // Importa Typography para texto estilizado
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';

export default function SeccionRecibimiento() {
  // Estado para controlar la habilitación del DatePicker
  const [isDatePickerEnabled, setIsDatePickerEnabled] = useState(false);
  // Estado para la fecha seleccionada
  const [selectedDate, setSelectedDate] = useState(null);
  // Estado para la hora seleccionada
  const [selectedTime, setSelectedTime] = useState(null);

  // Manejador de cambio para el radio button
  const handleRadioChange = (event) => {
    setIsDatePickerEnabled(event.target.value === 'enable');
  };

  // Manejador de cambio de fecha
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // Manejador de cambio de hora
  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  // Calcula la fecha de mañana
  const tomorrow = dayjs().add(1, 'day');

  return (
    <Paper elevation={3} style={{ padding: '16px' }}> {/* Utiliza un Paper para envolver el contenido */}
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

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        {isDatePickerEnabled && (
          <div>
            <DatePicker
              label="Fecha de Entrega"
              defaultValue={tomorrow}
              disablePast
              inputFormat="DD-MM-YYYY"
              value={selectedDate}
              onChange={handleDateChange}
              required
            />
            <TimePicker
              label="Hora de Entrega"
              defaultValue={dayjs('2022-04-17T18:30')}
              value={selectedTime}
              onChange={handleTimeChange}
              required
            />
          </div>
        )}
      </LocalizationProvider>
    </Paper>
  );
}
