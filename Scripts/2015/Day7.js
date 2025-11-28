class Wire {
    constructor(wires, key, operator, input1, input2 = 0) {
        this.wires = wires;
        this.key = key;
        this.operator = operator;
        this.input1 = input1;
        this.input2 = input2;
        this.outputCalculated = false
        this.output = 0
    }

    getOutputForInput(input) {
        if (isNaN(input)) {
            if (this.wires.has(input)) {
                return this.wires.get(input).GetOutput()
            }
            else {
                return 0;
            }
        }
        return parseInt(input);
    }

    GetOutput() {
        if (this.outputCalculated){
            return this.output;
        }

        let input1 = this.getOutputForInput(this.input1)
        let input2 = this.getOutputForInput(this.input2)
        switch (this.operator) {
            case "NOT":
                this.output = ~input1;
                break;
            case "AND":
                this.output = input1 & input2;
                break;
            case "OR":
                this.output = input1 | input2;
                break;
            case "LSHIFT":
                this.output = input1 << input2;
                break;
            case "RSHIFT":
                this.output = input1 >> input2;
                break;
            case "CONNECT":
                this.output = input1;
                break;
        }
        this.outputCalculated = true;
        return this.output;
    }
}

function GetWires(value) {
    let wires = new Map();

    let commands = value.split("\n");
    for (let i = 0; i < commands.length; i++) {
        let command = commands[i].split(" ");
        if (command[0] == "NOT") {
            wires.set(command[3], new Wire(wires, command[3], "NOT", command[1]));
        }
        else if (command[1] == "->"){
            wires.set(command[2], new Wire(wires, command[2], "CONNECT", command[0]));
        }
        else if (command[1] == "AND") {
            wires.set(command[4], new Wire(wires, command[4], "AND", command[0], command[2]));
        }
        else if (command[1] == "OR") {
            wires.set(command[4], new Wire(wires, command[4], "OR", command[0], command[2]));
        }
        else if (command[1] == "LSHIFT") {
            wires.set(command[4], new Wire(wires, command[4], "LSHIFT", command[0], command[2]));
        }
        else if (command[1] == "RSHIFT") {
            wires.set(command[4], new Wire(wires, command[4], "RSHIFT", command[0], command[2]));
        }
    }
    return wires;
}

function Year2015Day7PartOne(value) {
    return GetWires(value).get("a").GetOutput();
}


function Year2015Day7PartTwo(value) {
    let wires = GetWires(value)
    wires.set("b", new Wire(wires, "b", "CONNECT", Year2015Day7PartOne(value)));
    return wires.get("a").GetOutput();
}