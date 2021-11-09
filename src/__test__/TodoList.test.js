import { render } from '@testing-library/react'
import TodoList from '../TodoList/components/TodoList'
import { TodosContext } from '../TodoList/context/TodosContext'

describe('Test TodoList', () => {
  test('renders TodoList', () => {
    const todos = [{
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
    const component = render(
      <TodosContext.Provider value={{
        todos
      }}
      >
        <TodoList />
      </TodosContext.Provider>
    )
    expect(component.container.querySelectorAll('li').length).toEqual(2)
  })
})
