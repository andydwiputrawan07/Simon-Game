let userClickedPattern = [];
let level = 0;
let gameStarted = false;
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];

function randomNumber() {
    return Math.floor(Math.random() * 4);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log("User Clicked Pattern: ", userClickedPattern);

    checkAnswer(userClickedPattern.length - 1); // Cek jawaban
});


function nextSequence() {
    userClickedPattern = []; // Reset pattern user untuk level baru
    level++;
    $("#level-title").text("Level " + level);

    let randomChosenColor = buttonColors[randomNumber()];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(document).keydown(function () {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("✔️ Correct");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("❌ Wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}