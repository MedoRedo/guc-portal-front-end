import React, { useState } from 'react';
import Login from '../GUCStaffMemberPages/Login';
import Profile from '../GUCStaffMemberPages/Profile';
import SentRequests from "../RequestsPages/SentRequests";
import SentRequestsBody from "../RequestsPages/SentRequestsBody";
import AddRequest from "../RequestsPages/AddRequest";
import Notifications from "../RequestsPages/Notifications";
import AllCourses from '../CommonCourses/Courses';
import InstructorCourseInfo from '../InstructorPages/CourseInfoPage'
import Course from "../HODPages/Course";
import ChangePassword from '../GUCStaffMemberPages/ChangePassword';
import { Route, Switch } from 'react-router-dom';
import NavBar from "./NavBar";
import ViewProfile from '../InstructorPages/ViewProfilePage';
import AssignCoordinator from '../InstructorPages/CoordinatorAssigningPage';
import InstructorSlots from '../InstructorPages/SlotsPage';
import SignInOut from '../GUCStaffMemberPages/SignInOut';
import Assign from "../HODPages/AssignInstructor";
import LocationOps from "../HRpages/LocationOps";
import facultyOps from "../HRpages/facultyops";
import DeptOps from "../HRpages/Deptops";
import CourseOps from "../HRpages/Courseops";
import MemberOps from "../HRpages/Staffops";
import AddLocation from "../HRpages/Add Location";
import AddFaculty from "../HRpages/Add Faculty";
import AddDept from "../HRpages/Add Department";
import AddCourse from "../HRpages/Add Course";
import AddMember from "../HRpages/AddMember";
import HRbuttons from "../HRpages/Buttons";
import UpadteProfile from '../GUCStaffMemberPages/UpdateProfile';
import Forbidden from './Forbidden';
import MissingDaysHours from '../GUCStaffMemberPages/MissingDaysHours';
import AttendanceForm from '../GUCStaffMemberPages/AttendanceForm';
import Attendance from '../GUCStaffMemberPages/Attendance';
import Schedule from '../GUCStaffMemberPages/Schedule'
import AssignSlot from '../InstructorPages/SlotAssigningPage';
import TeachingAssignments from "../HODPages/TeachingAssignments";
import DepartmentMembers from '../InstructorPages/DepartmentMembers';
import SlotLinkageRequests from '../CoordinatorPages/SlotLinkageRequests';
import AddSlot from '../CoordinatorPages/AddSlotPage';
import UpdateSlots from '../CoordinatorPages/UpdateSlotPage'

function Home() {

  const [visible, setVisible] = useState(true);
  const showNavBar = (show) => {
    setVisible(show);
  }
  return (
    <>
      {(visible && <NavBar/>)}
      <Switch>
       <Route path="/hrhome" component={HRbuttons} exact/>
       <Route path="/addLocation" component={AddLocation} exact/>
       <Route path="/addFaculty" component={AddFaculty} exact/>
       <Route path="/addDept" component={AddDept} exact/>
       <Route path="/addCourse" component={AddCourse} exact/>
       <Route path="/addMember" component={AddMember} exact/>

       <Route path="/locationOps" component={LocationOps} exact/>
       <Route path="/facultyOps" component={facultyOps} exact/>
       <Route path="/deptOps" component={DeptOps} exact/>
       <Route path="/courseOps" component={CourseOps} exact/>
       <Route path="/memberOps" component={MemberOps} exact/>

        <Route path="/login" component={Login} exact/>
        <Route path="/courses" component={AllCourses} exact/>
        <Route path="/courses/:id?" render={props => <Course {...props}/>} exact/>
        <Route path="/courses/:id?/assign" render={props => <Assign {...props}/>} exact/>
        <Route path="/courses/:id?/teacchingAssignments" render={props => <TeachingAssignments {...props}/>} exact/>
        <Route path="/requests" component={SentRequests} exact/>
        <Route path="/sentRequestsBody" render={props => <SentRequestsBody {...props}/>} exact/>
        <Route path="/addRequest" component={AddRequest} exact/>
        <Route path="/notifications" component={Notifications} exact/>
        <Route path="/changePassword" component={ChangePassword} exact/>
        <Route path="/courses/:id/instructor" component={InstructorCourseInfo} exact/>;
        <Route path="/profile/:id" component={ViewProfile} exact/>
        <Route path="/courses/:courseId/CoordinatorAssigning" component={AssignCoordinator} exact />
        <Route path="/courses/:courseId/slots" component={InstructorSlots} exact />
        <Route path="/courses/:courseId/slots/:slotId" component={AssignSlot} exact/>
        <Route path="/instructor/department" component={DepartmentMembers} exact/>
        <Route path="/courses/:courseId/co-ordinator" component={SlotLinkageRequests} exact/>
        <Route path="/courses/:courseId/co-ordinator/SlotAdding" component={AddSlot} exact/>
        <Route path='/courses/:courseId/co-ordinator/SlotEditing' component={UpdateSlots} exact/>
        <Route path="/signin" component={SignInOut} exact/>
        <Route path="/signout" component={SignInOut} exact/>
        <Route path="/updateProfile" component={UpadteProfile} exact/>
        <Route path="/missingDays" component={MissingDaysHours} exact/>
        <Route path="/attendanceForm" component={AttendanceForm} exact/>
        <Route path="/attendance" component={Attendance} exact/>
        <Route path="/schedule" component={Schedule}/>
        <Route path="/" component={Profile} exact/>
        <Route render={() => (<Forbidden showNavBar={showNavBar}/>)}/>
      </Switch>
    </>
  );
}

export default Home;
