import React, { Component } from "react";
import { NavLink } from 'react-router-dom'

import axios from 'axios'


class Nav extends Component {
  constructor() {
    super()
    this.logout = this.logout.bind(this)
  }
  componentDidMount() {
    console.log("Nav Mounted")
  }

logout(event) {
    event.preventDefault()
    console.log('logging out')
    axios.post('/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null,
          color: null,
          icon: null
        })
      }
    }).catch(error => {
        console.log('Logout error')
    })
  }

  render() {
    const loggedIn = this.props.loggedIn;
    // console.log(this.props.userColor)
    // console.log(this.props);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <NavLink to="/latest" className="navbar-brand">Copy <span className="logo-strike">Paste </span><span className="logo-bold">Replace </span><i className="far fa-copy"></i></NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="w-100 order-1 order-md-0 dual-collapse2">
        <div className="navbar-collapse collapse" id="navbarNavDropdown">
        <ul className="navbar-nav mr-auto">
        <li className="nav-item">
            <NavLink to="/latest" className="nav-link">Latest</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/popular" className="nav-link">Popular</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/create" className="nav-link">Create</NavLink>
          </li>
          <li className="nav-item">
            <hr/>
          </li>

          {loggedIn ?
          <li className="nav-item nav-mobile">                          
              <NavLink to={"/" + this.props.userName} className="nav-link" onClick={this.props.refreshProfile}>{this.props.userName}</NavLink>
          </li>
          : 
          <li className="nav-item nav-mobile">
          <NavLink to="/signin" className="nav-link">Sign In</NavLink>
          </li>
          }
          {loggedIn ?
          <li className="nav-item nav-mobile">                          
            <NavLink to="#" className="nav-link" onClick={this.logout}>Log Out</NavLink>
          </li>
          : 
          <li className="nav-item nav-mobile">
            <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
          </li>
          }

          
          
        </ul>
        
        </div>
      
      </div>
      <div className="w-100 nav-item dropdown navbar-collapse collapse order-2 dual-collapse2">
            <div className="navbar-nav ml-auto">
            {loggedIn 
            ? <div>
                        <a className="nav-link dropdown-toggle" id="userDropdownLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className="profile-pic d-flex align-items-center justify-content-center" style={{backgroundColor: this.props.userColor}}><i className={this.props.userIcon}></i></div>
                        </a>
                        <div className="dropdown-menu user-dropdown" aria-labelledby="navbarDropdownMenuLink">
                        <h3 className="dropdown-header"><strong>{this.props.userName}</strong></h3>
                        <NavLink to={"/" + this.props.userName} className="dropdown-item" onClick={this.props.refreshProfile}>Profile</NavLink>
                        {/* <button onClick={this.props.refreshProfile}>Refresh</button> */}
                        <NavLink to="#" className="dropdown-item" onClick={this.logout}>Log Out</NavLink>
                        </div>
              </div>
            : 
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            <NavLink to="/signin" className="nav-link">Sign In</NavLink>
              </li>
              <li className="nav-item">
              <NavLink to="/signup" className="nav-link nav-link-box">Sign Up</NavLink>
              </li>
            </ul>

            }
            </div>
        </div>
    </nav>
  );
  }
}

export default Nav;
