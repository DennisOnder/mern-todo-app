import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Auth from './components/Auth';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Auth} />
      </Router>
    );
  }
}

export default App;
