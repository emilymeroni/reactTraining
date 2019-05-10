import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import thunk from 'redux-thunk'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Layout>
              <Switch>
                <Route path='/checkout' component={Checkout} />
                <Route path='/orders' component={Orders} />
                <Route path='/auth' component={Auth} />
                <Route path='/logout' component={Logout} />
                <Route path='/' component={BurgerBuilder} />
              </Switch>
            </Layout>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
