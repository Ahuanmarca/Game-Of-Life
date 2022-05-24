// PUSHING FROM UBUNTU TERMINAL

const boardProperties = {
    boardSize: 40
}

// Create gameBoard representation, all cells are dead
const backBoard = createBackBoard(boardProperties.boardSize);

// Create a grid in the DOM, populate it with the backBoard cells
const frontBoard = document.querySelector("#gameBoard");
for (i = 0; i < boardProperties.boardSize; i++) {
    for (j = 0; j < boardProperties.boardSize; j++) {
        frontBoard.appendChild(backBoard[i][j].cell);
    }
}

// Fill backBoard with random death of alive cells
function randomizeCells() {
    for (row of backBoard) {
        for (cell of row) {
            const life = Math.random() > 0.5 ? 1 : 0;
            cell.life = life
        }
    }
}
randomizeCells();

// Turn dead cells to black, alive cells to white
turnDeadCellsToBlack(backBoard);

function nextGeneration() {

    // Iterate board checking:
    //      Is cell alive or dear?
    //      Count alive neighbours
    //      Define if cell is alive or dead next turn

    // Temporal grid for storing next generation
    const temporalGrid = generateTemporalGrid();

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

    turnDeadCellsToBlack(backBoard);
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
    randomizeCells();
    turnDeadCellsToBlack(backBoard);
});

