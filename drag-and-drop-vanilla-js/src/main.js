const draggableArea = document.querySelectorAll(".drag-area");
const imageShow = document.querySelector("#img-show");
const dragUploadFile = document.getElementById("file-upload");
const drag_img = document.querySelector(".drag-img");
const label_Onupload = document.getElementById("upload-label");

// drag and drap events
let isDragged; // manage the state dragged elements zone

dragUploadFile.addEventListener("change", (e) => {
  if (e.target.files.length > 3) {
    label_Onupload.style.display = "flex";
    alert("upload not more than 3 images...");
  } else if (e.target.files.length <= 3) {
    displayMultipleImages(e.target.files);
    label_Onupload.style.display = "none";
    return;
  }
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
  e.dataTransfer.dropEffect = "move";
  e.target.classList.add("currentBox");
}

function onDragLeave(e) {
  e.target.classList.remove("currentBox");
}

function onDragDrop(e) {
  e.preventDefault();
  e.target.classList.remove("currentBox");
  const dropTarget = e.target.closest(".drag-area");
  if (!dropTarget) return;
  for (let file of e.dataTransfer.files) {
    if (file.type === "image/*") {
      displayMultipleImages(file);
    }
    if (isDragged) {
      if (dropTarget !== isDragged.parentElement) {
        dropTarget.appendChild(isDragged);
      }
    }
  }
}

function onDragEnter(e) {
  e.target.classList.add("currentBox");
}

function onDragEnd(e) {
  let checkLength = dropZonEmptyCheck(imageShow);
  if (checkLength <= 1) {
    label_Onupload.style.display = "none";
  } else {
    label_Onupload.style.display = "flex";
  }

  setTimeout(() => {
    e.target.classList.add("hoverLeave");
  }, 100);
}

function dropZonEmptyCheck(image) {
  const imageCount = image.querySelectorAll("img").length;
  if (imageCount) {
    return true;
  }
}

// handling multiple files
function displayMultipleImages(files) {
  for (let file of files) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let image = new Image();
      image.src = reader.result;
      image.style.display = "block";
      image.className = "drag-img";
      image.setAttribute("draggable", "true");
      image.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text/plain", image.src);
        isDragged = e.target;
      });
      imageShow.appendChild(image);
    };
  }
}
