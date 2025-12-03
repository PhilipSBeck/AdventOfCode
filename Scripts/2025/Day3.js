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

function Year2025Day3PartOne(value, num = 2) {
    let lines = value.split("\n");
    let total = 0;
    for (let i = 0; i < lines.length; i++) {
        total += parseInt(GetBatteryNum(lines[i], num));
    }
    return total;
}

function Year2025Day3PartTwo(value) {
    return Year2025Day3PartOne(value, 12);
}