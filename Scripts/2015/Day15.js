function Year2015Day15PartOne(value) {
    let lines = value.split("\n");
    let ingredientList = [];
    for (let i = 0; i < lines.length; i++) {
        let words = lines[i].split(" ");
        let ingredient = [
            parseInt(words[2].split(",")[0]),
            parseInt(words[4].split(",")[0]),
            parseInt(words[6].split(",")[0]),
            parseInt(words[8].split(",")[0]),
        ]
        ingredientList.push(ingredient);
    }
    
    let combinations = [];
    let total = 100;
    for (let i = 0; i <= 100; i++){
        combinations.push([i]);
    }
    
    for (let i = 1; i < 4; i++){
        let newCombinations = [];
        for (let j = 0; j < combinations.length; j++){
            let currentTotal = 0;
            for (let k = 0; k < i; k++) {
                currentTotal += combinations[j][k];
            }
            for(let k = 0; k <= (total - currentTotal); k++) {
                let newCombo = [];
                for (let l = 0; l < i; l++) {
                    newCombo.push(combinations[j][l]);
                }
                newCombo.push(k);
                newCombinations.push(newCombo);
            }
        }
        combinations = newCombinations;
    }

    let highestTotal = 0;
    for (let i = 0; i < combinations.length; i++) {
        let total = 1;
        for (let j = 0; j < 4; j++) {
            let ingredientValue = 0;
            for (let k = 0; k < ingredientList.length; k++) {
                ingredientValue += ingredientList[k][j] * combinations[i][k];
            }
            total *= Math.max(ingredientValue, 0);
        }
        if (total > highestTotal) {
            highestTotal = total;
        }
    }
    return highestTotal;
}

function Year2015Day15PartTwo(value) {
    let lines = value.split("\n");
    let ingredientList = [];
    let calories = []
    for (let i = 0; i < lines.length; i++) {
        let words = lines[i].split(" ");
        let ingredient = [
            parseInt(words[2].split(",")[0]),
            parseInt(words[4].split(",")[0]),
            parseInt(words[6].split(",")[0]),
            parseInt(words[8].split(",")[0]),
        ]
        ingredientList.push(ingredient);
        calories.push(parseInt(words[10].split(",")[0]));
    }

    let combinations = [];
    let total = 100;
    for (let i = 0; i <= 100; i++){
        combinations.push([i]);
    }
    
    for (let i = 1; i < 4; i++){
        let newCombinations = [];
        for (let j = 0; j < combinations.length; j++){
            let currentTotal = 0;
            for (let k = 0; k < i; k++) {
                currentTotal += combinations[j][k];
            }
            if (i == ingredientList.length - 1){
                    let newCombo = [];
                    for (let l = 0; l < i; l++) {
                        newCombo.push(combinations[j][l]);
                    }
                    newCombo.push(total - currentTotal);
                    let calorieCount = 0;
                    for(let l = 0; l < newCombo.length; l++){
                        calorieCount += calories[l] * newCombo[l];
                    }
                    if (calorieCount == 500) {
                        newCombinations.push(newCombo);
                    }
            }
            else {
                for(let k = 0; k <= (total - currentTotal); k++) {
                    let newCombo = [];
                    for (let l = 0; l < i; l++) {
                        newCombo.push(combinations[j][l]);
                    }
                    newCombo.push(k);
                    newCombinations.push(newCombo);
                }
            }
        }
        combinations = newCombinations;
    }

    let highestTotal = 0;
    for (let i = 0; i < combinations.length; i++) {
        let total = 1;
        for (let j = 0; j < 4; j++) {
            let ingredientValue = 0;
            for (let k = 0; k < ingredientList.length; k++) {
                ingredientValue += ingredientList[k][j] * combinations[i][k];
            }
            total *= Math.max(ingredientValue, 0);
        }
        if (total > highestTotal) {
            highestTotal = total;
        }
    }
    return highestTotal;
}