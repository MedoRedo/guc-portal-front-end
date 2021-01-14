import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Redirect, useHistory, useLocation} from 'react-router-dom';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
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
  Typography
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
  cell :{textAlign:'center', padding: theme.spacing(2),}
}));

// const requests = [{id: 1, status: 'Pending', submissionDate: '25/5/2020', type: 'Replacement', receiver: '1234'}, {id: 2, status: 'Accepted', submissionDate: '26/5/2020', type: 'Slot linking', receiver: '4321'}]

const SentRequestsBody = (props) => {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(async () => {
    try{
    const user = await axios.get('http://localhost:5000/HOD/viewChangeDayOffRequests', {
      headers : {
        'auth_token' : localStorage.getItem('auth_token')
      }
    });
    // console.log(user.data.requests + 'hereeeeeeeeeeeeeeeee');
    setRequests(user.data.requests === undefined ? [] : user.data.requests);
    setReady(true);
    }catch(e){
        console.log(e)
    }
  }, []);

  const handleClick = async (id) => {
    try{
        const user = await axios.delete(`http://localhost:5000/request/${id}`, {
          headers : {
            'auth_token' : localStorage.getItem('auth_token')
          }
        });
        const req = await axios.get('http://localhost:5000/submittedRequests', {
            headers : {
                'auth_token' : localStorage.getItem('auth_token')
            }
        });
        console.log(req.data.requests + 'hereeeeeeeeeeeeeeeee');
        setRequests(req.data.requests === undefined ? [] : req.data.requests);
    }catch(e){
        console.log(e)
    }
  }

  return (
    localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> : 
    ready &&
    <>
        <Typography component="h2" variant="h6" color="primary" className={classes.title} align='center'>
            Pending Requests
        </Typography>
        <TableContainer className={classes.tableContainer} component={Paper}>
        <Table size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell className={classes.headCell}>Request ID</TableCell>
                    <TableCell className={classes.headCell}>Request Status</TableCell>
                    <TableCell className={classes.headCell}>Submission Date</TableCell>
                    <TableCell className={classes.headCell}>Request Type</TableCell>
                    <TableCell className={classes.headCell}>Sender ID</TableCell>
                    <TableCell className={classes.headCell}>Receiver ID</TableCell>
                    <TableCell className={classes.headCell}></TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {requests.map(request => {
                    return <TableRow key={request.id}>
                        <TableCell className={classes.cell}>{request.id}</TableCell>
                        <TableCell className={classes.cell}>{request.status}</TableCell>
                        <TableCell className={classes.cell}>{request.submissionDate.split('T')[0]}</TableCell>
                        <TableCell className={classes.cell}>{request.type}</TableCell>
                        <TableCell className={classes.cell}>{request.sender}</TableCell>
                        <TableCell className={classes.cell}>{request.receiver}</TableCell>
                        <TableCell className={classes.cell}><Button variant='outlined' color='primary' onClick={()=>{handleClick(request.id)}}>Cancel Request</Button></TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
};

export default SentRequestsBody;
