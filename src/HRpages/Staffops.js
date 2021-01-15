
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {Redirect, useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function BasicTable() {
  let history = useHistory();
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(async () => {
    const LocationRes = axios.get("https://gucportalguc.herokuapp.com/getStaffMembers", {
      headers : {
        'auth_token' : localStorage.getItem('auth_token')
      }
    })
    
    Promise.all([LocationRes]).then((result) => {
      console.log(result);
      setRows(result[0].data);
      setReady(true);
    }).catch((e) => {
      console.log(e);
    })
  },[])

  const handleClickDelete = async(id) => {
    const response = await axios.delete(`https://gucportalguc.herokuapp.com/opStaffMemeber/${id}`,{
        headers : {
            auth_token : localStorage.getItem('auth_token')
        },
        data: {}
    });
}

const handleClickUpdate = async(id) => {
    const response = await axios.post(`https://gucportalguc.herokuapp.com/opStaffMemeber/${id}`,{
        headers : {
            auth_token : localStorage.getItem('auth_token')
        },
        data: {}
    });
}
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Staff ID</TableCell>
            <TableCell>email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>salary</TableCell>
            <TableCell>day Off</TableCell>
            <TableCell>Office Loc</TableCell>
            <TableCell>Leave Balance</TableCell>
            <TableCell>Dept</TableCell>
            <TableCell>Ops</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.salary}</TableCell>
              <TableCell align="left">{row.dayoff}</TableCell>
              <TableCell align="left">{row.officeLoc}</TableCell>
              <TableCell align="left">{row.leaveBalance}</TableCell>
              <TableCell align="left">{row.department}</TableCell>
              <TableCell><Button variant='outlined' color='primary' onClick={() => handleClickDelete(row.id)}> Delete Location</Button></TableCell>
              <TableCell><Button variant='outlined' color='primary' onClick={() => handleClickUpdate(row.id)}> Update Location</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
