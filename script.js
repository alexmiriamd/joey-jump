//variables
let gameLoopId;
let running = false;
let score = 0;

let intervalId;

const obstacle = document.querySelector(".obstacle");
const spaceship = document.querySelector(".spaceship");
const spaceJunk = document.querySelector(".spaceJunk");
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

    launchSpaceship();
    launchJunk();
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
    let baseSpeed = 5;
    let speedIncrease = Math.floor(score / 10); // +1 every 10 seconds
    let currentSpeed = Math.min(baseSpeed + speedIncrease, 15); // cap at 15

    obstacleX -= currentSpeed; //speeds up as score increases.
    obstacle.style.left = obstacleX + "px";

    if (obstacleX < -40) {
        obstacleX = window.innerWidth; //reset to starting position
    }
    console.log("Obstacle moved!");
}

function launchSpaceship() {
    const spaceship = document.querySelector('.spaceship');
    spaceship.classList.remove('hidden');
  
    const randomTop = Math.floor(Math.random() * 150) + 50; // 50–200px
    spaceship.style.top = `${randomTop}px`;
  
    let spaceshipX = window.innerWidth + 100;
  
    function moveSpaceship() {
      if (!running) return;
  
      spaceshipX -= 2.5; // make this smaller for slower movement
      spaceship.style.left = `${spaceshipX}px`;
  
      if (spaceshipX < -100) {
        spaceship.classList.add('hidden');
  
        // Wait and restart with random delay + new height
        setTimeout(() => {
          if (running) launchSpaceship();
        }, Math.random() * 5000 + 3000); // 3–8 second delay
      } else {
        requestAnimationFrame(moveSpaceship);
      }
    }
  
    spaceship.style.left = `${spaceshipX}px`; // set starting left position
    console.log("Spaceship X:", spaceshipX);

    moveSpaceship();
  }
  
function launchJunk() {
    const spaceJunk = document.querySelector('.spaceJunk');
    spaceJunk.classList.remove('hidden');

    const randomTop = Math.floor(Math.random() * 150) + 150; // 150–250px from the top
    spaceJunk.style.top = `${randomTop}px`;

    let spaceJunkX = window.innerWidth + 100;

    function moveSpaceJunk() {
        if (!running) return;

        spaceJunkX -= 5; // make this smaller for slower movement
        spaceJunk.style.left = `${spaceJunkX}px`;

        if (spaceJunkX < -100) {
            spaceJunk.classList.add('hidden');

            // Wait and restart with random delay + new height
            setTimeout(() => {
                if (running) launchJunk();
            }, Math.random() * 5000 + 3000); // 3–8 second delay
        }
        else {
            requestAnimationFrame(moveSpaceJunk);
        }
    }
    spaceJunk.style.left = `${spaceJunkX}px`; // set starting left position
    moveSpaceJunk();
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

    document.getElementById("finalScore").innerText = `Joey made it ${score} seconds into orbit!`;
    document.getElementById("gameOverScreen").classList.remove("hidden");
}

//Restart button functionality
const restartButton = document.getElementById("playAgain");
restartButton.addEventListener("click", () => {
    document.getElementById("gameOverScreen").classList.add("hidden");
    resetGame();
    startGame();
});

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
    

    if (checkCollision(joey, obstacle) || checkCollision(joey, spaceship) || checkCollision(joey, spaceJunk)) {
        console.log("💥 COLLISION DETECTED!");
        endGame();
        return;
    }

    gameLoopId = requestAnimationFrame(gameLoop); //request the next frame
}