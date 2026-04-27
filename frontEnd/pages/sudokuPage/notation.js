import { SudokuBoard, getSudokuBoard } from "./sudokuPage.js"

const FOCUS_COLOR = "#bbd0f5";
const HIGHLIGHT_COLOR = "#e2edff";
let sudokuBoard = null;

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

let coloredCells = [];

function removeCellsColor() {
    coloredCells.forEach((element, index) => {
        console.log("element", element);
        element.style.backgroundColor = "white";
    })
    coloredCells = [];
}

let targetCell = null;
    
export function focusDiv(e) {
    removeCellsColor();
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
    
    for (const cellElement of sudokuBoardElements[sudokuBoard.getBlockNumber(e.currentTarget.cell.rowIndex, e.currentTarget.cell.columnIndex)].children) {
        console.log("here11");
        
        if (cellElement.cell.rowIndex == e.target.cell.rowIndex && cellElement.cell.columnIndex == e.target.cell.columnIndex) continue;
        cellElement.style.backgroundColor = HIGHLIGHT_COLOR;
        coloredCells.push(cellElement);
    }

    for (let i = 0; i <= 8; i++) {
        if (e.currentTarget.cell.columnIndex != i) {
            sudokuBoard.initialCellsArr[e.currentTarget.cell.rowIndex][i].htmlElement.style.backgroundColor = HIGHLIGHT_COLOR;
            coloredCells.push(sudokuBoard.initialCellsArr[e.currentTarget.cell.rowIndex][i].htmlElement);
        }
        if (e.currentTarget.cell.rowIndex != i) { 
            sudokuBoard.initialCellsArr[i][e.currentTarget.cell.columnIndex].htmlElement.style.backgroundColor = HIGHLIGHT_COLOR;
            coloredCells.push(sudokuBoard.initialCellsArr[i][e.currentTarget.cell.columnIndex].htmlElement);
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

sudokuBoard = await getSudokuBoard();

let inputCells = document.getElementsByClassName("input_Cell");
for (let cell of inputCells) {
    cell.addEventListener("click", focusDiv);
}
    



    
    