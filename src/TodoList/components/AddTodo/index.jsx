import React, { useContext } from 'react'
import { TodosContext } from '../../context/TodosContext'
import { v4 as uuidv4 } from 'uuid'

export default function AddTodo () {
  const { addTodo } = useContext(TodosContext)

  function addTodoObj () {
    addTodo({
      id: uuidv4(),
      name: '',
      fav: false,
      checked: false,
      date: new Date()
    })
  }

  return (
    <button onClick={addTodoObj}>Add Todo</button>
  )
}
