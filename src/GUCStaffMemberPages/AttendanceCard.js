import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardHeader,
  CardContent,
  makeStyles
} from '@material-ui/core'; 

const useStyles = makeStyles((theme) => ({
  root: {
    width : "100%"
  }
}));

function AttendanceCard(props) {
  const classes = useStyles();

  const rows = (records) => {
    return records.map((record, idx) => {
      const signIn = record.signIn === undefined ? "Not Recorded" : new Date(record.signIn);
      const signOut = record.signOut === undefined ? "Not Recorded" : new Date(record.signOut);
      return(
      <TableRow key={idx}>
        <TableCell align="left">{signIn === "Not Recorded" ? signIn : `${signIn.getHours()} : ${signIn.getMinutes()}`}</TableCell>
        <TableCell align="center">{signOut === "Not Recorded" ? signOut : `${signOut.getHours()} : ${signOut.getMinutes()}`}</TableCell>
      </TableRow>);
    })
  }

  return (
    <Card>
      <CardHeader
        title={props.day}
        titleTypographyProps={
          {
            color : "primary"
          }
        }
      />
      <CardContent>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">SIGN IN</TableCell>
              <TableCell align="center">SIGN OUT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows(props.records)}
          </TableBody>
        </Table>
      </TableContainer>
      </CardContent>
    </Card>
  );
}

export default AttendanceCard;