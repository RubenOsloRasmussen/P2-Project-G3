document.addEventListener("DOMContentLoaded", () => {
    let timerSeconds = 0;
    let timerInterval = null;
    let sudokuStarted = false;
    let timerPaused = false;

    const timerDisplay = document.getElementById("timer-id");
    const pauseButton = document.getElementById("pause-b-id");
    const pauseIconImg = document.getElementById("pause-icon-img");
        const pauseIconPath = "./images/pause.png";
        const resumeIconPath = "./images/resume.png";
    const startButton = document.getElementById("start-sudoku-btn");
    const startOverlay = document.getElementById("sudoku-start-overlay");

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    function showOverlay() {
    startOverlay.classList.remove("Hidden");

    if (sudokuStarted) {
        startButton.textContent = "Resume Sudoku";
    } else {
        startButton.textContent = "Start Sudoku";
    }
}
    function hideOverlay() {
        startOverlay.classList.add("Hidden");
    }

    function startTimer() {
        if (timerInterval !== null) return;

        timerInterval = setInterval(() => {
            timerSeconds++;
            timerDisplay.textContent = formatTime(timerSeconds);
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        timerPaused = true;
        pauseIconImg.src = resumeIconPath;
        pauseIconImg.alt = "Resume";
        showOverlay();
    }

    function resumeTimer() {
        sudokuStarted = true;
        timerPaused = false;
        pauseIconImg.src = pauseIconPath;
        pauseIconImg.alt = "Pause";
        hideOverlay();
        startTimer();
    }

    startButton.addEventListener("click", () => {
        resumeTimer();
    });

    pauseButton.addEventListener("click", () => {
        if (!sudokuStarted) {
            resumeTimer();
            return;
        }

        if (timerPaused) {
            resumeTimer();
        } else {
            pauseTimer();
        }
    });

    timerDisplay.textContent = formatTime(timerSeconds);
    showOverlay();
});