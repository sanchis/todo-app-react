import React, { useContext } from 'react'
import { TodosContext } from '../../context/TodosContext'

export default function TodoItem ({
  item,
  onChangeCheck = (e) => {},
  onChangeFav = (e) => {},
  onDelete = (e) => {}
}) {
  const { updateTodo, deleteTodo } = useContext(TodosContext)

  function handleChangeCheckBox () {
    const itemToUpdate = { ...item }
    itemToUpdate.checked = !item.checked
    onChangeCheck(itemToUpdate)
    updateTodo(itemToUpdate)
  }

  function handleChangeFav () {
    const itemToUpdate = { ...item }
    itemToUpdate.fav = !item.fav
    onChangeFav(itemToUpdate)
    updateTodo(itemToUpdate)
  }

  function handleDelete () {
    onDelete(item)
    deleteTodo(item)
  }

  return (
    <fieldset>
      <input
        type='checkbox'
        name='todoCheck'
        checked={item.checked}
        data-testid='checkButton'
        onChange={handleChangeCheckBox}
      />
      <button data-testid='favButton' value={item.fav} onClick={handleChangeFav}>{item.fav ? '⭐️' : '✭'}</button>
      <span data-testid='name'>{item.name}</span>
      <button data-testid='deleteButton' onClick={handleDelete}>🗑</button>
    </fieldset>
  )
}
