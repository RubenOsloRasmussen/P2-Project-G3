// Function to check if it is safe to place num at mat[row][col]
function isSafe(mat, row, col, num) {
    
    // Check if num exists in the row
    for (let x = 0; x < 9; x++)
        if (mat[row][x] === num)
            return false;

    // Check if num exists in the col
    for (let x = 0; x < 9; x++)
        if (mat[x][col] === num)
            return false;

    // Check if num exists in the 3x3 sub-matrix
    const startRow = row - (row % 3),
          startCol = col - (col % 3);

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (mat[i + startRow][j + startCol] === num)
                return false;

    return true;
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