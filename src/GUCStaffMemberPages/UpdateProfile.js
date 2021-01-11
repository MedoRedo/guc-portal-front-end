import React, {useState, useEffect} from 'react';
import Alert from '@material-ui/lab/Alert';
import {AssignmentIndRounded} from '@material-ui/icons/';
import {Redirect, useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';
import {
  makeStyles,
  Checkbox,
  FormControlLabel,
  Typography,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  Container
} from '@material-ui/core'

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

function UpdateProfile(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [email_c, setEmail_c] = useState(true);
  const [gender_c, setGender_c] = useState(true);
  const [selected, setSelected] = useState(true);
  let history = useHistory();
  const handleEmail = (event) => {
    setEmail(event.target.value);
  }
  const handleGender = (event) => {
    setGender(event.target.value);
  }
  const handleCLick = (event) => {
    const name = event.target.name;
    if(name === 'email')
      setEmail_c(!email_c);
    else
      setGender_c(!gender_c);
  }
  const handleUpdate = async (event) => {
    if(!email_c && !gender_c){
      setSelected(false);
      return;
    }
    try {
      await axios.post('http://localhost:5000/updateProfile',
      {
        email : email_c ? email : undefined,
        gender : gender_c ? gender : undefined
      },
      {
        headers : {
          'auth_token' : localStorage.getItem('auth_token')
        }
      })
      setIsValid(true);
      setSelected(true);
      history.push('/');
    }
    catch(e) {
      console.log(e);
      setIsValid(false);
      setSelected(true);
    }
  }
  return (
    localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> :
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIndRounded />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Profile
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmail}
          />
          <FormControlLabel
            control={<Checkbox checked={email_c} onClick={handleCLick} name="email" />}
            label="update email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="gender"
            label="gender"
            type="gender"
            id="gender"
            autoComplete="current-password"
            value={gender} 
            onChange={handleGender}
          />
          <FormControlLabel
            control={<Checkbox checked={gender_c} onClick={handleCLick} name="gender" />}
            label="update gender"
          />
          {isValid ? null : <Alert severity="error">Invalid email or gender</Alert>}
          {selected ? null : <Alert severity="error">At least one entry must be selected</Alert>}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleUpdate}
            >
              Update
            </Button>
        </form>
      </div>
    </Container>
  );
}

export default UpdateProfile;