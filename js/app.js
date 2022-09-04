var gameBoard = document.getElementById("game");
var start = document.getElementById("start");
var boundaries = document.getElementsByClassName("boundary");
var end = document.getElementById("end");
var sts = document.getElementById("status");
var scoreShow = document.getElementById("score");

// Intializing Variables
var win = false;
var lose = false;
var score = 0;
var orgStatus = sts.textContent;

// Intialzing User in Storage and loading storage data
var username = prompt("Please enter your username: ");
if (!username) username = prompt("Please enter your username: ");
var usernames = loadLocalStorage();

// Main Game:
start.addEventListener("mouseover", () => {
  reset();
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


// -----FUNCTIONS-------:
// reset walls to original color and reset headerContent
function reset() {
  for (bd of boundaries) {
    bd.classList.remove("youlose");
  }
  sts.textContent = orgStatus;
}

// Turn walls color into red(lost)
function redWallsColor() {
  for (bd of boundaries) {
    bd.classList.add("youlose");
  }
}

// when user touches boundaries(lost): update boundariesColors, headerText, score, and database
function touchBoundaries() {
  for (bd of boundaries) {
    bd.addEventListener("mouseover", () => {
      if (!win && !lose) {
        redWallsColor();
        sts.textContent = "You Lost!!";
        lose = true;
        score -= 10;
        scoreShow.textContent = score;
        updateLocalStorage();
      }
    });
  }
}

// user catched cheating(got out of gameBoard): update boundariesColors, and headerText.
function catchCheating() {
  gameBoard.addEventListener("mouseleave", () => {
    if (!win && !lose) {
      redWallsColor();
      sts.textContent = "You Cannot Get Out Of Board, Try Again!!";
      lose = true;
    }
  });
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
