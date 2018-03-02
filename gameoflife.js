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
        newWorld.push([]);
        for (var column = 0; column < seed[0].length; column++) {
            if (seed[row][column] === true) {
                if (neighborsAlive(seed, row, column) === 2 || neighborsAlive(seed, row, column) === 3) {
                    newWorld[row].push(true);
                } else {
                    newWorld[row].push(false);
                }    
            } else {
                if (neighborsAlive(seed, row, column) === 3){
                    newWorld[row].push(true);
                } else {
                    newWorld[row].push(false);
                }
            }
        }
    }
    return newWorld;
}

console.log(gameOfLife(world));