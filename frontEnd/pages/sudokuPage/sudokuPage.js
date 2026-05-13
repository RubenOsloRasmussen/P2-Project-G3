import { findSameNumberInstances } from "./notationHelperFunctions.js";
import { findSameBlockInstances } from "./notationHelperFunctions.js";

import { indexToRowAndColumn } from "./helperfunctions.js";
import { rowAndColumnToIndex } from "./helperfunctions.js";
import { showProficiency } from "./helperfunctions.js";
import { forfeitProficiency } from "./helperfunctions.js";

import { SudokuRenderer } from "./sudokuRenderer.js";
import { InputController } from "./inputController.js";

class SudokuCell {
    constructor(number, lockedState, rowIndex, columnIndex) {
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

const strategies = {
    0: ["Naked Single"],
    1: ["Hidden Single"],
    2: ["Locked Candidates (Pointing Pair / Triple)"],
    3: ["Naked Pair"],
    4: ["Hidden Pair"],
    5: ["Naked Triple", "Hidden Triple"],
    6: ["X-Wing", "Simple Coloring"],
    7: ["XY-Wing", "XYZ-Wing"],
    8: ["W-Wing", "Swordfish"],
    9: ["Alternating Inference Chains (AIC)", "Forcing Chains", "Almost Locked Sets (ALS)"],
    10: ["Sue de Coq", "Jellyfish"]
};

export class SudokuBoard {
    constructor(initialCellsArr, solvedSudoku, notationMode = "defaultNotation") {
        this.sudokuCells = initialCellsArr;
        this.inputController = null;
        this.notationMode = notationMode; // Options: "none", "defaultNotation", "cornerNotation", "centerNotation", "colorNotationRed", "colorNotationGreen", "colorNotationBlue"
        this.targetCell = null;
        this.previousTargetCell = null;

        this.solvedSudoku = solvedSudoku;
        this.errorCount = 0;
        this.inFaultyState = false; // if a locked in error exists
        this.hasUnlockedError = false;
        this.unlockedCellError = null; // refers to SudokuCell object in which there is an unlocked error
    }
    /*-------------------------------------- Error tracker ----------------------------------------*/
    
    lockInError(r, c) {
        if ((!this.hasUnlockedError && !(this.unlockedCellError.rowIndex != r || this.unlockedCellError.columnIndex != c)) || this.inFaultyState) return;
        this.errorCount += 1;
        this.inFaultyState = true;
        this.hasUnlockedError = false;
    }

    errorInCell(r, c) {
        if (sudokuCells[r][c].number != solvedSudoku[r][c]) return true;
        return false;
    }

    misplacedNumberInBoard() {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (sudokuCells[r][c].number) {
                    if (this.errorInCell(r, c)) return true;
                }
            }
        } 

        return false;
    }

    clearErrorTrackingProperties() {
        this.inFaultyState = false;
        this.hasUnlockedError = false;
        this.unlockedCellError = null;
    }
    
    updateErrorState(sudokuCell, number) {
        if (this.hasUnlockedError) {
            if (this.unlockedCellError.rowIndex == sudokuCell.rowIndex && this.unlockedCellError.columnIndex == sudokuCell.columnIndex) {
                if (number == solvedSudoku[sudokuCell.rowIndex][sudokuCell.columnIndex]) {
                    this.hasUnlockedError = false;
                    this.unlockedCellError = null;
                }
            } else {
                this.lockInError(this.unlockedCellError.rowIndex, this.unlockedCellError.columnIndex);
            }
        } else {
            if (number != solvedSudoku[sudokuCell.rowIndex][sudokuCell.columnIndex]) {
                this.hasUnlockedError = true;
                this.unlockedCellError = sudokuCell;
            }
        }
    }


    /*-------------------------------------- Cell manipulation ------------------------------------*/

    /**
     * This function clears all candidates (corner and center notation) in a given cell.
     * @param {*} sudokuCell The given cell.
     */
    clearCandidates(sudokuCell) {
        sudokuCell.candidateBlock.cornerNotation.topCornerCandidates = [];
        sudokuCell.candidateBlock.cornerNotation.bottomCornerCandidates = [];
        sudokuCell.candidateBlock.centerNotation.centerCandidates = [];
    }

    /**
     * This function inserts a given number in a given cell, as long as the number is valid and the cell is selected and not locked.
     * @param {*} sudokuCell The given cell.
     * @param {*} number The given number.
     * @returns 
     */
    insertCellNumber(sudokuCell, number) {
        if (!sudokuCell.isTargetCell || sudokuCell.locked || !(/^[1-9]$/.test(number))) return;
        if (!this.misplacedNumberInBoard()) this.clearErrorTrackingProperties();
        this.updateErrorState(sudokuCell, number);

        sudokuCell.number = number;

        console.log("error count:", this.errorCount);

        this.clearSimilarNumberHighlights(sudokuCell.rowIndex, sudokuCell.columnIndex);
        this.highlightSimilarNumbers(sudokuCell.rowIndex, sudokuCell.columnIndex);
    }

    /**
     * This function deletes the number in the given cell, as long as the cell is selected and not locked.
     * It also clears the highlighting of similar numbers.
     * @param {*} sudokuCell The given cell.
     * @returns 
     */
    deleteCellNumber(sudokuCell) {
        if (!sudokuCell.isTargetCell || sudokuCell.locked) return;
        this.clearSimilarNumberHighlights(sudokuCell.rowIndex, sudokuCell.columnIndex);
        sudokuCell.number = null;

    }

    setNotationMode(notationMode) {
        this.notationMode = notationMode;
    }

    /**
     * This function changes the color of a cell.
     * @param {*} r The row index of the cell.
     * @param {*} c The column index of the cell.
     * @param {*} color The color the cell needs to be changed to.
     */
    changeCellColour(r, c, color) {
        this.sudokuCells[r][c].cellColour = color;
    }

    /**
     * This function handles cell selection logic when a cell is pressed.
     * It clears previous highlights and sets the selected cell as the target.
     * It then updates row, column, block and similar number highlights,
     * runs the necessary functions when a cell has been pressed
     * and applies color notation if enabled.
     * @param {*} r Row index of the selected cell
     * @param {*} c Column index of the selected cell
     */
    selectCell(r, c) {
        this.clearHighlights();
        this.sudokuCells[r][c].isTargetCell = true;
        this.previousTargetCell = this.targetCell;
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

    /*---------------------------------------- Highlighting ---------------------------------------*/

    /**
     * This function clears all highlights related to similar numbers on the board,
     * as well as resetting both similar number and general highlight flags for all cells.
     */
    clearSimilarNumberHighlights() {
        for (let r = 0; r <= 8; r++) {
            for (let c = 0; c <= 8; c++) {
                this.sudokuCells[r][c].isSimilarNumber = false;
                this.sudokuCells[r][c].isHighlighted = false;
            }
        }
    }

    /**
     * This function clears all highlights on the board.
     * It also resets the target cell, similar number and general highlights.
     */
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

    /**
     * This function highlights the entire column, given a column index.
     * @param {*} c The column index.
     */
    highlightColumn(c) {
        for (let r = 0; r <= 8; r++) {
            this.sudokuCells[r][c].isHighlighted = true;
        }
    }

    /**
     * This function highlights the entire row, given a row index.
     * @param {*} r The row index.
     */
    highlightRow(r) {
        for (let c = 0; c <= 8; c++) {
            this.sudokuCells[r][c].isHighlighted = true;
        }
    }

    /**
     * This function highlights the entire block, given a row and column index pair.
     * @param {*} r The row index.
     * @param {*} c The column index.
     */
    highlightBlock(r, c) {
        const blockIndices = findSameBlockInstances(r, c, this.sudokuCells);

        for (let i = 0; i < blockIndices.length; i++) {
            const { row, column } = indexToRowAndColumn(blockIndices[i]);
            this.sudokuCells[row][column].isHighlighted = true;
        }
    }

    /**
     * This function highlights all cells with the same number as the pressed cell given a row and column index pair.
     * @param {*} r The row index.
     * @param {*} c The column index.
     * @returns 
     */
    highlightSimilarNumbers(r, c) {
        if (!this.sudokuCells[r][c].number) return;
        let numberInstances = findSameNumberInstances(r, c, this.sudokuCells);
        for (let i = 0; i < numberInstances.length; i++) {
            let { row, column } = indexToRowAndColumn(numberInstances[i]);
            this.sudokuCells[row][column].isHighlighted = true;
            this.sudokuCells[row][column].isSimilarNumber = true;
        }
    }

    /*--------------------------------------- Miscellaneous ---------------------------------------*/

    /**
     * This function finds a block number given a row and column index pairs.
     * @param {*} rowIndex The row index.
     * @param {*} columnIndex The column index.
     * @returns The block number (0-8).
     */
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

    /**
     * This function checks if the board is full.
     * @returns True if the board is full, false if not.
     */
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

    /**
     * This function sets the notation mode to the new notation mode.
     * @param {*} notationMode The new notation mode.
     */
    setNotationMode(notationMode) {
        this.notationMode = notationMode;
    }
}

/*------------------------------------ Sudoku board handling ----------------------------------*/

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

const proficiencyText = document.getElementById("proficiency-score");

async function updateStrategyPopup() {

    if (!proficiencyText) {
        console.error("Missing #proficiency-score in HTML");
        return;
    }

    const data = await showProficiency();
    console.log("data", data)
    if (data === null) {
        console.error("data is null");
        return;
    }

    let numericScore;

    if (typeof data === "number") {
        proficiencyText.textContent = data.toFixed(1);
        numericScore = data;

    } else if (data.score !== undefined) {
        proficiencyText.textContent = Number(data.score).toFixed(1);
        numericScore = Number(data.score);

    } else if (data.proficiency !== undefined) {
        proficiencyText.textContent = Number(data.proficiency).toFixed(1);
        numericScore = Number(data.proficiency);
    } else {
        proficiencyText.textContent = JSON.stringify(data);
    }

    let score = Math.ceil(numericScore);

    let titles = strategies[score] || [];

    const strategyList = document.querySelector(".StrategyList");

    while (strategyList.firstChild) {
        strategyList.removeChild(strategyList.firstChild);
    }

    titles.forEach(title => {
        const p = document.createElement("p");
        p.textContent = title;
        strategyList.appendChild(p);
    })
}

//getProficiency(err, time);

let sudokuNumber = 300;
const { boardData, solvedSudoku } = await loadSudokuBoard(sudokuNumber);

/**
 * This function gets the a Sudoku 2D array from the backend, where the sudokuNumber determines which Sudoku is chosen.
 * @param {*} sudokuNumber The Sudoku 'number'.
 * @returns A Sudoku 2D array, empty cells are null. 
 */
async function loadSudokuBoard(sudokuNumber) {
    const res = await fetch(`/api/sudoku?sudokuNumber=${sudokuNumber}`);
    const data = await res.json();

     return { boardData: data.board, solvedSudoku: data.solvedSudoku }
}

// Inserting each element of the Sudoku 2D array into the object SudokuCell.
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        const value = boardData[i][j];
        sudokuCells[i][j] = new SudokuCell(value, value !== null, i, j);
    }
}
//console.log("solvedSudoku:", solvedSudoku);
// New board based on the cells created above.
const sudokuBoard = new SudokuBoard(sudokuCells, solvedSudoku);
// New renderer
const sudokuRenderer = new SudokuRenderer(sudokuBoard);
// New input controller
const inputController = new InputController(sudokuBoard, sudokuRenderer);

sudokuBoard.inputController = inputController;

sudokuRenderer.setupBoard();
sudokuRenderer.bindCellEvents();
sudokuRenderer.bindNotationEvents();

export function getErr() {
    return sudokuBoard.errorCount;
}

/*--------------------------------- Notation buttons selection --------------------------------*/

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

/*--------------------------------------- Settings popup --------------------------------------*/

const settingsIcon = document.getElementById("settings-icon");
const settingsPopUp = document.querySelector("#settings-pop-up");
const closeSettingsBtn = document.querySelector("#close-settings-btn");

// Settings PopUp
settingsIcon.addEventListener("click", () => {
    // Close strategy popup first
    strategyPopUp.classList.add("Hidden");

    // Open settings
    settingsPopUp.classList.remove("Hidden");
});

closeSettingsBtn.addEventListener("click", () => {
    settingsPopUp.classList.add("Hidden");
});


// The toggles in the settings popup, that can be toggled on and off by clicking on them
const toggles = document.querySelectorAll(".ToggleSwitch");

toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
    });
});

/*--------------------------------------- Strategy popup --------------------------------------*/

const strategyIcon = document.getElementById("strategy-icon");
const strategyPopUp = document.getElementById("strategy-pop-up");
const closeStrategyBtn = document.getElementById("close-strategy-btn");

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

/*--------------------------------------- Forfeit popup ---------------------------------------*/

const forfeitBtn = document.getElementById("forfeit-btn");
const forfeitPopUp = document.getElementById("forfeit-pop-up");
const confirmForfeitBtn = document.getElementById("confirm-forfeit-btn");
const cancelForfeitBtn = document.getElementById("cancel-forfeit-btn");

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
    // removes one from proficiency score during forfeit.
    forfeitProficiency();
    window.location.href = "/pages/startPage/startPage.html";
});

/*--------------------------------------- Next Sudoku popup -----------------------------------*/

const nextSudokuBtn = document.getElementById("next-sudoku-btn");

nextSudokuBtn.addEventListener("click", () => {
    window.location.reload();
});

const proficiencyScore = await showProficiency();

document.getElementById("boardProficiencyScore").textContent = `Current proficiency: ${Math.floor(proficiencyScore)}/10`;