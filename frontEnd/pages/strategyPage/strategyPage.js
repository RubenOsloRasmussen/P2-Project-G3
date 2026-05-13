import { showProficiency } from "../sudokuPage/helperfunctions.js";

async function loadHTML(targetId, url) {
    const response = await fetch(url);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const target = document.getElementById(targetId);

    Array.from(doc.body.childNodes).forEach(node => {
        target.appendChild(node.cloneNode(true));
    });
}

loadHTML("strategies-box-id", "strategytexts.html");
loadHTML("strategies-side-id", "strategysidebar.html");

function scrollToStrategy(event, id) {
    event.preventDefault();

    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

window.scrollToStrategy = scrollToStrategy;

/* Open overlay when clicking strategy illustration */
document.addEventListener("click", function (event) {
    const clickedImage = event.target.closest(".StrategyIllustrations img");
    if (!clickedImage) return;

    const overlay = document.getElementById("image-overlay-id");
    const overlayImage = document.getElementById("overlay-image-id");

    overlayImage.src = clickedImage.src;
    overlay.classList.remove("hidden");
});

/* Close overlay when clicking background or close button */
document.getElementById("image-overlay-id").addEventListener("click", function (event) {
    const isBackground = event.target.id === "image-overlay-id";
    const isCloseButton = event.target.classList.contains("OverlayCloseButton");

    if (isBackground || isCloseButton) {
        this.classList.add("hidden");
        document.getElementById("overlay-image-id").src = "";
    }
});


/* ------------------------------------------------------------------------------------------------- */

/* Update the colors of the strategy titles */
async function updateStrategyColors() {
    const rawScore = await showProficiency();

    if (rawScore === null) {
        console.error("rawScore is null");
        return;
    }

    let numericScore;

    if (typeof rawScore === "number") {
        numericScore = rawScore;
    } else if (rawScore.score !== undefined) {
        numericScore = Number(rawScore.score);
    } else if (rawScore.proficiency !== undefined) {
        numericScore = Number(rawScore.proficiency);
    } else {
        console.error("Unexpected score format");
        return;
    }

    let score = Number(numericScore.toFixed(0));

    for (let i = score + 1; i <= 10; i++) {
        //console.log("coloring titles with proficiency score " + i);
        Array.from(document.getElementsByClassName(`${i}`)).forEach(element => {
            element.classList.add("inactive");
        })
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(updateStrategyColors, 20);
});
