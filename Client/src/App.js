
import React, { Component } from 'react';
import {BrowserRouter as Router,Link,Switch,Route } from 'react-router-dom';
import Dashboard from './components/dashboard/home/Dashboard';
import UserProfile from './components/dashboard/profile/UserProfile';
import View from './components/dashboard/view/View'
import Upload from './components/dashboard/Upload/Upload';
import Communities from './components/dashboard/communities/Communities';
import Settings from './components/dashboard/settings/Settings';
import LoginAndRegisterPage from './components/loginandregister/LoginAndRegisterPage'
import SavedPosts from './components/dashboard/sidepannel/SavedPosts';
import YourPosts from './components/dashboard/sidepannel/YourPosts';
import axios from 'axios'

function App() {
  axios.defaults.baseURL = 'http://localhost:5000';
  console.log("com");
  return (
    <Router>
      <Switch>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/profile'>
          <UserProfile />
        </Route>
        {/* <Route path='/view/:post_id' component={View}> */}
        <Route path='/view/:post_id'>
          <View />
        </Route>
        <Route path='/upload'>
          <Upload />
        </Route>
        <Route path='/self/:status'>
          <YourPosts />
        </Route>
        <Route path='/saved/:status'>
          <SavedPosts />
        </Route>
        <Route path='/communities'>
          <Communities />
        </Route>
        <Route path='/settings'>
          <Settings />
        </Route>
        <Route path='/'>
          <LoginAndRegisterPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
