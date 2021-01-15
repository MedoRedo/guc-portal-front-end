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
import {Redirect, useHistory, useLocation} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    title: {margin: '5px'},
    table: {margin: 'auto'},
    cell: {textAlign:'center'}
}));

const Courses = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [courses, setCourses] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // console.log('componentDidMount');
        axios.get("http://localhost:5000/HOD/courses",{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }
          }).then(res => {
            console.log(res.data);
            if(res.data !== 'invalid data'){
                setCourses(res.data);
                setReady(true);
            }                    
        });        
    },[]);

    const handleClick = (id) => {
        history.push(`/courses/${id}`);
    }
    const handleTeachingAssignments = (id) => {
        history.push(`/courses/${id}/teacchingAssignments`);
    }
    return(
        localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> : 
        ready &&<>
        <Typography component="h2" variant="h6" color="primary" className={classes.title} align='center'>
            Department Courses
        </Typography>
        <Table size="small" className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.cell}></TableCell>
                    <TableCell className={classes.cell}>Course ID</TableCell>
                    <TableCell className={classes.cell}>Course Name</TableCell>
                    <TableCell className={classes.cell}>Course coverage</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {courses.map(course => {
                    return <TableRow key={course.courseId}>
                        <TableCell className={classes.cell}>
                            <Button variant='outlined' color='primary' onClick={() => handleClick(course.courseId)}>View Course</Button>
                            <Button variant='outlined' color='primary' onClick={() => handleTeachingAssignments(course.courseId)}>View Teaching assignments</Button>
                        </TableCell>
                        <TableCell className={classes.cell}>{course.courseId}</TableCell>
                        <TableCell className={classes.cell}>{course.name}</TableCell>
                        <TableCell className={classes.cell}>{course.coverage}</TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    </>
    ); 
}

export default Courses;