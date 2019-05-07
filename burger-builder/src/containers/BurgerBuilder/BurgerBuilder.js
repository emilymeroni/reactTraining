import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger'

import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import { connect } from 'react-redux'

import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount () {
    this.props.onInitIngredients();
  }

  updatePurchaseState (ingredients) {
    const sum = Object.values(ingredients).reduce((acc, el) => {
      return acc + el
    }, 0)
    return sum > 0
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout')
  }

  render () {
    const disabledInfo = {
      ...this.props.ingr
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    )

    if (this.props.ingr !== null) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingr} />
          <BuildControls
            ingredientRemoved={this.props.onIngredientRemoved}
            ingredientAdded={this.props.onIngredientAdded}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ingr)}
            ordered={this.purchaseHandler}
            price={this.props.totalPr}
          />
        </Fragment>
      )

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingr}
          price={this.props.totalPr}
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
        />
      )
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingr: state.burgerBuilder.ingredients,
    totalPr: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientType =>
      dispatch(actions.addIngredient(ingredientType)),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onIngredientRemoved: ingredientType =>
      dispatch(actions.removeIngredient(ingredientType)),
      onInitIngredients: () =>
        dispatch(actions.initIngredients())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
