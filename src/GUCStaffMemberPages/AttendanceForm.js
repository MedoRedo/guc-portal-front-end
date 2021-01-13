import React, {useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import {CalendarToday} from '@material-ui/icons';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
  Container
} from '@material-ui/core';

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

function AttendanceForm(props) {
  const classes = useStyles();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [isValid, setIsValid] = useState(true);
  let history = useHistory();
  const handleYear = (event) => {
    setYear(event.target.value);
  }
  const handleMonth = (event) => {
    setMonth(event.target.value);
  }
  const handleSubmit = () => {
    if(year === "" && month === "") {
      history.push('/attendance');
      return;
    }
    if(year >= 2000 && year <= new Date().getFullYear() && month > 0 && month < 13) {
      history.push("/attendance", {
        year,
        month : month - 1
      });
      return;
    }
    else {
      setIsValid(false);
    }
  }
  return (
    localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> :
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CalendarToday/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Attendance
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="year"
            label="Year"
            name="year"
            autoFocus
            value={year}
            onChange={handleYear}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="month"
            label="Month"
            id="month"
            value={month} 
            onChange={handleMonth}
            helperText="enter a number between 1 and 12"
          />
          {isValid ? null : <Alert severity="error">invalid year or month</Alert>}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              View Attendance
            </Button>
        </form>
      </div>
    </Container>
  );
}

export default AttendanceForm;