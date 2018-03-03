var container = document.querySelector('.container');

var createGridRow = function(currentRow) {
    var row = document.createElement('div');
    row.setAttribute('data-row-index', currentRow)
    row.classList.add('row-container');
    container.appendChild(row);
  };
var createGridItem = function(currentRow, currentColumn, isAlive) {
    var item = document.createElement('div');
    item.setAttribute('data-is-alive', isAlive);
    item.classList.add('item');
    var whichRow = document.getElementsByClassName('row-container');
    Array.prototype.forEach.call(whichRow, function(element){
        if (element.getAttribute('data-row-index') === currentRow.toString()) {
            element.appendChild(item);
        };
    });

}
var renderItems = function() {
    var allItems = document.getElementsByClassName('item');
    Array.prototype.forEach.call(allItems, (function(element){
        if (element.getAttribute('data-is-alive') === 'true') {
            element.textContent = 'true';
        }
        else {
            element.textContent = 'false';
        };
    })
    )}

var world = [
    [false, false, false, true],
    [true, true, true, true],
    [false, false, false, true]
]

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

var gameOfLife = function(seed) {
    var newWorld = [];
    for (var row = 0; row < seed.length; row++) {
        createGridRow(row);
        newWorld.push([]);
        for (var column = 0; column < seed[0].length; column++) {
            if (seed[row][column] === true) {
                if (neighborsAlive(seed, row, column) === 2 || neighborsAlive(seed, row, column) === 3) {
                    createGridItem(row, column, true);
                    newWorld[row].push(true);
                } else {
                    createGridItem(row, column, false);
                    newWorld[row].push(false);
                }    
            } else {
                if (neighborsAlive(seed, row, column) === 3){
                    createGridItem(row, column, true);
                    newWorld[row].push(true);
                } else {
                    createGridItem(row, column, false);
                    newWorld[row].push(false);
                }
            }
        }
    }
    renderItems();
    return newWorld;
}

gameOfLife(world);