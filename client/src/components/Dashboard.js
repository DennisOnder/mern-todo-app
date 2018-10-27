import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class Dashboard extends Component {

  componentWillMount() {
    if(!localStorage.jwtToken) {
      window.location.href = '/';
    };
  };

  componentDidMount = () => {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    axios.defaults.headers.common['Authorization'] = token;
    axios.get(`/api/todos/${decoded.id}`)
      .then(res => console.log(res.data));
  }
  

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}

export default Dashboard;