var container = document.body;

var createBoardContainer = function() {
    var board = document.createElement('div');
    board.classList.add('container');
    return board;
};

var randomWorld = function(numRows, numCols) {
    startArray = [];
    var coinFlip = null;
    for (var i = 0; i < numRows; i++) {
        startArray.push([]);
        for (var j = 0; j < numCols; j++) {
            var coinFlip = Math.round(Math.random());
            if (coinFlip === 0){
                startArray[i].push(true);
            }
            else {
                startArray[i].push(false);
            }
        }
    }
    return startArray;
}
world = randomWorld(150, 150);
var gameOfLife = function(seed) {
    var boardContainer = createBoardContainer();
    var newWorld = [];
    for (var row = 0; row < seed.length; row++) {
        var rowDom = createGridRow(row);

        newWorld.push([]);
        for (var column = 0; column < seed[0].length; column++) {
            if (seed[row][column] === true) {
                if (neighborsAlive(seed, row, column) === (2 || 3)) {
                    createGridItem(rowDom, column, true);
                    newWorld[row].push(true);
                    continue;
                }; 
            } else if (neighborsAlive(seed, row, column) === 3){
                    createGridItem(rowDom, column, true);
                    newWorld[row].push(true);
                    continue;
                };
                createGridItem(rowDom, column, false);
                newWorld[row].push(false);
            }
            boardContainer.appendChild(rowDom);
        }
    world = newWorld;
    return boardContainer;
}
var neighborsAlive = function (seed, myRow, myColumn) {
    var myself = seed[myRow][myColumn];
    var aliveCount = 0;
    for (var currentRow = Math.max(0, myRow - 1); currentRow < Math.min(seed.length, myRow + 2); currentRow++) {
        for (var currentColumn = Math.max(0, myColumn - 1); currentColumn < Math.min(seed[0].length, myColumn + 2); currentColumn++) {
            if (seed[currentRow][currentColumn] === true){
                aliveCount++;
            };
        };
    };
    if (myself === true) {
        aliveCount -= 1;
    }
    return aliveCount;
};

var createGridRow = function(currentRow) {
    var row = document.createElement('div');
    row.setAttribute('data-row-index', currentRow)
    row.classList.add('row-container');
    return row;
  };
var createGridItem = function(rowDom, currentColumn, isAlive) {
    var item = document.createElement('div');
    item.setAttribute('data-is-alive', isAlive);
    item.classList.add('item');
    rowDom.appendChild(item);

}

setInterval(function(){
    var board = gameOfLife(world);
    container.removeChild(document.querySelector('.container'));
    container.appendChild(board);
 }, 100);