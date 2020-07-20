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
    level++;
    title.innerText = "Level " + level;

    // Create a random number
    let randomNumber = Math.floor(Math.random() * 4);

    // Create a random colour and add it to the gamePattern array
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Store random colour element in a variable
    let randomButton = document.querySelector("#" + randomChosenColour);
    
    flashButton(randomButton);
    playSound(randomChosenColour);
}

// Store all buttons in an array
const buttons = document.querySelectorAll(".btn");

// Loop through the buttons array and add a click event listener
for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {

        // Get ID of button clicked and push to userClickedPattern array
        let userChosenColour = this.getAttribute("id");
        userClickedPattern.push(userChosenColour);
        
        flashButton(this);
        playSound(userChosenColour);

        checkAnswer(userClickedPattern[userClickedPattern.length-1]);
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
    if (userClickedPattern[userClickedPattern.length-1] === gamePattern[gamePattern.length-1]) {
        console.log("Success!");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout( function() {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
        
    } else {
        title.innerText = "Game Over!";
        userClickedPattern = [];
        gamePattern = [];
    } 
}







