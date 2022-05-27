// Object with variables needed by the functions
const gameState = {
    boardSize: 50,
    cellSize: 10,
    frontBoard: document.querySelector("#gameBoard"),
    backBoard: createBackBoard(50),
    interval: 100,
    alivePercentage: 0.5
}

// Create gameBoard representation, all cells are dead
// gameState.backBoard = createBackBoard(gameState.boardSize);

// Create a grid in the DOM, populate it with the backBoard cells
// const frontBoard = document.querySelector("#gameBoard");

// Adjust cell size
// let cssCellSize = `${gameState.cellSize}px`
// const frontBoardCells = document.querySelectorAll(".boardCell");
// console.log(frontBoardCells);
// let foo = document.querySelectorAll(".boardCell");
// console.log(foo);
// const frontBoardCells = document.querySelectorAll("#gameBoard > div");


let cssBoardSize = `${gameState.cellSize * gameState.boardSize}px`;
gameState.frontBoard.style.width = cssBoardSize;
gameState.frontBoard.style.height = cssBoardSize;

// Append DIVS to frontBoard
for (i = 0; i < gameState.boardSize; i++) {
    for (j = 0; j < gameState.boardSize; j++) {
        let cssCellSize = `${gameState.cellSize}px`
        gameState.backBoard[i][j].cell.style.width = cssCellSize;
        gameState.backBoard[i][j].cell.style.height = cssCellSize;
        gameState.frontBoard.appendChild(gameState.backBoard[i][j].cell);
    }
}

randomizeCells(gameState.backBoard);

// Turn dead cells to black, alive cells to white
turn_DeathBlack_AliveWhite(gameState.backBoard);

function nextGeneration() {

    // Iterate board checking:
    //      Is cell alive or dear?
    //      Count alive neighbours
    //      Define if cell is alive or dead next turn

    // Temporal grid for storing next generation
    const temporalGrid = generateTemporalGrid(gameState.boardSize);

    // Iterate current board
    for (i = 0; i < gameState.boardSize; i++) {
        for (j = 0; j < gameState.boardSize; j++) {
            
            // Remember if cell is alive or dead
            const isAlive = gameState.backBoard[i][j].life

            // Count alive neighbours
            const aliveNeighbours = checkNeighbours(gameState.backBoard[i][j], gameState.backBoard);
            
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

    for (i = 0; i < gameState.boardSize; i++) {
        for (j = 0; j < gameState.boardSize; j++) {
            gameState.backBoard[i][j].life = temporalGrid[i][j]
        }
    }

    turn_DeathBlack_AliveWhite(gameState.backBoard);
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
    }, gameState.interval);
});

stopButton.addEventListener("click", () => {
    clearInterval(intervalID)
});

resetButton.addEventListener("click", () => {
    randomizeCells(gameState.backBoard);
    turn_DeathBlack_AliveWhite(gameState.backBoard);
});

clearAllButton.addEventListener("click", () => {
    for (row of gameState.backBoard) {
        for (cell of row) {
            cell.life = 0;
        }
    }
    turn_DeathBlack_AliveWhite(gameState.backBoard);
});

boardSizeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newSize = event.target.elements.boardSizeInput.value;

    // Rebuild the backBoard
    gameState.backBoard = createBackBoard(newSize);
    randomizeCells(gameState.backBoard);
    
    // Rebuild the frontBoard
    
    // Remove all childs from the frontBoard
    while (gameState.frontBoard.firstElementChild) {
        gameState.frontBoard.removeChild(gameState.frontBoard.firstElementChild);
    }
    
    // Change the CSS size of the board
    let newSizeStr = `${10 * newSize}px`;
    gameState.frontBoard.style.width = newSizeStr;
    gameState.frontBoard.style.height = newSizeStr;
    
    // Append new childs to the frontBoard
    for (i = 0; i < newSize; i++) {
        for (j = 0; j < newSize; j++) {
            gameState.frontBoard.appendChild(gameState.backBoard[i][j].cell);
        }
    }

    // Turn death cells to black and white cells to white
    turn_DeathBlack_AliveWhite(gameState.backBoard);    

    // Update size propertie at the top
    gameState.boardSize= newSize;
    console.log(gameState.boardSize);
});
