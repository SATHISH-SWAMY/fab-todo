import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const TaskForm = () => {
  return (
    <Box
      sx={{
        width: '1196px',
        height: '980px',
        backgroundColor: '#d3d3d3', // Light gray background
        padding: '20px',
        border: '1px solid #2196f3', // Blue border
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '20px' }}>
        Task name (static as per task name)
      </Typography>
      
      <Box sx={{ flexGrow: 1, marginBottom: '20px' }}>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}>
          Notes
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          sx={{
            backgroundColor: 'white',
            width: '400px', // Set the width for the text field
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
