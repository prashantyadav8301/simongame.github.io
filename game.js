var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []

var started = false;
var level = 0;

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true
    }
});

$(".a").on("click", function () {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true
    }
});

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    // console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber]
    // console.log(randomChosenColour);
    gamePattern.push(randomChosenColour)
    // console.log(gamePattern);
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text(`Level ${level}`);
}

$(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour)
    // console.log(this.id);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
})

function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`)
    audio.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function () {
        $(".btn").removeClass("pressed");
    }, 100);
}




function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3")
        audio.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}