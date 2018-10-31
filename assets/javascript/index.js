//*This is the hardest Super Hero Guessing Game Ever!

//By Kyle Rosenmeyer


//Initial Variables
var Word = require("./word.js"),
    inquire = require("inquirer"),
    superhero = require("superheroes"),
    randomHero = "",
    newWord = {},
    printedWord = ""
    countdown = 15,
    guessedLetters = []

//newHero grabs a random word from the superheros node module and makes it lower case.
function newHero() {
    randomHero = superhero.random().toLowerCase()
    // console.log(randomHero)
}

//newGame resets several game variables, runs newHero and places the hero in the Word Constructor.
function newGame() {

    printedWord = ""
    wordCheck = []
    newWord = {}
    countdown = 15,
    guessedLetters = []

    newHero()
    newWord = new Word(randomHero)
    // console.log(newWord)
}

//The initial prompt to ask the user if they want to play.
inquire.prompt(
    {
        type: "list",
        message: "Welcome to SuperHero Guessing Game! Ready to Play?",
        choices: ["YES", "NO"],
        name: "gameStart"
      }
).then(function(response) {

    //This condition checks for the user response and runs newGame if the answer is yes.
    if ( response.gameStart === "YES" ) {
        console.log("\n I T S    S U P E R H E R O    T I M E  \n")
        newGame()
    } else {
        console.log("\n Y O U    C A N T    H A N D L E    I T  \n")
    }

}).then(function() {

    //This loop scans the game word and looks for hyphens, spaces, and periods. It displays those character strings instead
    //of their placeholders.
    for ( let i=0; i<newWord.wordArray.length; i++ ) {
        
        var letterScan = newWord.wordArray
        if ( ( letterScan[i].string  === "-" ) || ( letterScan[i].string === " " ) || ( letterScan[i].string === "." ) ) {
            letterScan[i].boolean = true
        }
    }
    //move on to runGame
    runGame()
})

function runGame() {

    //Display the game word
    printWord()

    //Ask the user to guess a letter.
    inquire.prompt(
        {
            name: "userGuess",
            message: "G U E S S   T H A T   L E T T E R: "
        },
        console.log(" ")
    ).then(function(response) {

        //This condition checks if the user has already guessed the letter once on the current word.
        if ( guessedLetters.includes( response.userGuess ) ) {

            //If the have, tell them, and then re run runGame
            console.log("\nYou Already Guessed " + response.userGuess + "!\n")
            runGame()
        } else {

            //If they haven't, add that letter to the guessedLetters array, mark the coundown, and move on.
            guessedLetters.push(response.userGuess)
            countdown--
            console.log("\nGuesses Left: " + countdown)

            //This condition checks to see if the user is out of guesses.
            if ( countdown === 0 ) {

                //Run gameOver if true.
                gameOver()
            } else {

                var wordCheck = []

                //This loop checks the user's guess against the game word, and flips the blanks where they match.
                for ( let i=0; i<newWord.wordArray.length; i++ ) {

                    //This is the condition that actually checks for the match and flips the placeholders.
                    if ( response.userGuess.toLowerCase() == newWord.wordArray[i].string.toLowerCase() ) {
                        newWord.wordArray[i].boolean = true
                    }

                    //This is the condition that checks to see if the word is solved yet.
                    if ( newWord.wordArray[i].boolean == false ) {
                        wordCheck.push(0)
                    } else {
                        wordCheck.push(1)
                    }

                    // console.log("wordcheck: ", wordCheck)
                }

                //This condition checks to see if the user has guessed all the letters.
                if ( wordCheck.includes(0) == false ) {

                    //Print the completed game word.
                    console.log("\nY O U   G O T   I T !\n")
                    printWord()

                    //Ask the user if they want to play again. 
                    inquire.prompt(
                        {
                            type: "list",
                            message: "Play Again?",
                            choices: ["YES", "NO"],
                            name: "gameOver"
                        }
                    ).then(function(response) {

                        //This condition runs a newGame if the user says yes.
                        if ( response.gameOver === "YES") {
                            newGame()
                        }
                    }).then(function() {

                        //This section of code is a repeat from the initial prompt required to restart the game properly.
                        for ( let i=0; i<newWord.wordArray.length; i++ ) {
                            
                            var letterScan = newWord.wordArray
                            if ( ( letterScan[i].string  === "-" ) || ( letterScan[i].string === " " ) || ( letterScan[i].string === "." ) ) {
                                letterScan[i].boolean = true
                            }
                        }
                    
                        runGame()
                    })
                } else {

                    runGame()
                }
            }
        }
    })
}

//printWord  grabs the game word and prints it to the console.
function printWord() {

    printedWord = "\nW O R D:  "

    //This loop goes through the word object and grabs the correct values (strings or placeholders) and places them 
    //in the printedWord variable.
    for ( let i=0; i<newWord.wordArray.length; i++ ) {

       if ( newWord.wordArray[i].boolean == true ) {

            printedWord += newWord.wordArray[i].string + " "
       } else {

           printedWord += newWord.wordArray[i].placeholder + " "
       }
    }

    //Place the printedWord in the console.
    printedWord += "\n"
    console.log(printedWord)
}

//gameOver runs if the countdown reaches zero.
function gameOver() {
    
    console.log("\nY O U   L O S T   B I G   T I M E !!!\n")

    //Ask the user if they want to play again.
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
        
        //This section of code is a repeat from the initial prompt required to restart the game properly.
        for ( let i=0; i<newWord.wordArray.length; i++ ) {
            
            var letterScan = newWord.wordArray
            if ( ( letterScan[i].string  === "-" ) || ( letterScan[i].string === " " ) ) {
                letterScan[i].boolean = true
            }
        }
    
        runGame()
    })
}



