import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;

  const inputClasses = [classes.InputElement];

  if(props.value !== undefined && props.invalid && props.shouldValidate) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        onChange={props.changed}
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value} />
      break;
    case ('textarea'):
      inputElement = <textarea
        onChange={props.changed}
        {...props.elementConfig}
        value={props.value} />
      break;
    case ('select'):
      inputElement = (<select
        onChange={props.changed}
        className={inputClasses.join(' ')}>
        {props.elementConfig.options.map(option => {
          return <option key={option.value} value={option.value}>
            {option.displayValue}
          </option>;
        })}
      </select>);
      break;
    default:
      inputElement = <input
        onChange={props.changed}
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value} />
  }

  return (
    <label className={classes.Input}>
      <span className={classes.Label}>{props.label}</span>
      {inputElement}
    </label>
  );
}

export default input;