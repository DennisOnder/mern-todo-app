import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      todos: [],
      redirect: false
    };
    this.checkForRedirect = this.checkForRedirect.bind(this);
  };

  componentDidMount() {
    if(localStorage.jwtToken) {
      this.setState({redirect: true});
    };
    setTimeout(() => {
      this.checkForRedirect();
    }, 2000);
  };

  checkForRedirect() {
    const isAuthenticated = this.state.redirect;
    if(isAuthenticated === false) {
      window.location.href = '/login';
    } else {
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      axios.defaults.headers.common['Authorization'] = token;
      axios.get(`/api/todos/${decoded.id}`)
        .then(res => res.data)
        .then(data => {
          const todos = data;
          this.setState({todos});
          console.log(this.state.todos);
        }
      );
    };
  };

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}

export default Dashboard;