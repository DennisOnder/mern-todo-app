import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClick() {
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('/api/login', user)
      .then(res => res.data)
      .then(data => {
        const { token } = data;
        console.log(jwt_decode(token));
        localStorage.setItem('jwtToken', token);
        window.location.href = '/dashboard';
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="Authentication">
        <input type="text" name="email" value={this.state.email} onChange={this.onChange}/>
        <input type="password" name="password" value={this.state.password} onChange={this.onChange}/>
        <button onClick={this.onClick}>Login</button>
      </div>
    )
  }
}

export default Login;