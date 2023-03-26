import React, { useState } from "react";

function TodoList( {todoList, deleteItem, updateItem, setCurrentItemId, currentItemId, handleIsCompleted} ) {

    const [isUpdateInputShown, setisUpdateInputShown] = useState(false);
    const [updatedValue, setUpdatedValue] = useState('');
    
    function handleUpdateItem(itemId) {
        setCurrentItemId(itemId);
        setisUpdateInputShown(prevVal => !prevVal);
    }

    function handleUpdatedValue(e) {
        setUpdatedValue(e.target.value);
    }

    function confirmNewValue() {
        if (isUpdateInputShown && updatedValue.length > 0) {
            updateItem(updatedValue);
        }
        setisUpdateInputShown(false);
    }

    const todoListItems = todoList.map((item,index) =>
        <div key={index} className="item-wrapper">
            <div className="item">
                <input 
                    type="checkbox"
                    onClick={() => handleIsCompleted(item.id)}
                    checked={item.checked}
                />

                <input 
                    type="text" 
                    value={item.value}
                    className={item.checked ? "item-input-completed" : "item-input"}
                />
                
                <button 
                    onClick={(e) => deleteItem(e, item.id)}
                    className="delete-btn">
                    <i class="fa-solid fa-trash-can fa-2x" title="Delete"></i>
                </button>
                <button
                    onClick={() => handleUpdateItem(item.id)}
                    className="update-btn">
                    <i class="fa-regular fa-pen-to-square fa-2x" title="Update"></i>
                </button>
            </div>
            { isUpdateInputShown && currentItemId === item.id &&
            <div>
            <input 
                type="text"
                className="input-for-update"
                onChange={(e) => handleUpdatedValue(e)}
            />
            <button onClick={confirmNewValue} className="confirm-btn">Confirm</button>
            </div>}
            
        </div>
    );

    

    return(
        <section>
            <div>
                {todoListItems.length === 0 ? 
                <div className="greeting-when-no-item">There is nothing to do</div> : todoListItems}
            </div>
        </section>
    )
}

export default TodoList;