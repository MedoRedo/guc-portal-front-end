import React from 'react';
import InstructorCourses from '../InstructorPages/CoursesPage';
import  DepartmentCourses from "../HODPages/DepartmentCourses";
const AllCourses = (props)=>{
    return (<>
        <DepartmentCourses/>
        <InstructorCourses/>
    </>)
}
export default AllCourses;