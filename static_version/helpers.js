// Return 2D array representing the content of the game board. Each cell needs: 
//      - Dead or Alive status
//      - A div that will be appended to the DOM. Each div needs:
//          - A click event listener to toggle Alive and Dead cells
//          - Contain it's own coordinates - Storing i, j position as a class
//          - The class "boardCell" - so I can select all cells later 
//      - It's coordinates / position inside the grid, stored also as an attribute in the backBoard array
function createBackBoard() {

    const boardSize = gameState.boardSize;

    // Nested loops with boardSize
    const backBoard = [];
    for (i = 0; i < boardSize; i++) {
        const row = []
        for (j = 0; j < boardSize; j++) {

            // Create div
            const cell = document.createElement("div");
            cell.classList.add(`${i.toString()},${j.toString()}`);
            cell.classList.add("boardCell");
            
            // Click event listener to toggle Cell's life
            cell.addEventListener("click", function(event){
                toggleCellLife(backBoard, event);
            });

            // Store
            row.push({life: 0, cell: cell, position: [i, j]});
        }
        backBoard.push(row);
    }
    return backBoard;
}


function toggleCellLife(backBoard, event) {
    
    const i = event.target.classList[0].split(",")[0]
    const j = event.target.classList[0].split(",")[1]

    // console.log(event.target.classList[0], backBoard);
    console.log(i, j, backBoard);
    backBoard[i][j].life = !backBoard[i][j].life;
    event.target.style.backgroundColor = backBoard[i][j].life ? "white" : "black";
}

// Set the Board Size in the front page
function adjustFrontBoardSize() {
    const cssBoardSize = `${gameState.cellSize * gameState.boardSize}px`;
    gameState.frontBoard.style.width = cssBoardSize;
    gameState.frontBoard.style.height = cssBoardSize;
}


// Append DIVS to frontBoard
// CELL SIZE IS DEFINED JUST BEFORE APPENDING... I don't like that
function appendCellsToFrontBoard() {
    
    // Remove all existing childs from the frontBoard
    while (gameState.frontBoard.firstElementChild) {
        gameState.frontBoard.removeChild(gameState.frontBoard.firstElementChild);
    }

    // Append childs from backBoard to frontBoard
    for (i = 0; i < gameState.boardSize; i++) {
        for (j = 0; j < gameState.boardSize; j++) {
            let cssCellSize = `${gameState.cellSize}px`
            gameState.backBoard[i][j].cell.style.width = cssCellSize;
            gameState.backBoard[i][j].cell.style.height = cssCellSize;
            gameState.frontBoard.appendChild(gameState.backBoard[i][j].cell);
        }
    }
}


// Count how many alive cells surround the current cell
//      This function should retunr a different value
//      ...depending on gameState.wrap

const countAliveNeighbours = (cellPosition, gameState) => {

    // Remember cell position and alive neighbours
    const i = cellPosition[0];
    const j = cellPosition[1];
    let aliveNeighbours = 0;

    // Create a list containing the coordinates of the surrounding Cells (to be checked)
    
    if (gameState.wrap == false) {
        // WRAP IS SET TO FALSE, BORDER CELLS ARE CONSIDERED DEAD
        // Create non-wraping coordinates check list with coordinates of surrounding cells
        const coordinatesChecklist = getCoordinatesChecklist(i, j);
        for (coordinate of coordinatesChecklist) {
            if (isInsideBoard(coordinate, gameState.backBoard.length)) {
                if (gameState.backBoard[coordinate[0]][coordinate[1]].life == 1) {
                    aliveNeighbours++;
                }
            }
        }
    } else {
        // WRAP IS SET TO TRUE, BORDER CELLS WRAP AROUND
        // Create a wraping list containing the coordinates of the Cells to be checked
        const wrapingChecklist = getWrapingChecklist(i, j);
        for (coordinate of wrapingChecklist) {
            if (gameState.backBoard[coordinate[0]][coordinate[1]].life == 1) {
                aliveNeighbours++;
            }
        }
    }
    return aliveNeighbours;
}

// Return empty temporal grid
const generateTemporalGrid = () => {

    const size = gameState.boardSize;

    const tmpGrid = [];
    for (i = 0; i < size; i++) {
        const tmpRow = [];
        for (j = 0; j < size; j++) {
            tmpRow.push(undefined);
        }
        tmpGrid.push(tmpRow);
    }
    return tmpGrid;
}

// Check if a coordinate is inside the board (or not)
const isInsideBoard = (coordinate, boardLength) => {
    if (coordinate[0] < 0 || coordinate[1] < 0 || coordinate[0] > boardLength - 1|| coordinate[1] > boardLength - 1) {
        return false;
    } else {
        return true;
    }
}

// Return a list of coordinates to be checked for alive cells
function getCoordinatesChecklist(i, j) {
    const coordinatesChecklist = []
    coordinatesChecklist.push([i-1, j-1])
    coordinatesChecklist.push([i-1, j])
    coordinatesChecklist.push([i-1, j+1])
    coordinatesChecklist.push([i, j-1])
    coordinatesChecklist.push([i, j+1])
    coordinatesChecklist.push([i+1, j-1])
    coordinatesChecklist.push([i+1, j])
    coordinatesChecklist.push([i+1, j+1])
    return coordinatesChecklist;
}

// Return a list of coordinates to be checked for alive cells
function getWrapingChecklist(i, j) {
    const coordinatesChecklist = []
    const lastIndex = gameState.backBoard.length - 1;

    let iWrap = undefined;
    let jWrap = undefined;

    iWrap = i - 1 < 0 ? lastIndex : i - 1
    jWrap = j - 1 < 0 ? lastIndex : j - 1 
    coordinatesChecklist.push([iWrap, jWrap]);
    
    iWrap = i - 1 < 0 ? lastIndex : i - 1
    jWrap = j
    coordinatesChecklist.push([iWrap, jWrap]);
    
    iWrap = i - 1 < 0 ? lastIndex : i - 1
    jWrap = j + 1 > lastIndex ? 0 : j + 1 
    coordinatesChecklist.push([iWrap, jWrap]);

    iWrap = i
    jWrap = j - 1 < 0 ? lastIndex : j - 1
    coordinatesChecklist.push([iWrap, jWrap])

    iWrap = i
    jWrap = j + 1 > lastIndex ? 0 : j + 1
    coordinatesChecklist.push([iWrap, jWrap])

    iWrap = i + 1 > lastIndex ? 0 : i + 1
    jWrap = j - 1 < 0 ? lastIndex : j - 1
    coordinatesChecklist.push([iWrap, jWrap])

    iWrap = i + 1 > lastIndex ? 0 : i + 1
    jWrap = j
    coordinatesChecklist.push([iWrap, jWrap])

    iWrap = i + 1 > lastIndex ? 0 : i + 1
    jWrap = j + 1 > lastIndex ? 0 : j + 1
    coordinatesChecklist.push([iWrap, jWrap])

    return coordinatesChecklist;
}

// Turn dead cells to black and alive cells to white
function paintDeadAndAliveCells() {
    const boardSize = gameState.backBoard.length;
    for (i = 0; i < boardSize; i++) {
        for (j = 0; j < boardSize; j++) {
            if (gameState.backBoard[i][j].life == 0) {
                gameState.backBoard[i][j].cell.style.backgroundColor = "black";
            } else {
                gameState.backBoard[i][j].cell.style.backgroundColor = "white";
            }
        }
    }
}

// Fill backBoard with random death of alive cells
function randomizeDeadAndAliveCells() {
    for (row of gameState.backBoard) {
        for (cell of row) {
            const chance = gameState.aliveChance
            const life = Math.random() < chance ? 1 : 0;
            cell.life = life
        }
    }
}