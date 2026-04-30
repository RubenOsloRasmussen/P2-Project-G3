/**
 * Helper function that returns the row and column indices for a given cell index.
 * @param {*} index The cells index.
 * @returns An object containing row and column indices.
 */
export function indexToRowAndColumn(index) { 
    const row = Math.floor(index/9);
    const column = index % 9;

    return {row, column};
}

/**
 * Helper function that returns a cell index for the given row and column indices.
 * @param {*} row The row index.
 * @param {*} column The column index.
 * @returns The cell index.
 */
export function rowAndColumnToIndex(row, column) {
    return row * 9 + column;
}