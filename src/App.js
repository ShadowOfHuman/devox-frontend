import React from 'react';
import './App.css';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import PublicComponent from "./Components/Public/PublicComponent";
import {LobbyComponent} from "./Components/Lobby/LobbyComponent";
import Dialog from "@material-ui/core/Dialog";
import AccessControl from "../src/Components/Access/AccessControl"
import AuthContext from "./Components/DataContext";
import {Game} from "./Components/Game/Game";


require('dotenv').config();

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
    const [game, setGame] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [auth, setAuth] = React.useState(false);
    const [userId, setUserId] = React.useState("");
    const [username, setUsername] = React.useState("");


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickLogOut = () => {
        setUserId(null);
        setAuth(false);
    };

    return (
        <AuthContext.Provider value={{setAuth, handleClose, setUserId, setUsername, setGame}}>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            DevOx
                        </Typography>
                        {!auth && <Button color="inherit" onClick={handleClickOpen}>Login</Button>}
                        {auth && <Typography>Hello {username}</Typography>}
                        {auth && <Button color="inherit" onClick={handleClickLogOut}>Log out</Button>}
                    </Toolbar>
                </AppBar>
                <Dialog open={open} onClose={handleClose}>
                    <AccessControl context={{setAuth, handleClose, setUserId, setUsername}}/>
                </Dialog>
                {auth&&!game&&<LobbyComponent userId = {userId} setGame={setGame}/>}
                {!auth&&!game&&<PublicComponent/>}
                {auth&&game&&<Game/>}
            </div>
        </AuthContext.Provider>
    );
}

export default App;
