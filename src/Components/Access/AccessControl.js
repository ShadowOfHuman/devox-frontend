import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {blue} from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";


export class AccessControl extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state.open = false;
        this.state.isRegistration = false;
    }

    state = {
      open: false
    };

    open = () => {
        this.setState({
            open: true
        });
    };

    close = () =>{
        this.setState({
            open: false
        });
    };

    handleSingInClick(){

        alert("Sing In")
    }

    handleSingUpClick(){

        alert("Sing Up")
    }

    render(){
        return <Dialog open={this.state.open} onClose={this.close} aria-labelledby="simple-dialog-title" >
            <DialogTitle id="simple-dialog-title">This is auth dialog</DialogTitle>
             {this.state.isRegistration ? this.authControl(): this.registrationControl()}
            <Button href="#">
                Sing In
            </Button>
            <Button href="#">
                Sing Up
            </Button>
        </Dialog>;
    }

    authControl(){
        return <div>
            <TextField
                id="outlined-disabled"
                label="Email"
                type="email"
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="outlined-email-input"
                label="Password"
                type="password"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
            />
        </div>;
    }

    registrationControl(){
        return <div>
            <TextField
                id="outlined-disabled"
                label="UserName"
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="outlined-disabled"
                label="Email"
                type="email"
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="outlined-email-input"
                label="Password"
                type="password"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
            />
            <TextField
                label="Confirm password"
                type="password"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
            />
        </div>
    }
}

