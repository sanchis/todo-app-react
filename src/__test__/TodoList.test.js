import { render } from '@testing-library/react'
import TodoList from '../TodoList'

describe('Test TodoList', () => {
  test('renders TodoList', () => {
    const items = [{
      name: 'This is my new todo item',
      fav: false,
      checked: false,
      createdDate: new Date()
    }, {
      name: 'This is my new todo item 2',
      fav: false,
      checked: true,
      createdDate: new Date()
    }]
    const component = render(<TodoList items={items} />)
    expect(component.container.querySelectorAll('li').length).toEqual(2)
  })
})
