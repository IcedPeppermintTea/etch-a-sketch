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
const overlay = document.querySelector(".overlay");

// Grid
let rows = 16;
let columns = 16;

let grid = [];

/*
Generate Grid of 'div' elements
Number of divs are based off rows and columns
*/
function createGrid(grid, rows, columns) {
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
Increase opacity of given color
Until fully visible
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
        e.target.style.opacity = "0.2";
    }
    // if already colored - deepen color
    else { 
        e.target.style.opacity = increaseOpacity(currentOpacity);
    }
}

function submitForms() {
    // store form values in variables
    rows = rowForm.value.trim();
    columns = columnForm.value.trim();

    // Validate values
    if (rows == "" || columns == "") {
        return;
    }

    // clear forms
    rowForm.value = "";
    columnForm.value = "";

    // hide and exit popup
    newGridPopup.classList.add("hidden");
    overlay.classList.add("hidden");

    // Create new grid with new values
    deleteGrid(grid);
    createGrid(grid, rows, columns); 
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
    newGridPopup.classList.remove("hidden");
    overlay.classList.remove("hidden");
})

// When the 'Cancel' button is clicked - close popup modal
cancelButton.addEventListener("click", () => {
    newGridPopup.classList.add("hidden");
    overlay.classList.add("hidden");
})



// Prevent default behavior of forms
newGridPopup.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", (e)=> {
    e.preventDefault();

    submitForms();
    })
})