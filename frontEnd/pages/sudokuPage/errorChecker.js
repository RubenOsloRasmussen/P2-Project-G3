/**
 * This function checks for errors in the box where the new number is placed.
 * @param {*} rowIndex The row index of the newly placed number.
 * @param {*} columnIndex The column index of the newly placed number.
 * @param {*} ourCellsArr The 2D array of the Sudoku board.
 * @returns the number of duplicate numbers. E.g. it returns zero if there
 * are no mistakes in the block, 1 if there is one mistake and so on.
 */
export function checkBlock(rowIndex, columnIndex, ourCellsArr) {
    let newNumber = ourCellsArr[rowIndex][columnIndex].number;
    let duplicatesFound = -1;

    // Calculate the row and column index of the top left cell in the new number's block.
    let startRowIndex = Math.floor(rowIndex / 3) * 3;
    let startColumnIndex = Math.floor(columnIndex / 3) * 3;

    // Checks every cell in the block for duplicates.
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (newNumber === ourCellsArr[startRowIndex + i][startColumnIndex + j].number) duplicatesFound++;
        }
    }
    return duplicatesFound;
}

/**
 * This function checks for errors in the row where the new number is placed.
 * @param {*} rowIndex The row index of the newly placed number.
 * @param {*} columnIndex The column index of the newly placed number.
 * @param {*} ourCellsArr The 2D array of the Sudoku board.
 * @returns the number of duplicate numbers. E.g. it returns zero if there
 * are no mistakes in the row, 1 if there is one mistake and so on.
 */
export function checkRow(rowIndex, columnIndex, ourCellsArr) {
    let newNumber = ourCellsArr[rowIndex][columnIndex].number;
    let duplicatesFound = -1;

    // Checks every cell in the row for duplicates.
    for (let i = 0; i < 9; i++) {
        if (newNumber === ourCellsArr[rowIndex][i].number) duplicatesFound++;
    }

    return duplicatesFound;
}

/**
 * This function checks for errors in the column where the new number is placed.
 * @param {*} rowIndex The row index of the newly placed number.
 * @param {*} columnIndex The column index of the newly placed number.
 * @param {*} ourCellsArr The 2D array of the Sudoku board.
 * @returns the number of duplicate numbers. E.g. it returns zero if there
 * are no mistakes in the column, 1 if there is one mistake and so on.
 */
export function checkColumn(rowIndex, columnIndex, ourCellsArr) {
    let newNumber = ourCellsArr[rowIndex][columnIndex].number;
    let duplicatesFound = -1;

    // Checks every cell in the column for duplicates.
    for (let j = 0; j < 9; j++) {
        if (newNumber === ourCellsArr[j][columnIndex].number) duplicatesFound++;
    }

    return duplicatesFound;
}

/* ----------------------------------------------------------------------------------------*/

/**
 * This function validates a block, given the row and column index of the top left cell.
 * It checks whether one of every number exists in the block.
 * @param {*} startRowIndex The row index of the top left cell.
 * @param {*} startColumnIndex The column index of the top left cell.
 * @param {*} ourCellsArr The 2D array of the Sudoku board.
 * @returns Returns true if the block is valid, false if not.
 */
export function validateBlock(startRowIndex, startColumnIndex, ourCellsArr) {
    let numberArray = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            numberArray.push(ourCellsArr[startRowIndex + i][startColumnIndex + j].number);
        }
    }

    for (let i = 1; i < 10; i++) {
        if (!numberArray.includes(i)) {
            return false;
        }
    }

    return true;
}

/**
 * This function validates a row, given the row index.
 * It checks whether one of every number exists in the row.
 * @param {*} rowIndex The index of the row.
 * @param {*} ourCellsArr The 2D array of the Sudoku board.
 * @returns Returns true if the row is valid, false if not.
 */
export function validateRow(rowIndex, ourCellsArr) {
    let numberArray = [];

    for (let i = 0; i < 9; i++) {
        numberArray.push(ourCellsArr[rowIndex][i].number);
    }

    for (let i = 1; i < 10; i++) {
        if (!numberArray.includes(i)) {
            return false;
        }
    }

    return true;
}

/**
 * This function validates a column, given the column index.
 * It checks whether one of every number exists in the column.
 * @param {*} columnIndex The index of the column.
 * @param {*} ourCellsArr The 2D array of the Sudoku board.
 * @returns Returns true if the column is valid, false if not.
 */
export function validateColumn(columnIndex, ourCellsArr) {
    let numberArray = [];

    for (let j = 0; j < 9; j++) {
        numberArray.push(ourCellsArr[j][columnIndex].number);
    }

    for (let i = 1; i < 10; i++) {
        if (!numberArray.includes(i)) {
            return false;
        }
    }

    return true;
}

/**
 * This function uses helper functions to check if the board is finished.
 * AKA, if every block, row and column is valid.
 * @param {*} ourCellsArr The 2D array of the Sudoku board.
 * @returns Returns true if the board in finished, false if not.
 */
export function winChecker(ourCellsArr) {
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            if (!validateBlock(i, j, ourCellsArr)) return false;
        }
    }

    for (let i = 0; i < 9; i++) {
        if (!validateRow(i, ourCellsArr)) return false;
    }

    for (let j = 0; j < 9; j++) {
        if (!validateColumn(j, ourCellsArr)) return false;
    }

    return true;
}