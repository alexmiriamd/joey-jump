//variables
let gameLoopId;
let running = false;
let score = 0;

let intervalId;

const obstacle = document.querySelector(".obstacle");
const joey = document.querySelector(".joey");

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

    running = true; //set running to true
    score = 0;
    startTime = Date.now();
    intervalId = setInterval(updateScore, 2000);
    gameLoop();
   }


//Joey jumping mechanics


document.addEventListener("keydown", (e) => {
    if(e.code === "Space" && !joey.classList.contains("jump")) {
        joey.classList.add("jump");
        setTimeout(() => {
            joey.classList.remove("jump");
        }, 600);
    }
});

//obstacle mechanics

let obstacleX = window.innerWidth; //starting off screen

function moveObstacle() {
    obstacleX -= 5; //moving left 5px every frame
    obstacle.style.left = obstacleX + "px";

    if (obstacleX < -40) {
        obstacleX = window.innerWidth; //reset to starting position
    }
    console.log("Obstacle moved!");
}

//Collision detection
function checkCollision(joey, obstacle){
    const joeyRect = joey.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return (
        joeyRect.right > obstacleRect.left &&
        joeyRect.left < obstacleRect.right &&
        joeyRect.bottom > obstacleRect.top &&
        joeyRect.top < obstacleRect.bottom
      );      
}

//score function
function updateScore() {
    let currentTime = Date.now();
    let elapsedTime = Math.floor((currentTime - startTime) / 1000); //in seconds
    score = Math.floor(elapsedTime, 2); //score increases
    document.getElementById("score-counter").innerText = score;
}

//Game over function
function endGame() {
    running = false; //stop the game loop
    clearInterval(intervalId); //stop the score update
    cancelAnimationFrame(gameLoopId); //stop the game loop
    document.getElementById("gameOverScreen").classList.remove("hidden");
    const gameOverEl = document.getElementById("gameOverScreen");
gameOverEl.classList.remove("hidden");
console.log("Game Over!", gameOverEl);
console.log("Computed style:", window.getComputedStyle(gameOverEl).display);


}

//reset position functions
function resetGame() {
    obstacleX = window.innerWidth; //reset obstacle position
    score = 0; //reset score
    startTime = Date.now(); //reset time
    document.getElementById("score-counter").innerText = score; //update score display
}

//Game loop
function gameLoop() {
    if (!running) return; //if not running, exit the loop

    moveObstacle();
    

    if (checkCollision(joey, obstacle)) {
        console.log("💥 COLLISION DETECTED!");
        endGame();
        return;
    }

    gameLoopId = requestAnimationFrame(gameLoop); //request the next frame
}