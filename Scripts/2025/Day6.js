class MathsProblem {
    constructor() {
        this.operator = "";
        this.numbers = [];
        this.numberStrings = [];
    }

    addNumber(number) {
        this.numbers.push(number);
    }

    get answer() {
        if (this.operator == "+"){
            return this.add();
        }
        else if (this.operator == "*"){
            return this.multiply();
        }
        else {
            console.warn("unexpected operator: " + this.operator);
            return 0;
        }
    }

    multiply() {
        let total = 1;
        for (let i = 0; i < this.numbers.length; i++){
            total *= this.numbers[i];
        }
        return total;
    }

    add() {
        let total = 0;
        for (let i = 0; i < this.numbers.length; i++){
            total += this.numbers[i];
        }
        return total;
    }

    makePartTwoNumbers() {
        let newNumbersStrings = [];

        for(let i = 0; i < this.numberStrings.length; i++){
            newNumbersStrings.push("");
        }
        
        let noMoreNumbers = false;
        let index = 0;
        while (!noMoreNumbers) {
            noMoreNumbers = true;
            
            for (let i = 0; i < this.numberStrings.length; i++) {
                let numberString = this.numberStrings[i];
                if (index < numberString.length && numberString[numberString.length - 1 - index] !== " ") {
                    newNumbersStrings[index] = newNumbersStrings[index] + numberString[numberString.length - 1 - index];
                    noMoreNumbers = false;
                }
            }
            index++;
        }
        
        
        this.numbers = [];
        for(let i = 0; i < newNumbersStrings.length; i++){
            let number  = newNumbersStrings[i];
            if (number !== ""){ 
                this.numbers.push(parseInt(number));
            }
        }
    }
}

function getProblems(value) {
    let lines = value.split("\n");

    let problems = [];
    const regexNumber = /\d+/g
    const regexOperator = /\+|\*/g

    let numbers = Array.from(lines[0].matchAll(regexNumber), (m) => m[0]);
    for (let i = 0; i < numbers.length; i++) {
        problems.push(new MathsProblem());
    }

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        numbers = Array.from(line.matchAll(regexNumber), (m) => m[0]);
        if (numbers.length == 0) {
            let operators = Array.from(line.matchAll(regexOperator), (m) => m[0]);
            for (let j = 0; j < operators.length; j++) {
                problems[j].operator = operators[j];
            }
        }
        else {
            for (let j = 0; j < numbers.length; j++) {
                problems[j].addNumber(parseInt(numbers[j]));
            }
        }
    }
    return problems;
}

function getProblemsPart2(value) {
    let lines = value.split("\n");

    let problems = [];

    
    const regexNumber = /\d+/g;
    let numbers = Array.from(lines[0].matchAll(regexNumber), (m) => m[0]);
    for (let i = 0; i < numbers.length; i++) {
        problems.push(new MathsProblem());
    }

    let operators = lines[lines.length - 1];
    let largestNumbers = [];
    let index = 0;
    while (index < problems.length) {
        problems[index].operator = operators[0];

        let length = 1;
        while (true) {
            if (operators.length == length) {
                break;
            }
            else if (operators[length] !== " "){
                length--;
                break;
            }
            length++;
        }
        largestNumbers.push(length);
        operators = operators.substring(length + 1);
        index++;
    }

    for(i = 0; i < largestNumbers.length; i++) {
        for(j = 0; j < lines.length - 1; j++){
            problems[i].numberStrings.push(lines[j].substring(0,largestNumbers[i]));
            lines[j] = lines[j].substring(largestNumbers[i] + 1);
        }
    }
    return problems;
}

function Year2025Day6PartOne(value) {    
    let problems = getProblems(value)

    let total = 0;
    for (let i = 0; i < problems.length; i++) {
        total += problems[i].answer;
    }

    return total;
}

function Year2025Day6PartTwo(value) {
    let problems = getProblemsPart2(value)

    let total = 0;
    for (let i = 0; i < problems.length; i++) {
        problems[i].makePartTwoNumbers();
        total += problems[i].answer;
    }

    return total;
}