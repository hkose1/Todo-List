import React from "react";

function TodoForm( {handleInputChange, handleAddingItem, inputText} ) {

    return(
        <form>

            <input 
                type="text"
                placeholder="what will you do?"
                onChange={handleInputChange}
                value={inputText}
            />

            <button onClick={handleAddingItem}>+</button>

        </form>
    )
}

export default TodoForm;