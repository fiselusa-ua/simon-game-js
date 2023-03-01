const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

let started = false;

const startOver = function () {
  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
};

const checkAnswer = function (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success", gamePattern, userClickedPattern);

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong", gamePattern, userClickedPattern);

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    //2. Call startOver() if the user gets the sequence wrong.
    startOver();
  }
};

const playSound = function (name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.volume = 0.01;
  audio.play();
};

const animatePress = function (currentColour) {
  $(`#${currentColour}`).toggleClass("pressed");
  setTimeout(() => $(`#${currentColour}`).toggleClass("pressed"), 100);
};

const nextSequence = function () {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  const randomNumber = Math.floor(Math.random() * 3);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

$(".btn").click(function () {
  const userChosenColour = $(this).attr("id");
  //   userClickedPattern.push(userChosenColour);
  //   playSound(userChosenColour);
  //   animatePress(userChosenColour);
  //   checkAnswer(userClickedPattern.lenght - 1);
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Start the game
$(document).keydown(function () {
  //   debugger;
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});
