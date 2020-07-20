const buttonColours = ["red", "purple", "yellow", "green"];

let gamePattern = [];
let userClickedPattern = [];

let gameStarted = false;

let level = 0;
let title = document.getElementById("level-title");

// Start the next sequence when a key is pressed
document.addEventListener("keydown", function() {
    if (!gameStarted) {
        
        nextSequence();
        gameStarted = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    title.innerText = "Level " + level;

    // Create a random number
    let randomNumber = Math.floor(Math.random() * 4);

    // Create a random colour and add it to the gamePattern array
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Store random colour element in a variable
    let randomButton = document.querySelector("#" + randomChosenColour);
    
    setTimeout( function() {
        flashButton(randomButton);
        playSound(randomChosenColour);
    }, 500);
    
}

// Store all buttons in an array
const buttons = document.querySelectorAll(".btn");

// Loop through the buttons array and add a click event listener
for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {

        // Get ID of button clicked and push to userClickedPattern array
        let userChosenColour = this.getAttribute("id");
        userClickedPattern.push(userChosenColour);
        
        // Flash and play a sound when the user clicks a button
        flashButton(this);
        playSound(userChosenColour);

        // Check if the user's pattern matches the game's pattern
        checkAnswer(userClickedPattern.length-1);
    })
}

function playSound(name) {
    const sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function flashButton(currentColour) {
    currentColour.classList.add("pressed");
    setTimeout( function() {
        currentColour.classList.remove("pressed");    
    }, 100);
}

function checkAnswer (currentLevel) {

    // If the patterns match, then start the next sequence
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout( function() {
                nextSequence();
            }, 1000);
        }
        
    // If the patterns don't match, then start over
    } else {
        title.innerText = "Game Over! Press Any Key to Restart";

        // Play a sound
        let wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();

        // The page will flash red
        document.querySelector("body").classList.add("game-over");
        setTimeout( function() {
            document.querySelector("body").classList.remove("game-over");
        }, 200);

        // Game values are reset
        gameStarted = false;
        level = 0;
        gamePattern = [];
    } 
}
