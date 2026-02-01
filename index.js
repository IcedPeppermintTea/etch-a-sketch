/*Setup*/
// Variables
const container = document.querySelector(".container");
const defaultSquareColor = "rgb(233, 228, 218)";

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

    colorVar = `rgb(${red}, ${green}, ${blue})`;
    return colorVar;
}

/*
Change the color of the current square
Based on the state of the square
*/
function changeColor(e) {
    let currentSquareColor = getComputedStyle(e.target).backgroundColor;

    //console.log(currentSquareColor);
    
    // if first time -> random color
    if (currentSquareColor == defaultSquareColor) {
        e.target.style.backgroundColor = generateRandomColor();
        console.log(currentSquareColor);
    }
    else { // if already colored - deepen color
        currentSquareColor = darkenColor();
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

 // randomly change the color of the div
 // deepen the color by 10% when hovering again