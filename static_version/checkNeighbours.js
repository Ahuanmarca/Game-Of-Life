// Count how many alive cells surround the current cell
//      Arguments: the individual cell and the whole board, to check neighbours :/

const checkNeighbours = (cell, board) => {
    const i = cell.position[0];
    const j = cell.position[1];
    let aliveNeighbours = 0;

    const coordinatesChecklist = getCoordinatesChecklist(i, j);

    for (coordinate of coordinatesChecklist) {
        if (isInsideBoard(coordinate)) {
            if (board[coordinate[0]][coordinate[1]].life == 1) {
                aliveNeighbours++;
            }
        }
    }

    return aliveNeighbours;
}







// HELPERS !!! (COMMENT OUT WHEN TESTING WITH HTML PAGE)
/*
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

function isInsideBoard(coordinate) {
    if (coordinate[0] < 0 || coordinate[1] < 0) {
        return false;
    } else {
        return true;
    }
}

// MOCK GAME BOARD
const backBoard = []
for (i = 0, boardSize = 3; i < boardSize; i++) {
    const row = []
    for (j = 0; j < boardSize; j++) {
        const position = [i, j];
        const life = Math.random() > 0.5 ? 1 : 0;
        row.push({life: life, position: position});
    }
    backBoard.push(row)
}

// TEST LOCALLY
console.log(checkNeighbours({position: [0,0]}, backBoard))
*/