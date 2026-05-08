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
        timerText.style.display = timerVisible ? "flex" : "none";
        window.sudokuSettings.visibleTimer = timerVisible;
        setSwitch(visibleTimerToggle, timerVisible);
    }

    function applyHighlight() {
        window.sudokuSettings.highlight = highlightVisible;

        if (highlightVisible) {
            document.body.classList.remove("HighlightDisabled");
        } else {
            document.body.classList.add("HighlightDisabled");
        }

        setSwitch(highlightToggle, highlightVisible);
    }

    visibleTimerToggle.addEventListener("click", (e) => {
        e.preventDefault();
        timerVisible = !timerVisible;
        applyTimer();
    });

    highlightToggle.addEventListener("click", (e) => {
        e.preventDefault();
        highlightVisible = !highlightVisible;
        applyHighlight();
    });

    applyTimer();
    applyHighlight();
});