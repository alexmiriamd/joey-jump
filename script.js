const startScreen = document.getElementById("start-screen");

//Start Button Functionality
const startButton = document.getElementById("start-btn");

startButton.addEventListener("click", startGame);

function startGame(e) {
    console.log("button was pressed");
    startScreen.classList.add("fade-out");
    
    setTimeout(()=> {
        startScreen.classList.add("hidden");
    }, 500);
    //show the game screen
   }


//Joey jumping mechanics
const joey = document.querySelector(".joey");

document.addEventListener("keydown", (e) => {
    console.log("key was pressed");
    if(e.code === "Space" && !joey.classList.contains("jump")) {
        joey.classList.add("jump");
        setTimeout(() => {
            joey.classList.remove("jump");
        }, 300);
    }
});
