import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import Header from './components/layout/Header';
import uuid from 'uuid';
// import axios from 'axios';

class App extends Component {

  state = {
    // An array of hard-coded to-do objects
    todos : [
      {
        id: 1,
        title: 'Take out the trash',
        completed: false
      },
      {
        id: 2,
        title: 'Have dinner with friends',
        completed: false
      },
      {
        id: 3,
        title: 'Meeting with the boss',
        completed: false
      }
    ]

  }

  // We can call this function if we want to populate todos by making an API request
  /*
  componentDidMount() {
    axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10') // limit to 10 todos
      .then(res => this.setState({todos: res.data}))
  }
  */

// Toggle
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
    }) });
  }

// Delete Todo
  delTodo = (id) => {
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }); // 'spread' operator
  }

// Add Todo (we are passing in a 'title' in the params)
  addTodo = (title) => {
    // We need to pass this title to the app state
    const newTodo = {
      id: uuid.v4(),
      title: title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo] }); // copy what we have, add in new
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete}
                  delTodo={this.delTodo}/>
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
