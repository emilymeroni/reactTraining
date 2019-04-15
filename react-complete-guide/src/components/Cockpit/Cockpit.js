import React, { useEffect } from 'react';
import classes from './Cockpit.module.css';

const cockpit = (props) => {

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // Http request...
    const timer = setTimeout(() => {
    }, 500);
    return () => {
      // called when it is unmounted
      clearTimeout(timer);
      console.log('[Cockpit.js] cleanup work in useEffect');
    }
  }, []); // you point at all the data that you are using this effect
  // if you pass an empty array it will only run for the first time, as there will be no changes

  // you can have as many useEffect as you want
  useEffect(() => {
    console.log('[Cockpit.js] second useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in second useEffect');
    }
  });

  return (
    <div>
      <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
        {/* onClick needs to be uppercase */}
        <button onClick={props.clicked}>Show/hide persons</button>
      </div>
    </div>
  )
};

export default React.memo(cockpit); // memoise the component, optimasation for functional components