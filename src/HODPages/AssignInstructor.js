import React,{ useState, useEffect} from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow, makeStyles, Button} from "@material-ui/core";
import { useHistory } from "react-router-dom";
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
    let history = useHistory();

    useEffect(()=>{
        axios.get('http://localhost:5000/HOD/viewStaff', {
            headers : {
                auth_token : localStorage.getItem('auth_token')
            }  
        }).then((res)=>{
            setInstructors(res.data)            
        })
    },[])

    const handleClick = (id) => {
        axios.post('http://localhost:5000/HOD/assignInstructor', {courseId: props.match.params.id,
            instructorId: id}
            ,{
            headers : {
                auth_token : localStorage.getItem('auth_token')
            }
        }).then(()=>{
            history.goBack();
        })
    }

    return <>
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

}