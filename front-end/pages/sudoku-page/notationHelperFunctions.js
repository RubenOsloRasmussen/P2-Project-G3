import { RowAndColumnToIndex } from 'helperfunctions';


export function findSameNumberInstances(rowIndex, columnIndex, ourCellsArr) {
    let instancesIndexArray = [];
    let number = ourCellsArr[rowIndex][columnIndex].number

    // Saves the index of every cell with the same number.
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (ourCellsArr[i][j].number === number) {
                instancesIndexArray.push(RowAndColumnToIndex(i, j));
            }
        }
    }

    return instancesIndexArray;
}

export function findSameBlockInstances(rowIndex, columnIndex, ourCellsArr) {
    let instancesIndexArray = [];

    // Calculate the row and column index of the top left cell in the number's block.
    let startRowIndex = Math.floor(rowIndex / 3) * 3;
    let startColumnIndex = Math.floor(columnIndex / 3) * 3;

    // Saves the index of every cell in the block.
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            instancesIndexArray.push(RowAndColumnToIndex(startRowIndex+i, startColumnIndex+j));
        }
    }

    return instancesIndexArray;
}

export function findSameRowInstances(rowIndex, columnIndex, ourCellsArr) {
    let instancesIndexArray = [];

    // Saves the index of every cell in the row.
    for (let i = 0; i < 9; i++) {
        instancesIndexArray.push(RowAndColumnToIndex(rowIndex, i));
    }

    return instancesIndexArray;
}

export function findSameColumnInstances(rowIndex, columnIndex, ourCellsArr) {
    let instancesIndexArray = [];

    // Saves the index of every cell in the column.
    for (let i = 0; i < 9; i++) {
        instancesIndexArray.push(RowAndColumnToIndex(i, columnIndex));
    }

    return instancesIndexArray;
}
