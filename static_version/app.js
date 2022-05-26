const boardProperties = {
    boardSize: 50
}


// Create gameBoard representation, all cells are dead
let backBoard = createBackBoard(boardProperties.boardSize);

// Create a grid in the DOM, populate it with the backBoard cells
const frontBoard = document.querySelector("#gameBoard");

let modifiedSize = `${10 * boardProperties.boardSize}px`;
frontBoard.style.width = modifiedSize;
frontBoard.style.height = modifiedSize;

// Append DIVS to frontBoard
for (i = 0; i < boardProperties.boardSize; i++) {
    for (j = 0; j < boardProperties.boardSize; j++) {
        frontBoard.appendChild(backBoard[i][j].cell);
    }
}

randomizeCells(backBoard);

// Turn dead cells to black, alive cells to white
turn_DeathBlack_AliveWhite(backBoard);

function nextGeneration() {

    // Iterate board checking:
    //      Is cell alive or dear?
    //      Count alive neighbours
    //      Define if cell is alive or dead next turn

    // Temporal grid for storing next generation
    const temporalGrid = generateTemporalGrid(boardProperties.boardSize);

    // Iterate current board
    for (i = 0; i < boardProperties.boardSize; i++) {
        for (j = 0; j < boardProperties.boardSize; j++) {
            
            // Remember if cell is alive or dead
            const isAlive = backBoard[i][j].life

            // Count alive neighbours
            const aliveNeighbours = checkNeighbours(backBoard[i][j], backBoard);
            
            // Save new cell status to Temporal Grid
            if (isAlive == 1) {
                if (aliveNeighbours == 2 || aliveNeighbours == 3) {
                    temporalGrid[i][j] = 1
                } else {
                    temporalGrid[i][j] = 0
                }
            } else {
                if (aliveNeighbours == 3) {
                    temporalGrid[i][j] = 1
                } else {
                    temporalGrid[i][j] = 0
                }
            }

            // Console Logs
            // console.log(isAlive)
            // console.log(aliveNeighbours)
        }
    }
    // console.log(temporalGrid);

    for (i = 0; i < boardProperties.boardSize; i++) {
        for (j = 0; j < boardProperties.boardSize; j++) {
            backBoard[i][j].life = temporalGrid[i][j]
        }
    }

    turn_DeathBlack_AliveWhite(backBoard);
}


/*
██████╗ ██╗   ██╗████████╗████████╗ ██████╗ ███╗   ██╗███████╗
██╔══██╗██║   ██║╚══██╔══╝╚══██╔══╝██╔═══██╗████╗  ██║██╔════╝
██████╔╝██║   ██║   ██║      ██║   ██║   ██║██╔██╗ ██║███████╗
██╔══██╗██║   ██║   ██║      ██║   ██║   ██║██║╚██╗██║╚════██║
██████╔╝╚██████╔╝   ██║      ██║   ╚██████╔╝██║ ╚████║███████║
╚═════╝  ╚═════╝    ╚═╝      ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚══════╝
*/

const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");
const clearAllButton = document.querySelector("#clearBoard");
const boardSizeForm = document.querySelector("#boardSizeForm");

let intervalID = undefined;

startButton.addEventListener("click", () => {
    if (intervalID) {
        clearInterval(intervalID)
    }
    intervalID = setInterval(() => {
        nextGeneration();
    }, 100);
});

stopButton.addEventListener("click", () => {
    clearInterval(intervalID)
});

resetButton.addEventListener("click", () => {
    randomizeCells(backBoard);
    turn_DeathBlack_AliveWhite(backBoard);
});

clearAllButton.addEventListener("click", () => {
    for (row of backBoard) {
        for (cell of row) {
            cell.life = 0;
        }
    }
    turn_DeathBlack_AliveWhite(backBoard);
});

boardSizeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newSize = event.target.elements.boardSizeInput.value;

    // Rebuild the backBoard
    backBoard = createBackBoard(newSize);
    randomizeCells(backBoard);
    
    // Rebuild the frontBoard
    
    // Remove all childs from the frontBoard
    while (frontBoard.firstElementChild) {
        frontBoard.removeChild(frontBoard.firstElementChild);
    }
    
    // Change the CSS size of the board
    let newSizeStr = `${10 * newSize}px`;
    frontBoard.style.width = newSizeStr;
    frontBoard.style.height = newSizeStr;
    
    // Append new childs to the frontBoard
    for (i = 0; i < newSize; i++) {
        for (j = 0; j < newSize; j++) {
            frontBoard.appendChild(backBoard[i][j].cell);
        }
    }

    // Turn death cells to black and white cells to white
    turn_DeathBlack_AliveWhite(backBoard);    

    // Update size propertie at the top
    boardProperties.boardSize= newSize;
    console.log(boardProperties.boardSize);
});
