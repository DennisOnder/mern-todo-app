import React, { Component } from 'react'

class Dashboard extends Component {

  componentWillMount() {
    if(!localStorage.jwtToken) {
      window.location.href = '/';
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