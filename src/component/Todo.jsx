// File: Todo.jsx
// Description: This React component renders a list of todo items and provides functionality to complete, remove, and update each todo item.

import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { v4 as uuidv4 } from 'uuid';

/**
 * This React component renders a list of todo items and provides functionality to complete, remove, and update each todo item.
 *
 * @param {Array} todos - List of todo items.
 * @param {Function} completeTodo - Function to complete a todo item.
 * @param {Function} removeTodo - Function to remove a todo item.
 * @param {Function} updateTodo - Function to update a todo item.
 *
 * @returns {JSX.Element} - A list of todo items.
 */
function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
    // State to manage the edit mode for a todo item.
    const [edit, setEdit] = useState({ id: null, value: '' });

    /**
     * Function to submit the updated value of a todo item.
     *
     * @param {string} value - The updated value of the todo item.
     */
    const submitUpdate = (value) => {
        updateTodo(edit.id, value);
        setEdit({ id: null, value: '' });
    };

    return (
        <>
            {todos.map((todo) => (
                <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={uuidv4()}>
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
                                <RiCloseCircleLine
                                    onClick={() => removeTodo(todo.id)}
                                    className="delete-icon"
                                />
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
