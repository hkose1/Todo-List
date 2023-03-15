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
    todoList.push(inputText)
    setInputText("");
  }

  return (
    <div className="App">
        <TodoForm handleInputChange={handleInputChange} handleAddingItem={handleAddingItem} inputText={inputText} />
        <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
