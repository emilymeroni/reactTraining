import React from 'react';

const ValidationComponent = (props) => {
  let validationMessage = 'Text ok';
  
  if (props.text.length < 5) {
    validationMessage = 'Text too short';
  }

  return (
    <p>{validationMessage}</p>
  )
};

export default ValidationComponent;