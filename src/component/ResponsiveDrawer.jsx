import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Button, Dialog, DialogTitle } from '@mui/material';
import BasicCard from "./Card";
import Slide from "@mui/material/Slide";
import ClearIcon from "@mui/icons-material/Clear";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TaskForm from './TaskForm';
import TaskForm2 from './TaskForm-2';

const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false); // Separate state for Dialog
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [heading, setHeading] = React.useState("All Task");
  const [filter, setFilter] = React.useState(""); // Task filter state
  const [open, setOpen] = React.useState(false); 

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (index, heading) => {
    setSelectedIndex(index);
    setHeading(heading);
    switch (heading) {
      case "All task":
        setFilter("");
        break;
      case "Important tasks":
        setFilter("important");
        break;
      case "Completed tasks":
        setFilter("completed");
        break;
      case "Uncompleted tasks":
        setFilter("uncompleted");
        break;
      default:
        setFilter("");
        break;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={drawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2,
              ...(drawerOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {heading}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerHeader>
          <Typography className="text-center" variant="h5">
            To-do list
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Toolbar>
          <Button className="w-full" variant="contained" onClick={handleDialogOpen}>
            Add Task
          </Button>
        </Toolbar>
        <List>
          {["All task", "Completed tasks"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              onClick={() => handleListItemClick(index, text)}
              sx={{
                backgroundColor: selectedIndex === index ? '#9667e8' : 'inherit',
                color: selectedIndex === index ? 'white' : 'inherit',
              }}>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={drawerOpen}>
        <DrawerHeader />
        <div>
          <BasicCard />
        </div>
        <Dialog
          open={dialogOpen} // Use separate state for Dialog
          TransitionComponent={Transition}
          keepMounted
          onClose={handleDialogClose}
          aria-describedby="alert-dialog-slide-description"
        >
          {/* Add content here for your Dialog */}
          <DialogTitle className="flex justify-between">
            <Typography variant="h6">Add Task</Typography>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <TaskForm2/>
              
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Main>
    </Box>
  );
}
