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

  const handleClick = async (id) => {
    try{
        // const user = await axios.delete(`http://localhost:5000/request/${id}`, {
        //   headers : {
        //     'auth_token' : localStorage.getItem('auth_token')
        //   }
        // });
        // const req = await axios.get('http://localhost:5000/submittedRequests', {
        //     headers : {
        //         'auth_token' : localStorage.getItem('auth_token')
        //     }
        // });
        // console.log(req.data.requests + 'hereeeeeeeeeeeeeeeee');
        // setRequests(req.data.requests === undefined ? [] : req.data.requests);
    }catch(e){
        console.log(e)
    }
  }

  const handleSubmit = async () => {
      //todo
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
      {/* {requestType === 'ReplacementSlot'} && */}
      <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="Course ID"
            label="Course ID"
            name="Course ID"
            autoFocus
            onChange={(event) => {setCourseID(event.target.value)}}
        />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Receiver ID"
            label="Receiver ID"
            type="Receiver ID"
            id="Receiver ID"
            onChange={(event) => {setReceiverID(event.target.value)}}
        />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Start Date"
            label="Start Date"
            type="Start Date"
            id="Start Date"
            onChange={(event) => {setStartDate(event.target.value)}}
        />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Day"
            label="Day"
            type="Day"
            id="Day"
            onChange={(event) => {setDay(event.target.value)}}
        />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Slot"
            label="Slot"
            type="Slot"
            id="Slot"
            onChange={(event) => {setSlot(event.target.value)}}
        />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Content"
            label="Content"
            type="Content"
            id="Content"
            onChange={(event) => {setContent(event.target.value)}}
        />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Attachment URL"
            label="Attachment URL"
            type="Attachment URL"
            id="Attachment URL"
            onChange={(event) => {setAttachmentURL(event.target.value)}}
        />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="Duration"
            label="Duration"
            type="Duration"
            id="Duration"
            onChange={(event) => {setDuration(event.target.value)}}
        />
        <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={handleSubmit}
        >
              Submit
        </Button>

      </div>    
    </Container>
  );
};

export default AddRequest;
