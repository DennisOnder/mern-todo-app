import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Auth from './components/Auth';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route strict exact path="/" component={Auth} />
          <Route strict exact path="/login" component={Login} />
          <Route strict exact path="/register" component={Register} />
          <Route strict exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
