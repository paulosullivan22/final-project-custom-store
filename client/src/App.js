import React from 'react';
import { Switch, Route } from "react-router-dom";

import './App.css';

import Navbar from './components/Navbar'
import UserHomePage from './containers/UserHomePage';
// import PersonalStore from '../containers/PersonalStore';
import MainStore from './containers/MainStore';
import Wishlist from './containers/Wishlist';
import Login from './containers/Login';
import Signup from './containers/Signup';
import test from './components/test'
import Protected from './components/Protected'
import Home from './containers/Home'
import FileUpload from './containers/FileUpload'

class App extends React.Component {
  state = {
    user: this.props.user
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
              component={test}
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
              component={Login}
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

          </Switch>


      </div>
    )
  }
}

export default App;
