import "./App.css";
import TodoList from "./components/todolist/TodoList";

function App() {
  return (
    <>
      <h1> To Do List</h1>

      <div className="app">
        <TodoList />
      </div>
    </>
  );
}

export default App;
