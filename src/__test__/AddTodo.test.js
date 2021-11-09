import { fireEvent, render } from '@testing-library/react'
import AddTodo from '../TodoList/components/AddTodo'
import { TodosContext } from '../TodoList/context/TodosContext'

describe('Add todo item', () => {
  test('Renders add todo button', async () => {
    const component = render(
      <AddTodo />
    )
    const addTodoButton = await component.findByText('Add todo')
    expect(addTodoButton).toBeDefined()
  })

  test('Add todo button should be add todo', async () => {
    const todos = []
    const handleAddTodo = jest.fn()
    const component = render(
      <TodosContext.Provider value={{
        todos,
        addTodo: handleAddTodo
      }}
      >
        <AddTodo />
      </TodosContext.Provider>
    )

    const addTodoButton = await component.findByText('Add todo')
    expect(todos.length).toEqual(0)
    fireEvent.click(addTodoButton)
    expect(handleAddTodo).toBeCalledTimes(1)
  })
})
