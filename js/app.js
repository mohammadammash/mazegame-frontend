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

// Main Game:
start.addEventListener("mouseover", () => {
  reset();
  win = false;
  lose = false;

  catchCheating();
  touchBoundaries();

  end.addEventListener("mouseover", () => {
    if (!lose && !win) {
      sts.textContent = "You Won!!";
      win = true;
      winNow = true;
      score += 5;
      scoreShow.textContent = score;
    }
  });
});

// -----FUNCTIONS-------:

// reset walls to original color
function reset() {
  for (bd of boundaries) {
    bd.classList.remove("youlose");
  }
  sts.textContent = orgStatus;
}

// Turn walls color into red:
function redWallsColor() {
  for (bd of boundaries) {
    bd.classList.add("youlose");
  }
}

// user touches boundaries:
function touchBoundaries() {
  for (bd of boundaries) {
    bd.addEventListener("mouseover", () => {
      if (!win && !lose) {
        redWallsColor();
        sts.textContent = "You Lost!!";
        lose = true;
        score -= 10;
        scoreShow.textContent = score;
      }
    });
  }
}

// user catched cheating (got out of gameBoard)
function catchCheating() {
  gameBoard.addEventListener("mouseleave", () => {
    if (!win && !lose) {
      redWallsColor();
      sts.textContent = "You Cannot Get Out Of Board, Try Again!!";
      lose = true;
    }
  });
}
