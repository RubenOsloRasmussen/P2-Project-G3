document.addEventListener("DOMContentLoaded", () => {
    const visibleTimerToggle = document.getElementById("visible-timer-toggle");
    const highlightToggle = document.getElementById("highlight-toggle");
    const timerText = document.getElementById("timer-id");

    let timerVisible = true;
    let highlightVisible = true;

    window.sudokuSettings = {
        visibleTimer: true,
        highlight: true
    };

    function setSwitch(toggle, isOn) {
        toggle.classList.remove("active");

        if (isOn) {
            toggle.classList.add("active");
        }
    }

    function applyTimer() {
        timerText.style.visibility = timerVisible ? "visible" : "hidden";
        window.sudokuSettings.visibleTimer = timerVisible;
        setSwitch(visibleTimerToggle, timerVisible);
    }

    function applyHighlight() {
    window.sudokuSettings.highlight = highlightVisible;
    setSwitch(highlightToggle, highlightVisible);

    document.querySelectorAll(".SudokuCell").forEach(cellElement => {
        const sudokuCell = cellElement.sudokuCell;
        if (!sudokuCell) return;

        if (sudokuCell.isTargetCell) {
            cellElement.style.backgroundColor = "#bbd0f5";
        } else {
            cellElement.style.backgroundColor = "#ffffff";
        }
    });
}

    visibleTimerToggle.addEventListener("click", (e) => {
        e.preventDefault();
        timerVisible = !timerVisible;
        console.log(`Timer toggle has been pressed, it is now ${timerVisible}`);
        applyTimer();
    });

    highlightToggle.addEventListener("click", (e) => {
        e.preventDefault();
        highlightVisible = !highlightVisible;
        console.log(`Highlight toggle has been pressed, it is now ${highlightVisible}`);
        applyHighlight();
    });

    applyTimer();
    applyHighlight();
});