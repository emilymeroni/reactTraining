import React from 'react';

const ValidationComponent = (props) => {

  if (props.text.length < 5) {
    return (
      <p>Text is too short!</p>
    )
  }

  else {
    return (
      <p></p>
    )
  }
};

export default ValidationComponent;