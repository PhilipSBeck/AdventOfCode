function CountAccessibleRolls(grid) {
    let numAccessible = 0;
    let gridLength = grid.length;
    for(let i = 0; i < gridLength;i++){
        for (let j = 0; j < gridLength; j++) {
            if (grid[i][j] == "@") {
                let numAdjacent = 0;
                for (let x = -1; x < 2; x++) {
                    for (let y = -1; y < 2; y++) {
                        if (!(x == 0 && y == 0)){
                            let newX = i + x;
                            let newY = j + y;
                            if (newX >= 0 && newX < gridLength && newY >= 0 && newY < gridLength) {
                                if (grid[newX][newY] == "@"){
                                    numAdjacent++;
                                }
                            }
                        }
                    }
                }
                if (numAdjacent < 4)
                {
                    numAccessible++;
                }         
            }
        }
    }
    return numAccessible;
}

function RemoveAccessibleRolls(grid) {
    let newGrid = [];
    let gridLength = grid.length;
    for(let i = 0; i < gridLength;i++){
        newGrid.push([]);
        for (let j = 0; j < gridLength; j++) {
            if (grid[i][j] == "@") {
                let numAdjacent = 0;
                for (let x = -1; x < 2; x++) {
                    for (let y = -1; y < 2; y++) {
                        if (!(x == 0 && y == 0)){
                            let newX = i + x;
                            let newY = j + y;
                            if (newX >= 0 && newX < gridLength && newY >= 0 && newY < gridLength) {
                                if (grid[newX][newY] == "@"){
                                    numAdjacent++;
                                }
                            }
                        }
                    }
                }
                if (numAdjacent < 4)
                {
                    newGrid[i].push(".");
                }
                else {
                    newGrid[i].push("@");
                }     
            }
            else {
                newGrid[i].push(".");
            }
        }
    }
    return newGrid;
}

function Year2025Day4PartOne(value) {
    let lines = value.split("\n");
    let grid = [];
    for (let i = 0; i < lines.length; i++) {
        grid.push([]);
        let line = lines[i];
        for (let j = 0; j < line.length; j++){
            grid[i].push([line[j]]);
        }
    }
    return CountAccessibleRolls(grid);
}

function Year2025Day4PartTwo(value) {
    let lines = value.split("\n");
    let grid = [];
    for (let i = 0; i < lines.length; i++) {
        grid.push([]);
        let line = lines[i];
        for (let j = 0; j < line.length; j++){
            grid[i].push([line[j]]);
        }
    }

    let totalRemoved = 0;
    while(true) {
        let numRemoved = CountAccessibleRolls(grid);
        if(numRemoved == 0) {
            return totalRemoved;
        }
        totalRemoved += numRemoved;

        grid = RemoveAccessibleRolls(grid);
    }
}