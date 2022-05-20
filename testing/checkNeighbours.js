// Count how many alive cells surround the current cell
const checkNeighbours = cell => {
    const i = cell.position[0];
    const j = cell.position[1];
    let aliveNeighbours = 0;

    const positionsCheckList = []
    positionsCheckList.push([i-1, j-1])
    positionsCheckList.push([i-1, j])
    positionsCheckList.push([i-1, j+1])
    positionsCheckList.push([i, j-1])
    positionsCheckList.push([i, j+1])
    positionsCheckList.push([i+1, j-1])
    positionsCheckList.push([i+1, j])
    positionsCheckList.push([i+1, j+1])

    console.log(positionsCheckList)
    // if (i - 1 >= 0) {

    // }
}


// TEST 1
checkNeighbours(
    {
        position: [0,0]
    }
)