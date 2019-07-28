import React from 'react';
import { Switch, Route } from "react-router-dom";

import './App.css';

import Navbar from './components/Navbar'
import UserHomePage from './containers/UserHomePage';
// import PersonalStore from '../containers/PersonalStore';
import MainStore from './containers/MainStore';
import Wishlist from './containers/Wishlist';
import Signup from './containers/Signup';
import Protected from './components/Protected'
import Home from './containers/Home'
import FileUpload from './containers/FileUpload'
import LoginHome from './containers/Logins/LoginHome'
import FacialLogin from './containers/Logins/FacialLogin'
import SocialLogin from './containers/Logins/SocialLogin'
import LocalLogin from './containers/Logins/LocalLogin'


class App extends React.Component {
  state = {
    user: this.props.user,
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }

  render() {
    console.log(this.state.user)
    return (
      <div>
          <Navbar setUser={this.setUser} user={this.state.user} /> 

          <Switch>

            <Route 
              exact 
              path='/'
              component={Home}
              />

            <Protected
              exact
              path='/signup'
              redirectPath='/user'
              setUser={this.setUser}
              user={!this.state.user}
              component={Signup}
              />

            <Protected
              exact
              path='/login'
              redirectPath='/user'
              setUser={this.setUser}
              user={!this.state.user}
              component={LoginHome}
              />

            <Protected
              exact
              path="/store"
              redirectPath="/login"
              user={this.state.user}
              component={MainStore}
              />

            <Protected
              exact
              path="/user"
              redirectPath="/login"
              user={this.state.user}
              component={UserHomePage}
              />
            
            <Protected
              exact
              path="/wishlist"
              redirectPath="/login"
              user={this.state.user}
              component={Wishlist}
              />

            {/* <Protected
              exact
              path="/personalstore"
              redirectPath="/login"
              user={this.state.user}
              component={PersonalStore}
              /> */}

            <Route 
              exact 
              path='/logout'
              component={Home}
              />

            <Route 
              exact 
              path='/fileupload'
              component={FileUpload}
              />

            <Route
              exact
              path='/faciallogin'
              component={FacialLogin}
              />

            <Route
              exact
              path='/sociallogin'
              component={SocialLogin}
              />

            <Route
              exact
              path='/emaillogin'
              component={LocalLogin}
              />

          </Switch>


      </div>
    )
  }
}

export default App;
