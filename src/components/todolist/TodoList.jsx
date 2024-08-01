import React, { useState, useEffect } from "react";
import "../../Css/Todolist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

function TodoList() {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  // Load list from localStorage on component mount
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("todoList")) || [];
    setList(savedList);
  }, []);

  // Save list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const descHandler = (e) => {
    setDescription(e.target.value);
  };

  const saveButton = () => {
    if (input.trim()) {
      if (isEditing) {
        const updatedList = list.map((item, index) =>
          index === currentIndex
            ? { title: input, description: description }
            : item
        );
        setList(updatedList);
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        const newItem = { title: input, description: description };
        setList([...list, newItem]);
      }
      setInput(""); // Clear the input fields
      setDescription("");
    }
  };

  const deleteItem = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const editItem = (index) => {
    setCurrentIndex(index);
    setInput(list[index].title);
    setDescription(list[index].description);
    setIsEditing(true);
  };

  const doneEditing = () => {
    setIsEditing(false);
    setCurrentIndex(null);
    setInput("");
    setDescription("");
  };

  return (
    <div className="container">
      <div className="title">
        <input
          type="text"
          placeholder="Title"
          value={input}
          onChange={inputHandler}
          className="todoinp"
        />

        <textarea
          className="textar"
          placeholder="Description...."
          rows="10"
          cols="30"
          value={description}
          onChange={descHandler}
        />
        <button className="svbtn" onClick={saveButton}>
          {isEditing ? "Update" : "Save"}
        </button>
      </div>

      <div className="left">
        <div className="Right">
          <p>Title</p>
          <p>Description</p>
          <p>Actions</p>
        </div>
        <hr />

        {list.map((item, index) => (
          <div key={index} className="index">
            <input
              className="indexinp"
              type="text"
              value={index === currentIndex ? input : item.title}
              readOnly={index !== currentIndex}
              onChange={index === currentIndex ? inputHandler : undefined}
            />
            <input
              type="text"
              value={index === currentIndex ? description : item.description}
              readOnly={index !== currentIndex}
              onChange={index === currentIndex ? descHandler : undefined}
              className="indexinp"
            />
            {index === currentIndex ? (
              <button className="done" onClick={doneEditing}>
                Done
              </button>
            ) : (
              <>
                <button className="edit" onClick={() => editItem(index)}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button className="delete" onClick={() => deleteItem(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
