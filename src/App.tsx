import React, { useState } from "react";
import "./App.css";

type Todo = {
  id: number;
  title: string;
};

const App: React.FC = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    const newTodoItem: Todo = {
      id: Date.now(),
      title: newTodo,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const isTodoValid = newTodo.trim().length <= 30;
  const isButtonDisabled = newTodo.trim() === "" || !isTodoValid;

  return (
    <div className="app-container">
      <h1>TODOアプリ</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="TODOを入力してください"
          className={`todo-input ${!isTodoValid ? "validation-error" : ""}`}
        />
        {!isTodoValid && <p className="validation-error-red">30文字以内で入力してください</p>}
        <button
          type="submit"
          className={`add-button ${isButtonDisabled ? "disabled" : ""}`}
          disabled={isButtonDisabled}
        >
          追加
        </button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span>{todo.title}</span>
            <button onClick={() => handleDelete(todo.id)} className="delete-button">
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
