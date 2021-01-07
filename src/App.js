import React from 'react';
import Login from './GUCStaffMemberPages/Login';
import Profile from './GUCStaffMemberPages/Profile';
import { Route, Switch } from 'react-router-dom';

class App extends React.Component {

  state = {
    id : "",
  };

  handleId = (id) => {
    this.setState({id});
  }

  render() {
    return (
      <Switch>
        <Route path="/" render={() => {
          return <Login setUserId={this.handleId} userId={this.state.id}/>
        }} exact/>
        <Route path="/profile" render={() => {
          return <Profile setUserId={this.handleId} userId={this.state.id}/>
        }} exact/>
      </Switch>
    );
  }
}

export default App;
