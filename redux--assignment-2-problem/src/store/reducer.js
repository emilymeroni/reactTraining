import * as personActionTypes from './personActions';

const initialState = {
  persons: []
}

const reducer = (state = initialState, action) => {
  if (action.type === personActionTypes.ADD) {
    const newPerson = {
      id: Math.random(), // not really unique but good enough here!
      name: 'Max',
      age: Math.floor(Math.random() * 40)
    }

    const newPersons = state.persons.concat(newPerson);

    return {
      ...state,
      persons: newPersons
    }
  }
  else if (action.type === personActionTypes.DELETE) {
    const newPersons = state.persons.filter(el => {
      return el.id !== action.id;
    });
    return {
      ...state,
      persons: newPersons
    }
  }
  return state;
};

export default reducer;