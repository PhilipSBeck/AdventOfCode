function Year2015Day8PartOne(value) {
    let stringCharacterCount = 0;
    let totalCharacters = 0;
    let strings = value.split("\n");
    for (let i = 0; i < strings.length; i++) {
        let s = strings[i];
        totalCharacters += s.length;
        for (let j = 0; j < s.length; j++){
            if (s[j] == "\"") {
                continue;
            }
            else if (s[j] == "\\") {
                if (s[j + 1] == "x") {
                    j += 3;
                }
                else {
                    j++;
                }
            }
            stringCharacterCount++;
        }
    }

    return totalCharacters - stringCharacterCount;
}


function Year2015Day8PartTwo(value) {
    let difference = 0;
    let strings = value.split("\n");
    for (let i = 0; i < strings.length; i++) {
        let s = strings[i];
        difference += 2;
        difference += (s.match(/"/g) || []).length;
        difference += (s.match(/\\/g) || []).length;
    }
    return difference;
}