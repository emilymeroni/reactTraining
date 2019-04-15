import React, { useEffect, useRef } from 'react';
import classes from './Cockpit.module.css';

const cockpit = (props) => {

  const toggleBtnRef = useRef(null);
  // toggleBtnRef.current.click(); cannot call it here, because the JSX is not yet rendered

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // Http request...
    const timer = setTimeout(() => {
    }, 500);
    toggleBtnRef.current.click(); // here the JSX was already parsed
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
        <button ref={toggleBtnRef} onClick={props.clicked}>Show/hide persons</button>
      </div>
    </div>
  )
};

export default React.memo(cockpit); // memoise the component, optimasation for functional components