import localforage from 'localforage'
import React, { useEffect, useState } from 'react'

export const TodosContext = React.createContext({})

export function TodosContextProvider ({ children }) {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    localforage.getItem('todos')
      .then(setTodos)
  }, [])

  useEffect(() => {
    localforage.setItem('todos', todos)
  }, [todos])

  function addTodo (todo) {
    setTodos(todos => todos.push(todo))
  }

  function deleteTodo (todo) {
    setTodos(todos => todos.filter(todoFilter => todoFilter.name !== todo.name))
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}
