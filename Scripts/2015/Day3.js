function Year2015Day3PartOne(value) {
    let housesVisited = 1;
    let x = 0;
    let y = 0;
    let visited = new Map();
    visited.set("0,0", true)
    for (i = 0; i < value.length; i++) {
        let char = value[i];
        switch (char) {
            case "<":
                x--;
                break;
            case ">":
                x++;
                break;
            case "^":
                y++;
                break
            case "v":
                y--;
                break;
            default:
                break;
        }
        let coords = x + "," + y;
        if (!visited.has(coords)) {
            housesVisited++;
            visited.set(coords, true);
        }
    }
    return housesVisited;
}

// TODO: Tidy up the code duplication in here with functions
function Year2015Day3PartTwo(value) {
    let housesVisited = 1;
    let santa_x = 0;
    let santa_y = 0;
    let robo_x = 0;
    let robo_y = 0;
    let visited = new Map();
    visited.set("0,0", true)
    for (i = 0; i < value.length; i++) {
        let char = value[i];
        let x = 0;
        let y = 0
        switch (char) {
            case "<":
                x--;
                break;
            case ">":
                x++;
                break;
            case "^":
                y++;
                break
            case "v":
                y--;
                break;
            default:
                break;
        }

        let coords;
        if (i%2 == 0) {
            santa_x += x;
            santa_y += y;
            coords = santa_x + "," + santa_y;
        }
        else {
            robo_x += x;
            robo_y += y;
            coords = robo_x + "," + robo_y;
        }

        if (!visited.has(coords)) {
            housesVisited++;
            visited.set(coords, true);
        }
    }
    return housesVisited;
}