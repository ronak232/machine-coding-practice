console.log("draggable coomponent");

const draggableCandy = document.querySelector(".candy");
const draggableArea = document.querySelectorAll(".drag-area");

// drag and drap events

let isDragged; // store the dragged elements

// drag event listener fires
draggableCandy.addEventListener("drag", handleOnDragItem);

// on drag start event listener fires
draggableCandy.addEventListener("dragstart", handleOnDragStart);

//function to handle drag start
function handleOnDragStart(e) {
  draggableArea.forEach((area) => {
    area.addEventListener("dragover", onDragOver);

    area.addEventListener("dragenter", onDragEnter);
    area.addEventListener("dragleave", onDragLeave);
    area.addEventListener("drop", onDragDrop);
    area.addEventListener("dragend", onDragEnd);
  });
  isDragged = e.target;
}

function handleOnDragItem(e) {
  isDragged = e.target;
}

function onDragOver(e) {
  e.preventDefault();
  e.target.classList.add("currentBox")
}

function onDragLeave(e) {
  e.target.classList.remove("currentBox")
}

function onDragDrop(e) {
  isDragged = e.target.append(isDragged);
  e.target.classList.remove("currentBox")
}

function onDragEnter(e) {
  e.target.classList.add("currentBox")
}

function onDragEnd(e) {
  setTimeout(() => {
    e.target.classList.remove("currentBox")
  }, 100)
}
