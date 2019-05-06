import * as actionTypes from './actionTypes'

import axios from '../../axios-orders'

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientType: name
  }
}

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType: name
  }
}

const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
  return dispatch => {
    axios
      .get('https://react-my-burger-3bf35.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data))
      })
      .catch(error => {
          dispatch(fetchIngredientsFailed())
      })
  }
}
