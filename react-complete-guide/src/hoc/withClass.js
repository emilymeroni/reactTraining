import React from 'react';

// first approach
/* const withClass = props => (
  <div className={props.classes}>{props.children}</div>
) */

// second approach: function that returns a functional component
const withClass = (WrappedComponent, className) => {
  // you need to forward the props to the wrapped components
  // pull out the properties and distribute them as key-value pairs
  return props => (
    <div className={className}>
      <WrappedComponent {...props} />
    </div>
  );
};

export default withClass;