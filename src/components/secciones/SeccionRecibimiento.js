import * as React from "react";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import Radio from "@mui/material/Radio";
import Divider from "@mui/material/Divider";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "dayjs/locale/es";
import dayjs from "dayjs";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function SeccionRecibimiento({ onChangeDate }) {
  // Estados para manejar la lógica del componente
  const [isDatePickerEnabled, setIsDatePickerEnabled] = useState(false); // Estado para habilitar/deshabilitar el DatePicker
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Inicializar con la fecha actual
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error


  const getDefaultHour = () => {
    if (selectedDate.isSame(dayjs(), "day") && dayjs().hour() < 21) {
      return dayjs().hour() + 3;
    } else {
      return 8;
    }
  };

  const [selectedHour, setSelectedHour] = useState(getDefaultHour()); // Estado para almacenar la hora seleccionada


  // Función para manejar el cambio de opción en el RadioGroup
  const handleRadioChange = (event) => {
    setIsDatePickerEnabled(event.target.value === "enable");

    onChangeDate(event.target.value !== "enable");
  };


  // Función para establecer la hora por defecto (08:00) al cambiar la fecha
  const setDefaultHour = () => {
    if(selectedDate.isSame(dayjs(), "day")){
      setSelectedHour(8);
    }
    else
    {
      setSelectedHour(dayjs().hour() + 3);
    }
    
  };

  // Función para manejar el cambio de fecha en el DatePicker
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setErrorMessage(""); // Reiniciar el mensaje de error al cambiar la fecha
    setDefaultHour(); // Llama a la función para establecer la hora por defecto
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

  // Genera un arreglo de horas
  const generateHours = () => {
    if (selectedDate.isSame(dayjs(), "day")) {
      // Si la fecha seleccionada es igual a la fecha actual
      // y la hora actual es antes de las 21:00 horas
      if (dayjs().hour() >= 21) {
        // Establecer un mensaje de error
        setErrorMessage(
          "Debe programar otra fecha y hora ya que el Delivery no se encuentra disponible después de las 21:00hs"
        );
        return [];
      } else {
        // Mostrar las horas a partir de la hora actual más tres horas
        // y hasta las 23:00 horas
        const currentHour = dayjs().hour();
        const availableHours = [];
        for (let hour = currentHour + 3; hour <= 23; hour++) {
          availableHours.push(hour);
        }

        onChangeDate(true);

        return availableHours;
      }
    } else {
      // Si la fecha seleccionada es diferente de la fecha actual
      // Mostrar todas las horas de 8 a 23

      onChangeDate(true);

      return hoursArray;
    }
  };

  const hoursArray = Array.from({ length: 23 - 8 + 1 }, (_, i) => i + 8);

  return (
    <Paper
      elevation={3}
      style={{ padding: "16px", backgroundColor: "#a3bac3" }}
    >
      <Typography variant="h5" gutterBottom>
        Elije cuando quieres la entrega
      </Typography>
      <Divider style={{ marginBottom: "20px" }} />

      {/* RadioGroup para habilitar/deshabilitar el DatePicker */}
      <RadioGroup
        aria-label="DatePicker"
        name="datePickerControl"
        value={isDatePickerEnabled ? "enable" : "disable"}
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* DatePicker para elegir la fecha de entrega */}
            <DatePicker
              label="Fecha de Entrega"
              minDate={dayjs().add(0, "day")} // Fecha mínima, día de la fecha actual
              maxDate={dayjs().add(7, "day")} // Fecha máxima, 7 días después de la fecha actual
              disablePast
              shouldDisableDate={shouldDisableDate}
              inputFormat="DD-MM-YYYY"
              value={selectedDate}
              onChange={handleDateChange}
              style={{ marginRight: "10px" }} // Añade margen derecho para separar los componentes
              required // Agregar el atributo required
/>

            {/* Mostrar el mensaje de error si existe */}
            {errorMessage ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" color="error">
                  {errorMessage}
                </Typography>
              </div>
            ) : (
              /* Select para elegir la hora de entrega */
              <FormControl style={{ minWidth: "120px" }}>
                <InputLabel>Hora de Entrega</InputLabel>
                <Select
                  label="Hora de Entrega"
                  value={selectedHour}
                  onChange={handleHourChange}
                  style={{ minWidth: "120px" }}
                  required // Agregar el atributo required
                >
                  {generateHours().map((hour) => (
                    <MenuItem key={hour} value={hour}>
                      {hour < 10 ? `0${hour}:00` : `${hour}:00`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>
        )}
      </LocalizationProvider>
    </Paper>
  );
}

export default SeccionRecibimiento;
