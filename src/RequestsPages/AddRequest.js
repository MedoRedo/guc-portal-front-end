import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Redirect, useHistory, useLocation} from 'react-router-dom';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,    
  TableRow,
  Paper,
  Grid,
  Typography,
  CssBaseline
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  tableContainer: {
    padding: theme.spacing(4)
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  headCell: {
    backgroundColor: '#D3D3D3',
    color: theme.palette.common.black,
    fontSize: 16,
    padding: theme.spacing(2),
    fontWeight: 'bold'
  },
  bodyCell: {
    fontSize: 14,
  },
  freeCell: {
      fontSize: 16,
      backgroundColor: '#228B22',
      fontWeight: 700
  },
  title: {
      margin: '5px', 
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      fontSize: 32,
      fontWeight: 'bold'
    },
  table: {margin: theme.spacing(4)},
  cell :{textAlign:'center', padding: theme.spacing(2),},
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button : {
    margin : theme.spacing(1)
  },
}));

// const requests = [{id: 1, status: 'Pending', submissionDate: '25/5/2020', type: 'Replacement', receiver: '1234'}, {id: 2, status: 'Accepted', submissionDate: '26/5/2020', type: 'Slot linking', receiver: '4321'}]

const AddRequest = (props) => {
  const classes = useStyles();
  const [requestType, setRequestType] = useState('');
  const [courseID, setCourseID] = useState('');
  const [receiverID, setReceiverID] = useState('');
  const [startDate, setStartDate] = useState('');
  const [day, setDay] = useState('');
  const [slot, setSlot] = useState('');
  const [content, setContent] = useState('');
  const [attachmentURL, setAttachmentURL] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async () => {
      try{
        if(requestType === 'ReplacementSlot'){
            var timestamp = Date.parse(startDate);
            var d = new Date(startDate);
            // console.log(d.getFullYear() + ' ' + d.getMonth() + '  ' + d.getDate())
            const user = await axios.post('https://gucportalguc.herokuapp.com/replacement/request',{
                courseId: courseID,
                receiver: receiverID,
                startDate: d,
                slot: slot,
                content: content,
                attachmentURL: attachmentURL
            },
            {
                headers : {
                    'auth_token' : localStorage.getItem('auth_token')
                }
            });
        }
        else if (requestType === 'SlotLinking'){
            // var timestamp = Date.parse(startDate);
            var d = new Date().setDate(day);
            const user = await axios.post('https://gucportalguc.herokuapp.com/slotlinking/request',{
                courseId: courseID,
                startDate: d,
                slot: slot,
                content: content,
                attachmentURL: attachmentURL
            },
            {
                headers : {
                    'auth_token' : localStorage.getItem('auth_token')
                }
            });
        }
        else if (requestType === 'ChangeDayOff'){
            // var timestamp = Date.parse(startDate);
            var d = new Date().setDate(day);
            const user = await axios.post('https://gucportalguc.herokuapp.com/changedayoff/request',{
                dayOff: d,
                content: content,
                attachmentURL: attachmentURL
            },
            {
                headers : {
                    'auth_token' : localStorage.getItem('auth_token')
                }
            });
        }
        else if (requestType !== undefined && requestType !== ''){
            var timestamp = Date.parse(startDate);
            var d = new Date(startDate);
            let params = {};
            if(requestType === 'AccidentalLeave' || requestType === 'AnnualLeave' || requestType === 'SickLeave' || requestType === 'MaternityLeave'){
                params = {
                    startDate: d,
                    duration: duration,
                    content: content,
                    attachmentURL: attachmentURL,
                    leaveType: requestType,
                };
            }
            else if(requestType === 'CompensationLeave'){
                var timestamp2 = Date.parse(day);
                var d2 = new Date(timestamp2);
                params = {
                    startDate: d,
                    dayOff: d2,
                    content: content,
                    attachmentURL: attachmentURL,
                    leaveType: requestType,
                };
            }
            // else if (requestType === '')
            const user = await axios.post('https://gucportalguc.herokuapp.com/leave/request',
            params,
            {
                headers : {
                    'auth_token' : localStorage.getItem('auth_token')
                }
            });
        }
      }catch(e){
          console.log(e)
      }
  }

  return (
    localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> : 
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
      <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          p={2}
        >
        <Button className={classes.button} variant='outlined' color='primary' onClick={()=>{setRequestType('ReplacementSlot')}}>Replacement Slot</Button>
        <Button className={classes.button} variant='outlined' color='primary' onClick={()=>{setRequestType('SlotLinking')}}>Slot Linking</Button>
        <Button className={classes.button} variant='outlined' color='primary' onClick={()=>{setRequestType('ChangeDayOff')}}>Change Day Off</Button>
        <Button className={classes.button} variant='outlined' color='primary' onClick={()=>{setRequestType('AccidentalLeave')}}>Accidental Leave</Button>
        <Button className={classes.button} variant='outlined' color='primary' onClick={()=>{setRequestType('AnnualLeave')}}>Annual Leave</Button>
        <Button className={classes.button} variant='outlined' color='primary' onClick={()=>{setRequestType('SickLeave')}}>Sick Leave</Button>
        <Button className={classes.button} variant='outlined' color='primary' onClick={()=>{setRequestType('MaternityLeave')}}>Maternity Leave</Button>
        <Button className={classes.button} variant='outlined' color='primary' onClick={()=>{setRequestType('CompensationLeave')}}>Compensation Leave</Button>
      </Box>
      {(requestType === 'ReplacementSlot' || requestType === 'SlotLinking') &&  
      (<TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="Course ID"
            label="Course ID"
            name="Course ID"
            autoFocus
            onChange={(event) => {setCourseID(event.target.value)}}
        />)
      }
        {(requestType === 'ReplacementSlot') &&
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Receiver ID"
            label="Receiver ID"
            type="Receiver ID"
            id="Receiver ID"
            onChange={(event) => {setReceiverID(event.target.value)}}
        />}
        {(requestType === 'ReplacementSlot' || requestType.includes('Leave')) &&
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Start Date (MM/DD/YYYY)"
            label="Start Date (MM/DD/YYYY)"
            type="Start Date (MM/DD/YYYY)"
            id="Start Date (MM/DD/YYYY)"
            onChange={(event) => {setStartDate(event.target.value)}}
        />}
        {(requestType === 'SlotLinking' || requestType === 'ChangeDayOff' || requestType === 'CompensationLeave') &&
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name={requestType === 'CompensationLeave' ? 'Compensation Date (MM/DD/YYYY)' :"Day (1-6)"}
            label={requestType === 'CompensationLeave' ? 'Compensation Date (MM/DD/YYYY)' :"Day (1-6)"}
            type={requestType === 'CompensationLeave' ? 'Compensation Date (MM/DD/YYYY)' :"Day (1-6)"}
            id={requestType === 'CompensationLeave' ? 'Compensation Date (MM/DD/YYYY)' :"Day (1-6)"}
            onChange={(event) => {setDay(event.target.value)}}
        />}
        {(requestType === 'ReplacementSlot' || requestType === 'SlotLinking') &&
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Slot"
            label="Slot"
            type="Slot"
            id="Slot"
            onChange={(event) => {setSlot(event.target.value)}}
        />}
        {(requestType !== undefined && requestType !== '') &&
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Content"
            label="Content"
            type="Content"
            id="Content"
            onChange={(event) => {setContent(event.target.value)}}
        />}
        {(requestType !== undefined && requestType !== '') &&
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Attachment URL"
            label="Attachment URL"
            type="Attachment URL"
            id="Attachment URL"
            onChange={(event) => {setAttachmentURL(event.target.value)}}
        />}
        {(requestType.includes('Leave') && requestType !== 'CompensationLeave') &&
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Duration"
            label="Duration"
            type="Duration"
            id="Duration"
            onChange={(event) => {setDuration(event.target.value)}}
        />}
        {(requestType !== undefined && requestType !== '') &&
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={handleSubmit}
        >
              Submit
        </Button>}

      </div>    
    </Container>
  );
};

export default AddRequest;
