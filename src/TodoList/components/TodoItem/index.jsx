import React, { useContext } from 'react'
import { TodosContext } from '../../context/TodosContext'

export default function TodoItem ({
  item,
  onChangeCheck = (e) => {},
  onChangeFav = (e) => {},
  onDelete = (e) => {}
}) {
  const { updateTodo } = useContext(TodosContext)

  function handleChangeCheckBox () {
    const itemToUpdate = { ...item }
    itemToUpdate.checked = !item.checked
    onChangeCheck(itemToUpdate)
    updateTodo(itemToUpdate)
  }

  return (
    <div>
      <input
        type='checkbox'
        name='todoCheck'
        checked={item.checked}
        data-testid='checkButton'
        onChange={handleChangeCheckBox}
      />
      {JSON.stringify(item)}
    </div>
  )
}
