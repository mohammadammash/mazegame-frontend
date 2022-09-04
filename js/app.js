var gameBoard = document.getElementById("game");
var start = document.getElementById("start");
var boundaries = document.getElementsByClassName("boundary");
var end = document.getElementById("end");
var sts = document.getElementById("status");
var scoreShow = document.getElementById("score");
var levelDropdown = document.getElementById("levelDrop");
var timerShow = document.getElementById("timer");

// Intializing Variables - win(to keep track if user already won) - lose(to keep track if user already loss)
var win = false;
var lose = false;
var score = 0;
var orgStatus = sts.textContent;
var gameTimer = false; //intial value so we don't have error when start trying to clear unexisted interval

// Intialzing User in Storage and loading storage data
var username = prompt("Please enter your username: ");
if (!username) username = prompt("Please enter your username: ");
var usernames = loadLocalStorage();

// -----------MAIN-----------:
start.addEventListener("mouseover", () => {
  reset();
  var time = checkTimebyLevel();
  countdown(time);
  win = false;
  lose = false;
  catchCheating();
  touchBoundaries();

  // if the user reached the end(win): update Score, headerText, and database
  end.addEventListener("mouseover", () => {
    if (!lose && !win) {
      sts.textContent = "You Won!!";
      win = true;
      score += 5;
      scoreShow.textContent = score;
      updateLocalStorage();
    }
  });
});


// ------GAME FUNCTIONS---------:
// reset walls to original color, reset headerContent, and reset level timer
function reset() {
  for (bd of boundaries) {
    bd.classList.remove("youlose");
  }
  sts.textContent = orgStatus;
  checkTimebyLevel();
}

// when user touches boundaries(lost): update boundariesColors, headerText, score, and database
function touchBoundaries() {
  for (bd of boundaries) {
    bd.addEventListener("mouseover", () => {
      if (!win && !lose) {
        userLost();
        sts.textContent = "You lost!!";
      }
    });
  }
}

// user catched cheating(got out of gameBoard): update boundariesColors, headerText, and score.
function catchCheating() {
  gameBoard.addEventListener("mouseleave", () => {
    if (!win && !lose) {
      userLost();
      sts.textContent = "You Cannot Get Out Of Board, Try Again!!";
    }
  });
}

// Turn walls color into red(lost)
function redWallsColor() {
  for (bd of boundaries) {
    bd.classList.add("youlose");
  }
}

// update userState to Loss:
function userLost() {
  redWallsColor();
  lose = true;
  score -= 10;
  scoreShow.textContent = score;
  updateLocalStorage();
  checkTimebyLevel();
}


// ---------- LEVEL AND TIMER FUNCTIONS:
// Check Time according to level selected
function checkTimebyLevel() {
  if(gameTimer) clearInterval(gameTimer);
  var selectedOption = levelDropdown.options[levelDropdown.selectedIndex].value;
  if (selectedOption == 1) {
    return 30000;
  } else if (selectedOption == 2) {
    return 20000;
  }
  return 10000;
}

// Changing the timer shown according to level and game start:
function countdown(time){
  var timeleft = time/1000; //time in seconds for timer(copied to do not affected the setTimeout-gamingTime)
  timerShow.textContent = timeleft;

  gameTimer = setInterval(function () {
    if (timeleft < 0) {
      clearInterval(gameTimer);
    }
    timeleft -= 1;
    timerShow.textContent = timeleft;
  }, 1000);
  setTimeout(function () {
    if (!win && !lose) {
      sts.textContent = "Out of time, Try Again!!";
      userLost();
    }
  }, time);
}

// DB - LOCALSTORAGE
async function loadLocalStorage() {
  var usernames = localStorage.getItem("usernames");
  if (!usernames) {
    var usernames = {};
  } else {
    usernames = JSON.parse(usernames);
  }
  if (username in usernames) {
    scoreShow.textContent = usernames[username];
    score = parseInt(usernames[username]);
  } else {
    usernames[username] = "0";
    localStorage.setItem("usernames", JSON.stringify(usernames));
  }

  return usernames;
}

function updateLocalStorage() {
  usernames[username] = JSON.stringify(score);
  localStorage.setItem("usernames", JSON.stringify(usernames));
}
