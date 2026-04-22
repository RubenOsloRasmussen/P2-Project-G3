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

let inputCells = document.getElementsByClassName("input_Cell");

for (let cell of inputCells) {
  cell.addEventListener("click", focusDiv);
}
    
function focusDiv(e) {
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
    targetCell.style.backgroundColor = "#4168A9";
}

document.addEventListener("keydown", insertCellNumber);

function insertCellNumber(e) {
    if (/^[0-9]$/.test(e.key)) {
        targetCell.textContent = e.key;
        targetCell.style.display = "flex";
        targetCell.style.justifyContent = "center";
        targetCell.style.alignItems = "center";
    }
    
}