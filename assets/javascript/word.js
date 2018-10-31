var Letter = require("./letter.js")

//This is the Word Constructor
var Word = function(string) {

    var currentWord = []

    this.string = string

    for ( let i=0; i<this.string.length; i++ ) {
        var letterObj = new Letter(this.string[i], false, "_")
        currentWord.push(letterObj)
    }

    this.wordArray = currentWord
}

module.exports = Word