import React from 'react';

const userOutput = (props) => {
  return (
    <div>
      <p>The username is</p>
      <p>{props.username}</p>
    </div>
  )
}

export default userOutput;