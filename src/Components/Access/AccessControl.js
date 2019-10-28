import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import {AccessService} from "./AccessService";
import CircularProgress from "@material-ui/core/CircularProgress";
import {green} from "@material-ui/core/colors";
import AuthContext, {AuthConsumer} from "../DataContext";

const styleAccessControl = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  formAuth: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formRegistration: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  }
}));

const styleButton = makeStyles(theme => ({
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));


export default class AccessControl extends React.Component {

  context=null;
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "",
      password: "",
      message: "",
      loading: false,
      error: false,
      success: false,
      singInForm: true
    };
    this.context = this.props.context;
  }
  static contextType = AuthContext;

  handleChangeEmail(event) {
    this.setState({email: event.target.value})
  }
  handleChangePassword(event) {
    this.setState({password: event.target.value})
  }
  handleChangeUserName(event) {
    this.setState({username: event.target.value})
  }


  componentDidMount() {
  }

  handleSingIn() {
    this.setState({
      error: false,
      success: false,
      loading: true,
      message: ""
    });
    AccessService.authentication(
      this.state.email,
      this.state.password
    ).then((response) => {
      //todo: make save in local storage
      this.setState({
        error: false,
        success: true,
        messsage: ""
      });
      this.context.setUserId(response.data["idUser"]);
      this.context.setUsername(response.data["userName"]);
      this.context.setAuth(true);
      this.context.handleClose();
    })
      .catch((error)=>{
        if (error.response.status === 400) {
          this.setState({
            error: true,
            message: "Invalid email or password"
          });
        }
        else{
          this.setState({
            error: true,
            message: "Server not response."
          });
        }
      })
      .finally(() => {

        this.setState({
          loading: false
        });
      });
    console.log(this.state.email + " " + this.state.password)
  }
  handleSingUp() {
    this.setState({loading: true});
    AccessService.registration(this.state.username, this.state.email, this.state.password)
      .then((res) => {
        this.handleSingIn();
        //Close modal window
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.setState({
            error: true,
            message: "User already exist"
          });
        } else {
          this.setState({
            error: true,
            message: "Error. Try to later."
          });
        }
      })
      .finally(() => {
        this.setState({loading: false});
      });


    console.log(this.state.username + " " + this.state.email + " " + this.state.password)
  }


  handleChangeForm() {
    this.setState({singInForm: !this.state.singInForm});
  }

  render() {
    return (
      <AuthContext.Consumer>{
        () => (
        <div>
          <Container component="main" maxWidth="xs">
            {this.state.singInForm &&
            <div>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => this.handleChangeEmail(event)}
              />
              <TextField
                //value={values.password}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => this.handleChangePassword((event))}
              />
              {this.state.loading && <CircularProgress size={24}/>}
              {this.state.error && <div>{this.state.message}</div>}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => this.handleSingIn()}
                disabled={this.state.loading}
              >Sign In
              </Button>
              <Link variant="body2" onClick={() => this.handleChangeForm()}>Don't have an account? Sign Up</Link>
            </div>}
            {!this.state.singInForm &&
            <div>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(event) => this.handleChangeUserName(event)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event) => this.handleChangeEmail(event)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => this.handleChangePassword(event)}
              />
              {this.state.error && <div>{this.state.message}</div>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={this.state.loading}
                onClick={() => this.handleSingUp()}
              >Sign Up
              </Button>
              <Link variant="body2" onClick={() => this.handleChangeForm()}>
                Already have an account? Sign in.
              </Link>
            </div>}
          </Container>
        </div>
        )}</AuthContext.Consumer>);
  }
}
AccessControl.context = AuthContext;



