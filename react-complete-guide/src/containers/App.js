import React, { Component, Fragment } from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import AuthContext from '../context/auth-context';

class App extends Component {
  state = {
    persons: [
      { id: 'id1', name: 'Emily', age: 30 },
      { id: 'id2', name: 'Matteo', age: 29 },
      { id: 'id3', name: 'Ruska', age: 0.6 }
    ],
    showPersons: false,
    showCockpit: true,
    counter: 0,
    authenticated: false
  } // managed from inside a component

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

  loginHandler = () => {
    this.setState({
      authenticated: true
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

    /* this.setState({
      persons: persons,
      counter: this.state.counter + 1 //it could be an older state, it is not guaranteed to execute and finish immediately
    }); */

    // When you need to update a state that depends on the old state, you use the prevState
    this.setState((prevState, props) => {
      return {
        persons: persons,
        counter: prevState.counter + 1
      }
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
          isAuthenticated={this.state.isAuthenticated}
        />
    }

    return (
      <Fragment>
        <AuthContext.Provider value={{
         authenticated: this.state.isAuthenticated,
         login: this.loginHandler
        }}>
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
        </AuthContext.Provider>
      </Fragment>
    );
  }
}

export default withClass(App, classes.App);