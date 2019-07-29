import React from 'react';
import { Switch, Route } from "react-router-dom";

import './stylesheets/App.scss';

import Navbar from './components/Navbar'
import UserHomePage from './containers/Homepages/UserHomePage';
// import PersonalStore from '../containers/PersonalStore';
import MainStore from './containers/Store/MainStore';
import Wishlist from './containers/Store/Wishlist';
import Signup from './containers/Signup/Signup';
import Protected from './components/Protected'
import Home from './containers/Homepages/Home'
import FileUpload from './containers/Signup/FileUpload'
import LoginHome from './containers/Login/LoginHome'
import FacialLogin from './containers/Login/FacialLogin'
import SocialLogin from './containers/Login/SocialLogin'
import LocalLogin from './containers/Login/LocalLogin'
import FacialSignup from './containers/Signup/FacialSignup';
import LocalSignup from './containers/Signup/LocalSignup'


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
    return (
      <div>

          <Navbar setUser={this.setUser} user={this.state.user} /> 

          <Switch>

            <Route 
              exact 
              path='/'
              component={Home}
              user={this.state.user}
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

            <Protected 
              exact 
              path='/logout'
              component={Home}
              />

            <Protected 
              exact 
              path='/fileupload'
              component={FileUpload}
              />

            <Protected
              exact
              path='/faciallogin/:id'
              component={FacialLogin}
              setUser={this.setUser}
              user={!this.state.user}
              />

            <Protected
              exact
              path='/sociallogin/:id'
              component={SocialLogin}
              setUser={this.setUser}
              user={!this.state.user}
              />

            <Protected
              exact
              path='/emaillogin/:id'
              component={LocalLogin}
              setUser={this.setUser}
              user={!this.state.user}
              />

            <Route
              exact
              path='/localsignup'
              component={LocalSignup}
              setUser={this.setUser}
              // user={!this.state.user}
              />

            <Protected
              exact
              path='/facialsignup'
              component={FacialSignup}
              setUser={this.setUser}
              user={!this.state.user}
              />

          </Switch>


      </div>
    )
  }
}

export default App;
