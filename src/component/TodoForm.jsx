// File: TodoForm.jsx
// Description: This React component renders a form for adding or updating a todo item.

import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  // Initialize the input state with the value from props.edit.value or an empty string.
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  // Create a reference to the input element.
  const inputRef = useRef(null);

  // Use the useEffect hook to focus on the input field when the component mounts or updates.
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function from props and pass an object with a random id and the input value.
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    // Clear the input field.
    setInput('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {/* If props.edit is truthy, render the input field and button for updating a todo. */}
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        // Otherwise, render the input field and button for adding a new todo.
        <>
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="todo-button">
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
