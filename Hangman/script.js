var selectableWords = // Word list
    [
        "FERRARI",
        "LAMBORGHINI",
        "ASTONMARTIN",
        "TOYOTA",
        "PEUGEOT",
        "HONDA",
        "MCLAREN",
        "VAUXHALL",
        "PORSCHE",
        "MERCEDESBENZ",
        "ALFAROMEO",
        "AUDI",
        "CHEVROLET",
        "HOLDEN",
        "LANCIA",
        "KOENIGSEGG",
    ];

const maxTries = 10;

var guessedLetters = [];
var wordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var hasFinished = false;
var wins = 0;
var keySound = new Audio('./assets/audio/typewriter_click.wav');
var winSound = new Audio('./assets/audio/you-win.wav');
var loseSound = new Audio('./assets/audio/you-lose.wav');


function resetGame() {
    remainingGuesses = maxTries;
    wordIndex = Math.floor(Math.random() * (selectableWords.length));
    guessedLetters = [];
    guessingWord = [];
    document.getElementById("hangmanImage").src = "";

    for (var i = 0; i < selectableWords[wordIndex].length; i++) {
        guessingWord.push("_");
    }

    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";


    updateDisplay();
};

function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }
    document.getElementById("currentWord").innerText = guessingWordText;
    console.log(guessingWord)
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};



function updateHangmanImage() {
    document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".png";
};

function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    for (var i = 0; i < selectableWords[wordIndex].length; i++) {
        if (selectableWords[wordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
        updateHangmanImage();
    } else {
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        document.getElementById("hangmanImage").style.cssText = "display: none";
        wins++;
        winSound.play();
        hasFinished = true;
    }
};

function checkLoss() {
    if (remainingGuesses <= 0) {
        loseSound.play();
        document.getElementById("gameover-image").style.cssText = "display: block", "img-width: 300px";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        document.getElementById("hangmanImage").style.cssText = "display: block";
        document.getElementById("currentWord").innerText = guessingWord;
        hasFinished = true;
    }
}

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

};


document.onkeydown = function (event) {
    if (hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Check to make sure a-z was pressed.
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            keySound.play();
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};