import React from "react";

function TodoForm( {handleInputChange, createNewItem, inputText} ) {

    return(
        <form className="form">

            <input 
                type="text"
                placeholder="what will you do?"
                onChange={handleInputChange}
                value={inputText}
                className="input"
            />

            <button 
                    className="create-btn" 
                    onClick={createNewItem}>
                <i class="fa-solid fa-square-plus fa-3x" title="Add new todo"></i>
            </button>

        </form>
    )
}

export default TodoForm;