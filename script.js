
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");


let score = 0;
let timeLeft = 30;
let gameInterval = null;
let gameRunning = false;


function createTarget() {

    // Création d'un nouvel élément HTML
    const target = document.createElement("div");

    // On lui attribue la classe CSS target
    target.classList.add("target");

    // Dimensions de la zone de jeu
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    // Dimensions de la cible
    const targetSize = 50;

    // Calcul des positions aléatoires
    const randomX = Math.random() * (areaWidth - targetSize);
    const randomY = Math.random() * (areaHeight - targetSize);

    // Positionnement de la cible
    target.style.left = randomX + "px";
    target.style.top = randomY + "px";

    // Événement lors du clic sur la cible
    target.addEventListener("click", function() {

        score++;

        scoreDisplay.textContent = score;

        target.remove();

        createTarget();

    });

    // Ajout de la cible dans la zone de jeu
    gameArea.appendChild(target);
}


function startTimer() {

    gameInterval = setInterval(function() {

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }

    }, 1000);

}


function startGame() {

    score = 0;
    timeLeft = 30;

    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;

    gameRunning = true;

    startButton.style.display = "none";

    createTarget();

    startTimer();

}


function endGame() {

    gameRunning = false;

    clearInterval(gameInterval);

    // Supprimer toutes les cibles
    const targets = document.querySelectorAll(".target");

    targets.forEach(target => target.remove());

    // Afficher le score final
    finalScore.textContent = score;

    // Afficher l'écran de fin
    endScreen.style.display = "block";

}

startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", function() {

    endScreen.style.display = "none";

    startGame();

});