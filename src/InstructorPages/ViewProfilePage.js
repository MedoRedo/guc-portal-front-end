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
  name : ""
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

const ProfileBody = ({ className, staticContext,...rest }) => {
  const memberId = useParams();
  const classes = useStyles();
  const [values, setValues] = useState({
    id:"",
    email:"",
    name:"",
    gender:"",
    dayOff: -1,
    officeLoc: "",
    department : ""
  });
  const [valid,setValid] = useState(0);
  useEffect(()=>{
         axios.get(`http://localhost:5000/instructors/staff-members/${memberId.id}`,{headers : {
            auth_token : localStorage.getItem('auth_token')
          }}).then((res)=>{
              setValues({id:memberId.id,name:res.data.memberName,email:res.data.memberEmail,gender:res.data.memberGender,
                dayOff:res.data.memberDayoff,officeLoc:res.data.memberOfficeLoc,department:res.data.memberDepartment
            });
            setValid(1);
          }).catch((err)=>{
            console.log(err);
            setValid(-1);
          })
  })
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
      staticContext
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Faculty of Media Engineering and Technology"
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
