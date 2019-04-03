import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person.js';

const app = props => {
  // Difference: setPersonsState does not merge with the the prievious state, but it overrides it.
  // you can use useState multiple times for different properties
  const [personsState, setPersonsState ] = useState({
    persons: [
      { name: 'Emily', age: 30 },
      { name: 'Matteo', age: 29 },
    ]
  });

  const switchNameHandler = () => {
    // DO NOT mutate state directly
    // this.state.persons[0].name = 'Emilia';
    // this will allow React to understand it should update the dom
    setPersonsState({
      persons: [
        { name: 'Emilia', age: 20 },
        { name: 'Matto', age: 35 },
      ]
    });
  }
    return (
      <div className="App">
        <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
        <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>my hobbies: trial</Person>
        {/* onClick needs to be uppercase */}
        <button onClick={switchNameHandler}>Switch Name</button>
      </div>
    );
  } 

export default app;
