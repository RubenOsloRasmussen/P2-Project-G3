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
            console.log(`Error in block ${rowIndex}, missing ${i}`);
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
            console.log(`Error in row ${rowIndex}, missing ${i}`);
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
            console.log(`Error in column ${rowIndex}, missing ${i}`);
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