import React from 'react';
import classes from './Button.module.css';

const button = (props) => {
  const cssClasses = [classes.Button, classes[props.btnType]];
  
  return (
    <button 
      className={cssClasses.join(' ')}
      onClick={props.clicked} 
      disabled={props.disabled}>{props.children}</button>
  );
}

export default button;