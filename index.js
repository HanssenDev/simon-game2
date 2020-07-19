const buttonColours = ["red", "blue", "yellow", "green"];
let gamePattern = [];
let = userClickedPattern = [];

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    
    // Create a random colour and add it to the gamePattern array
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Store random colour element in a variable
    let element = document.querySelector("#" + randomChosenColour);
    
    // Random colour will flash
    element.classList.add("flash");
    setTimeout( function() {
        element.classList.remove("flash");    
    }, 150)

    // Random colour will play sound
    const sound = new Audio("sounds/" + randomChosenColour + ".mp3");
    sound.play();

}

// Store all buttons in an array
const buttons = document.querySelectorAll(".btn");

// Loop through the buttons array and add a click event listener
for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        // return the ID value of the clicked button and push it to the userClickedPattern array
        let userChosenColour = this.getAttribute("id");
        userClickedPattern.push(userChosenColour);
    })
}








