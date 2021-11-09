import { fireEvent, render } from '@testing-library/react'
import TodoItem from '../TodoList/components/TodoItem'
import { TodosContext } from '../TodoList/context/TodosContext'

describe('Test TodoItem', () => {
  test('Render TodoItem', () => {
    const item = {
      id: '1',
      name: 'This is my new todo item',
      fav: false,
      checked: false,
      createdDate: new Date()
    }
    const component = render(<TodoItem item={item} />)

    expect(component.getByTestId('name').textContent).toEqual(item.name)
    expect(component.getByTestId('checkButton').checked).toEqual(item.checked)
    expect(component.getByTestId('favButton').value).toEqual(item.fav.toString())
  })

  test('TodoItem should be checked', () => {
    const item = {
      id: '1',
      name: 'This is my new todo item',
      fav: false,
      checked: false,
      createdDate: new Date()
    }

    const expectedItem = { ...item, checked: !item.checked }
    const handleClick = jest.fn()

    const component = render(
      <TodosContext.Provider value={{
        updateTodo: jest.fn()
      }}
      >
        <TodoItem item={item} onChangeCheck={handleClick} />
      </TodosContext.Provider>
    )
    const checkButton = component.getByTestId('checkButton')

    expect(checkButton.checked).toEqual(item.checked)
    fireEvent.click(checkButton)

    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(handleClick).toHaveBeenCalledWith(expectedItem)
  })

  test('TodoItem should be favorite', () => {
    const item = {
      id: '1',
      name: 'This is my new todo item',
      fav: false,
      checked: false,
      createdDate: new Date()
    }
    const expectedItem = {
      ...item,
      fav: true
    }
    const handleClick = jest.fn()
    const component = render(
      <TodosContext.Provider value={{
        updateTodo: jest.fn()
      }}
      >
        <TodoItem item={item} onChangeFav={handleClick} />
      </TodosContext.Provider>
    )
    const favButton = component.getByTestId('favButton')

    fireEvent.click(favButton)
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(handleClick).toBeCalledWith(expectedItem)
  })

  test('TodoItem should be deleted', () => {
    const item = {
      id: '1',
      name: 'This is my new todo item',
      fav: false,
      checked: false,
      createdDate: new Date()
    }
    const handleClick = jest.fn()
    const component = render(<TodoItem item={item} onChangeDelete={handleClick} />)
    const delButton = component.getByTestId('deleteButton')

    fireEvent.click(delButton)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
