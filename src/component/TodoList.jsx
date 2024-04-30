// File: TodoList.jsx
// Description: This React component renders a list of todo items and a form for adding new todos.

import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';

/**
 * This React component renders a list of todo items and a form for adding new todos.
 *
 * @returns {JSX.Element}
 */
function TodoList() {
    // Retrieve todos from local storage or initialize with an empty array.
    const [todos, setTodos] = useState(() => {
        try {
            const storedTodos = JSON.parse(localStorage.getItem('todos'));
            return storedTodos || [];
        } catch (error) {
            console.error('Error parsing todos from local storage:', error);
            return [];
        }
    });

    // Update local storage whenever todos change.
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    /**
     * Add a new todo to the list.
     *
     * @param {Object} todo
     *
     * @returns {void}
     */
    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos];
        setTodos(newTodos);
    };

    /**
     * Update a todo with a new value.
     *
     * @param {number} todoId - The ID of the todo to update.
     * @param {Object} newValue - The new value for the todo.
     *
     * @returns {void}
     */
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        setTodos((prev) => prev.map((item) => (item.id === todoId ? newValue : item)));
    };

    /**
     * Remove a todo from the list.
     *
     * @param {number} id - The ID of the todo to remove.
     *
     * @returns {void}
     */
    const removeTodo = (id) => {
        const removedArr = [...todos].filter((todo) => todo.id !== id);
        setTodos(removedArr);
    };

    /**
     * Mark a todo as complete or incomplete.
     *
     * @param {number} id - The ID of the todo to mark.
     *
     * @returns {void}
     */
    const completeTodo = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isComplete: !todo.isComplete
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <div>
            <h1>Todo List: What&apos;s your plan?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </div>
    );
}

export default TodoList;
