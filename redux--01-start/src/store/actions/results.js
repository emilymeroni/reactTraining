import * as actionTypes from './actionsTypes';

export const saveCounter = (result) => {
  return {
    type: actionTypes.STORE_COUNTER,
    result: result
  }
}

// only possible due to redux hunk
export const storeCounter = (result) => {
  return (dispatch, getState) => {
    setTimeout(() => {
      // Not recommended, better to pass arguments to the function
      // const oldCounter = getState().ctr.counter;
      // console.log(oldCounter);
      dispatch(saveCounter(result));
    }, 2000);
  }
};

export const removeCounter = (counterId) => {
  return {
    type: actionTypes.REMOVE_COUNTER,
    counterId: counterId
  }
};