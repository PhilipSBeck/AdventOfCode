var SueStats = {
    "children:": 3,
    "cats:": 7,
    "samoyeds:": 2,
    "pomeranians:": 3,
    "akitas:": 0,
    "vizslas:": 0,
    "goldfish:": 5,
    "trees:": 3,
    "cars:": 2,
    "perfumes:": 1,
}
function Year2015Day16PartOne(value) {
    let lines = value.split("\n");
    let sues = [];
    for (let i = 0; i < lines.length; i++) {
        let words = lines[i].split(" ");
        let temp = new Map();
        temp.set("num", i + 1);
        sues.push(temp);
        for (let j = 2; j < words.length; j += 2) {
            sues[i].set(words[j], parseInt(words[j + 1]));
        }
    }
    let keys = Object.keys(SueStats);
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < sues.length; j++) {
            if (sues[j].has(keys[i]) && SueStats[keys[i]] != sues[j].get(keys[i])) {
                sues.splice(j, 1);
                j--;
            }
        }
    }
    
    return sues[0].get("num");
}

function Year2015Day16PartTwo(value) {
    let lines = value.split("\n");
    let sues = [];
    for (let i = 0; i < lines.length; i++) {
        let words = lines[i].split(" ");
        let temp = new Map();
        temp.set("num", i + 1);
        sues.push(temp);
        for (let j = 2; j < words.length; j += 2) {
            sues[i].set(words[j], parseInt(words[j + 1]));
        }
    }
    let keys = Object.keys(SueStats);
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < sues.length; j++) {
            if (sues[j].has(keys[i])){
                switch (keys[i]){
                    case "cats:":
                    case "trees:":
                        if (SueStats[keys[i]] >= sues[j].get(keys[i])) {
                            sues.splice(j, 1);
                            j--;
                        }
                        break;
                    case "pomeranians:":
                    case "goldfish:":
                        if (SueStats[keys[i]] <= sues[j].get(keys[i])) {
                            sues.splice(j, 1);
                            j--;
                        }
                        break;
                    default:
                        if (SueStats[keys[i]] != sues[j].get(keys[i])) {
                            sues.splice(j, 1);
                            j--;
                        }
                        break;
                }
            }
        }
    }
    console.log(sues);
    return sues[0].get("num");
}