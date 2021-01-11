import axios from "axios";
import React,{useEffect, useState} from "react";



export default function Course(props) {
    const[course, setCourse] = useState();
    useEffect(()=> {
        axios.get(`http://localhost:5000/HOD/courses/${props.match.params.id}`,{
            headers : {
              auth_token : localStorage.getItem('auth_token')
            }//, params: {page: props.match.params.id}
          })
        .then(res =>{
            // console.log(res.data);
            setCourse(res.data)
        })
    }, [])
//    console.log(course.numSlots);
    return(<div>{course !== undefined && course.mainDepartment}</div>)
}