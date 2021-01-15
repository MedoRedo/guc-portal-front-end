import React, {useEffect, useState} from 'react';
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
import {Redirect, useHistory,useParams} from 'react-router-dom';

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
const mapfromDaytoNum = (day)=>{
    day=day.toLowerCase();
    switch(day){  
        case "sunday" : return 0;
        case "monday" : return 1;
        case "tuesday" : return 2;
        case "wednesday" : return 3;
        case "thursday" : return 4;
        case "friday" : return 5;
        case "saturday" : return 6;
    }


}

function AddSlot(props) {
  const classes = useStyles();
  const [day, setDay] = useState("");
  const [period, setPeriod] = useState("");
  const [location, setLocation] = useState("");
  const [type,setType] = useState("");
  const [isValid, setIsValid] = useState(0);
  const [auth,setAuth] = useState(0);
  const params = useParams();
  let history = useHistory();

  const handleDay = (event)=>{
      setDay(event.target.value);
  }
    
const handlePeriod = (event)=>{
    setPeriod(event.target.value);
}
const handleLocation = (event)=>{
    setLocation(event.target.value);
}
const handleType = (event)=>{
    setType(event.target.value);
}
    useEffect(()=>{
        axios.get(`http://localhost:5000/isCoordinator/${params.courseId}`,{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }}).then((res)=>{
                if(res.data.isCoordinator){
                    setAuth(1);
            }
            else{
                setAuth(-1);
            }
    })},[])

  const handleSubmit = async() => {
        if(day!=='monday'&&day!=='tuesday'&&day!=='wednesday'&&day!=='friday'&&day!=='saturday'&&day!=='sunday'&&day!=='thursday'){
            setIsValid(-1);
            return;
        }
          try {
      await axios.post('http://localhost:5000/slot/add', {
      day:mapfromDaytoNum(day),
      period:period,
      location:location,
      slotType:type,
      course:params.courseId
      },{
        headers : {
          auth_token : localStorage.getItem('auth_token')
        }
      });
      setIsValid(1);
      setTimeout(()=>{
          setIsValid(0);
      },4000)

    }
    catch(e) {
        console.log('error here');
        if(e.status)
      setIsValid(-1);
    }
  }
  

  return (
	localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> :auth === 0?null:auth===-1?<Redirect to="/forbidden/"/>:
	<Container component="main" maxWidth="xs">
	  <CssBaseline />
	  <div className={classes.paper}>
      <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
      Adding a Slot
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          name="Day"
          label="Day"
          type="text"
          id="day"
          value={day} 
          onChange={handleDay}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          name="Period"
          label="Period"
          type="text"
          id="period"
          value={period} 
          onChange={handlePeriod}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          name="Location"
          label="Location"
          type="text"
          id="confirmPassword"
          value={location} 
          onChange={handleLocation}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          name="Slot type"
          label="Slot type"
          type="text"
          id="Slot type"
          value={type} 
          onChange={handleType}
        />
        {isValid ===0?null:isValid===1? <Alert>Slot Added Successfully!</Alert> : <Alert severity="error">Invalid data or Unauthorized</Alert>}
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

export default AddSlot;