function LoopThroughObjectAndAddNumbers(object) {
    let count = 0;
    for (element in object) {
        if (typeof object[element] == "object") {
            count += LoopThroughObjectAndAddNumbers(object[element]);
        }
        else if (typeof object[element] == "number") {
            count += object[element];
        }
    }
    return count;
}

function LoopThroughObjectAndAddNumbersIgnoreRed(object) {
    let count = 0;
    for (element in object) {
        if (typeof object[element] == "object") {
            count += LoopThroughObjectAndAddNumbersIgnoreRed(object[element]);
        }
        else if (typeof object[element] == "number") {
            count += object[element];
        }
        else if (typeof object[element] == "string" && object[element] == "red" && !Array.isArray(object)) {
            return 0;
        }
    }
    return count;
}

function Year2015Day12PartOne(value) {
    let json = JSON.parse(value);
    return LoopThroughObjectAndAddNumbers(json);
}


function Year2015Day12PartTwo(value) {
    let json = JSON.parse(value);
    return LoopThroughObjectAndAddNumbersIgnoreRed(json);
}