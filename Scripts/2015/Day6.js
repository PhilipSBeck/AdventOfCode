function ToggleLights(grid, fromX, fromY, toX, toY) {
    for (let i = fromX; i <= toX; i++){
        for (let j = fromY; j <= toY; j++){
            if (grid[i][j] == 0) {
                grid[i][j] = 1;
            }
            else {
                grid[i][j] = 0;
            }
        }
    }
}

function ChangeLights(grid, state, fromX, fromY, toX, toY) {
    for (let i = fromX; i <= toX; i++){
        for (let j = fromY; j <= toY; j++){
            grid[i][j] = state;
        }
    }
}

function ToggleLights2(grid, fromX, fromY, toX, toY) {
    for (let i = fromX; i <= toX; i++){
        for (let j = fromY; j <= toY; j++){
            grid[i][j] += 2;
        }
    }
}

function ChangeLights2(grid, state, fromX, fromY, toX, toY) {
    for (let i = fromX; i <= toX; i++){
        for (let j = fromY; j <= toY; j++){
            if (state == 0) {
                grid[i][j]--;
                if (grid[i][j] < 0) {
                    grid[i][j] = 0;
                }
            }
            else {
                grid[i][j]++;
            }
        }
    }
}

function Year2015Day6PartOne(value) {
    let grid = [];
    for (let i = 0; i < 1000; i++) {
        grid.push([]);
        for (let j = 0; j < 1000; j++) {
            grid[i].push(0);
        }
    }

    let commands = value.split("\n");
    for (let i = 0; i < commands.length; i++) {
        let command = commands[i];
        let words = command.split(" ");
        if (words[0] == "toggle")
        {
            let from = words[1].split(",");
            let to = words[3].split(",");
            ToggleLights(grid, parseInt(from[0]), parseInt(from[1]), parseInt(to[0]), parseInt(to[1]));
        }
        else if (words[0] == "turn") {
            let from = words[2].split(",");
            let to = words[4].split(",");

            if (words[1] == "on") {
                ChangeLights(grid, 1, parseInt(from[0]), parseInt(from[1]), parseInt(to[0]), parseInt(to[1]));
            }
            else {
                ChangeLights(grid, 0, parseInt(from[0]), parseInt(from[1]), parseInt(to[0]), parseInt(to[1]));
            }
        }
    }

    let count = 0;
    for (let i = 0; i < 1000; i++){
        for (let j = 0; j < 1000; j++){
            if (grid[i][j] == 1) {
                count++;
            }
        }
    }
    return count;
}

function Year2015Day6PartTwo(value) {
    let grid = [];
    for (let i = 0; i < 1000; i++) {
        grid.push([]);
        for (let j = 0; j < 1000; j++) {
            grid[i].push(0);
        }
    }

    let commands = value.split("\n");
    for (let i = 0; i < commands.length; i++) {
        let command = commands[i];
        let words = command.split(" ");
        if (words[0] == "toggle")
        {
            let from = words[1].split(",");
            let to = words[3].split(",");
            ToggleLights2(grid, parseInt(from[0]), parseInt(from[1]), parseInt(to[0]), parseInt(to[1]));
        }
        else if (words[0] == "turn") {
            let from = words[2].split(",");
            let to = words[4].split(",");

            if (words[1] == "on") {
                ChangeLights2(grid, 1, parseInt(from[0]), parseInt(from[1]), parseInt(to[0]), parseInt(to[1]));
            }
            else {
                ChangeLights2(grid, 0, parseInt(from[0]), parseInt(from[1]), parseInt(to[0]), parseInt(to[1]));
            }
        }
    }

    let brightness = 0;
    for (let i = 0; i < 1000; i++){
        for (let j = 0; j < 1000; j++){
            brightness += grid[i][j];
        }
    }
    return brightness;
}