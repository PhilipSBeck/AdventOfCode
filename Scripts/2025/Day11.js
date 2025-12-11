let test = 0;
function GetPathsRecursive(start, end, paths, wayPoints = [], visited = new Set(), mummy /* short for memoisation */ = new Map()) {
    let key = start;
    for(let waypoint of wayPoints){
        if(visited.has(waypoint)){
            key += waypoint;
        }
    }
    if(mummy.has(key)){
        return mummy.get(key);
    }
    if(visited.has(start)){
        mummy.set(key,0);
        return 0;
    }
    let newVisited = new Set(visited);
    newVisited.add(start);

    let nextNodes = paths.get(start);
    let total = 0;
    if (nextNodes.has(end)){
        for(let waypoint of wayPoints){
            if (!visited.has(waypoint)){
                mummy.set(key,0);
                return 0;
            }
        }
        mummy.set(key,1);
        return 1;
    }
    else {
        for (let n of nextNodes){
            total += GetPathsRecursive(n, end, paths, wayPoints, newVisited, mummy);
        }
    }
    mummy.set(key,total);
    return total;
}

function Year2025Day11PartOne(value) {
    let lines = value.split("\n");
    let paths = new Map();
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].split(" ");
        let start = line[0].substr(0, line[0].length - 1);
        paths.set(start, new Set());
        for(let j = 1; j < line.length; j++){
            paths.get(start).add(line[j]);
        }
    }
    
    return GetPathsRecursive("you", "out", paths);
}

function Year2025Day11PartTwo(value) {
    let lines = value.split("\n");
    let paths = new Map();
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].split(" ");
        let start = line[0].substr(0, line[0].length - 1);
        paths.set(start, new Set());
        for(let j = 1; j < line.length; j++){
            paths.get(start).add(line[j]);
        }
    }
    
    return GetPathsRecursive("svr", "out", paths, ["dac", "fft"]);
}