var Word = require("./word.js"),
    inquire = require("inquirer"),
    superhero = require("superheroes"),
    randomHero = ""

function newHero() {
    randomHero = superhero.random()
}

function newGame() {

    newHero()
    var newWord = new Word(randomHero)
    console.log(newWord)
}

inquire.prompt(
    {
        type: "list",
        message: "Welcome to SuperHero Guessing Game! Ready to Play?",
        choices: ["YES", "NO"],
        name: "gameStart"
      }
).then(function(response) {
    if ( response.gameStart === "YES" ) {
        console.log("\n L E T S  P L A Y ! \n")
        newGame()
    } else {
        console.log("\n Y O U  C A N T  H A N D L E  I T  \n")
    }

})




