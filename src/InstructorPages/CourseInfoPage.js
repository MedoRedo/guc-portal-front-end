import React, { useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useParams,useHistory,Redirect} from 'react-router-dom';
import axios from 'axios';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles((theme) => ({
    card:{width:'70%',marginTop:'5vh',margin:'auto',padding:'1em'},
    courseName:{textAlign:'left'},
    coverage:{textAlign:'right',justifyContent:'center'},
    table:{marginTop:'1vh',margin:'auto'},
    tableCell:{textAlign:'center'},
    container:{marginTop:'3vh',margin:'auto',maxHeight:400},
    button:{margin:'0.5em',textAlign:'center'}
    // grid:{width:'100%'}
}));

const InstructorCourseInfo = (props) =>{
    let courseId = useParams();
    const classes = useStyles();
    const history = useHistory();
    const [courseName, setcourseName] = useState("");
    const [validName,setValidName] = useState(0);
    const [validCoverage,setValidCoverage] = useState(0);
    const [validTables,setValidTables] = useState(0);
    useEffect(()=>{
         axios.get('http://localhost:5000/instructors/courses',{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }}).then((res)=>{
                const course = res.data.courses.filter((elem)=>{
                   return elem.courseId == courseId.id;
                });
                setValidName(1);
               setcourseName(course[0].courseName);
            }).catch((err)=>{
                console.log(err);
                setValidName(-1);

            });
        
    },[ ]);
    const [coverage,setCoverage] = useState('0%');
    useEffect(()=>{
        axios.get('http://localhost:5000/instructors/coverage',{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }}).then((res)=>{
                const coverage = res.data[`${courseId.id}`];
                setCoverage(coverage==null?'The course doesn\'t have slots yet!':`${coverage}%`);
                setValidCoverage(1);
            }).catch((err)=>{
                console.log(err);
                setValidCoverage(-1);
            })
    },[])
    const [tas,setTas] = useState([]);
    const [instructors,setInstructos] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:5000/instructors/courses/${courseId.id}/staff-members`,{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }}).then((res)=>{
                const courseInfo = res.data[`${courseId.id}`];
               setTas(courseInfo.TAsAssigned?courseInfo.TAs:[]);
               setValidTables(1);
               setInstructos(courseInfo.instructors);
            }).catch((err)=>{
                console.log(err);
                setValidTables(-1);
            })
    },[]);
    const visitProfile = (profileId)=>{
        history.push(`/profile/${profileId}`);
    }
    const goToSlots = ()=>{
        history.push(`/course/${courseId.id}/slots`);
    }
    const AssignCoordinator = ()=>{
        history.push(`/course/${courseId.id}/CoordinatorAssigning`);
    }
    const TAs = ()=>{ 
        if(tas.length!==0) return (<Grid className={classes.Grid} item xs={12} md={6}>
    <TableContainer className={classes.container} >
        <Table className={classes.table} stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                    <TableCell className={classes.tableCell}>
                    <Typography variant='h6' component='h4' color='textPrimary'>Teaching Assistants</Typography>

                    </TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {tas.map((elem)=> {
                    return (<TableRow key={elem.id}>
                        <TableCell className={classes.tableCell}>
                            <Button  color='primary' onClick={()=>{visitProfile(elem.id)}}>{elem.name}</Button>
                        </TableCell>
                    </TableRow>);

                })}
            </TableBody>
        </Table>                
    </TableContainer>
</Grid>)}

    return (localStorage.getItem('auth_token') === null ? <Redirect to="/login"/>:
    validCoverage ===-1||validTables===-1||validName===-1?<Redirect to='/forbidden'/>:
    validCoverage === 0||validTables===0||validName===0?null:<>
     <Card className={classes.card}>

       
        <Typography variant='h3' component='h2' color='primary'> {courseName} </Typography>
        <Typography variant='h4' component='h3' color='textSecondary'>Coverage : {coverage}</Typography>
        <Grid className={classes.Grid} container direction="row" justify="center"  spacing={3}>
            <Grid className={classes.Grid} item xs={12} md={6}>
                <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCell}>
                                <Typography variant='h6' component='h4' color='textPrimary'>Instructors</Typography>

                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {instructors.map((elem)=> {
                               return( <TableRow key={elem.id}>
                                    <TableCell className={classes.tableCell}>
                                        <Button color='primary' onClick={()=>{visitProfile(elem.id)}}>{elem.name}</Button>
                                    </TableCell>
                                </TableRow>)

                            })}
                        </TableBody>
                    </Table>                
                </TableContainer>
            </Grid>
            {TAs()}
        </Grid>
        <Box m={1} display='flex' flexDirection='column' alignItems='flex-start'>
            <Button className={classes.button} variant='contained' color='secondary' onClick={()=>{goToSlots()}}>Slots</Button>
            <Button className={classes.button} variant='contained' color='secondary' onClick={()=>{AssignCoordinator()}}>Assign Co-ordinator</Button>

        </Box>
    </Card> </>);
}
export default InstructorCourseInfo;