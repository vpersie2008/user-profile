import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import DashBoard from './components/dashboard/DashBoard'
import PrivateRoute from './components/common/PrivateRoute'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import store from './store'
import { setCurrentUser, logoutUser } from './actions/authActions';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post'


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //Judge token is expire
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/profiles" component={Profiles} />
            <Route path="/profile/:handle" component={Profile} />
            <Switch>
              <PrivateRoute path="/dashboard" component={DashBoard} />
            </Switch>
            <Switch>
              <PrivateRoute path="/create-profile" component={CreateProfile} />
            </Switch>
            <Switch>
              <PrivateRoute path="/edit-profile" component={EditProfile} />
            </Switch>
            <Switch>
              <PrivateRoute path="/add-experience" component={AddExperience} />
            </Switch>
            <Switch>
              <PrivateRoute path="/add-education" component={AddEducation} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/feed" component={Posts} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
