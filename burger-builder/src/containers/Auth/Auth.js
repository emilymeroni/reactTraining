import React, { Component } from 'react'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'

import { connect } from 'react-redux'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        touched: false,
        validation: {
          required: true
        },
        valid: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        touched: false,
        validation: {
          required: true,
          minLength: 6
        },
        valid: false
      }
    }
  }

  checkValidation (value, rules) {
    if (rules === undefined) return true
    if (rules.required && value.trim() === '') return false
    if (rules.minLength > value.length) return false
    if (rules.maxLength < value.length) return false
    return true
  }

  inputChangedHandler = (event, inputId) => {
    const updatedControls = {
      ...this.state.controls,
      [inputId]: {
        ...this.state.controls[inputId],
        value: event.target.value,
        valid: this.checkValidation(
          event.target.value,
          this.state.controls[inputId].validation
        ),
        touched: true
      }
    }
    this.setState({
      controls: updatedControls
    })
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
  }

  render () {
    const formElements = []
    for (const key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    const form = formElements.map(formElement => (
      <Input
        key={formElement.id}
        changed={event => {
          this.inputChangedHandler(event, formElement.id)
        }}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        invalid={!formElement.config.valid && formElement.config.touched}
        shouldValidate={formElement.config.validation !== undefined}
        value={formElement.config.value}
      />
    ))

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>Submit</Button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}

export default connect(null, mapDispatchToProps)(Auth);
