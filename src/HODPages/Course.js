import axios from "axios";
import React,{useEffect, useState} from "react";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import {Redirect, useHistory, useLocation} from 'react-router-dom';



const useStyles = makeStyles((theme) =>(
    {
        root: {
        display: 'block'
        },
        title: {
        fontSize: 14,
        },
        table: {margin: 'auto'},
        cell: {textAlign:'center'},
        button: {margin: '5px'}
    })
);

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default function Course(props) {
    const classes = useStyles();

    const[course, setCourse] = useState({});
    const[TAs, setTAs] = useState([]);
    const[instructors, setInstructors] = useState([]);
    const[ready, setReady] = useState(false);

    const handleClickAssign = () => {
        const { location, history } = props;
        history.push(`${location.pathname}/assign`)
    }

    const handleClickDelete = async(id) => {
        const response = await axios.delete('http://localhost:5000/HOD/deleteInstructor',{
            headers : {
                auth_token : localStorage.getItem('auth_token')
            },
            data: {courseId: course.id, instructorId: id}
        });
        if(response.status == 200){
            setInstructors(instructors.filter(instructor => instructor.id !== id));
        }
    }

    useEffect(()=> {
        axios.get(`http://localhost:5000/HOD/courses/${props.match.params.id}`,{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }
          })
        .then(res =>{
            if(res.data !== 'invalid data'){
                console.log(res.data);
                const data = res.data;
                setCourse({id: data.id, name: data.name});
                setTAs(data.TAs);
                setInstructors(data.instructors);
                setReady(true);    
            }
        })
    }, [])

    return(
        localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> : 
        ready &&
    <>
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                {course.id}
                </Typography>
                <Typography variant="h5" component="h2">
                    {course.name}
                </Typography>
                <Button variant="outlined" color="primary" onClick={handleClickAssign}>Assign Instructor</Button>
            </CardContent>
            <CardContent>
                <Typography>Instructors</Typography>
                <Table size="small" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>ID</TableCell>
                            <TableCell className={classes.cell}>Name</TableCell>
                            <TableCell className={classes.cell}>E-mail</TableCell>
                            <TableCell className={classes.cell}>Day off</TableCell>                            
                            <TableCell className={classes.cell}></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {instructors.map(instructor => {
                            return <TableRow key={instructor.id}>
                                <TableCell className={classes.cell}>{instructor.id}</TableCell>
                                <TableCell className={classes.cell}>{instructor.name}</TableCell>
                                <TableCell className={classes.cell}>{instructor.email}</TableCell>
                                <TableCell className={classes.cell}>{days[instructor.dayOff]}</TableCell>
                                <TableCell className={classes.cell}>
                                    <Button className={classes.button} variant='outlined' color='secondary' onClick={() => handleClickDelete(instructor.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </CardContent>

            <CardContent>
                <Typography>TAs</Typography>
                <Table size="small" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.cell}>ID</TableCell>
                            <TableCell className={classes.cell}>Name</TableCell>
                            <TableCell className={classes.cell}>E-mail</TableCell>
                            <TableCell className={classes.cell}>Day off</TableCell>                            
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {TAs.map(TA => {
                            return <TableRow key={TA.id}>
                                <TableCell className={classes.cell}>{TA.id}</TableCell>
                                <TableCell className={classes.cell}>{TA.name}</TableCell>
                                <TableCell className={classes.cell}>{TA.email}</TableCell>
                                <TableCell className={classes.cell}>{days[TA.dayOff]}</TableCell>                            
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </CardContent>

        </Card>
    </>)
}