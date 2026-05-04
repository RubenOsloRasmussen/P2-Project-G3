import { rowAndColumnToIndex } from './helperfunctions.js';

/**
 * This function returns an array of indices where the number on the pressed cell can also be found, including the pressed cell's index.
 * @param {*} rowIndex The row index of the pressed cell.
 * @param {*} columnIndex The column index of the pressed cell.
 * @param {*} ourCellsArr The 2D array of the Sudoku board.
 * @returns 
 */
export function findSameNumberInstances(rowIndex, columnIndex, ourCellsArr) {
    let instancesIndexArray = [];
    let number = ourCellsArr[rowIndex][columnIndex].number

    // Saves the index of every cell with the same number.
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
           
            if (ourCellsArr[i][j].number == number) {
                instancesIndexArray.push(rowAndColumnToIndex(i, j));
            }
        }
    }

    return instancesIndexArray;
}

/**
 * This function returns an array of indices in the same block as the pressed cell, including the pressed cell's index.
 * @param {*} rowIndex The row index of the pressed cell.
 * @param {*} columnIndex The column index of the pressed cell.
 * @param {*} ourCellsArr The 2D array of the Sudoku board.
 * @returns 
 */
export function findSameBlockInstances(rowIndex, columnIndex, ourCellsArr) {
    let instancesIndexArray = [];

    // Calculate the row and column index of the top left cell in the number's block.
    let startRowIndex = Math.floor(rowIndex / 3) * 3;
    let startColumnIndex = Math.floor(columnIndex / 3) * 3;

    // Saves the index of every cell in the block.
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            instancesIndexArray.push(rowAndColumnToIndex(startRowIndex+i, startColumnIndex+j));
        }
    }

    return instancesIndexArray;
}