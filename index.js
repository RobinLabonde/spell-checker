let path = require('path');
let fs = require('fs');

const words = fs.readFileSync(path.join(__dirname, '10kwords.txt')).toString().split("\n");

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function addChar(charArray) {
    let newWords = [];
    for (let i = 0; i <= charArray.length; i++) {
        for (let j = 0; j < alphabet.length; j++) {
            let newWord = charArray.slice();
            newWord.splice(i, 0, alphabet[j]);
            newWords.push(newWord.join(''));
        }
    }
    return newWords;
}

function removeChar(charArray) {
    let newWords = [];
    if (charArray.length > 1) {
        for (let i = 0; i < charArray.length; i++) {
            let newWord = charArray.slice();
            newWord.splice(i, 1);
            newWords.push(newWord.join(''));
        }
    }
    return newWords;
}

function transposeChar(charArray) {
    let newWords = [];
    if (charArray.length > 1) {
        for (let i = 0; i < charArray.length - 1; i++) {
            let newWord = charArray.slice();
            let t = newWord.splice(i, 1);
            newWord.splice(i + 1, 0, t[0]);
            newWords.push(newWord.join(''));
        }
    }
    return newWords;
}

function substituteChar(charArray) {
    let newWords = [];
    for (let i = 0; i < charArray.length; i++) {
        for (let j = 0; j < alphabet.length; j++) {
            let newWord = charArray.slice();
            newWord[i] = alphabet[j];
            newWords.push(newWord.join(''));
        }
    }
    return newWords;
}

function generateNewWords(word) {
    let charArray = word.toLowerCase().split('');
    let results = [];
    results = addChar(charArray).concat(removeChar(charArray)).concat(transposeChar(charArray)).concat(substituteChar(charArray));
    return results;
}

function filterWords(newWords) {
    let possibleWords = [];
    for (let i = 0; i < newWords.length; i++) {
        if (words.includes(newWords[i])) {
            possibleWords.push(newWords[i]);
        }
    }
    return possibleWords;
}

function correct(word, maxDistance = 2) {    
    if(filterWords([word]).length === 1) return "There is no mistake.";

    let result;
    let newWords = [word];
    for (let i = 0; i < maxDistance; i++) {
        let newWordsCopy = newWords.slice();
        for (let j = 0; j < newWordsCopy.length; j++) {
            newWords = newWords.concat(generateNewWords(newWordsCopy[j]));
        }
        result = new Set(filterWords(newWords));
        if (result.size > 0 || i+1 === maxDistance) return result;
    }
}

console.time("correctFunction");
const suggestions = correct("occasionaly");
console.timeEnd("correctFunction");
console.log(suggestions);