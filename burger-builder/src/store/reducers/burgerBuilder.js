import * as actionTypes from '../actions/actionTypes'

const INGREDIENT_PRICES = {
  cheese: 0.4,
  salad: 0.1,
  meat: 1.3,
  bacon: 0.8
}

const initialState = {
  ingredients: null,
  totalPrice: 3,
  error: false
}

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.ADD_INGREDIENT) {
    const updatedPrice =
      state.totalPrice + INGREDIENT_PRICES[action.ingredientType]

    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientType]: state.ingredients[action.ingredientType] + 1
      },
      totalPrice: updatedPrice
    }
  } else if (action.type === actionTypes.REMOVE_INGREDIENT) {
    if (state.ingredients[action.ingredientType] === 0) {
      return
    }

    const updatedPrice =
      state.totalPrice - INGREDIENT_PRICES[action.ingredientType]

    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientType]: state.ingredients[action.ingredientType] - 1
      },
      totalPrice: updatedPrice
    }
  } else if (action.type === actionTypes.SET_INGREDIENTS) {
    return {
      ...state,
      ingredients: action.ingredients,
      error: false
    }
  } else if (action.type === actionTypes.FETCH_INGREDIENTS_FAILED) {
    return {
      ...state,
      error: true
    }
  }

  return state
}

export default reducer
