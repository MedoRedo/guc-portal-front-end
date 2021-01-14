import React, {useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import {Redirect, useHistory, useLocation} from 'react-router-dom';

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
    let slots = [];
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].day === day && myArray[i].period === slot) {
            slots.push(myArray[i]);
        }
    }
    return slots;
}  

function slotText(slot){
//    console.log(slot);
    return slot.length == 0? 'Free' : slot.map(item => <div>{item.name + ' '+ item.location}</div>);
}



export default function TeachingAssignments(props){
    const classes = useStyles();

    const[assignments, setAssignments] = useState([]);
    const[ready, setReady] = useState(false);

    useEffect(async() => {
        await axios.get(`http://localhost:5000/HOD/viewTeachingAssignments/${props.match.params.id}`,{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }
        }).then(res =>{
            if(res.status == 200){
                console.log(res.data)
                setAssignments(res.data);
                setReady(true);
            }
        }
        )
    },[])

    const displayData = (schedule) => {
        let res = [];
        for (let day = 0; day < 6; day++) {
            let slots = [];
            for (let slot = 0; slot < 5; slot++) {
                
                let temp = search(day, slot, schedule);
                console.log(temp)
                slots[slot] = temp;
            }
            console.log(slots);
            res[day] = (
                    <TableRow className={classes.tableRow} key={day}>
                      <TableCell className={classes.headCell} component="th" scope="row" align='center'>{mapNumberToDay(day)}</TableCell>
                      <TableCell className={slots[0].length == 0? classes.freeCell : classes.bodyCell} align="center">{slotText(slots[0])}</TableCell>
                      <TableCell className={slots[1].length == 0? classes.freeCell : classes.bodyCell} align="center">{slotText(slots[1])}</TableCell>
                      <TableCell className={slots[2].length == 0? classes.freeCell : classes.bodyCell} align="center">{slotText(slots[2])}</TableCell>
                      <TableCell className={slots[3].length == 0? classes.freeCell : classes.bodyCell} align="center">{slotText(slots[3])}</TableCell>
                      <TableCell className={slots[4].length == 0? classes.freeCell : classes.bodyCell} align="center">{slotText(slots[4])}</TableCell>
                    </TableRow>
            );
        }
        return res
    }
    

    return (
        localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> : 
        ready &&
        <>
                <Card>
                    <CardHeader
                    title={props.match.params.id}
                    titleTypographyProps={{
                        variant:"h4"
                    }}
                    />
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
                    {displayData(assignments)}
                    </TableBody>
                </Table>
                </TableContainer>
                    <Divider />
                </Card>

        </>
    );
}