console.log("hello");

class SudokuBoard {
    constructor(cellsArr) {
        this.cellsArr = cellsArr;
    }

    setupBoard() {
        let sudokuBoardContainer = document.getElementById("sudoku_Board_Container_id");
        let sudokuBoardDivs = document.getElementsByClassName()
        for (let i = 1; i <= 9; i++) {
            sudokuBoardContainer += ``;
            
        }
    }

}

let ourCellsArr = [
    [null, null, 7, null, null, null, null, null, null],
    [null, null, 5, null, 4, null, null, 7, null],
    [null, 6, 9, 5, null, null, null, 3, 1],

    [null, null, null, 4, null, 5, 8, null, 2],
    [null, 5, null, null, 2, null, null, 4, null],
    [6, null, 2, 3, null, 1, null, null, null],

    [2, 9, null, null, null, 3, 5, 8, null],
    [null, 3, null, null, 1, null, 2, null, null],
    [null, null, null, null, null, null, 3, null, null]
];
const OurSudokuBoard = new SudokuBoard(ourCellsArr); 

