function Year2025Day2PartOne(value) {
    let ranges = value.split(",");
    let total = 0;
    for (let i = 0; i < ranges.length; i++) {
        let range = ranges[i].split("-");
        for (let id = parseInt(range[0]); id <= parseInt(range[1]); id++){
            let idString = id.toString();
            let idStringLength = idString.length;
            if (idStringLength%2 == 0){
                let firstHalf = idString.substring(0,idStringLength/2);
                let secondHalf = idString.substring(idStringLength/2, idStringLength);
                if (firstHalf === secondHalf) {
                    total += id;
                }
            }
        }
    }
    return total;
}

function Year2025Day2PartTwo(value) {
    let ranges = value.split(",");
    let total = 0;
    for (let i = 0; i < ranges.length; i++) {
        let range = ranges[i].split("-");
        for (let id = parseInt(range[0]); id <= parseInt(range[1]); id++){
            let idString = id.toString();
            let idStringLength = idString.length;
            // loop through all the possible numbers up to the length
            for (let j = 2; j <= idStringLength; j++) {
                let subStringArray = [];
                if (idStringLength % j === 0) {
                    let subStrLength = idStringLength/j;
                    for (let k = 0; k < idStringLength; k += subStrLength) {
                        subStringArray.push(idString.substring(k, k + subStrLength));
                    }
                    let firstSubString = subStringArray[0];
                    let allEqual = true;
                    for (let k = 1; k < subStringArray.length; k++){
                        if (firstSubString !== subStringArray[k]) {
                            allEqual = false;
                            break;
                        }
                    }
                    if (allEqual) {
                        total += id;
                        break;
                    }
                }
            }
        }
    }
    return total;
}