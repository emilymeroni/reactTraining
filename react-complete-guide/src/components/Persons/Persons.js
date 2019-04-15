import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent { // implements shouldComponentUpdate if it needs to check all of the props

  /*static getDerivedStateFromProps(props, state) {
    console.log('[Persons.js] getDerivedStateFromProps');
    return state;
  }*/

  /* shouldComponentUpdate(nextProps, nextState) {
    console.log('[Persons.js] shouldComponentUpdate');
    if (nextProps.persons !== this.props.persons || //NB only works because we destroy the reference every time
      nextProps.changed !== this.props.changed ||
      nextProps.clicked !== this.props.clicked) {
      return true;
    }
    return false;
  } */

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
  }

  render() {
    console.log('[Persons.js] render');
    return this.props.persons.map((person, index) => {
      return (<Person
        click={() => this.props.clicked(index)}
        name={person.name}
        age={person.age}
        key={person.id}
        isAuth={person.isAuthenticated}
        changed={(event) => this.props.changed(event, person.id)} />);
    });
  }
};

export default Persons;