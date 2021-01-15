import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import avatar from '../static/images/avatar/1.jpg';
import {Link,useParams,Redirect} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Avatar
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {},
  button : {
    margin : theme.spacing(1)
  },
  link : {
    textDecoration : 'none'
  },
  body : {
    padding : '3%'
  }
}));

const notDisplayed = {
  password: "",
  attendance : "",
  startDay : "",
  loggedIn : "",
  notifications : "",
  firstLogin : "",
  name : "",
  faculty:""
}

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

const ProfileBody = ({ className,staticContext, ...rest }) => {
  const memberId = useParams();
  const classes = useStyles();
  console.log({...rest});
  const [values, setValues] = useState({
    id:"",
    email:"",
    name:"",
    gender:"",
    dayOff: -1,
    officeLoc: "",
    department : "",
    faculty:""
  });
  const [valid,setValid] = useState(0);
  useEffect(()=>{
         const query1 = axios.get(`http://localhost:5000/instructors/staff-members/${memberId.id}`,{headers : {
            auth_token : localStorage.getItem('auth_token')
          }});
          const query2 = axios.get(`http://localhost:5000/staff-members/department/${memberId.id}`,{headers : {
            auth_token : localStorage.getItem('auth_token')
          }});
          Promise.allSettled([query1,query2]).then((res)=>{
            if(res[0].status==='fulfilled'){
              setValues({id:memberId.id,name:res[0].value.data.memberName,email:res[0].value.data.memberEmail,gender:res[0].value.data.memberGender,
                dayOff:res[0].value.data.memberDayoff,officeLoc:res[0].value.data.memberOfficeLoc,department:res[0].value.data.memberDepartment,faculty:res[0].value.data.memberFaculty
            });
            setValid(1);
          }
            else if(res[1].status==='fulfilled'){
              setValues({id:memberId.id,name:res[1].value.data.memberName,email:res[1].value.data.memberEmail,gender:res[1].value.data.memberGender,
                dayOff:res[1].value.data.memberDayoff,officeLoc:res[1].value.data.memberOfficeLoc,department:res[1].value.data.memberDepartment,faculty:res[1].value.data.memberFaculty
            });
            setValid(1);
            }else{
              setValid(-1);
            }
            }
          )
  },[])
  const displayData = (profile) => {
    let res = [];
    for(const elem in profile) {
      if(notDisplayed[elem] === "")
        continue;
      const label = elem.charAt(0) === 'o' ? "OFFICE LOCATION" : elem.toUpperCase();
      res[res.length] = (
      <Grid
        item
        md={6}
        xs={12}
        key={elem}
      >
        <TextField
          fullWidth
          label={label}
          name={label.toLowerCase()}
          value={elem === "dayOff" ? mapNumberToDay(profile[elem]) : profile[elem]}
          variant="outlined"
          InputProps={{
            readOnly:true
          }}
        />
      </Grid>);
    }
    return res
  }

  return (localStorage.getItem('auth_token') === null ? <Redirect to="/login"/>:valid===0?null:valid ===-1?<Redirect to='/forbidden'/>:
    <Grid container direction="column" alignItems="center" justify="center">
    <Grid item container xs={12} md={8} direction="column" justify="center" alignItems="center" className={classes.body}>
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader={`Faculty of ${values.faculty}`}
          title={values.name}
          titleTypographyProps={{
            variant:"h4"
          }}
          subheaderTypographyProps={{
            variant:"h5"
          }}
          avatar={<Avatar alt="profile picture" src={avatar} style={{width:'5em', height:'5em'}}/>}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            {displayData(values)}
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </form>
    </Grid>
    </Grid>
  );
};

ProfileBody.propTypes = {
  className: PropTypes.string
};

export default ProfileBody;
