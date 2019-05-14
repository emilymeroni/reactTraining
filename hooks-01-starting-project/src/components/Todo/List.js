import React from 'react'

const list = props => {
  console.log("Render list");

  return (
    <ul>
      {props.items.map(todo => (
        <li key={todo.id} onClick={props.clicked.bind(this, todo.id)}>
          {todo.name}
        </li>
      ))}
    </ul>
  )
}

export default list
