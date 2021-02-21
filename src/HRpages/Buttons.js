import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Redirect, useHistory} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();
  const history = useHistory();

  
  return (
    localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> :
    localStorage.getItem('userId').charAt(0) !== 'h' ? <Redirect to="/forbidden"/> : 
    <div className={classes.root}>
       <Button variant="contained" color="primary" onClick={()=>{
         history.push("/addLocation");
       }}>
        Add Location
      </Button>
      <Button variant="contained" color="primary" onClick={()=>{
         history.push("/locationOps");
       }}>
        Delete/ Update Location 
      </Button>
       <Button variant="contained" color="primary" onClick={()=>{
         history.push("/addMember");
       }}>
        Add Member
      </Button>
       <Button variant="contained" color="primary" onClick={()=>{
         history.push("/memberOps");
       }}>
        Delete / Update Members
      </Button>
       <Button variant="contained" color="primary" onClick={()=>{
         history.push("/addDept");
       }}>
        Add Department
      </Button>
       <Button variant="contained" color="primary" onClick={()=>{
         history.push("/deptOps");
       }}>
        Delete/ Update Depts
      </Button>

       <Button variant="contained" color="primary" onClick={()=>{
         history.push("/addCourse");
       }}>
        Add Course
      </Button>
       <Button variant="contained" color="primary" onClick={()=>{
         history.push("/courseOps");
       }}>
        Delete/ Update Course
      </Button>
       <Button variant="contained" color="primary" onClick={()=>{
         history.push("/addFaculty");
       }}>
        Add Faculty
      </Button>
       <Button variant="contained" color="primary" onClick={()=>{
         history.push("/facultyOps");
       }}>
        Delete/ Update Faculty
      </Button>
      
    </div>
  );
}
