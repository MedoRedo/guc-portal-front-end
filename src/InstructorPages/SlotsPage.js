import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Slot from './Slot';
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

    export default function InstructorSlots() {
    const classes = useStyles();
    const params = useParams();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [slotInfo,setSlotInfo] = useState([]);
    const[valid,setValid] = useState(0);
    const [unAssignedSlot,setUnAssignedSlot] = useState([]);
    useEffect(()=>{
        axios.get(`https://gucportalguc.herokuapp.com/courses/${params.courseId}/slots-assignment`,{headers : {
            auth_token : localStorage.getItem('auth_token')
            }}).then( 
            (res)=>{
                console.log(res);
                const info = res.data.slotsInformation;
                setSlotInfo(info);
                setValid(1);
            }
        ).catch((err)=>{
            console.log(err);
            setValid(-1);
        })
    },[]);
    useEffect(()=>{
        axios.get(`https://gucportalguc.herokuapp.com/instructors/courses/${params.courseId}/unassigned-slots`,{headers : {
            auth_token : localStorage.getItem('auth_token')
            }}).then( 
            (res)=>{
                console.log(res);
                const info = res.data.unAssignedSlots;
                setUnAssignedSlot(info);
            }
        ).catch((err)=>{
            console.log(err);
            setValid(-1);
            })
        },[]);
        const handleChange = (event, newValue) => {
            setValue(newValue);
            setSlotInfo(slotInfo);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
        setSlotInfo(slotInfo);
    };
    const updateUnAssigned= (data)=>{
        setUnAssignedSlot(data);
    }
    const updateAll = (data)=>{
        setSlotInfo(data);
    }
    return (localStorage.getItem('auth_token') === null ? <Redirect to="/login"/>:
    valid ===-1?<Redirect to='/forbidden'/>:valid===0?null:
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
            <Tab label="All Slots" {...a11yProps(0)} />
            <Tab label="UnAssigned Slots" {...a11yProps(1)} />
            </Tabs>
        </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction} className={classes.TabPanel}>
                <Grid container display='flex' alignItems='center'>
                {slotInfo.map((elem)=>{
                    return (<Grid item xs={12} md={6} key={elem.slotId}>
                        <Slot slotId={elem.slotId} day={elem.slotDay} period={elem.slotPeriod} slotType={elem.slotType} location={elem.slotLocation} updateView={setUnAssignedSlot} updateAll={updateAll} instructor={elem.instructor}/>
                    </Grid>)
                })}
            </Grid>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction} className={classes.TabPanel}>
            <Grid container display='flex' alignItems='center'>
                {unAssignedSlot.map((elem)=>{
                    return (<Grid item xs={12}  key={elem.slotId}>
                        <Slot slotId={elem.id} day={elem.day} period={elem.period} location={elem.location} slotType={elem.slotType} updateView={updateUnAssigned} instructor='Not Assigned yet'/>
                    </Grid>)
                })}
            </Grid>    
            </TabPanel>

        </div>
        </Box>
    );
}