import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import avatar from '../static/images/avatar/1.jpg';
import axios from 'axios';
import {Redirect, useHistory, useLocation} from 'react-router-dom';

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

const Schedule = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState();
  const displayData = (profile) => {
    let res = [];
    // for(const elem in profile) {
    //   if(notDisplayed[elem] === "")
    //     continue;
    //   const label = elem.charAt(0) === 'o' ? "OFFICE LOCATION" : elem.toUpperCase();
    //   res[res.length] = (
    //   <Grid
    //     item
    //     md={6}
    //     xs={12}
    //     key={elem}
    //   >
    //     <TextField
    //       fullWidth
    //       label={label}
    //       name={label.toLowerCase()}
    //       value={elem === "dayOff" ? mapNumberToDay(profile[elem]) : profile[elem]}
    //       variant="outlined"
    //       InputProps={{
    //         readOnly:true
    //       }}
    //     />
    //   </Grid>);
    // }
    // return res
  }

  return (
    localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> :
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Faculty of Media Engineering and Technology"
          title={'ZIAX'}
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
  );
};

Schedule.propTypes = {
  className: PropTypes.string
};

export default Schedule;
