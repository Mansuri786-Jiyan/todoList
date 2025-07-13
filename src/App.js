import { useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setinput] = useState("");
  const [Todo, setTodo] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const Addtodolist = () => {
    if (input === "") return;
    if (isEditMode) {
      setTodo((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, text: input } : t))
      );
      setIsEditMode(false);
      setEditId(null);
    } else {
      const item = {
        id: Todo.length + 1,
        text: input,
        Completed: false,
      };
      setTodo((prev) => [...prev, item]);
    }

    setinput("");
  };
  const handleEdit = (id, text) => {
    setIsEditMode(true);
    setEditId(id);
    setinput(text);
  };

  const Toggale = (id) => {
    setTodo(
      Todo.map((t) => (t.id === id ? { ...t, Completed: !t.Completed } : t))
    );
  };

  const DeleteTodo = (id) => {
    setTodo(Todo.filter((t) => t.id !== id));
  };
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter Todo"
        value={input}
        onChange={(e) => setinput(e.target.value)}
      />
      <button onClick={() => Addtodolist()}>Submit</button>

      <ul>
        {Todo.map((t) => {
          return (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.Completed}
                onClick={() => Toggale(t.id)}
              />
              <span className={t.Completed ? "Text" : ""}>{t.text}</span>
              <button onClick={() => DeleteTodo(t.id)}>Delete </button>
              <button onClick={() => handleEdit(t.id, t.text)}>Edit</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
