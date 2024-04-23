// File: Todo.jsx
// Description: This React component renders a list of todo items and provides functionality to complete, remove, and update each todo item.

import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  // State to manage the edit mode for a todo item.
  const [edit, setEdit] = useState({ id: null, value: '' });

  // Function to handle the update of a todo item.
  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({ id: null, value: '' });
  };

  return (
    <>
      {todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
          {/* If the todo item is in edit mode, render the TodoForm component. */}
          {edit.id === todo.id ? (
            <TodoForm edit={edit} onSubmit={submitUpdate} />
          ) : (
            <>
              {/* If the todo item is not in edit mode, render the todo item and icons. */}
              <div className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={() => completeTodo(todo.id)}
                />
                <div onClick={() => completeTodo(todo.id)}>{todo.text}</div>
              </div>
              <div className="icons">
                <RiCloseCircleLine onClick={() => removeTodo(todo.id)} className="delete-icon" />
                <TiEdit
                  onClick={() => setEdit({ id: todo.id, value: todo.text })}
                  className="edit-icon"
                />
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default Todo;
