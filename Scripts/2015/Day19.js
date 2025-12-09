function Year2015Day19PartOne(value) {
    let lines = value.split("\n");
    let startingFormula = "";
    let replacements = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] == "") {
            startingFormula = lines[i + 1];
            break;
        }
        let replacement = lines[i].split(" => ");
        replacements.push([replacement[0], replacement[1]]);
    }

    let newFormulas = new Map();
    for (let i = 0; i < replacements.length; i++) {
        let pos = 0;
        while (pos >= 0)
        {
            const regex = new RegExp(replacements[i][0], "g");
            let newPos = startingFormula.substring(pos).search(regex);
            if (newPos > -1){
                pos += newPos;
                let newFormula = startingFormula.substring(0, pos) + replacements[i][1] + startingFormula.substring(pos + replacements[i][0].length);
                newFormulas.set(newFormula, true);
                pos += replacements[i][0].length;
            }
            else {
                pos = -1;
            }
        }
    }

    return newFormulas.size;
}

class molecule {
    constructor(molecule) {
        this.molecule = molecule;
    }
}

function Year2015Day19PartTwo(value) {
    let lines = value.split("\n");
    let formula = "";
    let replacements = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] == "") {
            formula = lines[i + 1];
            break;
        }
        let replacement = lines[i].split(" => ");
        replacements.push([replacement[0], replacement[1]]);
    }

    replacements.sort((a,b) => b[1].length - a[1].length);
    
    let failed = false;
    let swaps = 0;
    while(formula != "e" && !failed){
        failed = true;
        for(let i = 0; i < replacements.length; i++){
            let regex = new RegExp(replacements[i][1], "g");
            if (formula.search(regex) !== -1){
                formula = formula.replace(regex, replacements[i][0]);
                swaps++;
                failed = false;
                break;
            }
        }
    }
    if(failed || formula != "e"){
        return formula;
    }

    return swaps;
}