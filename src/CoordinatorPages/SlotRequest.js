import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useHistory, useParams,Redirect } from 'react-router-dom';
import axios from 'axios';
import TextareaAutoSize from '@material-ui/core/TextareaAutosize'
import {TextField} from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    Card:{margin:'1em'},
    Typography:{margin:'1em'},
    Button:{margin:'1em'}
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
const SlotRequest    = (props)=>{
    const classes = useStyles();
    const history = useHistory();
    const params = useParams();
    const [instructor,setInstructor] = useState("");
    const [valid,setValid] = useState(0);
    const [comment,setComment] = useState("");
    const [status,setStatus] = useState("");
    const handleClick = (response)=>{
        fetch(`http://localhost:5000/coordinator/courses/${params.courseId}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            auth_token:localStorage.getItem('auth_token')
        },
        body:JSON.stringify({
            requestId:props.requestId,
            requestResponse:response,
            comment:comment
        })
    }).then((res)=>{
        setStatus(response);
        axios.get(`http://localhost:5000/coordinator/courses/${params.courseId}/slot-linking-requests`,{headers : {
            auth_token : localStorage.getItem('auth_token')
            }}).then( 
            (res)=>{
                const info = res.data.slotRequests;
                props.updatePending(info);
            }
        ).catch((err)=>{
            console.log(err);
        });
        axios.get(`http://localhost:5000/coordinator/courses/${params.courseId}/non-pending-slot-linking-requests`,{headers : {
            auth_token : localStorage.getItem('auth_token')
            }}).then( 
            (res)=>{
                if(response==='Rejected')
                console.log(res);
                const info = res.data.slotRequests;
                props.updateNonPending(info);
            }
        ).catch((err)=>{
            console.log(err);
        })
    }).catch((err)=>{
        console.log(err);
    })
    }
    const handleChange = (event)=>{
        setComment(event.target.value);
    }
    const isPending = ()=>{
        if(props.status==='Pending'&&status==''){
            return (<>
            <div>
            <TextField
                id="outlined-textarea"
                label="Comment"
                placeholder="Enter a comment"
                value={comment}
                onChange={handleChange}
                multiline
                variant="outlined"
                className={classes.Button}
              /> </div>
               <Button variant="contained" color="primary" className={classes.Button} onClick={()=>{handleClick('Accepted')}}>Accept</Button>
               <Button variant="contained" color="secondary" className={classes.Button} onClick={()=>{handleClick('Rejected')}}>Reject</Button>
               </>)
        }
        else {
        return    <div className={classes.Typography}>
            <Typography  display='inline' variant='h6' color='primary'>Comment : </Typography>
            <Typography display='inline' variant='h6'>{props.comment}</Typography>
        </div>
        }
        
    }
    return (localStorage.getItem('auth_token') === null ? <Redirect to="/login"/>:
    <Card className={classes.Card}>
        <div className={classes.Typography}>
            <Typography  display='inline' variant='h6' color='primary'>Requested From : </Typography>
            <Typography display='inline' variant='h6'>{props.memberName}</Typography>
        </div>
        <div className={classes.Typography}>
            <Typography  display='inline' variant='h6' color='primary'>Day : </Typography>
            <Typography  display='inline' variant='h6'>{mapNumberToDay(props.day)} </Typography>
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
            <Typography  display='inline' variant='h6' color='primary'>Slot type : </Typography>
            <Typography  display='inline' variant='h6'>{props.slotType} </Typography>
        </div>
        <div className={classes.Typography}>
        <Typography display='inline' variant='h6' color='primary'>status : </Typography>
        <Typography display='inline' variant='h6'>{status===""?props.status:status}</Typography>
        </div>
        <div className={classes.Typography}>
        <Typography display='inline' variant='h6' color='primary'>Content : </Typography>
        <Typography display='inline' variant='h6'>{props.content}</Typography>
        </div>
        <div className={classes.Typography}>
        <Typography display='inline' variant='h6' color='primary'>Submission Date : </Typography>
        <Typography display='inline' variant='h6'>{props.submissionDate}</Typography>
        </div>
        {/* <div className={classes.Typography}>
            <Typography display='inline' variant='h6' color='primary'>Instructor : </Typography>
            <Typography display='inline' variant='h6'>{instructor.length === 0? props.instructor : instructor}</Typography>
        </div> */}
        {isPending()}
    </Card>);
}

export default SlotRequest;