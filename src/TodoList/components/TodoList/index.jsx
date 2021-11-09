import { useContext } from 'react'
import TodoItem from '../TodoItem'
import { TodosContext } from '../../context/TodosContext'
import styles from './style.module.css'

export default function TodoList () {
  const { todos } = useContext(TodosContext)

  return (
    <div className={styles.todoList}>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo =>
          <li key={todo.id}>
            <TodoItem item={todo} onChangeCheck={e => (todo.checked = true)} />
          </li>
        )}
      </ul>
    </div>
  )
}
