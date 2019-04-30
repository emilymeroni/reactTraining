import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
    state = {
        counter: 0,
        results: []
    }

    counterChangedHandler = (action, value) => {
        switch (action) {
            case 'inc':
                this.setState((prevState) => { return { ounter: prevState.counter + 1 } })
                break;
            case 'dec':
                this.setState((prevState) => { return { counter: prevState.counter - 1 } })
                break;
            case 'add':
                this.setState((prevState) => { return { counter: prevState.counter + value } })
                break;
            case 'sub':
                this.setState((prevState) => { return { counter: prevState.counter - value } })
                break;
            default:
        }
    }

    render() {

        const results = this.props.results.map(result => {
            return <li key={result.id} onClick={() => this.props.onRemoveCounter(result.id)}>{result.value}</li>
        });

        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)} />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractCounter(5)} />
                <button onClick={() => this.props .onStoreCounter(this.props.ctr)}>Store results</button>
                <ul>
                    {results}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        results: state.res.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
        onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
        onAddCounter: (value) => dispatch({ type: actionTypes.ADD, value: value }),
        onSubtractCounter: (value) => dispatch({ type: actionTypes.SUBTRACT, value: value }),
        onStoreCounter: (result) => dispatch({ type: actionTypes.STORE_COUNTER, result: result }),
        onRemoveCounter: (counterId) => dispatch({ type: actionTypes.REMOVE_COUNTER, counterId: counterId })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);