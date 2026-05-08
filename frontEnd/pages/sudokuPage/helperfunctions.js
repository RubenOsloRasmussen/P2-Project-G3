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

/**
 * This function gets the proficiency score from the backend, where the score is calculated based on a given error amount and time spent.
 * @param {number} err Amount of errors made.
 * @param {number} time Time spent in seconds.
 * @returns {number} Returns the proficiency score.
 */
export async function changeProficiency(err, time) {
    try {
        const res = await fetch(`/api/proficiency?err=${err}&time=${time}`);

        const data = await res.json();

        console.log("proficiency is", data);

        return data.data;

    } catch (error) {
        console.error("Failed to fetch proficiency:", error);

        return null;
    }
}

/**
 * This function fetches the score from backend and returns it as a number.
 * @returns {number}
 */
export async function showProficiency() {
    try {
        const res = await fetch('/api/score');

        const data = await res.json();

        return data.data;
    }
    catch (error) {
        console.error("failed to get user score");

        return null;
    }
}

export async function forfeitProficiency() {
    try {
        const res = await fetch('/api/forfeitScore');

        const data = await res.json();

        return data.data;
    }
    catch (error) {
        console.error("failed to change score during forfeit");

        return null;
    }
}