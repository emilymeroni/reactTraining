import React from 'react';

const price = (props) => {
  return (
    <p>Current price: <strong>{props.total.toFixed(2)}</strong></p>
  );
}

export default price;