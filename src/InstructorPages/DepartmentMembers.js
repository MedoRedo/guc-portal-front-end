import React, { useState,useEffect} from 'react';
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
    table:{marginTop:'1vh',margin:'auto',width:'70%'},
    tableCell:{textAlign:'center'},
    container:{marginTop:'3vh',margin:'auto',maxHeight:400},
    button:{margin:'0.5em',textAlign:'center'}
    // grid:{width:'100%'}
}));

const DepartmentMembers = (props) =>{
    const classes = useStyles();
    const history = useHistory();
    const [facultyName, setFacultyName] = useState("");
    const [valid,setValid] = useState(0);
    const [departmentName,setDepartmentName] = useState("");
    const [staff,setStaff] = useState([]);

    useEffect(()=>{
         axios.get('https://gucportalguc.herokuapp.com/instructor/department-information',{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }}).then((res)=>{
                setFacultyName(res.data.facultyName);
                setDepartmentName(res.data.departmentName);
                axios.get('https://gucportalguc.herokuapp.com/staff-members/department',{
                    headers : {
                      auth_token : localStorage.getItem('auth_token')
                    }}).then((response)=>{
                        console.log(response);
                        setStaff(response.data.staffMembers);
                        setValid(1);
                    });
            }).catch((err)=>{
                console.log(err);
                setValid(-1);
            });
        
    },[]);

    const visitProfile = (profileId)=>{
        history.push(`/profile/${profileId}`);
    }    
    return (localStorage.getItem('auth_token') === null ? <Redirect to="/login"/>:
    valid === -1?<Redirect to='/forbidden'/>:
    valid === 0?null:<>
     <Card className={classes.card}>

       
        <Typography variant='h4' component='h2' color='primary'>Faculty of {facultyName} </Typography>
        <Typography variant='h5' component='h3' color='textSecondary'>{departmentName} Department</Typography>
                <Box display='flex' justifyContent='center' alignItems='center'>
                <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCell}>
                                <Typography variant='h6' component='h4' color='textPrimary'>Staff Members</Typography>

                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {staff.map((elem)=> {
                               return( <TableRow key={elem.memberId}>
                                    <TableCell className={classes.tableCell}>
                                        <Button color='primary' onClick={()=>{visitProfile(elem.memberId)}}>{elem.memberName}</Button>
                                    </TableCell>
                                </TableRow>)

                            })}
                        </TableBody>
                    </Table>                
                </TableContainer>
                </Box>

    </Card> </>);
}
export default DepartmentMembers;