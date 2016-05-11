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
    console.log(curWord);

    // variable to hold char img source
    var imgSrc = "src='assets/images/" + curWord + ".jpg' alt='Character Image'";
    console.log(imgSrc);

    // pick image relating to character
    document.querySelector("#left").innerHTML = "<img id='img-hint'" + imgSrc + ">";


    // creates the active word array so it can be displayed as underscores
    var activeWord = [];
    for (var i = 0; i < curWord.length; i++) {
        activeWord[i] = "_";
    }
    console.log(activeWord);
    console.log(curWord);

    // creates the counter to keep track of the state of current word
    var remainingLetters = curWord.length;
    console.log(remainingLetters);



    // Display HTML & variables
    // sets wins to display as 0
    document.querySelector('#wins').innerHTML = "Wins:<br>" + wins;

    // sets remaining guess to display as 9
    document.querySelector('#remaining-guesses').innerHTML = "Remaining guesses:<br>" + remGuesses;

    // displays the curWord as dashes
    document.querySelector('#current-word').innerHTML = "Current character:<br>" + activeWord.join(" ");


    // reset game function
    function resetGame() {

        console.log("reset was called");

        wins = 0;
        remGuesses = 9;
        lettersGuessed = [];
        correctLettersGuessed = [];
        curWord = chars[Math.floor(Math.random() * chars.length)].toLowerCase();;
        console.log(curWord);

        // variable to hold char img source
        imgSrc = "src='assets/images/" + curWord + ".jpg' alt='Character Image'";
        console.log(imgSrc);

        // pick image relating to character
        document.querySelector("#left").innerHTML = "<img id='img-hint'" + imgSrc + ">";

        // creates the active word array so it can be displayed as underscores
        activeWord = [];

        for (var i = 0; i < curWord.length; i++) {
            activeWord[i] = "_";
        }
        console.log(activeWord);
        console.log(curWord);

        // creates the counter to keep track of the state of current word
        remainingLetters = curWord.length;
        console.log(remainingLetters);

        document.querySelector('h3').innerHTML = "Press any key to begin your quest!";

        // sets wins to display as 0
        document.querySelector('#wins').innerHTML = "Wins:<br>" + wins;

        // sets remaining guess to display as 9
        document.querySelector('#remaining-guesses').innerHTML = "Remaining guesses:<br>" + remGuesses;

        // displays the curWord as dashes
        document.querySelector('#current-word').innerHTML = "Current character:<br>" + activeWord.join(" ");

        document.querySelector('#letters-guessed').innerHTML = "Letters already guessed:<br>";

        document.querySelector('#column-wrapper').style.display = "block";
    }

    // initializes gameplay w/ any keystroke
    document.onkeyup = function(event) {

        // declares variable userGuess and assigns it the value of the key pressed by the user
        var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
        console.log(userGuess);

        // check activeWord array to see if correctly guessed letter is already present
        if ((activeWord.indexOf(userGuess) !== -1)) {
            return;
        }

        // check to see if userGuess is in the word; if so, update the 'activeWord' array with the userGuess
        for (var j = 0; j < curWord.length; j++) {
            if (curWord.charAt(j) === userGuess) {
                activeWord[j] = userGuess;
                remainingLetters--;
                console.log(remainingLetters);
                document.querySelector('#current-word').innerHTML = "Current character:<br>" + activeWord.join(" ");
                console.log(activeWord);
            }
        }

        // // checks to see if userGuess is NOT in the word AND that letter is already in the "letters already guessed" array to not duplicate
        // // that letter in the array   --> DOESN'T WORK
        if ((curWord.indexOf(userGuess) === -1) && (lettersGuessed.indexOf(userGuess) !== -1)) {
            document.querySelector('#letters-guessed').innerHTML = "Letters already guessed:<br>" + lettersGuessed.join(", ");
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

        // if ((remainingLetters === 0) || (remGuesses === 0)) {
        //     resetGame();
        // }

        if (remainingLetters === 0) {
            // alert("Nice job!  Get ready for the next character!");
            document.querySelector("h3").innerHTML = "Nice job!  Get ready for the next character!";
            document.querySelector("#column-wrapper").style.display = "none";
            setTimeout(resetGame, 3000);
        } else if (remGuesses === 0) {
            document.querySelector("h3").innerHTML = "You ran out of guesses!  Get ready for the next word...";
            document.querySelector("#column-wrapper").style.display = "none";
            setTimeout(resetGame, 3000);
        }

        document.querySelector('#remaining-guesses').innerHTML = "Remaining guesses:<br>" + remGuesses;

        document.querySelector('#letters-guessed').innerHTML = "Letters already guessed:<br>" + lettersGuessed.join(", ");
    }

}
