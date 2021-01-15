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
import {useHistory} from 'react-router-dom';
import SlotRequest from './SlotRequest'
const useStyles = makeStyles((theme) => ({
    title: {margin: '5px'},
    table: {margin: 'auto'},
    cell :{textAlign:'center'}
}));

const CoordinatorCourses = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        // console.log('componentDidMount');
        axios.get("http://localhost:5000/coordinator/courses",{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }
          }).then(res => {
            console.log(res.data)
            setCourses(
                res.data.courses
            );                    
        });        
    },[]);

    const handleClick = (id) => {
        history.push(`courses/${id}/co-ordinator`);
    }
    return(courses.length!==0&&<>
        <Typography component="h2" variant="h6" color="primary" className={classes.title} align='center'>
            Co-ordinator Courses
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
                    return <TableRow key={course.courseId}>
                        <TableCell className={classes.cell}><Button variant='outlined' color='primary' onClick={() => handleClick(course.courseId)}>View Course</Button></TableCell>
                        <TableCell className={classes.cell}>{course.courseId}</TableCell>
                        <TableCell className={classes.cell}>{course.courseName}</TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
       
    </>
    ); 
}

export default CoordinatorCourses;