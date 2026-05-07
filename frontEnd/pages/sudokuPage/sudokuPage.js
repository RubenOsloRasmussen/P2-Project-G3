import { findSameNumberInstances } from "./notationHelperFunctions.js";
import { indexToRowAndColumn } from "./helperfunctions.js";
import { SudokuRenderer } from "./sudokuRenderer.js";
import { InputController } from "./inputController.js";

class SudokuCell {
    constructor(number, lockedState, colorNumber, rowIndex, columnIndex) {
    this.number = number; // Int, the number in the given cell or "null"
    this.locked = lockedState; // Bool, is this number permanent?
    this.candidateBlock = null,
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.isTargetCell = false;
    this.isHighlighted = false;
    this.isSimilarNumber = false;
    this.htmlElement = null;
    this.htmlColourCell = null;
    this.htmlTextElement = null;
    this.cellColour = "#ffffff";
    }
}

export class SudokuBoard {
    constructor(initialCellsArr, notationMode = "defaultNotation") {
        this.sudokuCells = initialCellsArr;
        this.inputController = null;
        this.notationMode = notationMode; // Options: "none", "defaultNotation", "cornerNotation", "centerNotation", "colorNotationRed", "colorNotationGreen", "colorNotationBlue"
        this.targetCell = null;
    }

    clearCandidates(sudokuCell) {
        sudokuCell.candidateBlock.cornerNotation.topCornerCandidates = [];
        sudokuCell.candidateBlock.cornerNotation.bottomCornerCandidates = [];
        sudokuCell.candidateBlock.centerNotation.centerCandidates = [];
    }

    insertCellNumber(sudokuCell, number) {
        if (!sudokuCell.isTargetCell || sudokuCell.locked || !(/^[1-9]$/.test(number))) return;
        sudokuCell.number = number;

        this.clearSimilarNumberHighlights(sudokuCell.rowIndex, sudokuCell.columnIndex);
        this.highlightSimilarNumbers(sudokuCell.rowIndex, sudokuCell.columnIndex);
    }

    deleteCellNumber(sudokuCell) {
        if (!sudokuCell.isTargetCell || sudokuCell.locked) return;
        this.clearSimilarNumberHighlights(sudokuCell.rowIndex, sudokuCell.columnIndex);
        sudokuCell.number = null;
     
    }

    setNotationMode(notationMode) {
        this.notationMode = notationMode;
    }

    isBoardFull() {
        for (let r = 0; r <= 8; r++) {
            for (let c = 0; c <= 8; c++) {
                if (!this.sudokuCells[r][c].number) {
                    return false;
                }
            }
        }
        return true;
    }

    changeCellColour(r, c, color) {
        this.sudokuCells[r][c].cellColour = color;
    }

    selectCell(r, c) {
        this.clearHighlights();
        this.sudokuCells[r][c].isTargetCell = true;
        this.targetCell = this.sudokuCells[r][c];
        this.highlightColumn(c);
        this.highlightRow(r);
        this.highlightBlock(r, c);
        this.highlightSimilarNumbers(r, c);
        console.log("notation" + this.notationMode);

        if (this.notationMode.startsWith("colorNotation")) {
            const color = this.notationMode.replace("colorNotation", "").toLowerCase();

            if (this.sudokuCells[r][c].cellColour === color) {
                this.changeCellColour(r, c, null);
            } else {
                this.changeCellColour(r, c, color);
            }
        }
    }

    clearSimilarNumberHighlights() {
        for (let r = 0; r <= 8; r++) {
            for (let c = 0; c <= 8; c++) {
                this.sudokuCells[r][c].isSimilarNumber = false;
                this.sudokuCells[r][c].isHighlighted = false;
            }
        }
    }

    clearHighlights() {
        for (let r = 0; r <= 8; r++) {
            for (let c = 0; c <= 8; c++) {
                this.sudokuCells[r][c].isHighlighted = false;
                this.sudokuCells[r][c].isSimilarNumber = false;
                this.sudokuCells[r][c].isTargetCell = false;
                this.targetCell = null;
            }
        }
    }

    highlightColumn(c) {
        for (let r = 0; r <= 8; r++) {
            this.sudokuCells[r][c].isHighlighted = true;
        }
    }

    highlightRow(r) {
        for (let c = 0; c <= 8; c++) {
            this.sudokuCells[r][c].isHighlighted = true;
        }
    }

    highlightBlock(r, c) {
        const { rowRange, columnRange } = this.getBlockRange(r, c);
        for (let r = rowRange[0]; r <= rowRange[1]; r++) {
            for (let c = columnRange[0]; c <= columnRange[1]; c++) {
                this.sudokuCells[r][c].isHighlighted = true;
            }
        }
    }

    highlightSimilarNumbers(r, c) {
        if (!this.sudokuCells[r][c].number) return;
        let numberInstances = findSameNumberInstances(r, c, this.sudokuCells);
        for (let i = 0; i < numberInstances.length; i++) {
            let { row, column } = indexToRowAndColumn(numberInstances[i]);
            this.sudokuCells[row][column].isHighlighted = true;
            this.sudokuCells[row][column].isSimilarNumber = true;
        }
    }

    getBlockRange(r, c) {
        let rowRange = [], columnRange = [];
        if (r <= 2) {
            rowRange.push(0, 2);
        } else if (r <= 5) {
            rowRange.push(3, 5);
        } else if (r <= 8) {
            rowRange.push(6, 8);
        }

        if (c <= 2) {
            columnRange.push(0, 2);
        } else if (c <= 5) {
            columnRange.push(3, 5);
        } else if (c <= 8) {
            columnRange.push(6, 8);
        }

        return {
            rowRange: rowRange,
            columnRange: columnRange
        }
    }

    getBlockNumber(rowIndex, columnIndex) {
        if (rowIndex <= 2) {
            if (columnIndex <= 2) {
                return 0;
            } else if (columnIndex <= 5) {
                return 1;
            } else if (columnIndex <= 8) {
                return 2;
            }
        } else if (rowIndex <= 5) {
            if (columnIndex <= 2) {
                return 3;
            } else if (columnIndex <= 5) {
                return 4;
            } else if (columnIndex <= 8) {
                return 5;
            }
        } else if (rowIndex <= 8) {
            if (columnIndex <= 2) {
                return 6;
            } else if (columnIndex <= 5) {
                return 7;
            } else if (columnIndex <= 8) {
                return 8;
            }
        }
        return -1;
    }
}


//The sudoku board is initialized as an undefined 9*9 matrix
let sudokuCells = [
    ["", , , , , , , , ""],
    ["", , , , , , , , ""],
    ["", , , , , , , , ""],
    ["", , , , , , , , ""],
    ["", , , , , , , , ""],
    ["", , , , , , , , ""],
    ["", , , , , , , , ""],
    ["", , , , , , , , ""],
    ["", , , , , , , , ""],
]

// Backend code for proficiency score calculation and sudoku level selection, not currently used in the frontend but will be used in the future when the backend is connected to the frontend
//const err = 1
//const time = Math.random()*150000

async function getProficiency(err, time) {
    try {
        const res = await fetch(`/api/proficiency?err=${err}&time=${time}`);

        const data = await res.json();

        console.log("proficiency is", data);

        return data.data;

    } catch (error) {
        console.error("Failed to fetch proficiency:", error);

        return null;
    }
}

const proficiencyText = document.getElementById("proficiency-score");

async function updateStrategyPopup() {

    if (!proficiencyText) {
        console.error("Missing #proficiency-score in HTML");
        return;
    }

    const err = 0;
    const time = 300;

    const data = await getProficiency(err, time);

    if (data === null) {
        proficiencyText.textContent = "Error";
        return;
    }

    if (typeof data === "number") {
        proficiencyText.textContent = data.toFixed(1);

    } else if (data.score !== undefined) {
        proficiencyText.textContent = Number(data.score).toFixed(1);

    } else if (data.proficiency !== undefined) {
        proficiencyText.textContent = Number(data.proficiency).toFixed(1);

    } else {
        proficiencyText.textContent = JSON.stringify(data);
    }
}

//getProficiency(err, time);

let sudokuNumber = 300;
const boardData = await loadSudokuBoard(sudokuNumber);

async function loadSudokuBoard(sudokuNumber){
    const res = await fetch(`/api/sudoku?sudokuNumber=${sudokuNumber}`);
    const data = await res.json();

    return data.board;
}

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        const value = boardData[i][j];

        sudokuCells[i][j] = new SudokuCell(value, value !== null, null, i, j);
    }
}

const sudokuBoard = new SudokuBoard(sudokuCells);
const sudokuRenderer = new SudokuRenderer(sudokuBoard);
const inputController = new InputController(sudokuBoard, sudokuRenderer);

sudokuBoard.inputController = inputController;

sudokuRenderer.setupBoard();
sudokuRenderer.bindCellEvents();
sudokuRenderer.bindNotationEvents();


// This is the button code, that adds the activeNotation class to the clicked button
const buttons = document.querySelectorAll('#notation-boxes button:not(#forfeit-btn)');

buttons.forEach((button) => {
    button.addEventListener('click', () => {

        // remove active from all
        buttons.forEach((btn) => btn.classList.remove('activeNotation'));

        // add to clicked one
        button.classList.add('activeNotation');

    });
});

// The PopUp Elements
const settingsIcon = document.getElementById("settings-icon");
const settingsPopUp = document.querySelector('#settings-pop-up');
const closeSettingsBtn = document.querySelector('#close-settings-btn');

const strategyIcon = document.getElementById("strategy-icon");
const strategyPopUp = document.getElementById("strategy-pop-up");
const closeStrategyBtn = document.getElementById("close-strategy-btn");

const forfeitBtn = document.getElementById("forfeit-btn");
const forfeitPopUp = document.getElementById("forfeit-pop-up");
const confirmForfeitBtn = document.getElementById("confirm-forfeit-btn");
const cancelForfeitBtn = document.getElementById("cancel-forfeit-btn");

// Settings PopUp
settingsIcon.addEventListener('click', () => {
    // Close strategy popup first
    strategyPopUp.classList.add("Hidden");

    // Open settings
    settingsPopUp.classList.remove('Hidden');
});

closeSettingsBtn.addEventListener('click', () => {
    settingsPopUp.classList.add('Hidden');
});


// The toggles in the settings popup, that can be toggled on and off by clicking on them
const toggles = document.querySelectorAll(".ToggleSwitch");

toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
    });
});

// Startegy PopUp
strategyIcon.addEventListener("click", async () => {
    // Close settings popup first
    settingsPopUp.classList.add("Hidden");

    try {
    await updateStrategyPopup();
    } catch (error) {
        console.error("Strategy popup score update failed:", error);
    }

    // Open strategy
    strategyPopUp.classList.remove("Hidden");
});

closeStrategyBtn.addEventListener("click", () => {
    strategyPopUp.classList.add("Hidden");
});

// Forfeit PopUp
forfeitBtn.addEventListener("click", () => {
    settingsPopUp.classList.add("Hidden");
    strategyPopUp.classList.add("Hidden");
    forfeitPopUp.classList.remove("Hidden");
});

// Cancel forfeit and go back to the game
cancelForfeitBtn.addEventListener("click", () => {
    forfeitPopUp.classList.add("Hidden");
});

// Confirm forfeit and go back to start page
confirmForfeitBtn.addEventListener("click", () => {
    window.location.href = "/pages/startPage/startPage.html";
});

// Next sudoku popup
const nextSudokuBtn = document.getElementById("next-sudoku-btn");

nextSudokuBtn.addEventListener("click", () => {
    window.location.reload();
});