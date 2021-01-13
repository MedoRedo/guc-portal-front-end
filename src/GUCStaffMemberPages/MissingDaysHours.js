import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    makeStyles
} from '@material-ui/core'; 

const useStyles = makeStyles({
  body : {
    padding : '1%'
  },
  table : {
    width : '100%',
    marginBottom : "1%"
  }
});

export default function MissingDaysHours() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [hours, setHours] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(async () => {
      const daysRes = axios.get("http://localhost:5000/missingDays", {
        headers : {
          'auth_token' : localStorage.getItem('auth_token')
        }
      })
      const hoursRes = axios.get("http://localhost:5000/missingHours", {
        headers : {
          'auth_token' : localStorage.getItem('auth_token')
        }
      })
    Promise.all([daysRes, hoursRes]).then((result) => {
      console.log(result);
      setRows(result[0].data);
      setHours(result[1].data.missingHours);
      setReady(true);
    }).catch((e) => {
      console.log(e);
    })
  },[])
  const getHours = (val) => {
    val = Math.abs(val);
    const h = Math.floor(val);
    const m = Math.floor((val - h) * 60);
    return {h, m};
  }

  return (
    localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> :
    ready && (
    <Grid container direction="column" alignItems="center" className={classes.body}>
      <Grid item xs={12} md={6} className={classes.table}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Type</TableCell>
                <TableCell align="center">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={0}>
                <TableCell>Missing Hours</TableCell>
                <TableCell align="center">{hours > 0 ? `${getHours(hours).h} : ${getHours(hours).m}` : 0}</TableCell>
              </TableRow>
              <TableRow key={1}>
                <TableCell>Extra Hours</TableCell>
                <TableCell align="center">{hours < 0 ? `${getHours(hours).h} : ${getHours(hours).m}` : 0}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={6} className={classes.table}>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  {idx + 1}
                </TableCell>
                <TableCell align="center">{new Date(row).toDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </Grid>
    </Grid>
  ));
}