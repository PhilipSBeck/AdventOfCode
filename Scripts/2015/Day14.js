class ReindeerTravel {
    constructor(speed, movetime, restTime) {
        this.speed = speed;
        this.movetime = movetime;
        this.restTime = restTime;
        this.currentDistance = 0;
        this.moveRemaining = this.movetime;
        this.restRemaining = 0;
        this.points = 0;
    }

    get cycleTime() {
        return this.movetime + this.restTime;
    }

    GetDistanceInTime(time) {
        let distance = 0;

        let remainder = time%this.cycleTime;
        let cycles = Math.floor(time / this.cycleTime);

        let lastCycleFlyTime = Math.min(remainder, this.movetime);
        distance += lastCycleFlyTime * this.speed;
        distance += cycles * this.movetime * this.speed;
        
        console.log(distance);
        return distance;
    }

    NextSecond() {
        if (this.moveRemaining > 0) {
            this.moveRemaining--;
            this.currentDistance += this.speed;
            if (this.moveRemaining <= 0) {
                this.restRemaining = this.restTime;
            }
        }
        else {
            this.restRemaining--;
            if (this.restRemaining <= 0) {
                this.moveRemaining = this.movetime;
            }
        }
    }
}
function Year2015Day14PartOne(value, time = 2503) {
    let longestDistance = 0;
       
    let lines = value.split("\n");
    for (let i = 0; i < lines.length; i++) {
        let words = lines[i].split(" ");
        let reindeer = new ReindeerTravel(parseInt(words[3]),parseInt(words[6]),parseInt(words[13]));
        let distance = reindeer.GetDistanceInTime(time);
        if (distance > longestDistance) {
            longestDistance = distance;
        }
    }
    return longestDistance;
}

function Year2015Day14PartTwo(value, time = 2503) {
    let lines = value.split("\n");
    let reindeerList = []
    for (let i = 0; i < lines.length; i++) {
        let words = lines[i].split(" ");
        reindeerList.push(new ReindeerTravel(parseInt(words[3]),parseInt(words[6]),parseInt(words[13])));
    }

    for (let i = 0; i < time; i++){
        let highestDistance = 0
        for (let j = 0; j < reindeerList.length; j++) {
            reindeerList[j].NextSecond();
            let distance = reindeerList[j].currentDistance;
            if (distance > highestDistance) {
                highestDistance = distance;
            }
        }
        for (let j = 0; j < reindeerList.length; j++) {
            if (reindeerList[j].currentDistance == highestDistance) {
                reindeerList[j].points++;
            }
        }
    }

    let mostPoints = 0;
    for (let i = 0; i < reindeerList.length; i++) {
        if (reindeerList[i].points > mostPoints) {
            mostPoints = reindeerList[i].points;
        }
    }

    return mostPoints;
}