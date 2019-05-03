export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_COUNTER = 'STORE_COUNTER';
export const REMOVE_COUNTER = 'REMOVE_COUNTER';

// convention to use same name as the identifier
export const increment = () => {
  return {
    type: INCREMENT
  }
};

export const decrement = () => {
  return {
    type: DECREMENT
  }
};

export const add = (value) => {
  return {
    type: ADD,
    value: value
  }
};

export const subtract = (value) => {
  return {
    type: SUBTRACT,
    value: value
  }
};

export const saveCounter = (result) => {
  return {
    type: STORE_COUNTER,
    result: result
  }
}

// only possible due to redux hunk
export const storeCounter = (result) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(saveCounter(result));
    }, 2000);
  }
};

export const removeCounter = (counterId) => {
  return {
    type: REMOVE_COUNTER,
    counterId: counterId
  }
};