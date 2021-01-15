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
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

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
const mapNumberToDay = (num) => {
    switch(num) {
      case -1 : return "";  
      case 0 : return "Sunday";
      case 1 : return "Monday";
      case 2 : return "Tuesday";
      case 3 : return "Wednesday";
      case 4 : return "Thursday";
      case 5 : return "Friday";
      case 6 : return "Saturday";
    }
  }
const mapfromDaytoNum = (day)=>{
    day=day.toLowerCase();
    switch(day){  
        case "sunday" : return 0;
        case "monday" : return 1;
        case "tuesday" : return 2;
        case "wednesday" : return 3;
        case "thursday" : return 4;
        case "friday" : return 5;
        case "saturday" : return 6;
    }
}
const UpdateSlots = (props) =>{
    let courseId = useParams();
    const classes = useStyles();
    const history = useHistory();
    const [slots,setSlots] = useState([]);
    const [day,setDay] = useState("");
    const [period,setPeriod]=useState("");
    const [location,setLocation]=useState("");
    const [type,setType] = useState("");
    const [id,setId] =useState("");
    const [isValid,setIsValid]=useState(0);
    const [auth,setAuth]=useState(0);
    const handleDay = (event)=>{
        setDay(event.target.value);
    }
    const handleClick = (elem)=>{
        axios.get(`http://localhost:5000/courses/${courseId.courseId}/slot-info/${elem}`,{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }}).then((res)=>{
                console.log(res.data);
                setDay(mapNumberToDay(res.data.slotInfo.day));
                setLocation(res.data.slotInfo.location);
                setType(res.data.slotInfo.slotType);
                setPeriod(res.data.slotInfo.period);
                setId(elem);

            }).catch((err)=>{
                console.log(err);


            }).catch((error)=>{
                console.log(error);
                console.log('error occured');
            });
    }
    const handleUpdate = ()=>{
        console.log('I entered event');
        if(day.toLowerCase()!=='monday'&&day.toLowerCase()!=='tuesday'&&day.toLowerCase()!=='wednesday'&&day.toLowerCase()!=='friday'&&
        day.toLowerCase()!=='saturday'&&day.toLowerCase()!=='sunday'&&day.toLowerCase()!=='thursday'){
            console.log('did exit event');
            setIsValid(-1);
            return;
        }
         axios.post(`http://localhost:5000/courses/${courseId.courseId}/slot/update`, {
            slot:id,
            day:mapfromDaytoNum(day.toLowerCase()),
            period:period,
            location:location,
            slotType:type,
            },{
              headers : {
                auth_token : localStorage.getItem('auth_token')
              }
            }).then((res)=>{
                console.log('accepted');
                console.log(res);
                setIsValid(1);
                setTimeout(()=>{
                    setIsValid(0)
                },4000);

            }).catch((err)=>{
                console.log(err);
                setIsValid(-1);
            })
    }
      
    const handlePeriod = (event)=>{
      setPeriod(event.target.value);
    }
    const handleLocation = (event)=>{
      setLocation(event.target.value);
    }
    const handleType = (event)=>{
      setType(event.target.value);
    }
    const handleDelete =()=>{
        axios.delete(`http://localhost:5000/courses/${courseId.courseId}/slot/delete`,{
            data:{slot:id},
            headers:{auth_token : localStorage.getItem('auth_token')}
        }).then((res)=>{
            axios.get(`http://localhost:5000/courses/${courseId.courseId}/all-slots`,{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }}).then((res)=>{
                setSlots(res.data.slots);
                setDay("");
                setPeriod("");
                setType("");
                setLocation("");
                setIsValid(1);
                setTimeout(()=>{
                    setIsValid(0)
                },4000);

            }).catch((err)=>{
                console.log(err);
            });
        })
    }
    useEffect(()=>{
        console.log('here');
        axios.get(`http://localhost:5000/isCoordinator/${courseId.courseId}`,{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }}).then((res)=>{
                console.log('i am here');
                if(res.data.isCoordinator){
                    setAuth(1);
                    axios.get(`http://localhost:5000/courses/${courseId.courseId}/all-slots`,{
                    headers : {
                    auth_token : localStorage.getItem('auth_token')
                    }}).then((res)=>{
                    console.log(res.data);
                    setSlots(res.data.slots);

            }).catch((err)=>{
                console.log(err);


            });
                }
                else{
                    setAuth(-1);
                }
            }).catch((err)=>{
                console.log(err);
            })
         
        
    },[ ]);
    const alert=()=>{
        return isValid === 1? <Alert>Change Done Successfully!</Alert>:isValid===0?null:
        <Alert severity="error">An error occured</Alert>
    }
    const form = ()=>{ 
         return (<Grid className={classes.Grid} item xs={12} md={6}>
                <Container component="main" maxWidth="xs">
	  <CssBaseline />
	  <div className={classes.paper}>
      <Typography component="h1" variant="h5">
      Updating a Slot
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          name="Day"
          label="Day"
          type="text"
          id="day"
          value={day} 
          onChange={handleDay}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          name="Period"
          label="Period"
          type="text"
          id="period"
          value={period} 
          onChange={handlePeriod}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          name="Location"
          label="Location"
          type="text"
          id="confirmPassword"
          value={location} 
          onChange={handleLocation}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          name="Slot type"
          label="Slot type"
          type="text"
          id="Slot type"
          value={type} 
          onChange={handleType}
        />
        {alert()}
        <Button variant='contained' color='primary' onClick={()=>{handleUpdate()}}>Update</Button>
         <Button variant='contained' color='secondary' onClick={()=>handleDelete()}>Delete</Button>
              </form>
	  </div>
	</Container>      
        </Grid>)}

    return (localStorage.getItem('auth_token') === null ? <Redirect to="/login"/>:auth===0?null:auth===-1?<Redirect to='/forbidden/'/>:
     <Card className={classes.card}>

        <Grid className={classes.Grid} container direction="row" justify="center"  spacing={3}>
            <Grid className={classes.Grid} item xs={12} md={6}>
                <TableContainer className={classes.container}>
                    <Table className={classes.table} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableCell}>
                                <Typography variant='h6' component='h4' color='textPrimary'>Slots</Typography>

                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {slots.map((elem)=> {
                               return( <TableRow key={elem}>
                                    <TableCell className={classes.tableCell}>
                                        <Button color='primary' onClick={()=>{handleClick(elem)}}>{elem}</Button>
                                    </TableCell>
                                </TableRow>)

                            })}
                        </TableBody>
                    </Table>                
                </TableContainer>
            </Grid>
            {form()}
        </Grid>
    </Card> );
}
export default UpdateSlots;