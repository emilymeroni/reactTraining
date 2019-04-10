import React from 'react';

const userInput = (props) => {
  return (
    <input onChange={props.changed} value={props.name} type="text"/>
  )
}

export default userInput;