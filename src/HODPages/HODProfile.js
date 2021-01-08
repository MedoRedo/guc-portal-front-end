import React, {useState} from 'react';
import {Tab, Tabs, AppBar, Toolbar} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Courses from './Courses.js'
import Requests from './Requests.js'
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    BrowserRouter as Router,
    Switch,
    Route,
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

const Profile = (props) =>{
    const { match, history } = props;
    const { params } = match;
    const { page } = params;

    const tabNameToIndex = {
        0: "profile",
        1: "courses",
        2: "requests"
    };
  
    const indexToTabName = {
        profile: 0,
        courses: 1,
        requests: 2
    };

    const classes = useStyles();

    const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
    
    const handleChange = (event, newValue) => {
        history.push(`/${tabNameToIndex[newValue]}`);
        console.log(newValue);
        setSelectedTab(newValue);
    };
  
    return(
        <Router>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <Tabs className={classes.tabs} value={selectedTab} onChange={handleChange}>
                            <Tab icon={<AccountCircle/>}/>
                            <Tab label="Courses" />
                            <Tab label="Requests"/>
                        </Tabs>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Button variant="contained" color="secondary">logout</Button>
                    </Toolbar>
                </AppBar>
                <Switch>
                    {/* <Route exact path="/profile">
                        <Profile {...props}/>
                    </Route> */}
                    <Route path="/courses">
                        <Courses/>
                    </Route>
                    <Route path="/requests">
                        <Requests/>
                    </Route>
                </Switch>
                {/* {selectedTab === 1 && <Courses/>}
                {selectedTab === 2 && <Requests/>}
                {selectedTab === 0 && <h1>{console.log(props)}</h1>} */}
            </div>
        </Router>
    );
}

export default Profile;