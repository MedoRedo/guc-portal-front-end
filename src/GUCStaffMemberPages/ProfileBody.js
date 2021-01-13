import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import avatar from '../static/images/avatar/1.jpg';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Avatar
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  button : {
    margin : theme.spacing(1)
  },
  link : {
    textDecoration : 'none'
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
    case 0 : return "Sunday";
    case 1 : return "Monday";
    case 2 : return "Tuesday";
    case 3 : return "Wednesday";
    case 4 : return "Thursday";
    case 5 : return "Friday";
    case 6 : return "Saturday";
  }
}

const ProfileBody = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    id:"ac-1",
    email:"zizo.1999@live.com",
    password:"12345",
    name:"Abdelaziz Adel",
    gender:"Male",
    salary:12345.23,
    dayOff: 6,
    officeLoc: "c6.201",
    leaves: 4,
    attendance:[],
    startDay: new Date(),
    loggedIn: true,
    notifications : [],
    firstLogin : false,
    department : "Computer Science"
  });
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

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
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
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          p={2}
        >
          <Link to="/updateProfile" className={classes.link}>
          <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Update Profile
            </Button>
          </Link>
          <Link to="/changePassword" className={classes.link}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Change Password
            </Button>
          </Link>
          <Link to="/schedule" className={classes.link}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Schedule
            </Button>
          </Link>
          <Link to="/attendance" className={classes.link}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Attendance
            </Button>
          </Link>
          <Link to="/missingDays" className={classes.link}>
            <Button
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Missing Days/Hours
              </Button>
          </Link>
          <Link to="/signin" className={classes.link}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Sign in
            </Button>
          </Link>
          <Link to="/signout" className={classes.link}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Sign out
            </Button>
          </Link>
        </Box>
      </Card>
    </form>
  );
};

ProfileBody.propTypes = {
  className: PropTypes.string
};

export default ProfileBody;
