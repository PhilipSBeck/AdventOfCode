function GOLPass(lightMap) {
    let newLightMap = [];
    let lightMapLength = lightMap.length
    for (let i = 0; i < lightMapLength; i++) {
        newLightMap.push([]);
        for (let j = 0; j < lightMapLength; j++) {
            let numAliveAdjacent = 0;
            for (let x = -1; x < 2; x++) {
                for (let y = -1; y < 2; y++) {
                    if (!(x == 0 && y == 0)){
                        let newX = i + x;
                        let newY = j + y;
                        if (newX >= 0 && newX < lightMapLength && newY >= 0 && newY < lightMapLength) {
                            if (lightMap[newX][newY] == "#"){
                                numAliveAdjacent++;
                            }
                        }
                    }
                }
            }
            if (lightMap[i][j] == "#") {
                if (numAliveAdjacent == 2 || numAliveAdjacent == 3) {
                    newLightMap[i].push("#");
                }
                else {
                    newLightMap[i].push(".");
                }
            }
            else {
                if (numAliveAdjacent == 3) {
                    newLightMap[i].push("#");
                }
                else {
                    newLightMap[i].push(".");
                }
            }
        }
    }
    return newLightMap;
}

function Year2015Day18PartOne(value) {
    let lines = value.split("\n");
    let lightMap = []
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        lightMap.push([]);
        for(let j = 0; j < line.length; j++) {
            lightMap[i].push(line[j]);
        }
    }
    for (let i = 0; i < 100; i++) {
        lightMap = GOLPass(lightMap);
    }

    let lightCount = 0;
    for (let i = 0; i < lightMap.length; i++) {
        for(let j = 0; j < lightMap[i].length; j++) {
            if (lightMap[i][j] == "#") {
                lightCount++;
            }
        }
    }

    return lightCount;
}

function Year2015Day18PartTwo(value) {
    let lines = value.split("\n");
    let lightMap = []
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        lightMap.push([]);
        for(let j = 0; j < line.length; j++) {
            lightMap[i].push(line[j]);
        }
    }

    let farCorner = lightMap.length - 1;
    lightMap[0][0] = "#";
    lightMap[0][farCorner] = "#";
    lightMap[farCorner][0] = "#";
    lightMap[farCorner][farCorner] = "#";
    
    for (let i = 0; i < 100; i++) {
        lightMap = GOLPass(lightMap);
        lightMap[0][0] = "#";
        lightMap[0][farCorner] = "#";
        lightMap[farCorner][0] = "#";
        lightMap[farCorner][farCorner] = "#";
    }

    let lightCount = 0;
    for (let i = 0; i < lightMap.length; i++) {
        for(let j = 0; j < lightMap[i].length; j++) {
            if (lightMap[i][j] == "#") {
                lightCount++;
            }
        }
    }

    return lightCount;
}