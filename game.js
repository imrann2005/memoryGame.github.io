var randomColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

$(document).on("keydown", function () {
    if (!started) {
        
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function () {

    var userChosenButton = $(this).attr("id");

    userClickedPattern.push(userChosenButton);

    playSound(userChosenButton)
    animatePress(userChosenButton);
    checkAnswer(userClickedPattern.length - 1);
})




function playSound(randomChoosenColor) {
    var sound = new Audio("./sounds/" + randomChoosenColor + ".mp3");
    sound.play();
}

function animatePress(userChosenButton) {
    $("#" + userChosenButton).addClass("pressed");
    setTimeout(function () {
        $("#" + userChosenButton).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
       

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        var sound = new Audio("./sounds/wrong.mp3");
        sound.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game-over select any key to continue");
        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    let randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);
    var randomChoosenColor = randomColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);

}
