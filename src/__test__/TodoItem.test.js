import { fireEvent, render } from '@testing-library/react'
import TodoItem from '../TodoList/components/TodoItem'

describe('Test TodoItem', () => {
  test('Render TodoItem', () => {
    const item = {
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
      name: 'This is my new todo item',
      fav: false,
      checked: false,
      createdDate: new Date()
    }
    const handleClick = jest.fn()
    const component = render(<TodoItem item={item} onCheck={handleClick} />)
    const checkButton = component.queryByTestId('checkButton')

    expect(checkButton.getAttribute('checked')).toEqual(item.checked)
    fireEvent.click(checkButton)
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(checkButton.getAttribute('checked')).toEqual(true)
  })

  test('TodoItem should be favorite', () => {
    const item = {
      name: 'This is my new todo item',
      fav: false,
      checked: false,
      createdDate: new Date()
    }
    const handleClick = jest.fn()
    const component = render(<TodoItem item={item} onFav={handleClick} />)
    const favButton = component.queryByTestId('favButton')

    expect(favButton.getAttribute('checked')).toEqual(item.fav)
    fireEvent.click(favButton)
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(favButton.getAttribute('checked')).toEqual(true)
  })
})
