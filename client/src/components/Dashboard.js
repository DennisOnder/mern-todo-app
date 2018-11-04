import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      todos: []
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