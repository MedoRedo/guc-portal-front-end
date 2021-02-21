
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



// <Button variant='outlined' color='primary' onClick={() => handleClick(123)}> Delete Location</Button>

export default function BasicTable() {
  let history = useHistory();
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(async () => {
    const LocationRes = axios.get("https://gucportalguc.herokuapp.com/getLocations", {
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
    const response = await axios.delete(`https://gucportalguc.herokuapp.com/opLocation/${id}`,{
        headers : {
            auth_token : localStorage.getItem('auth_token')
        },
        data: {}
    });
}

const handleClickUpdate = async(id) => {
    const response = await axios.post(`https://gucportalguc.herokuapp.com/opLocation/${id}`,{
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
            <TableCell>Location Name</TableCell>
            <TableCell align="left">Capacity</TableCell>
            <TableCell align="left">Location Type</TableCell>
            <TableCell>Ops</TableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left"><Input defaultValue={row.name} inputProps={{ 'aria-label': 'description' }} /></TableCell>
              <TableCell align="left">{row.capacity}</TableCell>
              <TableCell align="left">{row.type}</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell><Button variant='outlined' color='primary' onClick={() => handleClickDelete(row.name)}> Delete Location</Button></TableCell>
              <TableCell><Button variant='outlined' color='primary' onClick={() => handleClickUpdate(row.name)}> Update Location</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}











// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
// }));

// export default function Inputs() {
//   const classes = useStyles();

//   return (
//     <form className={classes.root} noValidate autoComplete="off">
      
//       <Input placeholder="Placeholder" inputProps={{ 'aria-label': 'description' }} />
//       <Input defaultValue="Disabled" disabled inputProps={{ 'aria-label': 'description' }} />
//       <Input defaultValue="Error" error inputProps={{ 'aria-label': 'description' }} />
//     </form>
//   );
// }
