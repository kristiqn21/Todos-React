import React, { useEffect, useState } from 'react';

const App = () => {
  const [newItem, setNewItem] = useState('');
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos]
  )

  function handleSubmit(e) {
    e.preventDefault();

    if (newItem.trim() === '') {
      window.alert("You can't add an empty todo");
      return;
    }

    setTodos(currentTodos => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false },
    ]);

    setNewItem('');
  }

  function handleDelete(id) {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  }

  function handleToggle(id) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>

      <h1 className="header">To Do List</h1>
      <ul className="list">
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
              {todo.title}
            </label>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
