function Year2025Day3PartOne(value) {
    let lines = value.split("\n");
    let total = 0;
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        // find the largest
        let largestDigit = 0;
        let largestDigitPos = 0;
        for (let j = 0; j < line.length - 1; j++) {
            if (parseInt(line[j]) > largestDigit){
                largestDigit = line[j];
                largestDigitPos = j;
            }
        }
        let nextLargest = 0;
        for (let j = largestDigitPos + 1; j < line.length; j++) {
            if (parseInt(line[j]) > nextLargest){
                nextLargest = line[j];   
            }
        }
        total += parseInt(largestDigit + nextLargest);

    }
    return total;
}

function GetBatteryNum(bank, length) {
    if (length <= 0) {
        return "";
    }

    length--;
    let largestDigit = 0;
    let largestDigitPos = 0;
    for (let i = 0; i < bank.length - length; i++) {
        if (parseInt(bank[i]) > largestDigit){
            largestDigit = bank[i];
            largestDigitPos = i;
        }
    }
    return bank[largestDigitPos] + GetBatteryNum(bank.substring(largestDigitPos + 1), length);
}

function Year2025Day3PartTwo(value) {
    let lines = value.split("\n");
    let total = 0;
    for (let i = 0; i < lines.length; i++) {
        total += parseInt(GetBatteryNum(lines[i], 12));
    }
    return total;
}