import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

import {
  BrowserRouter,
  Switch,
  Route,
  withRouter,
  Redirect
} from 'react-router-dom'

import * as actions from './store/actions'

import { connect } from 'react-redux'

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup()
  }

  render () {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={Auth} />
          <Route path='/' component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <BrowserRouter>
        <div>
          <Layout>{routes}</Layout>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
