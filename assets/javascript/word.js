var Letter = require("./letter.js"),
    currentWord = []

var Word = function(string) {

    this.string = string

    for ( let i=0; i<this.string.length; i++ ) {
        var letterObj = new Letter(this.string[i], false, "_")
        currentWord.push(letterObj)
    }

    this.wordArray = currentWord
}

module.exports = Word