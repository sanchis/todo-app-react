import localforage from 'localforage'
import React, { useEffect, useState } from 'react'

export const TodosContext = React.createContext({})

export function TodosContextProvider ({ children }) {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    localforage.getItem('todos')
      .then(todos => {
        if (todos) {
          setTodos(todos)
        }
      })
  }, [])

  useEffect(() => {
    localforage.setItem('todos', todos)
  }, [todos])

  function addTodo (todo) {
    setTodos(todos => [...todos, todo])
  }

  function updateTodo (todoUpdate) {
    setTodos(todosInState =>
      todosInState.map(todoMap => {
        if (todoMap.id === todoUpdate.id) {
          return todoUpdate
        }
        return todoMap
      })
    )
  }

  function deleteTodo (todo) {
    setTodos(todos => todos.filter(todoFilter => todoFilter.id !== todo.id))
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        updateTodo
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}
