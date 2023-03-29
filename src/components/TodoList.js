import React, { useState } from "react";

function TodoList( {todoList, deleteItem, updateItem, setCurrentItemId, currentItemId, handleIsCompleted} ) {

    const [isUpdateInputShown, setisUpdateInputShown] = useState(false);
    const [updatedValue, setUpdatedValue] = useState('');

    const [filter, setFilter] = useState("all");
    
    function handleUpdateItem(itemId) {
        if(currentItemId !== itemId) {
            setisUpdateInputShown(false);
        }
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

    function handleFiltering(e) {
        setFilter(e.target.value);
    }

    const todoListItems = todoList.map((item,index) =>
        <div key={index} className="item-wrapper" 
            style={
                (filter === "completed" && !item.checked ? {display: "none"} :
                (filter === "uncompleted") && item.checked ? {display: "none"} : {display: "block"})
            }>
            <div className="item">
                <input 
                    type="checkbox"
                    className="iscompleted-checkbox"
                    onChange={() => handleIsCompleted(item.id)}
                    checked={item.checked}
                />

                <input 
                    type="text" 
                    value={item.value}
                    readOnly
                    className={item.checked ? "item-shown-completed" : "item-shown"}
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
            <div className="item">
                <input 
                    type="text"
                    className="input-for-update"
                    onChange={(e) => handleUpdatedValue(e)}
                />
                <button onClick={confirmNewValue} className="confirm-btn">Confirm</button>
            </div>}
            
        </div>
    );

    const filtering = (
        <div className="filtering">
            <label htmlFor="all">All</label>
            <input type="radio" id="all" name="filter" value="all" 
                checked={filter === "all"}
                onChange={handleFiltering}/>

            <label htmlFor="completed">Completed</label>
            <input type="radio" id="completed" name="filter" value="completed"  
                checked={filter === "completed"}
                onChange={handleFiltering}/>

            <label htmlFor="uncompleted">Uncompleted</label>
            <input type="radio" id="uncompleted" name="filter" value="uncompleted"  
                checked={filter === "uncompleted"}
                onChange={handleFiltering}/>
        </div>
    )

    return(
        <section>
            <div>
                {filtering}
                {todoListItems.length === 0 ? 
                <div className="greeting-when-no-item">THERE IS NOTHING TO DO</div> : todoListItems}
            </div>
        </section>
    )
}

export default TodoList;