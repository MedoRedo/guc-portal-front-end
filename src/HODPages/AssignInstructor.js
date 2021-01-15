import React,{ useState, useEffect} from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow, makeStyles, Button} from "@material-ui/core";
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


export default function Assign(props) {
    const classes = useStyles();
    const[instructors, setInstructors] = useState([]);
    const[ready, setReady] = useState(false);
    let history = useHistory();

    useEffect(()=>{
        axios.get('https://gucportalguc.herokuapp.com/HOD/viewStaff', {
            headers : {
                auth_token : localStorage.getItem('auth_token')
            }  
        }).then((res)=>{
            if(res.status == 200){
                setInstructors(res.data);            
                setReady(true);
            }
        })
    },[])

    const handleClick = (id) => {
        axios.post('https://gucportalguc.herokuapp.com/HOD/assignInstructor', {courseId: props.match.params.id,
            instructorId: id}
            ,{
            headers : {
                auth_token : localStorage.getItem('auth_token')
            }
        }).then(()=>{
            history.goBack();
        })
    }

    return(
        localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> : 
        ready &&
    
     <>
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
                            <Button className={classes.button} variant='contained' color='primary' onClick={() => handleClick(instructor.id)}>Assign</Button>
                        </TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>

    </>
    );
}