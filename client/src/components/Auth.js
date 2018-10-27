import React, { Component } from 'react';

class Auth extends Component {

  onClick(e) {
    window.location.href = `/${e.target.name}`;
  }

  render() {
    return (
      <div id="Auth">
        <h1>Just Another Todo App</h1>
        <div>
          <button name="login" onClick={this.onClick}>Log In</button>
          <button name="register" onClick={this.onClick}>Register</button>
        </div>
      </div>
    )
  }
}

export default Auth;
