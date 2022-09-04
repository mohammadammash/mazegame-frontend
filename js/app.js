var gameBoard = document.getElementById("game");
var start = document.getElementById("start");
var boundaries = document.getElementsByClassName("boundary");
var end = document.getElementById("end");
var sts = document.getElementById('status')
var orgStatus = sts.textContent;

// Game Start
start.addEventListener("mouseover", (e) => {
    reset();
    var win = lose = false;

    for (bd of boundaries) {
        bd.addEventListener('mouseover',()=>{
            console.log(win);
            if(!win){
            redWallsColor();
            sts.textContent = 'You Lost!!';
            lost = true;
            }
        })
    }

    end.addEventListener('mouseover',()=>{
        if (!lost){
            sts.textContent = "You Won!!";
            win = true;
        }
    })

})


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




