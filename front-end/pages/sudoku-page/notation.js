import { SudokuBoard, getSudokuBoard } from "./sudoku.js"

const FOCUS_COLOR = "#bbd0f5";
const HIGHLIGHT_COLOR = "#e2edff";
let sudokuBoard = null;

class NotationBlock {
    constructor(cornerNotation = null, centerNotation = null) {
        this.cornerNotationRow = cornerNotation,
        this.centerNotationRow = centerNotation
    }
}

class CornerNotation {
    constructor(topCornerHTMLElement, bottomCornerHTMLElement) {
        this.topCornerCandidates = [];
        this.topCornerHTMLElement = topCornerHTMLElement;

        this.bottomCornerCandidates = [];
        this.bottomCornerHTMLElement = bottomCornerHTMLElement;
    }
}

class CenterNotation {
    constructor(htmlElement) {
        this.htmlElement = htmlElement;
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

// when the user enters a number on the keyboard, we want to make sure that the action aligns with the selected notation type
document.addEventListener("keydown", notationInput);

export function notationInput(e) {
    console.log("al: " + !sudokuBoard + " " + !targetCell + " " + !(/^[0-9]$/.test(e.key)))
    if (!sudokuBoard || !targetCell || !(/^[0-9]$/.test(e.key))) return;

    console.log(sudokuBoard.notationInUse)
    if (sudokuBoard.notationInUse == "defaultNotation") {
        insertDefaultNumber(e);
        deleteDefaultNumber(e);
    }

    return;

    if (sudokuBoard.notationInUse == "cornerNotation" || sudokuBoard.notationInUse == "centerNotation") {
        if (targetCell.cell.number || targetCell.cell.notationBlock) return;
        let notationBlock = buildNotationBlock();
        targetCell.cell.notationBlock = notationBlock;
    }
    
    if (sudokuBoard.notationInUse == "cornerNotation") {
        let topArr = targetCell.cell.notationCell.cornerNotationCell.topCornerCandidates;
        
        topArr.forEach((candidateNumber, index) => {
            if (candidateNumber == e.key) {
                //topCornerHTMLElement =
                topArr.splice(index, 1);
            }
        })

    } else if (sudokuBoard.notationInUse == "centerNotation") {
        if (sudokuBoard.number != null) return;

    } else if (sudokuBoard.notationInUse == "colorNotation") {
        
    }
}

export function insertDefaultNumber(e) {
    targetCell.textContent = e.key;
    targetCell.cell.number = e.key;
    targetCell.style.display = "flex";
    targetCell.style.justifyContent = "center";
    targetCell.style.alignItems = "center";
}

function deleteDefaultNumber(e) {
    if (e.key == "Backspace") {
        targetCell.textContent = "";
        e.currentTarget.cell.number = null;
    }
}

function buildNotationBlock() {
    // add notation cells
    let notationTopRow = document.createElement("div");
    notationTopRow.setAttribute("class", "TopCornerNotation NotationBlock")
    let notationCenterRow = document.createElement("div");
    notationCenterRow.setAttribute("class", "CenterNotation NotationBlock")
    let notationBottomRow = document.createElement("div");
    notationBottomRow.setAttribute("class", "BottomCornerNotation NotationBlock")

    for (let i = 0; i <= 11; i++) {
        let notationCell = document.createElement("div");
        notationCell.setAttribute("class", "NotationNumber");
        notationCell.textContent = 1;

        if (i <= 3) {
            notationTopRow.appendChild(notationCell);
        } else if (i <= 7) {
            notationCenterRow.appendChild(notationCell);
        } else {
            notationBottomRow.appendChild(notationCell);
        }
    }

    e.currentTarget.appendChild(notationTopRow);
    e.currentTarget.appendChild(notationCenterRow);
    e.currentTarget.appendChild(notationBottomRow);

    let cornerNotation = new CornerNotation(notationTopRow, notationBottomRow);
    let centerNotation = new CenterNotation(notationCenterRow);

    let notationBlock = new NotationBlock(cornerNotation, centerNotation);
    return notationBlock;
}

sudokuBoard = await getSudokuBoard();

let inputCells = document.getElementsByClassName("input_Cell");
for (let cell of inputCells) {
    cell.addEventListener("click", focusDiv);
}
    
// we want to store the notation the user has selected inside the SudokoBoard class so its always easily accessible
let notations =  [...document.getElementById("notation_Boxes").children];

notations.forEach((element, index) => {
    if (element.dataset.notationtype == "forfeitBtn") return;
    element.addEventListener("click", async (e) => {
        if (!sudokuBoard) sudokuBoard = await getSudokuBoard();
        sudokuBoard.notationInUse = element.dataset.notationtype;
    })
})



    
    