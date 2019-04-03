import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';

class App extends Component {
  // it is a reserved word
  state = {
    persons: [
      { name: 'Emily', age: 30 },
      { name: 'Matteo', age: 29 },
    ]
  } // managed from inside a component

  switchNameHandler = () => {
    // DO NOT mutate state directly
    // this.state.persons[0].name = 'Emilia';
    // this will allow React to understand it should update the dom
    this.setState({
      persons: [
        { name: 'Emilia', age: 20 },
        { name: 'Matto', age: 35 },
      ]
    });
  }

  render() {
    return (
      <div className="App">
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>my hobbies: trial</Person>
        {/* onClick needs to be uppercase */}
        <button onClick={this.switchNameHandler}>Switch Name</button>
      </div>
    );
  }
}

export default App;
