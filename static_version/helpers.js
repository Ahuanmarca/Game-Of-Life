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
const isInsideBoard = (coordinate) => {
    if (coordinate[0] < 0 || coordinate[1] < 0 || coordinate[0] > 39|| coordinate[1] > 39) {
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

// Turn all dead cells to black
// Turn all dead cells to black

function turnDeadCellsToBlack(backBoard) {

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
