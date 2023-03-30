import React from 'react'
import { Todo } from '../model'
import { Action } from '../hooks/useTodoReducer'
import SingleTodo from './SingleTodo'
import './styles.css'
import { Droppable } from 'react-beautiful-dnd'

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<Action>
  completedTodos: Todo[]
  setCompletedTodos: React.Dispatch<Action>
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className='container'>
      <Droppable droppableId='TodosList'>
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>Active Tasks</span>

            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='TodosRemove'>
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? 'dragcomplete' : ''
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
                todos={todos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TodoList
