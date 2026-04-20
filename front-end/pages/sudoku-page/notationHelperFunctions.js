import { RowAndColumnToIndex } from 'helperfunctions';


export function findSameNumberInstances(rowIndex, columnIndex, ourCellsArr) {
    let instancesIndexArray = [];
    let number = ourCellsArr[rowIndex][columnIndex].number

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (ourCellsArr[i][j].number === number) {
                instancesIndexArray.push(RowAndColumnToIndex(i, j));
            }
        }
    }

    return instancesIndexArray;
}

export function findSameBlockInstances(number, ourCellsArr) {
    let instancesIndexArray = [];

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (ourCellsArr[i][j].number === number) {
                instancesIndexArray.push(RowAndColumnToIndex(i, j));
            }
        }
    }

    return instancesIndexArray;
}

