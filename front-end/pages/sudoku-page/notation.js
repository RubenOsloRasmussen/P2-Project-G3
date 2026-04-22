import { SudokuBoard } from "./sudoku.js"

const FOCUS_COLOR = "#bbd0f5";
const HIGHLIGHT_COLOR = "#c1d0ea";

class cornerNotationCell {
    constructor() {

    }


}

class centerNotationCell {
    constructor(value = "", color = "black") {
        this.value = value;
        this.color = color;
    }
}



function iterateCells() {
    for (let rowIndex = 0; rowIndex <= 8; rowIndex++) {
            for (let columnIndex = 0; columnIndex <= 8; columnIndex++) {
                
            }
        }
}



function setupSudokuCornerNotation() {

}

function setupCenterNotation() {

}

let targetCell = null;
    
export function focusDiv(e) {
    console.log("hey")
    if (targetCell instanceof HTMLElement) {
        targetCell.style.backgroundColor = "white";
         console.log("hey1")
    }

    if (targetCell == e.currentTarget) {
        targetCell = null;
        return;
    }
    targetCell = e.currentTarget;
    targetCell.style.backgroundColor = FOCUS_COLOR;
   
    console.log(e.currentTarget.cell);
    
    let sudokuBoardElements = document.getElementsByClassName("sudoku_Block_class");
    for (const cellElement of sudokuBoardElements[SudokuBoard.getBlockNumber(e.currentTarget.cell.rowIndex, e.currentTarget.cell.columnIndex)].children) {
        if (cellElement.cell.rowIndex == e.target.cell.rowIndex && cellElement.cell.columnIndex == e.target.cell.columnIndex) return;
        e.target.style.backgroundColor = HIGHLIGHT_COLOR;

        for (let i = 0; i <= 8; i++) {
            e.target.style.backgroundColor = HIGHLIGHT_COLOR;
        }
    }

}

document.addEventListener("keydown", insertCellNumber);

export function insertCellNumber(e) {
    if (/^[0-9]$/.test(e.key)) {
        targetCell.textContent = e.key;
        targetCell.style.display = "flex";
        targetCell.style.justifyContent = "center";
        targetCell.style.alignItems = "center";
    }
    
}

let inputCells = document.getElementsByClassName("input_Cell");
    
    for (let cell of inputCells) {
      cell.addEventListener("click", focusDiv);
    }