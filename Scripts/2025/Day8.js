class CircuitBox {
    constructor(num, coords){
        this.num = num;
        this.coords = coords;
        this.connections = [];
        this.numBoxes = -1;
        this.connected = false;
    }

    addConnections(box){
        this.connections.push(box);
        this.connected = true;
    }

    getNumBoxes() {
        if (this.numBoxes === -1){
            this.numBoxes = 1;
            for (let i = 0; i < this.connections.length; i++){
                this.numBoxes += this.connections[i].getNumBoxesRecursive(this.num);
            }
            for (let i = 0; i < this.connections.length; i++){
                this.connections[i].setNumBoxesRecursive(this.numBoxes);
            }
        }
        return this.numBoxes;
    }

    getNewNumBoxes() {
        let beforeNum = this.num;
        for (let i = 0; i < this.connections.length; i++){
            this.connections[i].resetNumRecursive(this.num);
        }
        this.num = beforeNum;
        this.numBoxes = -1;
        return this.getNumBoxes();
    }

    getNumBoxesRecursive(num){
        if (this.num == num) {
            return 0;
        }
        let total = 1;
        this.num = num;
        for (let i = 0; i < this.connections.length; i++){
            total += this.connections[i].getNumBoxesRecursive(num);
        }
        return total;
    }

    setNumBoxesRecursive(numBoxes) {
        if (this.numBoxes == numBoxes){
            return;
        }
        this.numBoxes = numBoxes;
        for (let i = 0; i < this.connections.length; i++){
            this.connections[i].setNumBoxesRecursive(numBoxes);
        }
    }

    resetNumRecursive(num){
        if(this.num == -1 || this.num == num){
            return;
        }
        this.num = -1;
        this.numBoxes = -1;
        for (let i = 0; i < this.connections.length; i++){
            this.connections[i].resetNumRecursive();
        }
    }
}

function Year2025Day8PartOne(value) {
    let lines = value.split("\n");
    let coords = [];
    let boxMap = new Map();
    for(let i = 0; i < lines.length; i++){
        coords.push([]);
        let coord = lines[i].split(",");
        for(let j = 0; j < 3; j++){
            coords[i].push(parseInt(coord[j]));
        }
        boxMap.set(coords[i], new CircuitBox(i, coords[i]));
    }

    let distanceSquaredToCoords = new Map();
    for(let i = 0; i < coords.length - 1; i++){
        for(let j = i + 1; j < coords.length; j++){
            let distanceSquared = square((coords[i][0] - coords[j][0])) + square((coords[i][1] - coords[j][1])) + square((coords[i][2] - coords[j][2]));
            distanceSquaredToCoords.set(distanceSquared, [i,j]);
        }
    }

    let distances = Array.from(distanceSquaredToCoords.keys());
    distances.sort((a,b) => a - b);

    for (let i = 0; i < 1000; i++){
        let distance = distances[i];
        let pair = distanceSquaredToCoords.get(distance);
        boxMap.get(coords[pair[0]]).connections.push(boxMap.get(coords[pair[1]]));
        boxMap.get(coords[pair[1]]).connections.push(boxMap.get(coords[pair[0]]));
    }

    let keys = Array.from(boxMap.keys());
    // circuit number to length
    let circuitMap = new Map();
    for (let i = 0; i < keys.length; i++){
        let box = boxMap.get(keys[i]);
        box.getNumBoxes();
        circuitMap.set(box.num, box.numBoxes);
    }
    
    let circuitPairs = Array.from(circuitMap.entries());
    circuitPairs.sort((a,b) => b[1] - a[1]);

    let total = 1;
    for(let i = 0; i < 3; i++){
        total *= circuitPairs[i][1];
    }
    return total;
}

function Year2025Day8PartTwo(value) {
    let lines = value.split("\n");
    let coords = [];
    let boxMap = new Map();
    for(let i = 0; i < lines.length; i++){
        coords.push([]);
        let coord = lines[i].split(",");
        for(let j = 0; j < 3; j++){
            coords[i].push(parseInt(coord[j]));
        }
        boxMap.set(coords[i], new CircuitBox(i, coords[i]));
    }

    let distanceSquaredToCoords = new Map();
    for(let i = 0; i < coords.length - 1; i++){
        for(let j = i + 1; j < coords.length; j++){
            let distanceSquared = square((coords[i][0] - coords[j][0])) + square((coords[i][1] - coords[j][1])) + square((coords[i][2] - coords[j][2]));
            distanceSquaredToCoords.set(distanceSquared, [i,j]);
        }
    }

    let distances = Array.from(distanceSquaredToCoords.keys());
    distances.sort((a,b) => a - b);
    for (let pos = 0; pos < distances.length; pos++) {
        let distance = distances[pos];
        let pair = distanceSquaredToCoords.get(distance);
        boxMap.get(coords[pair[0]]).connections.push(boxMap.get(coords[pair[1]]));
        boxMap.get(coords[pair[1]]).connections.push(boxMap.get(coords[pair[0]]));
        if(boxMap.get(coords[pair[0]]).getNewNumBoxes() == boxMap.size) {
            return coords[pair[0]][0] * coords[pair[1]][0];
        }
    }

    return -1;
}