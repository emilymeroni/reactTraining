const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
  counter: 0
};

// Reducer
const rootReducer = (currentState = initialState, action) => {
  if(action.type === 'INC_COUNTER') {
    return {
      ...currentState,
      counter: currentState.counter + 1
    }
  }
  if(action.type === 'ADD_COUNTER') {
    return {
      ...currentState,
      counter: currentState.counter + 10
    }
  }
  return currentState;
};

// Store
const store = createStore(rootReducer);

// Subscription
// Informs me if something has changed
store.subscribe(() => {
  console.log('[Subscription]', store.getState()); // executed when an action is dispatched
});

// Dispatching Action
// type is the one property than needs to be used like this
store.dispatch({type: 'INC_COUNTER'}); // all uppercase is the convention
store.dispatch({type: 'ADD_COUNTER', value: 10}); 