import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import ProfileBody from './ProfileBody';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  body : {
    padding : '1%'
  }
}));

function Profile(props) {
  const classes = useStyles();
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [ready, setReady] = useState(false);
  const [values, setValues] = useState({
    id:"",
    email:"",
    password:"",
    name:"",
    gender:"",
    salary:0,
    dayOff: 0,
    officeLoc: "",
    leaves: 0,
    attendance:[],
    startDay: null,
    loggedIn: true,
    notifications : [],
    firstLogin : false,
    department : ""
  });
  useEffect(() => {
    const getData = async() => {
      const res = await axios.get('http://localhost:5000/profile', {
        headers : {
          'auth_token' : localStorage.getItem('auth_token')
        }
      });
      setValues({
        ...values,
        ...res.data
      });
    }
    const getFacultyAndDepartment = () => {
      const dep = axios.get('http://localhost:5000/departmentId', {
        headers : {
          'auth_token' : localStorage.getItem('auth_token')
        }
      })
      const fac = axios.get('http://localhost:5000/facultyId', {
        headers : {
          'auth_token' : localStorage.getItem('auth_token')
        }
      })
      const res = Promise.all([dep, fac]).then((res) => {
        console.log(res);
        setDepartment(res[0].data.name);
        setFaculty(res[1].data.name);
      })
    }
    try {
      getData();
      getFacultyAndDepartment();
      setReady(true);
    }
    catch(e) {
      console.log(e);
      setReady(false);
    }
  }, [])
  return (
    localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> :
    ready && (
      <Grid container direction="column" alignItems="center">
        <Grid item container xs={12} md={8} direction="column" alignItems="stretch" className={classes.body}>
          <ProfileBody values={{
            ...values,
            faculty,
            department
          }}/>
        </Grid>
      </Grid>
    )
  );

}

export default Profile;