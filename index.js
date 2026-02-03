/*Setup*/
// Variables
const container = document.querySelector(".container");
const defaultSquareColor = "rgba(0, 0, 0, 0)";
const gridButton = document.querySelector(".sketch-grid button");
const newGridPopup = document.querySelector(".popup");
const submitButton = document.querySelector("#submit");
const cancelButton = document.querySelector("#cancel");
const rowForm = document.querySelector("#rows");
const columnForm = document.querySelector("#columns");

// Grid
let rows = 16;
let columns = 16;

let grid = [];

/*
Generate Grid of 'div' elements
Number of divs are based off rows and columns
*/
function createGrid(grid, rows, columns) {
    container.style.visibility = "visible";

    // Create grid of square divs
    for (let i = 0; i < rows; i++)
    {
        grid[i] = []; // make each row an array

        for (let j = 0; j < columns; j++)
        {
            grid[i][j] = document.createElement("div");
            container.appendChild(grid[i][j]);
            grid[i][j].classList.add("container-child");
            grid[i][j].style.flexBasis = `${(100/columns).toFixed(2)}%`;
            console.log(grid[i][j].style.flexBasis);
        }
    }
}

/*
Delete the children of current grid
*/
function deleteGrid(grid) {
    container.replaceChildren();
    grid = []; // clear the grid array
    container.style.visibility = "hidden";
}

/*
Generate a random RGB color
*/
function generateRandomColor() {
    let colorVar;
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    colorVar = `rgba(${red}, ${green}, ${blue})`;
    return colorVar;
}

/*
Reduce opacity of given color
Until fully opaque
*/
function increaseOpacity(opacity) {
    if (opacity != "1") {
        let increase = parseFloat(opacity);
        increase += 0.2;
        opacity = String(increase);
    }
    return opacity;
}

/*
Change the color of the current square
Based on the state of the square
*/
function changeColor(e) {
    let currentSquareColor = getComputedStyle(e.target).backgroundColor;
    let currentOpacity = getComputedStyle(e.target).opacity;
    
    // if first time -> random color
    if (currentSquareColor == defaultSquareColor) {
        e.target.style.backgroundColor = generateRandomColor();
        e.target.style.opacity = "0.1";
    }
    // if already colored - deepen color
    else { 
        e.target.style.opacity = increaseOpacity(currentOpacity);
    }
}

/* main */
createGrid(grid, rows, columns);

// When the mouse hovers over the grid - color the squares
container.addEventListener("mouseover", (e) => {
    // filter as event fires for parent too
    if (!e.target.classList.contains("container-child")) return;

    changeColor(e);
});

// When 'New Grid' button is clicked - open popup modal
gridButton.addEventListener("click", () => {
    newGridPopup.style.visibility = "visible";
})

// When the 'Cancel' button is clicked - close popup modal
cancelButton.addEventListener("click", () => {
    newGridPopup.style.visibility = "hidden";
})

// Prevent default behavior of forms
newGridPopup.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", (e)=> {
    e.preventDefault();

    // store form values in variables
    rows = rowForm.value.trim();
    columns = columnForm.value.trim();

    console.log(rows);
    console.log(rows);

    // clear forms
    rowForm.value = "";
    columnForm.value = "";

    // hide and exit popup
    newGridPopup.style.visibility = "hidden";

    // Create new grid with new values
    deleteGrid(grid);
    createGrid(grid, rows, columns);
    })
})

