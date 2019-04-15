import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    // the state could also be set in here
    // this.state = {}
  }

  // not used to often..
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps');
    console.log(props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate() {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  state = {
    persons: [
      { id: 'id1', name: 'Emily', age: 30 },
      { id: 'id2', name: 'Matteo', age: 29 },
      { id: 'id3', name: 'Ruska', age: 0.6 }
    ],
    showPersons: true,
    showCockpit: true
  } // managed from inside a component

  deletePersonHandler = (index) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }

  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons =
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
    }

    return (
      <div className={classes.App}>
        <button onClick={() => this.setState({
          showCockpit: !this.state.showCockpit
        })}>Remove cockpit</button>
        {this.state.showCockpit ? (
          <Cockpit
            persons={persons}
            title={this.props.title}
            clicked={this.togglePersonsHandler}
          />) : null}
        {persons}
      </div>
    );
  }
}

export default App;