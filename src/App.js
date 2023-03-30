import React, { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import {nanoid} from "nanoid";

function App() {

  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState(
    // insteaf of getting directly we can use a function for lazy initializing
    () => JSON.parse(localStorage.getItem("todoList")) || []
  );

  const [currentItemId, setCurrentItemId] = useState(
    (todoList[0] && todoList[0].id) || ""
  );

  function handleIsCompleted(itemId) {
    setTodoList(prevItems => 
      prevItems.map(item => 
        item.id !== itemId ? item : {...item, checked: !item.checked}
      )
    )
  }

  function handleInputChange(e) {
    setInputText(e.target.value);
  }

  function createNewItem(e) {
    e.preventDefault();
    if(inputText.length > 0) {
      const newItem = {
        id: nanoid(),
        value: inputText,
        checked: false
      }
      setTodoList(prevTodos => [newItem, ...prevTodos]);
      setCurrentItemId(newItem.id);
      setInputText("");
    }
  }

  function deleteItem(e, itemId) {
    e.stopPropagation();
    if (window.confirm("Are you sure You want to delete ?")) {
      setTodoList(prevItems => prevItems.filter(item => item.id !== itemId));
    }
  }

  function updateItem(input) {
    setTodoList(prevItems => prevItems.map(
      (item) => item.id === currentItemId ? {...item, value: input} : item
    ))
  }

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList])



  return (
    <main className="App">

      <h1 style={{color: "#ADEFD1FF"}}>TODO LİST</h1>
      
      <TodoForm 
        handleInputChange={handleInputChange} 
        createNewItem={createNewItem} 
        inputText={inputText}
          
      />
      <TodoList 
        todoList={todoList}
        deleteItem={deleteItem}
        setCurrentItemId={setCurrentItemId}
        currentItemId={currentItemId}
        updateItem={updateItem}
        handleIsCompleted={handleIsCompleted}
      />
    </main>
  );
}

export default App;
