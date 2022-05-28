// Object with variables needed by the functions
const gameState = {
    boardSize: 50,
    cellSize: 10,
    frontBoard: document.querySelector("#gameBoard"),
    backBoard: undefined,
    speed: 50,
    interval: 100,
    population: 30,
    aliveChance: 0.3,
    wrap: true,
    running: false
}

function buildBoard() {
    gameState.backBoard = createBackBoard();
    adjustFrontBoardSize();
    appendCellsToFrontBoard();
    randomizeDeadAndAliveCells();
    paintDeadAndAliveCells();
}

buildBoard();

(function resetControls() {
    document.querySelector("#boardSizeInput").value = gameState.boardSize
    document.querySelector("#showSize").innerText = gameState.boardSize
    document.querySelector("#populationInput").value = parseInt(gameState.aliveChance * 100);
    document.querySelector("#showPopulation").innerText = (gameState.aliveChance * 100).toString();
    document.querySelector("#speedInput").value = gameState.speed
    document.querySelector("#showSpeed").innerText = gameState.speed
})()

function nextGeneration() {

    // Iterate board:
    //      Is cell alive or dear?
    //      Count alive neighbours
    //      Change (or not) current cell's life

    // Temporal grid for storing next generation
    const temporalGrid = generateTemporalGrid();

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
const wrapSwitch = document.querySelector("#wrapSwitch");
const speedSlider = document.querySelector("#speedInput");
const populationSlider = document.querySelector("#populationInput");
const topButtons = document.querySelectorAll(".topButtons");

let intervalID = undefined;

for (btn of topButtons) {
    btn.addEventListener("mouseup", function () {
        setTimeout(() => {
            this.blur();
        }, 100)
    })
}

startButton.addEventListener("click", () => {
    startSimulation();    
});

function startSimulation() {
    gameState.running = true
    clearInterval(intervalID)
    intervalID = setInterval(() => {
        nextGeneration();
    }, gameState.interval);
}

stopButton.addEventListener("click", () => {
    stopSimulation();
});

function stopSimulation() {
    gameState.running = false;
    clearInterval(intervalID)
}

resetButton.addEventListener("click", () => {
    randomizeDeadAndAliveCells();
    paintDeadAndAliveCells();
});

clearAllButton.addEventListener("click", () => {
    for (row of gameState.backBoard) {
        for (cell of row) {
            cell.life = 0;
        }
    }
    paintDeadAndAliveCells();
});

const boardSizeSlider = document.querySelector("#boardSizeInput");
boardSizeSlider.addEventListener("input", function() {
    document.querySelector("#showSize").innerText = this.value
});

boardSizeSlider.addEventListener("change", function() {
    gameState.boardSize = this.value;
    console.log(gameState.boardSize);
    stopSimulation();
    buildBoard();
})

wrapSwitch.addEventListener("change", function() {
    if (this.checked) {
        gameState.wrap = true;
    } else {
        gameState.wrap = false;
    }
});


// Dinamically change speed shown in front page
speedSlider.addEventListener("input", function() {
    document.querySelector("#showSpeed").innerText = this.value;
})

// Change simulation speed when releasing the button
speedSlider.addEventListener("change", function() {
    gameState.speed = this.value

    if (gameState.speed >= 50) {
        gameState.interval = 200 - this.value * 2
    } else {
        gameState.interval = parseInt(5000 / this.value);
    }

    console.log(gameState.interval);

    if (gameState.running) {
        stopSimulation();
        startSimulation();
    }
});


populationSlider.addEventListener("input", function() {
    gameState.population = this.value;
    document.querySelector("#showPopulation").innerText = gameState.population;
});

populationSlider.addEventListener("change", function() {
    gameState.aliveChance = this.value / 100;
    stopSimulation();
    buildBoard();
});