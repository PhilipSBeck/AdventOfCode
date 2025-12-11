class LargeMap {
    get size() {
        return this.maps.reduce((p, c) => p + c.size, 0);
    }
    constructor(limit = 16777216) {
        this.limit = limit;
        this.maps = [new Map()];
    }
    has(key) {
        return this.maps.some(map => map.has(key));
    }
    set(key, value) {
        if (this.maps[this.maps.length - 1].size >= this.limit) {
            this.maps.push(new Map());
        }
        let map = this.maps[this.maps.length - 1];
        for (let i = 0; i < this.maps.length - 1; i++) {
            if (this.maps[i].has(key)) {
                map = this.maps[i];
                break;
            }
        }
        map.set(key, value);
        return this;
    }
    get(key) {
        const map = this.maps.find(map => map.has(key));
        if (map) return map.get(key);
        return undefined;
    }
    delete(key) {
        for (let i = this.maps.length - 1; i >= 0; i--) {
            const map = this.maps[i];
            if (map.delete(key)) {
                return true;
            }
        }
        return false;
    }
    clear() {
        this.maps = [new Map()];
    }
}

class LightTreeNode {
    constructor(joltage, pressCount, parent, comboSize, comboPos){
        this.joltage = joltage;
        this.children = [];
        for (let i = 0; i < comboSize; i++){
            // 0 - not tested
            // can hold link to child
            // -1 completely exhausted
            this.children.push(0);
        }
        this.pressCount = pressCount;
        this.parent = parent;
        this.comboPos = comboPos;
    }

    hasChildBeenTested(num) {
        if(this.children[num] === 0){
            return false;
        }
        return true;
    }
}

class LightSetup {
    constructor(finalSetup) {
        this.finalSetup = finalSetup;
        this.currentLights = "";
        for (let c of finalSetup){
            this.currentLights += ".";
        }
        this.targetJoltage = [];
        this.combos = [];
    }

    findLeastPresses() {
        let presses = 1;
        let lightCombos = new Map();
        lightCombos.set(this.currentLights, true);
        while(true){
            let newCombos = new Map();
            for (let k of lightCombos.keys()){
                for (let combo of this.combos){
                    let newCombo = this.applyCombo(k, combo);
                    if (newCombo == this.finalSetup){
                        return presses;
                    }
                    newCombos.set(newCombo, true);
                }
            }

            lightCombos = newCombos;
            presses++;
        }
    }

    getNextComboToIncrease(treeNode){
        let mostIncomplete = Infinity;
        let mostIncompleteIndex = -1;
        for(let i = 0; i < treeNode.joltage.length; i++){
            if (treeNode.hasChildBeenTested(i)){
                continue;
            }
            let percentComplete = treeNode.joltage[i]/this.targetJoltage[i];
            if (percentComplete < mostIncomplete){
                mostIncomplete = percentComplete;
                mostIncompleteIndex = i;
            }
        }
        return mostIncompleteIndex;
    }

    isComboUsable(treeNode, combo){
        for(let i = 0; i < combo.length; i++){
            let pos = this.GetComboPos(combo);
            if (this.targetJoltage[combo[i]] == treeNode.joltage[combo[i]] || treeNode.children[pos] == -1){
                return false;
            }
        }
        return true;
    }

    GetComboPos(combo){
        let comboPos = -1;
        for (let i = 0; i < this.combos.length; i++){
            if(this.combos[i].toString() == combo.toString()){
                comboPos = i;
                break;
            }
        }
        return comboPos;
    }

    getBestCombo(treeNode, combos){
        let bestSuitability = Infinity;
        let bestCombo;
        for(let combo of combos){
            let suitability = 0;
            for(let c of combo){
                suitability += treeNode.joltage[c]/this.targetJoltage[c];
            }
            if (suitability < bestSuitability){
                bestSuitability = suitability;
                bestCombo = combo;
            }
        }

        return [bestCombo, this.GetComboPos(bestCombo)];
    }

    getUsableCombo(treeNode, comboList) {
        let currentLength = Infinity;
        let usableCombos = [];
        for(let combo of comboList){
            if (currentLength > combo.length){
                if (usableCombos.length == 0) {
                    currentLength = combo.length;
                }
                else {
                    return this.getBestCombo(treeNode, usableCombos);
                }
            }
            let comboIsUsable = this.isComboUsable(treeNode, combo);
            if (comboIsUsable) {
                usableCombos.push(combo);
            }
        }
        if (usableCombos.length != 0) {
            return this.getBestCombo(treeNode, usableCombos);
        }
        return -1;
    }

    findLeastPressesPart2 () {
        let badJoltages = new LargeMap();

        let comboSize = this.combos.length;

        let startJoltage = [];
        for(let j of this.targetJoltage){
            startJoltage.push(0);
        }
        
        let posToCombos = [];
        for(let i = 0; i < this.targetJoltage.length; i++){
            posToCombos[i] = [];
            for(let combo of this.combos){
                for(let j of combo){
                    if (j == i) {
                        posToCombos[i].push(combo);
                        break;
                    }
                }
            }
            posToCombos[i].sort((a,b) => b.length - a.length);
        }

        let currentNode = new LightTreeNode(startJoltage, 0, null, comboSize, null);

        while(true){
            let combo = 0;
            let comboPos = -1;
            let nextCombo;
            while (true) {
                nextCombo = this.getNextComboToIncrease(currentNode);
                if (nextCombo == -1){
                    combo = -1;
                    break;
                }
                let usableCombo = this.getUsableCombo(currentNode, posToCombos[nextCombo]);
                if (usableCombo == -1) {
                    if (currentNode.joltage[nextCombo] != this.targetJoltage[nextCombo]){
                        combo = -1;
                        break;
                    }
                    for (let combo of posToCombos[nextCombo]){
                        currentNode.children[this.GetComboPos(combo)] = -1;
                    }
                }
                else{
                    combo = usableCombo[0];
                    comboPos = usableCombo[1];
                    break;
                }
            }

            if(combo == -1){
                badJoltages.set(currentNode.joltage.toString(), 0);
                let nc = currentNode.comboPos;
                currentNode = currentNode.parent;
                if(currentNode == null){
                    return -1;
                }
                currentNode.children[nc] = -1;
                continue;
            }

            //console.log(nextCombo);
            //console.log(currentNode.joltage);

            let newJoltage = this.applyComboPart2(currentNode.joltage, combo);
            if (badJoltages.has(newJoltage.toString())){
                currentNode.children[comboPos] = -1;
                continue;
            }

            if(newJoltage.toString() == this.targetJoltage.toString()){
                return currentNode.pressCount + 1;
            }
            
            let newNode = new LightTreeNode(newJoltage, currentNode.pressCount + 1, currentNode, comboSize, comboPos);
            currentNode.children[comboPos] = -1;
            currentNode = newNode;
        }
        return 1;
    }

    applyCombo(lights, combo){
        let newLights = "";
        let comboPos = 0;
        for(let i = 0; i < lights.length; i++){
            if(i == combo[comboPos]) {
                if (lights[i] == ".") {
                    newLights += "#";
                }
                else{
                    newLights += ".";
                }
                comboPos++;
            }
            else {
                newLights += lights[i];
            }
        }
        return newLights;
    }
    
    applyComboPart2(joltages, combo){
        let newJoltage = [];
        let comboPos = 0;
        for(let i = 0; i < joltages.length; i++){
            if(i == combo[comboPos]) {
                newJoltage.push(joltages[i] + 1);
                comboPos++;
            }
            else {
                newJoltage.push(joltages[i]);
            }
        }
        return newJoltage;
    }
}
function Year2025Day10PartOne(value) {
    let lines = value.split("\n");
    let lightSetups = [];
    for (let i = 0; i < lines.length; i++){
        let line = lines[i].split(" ");
        lightSetups.push(new LightSetup(line[0].substring(1,line[0].length - 1)));

        for (let j = 1; j < line.length - 1; j++){
            let comboStrings = line[j].substring(1,line[j].length - 1).split(",")
            let combo = [];
            for (let s of comboStrings){
                combo.push(parseInt(s));
            }
            lightSetups[i].combos.push(combo);
        }
    }

    let total = 0;
    for(let lightSetup of lightSetups){
        total += lightSetup.findLeastPresses();
    }
    return total;
}

function Year2025Day10PartTwo(value) {
    let lines = value.split("\n");
    let lightSetups = [];
    for (let i = 0; i < lines.length; i++){
        let line = lines[i].split(" ");
        lightSetups.push(new LightSetup(line[0].substring(1,line[0].length - 1)));

        for (let j = 1; j < line.length - 1; j++){
            let comboStrings = line[j].substring(1,line[j].length - 1).split(",")
            let combo = [];
            for (let s of comboStrings){
                combo.push(parseInt(s));
            }
            lightSetups[i].combos.push(combo);
        }
        let lastLine = line[line.length - 1];
        let joltagesString = lastLine.substring(1,lastLine.length - 1).split(",");
        let joltages = [];
        for (let joltage of joltagesString){
            joltages.push(parseInt(joltage));
        }
        lightSetups[i].targetJoltage = joltages;
    }

    lightSetups.sort((a,b) => {
        let aTotal = 0;
        for (let ls of a.targetJoltage){
            aTotal += ls;
        }
        
        let bTotal = 0;
        for (let ls of b.targetJoltage){
            bTotal += ls;
        }
        return aTotal - bTotal;
    });

    let total = 0;
    let count = 0;
    for(let lightSetup of lightSetups){
        let numPresses = lightSetup.findLeastPressesPart2();
        total += numPresses;
        console.log(count + " " + numPresses);
        count++;
    }
    return total;
}