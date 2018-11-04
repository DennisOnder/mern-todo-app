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

  componentDidMount() {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    axios.defaults.headers.common['Authorization'] = token;
    axios.get(`/api/todos/${decoded.id}`)
      .then(res => res.data)
      .then(data => {
        const todos = data;
        this.setState({todos});
        console.log(this.state.todos);
      });
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