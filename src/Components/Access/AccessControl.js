import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Request from "react-http-request"
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import * as sha256 from "sha256";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";

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
  }
}));

export default function AccessControl(props) {

  const classes = styleAccessControl();
  const {open, onClose} = props;
  const [isSingIn, setSingIn] = React.useState(true);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const singInHandleButton = () => {
    return (
      <Request
        url='https://localhost:44337/api/user/authentication'
        method='post'
        accept='application/json'
        verbose={true}
        body={
          JSON.stringify({
            UserName: email,
            PasswordHash: password,
          })}
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return <div>loading...</div>;
            } else if (error) {
              alert(error);
            } else {
              return <div>{JSON.stringify(result)}</div>;
            }
          }
        }
      </Request>
    );
  };
  const handleOnChangePassword = (event) => {
    setPassword(sha256(event.target.value));
  };
  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value)
  };
  const handleShowSingUpForm = () => {
    setSingIn(!isSingIn)
  };

  const FormView = (props) => {
    if (isSingIn) {
      return (
        <SingInControl/>
      )
    } else {
      return (
        <Registration/>
      )
    }
  };

  const SingInControl = (props) => {
    const classes = styleAccessControl();
    return (
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.formAuth} noValidate>
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
            onChange={handleOnChangeEmail}
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
            onChange={handleOnChangePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={singInHandleButton}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={handleShowSingUpForm}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  };
  const Registration = (props) => {
    const classes = styleAccessControl();
    return (
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            autoComplete="fname"
            name="Username"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type = "submit"
            fullWidth
            variant = "contained"
            color = "primary"
            className = {classes.submit}
          >Sign Up
          </Button>;
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={handleShowSingUpForm}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>;
      </div>
    )
  };

  return(
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <Container component="main" maxWidth="xs">
        <FormView isSingIn ={isSingIn}/>
      </Container>
    </Dialog>
  )
}

