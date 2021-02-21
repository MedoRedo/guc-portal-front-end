import React, {useState, useEffect} from 'react';
import {Tab, Tabs, AppBar, Toolbar} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
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
        0: "",
        1: "courses",
        2: "requests",
        3: "department",
        4: "HR"
    };
  

    const indexToTabName = {
        profile: 0,
        courses: 1,
        requests: 2,
        department : 3,
        HR : 4
    }

    const classes = useStyles();

    const [selectedTab, setSelectedTab] = useState(0);
    
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
        const url = newValue === 3 ? "instructor/department" : tabNameToIndex[newValue]; 
        history.push(`/${url}`);
    };
    
    let path = location.pathname === '/'?'/profile':location.pathname; 
  
    useEffect(()=>{
        if(indexToTabName[path.slice(1)] === undefined)
            return;
        setSelectedTab(indexToTabName[path.slice(1)]);
    }, [path]);


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
                        <Tab label="Department"/>
                        {localStorage.getItem('userId').charAt(0) === 'h' && <Tab label="HR"/>}
                    </Tabs>
                    <IconButton color="inherit" style={{marginRight: '5px'}} onClick={()=>{history.push('/notifications')}}>
                        <Badge color="secondary">
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