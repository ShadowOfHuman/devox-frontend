import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import PublicComponent from "./Components/Public/PublicComponent";
import UserPageComponent from "./Components/UserPage/UserPage";
import Dialog from "@material-ui/core/Dialog";
import AccessControl from "../src/Components/Access/AccessControl"
import AuthContext from "./Components/DataContext";


require('dotenv').config()

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
  const [auth, setAuth] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [username, setUsername] = React.useState("")
  const PageView = () => {
    if(!auth){
      return <PublicComponent/>
    }else{
      return <UserPageComponent/>
    }
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose =() => {;
    setOpen(false);
  };

  const handleClickLogOut =() =>{
    setUserId(null);
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{setAuth, handleClose, setUserId, setUsername}}>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            DevOx
          </Typography>
          {!auth &&   <Button color="inherit" onClick={handleClickOpen}>Login</Button>}
          {auth && <Typography>Hello {username}</Typography> }
          {auth && <Button color="inherit" onClick={handleClickLogOut}>Log out</Button>}
        </Toolbar>
      </AppBar>
        <Dialog open={open} onClose={handleClose}>
          <AccessControl/>
        </Dialog>
      <PageView/>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
