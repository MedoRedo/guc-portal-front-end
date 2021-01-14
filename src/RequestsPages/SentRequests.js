import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Redirect, useHistory, useLocation, Link} from 'react-router-dom';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  tableContainer: {
    padding: theme.spacing(4)
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  headCell: {
    backgroundColor: '#D3D3D3',
    color: theme.palette.common.black,
    fontSize: 16,
    padding: theme.spacing(2),
    fontWeight: 'bold'
  },
  bodyCell: {
    fontSize: 14,
  },
  freeCell: {
      fontSize: 16,
      backgroundColor: '#228B22',
      fontWeight: 700
  },
  title: {
      margin: '5px', 
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      fontSize: 32,
      fontWeight: 'bold'
    },
  table: {margin: theme.spacing(4)},
  cell :{textAlign:'center', padding: theme.spacing(2),},
  button : {
    margin : theme.spacing(1)
  },
  link : {
    textDecoration : 'none'
  }
}));

const SentRequests = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> : 
    <>
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          p={2}
        >
          <Link to="/sentRequestsBody" className={classes.link}>
          <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Accepted Requests
            </Button>
          </Link>
          <Link to="/sentRequestsBody" className={classes.link}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Rejected Requests
            </Button>
          </Link>
          <Link to="/sentRequestsBody" className={classes.link}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Pending Requests
            </Button>
          </Link>
          <Link to="/addRequest" className={classes.link}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Submit Request
            </Button>
          </Link>
        </Box>
    </>
  );
};

SentRequests.propTypes = {
  className: PropTypes.string
};

export default SentRequests;
