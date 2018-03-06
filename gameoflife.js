var container = document.body;

var createBoardContainer = function() {
    var board = document.createElement('div');
    board.classList.add('container');
    return board;
};

var createBoardDOM = function(world) {
    return world.map(function(row) {
        return row.map(function(isAlive) {
            return createGridItem(isAlive);
        });
    });
};

var createBoardFromWorld = function(world, boardContainer) {
    var domNodes = createBoardDOM(world);
    domNodes.forEach(function(row) {
        var rowDom = createGridRow(row);
        row.forEach(function(cell) {
            rowDom.appendChild(cell);
        });
        boardContainer.appendChild(rowDom);
    });
    return domNodes;
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

var gameOfLife = function(seed) {
    var newWorld = [];
    for (var row = 0; row < seed.length; row++) {
        newWorld.push([]);
        for (var column = 0; column < seed[0].length; column++) {
            if (seed[row][column] === true) {
                if (neighborsAlive(seed, row, column) === (2 || 3)) {
                    updateGridItem(worldDOM, row, column, true);
                    newWorld[row].push(true);
                    continue;
                }; 
            } else if (neighborsAlive(seed, row, column) === 3){
                    updateGridItem(worldDOM, row, column, true);
                    newWorld[row].push(true);
                    continue;
                };
                updateGridItem(worldDOM, row, column, false);
                newWorld[row].push(false);
            }
        }
    world = newWorld;
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

var updateGridItem = function(worldDOM, row, column, isAlive) {
    var item = worldDOM[row][column];
    item.setAttribute('data-is-alive', isAlive);
};
var createGridRow = function() {
    var row = document.createElement('div');
    row.classList.add('row-container');
    return row;
  };
var createGridItem = function(isAlive) {
    var item = document.createElement('div');
    item.setAttribute('data-is-alive', isAlive);
    item.classList.add('item');
    return item;
}

world = randomWorld(150, 150);
var boardContainer = createBoardContainer();
var worldDOM = createBoardFromWorld(world, boardContainer);
container.appendChild(boardContainer);

setInterval(function(){
    gameOfLife(world);
 }, 30);