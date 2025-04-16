const startScreen = document.getElementById("start-screen");

//Start Button Functionality
const startButton = document.getElementById("start-btn");

startButton.addEventListener("click", startGame);

function startGame(e) {
    startScreen.classList.add("fade-out");
    
    setTimeout(()=> {
        startScreen.classList.add("hidden");
    }, 500);
    //show the game screen
   }


//Joey jumping mechanics
const joey = document.querySelector(".joey");

document.addEventListener("keydown", (e) => {
    if(e.code === "Space" && !joey.classList.contains("jump")) {
        joey.classList.add("jump");
        setTimeout(() => {
            joey.classList.remove("jump");
        }, 600);
    }
});

//obstacle mechanics
const obstacle = document.querySelector(".obstacle");
let obstacleX = window.innerWidth; //starting off screen

function moveObstacle() {
    obstacleX -= 2; //moving left 5px every frame
    obstacle.style.left = obstacleX + "px";

    if (obstacleX < -50) {
        obstacleX = window.innerWidth; //reset to starting position
    }
    requestAnimationFrame(moveObstacle); //keep moving the obstacle
}
moveObstacle(); //start the animation!