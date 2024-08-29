import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function TaskForm({ update = false, onSubmit, onUpdate }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const [description, setDescription] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit({ title, date, description, isImportant, isCompleted });
    }
  };

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate({ title, date, description, isImportant, isCompleted });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ "& > :not(style)": { m: 1, width: "40ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      {!update && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            renderInput={(params) => <TextField {...params} required />}
          />
        </LocalizationProvider>
      )}
      <TextField
        id="description"
        label="Notes"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <RadioGroup
        aria-labelledby="priority-label"
        value={isImportant.toString()}
        onChange={(e) => setIsImportant(e.target.value === "true")}
        required
      >
        <FormControlLabel
          value="true"
          control={<Radio />}
          label="Mark as important"
        />
        <FormControlLabel
          value="false"
          control={<Radio />}
          label="Not important"
        />
      </RadioGroup>
      <RadioGroup
        aria-labelledby="completed-label"
        value={isCompleted.toString()}
        onChange={(e) => setIsCompleted(e.target.value === "true")}
        required
      >
        <FormControlLabel
          value="true"
          control={<Radio />}
          label="Mark as completed"
        />
        <FormControlLabel
          value="false"
          control={<Radio />}
          label="Not completed"
        />
      </RadioGroup>
      {update ? (
        <Button
          type="button"
          variant="contained"
          color="warning"
          onClick={handleUpdate}
        >
          Update Task
        </Button>
      ) : (
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Task
        </Button>
      )}
    </Box>
  );
}

export default TaskForm;
