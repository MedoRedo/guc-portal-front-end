import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Redirect, useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';
import { QueryBuilderRounded } from '@material-ui/icons';

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

function SignInOut(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  let history = useHistory();
  const location = useLocation();
  const handleEmail = (event) => {
    setEmail(event.target.value);
  }
  const handleSubmit = async() => {
    try {
        if(email !== location.state.email) {
            setIsValid(false);
            return;
        }
        await axios.get(`http://localhost:5000/${location.state.action === 'Sign in' ? 'signin' : 'signout'}`, {
            headers : {
                'auth_token' : localStorage.getItem('auth_token')
            }
        })
        setIsValid(true);
        history.push('/');
    }
    catch(e) {
      console.log(e);
    }
  }
  return (
    localStorage.getItem('auth_token') === null ? <Redirect to="/"/> :
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <QueryBuilderRounded/>
        </Avatar>
        <Typography component="h1" variant="h5">
          {location.state.action.toUpperCase()}
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
          {isValid ? null : <Alert severity="error">invalid email</Alert>}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              {location.state.action}
            </Button>
        </form>
      </div>
    </Container>
  );
}

export default SignInOut;