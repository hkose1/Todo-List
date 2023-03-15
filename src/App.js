import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {

  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState([]);

  function handleInputChange(e) {
    setInputText(e.target.value);
  }

  function handleAddingItem(e) {
    e.preventDefault();
    if(inputText.length > 0) {
      todoList.push(inputText);
      setTodoList(todoList);
      localStorage.setItem("todos", JSON.stringify(todoList));
      setInputText("");
    }
  }

  return (
    <div className="App">
        <TodoForm handleInputChange={handleInputChange} handleAddingItem={handleAddingItem} inputText={inputText} />
        <TodoList />
    </div>
  );
}

export default App;
