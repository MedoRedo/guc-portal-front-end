import React, { useState,useEffect } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CoordSnackbar from './CoordinatorSnackBar'
import axios from 'axios';
import { useParams,useHistory,Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    card:{width:'70%',marginTop:'5vh',margin:'auto',padding:'1em'},
    button:{marginTop:'2vh'},
    FormControl:{marginLeft:'2vh',fontSize:'1vh'},
    Typography:{margin:'2vh'},
    Label:{fontSize:'1.3em',padding:'1vh'},
    LabelTitle:{fontSize:'1.5em'}
    // grid:{width:'100%'}
}));

 const AssignCoordinator = ()=> {
  const params = useParams();
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [teachingAssistants,setTeachingAssistants] = useState([]);
  const [courseName, setCourseName] =useState("");
  const [valid,setValid] =useState(0);
  useEffect(()=>{
   const query1 = axios.get(`http://localhost:5000/instructors/courses/${params.courseId}/staff-members`,
    {headers:{auth_token:localStorage.getItem('auth_token')}});
    const query2 = axios.get(`http://localhost:5000/instructors/courses`, {headers:{auth_token:localStorage.getItem('auth_token')}});
    Promise.allSettled([query1,query2]).then((res)=>{
        if(res[0].status ==='rejected'||res[1].status ==='rejected'){
          setValid(-1);
        }
        else{
          setValid(1);
          console.log(res[0].value);
          if(res[0].value.data[`${params.courseId}`].TAsAssigned){
            setTeachingAssistants(res[0].value.data[`${params.courseId}`].TAs);
          }
          else{
            setTeachingAssistants(['Not Assigned']);
          }
          const course = res[1].value.data.courses.filter((elem)=>{
            return elem.courseId == params.courseId;
         });

        setCourseName(course[0].courseName);
        }
    });
  },[]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (localStorage.getItem('auth_token') === null ? <Redirect to="/login"/>:valid===0?null:valid ===-1?<Redirect to='/forbidden'/>:
      <Card className={classes.card}>
      <Typography className={classes.Typography} variant='h3' component='h2' color='primary'> {courseName} </Typography>
      <Typography className={classes.Typography} variant='h5' component='h3' color='textPrimary'> Please Choose a Course Co-ordinator! </Typography>
    <FormControl className={classes.FormControl} component="fieldset">
      <FormLabel component="legend"><Typography className={classes.LabelTitle}>Teaching Assistants</Typography></FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        {teachingAssistants.map((elem)=>{
            return (<FormControlLabel key={elem.id} value={elem.id} control={<Radio/>} onChange={handleChange} label={<Typography className={classes.Label}>{elem.name}</Typography>}/>);
        })}
        {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
      </RadioGroup>
      {/* <Button variant='contained' color='secondary' className={classes.button} onClick={()=>{handleSave()}}>Save</Button> */}
      <CoordSnackbar className={classes.button} memberId={value}/>
    </FormControl>
    </Card>
  );
}
export default AssignCoordinator;