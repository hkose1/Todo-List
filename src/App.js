import React, { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import {nanoid} from "nanoid";

function App() {

  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState(
    // insteaf of getting directly using a function for lazy initializing
    () => JSON.parse(localStorage.getItem("todoList")) || []
  );

  const [currentItemId, setCurrentItemId] = useState(
    (todoList[0] && todoList[0].id) || ""
  );

  const [isCompleted, setIsCompleted] = useState(false);

  function handleIsCompleted(itemId) {
    setIsCompleted(prev => !prev);
    setCurrentItemId(itemId);
     setTodoList(prevItems => {
      const newItems = [];
      for(let i = 0; i < prevItems.length; i++) {
        const oldItem = prevItems[i];
        if(oldItem.id === currentItemId) {
          newItems.push({...oldItem, checked: isCompleted});
        }else {
          newItems.push(oldItem);
        }
      }
      return newItems;
    })
     
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
    setTodoList(prevItems => prevItems.filter(item => item.id !== itemId));
  }

  function updateItem(input) {
    setTodoList(prevItems => {
      const newItems = [];
      for(let i = 0; i < prevItems.length; i++) {
        const oldItem = prevItems[i];
        if(oldItem.id === currentItemId) {
          newItems.push({...oldItem, value: input});
        }else {
          newItems.push(oldItem);
        }
      }
      return newItems;
    })
  }

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList])



  return (
    <main className="App">

      <h1>TODO LİST</h1>
      
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
