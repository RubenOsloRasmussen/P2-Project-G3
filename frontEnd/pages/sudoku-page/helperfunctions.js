/**
 * Helper function that returns the row and column indices for a given cell index.
 * @param {*} index The cells index.
 * @returns An object containing row and column indices.
 */
export function indexToRowAndColumn(index) {
    const column = Math.floor(index/9);
    const row = index % 9;

    return {row, column};
}

/**
 * Helper function that returns a cell index for given row and column indices.
 * @param {*} row The row index.
 * @param {*} column The column index.
 * @returns The cell index.
 */
export function RowAndColumnToIndex(row, column) {
    return row + column * 9;
}