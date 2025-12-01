function Year2025Day1PartOne(value) {
    let lines = value.split("\n");
    let pos = 50;
    let numZeros = 0;
    for (let i = 0; i < lines.length; i++) {
        let num = parseInt(lines[i].substring(1));
        if (lines[i][0] == "L") {
            pos -= num;
            while (pos < 0) {
                pos += 100;
            }
        }
        else {
            pos += num;
            while (pos >= 100) {
                pos -= 100;
            }
        }
        if (pos == 0){
            numZeros++;
        }
    }
    return numZeros;
}

function Year2025Day1PartTwo(value) {
    let lines = value.split("\n");
    let pos = 50;
    let numZeros = 0;
    for (let i = 0; i < lines.length; i++) {
        let num = parseInt(lines[i].substring(1));
        if (lines[i][0] == "L") {
            for (let i = 0; i < num; i++){
                pos--;
                if (pos < 0) {
                    pos += 100;
                }
                if (pos == 0) {
                    numZeros++;
                }
            }
        }
        else {
            for (let i = 0; i < num; i++){
                pos++;
                if (pos >= 100) {
                    pos -= 100;
                }
                if (pos == 0) {
                    numZeros++;
                }
            }
        }
    }
    return numZeros;
}