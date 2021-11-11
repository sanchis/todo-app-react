import { fireEvent, render } from '@testing-library/react'
import TodoItem from '../TodoList/components/TodoItem'
import { TodosContext } from '../TodoList/context/TodosContext'

describe('Test TodoItem', () => {
  const item = {
    id: '1',
    name: 'This is my new todo item',
    fav: false,
    checked: false,
    createdDate: new Date()
  }
  let component
  const handleClickCheck = jest.fn()
  const handleClickFav = jest.fn()
  const handleClickDel = jest.fn()

  beforeEach(() => {
    component = render(
      <TodosContext.Provider value={{
        updateTodo: jest.fn(),
        deleteTodo: jest.fn()
      }}
      >
        <TodoItem
          item={item}
          onChangeCheck={handleClickCheck}
          onChangeFav={handleClickFav}
          onDelete={handleClickDel}
        />
      </TodosContext.Provider>
    )
  })

  test('Render TodoItem', () => {
    expect(component.getByTestId('name').textContent).toEqual(item.name)
    expect(component.getByTestId('checkButton').checked).toEqual(item.checked)
    expect(component.getByTestId('favButton').value).toEqual(item.fav.toString())
  })

  test('TodoItem should be checked', () => {
    const expectedItem = { ...item, checked: !item.checked }

    const checkButton = component.getByTestId('checkButton')

    expect(checkButton.checked).toEqual(item.checked)
    fireEvent.click(checkButton)

    expect(handleClickCheck).toHaveBeenCalledTimes(1)
    expect(handleClickCheck).toHaveBeenCalledWith(expectedItem)
  })

  test('TodoItem should be favorite', () => {
    const expectedItem = {
      ...item,
      fav: true
    }
    const favButton = component.getByTestId('favButton')

    fireEvent.click(favButton)
    expect(handleClickFav).toHaveBeenCalledTimes(1)
    expect(handleClickFav).toBeCalledWith(expectedItem)
  })

  test('TodoItem should be deleted', () => {
    const delButton = component.getByTestId('deleteButton')

    fireEvent.click(delButton)
    expect(handleClickDel).toHaveBeenCalledTimes(1)
  })
})
