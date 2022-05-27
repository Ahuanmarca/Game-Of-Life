// Return a 2D array that represents a grid filled with cells
//      Each cell contains:
//          - Dead or Alive status
//          - A div (that will be appended to the DOM)
//          - It's coordinates / position inside the grid
function createBackBoard(boardSize = 50) {
    const backBoard = [];
    for (i = 0; i < boardSize; i++) {
        const row = []
        for (j = 0; j < boardSize; j++) {
            const position = [i, j];
            // const life = Math.random() > 0.5 ? 1 : 0;
            const cell = document.createElement("div");

            const iString = i.toString();
            const jString = j.toString();

            cell.classList.add(`${iString},${jString}`);
            cell.classList.add("boardCell");

            cell.addEventListener("click", function(event){
                toggleCellLife(backBoard, event);
            });

            row.push({life: 0, cell: cell, position: position});
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

    const isAlive = backBoard[i][j].life;
    if (isAlive) {
        backBoard[i][j].life = 0;
    } else {
        backBoard[i][j].life = 1;
    }
    turnDeadCellsToBlack(backBoard);
}


// Count how many alive cells surround the current cell
//      Arguments: the individual cell and the whole board, to check neighbours :/
const checkNeighbours = (cell, board) => {
    const i = cell.position[0];
    const j = cell.position[1];
    let aliveNeighbours = 0;

    const coordinatesChecklist = getCoordinatesChecklist(i, j);

    for (coordinate of coordinatesChecklist) {
        if (isInsideBoard(coordinate, board.length)) {
            if (board[coordinate[0]][coordinate[1]].life == 1) {
                aliveNeighbours++;
            }
        }
    }
    return aliveNeighbours;
}

// Return empty temporal grid
const generateTemporalGrid = (size = 40) => {
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


// Turn dead cells to black and alive cells to white
function turn_DeathBlack_AliveWhite(backBoard) {
    const boardSize = backBoard.length;
    for (i = 0; i < boardSize; i++) {
        for (j = 0; j < boardSize; j++) {
            if (backBoard[i][j].life == 0) {
                backBoard[i][j].cell.style.backgroundColor = "black";
            } else {
                backBoard[i][j].cell.style.backgroundColor = "white";
            }
        }
    }
}


// Fill backBoard with random death of alive cells
function randomizeCells(backBoard) {
    for (row of backBoard) {
        for (cell of row) {
            const life = Math.random() > 0.5 ? 1 : 0;
            cell.life = life
        }
    }
}