const grid = document.querySelector(".grid");
const root = document.querySelector(":root");
const changeSizeButton = document.querySelector(".change-size-button");
const sizeDropdown = document.querySelector(".size-dropdown");
const colorSelector = document.querySelector(".color-selector");

let gridXLength = 64;
let gridSquareDimensions = getComputedStyle(root).getPropertyValue("--GRID-SQUARE-DIMENSIONS");

root.style.setProperty("--GRID-COLOR", "blue");
createGrid();

grid.addEventListener("mouseover", (e) => {
    e.target.classList.add('enter');
});

grid.addEventListener("mouseout", (e) => {
    setTimeout(() => {
        e.target.classList.remove('enter');
    }, 25);
});

let isDragging = false;

grid.addEventListener("mousedown", (e) => {
  isDragging = true;
  e.target.style.backgroundColor = root.style.getPropertyValue("--GRID-COLOR");
});

grid.addEventListener("mousemove", (e) => {
  if (isDragging && e.buttons === 1) {
    e.target.style.backgroundColor = root.style.getPropertyValue("--GRID-COLOR");
  }
});

window.addEventListener("mouseup", (e) => {
  isDragging = false;
});

grid.addEventListener("click", (e) => {
   e.target.style.backgroundColor = root.style.getPropertyValue("--GRID-COLOR");
});

changeSizeButton.addEventListener("click", () => {
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
    let selectedOption = sizeDropdown.options[sizeDropdown.selectedIndex].id;
    console.log(selectedOption);
    gridXLength = parseInt(selectedOption);

    createGrid();
});

colorSelector.addEventListener("click", (e) => {
    let selectedColor = e.target.id;
    console.log(selectedColor);
    root.style.setProperty("--GRID-COLOR", selectedColor);
    const colorOptions = colorSelector.querySelectorAll(".color-option");
    colorOptions.forEach(child => {
        child.classList.remove("selected");
    })
    // for each child of the .color-selector element, remove the "selected" class
    // add the selected class to the target
    e.target.classList.add("selected")
})



function createGrid() {
    let gridWidth = parseFloat(getComputedStyle(root).getPropertyValue("--GRID-WIDTH"));
    let idealGridWidth = (gridWidth/gridXLength);
    root.style.setProperty("--GRID-SQUARE-DIMENSIONS", idealGridWidth + "px");
    const grid = document.querySelector(".grid");
    for(let i = 1; i<= gridXLength; i++) {
        for(let k = 1; k <= gridXLength; k++) {
            let newDiv = document.createElement("div");
            newDiv.classList.add("grid-square");
            grid.appendChild(newDiv);
        }
    }
}


