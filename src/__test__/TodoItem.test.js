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
    expect(component.container).toHaveTextContent(item.name)
    expect(component.queryByTestId('checkButton').getAttribute('checked')).toEqual(item.checked)
    expect(component.queryByTestId('favButton').getAttribute('checked')).toEqual(item.fav)
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
    const handleClick = jest.fn()
    const component = render(<TodoItem item={item} onFav={handleClick} />)
    const favButton = component.getByTestId('favButton')

    expect(favButton.getAttribute('checked')).toEqual(item.fav)
    fireEvent.click(favButton)
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(favButton.getAttribute('checked')).toEqual(true)
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
