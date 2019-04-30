import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-my-burger-3bf35.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        })
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.values(ingredients)
      .reduce((acc, el) => {
        return acc + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchaseContinueHandler = () => {

    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ingr
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary;

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

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
            price={this.props.totalPr} />
        </Fragment>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ingr}
        price={this.props.totalPr}
        cancelPurchase={this.purchaseCancelHandler}
        continuePurchase={this.purchaseContinueHandler}>
      </OrderSummary>;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingr: state.ingredients,
    totalPr: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientType) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientType: ingredientType }),
    onIngredientRemoved: (ingredientType) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientType: ingredientType })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));