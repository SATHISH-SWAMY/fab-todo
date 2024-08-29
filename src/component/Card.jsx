import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, Slide } from '@mui/material';
import TaskForm from './TaskForm';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BasicCard() {
  const [edit, setEdit] = React.useState(false); // Initial state should be false
  const [dialogOpen, setDialogOpen] = React.useState(false); 

  const openEdit = () => {
    setEdit(true); // Set edit to true to open the dialog
  }

  const handleDialogClose = () => {
    setEdit(false); // Set edit to false to close the dialog
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            adjective
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={openEdit}>Edit</Button>
        </CardActions>
      </Card>
      <Dialog
        open={edit} // Use the `edit` state as the `open` prop
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* Add content for the dialog here */}
        <TaskForm/>
        <Button onClick={handleDialogClose}>Close</Button>
      </Dialog>
    </>
  );
}
