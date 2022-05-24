// Return a 2D array that represents a grid filled with cells
//      Each cell contains:
//          - Dead or Alive status
//          - A div (that will be appended to the DOM)
//          - It's coordinates / position inside the grid
function createBackBoard(boardSize = 40) {
    const backBoard = [];
    for (i = 0; i < boardSize; i++) {
        const row = []
        for (j = 0; j < boardSize; j++) {
            const position = [i, j];
            // const life = Math.random() > 0.5 ? 1 : 0;
            const cell = document.createElement("div");
            row.push({life: 0, cell: cell, position: position});
        }
        backBoard.push(row);
    }
    return backBoard;
}


