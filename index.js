/*Setup*/
// Variables
const container = document.querySelector(".container");
const defaultSquareColor = "rgba(0, 0, 0, 0)";
const gridButton = document.querySelector(".sketch-grid button");
const newGridPopup = document.querySelector(".popup");

// Grid
let rows = 16;
let columns = 16;

const grid = [];

/*
Generate Grid of 'div' elements
Number of divs are based off rows and columns
*/
function createGrid(grid, rows, columns) {
    // Create 16x16 grid of square divs
    for (let i = 0; i < rows; i++)
    {
        grid[i] = []; // make each row an array

        for (let j = 0; j < columns; j++)
        {
            grid[i][j] = document.createElement("div");
            container.appendChild(grid[i][j]);
            grid[i][j].classList.add("container-child");
        }
    }
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

// on Hover call changeColor():
container.addEventListener("mouseover", (e) => {
    // filter as event fires for parent too
    if (!e.target.classList.contains("container-child")) return;

    changeColor(e);
});

gridButton.addEventListener("click", (e) => {
    newGridPopup.style.visibility = "visible";
})
