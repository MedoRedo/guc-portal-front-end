import React from 'react';
import InstructorCourses from '../InstructorPages/CoursesPage';
import  DepartmentCourses from "../HODPages/DepartmentCourses";
import CoordinatorCourses from '../CoordinatorPages/CoordinatorCourses';
const AllCourses = (props)=>{
    return (<>
        <DepartmentCourses/>
        <InstructorCourses/>
        <CoordinatorCourses/>

    </>)
}
export default AllCourses;