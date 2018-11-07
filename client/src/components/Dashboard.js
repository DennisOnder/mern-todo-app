import React, { Component } from 'react';
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
    this.fetchTodos = this.fetchTodos.bind(this);
    this.addTodos = this.addTodos.bind(this);
    this.deleteTodos = this.deleteTodos.bind(this);
    this.logOut = this.logOut.bind(this);
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
      this.fetchTodos();
    };
  };

  fetchTodos() {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    axios.defaults.headers.common['Authorization'] = token;
    axios.get(`/api/todos/${decoded.id}`)
      .then(res => res.data)
      .then(data => {
        const todos = data;
        this.setState({todos});
      }
    );
  };

  addTodos(e) {
    if(e.keyCode === 13 || e.which === 13) {
      const token = localStorage.jwtToken;
      const decoded = jwt_decode(token);
      const newTodo = {
        id: decoded.id,
        text: this.refs.inputField.value
      };
      axios.post('/api/todos', newTodo)
        .then(res => {
          console.log(res);
          this.refs.inputField.value = '';
          this.fetchTodos();
        })
        .catch(err => console.log(err));
    };
  };

  deleteTodos(todoKey) {
    axios.delete(`/api/todos/${todoKey}`)
      .then(res => {
        console.log(res);
        this.fetchTodos();
      })
      .catch(err => console.log(err));
  }

  logOut() {
    localStorage.removeItem('jwtToken');
    this.setState({redirect: true});
    window.location.href = '/login';
  }

  render() {
    return (
      <div id="Dashboard">
      <nav>
        <h4>JustAnotherTodoApp</h4>
        <button onClick={this.logOut}>Log Out</button>
      </nav>
        <h1>Your Todos:</h1>
        <div id="todoWrapper">
          <div className="todoDivs" id="todoInput">
            <input type="text" id="todoInput" placeholder="What's on your mind today?" ref="inputField" onKeyPress={this.addTodos} />    
          </div>
            {
              this.state.todos.map(todo => {
                return(
                  <div className="todoDivs" key={todo._id}>
                    <div>
                      <p>{todo.text}</p>
                      <i className="far fa-trash-alt" onClick={() => { this.deleteTodos(todo._id) }}></i>
                    </div>
                  </div>
                )
              })
            }
        </div>
      </div>
    )
  }
}

export default Dashboard;