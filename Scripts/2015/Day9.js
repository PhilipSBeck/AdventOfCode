class City {
    constructor(city) {
        this.city = city;
        this.destinations = new Map();
    }
}

function GetCitiesWithPaths(value) {
    let cities = new Map();
    let routes = value.split("\n");
    //Fill routes
    for (let i = 0; i < routes.length; i++) {
        let route = routes[i].split(" ");
        if (!cities.has(route[0])) {
            cities.set(route[0], new City(route[0]));
        }
        cities.get(route[0]).destinations.set(route[2], parseInt(route[4]));
        if (!cities.has(route[2])) {
            cities.set(route[2], new City(route[2]));
        }
        cities.get(route[2]).destinations.set(route[0], parseInt(route[4]));
    }
    return cities;
}

// brute force
function Year2015Day9PartOne(value) {
    let cities = GetCitiesWithPaths(value);

    let indices = [];
    for (let i = 0; i < cities.size; i++) {
        indices.push(i);
    }
    let permutations = permute(indices);
    let shortestRoute = Infinity;
    let keys = Array.from(cities.keys());
    for (let i = 0; i < permutations.length; i++) {
        let permutation = permutations[i];
        let routeLength = 0;
        for (let j = 0; j < permutation.length - 1; j++) {
            routeLength += cities.get(keys[permutation[j]]).destinations.get(keys[permutation[j+1]]);
        }
        if (shortestRoute > routeLength) {
            shortestRoute = routeLength;
        }
    }
    return shortestRoute;
}


function Year2015Day9PartTwo(value) {
    let cities = GetCitiesWithPaths(value);

    let indices = [];
    for (let i = 0; i < cities.size; i++) {
        indices.push(i);
    }
    let permutations = permute(indices);
    let longestRoute = 0;
    let keys = Array.from(cities.keys());
    for (let i = 0; i < permutations.length; i++) {
        let permutation = permutations[i];
        let routeLength = 0;
        for (let j = 0; j < permutation.length - 1; j++) {
            routeLength += cities.get(keys[permutation[j]]).destinations.get(keys[permutation[j+1]]);
        }
        if (longestRoute < routeLength) {
            longestRoute = routeLength;
        }
    }
    return longestRoute;
}