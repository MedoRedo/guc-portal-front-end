import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import {Redirect, useHistory} from 'react-router-dom';

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

function ChangePassword(props) {
  const classes = useStyles();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isValid, setIsValid] = useState(true);
  let history = useHistory();
  const handleOldPass = (event) => {
	  setOldPass(event.target.value);
  }
  const handleNewPass = (event) => {
	  setNewPass(event.target.value);
  }
  const handleConfirmPass = (event) => {
	  setConfirmPass(event.target.value);
  }
  const handleSubmit = async() => {
    if(newPass !== confirmPass)
      return setIsValid(false);
    try {
      await axios.post('http://localhost:5000/changePassword', {
      oldPass,
      newPass,
      },{
        headers : {
          auth_token : localStorage.getItem('auth_token')
        }
      });
      setIsValid(true);
      history.push('/');
    }
    catch(e) {
      setIsValid(false);
    }
  }
  return (
	localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> :
	<Container component="main" maxWidth="xs">
	  <CssBaseline />
	  <div className={classes.paper}>
      <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Change Password
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="old password"
          label="old Password"
          type="password"
          id="oldPass"
          autoComplete="current-password"
          value={oldPass} 
          onChange={handleOldPass}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="new password"
          label="new password"
          type="password"
          id="newPassword"
          autoComplete="current-password"
          value={newPass} 
          onChange={handleNewPass}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="confirm password"
          label="confirm password"
          type="password"
          id="confirmPassword"
          autoComplete="current-password"
          value={confirmPass} 
          onChange={handleConfirmPass}
        />
        {isValid ? null : <Alert severity="error">Invalid data</Alert>}
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
	  </div>
	</Container>
  );
}

export default ChangePassword;