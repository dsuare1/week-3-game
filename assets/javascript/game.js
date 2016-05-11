window.onload = function() {

    // creates gameplay tracking variables
    var wins = 0;
    var remGuesses = 9;
    var lettersGuessed = [];
    var correctLettersGuessed = [];

    // creates an array of characters from which to choose for current character
    var chars = ['frodo', 'sam', 'pippin', 'merry', 'aragorn', 'boromir', 'legolas', 'gimli', 'gandalf', 'gollum', 'galadriel', 'arwen', 'elrond', 'celeborn', 'theoden', 'eomer', 'faramir', 'treebeard', 'isildur', 'denethor', 'sauron', 'saruman', 'grima', 'shelob', 'nazgul'];

    // selects random character from chars array
    var curWord = chars[Math.floor(Math.random() * chars.length)].toLowerCase();;

    // variable to hold char img source
    var imgSrc = "src='assets/images/" + curWord + ".jpg' alt='Character Image'";

    // pick image relating to character
    document.querySelector("#left").innerHTML = "<img id='img-hint'" + imgSrc + ">";


    // creates the active word array so it can be displayed as underscores
    var activeWord = [];
    for (var i = 0; i < curWord.length; i++) {
        activeWord[i] = "_";
    }

    // creates the counter to keep track of the state of current word
    var remainingLetters = curWord.length;

    // Display HTML & variables
    // sets wins to display as 0
    document.querySelector('#wins').innerHTML = "Wins:<br><br>" + wins;

    // sets remaining guess to display as 9
    document.querySelector('#remaining-guesses').innerHTML = "Remaining guesses:<br><br>" + remGuesses;

    // displays the curWord as dashes
    document.querySelector('#current-word').innerHTML = "Current character:<br><br>" + activeWord.join(" ");


    // reset game function
    function resetGame() {

        remGuesses = 9;
        lettersGuessed = [];
        correctLettersGuessed = [];
        curWord = chars[Math.floor(Math.random() * chars.length)].toLowerCase();;

        // reassigns variable to hold char img source
        imgSrc = "src='assets/images/" + curWord + ".jpg' alt='Character Image'";

        // pick image relating to character
        document.querySelector("#left").innerHTML = "<img id='img-hint'" + imgSrc + ">";

        // reassigns the active word array so it can be displayed as underscores
        activeWord = [];

        for (var i = 0; i < curWord.length; i++) {
            activeWord[i] = "_";
        }

        // reassigns the counter to keep track of the state of current word
        remainingLetters = curWord.length;

        document.querySelector('h3').innerHTML = "Press any key to begin your quest!";

        // sets wins to display as 0
        document.querySelector('#wins').innerHTML = "Wins:<br><br>" + wins;

        // sets remaining guess to display as 9
        document.querySelector('#remaining-guesses').innerHTML = "Remaining guesses:<br><br>" + remGuesses;

        // displays the curWord as dashes
        document.querySelector('#current-word').innerHTML = "Current character:<br><br>" + activeWord.join(" ");

        // displays the reset status of the 'letters already guessed' array
        document.querySelector('#letters-guessed').innerHTML = "Letters already guessed:<br><br>";

        // re-displays the game board upon invocation (after timeout) of 'resetGame' function
        document.querySelector('#column-wrapper').style.display = "block";
    }

    // initializes gameplay w/ any keystroke
    document.onkeyup = function(event) {

        // declares variable userGuess and assigns it the value of the key pressed by the user
        var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

        // check to see if the user pressed only a letter key
        if (event.keyCode > 64 && event.keyCode < 91) {

            // check activeWord array to see if correctly guessed letter is already present
            if ((activeWord.indexOf(userGuess) !== -1)) {
                return;
            }

            // check to see if userGuess is in the word; if so, update the 'activeWord' array with the userGuess
            for (var j = 0; j < curWord.length; j++) {
                if (curWord.charAt(j) === userGuess) {
                    activeWord[j] = userGuess;
                    remainingLetters--;
                    document.querySelector('#current-word').innerHTML = "Current character:<br><br>" + activeWord.join(" ");
                }
            }

            // // checks to see if userGuess is NOT in the word AND that letter is already in the "letters already guessed" array to not duplicate
            // // that letter in the array
            if ((curWord.indexOf(userGuess) === -1) && (lettersGuessed.indexOf(userGuess) !== -1)) {
                document.querySelector('#letters-guessed').innerHTML = "Letters already guessed:<br><br>" + lettersGuessed.join(", ");
                return;
            }

            // check to see if userGuess is NOT in the word; if it is not, push userGuess to the "Letters already guessed" array
            for (var k = 0; k < curWord.length; k++) {
                if (curWord.indexOf(userGuess) === -1) {
                    lettersGuessed.push(userGuess)
                    remGuesses--;
                    break;
                }
            }

            // check to see if game is over, either b/c user guessed word || b/c user ran out of guesses
            if (remainingLetters === 0) {
                var audio = new Audio('assets/sounds/clever.mp3');
                audio.play();
                wins++;
                document.querySelector("h3").innerHTML = "Nice job!<br><br>  Get ready for the next character!";
                document.querySelector("#column-wrapper").style.display = "none";
                setTimeout(resetGame, 4000);
            } else if (remGuesses === 0) {
                var audio = new Audio('assets/sounds/claim.mp3');
                audio.play();
                document.querySelector("h3").innerHTML = "You ran out of guesses!<br><br>  Get ready for the next word...";
                document.querySelector("#column-wrapper").style.display = "none";
                setTimeout(resetGame, 4000);
            }

            // display remaining guesses (updated w/ each keystroke [except w/ duplicate keys])
            document.querySelector('#remaining-guesses').innerHTML = "Remaining guesses:<br><br>" + remGuesses;

            // display letters already guessed (updated w/ each keystroke [except w/ duplicate keys])
            document.querySelector('#letters-guessed').innerHTML = "Letters already guessed:<br><br>" + lettersGuessed.join(", ");
        }
    }

}
