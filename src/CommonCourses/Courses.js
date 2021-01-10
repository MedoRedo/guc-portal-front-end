import React from 'react';
import InstructorCourses from '../InstructorPages/CoursesPage';
import  Courses from "../HODPages/Courses";
const AllCourses = (props)=>{
    return (<>
        <Courses/>
        <InstructorCourses/>


    </>)
}
export default AllCourses;