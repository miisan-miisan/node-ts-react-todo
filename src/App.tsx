import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

type Todo = {
  id: number;
  title: string;
};

const API_BASE_URL = "http://localhost:5000/api/tasks";

const App: React.FC = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    try {
      const response = await axios.post(API_BASE_URL, { title: newTodo });
      const newTodoItem: Todo = {
        id: response.data.id,
        title: response.data.title,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
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
      {todos.length === 0 ? (
        <p>Todoがありません</p>
      ) : (
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
      )}
    </div>
  );
};

export default App;
