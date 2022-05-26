// Return a 2D array that represents a grid filled with cells
//      Each cell contains:
//          - Dead or Alive status
//          - A div (that will be appended to the DOM)
//          - It's coordinates / position inside the grid
function createBackBoard(boardSize = 40) {
    const backBoard = [];
    console.log(boardSize)
    for (i = 0; i < boardSize; i++) {
        const row = []
        for (j = 0; j < boardSize; j++) {
            const position = [i, j];
            // const life = Math.random() > 0.5 ? 1 : 0;
            const cell = document.createElement("div");

            const iString = i.toString();
            const jString = j.toString();

            cell.classList.add(`${iString},${jString}`);

            cell.addEventListener("click", function(event){

                toggleCellLife(backBoard, event);
            });

            row.push({life: 0, cell: cell, position: position});
        }
        backBoard.push(row);
    }
    return backBoard;
}

// Toggle Alive / Dead Cells
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

