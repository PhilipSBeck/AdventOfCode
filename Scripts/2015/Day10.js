function LookAndSay(input) {
    let newString = "";
    count = 1;
    num = input[0];
    for (let i = 1; i < input.length; i++) {
        if (input[i] == num) {
            count++;
        }
        else {
            newString += count;
            newString += num;
            count = 1;
            num = input[i];
        }
    }
    newString += count;
    newString += num;
    return newString;
}

function LookAndSayNumTimes(value, count){
    for (let i = 0; i < count; i++)
    {
        value = LookAndSay(value);
    }
    return value;
}

function Year2015Day10PartOne(value) {
    return LookAndSayNumTimes(value, 40).length;
}


function Year2015Day10PartTwo(value) {
    return LookAndSayNumTimes(value, 50).length;
}