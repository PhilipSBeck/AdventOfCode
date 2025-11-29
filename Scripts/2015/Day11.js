function IncChar(c) {
    let char = String.fromCharCode(c.charCodeAt(0) + 1)
    if (char == "{")
    {
        return "a";
    }
    return char;
}


function IncreasePassword(value) {
    for (let i = value.length - 1; i >= 0; i--) {
        let newChar = IncChar(value[i]);
        value = value.substring(0, i) + newChar + value.substring(i + 1);
        if (newChar != "a"){
            break;
        }
    }
    return value
}

function CheckForThreeConsectiveLetters(value) {
    let letters = "abc";
    while (letters[2] != "{"){
        if((value.match(new RegExp(letters)) || []).length > 0) {
            return true;
        }
        letters = letters.substring(1) + String.fromCharCode(letters.charCodeAt(2) + 1);
    }
    return false;
}

function HasForbiddenLetters(value) {
    let forbiddenLetters = ["i", "o", "l"]
    for (i = 0; i < forbiddenLetters.length; i++) {
        if((value.match(new RegExp(forbiddenLetters[i])) || []).length > 0) {
            return true;
        }
    }
    return false;
}

function HasTwoDoubleLetters(value) {
    let doubleLetterCount = 0;
    let char = "a";
    while (char != "{") {
        doubleLetterCount += (value.match(new RegExp(char + char)) || []).length;
        char = String.fromCharCode(char.charCodeAt(0) + 1);
        if (doubleLetterCount >= 2) {
            return true;
        }
    }
    return false;
}

function CheckIsValid(value) {
    if (!CheckForThreeConsectiveLetters(value)) {
        return false;
    }
    else if (HasForbiddenLetters(value)) {
        return false;
    }
    else if (!HasTwoDoubleLetters(value)){
        return false;
    }
    return true;
}

function Year2015Day11PartOne(value) {
    while(!CheckIsValid(value)) {
        value = IncreasePassword(value);
    }
    return value;
}


function Year2015Day11PartTwo(value) {
    return Year2015Day11PartOne(IncreasePassword(Year2015Day11PartOne(value)));
}