import React from 'react';
import './CharComponent.css';

const CharComponent = (props) => {
  return (
    <div onClick={props.clicked} className="CharComponent">{props.char}</div>
  );
}

export default CharComponent;