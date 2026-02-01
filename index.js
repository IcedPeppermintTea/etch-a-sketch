/*Setup*/
// Variables

const container = document.querySelector(".container");

// Grid
let rows = 16;
let columns = 16;

const grid = [];

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



