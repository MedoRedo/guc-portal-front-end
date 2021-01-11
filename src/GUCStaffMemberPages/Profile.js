import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import ProfileBody from './ProfileBody';



const useStyles = makeStyles((theme) => ({
  body : {
    padding : '1%'
  }
}));


function Profile(props) {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item container xs={12} md={8} direction="column" alignItems="stretch" className={classes.body}>
        <ProfileBody/>
      </Grid>
    </Grid>
  );

}


export default Profile;