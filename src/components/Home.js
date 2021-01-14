import React, { useState } from 'react';
import Login from '../GUCStaffMemberPages/Login';
import Profile from '../GUCStaffMemberPages/Profile';
import SentRequests from "../RequestsPages/SentRequests";
import SentRequestsBody from "../RequestsPages/SentRequestsBody";
import AddRequest from "../RequestsPages/AddRequest";
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
import UpadteProfile from '../GUCStaffMemberPages/UpdateProfile';
import Forbidden from './Forbidden';
import MissingDaysHours from '../GUCStaffMemberPages/MissingDaysHours';
import AttendanceForm from '../GUCStaffMemberPages/AttendanceForm';
import Attendance from '../GUCStaffMemberPages/Attendance';
import Schedule from '../GUCStaffMemberPages/Schedule'
import AssignSlot from '../InstructorPages/SlotAssigningPage';
import TeachingAssignments from "../HODPages/TeachingAssignments";
function Home() {

  const [visible, setVisible] = useState(true);
  const showNavBar = (show) => {
    setVisible(show);
  }
  return (
    <>
      {(visible && <NavBar/>)}
      <Switch>
        <Route path="/login" component={Login} exact/>
        <Route path="/courses" component={AllCourses} exact/>
        <Route path="/courses/:id?" render={props => <Course {...props}/>} exact/>
        <Route path="/courses/:id?/assign" render={props => <Assign {...props}/>} exact/>
        <Route path="/courses/:id?/teacchingAssignments" render={props => <TeachingAssignments {...props}/>} exact/>
        <Route path="/requests" component={SentRequests} exact/>
        <Route path="/sentRequestsBody" render={props => <SentRequestsBody {...props}/>} exact/>
        <Route path="/addRequest" component={AddRequest} exact/>
        <Route path="/changePassword" component={ChangePassword} exact/>
        <Route path="/courses/:id/instructor" component={InstructorCourseInfo} exact/>;
        <Route path="/profile/:id" component={ViewProfile} exact/>
        <Route path="/courses/:courseId/CoordinatorAssigning" component={AssignCoordinator} exact />
        <Route path="/courses/:courseId/slots" component={InstructorSlots} exact />
        <Route path="/courses/:courseId/slots/:slotId" component={AssignSlot} exact/>
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
