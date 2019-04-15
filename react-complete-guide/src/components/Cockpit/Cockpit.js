import React from 'react';
import classes from './Cockpit.module.css';

const cockpit = (props) => {
  return (
    <div>
      <div className={classes.Cockpit}>
        {/* onClick needs to be uppercase */}
        <button onClick={props.clicked}>Show/hide persons</button>
      </div>
    </div>
  )
};

export default cockpit;