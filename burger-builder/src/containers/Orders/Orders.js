import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (const key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({
          orders: fetchedOrders,
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);