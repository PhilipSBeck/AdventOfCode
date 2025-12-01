function GetCombinations(target, containers, currentTotal, pos = 0) {
    let totalCombinations = 0;
    
    if (currentTotal > target) {
        return 0;
    }
    else if (currentTotal == target) {
        return 1;
    }

    for (let i = pos + 1; i < containers.length; i++) {
        let newTotal = currentTotal + containers[i];
        totalCombinations += GetCombinations(target, containers,newTotal, i);
    }
    return totalCombinations;
}

function GetCombinationsAndNumber(target, containers, currentTotal, pos, count, numCombinationsMap) {
    if (currentTotal > target) {
        return;
    }
    else if (currentTotal == target) {
        if (!numCombinationsMap.has(count)) {
            numCombinationsMap.set(count, 1);
        }
        else {
            numCombinationsMap.set(count, numCombinationsMap.get(count) + 1);
        }
    }

    for (let i = pos + 1; i < containers.length; i++) {
        let newTotal = currentTotal + containers[i];
        GetCombinationsAndNumber(target, containers,newTotal, i, count + 1, numCombinationsMap);
    }
}

function Year2015Day17PartOne(value) {
    let lines = value.split("\n");

    let containers = [];
    for (let i = 0; i < lines.length; i++) {
        containers.push(parseInt(lines[i]));
    }

    let totalCombinations = 0;
    for (let i = 0; i < containers.length; i++){
        totalCombinations += GetCombinations(150, containers, containers[i], i);
    }

    return totalCombinations;
}

function Year2015Day17PartTwo(value) {
    let lines = value.split("\n");

    let containers = [];
    for (let i = 0; i < lines.length; i++) {
        containers.push(parseInt(lines[i]));
    }

    let numCombinationsMap = new Map();
    for (let i = 0; i < containers.length; i++){
        GetCombinationsAndNumber(150, containers, containers[i], i, 0, numCombinationsMap);
    }
    
    let smallestNumber = Infinity;
    let numCombosForSmallest = 0;
    numCombinationsMap.forEach (function(value, key) {
        if (key < smallestNumber){
            numCombosForSmallest = value;
            smallestNumber = key;
        }
    })
    return numCombosForSmallest;
}