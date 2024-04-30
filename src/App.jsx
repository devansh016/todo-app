// File: App.jsx
// Description: This React component renders the TodoList component.

import React from 'react';
import './App.css';
import TodoList from './component/TodoList';

/**
 * This React component renders the TodoList component.
 *
 * @returns {JSX.Element}
 */
function App() {
    return (
        <div className="todo-app">
            <TodoList />
        </div>
    );
}

export default App;
