import React, {useState, useEffect} from 'react';
import {Tab, Tabs, AppBar, Toolbar} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Logout from "../GUCStaffMemberPages/Logout";


import {
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
  

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    tabs: {
        flexGrow: 1,
        alignSelf: 'flex-end',
    },
}));

const NavBar = (props) =>{
    let history = useHistory();
    let location = useLocation();
    const tabNameToIndex = {
        0: "profile",
        1: "courses",
        2: "requests"
    };
  

    const indexToTabName = {
        profile: 0,
        courses: 1,
        requests: 2
    }

    const classes = useStyles();

    const [selectedTab, setSelectedTab] = useState(0);
    
    const handleChange = (event, newValue) => {
        console.log(newValue);
        setSelectedTab(newValue);
        history.push(`/${tabNameToIndex[newValue]}`);
    };
    
  
    useEffect(()=>{
        let path = location.pathname === '/'?'/profile':location.pathname; 
        if(indexToTabName[path.slice(1)] === undefined)
            return;

        console.log(indexToTabName[path.slice(1)])
        setSelectedTab(indexToTabName[path.slice(1)]);
    })
    return(
        localStorage.getItem('auth_token') === null ? <Redirect to="/login"/> :
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <Tabs className={classes.tabs} value={selectedTab} onChange={handleChange}>
                        <Tab icon={<AccountCircle/>}/>
                        <Tab label="Courses" />
                        <Tab label="Requests"/>
                    </Tabs>
                    <IconButton aria-label="show 17 new notifications" color="inherit" style={{marginRight: '5px'}}>
                        <Badge badgeContent={17} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Logout/>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;