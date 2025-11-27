function Year2015Day1PartOne(value) {
    let floor = 0;
    
    for (let i = 0; i < value.length; i++) {
        if (value[i] == "(") {
            floor++;
        }
        else if (value[i] == ")") {
            floor--;
        }
    }
    
    return floor;
}

function Year2015Day1PartTwo(value) {
    let floor = 0;
    
    for (let i = 0; i < value.length; i++) {
        if (value[i] == "(") {
            floor++;
        }
        else if (value[i] == ")") {
            floor--;
        }

        if (floor < 0){
            return i + 1;
        }
    }
    
    return -1;
}