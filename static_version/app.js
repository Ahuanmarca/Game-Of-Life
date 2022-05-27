// Object with variables needed by the functions
const gameState = {
    boardSize: 50,
    cellSize: 5,
    frontBoard: document.querySelector("#gameBoard"),
    backBoard: createBackBoard(50),
    interval: 100,
    aliveChance: 0.3,
    wrap: true
}

function buildBoard() {
    adjustFrontBoardSize(gameState);
    appendCellsToFrontBoard(gameState);
    randomizeDeadAndAliveCells(gameState);
    paintDeadAndAliveCells(gameState);
}

buildBoard();

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

            // Remember the cell's position
            const cellPosition = [i, j];

            // Count alive neighbours
            const aliveNeighbours = countAliveNeighbours(cellPosition, gameState);
            // const aliveNeighbours = countAliveNeighbours(gameState.backBoard[i][j], gameState.backBoard);
            
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
        }
    }

    for (i = 0; i < gameState.boardSize; i++) {
        for (j = 0; j < gameState.boardSize; j++) {
            gameState.backBoard[i][j].life = temporalGrid[i][j]
        }
    }

    paintDeadAndAliveCells(gameState);
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
    randomizeDeadAndAliveCells(gameState);
    paintDeadAndAliveCells(gameState);
});

clearAllButton.addEventListener("click", () => {
    for (row of gameState.backBoard) {
        for (cell of row) {
            cell.life = 0;
        }
    }
    paintDeadAndAliveCells(gameState);
});

boardSizeForm.addEventListener("submit", (event) => {

    event.preventDefault();

    // Update board size on properties
    gameState.boardSize= event.target.elements.boardSizeInput.value;

    // Update (rebuild) the backBoard with new size
    gameState.backBoard = createBackBoard(gameState.boardSize);

    // Rebuild the whole board with new size
    buildBoard();

});
