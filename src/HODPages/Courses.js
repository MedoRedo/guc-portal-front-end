import React, {useState, useEffect} from 'react'
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../components/CourseCard";
import axios from 'axios';

const useStyles = makeStyles({
    gridContainer: {
      paddingLeft: "40px",
      paddingRight: "40px"
    }
});

const Courses = (props) => {
    const classes = useStyles();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        // console.log('componentDidMount');
        axios.get("http://localhost:5000/HOD/courses",{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }
          }).then(res => {
            console.log(res.data)
            setCourses(
                res.data
            );                    
        });        
    },[])
    return(<Grid container
            spacing={4}
            className={classes.gridContainer}
            justify="center"
            >
            {courses.map(course =>{
                return  <Grid item xs={12} sm={6} md={4}>
                            <Card key={course.id} id= {course.id} name= {course.name}/>
                        </Grid>
                }
            )}    
            </Grid>
        ); 
}

export default Courses;