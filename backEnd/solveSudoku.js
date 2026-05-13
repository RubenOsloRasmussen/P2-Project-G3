/**
 * This function checks for instances of a number in a block.
 * @param {*} matrix The matrix of the Sudoku board.
 * @param {*} rowIndex The row index of the newly placed number.
 * @param {*} columnIndex The column index of the newly placed number.
 * @param {*} number The number to look for.
 * @returns True if the number is not found, false if it is.
 */
function checkBlock(matrix, rowIndex, columnIndex, number) {
    // Calculate the row and column index of the top left cell in the new number's block.
    const startRowIndex = rowIndex - (rowIndex % 3);
    const startColumnIndex = columnIndex - (columnIndex % 3);

    // Checks every cell in the block for the number.
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (number === matrix[startRowIndex + i][startColumnIndex + j]) return false;
        }
    }
    return true;
}

/**
 * This function checks for instances of a number in a row.
 * @param {*} matrix The matrix of the Sudoku board.
 * @param {*} rowIndex The row index of the newly placed number.
 * @param {*} columnIndex The column index of the newly placed number.
 * @param {*} number The number to look for.
 * @returns True if the number is not found, false if it is.
 */
function checkRow(matrix, rowIndex, columnIndex, number) {
    // Checks every cell in the row for the number.
    for (let i = 0; i < 9; i++) {
        if (number === matrix[rowIndex][i]) return false;
    }
    return true;
}

/**
 * This function checks for instances of a number in a column.
 * @param {*} matrix The matrix of the Sudoku board.
 * @param {*} rowIndex The row index of the newly placed number.
 * @param {*} columnIndex The column index of the newly placed number.
 * @param {*} number The number to look for.
 * @returns True if the number is not found, false if it is.
 */
function checkColumn(matrix, rowIndex, columnIndex, number) {
    // Checks every cell in the column for the number.
    for (let j = 0; j < 9; j++) {
        if (number === matrix[j][columnIndex]) return false;
    }
    return true;
}

// Function to check if it is safe to place num at mat[row][col]
function isSafe(mat, row, col, num) {
    return (checkRow(mat, row, col, num) && checkColumn(mat, row, col, num) && checkBlock(mat, row, col, num));
}

// Function to solve the Sudoku problem
function solveSudokuRec(mat, row, col) {

    // base case: Reached nth column of the last row
    if (row === 8 && col === 9)
        return true;

    // If last column of the row go to the next row
    if (col === 9) {
        row++;
        col = 0;
    }

    // If cell is already occupied then move forward
    if (mat[row][col] !== 0 && mat[row][col] !== null)
        return solveSudokuRec(mat, row, col + 1);

    for (let num = 1; num <= 9; num++) {
        
        // If it is safe to place num at current position
        if (isSafe(mat, row, col, num)) {
            mat[row][col] = num;
            if (solveSudokuRec(mat, row, col + 1))
                return true;
            mat[row][col] = 0;
        }
    }

    return false;
}

export function solveSudoku(mat) {
    solveSudokuRec(mat, 0, 0);
}