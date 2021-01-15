import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import avatar from '../static/images/avatar/1.jpg';
import {Link} from 'react-router-dom';
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

const displayed = {
  id : "",
  email : "",
  gender : "",
  salary : "",
  officeLoc : "",
  leaves : "",
  department : "",
  dayOff : ""
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

function ProfileBody(props) {
  const classes = useStyles();
  const displayData = (profile) => {
    let res = [];
    for(const elem of Object.keys(displayed)) {
      const label = elem.charAt(0) === 'o' ? "OFFICE LOCATION" : elem.toUpperCase();
      let value = profile[elem] === undefined ? " " : (elem === "dayOff" ? mapNumberToDay(profile[elem]) : profile[elem]);
      if(elem === 'department' && localStorage.getItem('userId').charAt(0) === 'h')
        value = "Human Resources";
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
          value={value}
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
      className={clsx(classes.root, props.className)}
    >
      <Card>
        <CardHeader
          subheader={localStorage.getItem('userId').charAt(0) === 'h' ? "Human Resources" : `Faculty of ${props.values.faculty}`}
          title={props.values.name}
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
            {displayData(props.values)}
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
          {
            localStorage.getItem('userId').charAt(0) === 'a' &&
            <Link to="/schedule" className={classes.link}>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Schedule
              </Button>
            </Link>
          }
          <Link to="/attendanceForm" className={classes.link}>
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
