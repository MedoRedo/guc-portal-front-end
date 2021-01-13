import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import {Redirect, useLocation} from 'react-router-dom';
import AttendanceCard from './AttendanceCard';
import axios from 'axios';

const useStyles = makeStyles({
  body : {
      padding : '1%'
  },
  root: {
    width : "100%"
  }
})

function Attendance(props) {
  const classes = useStyles();
  const [records, setRecords] = useState([]);
  const [ready, SetReady] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const getAttendanceAll = async() => {
      const res = await axios.get('http://localhost:5000/attendance', {
        headers : {
          'auth_token' : localStorage.getItem('auth_token')
        }
      })
      setRecords(res.data);
      SetReady(true);
    }
    const getAttendanceMonth = async(year, month) => {
      const res = await axios.get(`http://localhost:5000/attendance/${location.state.year}/${location.state.month}`, {
        headers : {
          'auth_token' : localStorage.getItem('auth_token')
        }
      })
      setRecords(res.data);
      SetReady(true);
    }
    try {
      if(location.state === undefined)
        getAttendanceAll();
      else
        getAttendanceMonth(location.state.year, location.state.month);
    }
    catch(e) {
      console.log(e);
    }
  }, [])
  const getDays = (data) => {
    const res = {};
    for(const record of data) {
      let entry = record.signIn === undefined ? new Date(record.signOut) : new Date(record.signIn);
      entry = new Date(entry.getFullYear(), entry.getMonth(), entry.getDate()).toString();
      if(res[entry] === undefined)
        res[entry] = [];
      res[entry][res[entry].length] = record;
    }

    return Object.entries(res);
  }
  return (
    localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> :
    ready && (
    <Grid container direction="column" alignItems="center" className={classes.body} spacing={1}>
      {
        getDays(records).map(([day, attendance]) => {
          return (
            <Grid item xs={12} md={5} className={classes.root} key={day}>
              <AttendanceCard day={new Date(day).toDateString()} records={attendance}/>
            </Grid>
          )
        })
      }
    </Grid>
  )
  )

}

export default Attendance;