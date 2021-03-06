import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [isValid, setIsValid] = useState(true);
  let history = useHistory();
  const handleEmail = (event) => {
    setEmail(event.target.value);
  }
  const handlePass = (event) => {
    setPass(event.target.value);
  }
  const handleLogin = async() => {
    try {
      const response = await axios.post('https://gucportalguc.herokuapp.com/login',{
        email,
        password
      });
      localStorage.setItem('auth_token', response.headers.auth_token);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userEmail', response.data.email)
      setIsValid(true);
      if(response.data.firstLogin === undefined || response.data.firstLogin === true)
        history.push('/changePassword');
      else
        history.push('/');
    }
    catch(e) {
      setIsValid(false);
    }
  }
  return (
    localStorage.getItem('auth_token') !== null ? <Redirect to="/"/> :
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
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
            value={email}
            onChange={handleEmail}
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
            value={password} 
            onChange={handlePass}
          />
          {isValid ? null : <Alert severity="error">invalid email or password</Alert>}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Log In
            </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;