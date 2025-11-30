class SittingArrangements {
    constructor(name) {
        this.name = name;
        this.people = new Map();
    }
}

function GetPeopleWithHappiness(value) {
    let people = new Map();
    let statements = value.split("\n");
    //Fill statements
    for (let i = 0; i < statements.length; i++) {
        let statement = statements[i].split(" ");
        if (!people.has(statement[0])) {
            people.set(statement[0], new SittingArrangements(statement[0]));
        }
        let change = parseInt(statement[3]);
        people.get(statement[0]).people.set(statement[10].split(".")[0], (statement[2] == "gain") ? change: -change);
    }
    return people;
}

function GetOptiomalFromSittingArrangements(sittingArrangements) {
    let indices = [];
    for (let i = 0; i < sittingArrangements.size; i++) {
        indices.push(i);
    }
    let permutations = permute(indices);
    let highestHappiness = 0;
    let keys = Array.from(sittingArrangements.keys());
    for (let i = 0; i < permutations.length; i++) {
        let permutation = permutations[i];
        let happinessChange = 0;
        for (let j = 0; j < permutation.length - 1; j++) {
            happinessChange += sittingArrangements.get(keys[permutation[j]]).people.get(keys[permutation[j+1]]);
            happinessChange += sittingArrangements.get(keys[permutation[j + 1]]).people.get(keys[permutation[j]]);
        }
        happinessChange += sittingArrangements.get(keys[permutation[0]]).people.get(keys[permutation[permutation.length - 1]]);
        happinessChange += sittingArrangements.get(keys[permutation[permutation.length - 1]]).people.get(keys[permutation[0]]);
        if (highestHappiness < happinessChange) {
            highestHappiness = happinessChange;
        }
    }
    return highestHappiness;
}

function Year2015Day13PartOne(value) {
    let sittingArrangements = GetPeopleWithHappiness(value);

    return GetOptiomalFromSittingArrangements(sittingArrangements);
}

function Year2015Day13PartTwo(value) {
    let sittingArrangements = GetPeopleWithHappiness(value);

    // Add "you"
    let you = new SittingArrangements("you");
    let keys = Array.from(sittingArrangements.keys());
    for (let i = 0; i < keys.length; i++) {
        sittingArrangements.get(keys[i]).people.set("you", 0);
        you.people.set(keys[i], 0);
    }
    sittingArrangements.set("you", you);

    return GetOptiomalFromSittingArrangements(sittingArrangements);
}