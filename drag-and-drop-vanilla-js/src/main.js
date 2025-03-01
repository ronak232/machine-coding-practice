const draggableArea = document.querySelectorAll(".drag-area");
const imageShow = document.querySelector("#img-show");
const dragUploadFile = document.getElementById("file-upload");
const drag_img = document.querySelector(".drag-img");

// drag and drap events
let isDragged; // store the dragged elements

dragUploadFile.addEventListener("change", (e) => {
  displayMultipleImages(e.target.files);
});

//function to handle drag start
draggableArea.forEach((area) => {
  area.addEventListener("dragover", onDragOver);
  area.addEventListener("dragenter", onDragEnter);
  area.addEventListener("dragleave", onDragLeave);
  area.addEventListener("drop", onDragDrop);
  area.addEventListener("dragend", onDragEnd);
});

function handleOnDragItem(e) {
  isDragged = e.target;
}

function onDragOver(e) {
  e.stopPropagation();
  e.preventDefault();
  e.target.classList.add("currentBox");
}

function onDragLeave(e) {
  e.target.classList.remove("currentBox");
}

function onDragDrop(e) {
  e.preventDefault();
  e.target.classList.remove("currentBox");
  const dropTarget = e.target.closest('.drag-area');
  if (!dropTarget) return;
  
  if (isDragged && isDragged.tagName === 'IMG') {
    if (dropTarget !== isDragged.parentElement) {
      dropTarget.appendChild(isDragged);
    }
  }
}

function onDragEnter(e) {
  e.target.classList.add("currentBox");
}

function onDragEnd(e) {
  setTimeout(() => {
    e.target.classList.add("hoverLeave");
  }, 100);
}

// handling multiple files
function displayMultipleImages(files) {
  for (let file of files) {
    if (!file && !file.type("image/*")) {
      return false;
    }
  }

  for (let file of files) {
    let reader = new FileReader();
    reader.onload = () => {
      let image = new Image();
      image.src = reader.result;
      image.style.display = "block";
      image.className = "drag-img";
      image.setAttribute('draggable', 'true');
      image.addEventListener('dragstart', function(e) {
        isDragged = e.target;
      });
      imageShow.appendChild(image);
    };
    reader.readAsDataURL(file);
  }
}
