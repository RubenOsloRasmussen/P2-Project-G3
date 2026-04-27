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

export function merge(arr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const lArr = new Array(n1);
    const rArr = new Array(n2);

    for (var i = 0; i < n1; i++) {
        lArr[i] = arr[left + i]
        lArr[i][0] = Number(lArr[i][0]);
    }
    for (var j = 0; j < n2; j++) {
        rArr[j] = arr[mid + 1 + j]
        rArr[j][0] = Number(rArr[j][0]);
    }

    i = 0, j = 0;
    let k = left;

    while (i < n1 && j < n2) {
        if (lArr[i][0] <= rArr[j][0]) {
            arr[k] = lArr[i];
            i++;
        } else {
            arr[k] = rArr[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = lArr[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = rArr[j];
        j++;
        k++;
    }
}

export function mergeSort(arr, left, right) {
    if (left >= right)
        return;

    const mid = Math.floor(left + (right - left) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}