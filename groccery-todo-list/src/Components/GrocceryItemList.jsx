import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function GrocceryItemList({ items, clearList, remove }) {
  return (
    <div className="groccery-list">
      <div className="row">
        {items.map((item) => {
          console.log(item);
          return (
            <article className="col-md-4" key={item.id}>
              <p>{item.title}</p>
              <div className="btn-container">
                <button>
                  <FaEdit />
                </button>
                <button onClick={remove(item.id)}>
                  <FaTrash />
                </button>
              </div>
            </article>
          );
        })}
      </div>
      {items.length > 0 && (
        <button className="m-auto w-50" onClick={clearList}>
          Clear Items
        </button>
      )}
    </div>
  );
}

export default GrocceryItemList;
