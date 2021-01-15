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
  cell :{textAlign:'center', padding: theme.spacing(2),},
  button: {margin: '5px'}
}));

// const requests = [{id: 1, status: 'Pending', submissionDate: '25/5/2020', type: 'Replacement', receiver: '1234'}, {id: 2, status: 'Accepted', submissionDate: '26/5/2020', type: 'Slot linking', receiver: '4321'}]

const Notifications = (props) => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(async () => {
    try{
        // console.log(status + 'hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
        const user = await axios.get('https://gucportalguc.herokuapp.com/notifications', {
            headers : {
              'auth_token' : localStorage.getItem('auth_token')
            }
          });
          console.log(user.data.notifications);
          setNotifications(user.data.notifications);
          setReady(true);
    }catch(e){
        console.log(e)
    }
  }, []);

  const handleClick = async (id) => {
    
  }

  return (
    localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> : 
    ready &&
    <>
        <Typography component="h2" variant="h6" color="primary" className={classes.title} align='center'>
            Notifications
        </Typography>
        <TableContainer className={classes.tableContainer} component={Paper}>
        <Table size="small" aria-label="a dense table">
            <TableBody>
                {notifications.map(notification => {
                    return <TableRow key={notification}>
                        <TableCell className={classes.cell} align="left">{notification}</TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
        </TableContainer>
    </>
  );
};

export default Notifications;
