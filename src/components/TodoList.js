import React from "react";

function TodoList( {todoList} ) {
    return(
        <div>
            {todoList.map(item => item)}
        </div>
    )
}

export default TodoList;