import React, {useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import {useHistory} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    title: {margin: '5px'},
    table: {margin: 'auto'},
    cell: {textAlign:'center'}
}));

const Courses = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        // console.log('componentDidMount');
        axios.get("http://localhost:5000/HOD/courses",{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }
          }).then(res => {
            console.log(res.data)
            setCourses(
                res.data
            );                    
        });        
    },[]);

    const handleClick = (id) => {
        history.push(`/courses/${id}`);
    }
    return(
        courses.length!=0&&<>
        <Typography component="h2" variant="h6" color="primary" className={classes.title} align='center'>
            Department Courses
        </Typography>
        <Table size="small" className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.cell}></TableCell>
                    <TableCell className={classes.cell}>Course ID</TableCell>
                    <TableCell className={classes.cell}>Course Name</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {courses.map(course => {
                    return <TableRow key={course.id}>
                        <TableCell className={classes.cell}><Button variant='outlined' color='primary' onClick={() => handleClick(course.id)}>View Course</Button></TableCell>
                        <TableCell className={classes.cell}>{course.id}</TableCell>
                        <TableCell className={classes.cell}>{course.name}</TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    </>
    ); 
}

export default Courses;