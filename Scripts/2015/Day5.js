function WordHasNaughtySubstring(word) {
    if (word.indexOf("ab") != -1 ||
    word.indexOf("cd") != -1 ||
    word.indexOf("pq") != -1 ||
    word.indexOf("xy") != -1){
        return true;
    }
    return false;
}

function Year2015Day5PartOne(value) {
    let niceCount = 0;
    let words = value.split("\n");
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (WordHasNaughtySubstring(word)) {
            continue;
        }

        let doubleLetter = false;
        let threeVowels = false;
        let lastChar = ""
        let vowelCount = 0;
        for (let j = 0; j < word.length; j++) {
            let char = word[j];
            // double letter
            if (!doubleLetter){
                if (char == lastChar) {
                    doubleLetter = true;
                }
                else {
                    lastChar = char
                }
            }

            if (!threeVowels) {
                // vowels
                switch (char) {
                    case "a":
                    case "e":
                    case "i":
                    case "o":
                    case "u":
                        vowelCount++;
                        break;
                }
                if (vowelCount >= 3) {
                    threeVowels = true;
                }
            }

            if (threeVowels && doubleLetter) {
                niceCount++;
                break;
            }
        }
    }

    return niceCount;
}

function Year2015Day5PartTwo(value) {
    let niceCount = 0;
    let words = value.split("\n");
    for (let i = 0; i < words.length; i++) {
        let word = words[i];

        let repeatedPair = false;
        let letterBetweenRepeat = false;
        for (let j = 0; j < word.length; j++) {
            let char = word[j];

            // check for the pair
            if (!repeatedPair && j+3 < word.length) {
                let pair = char + word[j+1];
                if (word.indexOf(pair, j+2) != -1) {
                    repeatedPair = true;
                }
            }
            // check for repeated letter with letter in between
            if (!letterBetweenRepeat && j + 2 < word.length) {
                if(char == word[j+2]) {
                    letterBetweenRepeat = true;
                }
            }

            if (repeatedPair && letterBetweenRepeat) {
                niceCount++;
                break;
            }
        }
    }
    return niceCount;
}