import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      password2: ''
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
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    axios.post('/api/register', newUser)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div className="Authentication">
      <h1>Register</h1>
        <input type="text" name="email" value={this.state.email} onChange={this.onChange} placeholder="Email:"/>
        <input type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password:"/>
        <input type="password" name="password2" value={this.state.password2} onChange={this.onChange} placeholder="Confirm Password:"/>
        <button onClick={this.onClick}>Register</button>
      </div>
    )
  }
}

export default Register;