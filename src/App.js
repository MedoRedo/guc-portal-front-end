import React from 'react';
import Login from './GUCStaffMemberPages/Login';
import Profile from './GUCStaffMemberPages/Profile';
import ChangePassword from './GUCStaffMemberPages/ChangePassword';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/" component={Login} exact/>
      <Route path="/profile" component={Profile} exact/>
      <Route path="/changePassword" component={ChangePassword} exact/>
    </Switch>
  );
}

export default App;
