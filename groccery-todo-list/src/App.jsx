import { useEffect, useRef, useState } from "react";
import "./App.css";
import GrocceryItemList from "./Components/GrocceryItemList";
import Alerts from "./Components/Alerts";

function App() {
  const [name, setName] = useState("");
  const [todoItems, setListItems] = useState([]);
  const [isEditng, setIsEditing] = useState(false);
  const [itmeEditId, setItmeEditId] = useState(null);
  // To check the alert type green for success and red for deleting the item, and to show message and it's visibility...
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const inputRef = useRef(null);

  const alertFunction = (show = false, message = "", type = "") => {
    setShowAlert({ show, message, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //show alert for the empty input field
      alertFunction(true, "Enter some value", "danger");
    } else if (name && isEditng) {
      // deal with edit
    } else {
      // show alert for adding the item in the list.
      const newTodoList = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setListItems([...todoItems, newTodoList]);
      setName("");
      alertFunction(true, "Added to the list.", "success");
    }
  };

  const clearListItems = () => {
    alertFunction(true, "Empty List", "danger");
    // onclick we are setting the list items to empty
    setListItems([]);
  };

  const removeListItems = (id) => {
    setListItems(
      todoItems.filter(() => {
        (item) => item.id != id;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoItems));
    inputRef.current.focus();
  }, [todoItems]);

  return (
    <>
      <div className="container m-auto">
        <form className="form" onSubmit={handleSubmit}>
          {showAlert.show && (
            <Alerts alert={showAlert} removeAlert={alertFunction} />
          )}
          <div className="mt-3 mb-3">
            <label className="form-label">Add Groccery Item</label>
            <div className="d-flex">
              <input
                ref={inputRef}
                type="text"
                value={name}
                className="form-control"
                placeholder="add items..."
                onChange={(e) => setName(e.target.value)}
              />
              <button className="btn btn-primary ms-4 w-25">
                {isEditng ? "Edit" : "Add Item"}
              </button>
            </div>
          </div>
        </form>
        <GrocceryItemList
          items={todoItems}
          clearList={clearListItems}
          remove={removeListItems}
        />
      </div>
    </>
  );
}

export default App;
