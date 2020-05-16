var btnColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
$(document).keypress(function () {
	if (!started) {
		$("#heading").text("Level " + level);
		sequenceOfNumber();
		started = true;
	}
});


$(".btn").click(function () {
	var usrChoice = $(this).attr("id");
	userClickedPattern.push(usrChoice);

	playSound(usrChoice);
	addAimation(usrChoice);

	checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("sucess");
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(() => {
				sequenceOfNumber();
			}, 1000);
		}
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		$("#heading").text("Game Over, press any key to start again");
		setTimeout(() => {
			$("body").removeClass("game-over");
		}, 200);
		console.log("wrong");
		startOver();
	}
}

function sequenceOfNumber() {
	userClickedPattern = [];
	level++;
	$("#heading").text("Level " + level);
	var randomNumber = Math.floor(Math.random() * 4);
	var chosenBtn = btnColors[randomNumber];
	gamePattern.push(chosenBtn);
  $("#" + chosenBtn).addClass("cpu-press");
  setInterval(() => {
    $("#" + chosenBtn).removeClass("cpu-press");
  }, 100);
	playSound(chosenBtn);
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}
function addAimation(clickedColor) {
	$("#" + clickedColor).addClass("btn-pressed");
	setTimeout(function () {
		$("#" + clickedColor).removeClass("btn-pressed");
	}, 100);
}
function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
