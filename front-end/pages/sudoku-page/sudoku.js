class SudokuBoard {
    /* 
        The constructor method is executed, whenever we create an instance of a class using the 'new' keyword.
        E.g.: const OurSudokuBoard = new SudokuBoard(ourCellsArr); 

        Notice, that it allows us to pass in parameters, that can be used in the constructor method.

        Parameter:
            initialCellsArr (array): An array that stores the Sudoku board in row-major order, with one array per row of the 9x9 Sudoku-
            board, with pointers (ofc. pointers are hidden in javascript so you wont see them explicitly) to the row arrays. 
            
            Note: Refer to Figure 10.1 (c), in Introduction to Algorithms (Fourth Edition, CLRS) for more information about 
            which row-major version order, we are using.
    */
    constructor(initialCellsArr) {
        this.initialCellsArr = initialCellsArr; 
        // "this" refers to the instance (the object)
        // In this case, we create a new property of the instance, and assign it the initial array containing the Sudoku puzzle.
    }

    /* 
        ## CONTEXT INFO

        This is a visual representation of, how the Sudoku board have been set up (its a matrix!):

              0 1 2  3 4 5  6 7 8
            0 - - -  - - -  - - -
            1 - - -  - - -  - - -
            2 - - -  - - -  - - -

            3 - - -  - - -  - - -
            4 - - -  - - -  - - -
            5 - - -  - - -  - - -

            6 - - -  - - -  - - -
            7 - - -  - - -  - - -
            8 - - -  - - -  - - -
        
        We see that each '-' represents a cell and each cell have a corresponding row and column index. 

        For simplicity, we store the matrix in row-major order, so that matrix element M[i][j] is accessed the same
        way in an array: cellsArr[i][j]. (i = rows, j = columns).

        ## SUMMARY
        Adds HTML to display the cells given from the initialCellsArr when the class was constructed
    */
    setupBoard() {
        let sudokuBoardElements = document.getElementsByClassName("sudoku_Block_class");

        /* 
            We loop through every cell in the board array, so we can display it on the web page
        */
        for (let rowIndex = 0; rowIndex <= 8; rowIndex++) {
            for (let columnIndex = 0; columnIndex <= 8; columnIndex++) {
                let blockNumber = this.getBlockNumber(rowIndex, columnIndex, sudokuBoardElements);
                
                /*
                We add a new cell to a specific Sudoku block by adding a new input field.
                */
                sudokuBoardElements[blockNumber].innerHTML += `<input type="text" class="input_Cell" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'')};" value=${this.initialCellsArr[rowIndex][columnIndex] ? this.initialCellsArr[rowIndex][columnIndex] : ""}>`;
            }
        }
    }

    /*
        ## Explanation
        We want to know which block number a given cell is in, because we need to know, which
        block container (see id with name: sudoku_Block_class in the html) we need to add the cell to.
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
}

/* ## TEST SECTION ## */

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

OurSudokuBoard.setupBoard();
