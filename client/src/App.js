import React from 'react';
import { Switch, Route } from "react-router-dom";

import './stylesheets/App.scss';

// Components
import Navbar from './components/Navbar'
import Protected from './components/Protected'

// Homepages
import Home from './containers/Homepages/Home'
import UserHomepage from './containers/Homepages/UserHomepage';

// Store Containers
import MainStore from './containers/Store/MainStore';
import Wishlist from './containers/Store/Wishlist';

// Login Containers
import Login from './containers/Login/Login';
import FacialLogin from './containers/Login/FacialLogin';
import LocalLogin from './containers/Login/LocalLogin';

// Signup Containers
import Signup from './containers/Signup/Signup';
import FacialSignup from './containers/Signup/FacialSignup';
import LocalSignup from './containers/Signup/LocalSignup';


class App extends React.Component {
  state = {
    user: this.props.user,
  }

  setUser = user => {
    console.log(user)
    this.setState({
      user: user
    })
  }

  render() {
    return (
      
          <div>

              <Navbar setUser={this.setUser} user={this.state.user} /> 

              <Switch>

                {/* Homepage Routes */}

                <Route 
                  exact 
                  path='/'
                  component={Home}
                  user={this.state.user}
                  />


                <Protected
                  exact
                  path="/user"
                  redirectPath="/login"
                  user={this.state.user}
                  component={UserHomepage}
                  />


                {/* Store Routes */}

                <Protected
                  exact
                  path="/store"
                  redirectPath="/login"
                  setUser={this.setUser}
                  user={this.state.user}
                  component={MainStore}
                  />
                
                <Protected
                  exact
                  path="/wishlist"
                  redirectPath="/login"
                  setUser={this.setUser}
                  user={this.state.user}
                  component={Wishlist}
                  />


                {/* Login Routes */}

                <Protected
                  exact
                  path='/login'
                  redirectPath='/user'
                  setUser={this.setUser}
                  user={!this.state.user}
                  component={Login}
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
                  path='/emaillogin/:id'
                  component={LocalLogin}
                  setUser={this.setUser}
                  user={!this.state.user}
                  />


                {/* Signup Routes */}

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
                  path='/localsignup'
                  component={LocalSignup}
                  setUser={this.setUser}
                  user={!this.state.user}
                  />

                <Protected
                  exact
                  path='/facialsignup'
                  component={FacialSignup}
                  setUser={this.setUser}
                  user={!this.state.user}
                  />


                {/* Logout Route */}

                <Protected 
                  exact 
                  path='/logout'
                  component={Home}
                  />

              </Switch>

          </div>
    )
  }
}

export default App;