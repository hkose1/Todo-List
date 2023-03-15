import React from "react";
import TodoItem from "./TodoItem";

function TodoList() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    return(
        <div>
            {/* {todoList.map((item,ind) => <TodoItem item={item} key={ind}/>)} */}
            {todos != null ? todos.map((item,ind) => <TodoItem item={item} key={ind}/>) : ""}
        </div>
    )
}

export default TodoList;