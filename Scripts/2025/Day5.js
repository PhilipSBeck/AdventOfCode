function Year2025Day5PartOne(value) {
    let lines = value.split("\n");
    let ranges = [];
    let ingredientStart = 0;
    for (let i = 0; i < lines.length; i++) {
        if(lines[i] === "") {
            ingredientStart = i + 1;
            break;
        }
        else {
            range = lines[i].split("-");
            ranges.push([]);
            ranges[ranges.length - 1].push(parseInt(range[0]));
            ranges[ranges.length - 1].push(parseInt(range[1]));
        }
    }

    let goodCount = 0;
    for (let i = ingredientStart; i < lines.length; i++) {
        let ingredient = parseInt(lines[i]);
        for (let j = 0; j < ranges.length; j++) {
            if (ingredient >= ranges[j][0] && ingredient <= ranges[j][1]){
                goodCount++;
                break;
            }
        }
    }
    return goodCount;
}

function CondenseRanges(ranges) {
    let newRanges = [];

    for (let i = 0; i < ranges.length; i++){
        let newRange = true;
        range = ranges[i];
        for (let j = 0; j < newRanges.length; j++) {
            let range1 = newRanges[j][0];
            let range2 = newRanges[j][1];
            if (range[0] >= range1 && range[0] <= range2 && range[1] >= range1 && range[1] <= range2){
                newRange = false;
                break;
            }
            else if (range[0] >= range1 && range[0] <= range2) {
                newRanges[j][1] = range[1];
                newRange = false;
                break;
            }
            else if (range[1] >= range1 && range[1] <= range2) {
                newRanges[j][0] = range[0];
                newRange = false;
                break;
            }
            else if (range[0] <= range1 && range[1] >= range2){
                ranges[j][0] = range[0];
                ranges[j][1] = range[1];
                newRange = false;
                break;
            }
        }

        if(newRange){
            newRanges.push([]);
            newRanges[newRanges.length - 1].push(range[0]);
            newRanges[newRanges.length - 1].push(range[1]);
        }
    }

    return newRanges;
}

function Year2025Day5PartTwo(value) {
    let lines = value.split("\n");
    let ranges = [];
    for (let i = 0; i < lines.length; i++) {
        if(lines[i] === "") {
            break;
        }
        else {
            range = lines[i].split("-");

            let newRange = true;
            for (let j = 0; j < ranges.length; j++) {
                let range1 = ranges[j][0];
                let range2 = ranges[j][1];
                if (range[0] >= range1 && range[0] <= range2 && range[1] >= range1 && range[1] <= range2){
                    newRange = false;
                    break;
                }
                else if (range[0] >= range1 && range[0] <= range2) {
                    ranges[j][1] = parseInt(range[1]);
                    newRange = false;
                    break;
                }
                else if (range[1] >= range1 && range[1] <= range2) {
                    ranges[j][0] = parseInt(range[0]);
                    newRange = false;
                    break;
                }
                else if (range[0] <= range1 && range[1] >= range2){
                    ranges[j][0] = parseInt(range[0]);
                    ranges[j][1] = parseInt(range[1]);    
                    newRange = false;
                    break;
                }
            }

            if(newRange){
                ranges.push([]);
                ranges[ranges.length - 1].push(parseInt(range[0]));
                ranges[ranges.length - 1].push(parseInt(range[1]));
            }
        }
    }

    let oldLength = 0;
    do {
        oldLength = ranges.length;
        ranges = CondenseRanges(ranges);
    } while(oldLength != ranges.length);

    // count range
    let numValid = 0;
    for (let j = 0; j < ranges.length; j++) {
        let validValues = ranges[j][1] - ranges[j][0] + 1;
        numValid += validValues;
    }

    return numValid;
}