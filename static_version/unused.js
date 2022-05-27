function returnEmptyBackBoard() {
    const emptyBackBoard = [];
    const boardSize = gameState.boardSize;

    for (i = 0; i < boardSize; i++) {
        const row = []
        for (j = 0; j < boardSize; j++) {
            row.push([]);
        }
        emptyBackBoard.push([]);
    }
    return emptyBackBoard;
}