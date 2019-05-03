import * as actionTypes from './actionsTypes';

export const saveCounter = (result) => {
  return {
    type: actionTypes.STORE_COUNTER,
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
    type: actionTypes.REMOVE_COUNTER,
    counterId: counterId
  }
};