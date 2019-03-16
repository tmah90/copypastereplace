import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Create from "./pages/Create";
import Latest from "./pages/Latest";
import Popular from "./pages/Popular";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Nav from "./components/Nav"
import NoMatch from "./pages/NoMatch.js";

import axios from 'axios'



class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      color: null,
      icon: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
        })
        this.getPic(response.data.user.username)
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
        })
      }
    })
  }
  getPic(user) {
    axios.get('/user/icon',user).then(response => {
      this.setState({
        icon: response.data.icon,
        color: response.data.color
      })
      console.log(this.state.color, this.state.icon)
    })
  }

  render() {
    return (
      <Router>
        <div className="main-wrapper">
        <div className="nav-bg"></div>
      <div className="main-container">
        <Nav updateUser={this.updateUser} loggedIn={this.state.loggedIn} userName ={this.state.username} userIcon = {this.state.icon} userColor = {this.state.color} />
        <div className="spacer"></div>
        <Switch>
            <Route exact path="/" component={Latest} />
            <Route exact path="/latest" render={() => <Latest/>} />
            <Route exact path="/popular" component={Popular} />
            <Route exact path="/create" render={() => <Create userName={this.state.username} /> } />
            <Route exact path="/signin" render={() => <SignIn updateUser={this.updateUser} />} />
            <Route exact path="/signup" render={() => <SignUp/>} />
            <Route component={NoMatch} />
        </Switch>
  
      </div>
      </div>
      </Router>
  
  
  
    )
  }
}

export default App;
