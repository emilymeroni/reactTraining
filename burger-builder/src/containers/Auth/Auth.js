import React, { Component } from 'react'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'

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
    },
    isSignup: true
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {})
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

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup }
    })
  }

  submitHandler = event => {
    event.preventDefault()
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    )
  }

  render () {
    const formElements = []
    for (const key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElements.map(formElement => (
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
    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>Submit</Button>
          <Button clicked={this.switchAuthModeHandler} btnType='Danger'>
            Switch to {this.state.isSignup ? 'Sign up' : 'Sign in'}
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)
