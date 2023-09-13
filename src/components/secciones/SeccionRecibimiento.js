import React, { useState } from 'react';
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
  const [isDatePickerEnabled, setIsDatePickerEnabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [errorMessage, setErrorMessage] = useState("");

  const getDefaultHour = () => {
    if (selectedDate.isSame(dayjs(), "day") && dayjs().hour() < 21) {
      return dayjs().hour() + 3;
    } else {
      return 8;
    }
  };

  const [selectedHour, setSelectedHour] = useState(getDefaultHour());


  const handleRadioChange = (event) => {
    setIsDatePickerEnabled(event.target.value === "enable");
    onChangeDate(event.target.value !== "enable");
  };

  const setDefaultHour = () => {
    if (selectedDate.isSame(dayjs(), "day")) {
      setSelectedHour(8);
    } else {
      setSelectedHour(dayjs().hour() + 3);
    }
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setErrorMessage("");
    setDefaultHour();
    const newHours = generateHours(newDate);
    onChangeDate(true, newHours);
  };

  const handleHourChange = (event) => {
    setSelectedHour(parseInt(event.target.value, 10));
  };

  const isSunday = (date) => {
    return date.day() === 0;
  };

  const shouldDisableDate = (date) => {
    return isSunday(date);
  };

  const generateHours = (newDate) => {
    if (newDate.isSame(dayjs(), "day")) {
      if (dayjs().hour() >= 9) {
        setErrorMessage(
          "Debe programar otra fecha y hora ya que el Delivery no se encuentra disponible después de las 21:00hs"
        );
        return [];
      } else {
        const currentHour = dayjs().hour();
        const availableHours = [];
        for (let hour = currentHour + 3; hour <= 23; hour++) {
          availableHours.push(hour);
        }
        return availableHours;
      }
    } else {
      return hoursArray;
    }
  };

  const hoursArray = Array.from({ length: 23 - 8 + 1 }, (_, i) => i + 8);

  return (
    <Paper elevation={3} style={{ padding: "16px", backgroundColor: "#a3bac3" }}>
      <Typography variant="h5" gutterBottom>
        Elije cuando quieres la entrega
      </Typography>
      <Divider style={{ marginBottom: "20px" }} />
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
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        {isDatePickerEnabled && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <DatePicker
              label="Fecha de Entrega"
              minDate={dayjs().add(0, "day")}
              maxDate={dayjs().add(7, "day")}
              disablePast
              shouldDisableDate={shouldDisableDate}
              inputFormat="DD-MM-YYYY"
              value={selectedDate}
              onChange={handleDateChange}
              style={{ marginRight: "10px" }}
              required
            />
            {errorMessage ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" color="error">
                  {errorMessage}
                </Typography>
              </div>
            ) : (
              <FormControl style={{ minWidth: "120px" }}>
                <InputLabel>Hora de Entrega</InputLabel>
                <Select
                  label="Hora de Entrega"
                  value={selectedHour}
                  onChange={handleHourChange}
                  style={{ minWidth: "120px" }}
                  required
                >
                  {generateHours(selectedDate).map((hour) => (
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
