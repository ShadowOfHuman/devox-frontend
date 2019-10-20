import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import PublicComponent from "./Components/Public/PublicComponent";
import AccessControl from "./Components/Access/AccessControl";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));


function App() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose =() => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            DevOx
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>Login</Button>
        </Toolbar>
      </AppBar>
      <AccessControl open={open} onClose={handleClose}/>
      <PublicComponent />
    </div>
  );
}

export default App;
