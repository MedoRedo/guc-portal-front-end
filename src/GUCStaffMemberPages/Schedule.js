import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import avatar from '../static/images/avatar/1.jpg';
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
  }
}));

const mapNumberToDay = (num) => {
  switch(num) {
    case 0 : return "Saturday";
    case 1 : return "Sunday";
    case 2 : return "Monday";
    case 3 : return "Tuesday";
    case 4 : return "Wednesday";
    case 5 : return "Thursday";
    case 6 : return "Friday";
  }
}

function search(day, slot, myArray){
    // console.log(myArray[4].day === day, myArray[4].period === slot, slot)
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].day === day && myArray[i].period === slot) {
            return myArray[i];
        }
    }
}  

function slotText(slot){
    return slot === undefined ? 'Free' : slot.course + ',\n' + slot.location;
}

const Schedule = ({ className, ...rest }) => {
  const classes = useStyles();
  const [schedule, setSchedule] = useState([]);
  const [ready, setReady] = useState(false);
  const displayData = (schedule) => {
    let res = [];
    for (let day = 0; day < 6; day++) {
        let slots = [];
        for (let slot = 0; slot < 5; slot++) {
            
            let temp = search(day, slot, schedule);
            // console.log(temp)
            slots[slot] = temp;
        }
        // console.log(slots);
        res[day] = (
                <TableRow className={classes.tableRow} key={day}>
                  <TableCell className={classes.headCell} component="th" scope="row" align='center'>{mapNumberToDay(day)}</TableCell>
                  <TableCell className={slots[0] === undefined ? classes.freeCell : classes.bodyCell} align="center">{slotText(slots[0])}</TableCell>
                  <TableCell className={slots[1] === undefined ? classes.freeCell : classes.bodyCell} align="center">{slotText(slots[1])}</TableCell>
                  <TableCell className={slots[2] === undefined ? classes.freeCell : classes.bodyCell} align="center">{slotText(slots[2])}</TableCell>
                  <TableCell className={slots[3] === undefined ? classes.freeCell : classes.bodyCell} align="center">{slotText(slots[3])}</TableCell>
                  <TableCell className={slots[4] === undefined ? classes.freeCell : classes.bodyCell} align="center">{slotText(slots[4])}</TableCell>
                </TableRow>
        );
    }
    return res
  }

  useEffect(async () => {
    try{
    const user = await axios.get('http://localhost:5000/schedule', {
      headers : {
        'auth_token' : localStorage.getItem('auth_token')
      }
    });
    console.log(user.data.schedule);
    setSchedule(user.data.schedule);
    setReady(true);
    }catch(e){
        console.log(e)
    }
  }, []);

  return (
    localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> : 
    localStorage.getItem('userId').charAt(0) === 'h' ? 
    <Redirect to="/forbidden"/>:
    ready &&
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        {/* <CardHeader
          subheader="Faculty of Media Engineering and Technology"
          title={'ZIAX'}
          titleTypographyProps={{
            variant:"h4"
          }}
          subheaderTypographyProps={{
            variant:"h5"
          }}
          avatar={<Avatar alt="profile picture" src={avatar} style={{width:'5em', height:'5em'}}/>}
        /> */}
        <Divider />
        <TableContainer className={classes.tableContainer} component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell className={classes.headCell} align="center">First Period</TableCell>
            <TableCell className={classes.headCell} align="center">Second Period</TableCell>
            <TableCell className={classes.headCell} align="center">Third Period</TableCell>
            <TableCell className={classes.headCell} align="center">Fourth Period</TableCell>
            <TableCell className={classes.headCell} align="center">Fifth Period</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayData(schedule)}
        </TableBody>
      </Table>
    </TableContainer>
        <Divider />
      </Card>
    </form>
  );
};

Schedule.propTypes = {
  className: PropTypes.string
};

export default Schedule;
