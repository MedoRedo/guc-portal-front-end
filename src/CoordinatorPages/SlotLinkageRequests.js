import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SlotRequest from './SlotRequest';
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { useParams,Redirect } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box>
            {children}
            </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '70%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'

    },
    Box:{margin:'1em'},
    TabPanel:{maxHeight:620,overflowY:'scroll'}
}));

    export default function SlotLinkageRequests() {
    const classes = useStyles();
    const params = useParams();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [pendRequest,setPendRequest] = useState([]);
    const[valid,setValid] = useState(0);
    const [nonPendRequest,setNonPendRequest] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:5000/coordinator/courses/${params.courseId}/non-pending-slot-linking-requests`,{headers : {
            auth_token : localStorage.getItem('auth_token')
            }}).then( 
            (res)=>{
                const info = res.data.slotRequests;
                console.log(info);
                setNonPendRequest(info);
                setValid(1);
            }
        ).catch((err)=>{
            console.log(err);
            setValid(-1);
        })
    },[]);
    useEffect(()=>{
        axios.get(`http://localhost:5000/coordinator/courses/${params.courseId}/slot-linking-requests`,{headers : {
            auth_token : localStorage.getItem('auth_token')
            }}).then( 
            (res)=>{
                setValid(1);
                const info = res.data.slotRequests;
                setPendRequest(info);
            }
        ).catch((err)=>{
            console.log(err);
            setValid(-1);
            })
        },[]);
        const handleChange = (event, newValue) => {
            setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    const updatePending= (data)=>{
        setPendRequest(data);
    }
    const updateAll = (data)=>{
        setNonPendRequest(data);
    }
    return (localStorage.getItem('auth_token') === null ? <Redirect to="/login"/>:valid===-1?<Redirect to="/forbidden"/>:valid===0? null:
        <Box display='flex' alignItems='center' justifyContent='center' className={classes.Box}>
        <div className={classes.root}>
        <AppBar position="static" color="default">
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            >
            <Tab label="Pending Requests" {...a11yProps(0)} />
            <Tab label="Non Pending Requests" {...a11yProps(1)} />
            </Tabs>
        </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction} className={classes.TabPanel}>
                <Grid container display='flex' alignItems='center'>
                {pendRequest.map((elem)=>{
                    console.log(new Date(elem.submissionDate).toDateString());
                    return (<Grid item xs={12} key={elem.slotId}>
                               <SlotRequest requestId={elem.requestId} memberName={elem.memberName} day={elem.slotDay}
                                period={elem.slotPeriod} location={elem.slotLocation} slotType={elem.slotType}
                                 status={elem.status} content={elem.content} submissionDate ={new Date(elem.submissionDate).toDateString()} updatePending={updatePending} updateNonPending={updateAll}/>
                            </Grid>)
                })}
            </Grid>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction} className={classes.TabPanel}>
            <Grid container display='flex' alignItems='center'>
                {nonPendRequest.map((elem)=>{
                    return (<Grid item xs={12}  key={elem.slotId}>
                        <SlotRequest requestId={elem.requestId} memberName={elem.memberName} day={elem.slotDay}
                                period={elem.slotPeriod} location={elem.slotLocation} slotType={elem.slotType}
                                 status={elem.status} content={elem.content} comment={elem.comment} submissionDate ={new Date(elem.submissionDate).toDateString()} updatePending={updatePending} updateNonPending={updateAll}/>
                    </Grid>)
                })}
            </Grid>    
            </TabPanel>

        </div>
        </Box>
    );
}