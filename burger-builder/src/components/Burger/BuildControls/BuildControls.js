import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import Price from './Price/Price';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <Price total={props.price}></Price>
      {controls.map(ctrl => {
        return <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          removed={() => props.ingredientRemoved(ctrl.type)}
          added={() => props.ingredientAdded(ctrl.type)}
          disabled={props.disabled[ctrl.type]} />
      })}
      <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>{props.isAuthenticated ? 'Order Now' : 'Sign in to continue'}</button>
    </div>
  );
}

export default buildControls;