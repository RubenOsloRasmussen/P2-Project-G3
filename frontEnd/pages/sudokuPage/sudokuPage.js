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
        let sudokuBoardElements = document.getElementsByClassName("SudokuBlockClass");

        /* 
            We loop through every cell in the board array, so we can display it on the web page
        */
        for (let rowIndex = 0; rowIndex <= 8; rowIndex++) {
            for (let columnIndex = 0; columnIndex <= 8; columnIndex++) {
                let blockNumber = this.getBlockNumber(rowIndex, columnIndex, sudokuBoardElements);
                
                /*
                We add a new cell to a specific Sudoku block by adding a new input field.
                */
                sudokuBoardElements[blockNumber].innerHTML
                    += `<input type="text" class="InputCell" maxlength="1" oninput="this.value=this.value.replace(/[^0-9]/g,'');" 
                    value=${this.initialCellsArr[rowIndex][columnIndex] ? this.initialCellsArr[rowIndex][columnIndex] : ""}>`;
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

//let ourCellsArr = [
//    [null, null, 7, null, null, null, null, null, null],
//    [null, null, 5, null, 4, null, null, 7, null],
//    [null, 6, 9, 5, null, null, null, 3, 1],

//    [null, null, null, 4, null, 5, 8, null, 2],
//    [null, 5, null, null, 2, null, null, 4, null],
//    [6, null, 2, 3, null, 1, null, null, null],

//    [2, 9, null, null, null, 3, 5, 8, null],
//    [null, 3, null, null, 1, null, 2, null, null],
//    [null, null, null, null, null, null, 3, null, null]
//];

//fetch("./SudokuPuzzles.txt")
//    .then(function (response) {
//        return response.text();
//    })
//    .then(function (SudokuPuzzles) {
//        console.log(SudokuPuzzles);
//    })

//this is the string from which a sudoku is made, left to right, top to bottom.
// a "." means an empty cell
//let sudokuString = "..61..97........3....734..5....49..2.15...86.9..68....6..293....9........51..74.."

//The sudoku board is initialized as an undefined 9*9 matrix
let ourCellsArr = [
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

//using a nested for loop, each character in the string is read from left to right,
//if it reads a "." then null is placed in the matrix in that point.
//otherwise, it will place whatever was in the spot, into the matrix.
async function stringParser(string) {
    sudokuString = await GetSudokuString(sudokuNumber);

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (isNaN(Number(sudokuString[j + i * 9])) === false & sudokuString[j + i * 9] != "0") {
                ourCellsArr[i][j] = Number(sudokuString[j + i * 9])
            } else if (sudokuString[j + i * 9] === ".") {
                ourCellsArr[i][j] = null
            } else {
                console.log("could not print value at placement ", (j + i * 9), " in string")
            }
        }
    }
}

async function LoadStringData() {
    let response = await fetch("./SudokuPuzzles.csv");

    if (!response.ok) {
        console.log("Error: couldn't load StringData", response.status);
        return null;
    }

    let stringData = await response.text()
    console.log(stringData)
    console.log("the datadump is ", stringData.length, " characters long")
    return stringData;
}

async function GetSudokuString(number) {
    let response = await LoadStringData();

    if (response == null) {
        console.log("could not load sudoku string")
        return;
    }

    let sudokuStrings = response.split(",");

    let sudokuString = sudokuStrings[sudokuNumber * 4]

    console.log(sudokuString)

    return sudokuString;
}

let sudokuNumber = 1
let sudokuString = null

async function StringToSudoku(Number) {
    await stringParser(ourCellsArr, sudokuString)

    const OurSudokuBoard = await new SudokuBoard(ourCellsArr);

    await OurSudokuBoard.setupBoard();

}

StringToSudoku(sudokuNumber)




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

// Settings popup
const settingsIcon = document.getElementById("settings-icon");
const settingsPopUp = document.querySelector('#settings-pop-up');
const closeSettingsBtn = document.querySelector('#close-settings-btn');

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

// Startegy popup
const strategyIcon = document.getElementById("strategy-icon");
const strategyPopUp = document.getElementById("strategy-pop-up");
const closeStrategyBtn = document.getElementById("close-strategy-btn");

strategyIcon.addEventListener("click", () => {
    // Close settings popup first
    settingsPopUp.classList.add("Hidden");

    // Open strategy
    strategyPopUp.classList.remove("Hidden");
});

closeStrategyBtn.addEventListener("click", () => {
    strategyPopUp.classList.add("Hidden");
});