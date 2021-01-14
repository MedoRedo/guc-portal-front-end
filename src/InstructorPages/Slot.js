import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useHistory, useParams,Redirect } from 'react-router-dom';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    Card:{margin:'1em'},
    Typography:{margin:'1em'},
    Button:{marginLeft:'1em',marginBottom:'1em'}
}));
const slotNum = (slot)=>{
    switch (slot){
        case 1: return '1st';
        case 2: return '2nd';
        case 3: return '3rd';
        case 4: return '4th';
        case 5: return '5th';
    }
}
const mapNumberToDay = (num) => {
    switch(num) {
      case -1 : return "";  
      case 0 : return "Sunday";
      case 1 : return "Monday";
      case 2 : return "Tuesday";
      case 3 : return "Wednesday";
      case 4 : return "Thursday";
      case 5 : return "Friday";
      case 6 : return "Saturday";
    }
  }
const Slot = (props)=>{
    const classes = useStyles();
    const history = useHistory();
    const params = useParams();
    const [instructor,setInstructor] = useState("");
    const [valid,setValid] = useState(0);
    const [view,setView] = useState(true);
    const handleAssign = ()=>{
        history.push(`/courses/${params.courseId}/slots/${props.slotId}`);
    }
    const handleDelete = ()=>{
        fetch(`http://localhost:5000/instructors/slots/${props.slotId}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            auth_token:localStorage.getItem('auth_token')
        },
        body:JSON.stringify({courseId:params.courseId})
    }).then((res)=>{
        console.log(res);
        setInstructor('Not Assigned yet');
        setValid(1);
        axios.get(`http://localhost:5000/instructors/courses/${params.courseId}/unassigned-slots`,{headers : {
            auth_token : localStorage.getItem('auth_token')
          }}).then( 
            (res)=>{
                console.log(res);
                const info = res.data.unAssignedSlots;
                props.updateView(info);
                setView(false);

            }
        )
        axios.get(`http://localhost:5000/courses/${params.courseId}/slots-assignment`,{headers : {
            auth_token : localStorage.getItem('auth_token')
          }}).then( 
            (res)=>{
                console.log(res);
                setView(false);
                const info = res.data.slotsInformation;
                props.updateAll(info);
            }
        )
    }).catch((err)=>{
        console.log(err);
        setValid(-1);
    })

    }
    const showDelete = ()=>{
        if(props.instructor !=='Not Assigned yet' && view){
            return <Button className={classes.Button} variant='contained' color='secondary' onClick={()=>{handleDelete();}}>Delete Assignment</Button>

        }
    }
    const showSlotType = ()=>{
        if(props.slotType!==undefined){
          return(  <div className={classes.Typography}>
            <Typography display='inline' variant='h6' color='primary'>Slot type: </Typography>
            <Typography display='inline' variant='h6'>{props.slotType}</Typography>
        </div>)
        }
    }
    return (localStorage.getItem('auth_token') === null ? <Redirect to="/login"/>:
    valid ===-1?<Redirect to='/forbidden'/>:<Card className={classes.Card}>
        <div className={classes.Typography}>
            <Typography  display='inline' variant='h6' color='primary'>Day : </Typography>
            <Typography display='inline' variant='h6'>{mapNumberToDay(props.day)}</Typography>
        </div>
        <div className={classes.Typography}>
            <Typography  display='inline' variant='h6' color='primary'>Period : </Typography>
            <Typography  display='inline' variant='h6'>{slotNum(props.period)} </Typography>
        </div>
        <div className={classes.Typography}>
        <Typography display='inline' variant='h6' color='primary'>Location : </Typography>
        <Typography display='inline' variant='h6'>{props.location}</Typography>
        </div>

        <div className={classes.Typography}>
            <Typography display='inline' variant='h6' color='primary'>Instructor : </Typography>
            <Typography display='inline' variant='h6'>{instructor.length === 0? props.instructor : instructor}</Typography>
        </div>
        {showSlotType()}
        <Button className={classes.Button} variant='contained' color='primary' onClick={()=>{handleAssign()}}>Assign</Button>
        {showDelete()}
    </Card>);
}

export default Slot;