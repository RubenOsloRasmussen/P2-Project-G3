import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_PATH = path.join(__dirname, "SudokuPuzzles.csv");

export function GetSudokuBoard(sudokuNumber) {
    const csv = fs.readFileSync(CSV_PATH, "utf-8");
    
    const puzzles = csv.split(",");
    const sudokuString = puzzles[sudokuNumber * 4]

    if (!sudokuString) {
        console.log("Could not load Sudoku string")
        return;
    }

    return stringToBoard(sudokuString);
}


function stringToBoard(sudokuString) {
    const board = [];

    for (var i = 0; i < 9; i++) {
        const row = [];
        for (var j = 0; j < 9; j++) {
            const char = sudokuString[j+i*9];
            row.push(char === "." || char === "0" ? null : Number(char));
        }
        board.push(row);
    }

    return board;
}
