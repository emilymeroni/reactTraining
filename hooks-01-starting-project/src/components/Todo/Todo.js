import React, { useEffect, useReducer, useMemo } from 'react'
import { useFormInput } from '../../hooks/forms'
import axios from 'axios'

import List from './List'

const todo = props => {
  // Returns an array with two elements:
  // - the current state
  // - a function to manipulate the state
  // useState cannot be used in any for of nesting, only in the root level

  const todoInput = useFormInput()

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload)
      case 'SET':
        return action.payload
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.id)
      default:
        return state
    }
  }

  const [todoList, dispatch] = useReducer(
    todoListReducer,
    [] /*, initial action if desired */
  )

  // runs after every render cycle, watch out for infinite loops
  useEffect(() => {
    axios.get('https://todo-f745d.firebaseio.com/todos.json').then(result => {
      const todoData = result.data
      const todos = []
      for (const key in todoData) {
        if (todoData.hasOwnProperty(key)) {
          todos.push({ id: key, name: todoData[key].name })
        }
      }
      dispatch({ type: 'SET', payload: todos })
    })
    // You can use it as a cleanup, useful for event handlers for example
    return () => {
      console.log('Cleanup')
    }
  }, [])

  const todoAddHandler = () => {
    const todoName = todoInput.value

    axios
      .post('https://todo-f745d.firebaseio.com/todos.json', { name: todoName })
      .then(res => {
        const todoItem = { id: res.data.name, name: todoName }
        dispatch({ type: 'ADD', payload: todoItem })
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const todoRemoveHandler = id => {
    axios
      .delete(`https://todo-f745d.firebaseio.com/todos/${id}.json`)
      .then(res => {
        dispatch({ type: 'REMOVE', id: id })
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <React.Fragment>
      <input
        type='text'
        placeholder='Todo'
        onChange={todoInput.onChange}
        value={todoInput.value}
        style={{
          backgroundColor: todoInput.validity === true ? 'transparent' : 'red'
        }}
      />
      <button type='button' onClick={todoAddHandler}>
        Add
      </button>
      {useMemo(
        () => (
          <List items={todoList} clicked={todoRemoveHandler} />
        ),
        [todoList] // list of parameters to listen to recalculate the value passed as first argument
      )}
    </React.Fragment>
  )
}

export default todo
