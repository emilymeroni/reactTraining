import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';

import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
        touched: false,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        value: '',
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [{
            value: 'fastest',
            displayValue: 'Fastest'
          },
          {
            value: 'cheapest',
            displayValue: 'Cheapest'
          }]
        },
        touched: false,
        value: 'fastest'
      }
    },
    loading: false,
    isFormValid: false
  }

  checkValidation(value, rules) {
    if (rules === undefined) return true;
    if (rules.required && value.trim() === '') return false;
    if (rules.minLength > value.length) return false;
    if (rules.maxLength < value.length) return false;
    return true;
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const formData = {};

    for (const key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    // for firebase to function correctly you use node name of your choice + .json
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(response => {
        console.log(response);
        this.setState({ loading: false });
      })
  }

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = { ...updatedOrderForm[inputId] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputId] = updatedFormElement;

    this.setState({
      orderForm: updatedOrderForm,
      isFormValid: this.updateFormValidity()
    });
  }

  updateFormValidity = () => {
    const elementsValidity = [];

    for (const key in this.state.orderForm) {
      elementsValidity.push(this.state.orderForm[key].valid);
    }

    for (let index = 0; index < elementsValidity.length; index++) {
      if(elementsValidity[index] === false) {
        return false;
      };
    }

    return true;
  }

  render() {
    const formElements = [];
    for (const key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map(formElement =>
          <Input
            key={formElement.id}
            changed={(event) => { this.inputChangedHandler(event, formElement.id) }}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            invalid={!formElement.config.valid && formElement.config.touched}
            shouldValidate={formElement.config.validation !== undefined}
            value={formElement.config.value} />
        )}
        <Button btnType="Success" disabled={!this.state.isFormValid}>Order</Button>
      </form>);
    if (this.state.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;