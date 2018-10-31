var Word = require("./word.js"),
    inquire = require("inquirer"),
    superhero = require("superheroes"),
    randomHero = "",
    newWord = {},
    printedWord = ""
    countdown = 12

function newHero() {
    randomHero = superhero.random().toLowerCase()
    // console.log(randomHero)
}

function newGame() {

    printedWord = ""
    wordCheck = []
    newWord = {}
    countdown = 12

    newHero()
    newWord = new Word(randomHero)
    // console.log(newWord)
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
        console.log("\n I T S    S U P E R H E R O    T I M E  \n")
        newGame()
    } else {
        console.log("\n Y O U    C A N T    H A N D L E    I T  \n")
    }

}).then(function() {

    for ( let i=0; i<newWord.wordArray.length; i++ ) {
        
        var letterScan = newWord.wordArray
        if ( ( letterScan[i].string  === "-" ) || ( letterScan[i].string === " " ) || ( letterScan[i].string === "." ) ) {
            letterScan[i].boolean = true
        }
    }

    runGame()
})

function runGame() {

    printWord()

    inquire.prompt(
        {
            name: "userGuess",
            message: "G U E S S   T H A T   L E T T E R: "
        }
    ).then(function(response) {

        countdown--
        console.log("\nGuesses Left: " + countdown)

        if ( countdown === 0 ) {
            gameOver()
        } else {

            var wordCheck = []

            for ( let i=0; i<newWord.wordArray.length; i++ ) {

                if ( response.userGuess.toLowerCase() == newWord.wordArray[i].string.toLowerCase() ) {
                    newWord.wordArray[i].boolean = true
                }

                if ( newWord.wordArray[i].boolean == false ) {
                    wordCheck.push(0)
                } else {
                    wordCheck.push(1)
                }

                // console.log("wordcheck: ", wordCheck)
            }

            if ( wordCheck.includes(0) == false ) {
                console.log("\nY O U   G O T   I T !\n")
                printWord()
                inquire.prompt(
                    {
                        type: "list",
                        message: "Play Again?",
                        choices: ["YES", "NO"],
                        name: "gameOver"
                    }
                ).then(function(response) {
                    if ( response.gameOver === "YES") {
                        newGame()
                    }
                }).then(function() {

                    for ( let i=0; i<newWord.wordArray.length; i++ ) {
                        
                        var letterScan = newWord.wordArray
                        if ( ( letterScan[i].string  === "-" ) || ( letterScan[i].string === " " ) ) {
                            letterScan[i].boolean = true
                        }
                    }
                
                    runGame()
                })
            } else {

                runGame()
            }

        }

        
    })
}

function printWord() {

    printedWord = "\nW O R D:  "

    for ( let i=0; i<newWord.wordArray.length; i++ ) {

       if ( newWord.wordArray[i].boolean == true ) {

            printedWord += newWord.wordArray[i].string + " "
       } else {

           printedWord += newWord.wordArray[i].placeholder + " "
       }
    }

    printedWord += "\n"
    console.log(printedWord)
}

function gameOver() {
    
    console.log("\nY O U   L O S T   B I G   T I M E !!!\n")
    inquire.prompt(
        {
            type: "list",
            message: "Play Again?",
            choices: ["YES", "NO"],
            name: "gameOver"
          }
    ).then(function(response) {
        if ( response.gameOver === "YES") {
            newGame()
        }
    }).then(function() {

        for ( let i=0; i<newWord.wordArray.length; i++ ) {
            
            var letterScan = newWord.wordArray
            if ( ( letterScan[i].string  === "-" ) || ( letterScan[i].string === " " ) ) {
                letterScan[i].boolean = true
            }
        }
    
        runGame()
    })
}



